<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Partner;
use App\Models\book;

class InicioController extends Controller
{
    public function index()
    {
        $clientes=Partner::get();
        $libro=book::inRandomOrder()->first();
        return Inertia::render('Inicio',[
            'clientes' => $clientes,
            'libro' => $libro,
        ]);
    }
}
