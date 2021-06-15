<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('dates')->insert([
            'fecha' => '2021-07-02 15:30:00',
            'event_id' => '1',
            'horaCierre'=>'20:00:00'
        ]);

        DB::table('dates')->insert([
            'fecha' => '2021-07-03 08:00:00',
            'event_id' => '1',
            'horaCierre'=>'20:00:00'
        ]);

        DB::table('dates')->insert([
            'fecha' => '2021-07-04 09:00:00',
            'event_id' => '1',
            'horaCierre'=>'14:00:00'
        ]);

        DB::table('dates')->insert([
            'fecha' => '2021-07-16 15:30:00',
            'event_id' => '2',
            'horaCierre'=>'20:00:00'
        ]);

        DB::table('dates')->insert([
            'fecha' => '2021-07-17 08:00:00',
            'event_id' => '2',
            'horaCierre'=>'20:00:00'
        ]);

        DB::table('dates')->insert([
            'fecha' => '2021-07-18 09:00:00',
            'event_id' => '2',
            'horaCierre'=>'14:00:00'
        ]);

        DB::table('dates')->insert([
            'fecha' => '2021-07-13 15:30:00',
            'event_id' => '3',
            'horaCierre'=>'20:00:00'
        ]);

        DB::table('dates')->insert([
            'fecha' => '2021-07-14 08:00:00',
            'event_id' => '3',
            'horaCierre'=>'20:00:00'
        ]);

        DB::table('dates')->insert([
            'fecha' => '2021-07-15 09:00:00',
            'event_id' => '3',
            'horaCierre'=>'14:00:00'
        ]);
   }
}
