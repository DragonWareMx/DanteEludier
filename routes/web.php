<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('inicio');
});

Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/inicio', [App\Http\Controllers\InicioController::class, 'index'])->name('inicio');

Route::get('/contacto', [App\Http\Controllers\ContactoController::class, 'index'])->name('contacto');

Route::get('/Dante', [App\Http\Controllers\DanteController::class, 'index'])->name('Dante');

Route::get('/productos', [App\Http\Controllers\ProductController::class, 'index'])->name('products.index');
Route::get('/productos/evento/{id}', [App\Http\Controllers\EventoController::class, 'index'])->name('evento');

Route::get('/libros', [App\Http\Controllers\ProductController::class, 'libros'])->name('libros');

Route::get('/Stripe', function () {
    return Inertia::render('Stripe');
})->name('stripe');

Route::get('/Terminos-y-condiciones', function () {
    return Inertia::render('Terminos');
})->name('terminos');

Route::get('/Aviso-de-privacidad', function () {
    return Inertia::render('Privacidad');
})->name('aviso');

Route::post('/join', [App\Http\Controllers\InicioController::class, 'join'])->name('join');

Route::get('/inertia', function () {
    return Inertia::render('Ejemplo');
});

Route::post('/productos/evento/{idEvento}/comprar', [App\Http\Controllers\PurchaseController::class, 'purchase'])->name('event.purchase');
Route::get('/productos/evento/{idEvento}/stripe', [App\Http\Controllers\PurchaseController::class, 'stripeIndex'])->name('event.stripe.index');
Route::get('/paypal/status',  [App\Http\Controllers\PurchaseController::class, 'statusPayPal'])->name('statusPayPal');