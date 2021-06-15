<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('product_images')->insert([
            'foto' => 'avatar.jpg',
            'product_id' => '1',
        ]);

        
        DB::table('product_images')->insert([
            'foto' => 'prosperity.jpg',
            'product_id' => '2',
        ]);

        
        DB::table('product_images')->insert([
            'foto' => 'financiero.jpg',
            'product_id' => '3',
        ]);
    }
}
