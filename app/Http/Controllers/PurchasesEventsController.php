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
                            ->paginate(1);

        return Inertia::render('Admin/Boletos/Boletos', [
            'tickets' => $tickets,
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
