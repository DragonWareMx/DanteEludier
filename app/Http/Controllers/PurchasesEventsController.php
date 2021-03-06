<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Purchase;
use App\Mail\SendMailable;
use App\Mail\SendMailableTransfer;
use Illuminate\Support\Facades\Mail;


class PurchasesEventsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $tickets = Purchase::select('purchases.id','purchases.uuid', 'confirmed', 'metodo_pago', 'user_id')
                            ->with('events:ciudad,sede,id,product_id','events.product:titulo,id','user:name,apellido_p,apellido_m,phone,id')
                            ->withCount('events')
                            ->when($request->search, function ($query, $search) use ($request) {
                                switch ($request->filter) {
                                    case 'evento':
                                        //si no se busca la palabra sin
                                        if(stripos($search, 'sin') === FALSE){
                                            return $query->whereHas('events', function ($queryEvents) use ($search) {
                                                return $queryEvents->whereRaw('unaccent("ciudad"::text) ILIKE unaccent(\'%'.$search.'%\')')
                                                                ->orWhereRaw('unaccent("sede"::text) ILIKE unaccent(\'%'.$search.'%\')')
                                                                ->orWhereRaw(
                                                                    'unaccent(concat(ciudad, \', \', sede)) ILIKE unaccent(\'%'.$search.'%\')'
                                                                );
                                            });
                                        }
                                        else{
                                            //si se busca la palabra sin quiere decir que puede buscar boletos sin evento
                                            return $query->whereHas('events', function ($queryEvents) use ($search) {
                                                return $queryEvents->whereRaw('unaccent("ciudad"::text) ILIKE unaccent(\'%'.$search.'%\')')
                                                                ->orWhereRaw('unaccent("sede"::text) ILIKE unaccent(\'%'.$search.'%\')')
                                                                ->orWhereRaw(
                                                                    'unaccent(concat(ciudad, \', \', sede)) ILIKE unaccent(\'%'.$search.'%\')'
                                                                );
                                            })->doesntHave('events', 'or');
                                        }
                                        break;
                                    case 'usuario':
                                        return $query->whereHas('user', function ($queryUser) use ($search) {
                                            return $queryUser->whereRaw('unaccent(concat(name, \' \', apellido_p, \' \', apellido_m)) ILIKE unaccent(\'%'.$search.'%\')')
                                            ->orWhereRaw(
                                                'unaccent(concat(name, \' \', apellido_p)) ILIKE unaccent(\'%'.$search.'%\')'
                                            )
                                            ->orWhereRaw('unaccent("name"::text) ILIKE unaccent(\'%'.$search.'%\')');
                                        });
                                        break;
                                    case 'telefono':
                                        return $query->whereHas('user', function ($queryUser) use ($search) {
                                            return $queryUser->where('phone', 'ILIKE', '%'.$search.'%');
                                        });
                                        break;
                                    case 'pago':
                                        //si no se busca la palabra no
                                        if(stripos($search, 'no') === FALSE){
                                            //boletos que tienen metodo de pago
                                            return $query->where('metodo_pago', 'ILIKE', '%'.$search.'%');
                                        }
                                        else{
                                            //boletos que no tienen metodo de pago
                                            return $query->where('metodo_pago', null);
                                        }
                                        break;
                                    case 'estatus':
                                        //si no se busca la palabra pagado
                                        if(stripos($search, 'pagado') === FALSE){
                                            //boletos con el pago sin confirmar
                                            return $query->where('confirmed', false)
                                                        ->orWhere('confirmed', null);
                                        }
                                        else{
                                            //boletos con el pago confirmado
                                            return $query->where('confirmed', true);
                                        }
                                        break;
                                    default:
                                        //si no se busca la palabra sin
                                        if(stripos($search, 'sin') === FALSE){
                                            return $query->whereHas('events', function ($queryEvents) use ($search) {
                                                return $queryEvents->whereHas('product', function ($queryProduct) use ($search) {
                                                    return $queryProduct->whereRaw('unaccent("titulo"::text) ILIKE unaccent(\'%'.$search.'%\')');
                                                });
                                            });
                                        }
                                        else{
                                            //si se busca la palabra sin quiere decir que puede buscar boletos sin productos
                                            return $query->whereHas('events', function ($queryEvents) use ($search) {
                                                return $queryEvents->whereHas('product', function ($queryProduct) use ($search) {
                                                    return $queryProduct->whereRaw('unaccent("titulo"::text) ILIKE unaccent(\'%'.$search.'%\')');
                                                });
                                            })->doesntHave('events', 'or');
                                        }
                                        break;
                                }

                                //si no se busca la palabra sin
                                if(stripos($search, 'sin') === FALSE){
                                    return $query->whereHas('events', function ($queryEvents) use ($search) {
                                        return $queryEvents->whereHas('product', function ($queryProduct) use ($search) {
                                            return $queryProduct->whereRaw('unaccent("titulo"::text) ILIKE unaccent(\'%'.$search.'%\')');
                                        });
                                    });
                                }
                                else{
                                    //si se busca la palabra sin quiere decir que puede buscar boletos sin productos
                                    return $query->whereHas('events', function ($queryEvents) use ($search) {
                                        return $queryEvents->whereHas('product', function ($queryProduct) use ($search) {
                                            return $queryProduct->whereRaw('unaccent("titulo"::text) ILIKE unaccent(\'%'.$search.'%\')');
                                        });
                                    })->doesntHave('events', 'or');
                                }
                            })
                            ->when($request->orderby, function ($query, $orderby) use ($request) {
                                switch ($orderby) {
                                    case 'id':
                                        if($request->order && $request->order == 'desc')
                                            return $query->orderBy('purchases.id', 'DESC');
                                        else
                                            return $query->orderBy('purchases.id', 'ASC');
                                        break;
                                    case 'producto':
                                        if($request->order && $request->order == 'desc')
                                            return $query->leftJoin('purchases_events', 'purchases_events.purchase_id', '=', 'purchases.id')
                                            ->leftJoin('events', 'purchases_events.event_id', '=', 'events.id')
                                            ->leftJoin('products', 'products.id', '=', 'events.product_id')->distinct()->selectRaw('titulo')->orderBy('titulo', 'DESC');
                                        else
                                            return $query->leftJoin('purchases_events', 'purchases_events.purchase_id', '=', 'purchases.id')
                                            ->leftJoin('events', 'purchases_events.event_id', '=', 'events.id')
                                            ->leftJoin('products', 'products.id', '=', 'events.product_id')->distinct()->selectRaw('titulo')->orderBy('titulo', 'ASC');
                                        break;
                                    case 'evento':
                                        if($request->order && $request->order == 'desc')
                                            return $query->leftJoin('purchases_events', 'purchases_events.purchase_id', '=', 'purchases.id')
                                            ->leftJoin('events', 'purchases_events.event_id', '=', 'events.id')->orderBy('ciudad', 'DESC');
                                        else
                                        return $query->leftJoin('purchases_events', 'purchases_events.purchase_id', '=', 'purchases.id')
                                            ->leftJoin('events', 'purchases_events.event_id', '=', 'events.id')->orderBy('ciudad', 'ASC');
                                        break;
                                    case 'usuario':
                                        if($request->order && $request->order == 'desc')
                                            return $query->join('users', 'users.id', '=', 'purchases.user_id')->orderByRaw('users.name DESC');
                                        else
                                            return $query->join('users', 'users.id', '=', 'purchases.user_id')->orderByRaw('users.name ASC');
                                        break;
                                    case 'telefono':
                                        if($request->order && $request->order == 'desc')
                                            return $query->join('users', 'users.id', '=', 'purchases.user_id')->orderByRaw('users.phone DESC');
                                        else
                                            return $query->join('users', 'users.id', '=', 'purchases.user_id')->orderByRaw('users.phone ASC');
                                        break;
                                    case 'boletos':
                                        if($request->order && $request->order == 'desc')
                                            return $query->orderBy('events_count', 'ASC');
                                        else
                                            return $query->orderBy('events_count', 'DESC');
                                        break;
                                    case 'pago':
                                        if($request->order && $request->order == 'desc')
                                            return $query->orderByRaw('coalesce(metodo_pago), metodo_pago DESC');
                                        else
                                            return $query->orderByRaw('coalesce(metodo_pago), metodo_pago ASC');
                                        break;
                                    case 'estatus':
                                        if($request->order && $request->order == 'desc')
                                            return $query->orderBy('confirmed', 'ASC');
                                        else
                                            return $query->orderBy('confirmed', 'DESC');
                                        break;
                                    
                                    default:
                                    return $query->orderBy('purchases.id', 'DESC');
                                        break;
                                }
                            }, function ($query) {
                                return $query->orderBy('purchases.id', 'DESC');
                            })
                            ->paginate(15)
                            ->withQueryString();

        return Inertia::render('Admin/Boletos/Boletos', [
            'tickets' => fn () => $tickets,
            'request' => $request
        ]);
    }

    public function show(Request $request, $uuid)
    {
        \Gate::authorize('haveaccess', 'admin.perm');
        $compra = Purchase::with('user', 'events', 'events.product', 'events.product.images')->where('uuid', $uuid)->firstOrFail();
        return Inertia::render('Admin/Boletos/Boleto', ['compra'=> $compra]);
    }

    public function update(Request $request, $id)
    {
        \Gate::authorize('haveaccess', 'admin.perm');

        \DB::beginTransaction();
        try {
            $purchase = Purchase::findOrFail($id);
            
            $purchase->confirmed = 1;
            $purchase->save();
            

            //Se env??a mail con boletos
            if($request->mail){
                Mail::to($request->mail)->send(new SendMailable($purchase->id));
                
            }
            else{
                Mail::to($purchase->user->email)->send(new SendMailable($purchase->id));
            }
            
            \DB::commit();
            $status = "El estatus de la compra se ha actualizado con ??xito";
            return redirect()->route('ticket.index')->with(compact('status'));
        } catch (\Throwable $th) {
           
            \DB::rollBack();
            
            $status = "Hubo un problema al procesar tu solicitud. Int??ntalo m??s tarde";
            return redirect()->route('ticket.index')->with(compact('status'));
        }
    }

    public function delete($id)
    {
        \DB::beginTransaction();
        try {
            $purchase = Purchase::findOrFail($id);

            $purchase->events()->detach();

            $purchase->delete();

            \DB::commit();
            $status = "La compra seleccionada ha sido eliminada";
            return redirect()->route('ticket.index')->with(compact('status'));
        } catch (\Throwable $th) {
           
            \DB::rollBack();
            $status = "Hubo un problema al procesar tu solicitud. Int??ntalo m??s tarde";
            return redirect()->route('ticket.index')->with(compact('status'));
        }
    }
}
