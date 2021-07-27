<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Event;
use Illuminate\Support\Facades\DB;


class ProductController extends Controller
{
    public function index()
    {
        //regresa los ids de los eventos que tienen al menos una fecha expirada
        $eventos = Event::leftJoin('dates','events.id', '=','dates.event_id')
                        ->where('dates.fecha', '<', \Carbon\Carbon::now()->toDateTimeString())
                        ->select('events.id')
                        ->groupBy('events.id')
                        ->pluck('id')
                        ->toArray();
        
        return Inertia::render('Products', [
            'products' => Product::with(['images:foto,product_id', 'events' => function($query) use ($eventos){
                                    return $query->whereNotIn('id', $eventos);
                                }])
                                ->orderBy('created_at','DESC')
                                ->paginate(4)
        ]);
    }

    public function libros(){
        return Inertia::render('Libros');
    }

    public function productos(){
        $productos=Product::with('images:foto,product_id', 'events', 'events.dates', 'events.purchases')->orderBy('created_at','DESC')->get();

        return Inertia::render('Productos/Productos',[
            'productos'=>$productos,
        ]);
    }

    public function verProducto($id){
        $producto=Product::with('images:foto,product_id')->findOrFail($id);
        return Inertia::render('Productos/Producto',[
            'producto'=>$producto,
        ]);
    }

    public function delete($id){
        DB::beginTransaction();
        try {
            $producto = Product::find($id);
            $producto->delete();
            DB::commit();
            $status = "Producto eliminado con éxito";
            return redirect()->route('dashboard.productos')->with(compact('status'));
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
            $status = "Hubo un problema al procesar tu solicitud. Inténtalo más tarde";
            return redirect()->route('dashboard.productos')->with(compact('status'));
        }
    }
}