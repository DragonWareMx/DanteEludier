<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Config;
use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Payer;
use PayPal\Api\Amount;
use PayPal\Api\Transaction;
use PayPal\Api\RedirectUrls;
use PayPal\Api\Payment;
use PayPal\Api\PaymentExecution;
use PayPal\Exception\PayPalConnectionException;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use App\Mail\SendMailable;
use App\Mail\SendMailableTransfer;
use App\Models\Event;
use App\Models\Purchase;
use App\Models\PurchasesEvents;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Cartalyst\Stripe\Laravel\Facades\Stripe;
use Cartalyst\Stripe\Exception\CardErrorException;


class PurchaseController extends Controller
{
    //paso 1
    private $apiContext;
    public function __construct()
    {
        $payPalConfig = Config::get('paypal');
        $this->apiContext = new ApiContext(
            new OAuthTokenCredential(
                $payPalConfig['client_id'],     // ClientID
                $payPalConfig['secret']      // ClientSecret
            )
        );

        // $this->apiContext->setConfig([
        //     'mode' => 'sandbox',
        //     'log.LogEnabled' => true,
        //     'log.FileName' => 'PayPal.log',
        //     'log.LogLevel' => 'FINE'
        // ]);
        $this->apiContext->setConfig($payPalConfig['settings']);
    }

    public function purchase($idEvento,  Request $request)
    {
        //verificar que estén logeados
        if (!auth()->user()) {
            $status = "Necesitas inciar sesión para comprar.";
            return redirect()->back()->with(compact('status'));
        }
        //verificar que si coincidan los ids del evento
        if ($idEvento != $request->evento['evento']) {
            $status = "Ha ocurrido un error inesperado, intentalo mas tarde.";
            return redirect()->back()->with(compact('status'));
        }
        $evento = Event::with('product')->findOrFail($idEvento);
        if ($request->values['tipo_de_pago'] == 'Transferencia') {
            //se registra la venta en la BD en la tabla Purchases

            $total = ($evento->precio * $request->values['cantidad']) * (1 - ($evento->descuento));

            $purchase = new Purchase();
            $mytime = Carbon::now();
            $purchase->fecha = $mytime->toDateString();
            $purchase->user_id = auth()->user()->id;
            $purchase->total = $total;
            $purchase->metodo_pago = 'transferencia';
            $purchase->confirmed = 0;
            $purchase->uuid = Str::uuid();
            $purchase->save();

            for ($i = 0; $i < $request->values['cantidad']; $i++) {
                $compra_evento = new PurchasesEvents();
                $compra_evento->purchase_id = $purchase->id;
                $compra_evento->event_id = $evento->id;
                $compra_evento->precio = $evento->precio;
                $compra_evento->descuento = $evento->descuento;
                $compra_evento->asistio = 0;
                $compra_evento->save();
            }

            Mail::to(auth()->user()->email)->send(new SendMailableTransfer($idEvento, auth()->user()->id, $request->values['cantidad']));
            $status = "Gracias! Se te enviará un correo electrónico con los detalles de tu pedido y los pasos a seguir para completarlo.";
            return redirect()->back()->with(compact('status'));
        } else {
            //verificar que si haya cupo todavia
            $cupo = PurchasesEvents::whereHas('purchase', function ($query) {
                return $query->where('confirmed', '=', 1);
            })->where('event_id', $idEvento)->count();
            $cupo = $cupo + $request->values['cantidad'];
            if ($cupo > $evento->limite) {
                $status = "Lo sentimos, el evento seleccionado ya no tiene espacios disponibles.";
                return redirect()->back()->with(compact('status'));
            }
            if ($request->values['tipo_de_pago'] == 'Stripe') {
                session(['cantidad' => $request->values['cantidad']]);
                return response('', 409)
                    ->header('X-Inertia-Location', route('event.stripe.index', $evento->id));
                //return redirect()->route('event.stripe.index', $evento->id);
            }

            if ($request->values['tipo_de_pago'] == 'Paypal') {
                $total = 0;
                $payer = new Payer();
                $payer->setPaymentMethod('paypal');

                //parte para crear la lista de items que se van a cobrar
                $items = [];
                $items[0] = new Item();
                $items[0]->setName($evento->product->titulo . ' - ' . $evento->sede . ', ' . $evento->ciudad)
                    /** item name **/
                    ->setCurrency('MXN')
                    ->setQuantity($request->values['cantidad'])
                    ->setPrice(number_format($evento->precio, 2, ".", ""));
                //----------------------aqui falta meter el item del descuento :v pero aun no estoy seguro de como funciona
                $descuento = $evento->descuento * 100;
                if ($descuento > 0) {
                    $items[1] = new Item();
                    $items[1]->setName('Descuento del ' . $descuento . ' % ')
                        /** item name **/
                        ->setCurrency('MXN')
                        ->setQuantity('1')
                        ->setPrice('-' . number_format(($evento->precio * ($evento->descuento)) *  $request->values['cantidad'], 2, ".", ""));
                    $total = ($evento->precio * (1 - $evento->descuento)) * $request->values['cantidad'];
                }
                $item_list = new ItemList();
                $item_list->setItems($items);

                //VARIABLES DE SESION
                session(['eventoId' => $evento->id]);
                session(['productoId' => $evento->product->id]);
                session(['cantidad' => $request->values['cantidad']]);
                session(['total' => $total]);

                $amount = new Amount();
                $amount->setTotal($total);
                $amount->setCurrency('MXN');

                $transaction = new Transaction();
                $transaction->setAmount($amount);
                $transaction->setDescription('Compra en Dante Eludier');
                $transaction->setItemList($item_list);

                $callbackurl = route('statusPayPal');
                $redirectUrls = new RedirectUrls();
                $redirectUrls->setReturnUrl($callbackurl)
                    ->setCancelUrl($callbackurl);

                $payment = new Payment();
                $payment->setIntent('sale')
                    ->setPayer($payer)
                    ->setTransactions(array($transaction))
                    ->setRedirectUrls($redirectUrls);

                try {
                    $payment->create($this->apiContext);
                    //echo $payment;
                    return response('', 409)
                        ->header('X-Inertia-Location', $payment->getApprovalLink());
                } catch (PayPalConnectionException $ex) {

                    echo $ex->getData();
                }
            }
        }

        $status = "Ha ocurrido un error inesperado, intentalo mas tarde.";
        return redirect()->back()->with(compact('status'));
    }

