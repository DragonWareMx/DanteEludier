<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([

            UserSeeder::class,
            PermissionSeeder::class,
            ProductSeeder::class,
            EventSeeder::class,
            DateSeeder::class,
            PartnerSeeder::class,
            ProductImagesSeeder::class,

            //para producción se deben comentar UserSeeeder, PermissionSeeder, EventSeeder y DateSeeder
    
        ]);
    }
}
