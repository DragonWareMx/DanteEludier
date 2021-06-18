<?php

namespace App\Mail;

use App\Models\Event;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMailableTransfer extends Mailable
{
    use Queueable, SerializesModels;
    private $idEvento;
    private $idUsuario;
    private $cantidad;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($idEvento, $idUsuario, $cantidad)
    {
        $this->idEvento = $idEvento;
        $this->idUsuario = $idUsuario;
        $this->cantidad = $cantidad;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $evento = Event::with('product')->findOrFail($this->idEvento);
        $usuario = User::findOrFail($this->idUsuario);

        return $this->subject('Estás a 2 pasos de completar tu compra con Dante Eludier!')
            ->view('emails.transferemail', ['evento' => $evento, 'usuario' => $usuario, 'cantidad' => $this->cantidad]);
    }
}