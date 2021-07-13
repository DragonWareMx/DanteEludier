<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Event;

class ProductController extends Controller
{
    public function index()
    {
        //regresa los ids de los eventos que tienen al menos una fecha expirada
        $eventos = Event::leftJoin('dates','events.id', '=','dates.event_id')
                        ->where('dates.fecha', '<', \Carbon\Carbon::now()->toDateTimeString())
                        ->select('events.id')
                        ->groupBy('events.id')->get();

        return Inertia::render('Products', [
            'products' => Product::with('images:foto,product_id', 'events:precio,product_id')
                                ->orderBy('created_at','DESC')
                                ->paginate(4)
        ]);
    }

    public function libros(){
        return Inertia::render('Libros');
    }
}