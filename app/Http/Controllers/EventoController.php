<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\User;
use App\Models\PurchasesEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Permission\Models\Role;
use PDF;
use Illuminate\Support\Carbon;

class EventoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($id)
    {
        //regresa los ids de los eventos que tienen al menos una fecha expirada
        $eventosExpirados = Event::leftJoin('dates','events.id', '=','dates.event_id')
                        ->where('product_id', $id)
                        ->where('dates.fecha', '<', \Carbon\Carbon::now()->toDateTimeString())
                        ->select('events.id')
                        ->groupBy('events.id')
                        ->pluck('id')
                        ->toArray();

        $eventos =  Event::where('product_id', $id)
                        ->whereNotIn('events.id', $eventosExpirados)
                        ->with('dates', 'product', 'product.images')
                        ->leftJoin('purchases_events','events.id', '=','purchases_events.event_id')
                        ->selectRaw('events.*, COUNT(`purchases_events`.`event_id`) AS total')
                        ->groupBy('events.id','events.created_at','events.updated_at','events.ciudad','events.direccion','events.sede','events.precio','events.limite','events.descuento','events.product_id')
                        ->get();

        if (!$eventos) {
            return abort(403);
        }
        if (count($eventos) == 0) {
            return abort(403);
        }

        return Inertia::render('Evento', [
            'eventos' => $eventos
        ]);
    }

    public function verBoleto($uuid)
    {
        if (Auth::user()) {
            $compra_evento = PurchasesEvents::where('uuid', $uuid)->with('event', 'event.product', 'purchase', 'purchase.user', 'event.product.images')->first();
            return Inertia::render('Boleto', ['boleto' => $compra_evento, 'rol' => Auth::user()->roles[0]->name]);
        } else {
            return Inertia::render('register');
        }
    }
    public function check($uuid)
    {
        \Gate::authorize('haveaccess', 'check.perm');
        $compra_evento = PurchasesEvents::where('uuid', $uuid)->first();

        if ($compra_evento->asistio) {
            $status = "Este boleto ya fue marcado como usado";
            return redirect()->back()->with(compact('status'));
        } else {

            $compra_evento->asistio = true;
            $compra_evento->save();

            $status = "El boleto ha sido marcado con éxito";
            return redirect()->back()->with(compact('status'));
        }
    }

    public function diploma($uuid)
    {
        //después hay que poner que sólo se pueda generar un diploma por boleto
        \Gate::authorize('haveaccess', 'client.perm');
        $compra_evento = PurchasesEvents::where('uuid', $uuid)->with('event', 'event.product', 'purchase', 'purchase.user', 'event.product.images')->first();
        return Inertia::render('Diploma', ['boleto' => $compra_evento]);
    }

    public function getDiploma(Request $request)
    {
        $datos = $request->all();
        $compra_evento = PurchasesEvents::where('uuid', $datos['data']['uuid'])->with('event', 'event.product', 'purchase', 'purchase.user', 'event.product.images', 'event.dates')->first();

        $fechaS = "";

        $cant = count($compra_evento->event->dates) - 1;
        $dia = Carbon::now();
        foreach ($compra_evento->event->dates as $key => $date) {
            $dia = Carbon::parse($date->fecha);
            if ($key == 0) {
                $fechaS = $fechaS .  $dia->day;
            } else if ($cant == $key) {
                $fechaS = $fechaS . ' y ' .  $dia->day;
            } else {
                $fechaS = $fechaS . ', ' .  $dia->day;
            }
        };
        $fechaS = $fechaS . ' de ' . $dia->monthName . ' de ' . $dia->year;

        $data = [
            'nombre' => $datos['data']['nombre'],
            'ciudad' => $compra_evento->event->ciudad,
            'fechas' => $fechaS
        ];

        $pdf = PDF::loadView('diploma', $data)->setPaper('letter');
        return $pdf->download('diploma.pdf');
        // return response()->streamDownload(function () use ($pdf) {
        // echo $pdf->output();
        // }, 'invoice.pdf');

        // $pdf = PDF::loadHTML('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><body>HOLA</>');
        //     return $pdf->download('pdfview.pdf');
    }
}