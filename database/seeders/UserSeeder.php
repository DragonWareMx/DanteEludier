<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('users')->insert([
            'name' => 'Developer',
            'email' =>  'test@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'phone' => '4432021993',
        ]);
        DB::table('users')->insert([
            'name' => 'Checador',
            'email' =>  'checador@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'phone' => '4432021993',
        ]);

        DB::table('users')->insert([
            'name' => 'Cliente',
            'email' =>  'cliente@dragonware.com.mx',
            'password' => Hash::make('viledruid9000'),
            'phone' => '4432021993',
        ]);

    }
}
