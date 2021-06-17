<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {

        return Inertia::render('Products', [
            'products' => Product::with('images:foto,product_id', 'events:precio,product_id')->orderBy('created_at','DESC')->paginate(2)
        ]);
    }
}