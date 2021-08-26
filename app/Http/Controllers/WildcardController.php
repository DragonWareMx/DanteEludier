<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Avatrading; //tabla para guardar registro de asistencia al evento del mismo nombre


class WildcardController extends Controller
{
    public function formularioAvaT()
    {
        return Inertia::render('AvaTrading');
    }

    public function registrar(Request $request)
    {
        $request->validate([
            'nombre' => 'required|max:255|',
            'mail' => 'required|max:255|email',
            'telefono' => 'required',
            'procedencia'=>'required|max:255|',
        ]);

        try {
            \DB::beginTransaction();
            $registro = new Avatrading();
            $registro->nombre = $request->nombre;
            $registro->mail = $request->mail;
            $registro->telefono =$request->telefono;
            $registro->procedencia =$request->procedencia;

            if($request->facebook) $registro->facebook = $request->facebook;
            
            if($request->instagram) $registro->instagram = $request->instagram;
            
            $registro->save();
            \DB::commit();
            $status = "Se registró exitosamente tu asistencia";
            return redirect()->route('avatradingform')->with(compact('status'));
        } catch (\Throwable $th) {
            \DB::rollback();
            dd($th);
            $status = "Hubo un problema, inténtalo de nuevo";
            return redirect()->route('avatradingform')->with(compact('status'));
        }
    }
}
