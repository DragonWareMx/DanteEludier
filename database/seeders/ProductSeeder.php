<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('products')->insert([
            'uuid' => Str::uuid(),
            'titulo' => 'Taller Vivencial Avatar Financiero',
            'descripcion' => 'Este taller te permite
            mejorar como ser humano.
            Te genera
            los hábitos que te permitirán
            tener una mente abundante.
            ¿La consecuencia?
            A partir de esto,
            OBTENDRÁS UNA ECONOMÍA PRÓSPERA...',
            'hojaDescriptiva' => 'avatar.pdf',
        ]);

        DB::table('products')->insert([
            'uuid' => Str::uuid(),
            'titulo' => 'Prosperity, inmersión total',
            'descripcion' => 'Proximamente más información',
        ]);
        
        DB::table('products')->insert([
            'uuid' => Str::uuid(),
            'titulo' => 'Cumbre financiera',
            'descripcion' => 'Proximamente. El evento VIP más esperado del año',
        ]);
    }
}
