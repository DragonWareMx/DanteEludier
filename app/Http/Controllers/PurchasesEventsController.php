<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Purchase;

class PurchasesEventsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $tickets = Purchase::select('id', 'confirmed', 'metodo_pago', 'user_id')
                            ->with('events:ciudad,sede,id,product_id','events.product:titulo,id','user:name,apellido_p,apellido_m,phone,id')
                            ->withCount('events')
                            ->when($request->search, function ($query, $search) use ($request) {
                                switch ($request->filter) {
                                    case 'evento':
                                        //si no se busca la palabra sin
                                        if(stripos($search, 'sin') === FALSE){
                                            return $query->whereHas('events', function ($queryEvents) use ($search) {
                                                return $queryEvents->where('ciudad', 'LIKE', '%'.$search.'%')
                                                                ->orWhere('sede', 'LIKE', '%'.$search.'%')
                                                                ->orWhereRaw(
                                                                    "concat(ciudad, ', ', sede) LIKE '%" . $search . "%'"
                                                                );
                                            });
                                        }
                                        else{
                                            //si se busca la palabra sin quiere decir que puede buscar boletos sin evento
                                            return $query->whereHas('events', function ($queryEvents) use ($search) {
                                                return $queryEvents->where('ciudad', 'LIKE', '%'.$search.'%')
                                                                ->orWhere('sede', 'LIKE', '%'.$search.'%')
                                                                ->orWhereRaw(
                                                                    "concat(ciudad, ', ', sede) LIKE '%" . $search . "%'"
                                                                );
                                            })->doesntHave('events', 'or');
                                        }
                                        break;
                                    case 'usuario':
                                        return $query->whereHas('user', function ($queryUser) use ($search) {
                                            return $queryUser->whereRaw(
                                                "concat(name, ' ', apellido_p, ' ', apellido_m) LIKE '%" . $search . "%'"
                                            )
                                            ->orWhereRaw(
                                                "concat(name, ' ', apellido_p) LIKE '%" . $search . "%' "
                                            )
                                            ->orWhere('name', 'LIKE', '%'.$search.'%');
                                        });
                                        break;
                                    case 'pago':
                                        # code...
                                        break;
                                    case 'estatus':
                                        # code...
                                        break;
                                    default:
                                        //si no se busca la palabra sin
                                        if(stripos($search, 'sin') === FALSE){
                                            return $query->whereHas('events', function ($queryEvents) use ($search) {
                                                return $queryEvents->whereHas('product', function ($queryProduct) use ($search) {
                                                    return $queryProduct->where('titulo', 'LIKE', '%'.$search.'%');
                                                });
                                            });
                                        }
                                        else{
                                            //si se busca la palabra sin quiere decir que puede buscar boletos sin productos
                                            return $query->whereHas('events', function ($queryEvents) use ($search) {
                                                return $queryEvents->whereHas('product', function ($queryProduct) use ($search) {
                                                    return $queryProduct->where('titulo', 'LIKE', '%'.$search.'%');
                                                });
                                            })->doesntHave('events', 'or');
                                        }
                                        break;
                                }

                                //si no se busca la palabra sin
                                if(stripos($search, 'sin') === FALSE){
                                    return $query->whereHas('events', function ($queryEvents) use ($search) {
                                        return $queryEvents->whereHas('product', function ($queryProduct) use ($search) {
                                            return $queryProduct->where('titulo', 'LIKE', '%'.$search.'%');
                                        });
                                    });
                                }
                                else{
                                    //si se busca la palabra sin quiere decir que puede buscar boletos sin productos
                                    return $query->whereHas('events', function ($queryEvents) use ($search) {
                                        return $queryEvents->whereHas('product', function ($queryProduct) use ($search) {
                                            return $queryProduct->where('titulo', 'LIKE', '%'.$search.'%');
                                        });
                                    })->doesntHave('events', 'or');
                                }
                            })
                            ->paginate(1)
                            ->withQueryString();

        return Inertia::render('Admin/Boletos/Boletos', [
            'tickets' => fn () => $tickets,
            'request' => $request
        ]);
    }

    public function show(Request $request, $id)
    {
        
        $compra = Purchase::with('user', 'events', 'events.product', 'events.product.images')->find($id);
        return Inertia::render('Admin/Boletos/Boleto', ['compra'=> $compra]);
    }

    public function update(Request $request, $id)
    {
        //
    }
}
