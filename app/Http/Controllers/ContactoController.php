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
        Mail::to('oscarwaii@hotmmail.com')->send(new contactoMail($request));
        //aidee.vargas86@outlook.com
    }
}
