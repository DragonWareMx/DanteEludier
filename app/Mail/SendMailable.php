<?php

namespace App\Mail;

use App\Models\Purchase;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMailable extends Mailable
{
    use Queueable, SerializesModels;
    private $idPurchase;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($idPurchase)
    {
        $this->idPurchase = $idPurchase;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $purchase = Purchase::with(['purchases_events', 'purchases_events.event', 'purchases_events.event.product', 'user'])->findOrFail($this->idPurchase);
        return $this->subject('Su compra con Dante Eludier se ha realizado con éxito!')
            ->view('emails.pedidoemail', ['purchase' => $purchase]);
    }
}