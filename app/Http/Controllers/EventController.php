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
                        ->leftJoin('purchases_events','events.id', '=','purchases_events.event_id')
                        ->leftJoin('purchases','purchases_events.purchase_id', '=','purchases.id')
                        ->selectRaw('product_images.foto ,products.titulo,events.ciudad,events.sede,
                        events.precio,events.descuento,events.id,events.limite, 
                        COUNT(purchases_events.event_id) AS total')
                        ->groupBy('product_images.foto','products.titulo','events.ciudad','events.sede','events.precio','events.descuento','events.id','events.limite')
                        // ->where('purchases.confirmed','=',1)
                        ->paginate(4);
 
        // dd($eventos);
        return Inertia::render('Admin/Eventos/Eventos',['eventos' => $eventos]);
    }

    public function show($id){ 
        return Inertia::render('Admin/Eventos/Evento');
    }
}
