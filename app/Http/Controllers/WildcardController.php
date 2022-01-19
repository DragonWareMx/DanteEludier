<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Models\Avatrading; //tabla para guardar registro de asistencia al evento del mismo nombre. NO EXISTE EN MIGRACIONES
use App\Models\Avatar; //tabla para guardar registro de asistencia al evento del mismo nombre. NO EXISTE EN MIGRACIONES
use App\Models\Poll; //tabla para la encuesta de Happy money movement

class WildcardController extends Controller
{
    public function formularioAvaT()
    {
        return Inertia::render('AvaTrading');
    }

    public function registrar(Request $request)
    {
        $request->validate([
            'nombre' => ['required','max:50', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'mail' => 'required|email',
            'telefono' => ['required','max:25','regex:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/i','min:10'],
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
            'nombre' => ['required','max:25', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'apellidos'=> ['required','max:50', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'mail' => 'required|email',
            'telefono' => ['required','max:25','regex:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/i','min:10'],
            'procedencia'=>'required|max:210',
            'alergias_o_enfermedades' => 'nullable|max:250',
            'medicamentos' => 'nullable|max:250'
        ]);

        try {
            \DB::beginTransaction();
            $registro = new Avatar();
            $registro->nombre = $request->nombre;
            $registro->apellidos = $request->apellidos;
            $registro->mail = $request->mail;
            $registro->telefono =$request->telefono;
            $registro->procedencia =$request->procedencia;

            $registro->ciudad= "Cuernavaca, Mor.";
            $registro->fechas= "19,20 y 21 de noviembre de 2021";

            if($request->medicamentos) $registro->medicamentos = $request->medicamentos;

            if($request->alergias_o_enfermedades) $registro->enfermedades = $request->alergias_o_enfermedades;

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

    public function registroHmm()
    {
        return Inertia::render('HmmRegistro');
    }

    public function registrarHmm(Request $request)
    {
        $request->validate([
            'nombre' => ['required','max:25', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'apellidos'=> ['required','max:50', 'regex:/^[A-Za-z0-9À-ÖØ-öø-ÿ_! \"#$%&\'()*+,\-.\\:\/;=?@^_]+$/'],
            'mail' => 'required|email|unique:polls',
            'telefono' => ['required','max:25','regex:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/i','min:10'],
            'procedencia'=>'required|max:210',
            'avatar'=>'required',
            'dinero_espiritual'=>'required',
            'curso_solvencia'=>'required',
            'conoces_axen'=>'required',
        ]);

        if ($request->avatar == 'true')
            $request->validate([
                'ciudad_avatar'=>'required|max:210',
                'quien_te_invito'=>'required|max:210',
            ]);

        if ($request->conoces_axen == 'true')
            $request->validate([
                'eres_cliente'=>'required',
                'staff'=>'required',
            ]);


        try {
            \DB::beginTransaction();
            $registro = new Poll();
            $registro->nombre = $request->nombre;
            $registro->apellidos = $request->apellidos;
            $registro->mail = $request->mail;
            $registro->telefono =$request->telefono;
            $registro->procedencia =$request->procedencia;


            if($request->avatar == 'true'){
                $registro->avatar= true;
                $registro->ciudad_avatar= $request->ciudad_avatar;
                $registro->quien_te_invito =$request->quien_te_invito;
            }

            if($request->conoces_axen == 'true'){
                $registro->conoces_axen= true;
                $registro->eres_cliente= $request->eres_cliente;
                $registro->eres_staff =$request->staff;
            }
            $registro->dinero_espiritual= $request->dinero_espiritual;
            $registro->curso_solvencia= $request->curso_solvencia;

            if($request->todas=='true'){
                $registro->fb = true;
                $registro->tw = true;
                $registro->insta = true;
                $registro->youtube = true;
                $registro->tiktok = true;
            }
            else{
                if($request->fb=='true') $registro->fb=true;
                if($request->tw=='true') $registro->tw=true;
                if($request->insta=='true') $registro->insta=true;
                if($request->youtube=='true') $registro->youtube=true;
                if($request->tiktok=='true') $registro->tiktok=true;
            }

            $registro->save();
            \DB::commit();
            $status = "Gracias por tus respuestas";
            return redirect()->route('inicio')->with(compact('status'));
        } catch (\Throwable $th) {
            \DB::rollback();
            dd($th);
            $status = "Hubo un problema, inténtalo de nuevo";
            return redirect()->route('hmm.form')->with(compact('status'));
        }
    }
}
