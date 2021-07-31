<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Event;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


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

    public function verProducto($uuid){
        $producto=Product::with('images:foto,product_id','events','events.dates','events.purchases')->where('uuid', '=', $uuid)->firstOrFail();
        $eventos=Event::where('events.product_id',$producto->id)
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

        $request->validate([
            'titulo' => 'required',
            'descripcion' => 'required',
            'productoImagen' => 'required|image',
            'productoPdf' => 'required|mimes:pdf'
        ]);
        try {
            \DB::beginTransaction();
            $producto=new Product();
            $producto->titulo=$request->titulo;
            $producto->descripcion=$request->descripcion;
            $producto->uuid=Str::uuid();

            //guardar archivo del producto
            $file=$request->file('productoPdf');
            //storeAs recibe la ruta , el nombre que le queremos poner al archivo y el disco en este caso se creo el disco vileduid que tiene acceso directo a public
            $file->storeAs('documentos', $file->getClientOriginalName(),['disk' => 'viledruid']);
            $producto->hojaDescriptiva=$file->getClientOriginalName();

            //Guardar el producto para poder asignar una imagen después
            $producto->save();

            //guardar imagen del producto
            $imagen= new ProductImage();
            $imagen->product_id=$producto->id;
            $file=$request->file('productoImagen');
            //store solo recibe la ruta y el nombre del disco, automáticamente genera un nombre hasheado para el archivo el cual es único y después
            //para guardarlo en la base de datos lo hasheamos manualmente
            $file->store('img/productos', ['disk' => 'viledruid']);
            $imagen->foto=$file->hashName();
            $imagen->save();

            \DB::commit();

            return \Redirect::route('dashboard.productos')->with('success', 'Producto creado con éxito.');
            
            
        } catch (\Throwable $th) {
            \DB::rollback();
            return \Redirect::back()->with('error', 'Ha ocurrido un error al intentar procesar tu solicitud, inténtelo más tarde.');
        }

    }

    public function editarProducto($uuid){
        $producto=Product::with('images:foto,product_id')->where('uuid','=',$uuid)->firstOrFail();
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