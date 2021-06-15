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
            'product_id'=> '1'
        ]);

        DB::table('events')->insert([
            'sede' => 'Multicentro las Américas',
            'ciudad'=>'Morelia',
            'direccion'=>'Perif. Paseo de la República No.3466, Ejidal Ocolusen, 58279 Morelia, Mich. ',
            'precio' => '5049',
            'limite' => '30',
            'product_id'=> '1'
        ]);

        DB::table('events')->insert([
            'sede' => 'Holliday Uruapan',
            'ciudad'=>'Uruapan',
            'direccion'=>'Blvd. Industrial 1705 Col, Uruapan, 60120',
            'precio' => '5049',
            'limite' => '30',
            'product_id'=> '1'
        ]);
        
    }
}
