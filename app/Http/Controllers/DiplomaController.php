<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DiplomaController extends Controller
{
    public function index(){
        // return Inertia::render('Diploma');
        return view('diploma');
    }
}
