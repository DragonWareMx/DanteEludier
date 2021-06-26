<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\PurchasesEvents;

class EventoController extends Controller
{
    public function index($id)
    {
        $eventos =  Event::where('product_id', $id)->with('dates', 'product', 'product.images')->get();

        if (!$eventos) {
            return abort(403);
        }
        if (count($eventos) == 0) {
            return abort(403);
        }

        return Inertia::render('Evento', [
            'eventos' => $eventos
        ]);
    }

    public function verBolero($uuid)
    {
        $compra_evento = PurchasesEvents::where('uuid', $uuid)->first();
    }
}