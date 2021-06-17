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
        // Session::put('cuponId', $request->cuponId);
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
            return redirect()->away($payment->getApprovalLink());
        } catch (PayPalConnectionException $ex) {

            echo $ex->getData();
        }
    }

    public function statusPayPal()
    {
    }
}