<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\PurchasesEvents;

class PurchasesEventsController extends Controller
{
    public function index(Request $request)
    {
        $tickets = PurchasesEvents::get();
        
        return Inertia::render('Admin/Boletos/Boletos', [
            'tickets' => $tickets,
        ]);
    }

    public function show(Request $request, $id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }
}
