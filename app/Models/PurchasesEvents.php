<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasesEvents extends Model
{
    use HasFactory;

    public function event()
    {
        return $this->belongsTo('App\Models\Event');
    }
    public function purchase()
    {
        return $this->belongsTo('App\Models\Purchase');
    }
}