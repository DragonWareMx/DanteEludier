<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchasesEvents;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
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

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $num_products = Product::get()->count();
        $num_events = Event::get()->count();
        $num_vendidos = PurchasesEvents::whereHas('purchase', function ($query) {
            return $query->where('confirmed', '=', 1);
        })->get()->count();
        $num_pendientes = Purchase::where('confirmed', '=', 0)->get()->count();
        return Inertia::render('Admin/Inicio', [
            'num_products' => $num_products,
            'num_events' => $num_events,
            'num_vendidos' => $num_vendidos,
            'num_pendientes' => $num_pendientes
        ]);
    }
}