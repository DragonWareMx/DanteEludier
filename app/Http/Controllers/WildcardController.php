<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Avatrading; //tabla para guardar registro de asistencia al evento del mismo nombre. NO EXISTE EN MIGRACIONES
use App\Models\Avatar; //tabla para guardar registro de asistencia al evento del mismo nombre. NO EXISTE EN MIGRACIONES


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
            'telefono' => 'required|digits:10',
            'procedencia'=>'required|max:255|',
            'facebook'=>'max:45',
            'instagram'=>'max:45',
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
            $status = "Hubo un problema, inténtalo de nuevo";
            return redirect()->route('avatradingform')->with(compact('status'));
        }
    }

    public function registroAvaTar()
    {
        return Inertia::render('AvatarRegistro');
    }

    public function registrarAvatar(Request $request)
    {
        $request->validate([
            'nombre' => 'required|max:255|',
            'mail' => 'required|max:255|email',
            'telefono' => 'required|digits:10',
            'procedencia'=>'required|max:255|',
        ]);

        try {
            \DB::beginTransaction();
            $registro = new Avatar();
            $registro->nombre = $request->nombre;
            $registro->mail = $request->mail;
            $registro->telefono =$request->telefono;
            $registro->procedencia =$request->procedencia;
            $registro->ciudad= "Cuernavaca, Mor.";
            $registro->fechas= "19,20 y 21 de noviembre de 2021";

            $registro->save();
            \DB::commit();
            $status = "Se registró exitosamente tu asistencia";
            return redirect()->route('avatar.form')->with(compact('status'));
        } catch (\Throwable $th) {
            \DB::rollback();
            dd($th);
            $status = "Hubo un problema, inténtalo de nuevo";
            return redirect()->route('avatar.form')->with(compact('status'));
        }
    }
}
