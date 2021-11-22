<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Date;
use App\Models\Product;
use App\Models\PurchasesEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('admin');
    }

    public function index(){
        // Enlistar todos los eventos

        // Checar las comillas de count al subir al server
        $eventos=Event::join('products', 'events.product_id', 'products.id')
                        ->join('product_images','products.id','product_images.product_id')
                        ->with('dates')
                        ->leftJoin('purchases_events','events.id', '=','purchases_events.event_id')
                        ->leftJoin('purchases','purchases_events.purchase_id', '=','purchases.id')
                        ->selectRaw('product_images.foto ,products.titulo,events.ciudad,events.sede,
                        events.precio,events.descuento,events.id,events.limite,
                        COUNT(purchases_events.event_id) AS total')
                        ->groupBy('product_images.foto','products.titulo','events.ciudad','events.sede','events.precio','events.descuento','events.id','events.limite')
                        ->OrderBy('products.titulo')
                        ->paginate(4);

                        // dd($eventos);

        return Inertia::render('Admin/Eventos/Eventos',['eventos' => $eventos]);
    }

    public function show($id){
        $evento=Event::join('products', 'events.product_id', 'products.id')
                        ->join('product_images','products.id','product_images.product_id')
                        ->with('dates')
                        ->select('product_images.foto', 'products.titulo', 'events.ciudad', 'events.sede',
                        'products.uuid',
                        'events.direccion','events.precio', 'events.descuento', 'events.id', 'events.limite')
                        ->findOrFail($id);
        // dd($evento);

        return Inertia::render('Admin/Eventos/Evento',['evento' => $evento]);
    }

    public function patchEvento(Request $request,$id){
        $data = $request->validate([
            'ciudad' => 'required|max:255',
            'direccion' => 'required|max:255',
            'sede' => 'required|max:255',
            'precio' => 'required|min:0',
            'limite' => 'required|min:0',
            'descuento' => 'required|min:0|max:100',
        ]);
        //COMIENZA LA TRANSACCION
        DB::beginTransaction();

        try {
            $evento=Event::findOrfail($id);

            $evento->ciudad = $request->ciudad;
            $evento->direccion = $request->direccion;
            $evento->sede = $request->sede;
            $evento->precio = $request->precio;
            $evento->limite = $request->limite;
            $descDeci = $request->descuento / 100;
            $evento->descuento = $descDeci;

            $evento->save();

            //SE HACE COMMIT
            DB::commit();

            $status = "El evento ha sido actualizado con éxito";
            return redirect()->route('dashboard.events')->with(compact('status'));
            //REDIRECCIONA A LA VISTA DE EVENTOS

        } catch (\Exception $e) {
            DB::rollBack();

            $status = "Hubo un problema al procesar tu solicitud. Inténtalo más tarde";
            return redirect()->route('dashboard.events')->with(compact('status'));
        }
    }

    public function add($id){
        // id del producto
        $producto=Product::join('product_images','products.id','product_images.product_id')
                            ->select('product_images.foto', 'products.titulo','products.id', 'products.uuid')
                            ->findOrFail($id);
        // dd($producto);
        return Inertia::render('Admin/Eventos/AgregarEvento',['producto' => $producto]);
    }

    public function newEvento(Request $request,$id){
        $data = $request->validate([
            'ciudad' => 'required|max:255',
            'direccion' => 'required|max:255',
            'sede' => 'required|max:255',
            'precio' => 'required|min:0',
            'limite' => 'required|min:0',
            'descuento' => 'required|min:0|max:100',
            'fecha_y_hora_de_inicio'=> 'required',
        ]);
        //COMIENZA LA TRANSACCION
        DB::beginTransaction();

        try {
            $evento=new Event;

            $evento->ciudad = $request->ciudad;
            $evento->direccion = $request->direccion;
            $evento->sede = $request->sede;
            $evento->precio = $request->precio;
            $evento->limite = $request->limite;
            $evento->product_id = $id;
            $descDeci = $request->descuento / 100;
            $evento->descuento = $descDeci;

            $evento->save();

            // FALTAN GUARDAR FECHAS
            $i =0;
            foreach ($request->fecha_y_hora_de_inicio as $fecha) {
                $newDate = new Date;
                $newDate->event_id = $evento->id;
                $newDate->fecha =$fecha;
                $newDate->horaCierre = $request->hora_cierre[$i];
                $newDate->save();
                $i++;
            }

            //SE HACE COMMIT
            DB::commit();

            $status = "El evento ha sido creado con éxito";
            return redirect()->route('dashboard.events')->with(compact('status'));
            //REDIRECCIONA A LA VISTA DE EVENTOS

        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            $status = "Hubo un problema al procesar tu solicitud. Inténtalo más tarde";
            return redirect()->route('dashboard.events')->with(compact('status'));

        }
    }

    public function deleteEvento($id){
        DB::beginTransaction();
        try {
            $evento = Event::findOrFail($id);
            // buscar y eliminar dates
            Date::where('event_id',$id)->delete();

            $evento->delete();
            DB::commit();
            $status = "Evento eliminado con éxito";
            return redirect()->route('dashboard.events')->with(compact('status'));
        } catch (\Throwable $th) {
            DB::rollBack();
            $status = "Hubo un problema al procesar tu solicitud. Inténtalo más tarde";
            return redirect()->route('dashboard.events')->with(compact('status'));
        }
    }
}
