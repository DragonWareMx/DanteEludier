<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductImage;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products', [
            'productos'=> Product::with('images','events')->get(),
        ]);

    }
}
