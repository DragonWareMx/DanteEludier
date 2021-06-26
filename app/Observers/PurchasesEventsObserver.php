<?php

namespace App\Observers;

use App\Models\PurchasesEvents;

class PurchasesEventsObserver
{
    //
    public function creating(PurchasesEvents $pe)
    {
        $pe->uuid = \Uuid::generate(4)->string;
    }
}