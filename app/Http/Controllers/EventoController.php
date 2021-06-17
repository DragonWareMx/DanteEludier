<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;

class EventoController extends Controller
{
    public function index($id)
    {
        return Inertia::render('Evento', [
            'eventos' => Event::where('product_id', $id)->with('dates', 'product')->get()
        ]);
    }
}
