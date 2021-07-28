<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; 
use App\Models\Event;
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
        $eventos=Event::join('products', 'events.product_id', 'products.id')
                        ->join('product_images','products.id','product_images.product_id')
                        ->with('dates')
                        ->select('product_images.foto','products.titulo','events.ciudad','events.sede','events.precio','events.descuento','events.id','events.limite')
                        ->paginate(4);


        // $eventos =  Event::where('product_id', $id)
        // ->whereNotIn('events.id', $eventosExpirados)
        // ->with('dates', 'product', 'product.images')
        // ->leftJoin('purchases_events','events.id', '=','purchases_events.event_id')
        // ->selectRaw('events.*, COUNT("purchases_events"."event_id") AS total')
        // ->groupBy('events.id','events.created_at','events.updated_at','events.ciudad','events.direccion','events.sede','events.precio','events.limite','events.descuento','events.product_id')
        // ->get();
 
        // dd($eventos);
        return Inertia::render('Admin/Eventos/Eventos',['eventos' => $eventos]);
    }

    public function show($id){ 
        return Inertia::render('Admin/Eventos/Evento');
    }
}
