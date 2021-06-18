<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
use PayPal\Api\Details;
use App\Book;
use App\Sell;
use App\Book_Sell;
use App\Mail\SendMailable;
use App\Mail\SendMailableTransfer;
use App\Models\Event;
use App\Tipoenvio;
use App\Promotion;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

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

        $this->apiContext->setConfig([
            'mode' => 'sandbox',
            'log.LogEnabled' => true,
            'log.FileName' => 'PayPal.log',
            'log.LogLevel' => 'FINE'
        ]);
    }

    public function purchase($idEvento,  Request $request)
    {
        //dd($request);
        //esta wea de aqui abajo es provisional
        $request->total = '5049.00';
        $request->cantidad = 1;
        $request->tipo_pago = 'paypal';


        $payer = new Payer();
        $payer->setPaymentMethod('paypal');

        //parte para crear la lista de items que se van a cobrar
        $evento = Event::with('product')->findOrFail($idEvento);
        $items = [];
        $items[0] = new Item();
        $items[0]->setName($evento->product->titulo . ' - ' . $evento->sede . ', ' . $evento->ciudad)
            /** item name **/
            ->setCurrency('MXN')
            ->setQuantity($request->cantidad)
            ->setPrice(number_format($evento->precio, 2, ".", ""));
        //----------------------aqui falta meter el item del descuento :v pero aun no estoy seguro de como funciona
        $item_list = new ItemList();
        $item_list->setItems($items);

        //VARIABLES DE SESION
        // Session::put('email', $request->email);
        // Session::put('age', $request->age);
        // Session::put('genero', $request->genero);
        // Session::put('telefono', $request->tel);
        // Session::put('envio', $request->envio);
        // Session::put('referencias', $request->referencias);
        //Session::put('eventoId', $evento->id);
        $request->session()->put('eventoId', $evento->id);
        // Session::put('descuento', $request->descuento);

        $amount = new Amount();
        $amount->setTotal($request->total);
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

    public function statusPayPal(Request $request)
    {
        $paymentId = $request->input('paymentId');
        $payerId = $request->input('PayerID');
        $token = $request->input('token');

        if (!$paymentId || !$payerId || !$token) {
            $status = "No se pudo proceder con el pago através de PayPal.";
            return redirect()->route('evento', $request->session()->get('key');)->with(compact('status'));
        }
        $payment = Payment::get($paymentId, $this->apiContext);

        $execution = new PaymentExecution();
        $execution->setPayerId($payerId);

        $result = $payment->execute($execution, $this->apiContext);

        if ($result->getState() == 'approved') {
            //se registra la venta en la BD en la tabla Sell
            $sell = new Sell();
            $mytime = Carbon::now();
            $sell->status = 'completado';
            $sell->nombreCliente = $result->getPayer()->getPayerInfo()->getShippingAddress()->getRecipientName();
            $sell->edad = Session::get('age');
            $sell->pais = $result->getPayer()->getPayerInfo()->getShippingAddress()->getCountryCode();
            $sell->genero = Session::get('genero');
            $sell->ciudad = $result->getPayer()->getPayerInfo()->getShippingAddress()->city;
            $sell->estado = $result->getPayer()->getPayerInfo()->getShippingAddress()->getState();
            $sell->correo = Session::get('email');
            $sell->formaPago = "1";
            $sell->comprobantePago = "1";
            $sell->telefono = Session::get('telefono');
            $sell->direccion = $result->getPayer()->getPayerInfo()->getShippingAddress()->getLine1() . " " .
                $result->getPayer()->getPayerInfo()->getShippingAddress()->getLine2();
            $sell->fecha = $mytime->toDateString();
            if (Session::get('envio') != null) {
                $envio = Tipoenvio::findOrFail(Session::get('envio'));
                $sell->precio_envio = $envio->costo;
                $sell->nombre_envio = $envio->nombre . ' - ' . $envio->descripcion;
                if (Session::get('referencias') != null) {
                    $sell->direccion = $sell->direccion . ' Referencia: ' . Session::get('referencias');
                }
            }
            if (Session::get('cuponId') != null && Session::get('descuento') != null) {
                $sell->discount = Session::get('descuento');
                $sell->promotion_id = Session::get('cuponId');
            }
            $sell->save();

            foreach (session('cart') as $id => $details) {
                $libro = Book::findOrFail($id);
                if ($details['cantidadFisico'] > 0) {
                    $compra = new Book_Sell();
                    $compra->book_id = $libro->id;
                    $compra->sell_id = $sell->id;
                    $compra->precio = number_format(($libro->precioFisico - $libro->precioFisico * ($libro->descuentoFisico / 100)) * $details['cantidadFisico'], 2, ".", "");
                    $compra->digital = "0";
                    $compra->cantidad = $details['cantidadFisico'];
                    $compra->save();
                    $libro->stockFisico = $libro->stockFisico - $details['cantidadFisico'];
                    $libro->save();
                }
                if ($details['cantidadDigital'] > 0) {
                    $compra = new Book_Sell();
                    $compra->book_id = $libro->id;
                    $compra->sell_id = $sell->id;
                    $compra->precio = number_format(($libro->precioDigital - $libro->precioDigital * ($libro->descuentoDigital / 100)), 2, ".", "");
                    $compra->digital = "1";
                    $compra->cantidad = $details['cantidadDigital'];
                    $compra->save();
                }
            }
            //aqui acaba lo de registrar la venta en la bd
            Mail::to($sell->correo)->send(new SendMailable($sell->id));
            session()->forget('cart');
            $status = "Gracias! El pago a través de PayPal se ha procesado correctamente. Se te enviará un correo electrónico con los detalles de tu pedido.";
            return redirect()->route('tiendaCatalogo')->with(compact('status'));
        }
        $status = "Lo sentimos! El pago a través de PayPal no se pudo realizar.";
        return redirect()->route('carrito')->with(compact('status'));
    }
}