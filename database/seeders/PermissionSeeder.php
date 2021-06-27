<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Permission\Models\Role;
use App\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $rolAdmin = Role::create([
            'name' => 'Administrador',
            'slug' => 'admin',
            'description' => 'Administrador',
            'full-access' => 'no'
        ]);
        $rolCheck = Role::create([
            'name' => 'CheckTicket',
            'slug' => 'check',
            'description' => 'quien checa los boletos',
            'full-access' => 'no'
        ]);
        $rolClient = Role::create([
            'name' => 'Cliente',
            'slug' => 'client',
            'description' => 'cliente de los sitios',
            'full-access' => 'no'
        ]);


        $user1 = User::find(1);
        $user2 = User::find(2);
        $user3 = User::find(3);
        $user1->roles()->sync([$rolAdmin->id]);
        $user2->roles()->sync([$rolCheck->id]);
        $user3->roles()->sync([$rolClient->id]);
        
        //permisos
        $permission_all = [];
        $permission_check = [];
        $permission_client = [];
        $permission_adm = [];
        

        ///////////////permisos para Usuarios//////////////////////////////////////////////////////////////////////////
        $permission = Permission::create([
            'name' => 'checador',
            'slug' => 'check.perm',
            'description' => 'El usuario es un checador de tickets'
        ]);
        $permission_all[] = $permission->id;
        $permission_check[] = $permission->id;

        $permission = Permission::create([
            'name' => 'Admin',
            'slug' => 'admin.perm',
            'description' => 'El usuario es un Admin'
        ]);
        $permission_all[] = $permission->id;
        $permission_adm[] = $permission->id;

        $permission = Permission::create([
            'name' => 'Cliente',
            'slug' => 'client.perm',
            'description' => 'El usuario es un Cliente'
        ]);
        $permission_all[] = $permission->id;
        $permission_client[] = $permission->id;

        $rolAdmin->permissions()->sync($permission_adm);
        $rolCheck->permissions()->sync($permission_check);
        $rolClient->permissions()->sync($permission_client);
    }
}
