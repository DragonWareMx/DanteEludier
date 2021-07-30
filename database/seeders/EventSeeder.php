<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('events')->insert([
            'sede' => 'Holliday Inn Boca del Río',
            'ciudad'=>'Boca del Río',
            'direccion'=>'Blvd. Adolfo Ruiz Cortinez : 4298,
            Fracc. Costa De Oro',
            'precio' => '5049',
            'limite' => '30',
            'product_id'=> '1',
            'descuento'=>'0.10'
        ]);

        DB::table('events')->insert([
            'sede' => 'Multicentro las Américas',
            'ciudad'=>'Morelia',
            'direccion'=>'Perif. Paseo de la República No.3466, Ejidal Ocolusen, 58279 Morelia, Mich. ',
            'precio' => '5049',
            'limite' => '30',
            'product_id'=> '1',
            'descuento'=>'0.10'
        ]);

        DB::table('events')->insert([
            'sede' => 'Holliday Uruapan',
            'ciudad'=>'Uruapan',
            'direccion'=>'Blvd. Industrial 1705 Col, Uruapan, 60120',
            'precio' => '5049',
            'limite' => '30',
            'product_id'=> '1',
            'descuento'=>'0.10'
        ]);

        DB::table('purchases')->insert([
            'total' => '5000',
            'fecha' =>'2021-06-02',
            'user_id' =>'3',
        ]);

        DB::table('purchases')->insert([
            'total' => '5000',
            'fecha' =>'2021-07-02',
            'user_id' =>'3',
        ]);

        DB::table('purchases')->insert([
            'total' => '5000',
            'fecha' =>'2021-05-02',
            'user_id' =>'3',
            'metodo_pago' => 'paypal',
            'confirmed' => true,
        ]);

        //eventos extra para paginacion
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);
        // DB::table('purchases')->insert([
        //     'total' => '5000',
        //     'fecha' =>'2021-05-02',
        //     'user_id' =>'3',
        //     'metodo_pago' => 'paypal',
        //     'confirmed' => true,
        // ]);

        DB::table('purchases_events')->insert([
            'purchase_id' => '2',
            'event_id' =>'3',
            'precio' =>'5000',
            'asistio' =>'0',
            'descuento'=>'0.10',
            'uuid'=>'a1b10515-9f5a-4f36-b4c3-e97280e57b6c',
        ]);

        DB::table('purchases_events')->insert([
            'purchase_id' => '3',
            'event_id' =>'3',
            'precio' =>'5000',
            'asistio' =>'0',
            'descuento'=>'0.10',
            'uuid'=>'a1b10515-9f5a-4f36-b4c3-e97280e57b7b',
        ]);

        DB::table('purchases_events')->insert([
            'purchase_id' => '1',
            'event_id' =>'2',
            'precio' =>'5000',
            'asistio' =>'0',
            'descuento'=>'0.10',
            'uuid'=>'a1b10515-9f5a-4f36-b4c3-e97280e57b8a',
        ]);
 
    }
}