    public function statusPayPal(Request $request)
    {
        $paymentId = $request->input('paymentId');
        $payerId = $request->input('PayerID');
        $token = $request->input('token');

        if (!$paymentId || !$payerId || !$token) {
            $status = "No se pudo proceder con el pago através de PayPal.";
            return redirect()->route('evento', session('productoId'))->with(compact('status'));
        }
        $payment = Payment::get($paymentId, $this->apiContext);

        $execution = new PaymentExecution();
        $execution->setPayerId($payerId);

        $result = $payment->execute($execution, $this->apiContext);

        if ($result->getState() == 'approved') {
            //se registra la venta en la BD en la tabla Purchases
            $purchase = new Purchase();
            $mytime = Carbon::now();
            $purchase->fecha = $mytime->toDateString();
            $purchase->user_id = auth()->user()->id;
            $purchase->total = session('total');
            $purchase->metodo_pago = 'paypal';
            $purchase->confirmed = 1;
            $purchase->uuid = Str::uuid();
            $purchase->save();

            $evento = Event::findOrFail(session('eventoId'));
            for ($i = 0; $i < session('cantidad'); $i++) {
                $compra_evento = new PurchasesEvents();
                $compra_evento->purchase_id = $purchase->id;
                $compra_evento->event_id = $evento->id;
                $compra_evento->precio = $evento->precio;
                $compra_evento->descuento = $evento->descuento;
                $compra_evento->asistio = 0;
                $compra_evento->save();
            }

            //aqui acaba lo de registrar la venta en la bd
            Mail::to(auth()->user()->email)->send(new SendMailable($purchase->id));
            $productoId = session('productoId');
            session()->forget('eventoId');
            session()->forget('cantidad');
            session()->forget('productoId');
            session()->forget('total');
            $status = "Gracias! El pago a través de PayPal se ha procesado correctamente. Se te enviará un correo electrónico con los detalles de tu pedido.";
            return redirect()->route('evento', $productoId)->with(compact('status'));
        }
        $status = "Lo sentimos! El pago a través de PayPal no se pudo realizar.";
        return redirect()->route('evento', session('productoId'))->with(compact('status'));
    }

