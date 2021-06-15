<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Partner;

class InicioController extends Controller
{
    public function index()
    {
        $clientes=Partner::get();
        return Inertia::render('Inicio',[
            'clientes' => $clientes,
        ]);
    }
}
