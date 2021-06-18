<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    public function events()
    {
        return $this->belongsToMany('App\Models\Event')->withPivot('asistio', 'precio', 'descuento');
    }

    public function purchases_events()
    {
        return $this->hasMany('App\Models\PurchasesEvents');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}