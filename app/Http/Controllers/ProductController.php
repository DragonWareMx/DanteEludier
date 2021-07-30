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

        \Gate::authorize('haveaccess', 'admin.perm');
        $productos=Product::with('images:foto,product_id', 'events', 'events.dates', 'events.purchases')->orderBy('created_at','DESC')->get();

        return Inertia::render('Productos/Productos',[
            'productos'=>$productos,
        ]);
    }

    public function verProducto($id){
        $producto=Product::with('images:foto,product_id','events','events.dates','events.purchases')->findOrFail($id);
        $eventos=Event::where('events.product_id',$id)
                        ->join('products', 'events.product_id', 'products.id')
                        ->join('product_images','products.id','product_images.product_id')
                        ->with('dates')
                        ->leftJoin('purchases_events','events.id', '=','purchases_events.event_id')
                        ->leftJoin('purchases','purchases_events.purchase_id', '=','purchases.id')
                        ->selectRaw('product_images.foto ,products.titulo,events.ciudad,events.sede,
                        events.precio,events.descuento,events.id,events.limite, 
                        COUNT(purchases_events.event_id) AS total')
                        ->groupBy('product_images.foto','products.titulo','events.ciudad','events.sede','events.precio','events.descuento','events.id','events.limite')
                        // ->where('purchases.confirmed','=',1)
                        ->get();

        return Inertia::render('Productos/Producto',[
            'producto'=>$producto,
            'events'=>$eventos,
        ]);
    }

    public function crearProducto(){
        return Inertia::render('Productos/Crear');
    }

    public function storeProducto(Request $request){

        $data = $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
        ]);
        dd('BACKEND DE CREAR',$request);
    }

    public function editarProducto($id){
        $producto=Product::with('images:foto,product_id')->findOrFail($id);
        return Inertia::render('Productos/Editar',[
            'producto'=>$producto,
        ]);
    }

    public function patchProducto(Request $request,$id){
        dd('BACKEND DE EDITAR',$request, $id);
    }

    public function delete($id){
        \Gate::authorize('haveaccess', 'admin.perm');
        DB::beginTransaction();
        try {
            $producto = Product::find($id);
            $producto->delete();
            DB::commit();
            $status = "Producto eliminado con éxito";
            return redirect()->route('dashboard.productos')->with(compact('status'));
        } catch (\Throwable $th) {
            DB::rollBack();
            $status = "Hubo un problema al procesar tu solicitud. Inténtalo más tarde";
            return redirect()->route('dashboard.productos')->with(compact('status'));
        }
    }
}