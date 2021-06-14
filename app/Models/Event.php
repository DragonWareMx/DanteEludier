<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    public function dates()
    {
        return $this->hasMany('App\Models\Date');
    }

    public function product()
    {
        return $this->belongsTo('App\Models\Product');
    }

    public function users()
    {
        return $this->belongsToMany('App\Models\User')->withPivot('cantidad');
    }

    public function purchases()
    {
        return $this->belongsToMany('App\Models\Purchase')->withPivot('asistio','precio','descuento');
    }

}
