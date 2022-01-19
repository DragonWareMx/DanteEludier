<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Mail\SendMailable;
use App\Mail\SendMailableTransfer;

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
    return redirect()->route('avatradingform');; //REDIRIGIMOS AL FORMULARIO POR MIENTRAS, CAMBIO SE HIZO EL 19 DE ENERO DE 2022
});

Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/inicio', [App\Http\Controllers\InicioController::class, 'index'])->name('inicio');

Route::get('/contacto', [App\Http\Controllers\ContactoController::class, 'index'])->name('contacto');
Route::post('/contactoSend', [App\Http\Controllers\ContactoController::class, 'contactoSend'])->name('contactoSend');

Route::get('/Dante', [App\Http\Controllers\DanteController::class, 'index'])->name('Dante');

Route::get('/productos', [App\Http\Controllers\ProductController::class, 'index'])->name('products.index');
Route::get('/productos/evento/{uuid}', [App\Http\Controllers\EventoController::class, 'index'])->name('evento');

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

// Route::get('/inertia', function () {
//     return Inertia::render('Test');
// });

Route::post('/productos/evento/{idEvento}/comprar', [App\Http\Controllers\PurchaseController::class, 'purchase'])->name('event.purchase');
Route::get('/productos/evento/{idEvento}/stripe', [App\Http\Controllers\PurchaseController::class, 'stripeIndex'])->name('event.stripe.index');
Route::post('/productos/evento/{idEvento}/stripe/pay', [App\Http\Controllers\PurchaseController::class, 'stripePay'])->name('event.stripe.pay');
Route::get('/paypal/status',  [App\Http\Controllers\PurchaseController::class, 'statusPayPal'])->name('statusPayPal');

Route::get('/boleto/{uuid}',  [App\Http\Controllers\EventoController::class, 'verBoleto'])->name('boleto.ver')->middleware('auth');
Route::get('/boleto/check/{uuid}',  [App\Http\Controllers\EventoController::class, 'check'])->name('check')->middleware('auth');
Route::get('/diploma/{uuid}', [App\Http\Controllers\EventoController::class, 'diploma'])->name('diploma')->middleware('auth');
Route::post('/getPdf', [App\Http\Controllers\EventoController::class, 'getDiploma'])->name('getDiploma');

////DOCUMENTOS ADJUNTOS AVATAR ////

Route::get('/adjuntos-avatar', function () {
    return Inertia::render('AvatarAdjuntos');
})->name('avatar.adjuntos')->middleware('auth');
// ->middleware('auth');

///////// DASHBOARD ////////
// Productos
Route::get('/dashboard/productos',  [App\Http\Controllers\ProductController::class, 'productos'])->name('dashboard.productos')->middleware('admin');
Route::get('/dashboard/productos/{uuid}',  [App\Http\Controllers\ProductController::class, 'verProducto'])->name('dashboard.producto')->middleware('admin');
Route::get('/dashboard/crearproducto',  [App\Http\Controllers\ProductController::class, 'crearProducto'])->name('crear.producto')->middleware('admin');
Route::post('/dashboard/storeproducto',  [App\Http\Controllers\ProductController::class, 'storeProducto'])->name('store.producto')->middleware('admin');
Route::get('/dashboard/editarproducto/{uuid}',  [App\Http\Controllers\ProductController::class, 'editarProducto'])->name('editar.producto')->middleware('admin');
Route::patch('/dashboard/patchproducto/{id}',  [App\Http\Controllers\ProductController::class, 'patchProducto'])->name('patch.producto')->middleware('admin');
Route::delete('/dashboard/productos/delete/{id}', [App\Http\Controllers\ProductController::class, 'delete'])->name('delete.producto')->middleware('admin');

// Eventos
Route::get('/dashboard/eventos', [App\Http\Controllers\EventController::class, 'index'])->name('dashboard.events');
Route::get('/dashboard/eventos/{id}', [App\Http\Controllers\EventController::class, 'show'])->name('dashboard.event');
Route::get('/dashboard/agregarEvento/{id}', [App\Http\Controllers\EventController::class, 'add'])->name('dashboard.eventAdd');
Route::patch('/dashboard/patchevento/{id}', [App\Http\Controllers\EventController::class, 'patchEvento'])->name('editar.event');
Route::post('/dashboard/agregarEvento/{id}', [App\Http\Controllers\EventController::class, 'newEvento'])->name('agregar.event');
Route::delete('/dashboard/eventos/delete/{id}', [App\Http\Controllers\EventController::class, 'deleteEvento'])->name('eliminarEvento');

// Boletos
Route::name('ticket.')->group(function () {
    Route::get('/dashboard/boletos', [App\Http\Controllers\PurchasesEventsController::class, 'index'])->name('index')->middleware('admin');
    Route::get('/dashboard/boleto/{uuid}', [App\Http\Controllers\PurchasesEventsController::class, 'show'])->name('show')->middleware('admin');
    Route::patch('/dashboard/boleto/{id}', [App\Http\Controllers\PurchasesEventsController::class, 'update'])->name('update')->middleware('admin');
    Route::delete('/dashboard/boleto/{id}', [App\Http\Controllers\PurchasesEventsController::class, 'delete'])->name('delete')->middleware('admin');
});

Route::get('/dashboard/inicio', [App\Http\Controllers\HomeController::class, 'index'])->name('dashboard.inicio');
Route::get('/dashboard', function () {
    return redirect()->route('dashboard.inicio');
});

//Diploma general Avatar
Route::get('/diploma-avatar', [App\Http\Controllers\EventoController::class, 'diplomaGeneral'])->name('diploma.general')->middleware('auth');
Route::post('/getAvatar', [App\Http\Controllers\EventoController::class, 'getAvatarPdf'])->name('getDiploma.general');

//Generar diplomas de cualquier avatar
Route::get('/diploma-avatar-admin', [App\Http\Controllers\EventoController::class, 'diplomasFecha'])->name('diploma.fecha')->middleware('auth');
Route::post('/get-diploma', [App\Http\Controllers\EventoController::class, 'getDiplomaFecha'])->name('getDiploma.fecha');


//Formulario registro Avatrading
Route::get('/formulario-registro', [App\Http\Controllers\WildcardController::class, 'formularioAvaT'])->name('avatradingform');
Route::post('/avatrading/crearregistro', [App\Http\Controllers\WildcardController::class, 'registrar'])->name('avatradingcreate');

//Formulario registro Avatar
Route::get('/avatar-registro', [App\Http\Controllers\WildcardController::class, 'registroAvatar'])->name('avatar.form');
Route::post('/avatar/crearregistro', [App\Http\Controllers\WildcardController::class, 'registrarAvatar'])->name('avatar.create');


//Formulario happy money movement Dante
Route::get('/hmm-registro', [App\Http\Controllers\WildcardController::class, 'registroHmm'])->name('hmm.form');
Route::post('/hmm/crearregistro', [App\Http\Controllers\WildcardController::class, 'registrarHmm'])->name('hmm.create');
