<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Partner;
use App\Models\book;
use App\Models\Bulletin;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;


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

    public function join(Request $request){
        $data = $request->validate([
            'email' => 'required|unique:bulletins|max:255|email',
        ]);


        DB::beginTransaction();
        
        try {
            $bulletin = new Bulletin();
            $bulletin->email = $data['email'];
            $bulletin->save();
            DB::commit();
            session()->flash('status', 'Registrado con éxito.');
            return redirect()->back();

        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back();
        }
    }
}

