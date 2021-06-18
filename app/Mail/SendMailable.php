<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMailable extends Mailable
{
    use Queueable, SerializesModels;
    private $idEvento;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($idEvento)
    {
        $this->idEvento = $idEvento;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $sell = Sell::findOrFail($this->idVenta);
        $librosVendidos = Book_Sell::where('sell_id', $sell->id)->get();
        $libros = Book::get();
        $cupones = Promotion::get();
        $links = [];
        $cont = 0;
        if ($sell->discount == 'descargas') {
            foreach ($librosVendidos as $libro) {
                if ($libro->digital == 1) {
                    $link = \Linkeys\UrlSigner\Facade\UrlSigner::generate(route('descargar'), ['id_libro' => $libro->book_id]);
                    $links[$cont] = $link->getFullUrl();
                } else {
                    $links[$cont] = null;
                }
                $cont++;
            }
        } else {
            foreach ($librosVendidos as $libro) {
                if ($libro->digital == 1) {
                    $link = \Linkeys\UrlSigner\Facade\UrlSigner::generate(route('descargar'), ['id_libro' => $libro->book_id], '+720 hours', 3);
                    $links[$cont] = $link->getFullUrl();
                } else {
                    $links[$cont] = null;
                }
                $cont++;
            }
        }
        return $this->subject('Su compra con Dante Eludier se ha realizado con éxito!')
            ->view('emails.pedidoemail', ['sell' => $sell, 'librosVendidos' => $librosVendidos, 'libros' => $libros, 'links' => $links, 'cupones' => $cupones]);
    }
}