    public function stripeIndex($idEvento)
    {
        //return Inertia::render('Stripe');
        // if (Request::inertia()) {
        //     return response('', 409)
        //         ->header('X-Inertia-Location', url()->current());
        // }
        $evento = Event::with('product')->findOrFail($idEvento);
        $cantidad =  session('cantidad');
        //session()->forget('cantidad');

        return view('compra', ['evento' => $evento, 'cantidad' => $cantidad]);
    }

    public function stripePay($idEvento, Request $request)
    {
        if ($idEvento != $request->eventoId) {
            $status = "Ocurrió un error, intentalo más tarde.";
            return redirect()->back()->with(compact('status'));
        }
        $evento = Event::with('product')->findOrFail($idEvento);
        try {
            $contents = $evento->product->titulo . ' - ' . $evento->sede  . ' -' . $evento->ciudad;
            $quantity = $request->cantidad;
            $content = json_encode($contents);

            $total = ($evento->precio * $request->cantidad) * (1 - ($evento->descuento));

            $charge = Stripe::charges()->create([
                'amount' => $total,
                'currency' => 'MXN',
                'source' => $request->stripeToken,
                'description' => 'Compra con Dante Eludier',
                'receipt_email' => auth()->user()->email,
                'metadata' => [
                    'contents' => $content,
                    'quantity' => $quantity,
                ],
            ]);

            //SUCCESSFUL

            $purchase = new Purchase();
            $mytime = Carbon::now();
            $purchase->fecha = $mytime->toDateString();
            $purchase->user_id = auth()->user()->id;
            $purchase->total = $total;
            $purchase->metodo_pago = 'stripe';
            $purchase->confirmed = 1;
            $purchase->uuid = Str::uuid();
            $purchase->save();

            for ($i = 0; $i < $request->cantidad; $i++) {
                $compra_evento = new PurchasesEvents();
                $compra_evento->purchase_id = $purchase->id;
                $compra_evento->event_id = $evento->id;
                $compra_evento->precio = $evento->precio;
                $compra_evento->descuento = $evento->descuento;
                $compra_evento->asistio = 0;
                $compra_evento->save();
            }

            //aqui acaba lo de registrar la venta en la bd
            Mail::to(auth()->user()->email)->send(new SendMailable($purchase->id));
            $productoId = session('productoId');
            session()->forget('eventoId');

            $status = "Gracias por tu compra! Se te enviará un correo electrónico con los detalles de tu pedido.";
            return redirect()->route('evento', $evento->product->id)->with(compact('status'));
        } catch (CardErrorException $e) {
            //throw $th;
            if ($e->getMessage() == 'Your card has insufficient funds.') {
                $status = 'Error! Tu tarjeta no tiene fondos suficientes.';
            } else if ($e->getMessage() == 'Your card was declined.') {
                $status = 'Error! Tu tarjeta fue declinada.';
            } else if ($e->getMessage() == 'Your card has expired.') {
                $status = 'Error! Tu tarjeta ha expirado.';
            } else if ($e->getMessage() == "Your card's security code is incorrect.") {
                $status = 'Error! El código de seguridad de tu tarjeta es incorrecto.';
            } else if ($e->getMessage() == "An error occurred while processing your card. Try again in a little bit.") {
                $status = 'Error! Un problema ocurrió mientras procesabamos tu tarjeta. Inténtalo de nuevo más tarde.';
            } else {
                $status = 'Error! ' . $e->getMessage();
            }
            return redirect()->route('event.stripe.index', $evento->id)->with(compact('status'));
        }
    }
}