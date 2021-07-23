<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchases_events', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->uuid('uuid')->unique();
            $table->unsignedBigInteger('purchase_id');
            $table->foreign('purchase_id')->references('id')->on('purchases');

            //nombre de la persona que asistio
            $table->string('nombre', 355)->nullable();

            //metodo de pago para comprar el boleto
            $table->enum('metodo_pago', ['paypal', 'stripe', 'transferencia']);
            //si es transferencia, sera true cuando se confirme la transferencia
            $table->boolean('confirmed')->default(false);

            $table->unsignedBigInteger('event_id');
            $table->foreign('event_id')->references('id')->on('events');

            $table->decimal('precio');
            $table->decimal('descuento')->nullable();

            $table->tinyInteger('asistio');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchases_events');
    }
}