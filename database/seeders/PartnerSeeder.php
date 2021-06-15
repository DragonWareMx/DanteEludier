<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('partners')->insert([
            'nombre' => 'utrilla',
            'logo' => 'utrilla.png',
            'link' => 'https://www.facebook.com/editorialutrillamx/',
        ]);
        
        DB::table('partners')->insert([
            'nombre' => 'Give Fundation',
            'logo' => 'GF.png',
            'link' => 'https://www.givevolunteers.org/foundation/',
        ]);
        
        DB::table('partners')->insert([
            'nombre' => 'BMW',
            'logo' => 'BMW.png',
            'link' => 'https://www.bmw.com.mx/es/index.html',
        ]);
        
        DB::table('partners')->insert([
            'nombre' => 'Hospital Fray Juan de San Miguel',
            'logo' => 'frayJuanSM.png',
            'link' => 'http://www.hospitalfrayjuan.com/sitio/',
        ]);
        
        DB::table('partners')->insert([
            'nombre' => 'Axen Capital',
            'logo' => 'axen.png',
            'link' => 'https://axencapital.com/',
        ]);

        
        DB::table('partners')->insert([
            'nombre' => 'Mary Kay',
            'logo' => 'MK.png',
            'link' => 'https://www.marykay.com.mx/',
        ]);

        
        DB::table('partners')->insert([
            'nombre' => 'Nice',
            'logo' => 'nice.png',
            'link' => 'https://niceonline.com.mx/',
        ]);

        
        DB::table('partners')->insert([
            'nombre' => 'Somecath',
            'logo' => 'someCath.png',
            'link' => 'https://www.facebook.com/SOMECATH/',
        ]);
    }
}
