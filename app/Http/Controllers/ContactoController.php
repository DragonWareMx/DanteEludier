<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Mail\contactoMail;
use Illuminate\Support\Facades\Mail;

class ContactoController extends Controller
{
    public function index()
    {
        return Inertia::render('Contacto');
    }

    public function contactoSend(Request $request){
        $data = $request->validate([
            'nombre' => 'required|max:255|',
            'email' => 'required|max:255|email',
            'mensaje' => 'required',
        ]);
        try {
            Mail::to('aidee.vargas86@outlook.com')->send(new contactoMail($request));
            //aidee.vargas86@outlook.com

            $status = "Correo enviado con éxito.";
            return redirect()->back()->with(compact('status'));
        } catch (\Throwable $th) {
            $status = "Ha ocurrido un error inesperado, por favor vuelva a intentarlo más tarde.";
            return redirect()->back()->with(compact('status'));
        }
    }
}
