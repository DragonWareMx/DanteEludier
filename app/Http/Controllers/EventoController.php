<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\User;
use App\Models\Product;
use App\Models\PurchasesEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Permission\Models\Role;
use PDF;
use Illuminate\Support\Carbon;

class EventoController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function index($uuid)
    {
        $product = Product::where('uuid', '=', $uuid)->firstOrFail();

        //regresa los ids de los eventos que tienen al menos una fecha expirada
        $eventosExpirados = Event::leftJoin('dates', 'events.id', '=', 'dates.event_id')
            ->where('product_id', $product->id)
            ->where('dates.fecha', '<', \Carbon\Carbon::now()->toDateTimeString())
            ->select('events.id')
            ->groupBy('events.id')
            ->pluck('id')
            ->toArray();

        $eventos =  Event::where('product_id', $product->id)
            ->whereNotIn('events.id', $eventosExpirados)
            ->with('dates', 'product', 'product.images')
            ->leftJoin('purchases_events', 'events.id', '=', 'purchases_events.event_id')
            ->selectRaw('events.*, COUNT(purchases_events.event_id) AS total')
            ->groupBy('events.id', 'events.created_at', 'events.updated_at', 'events.ciudad', 'events.direccion', 'events.sede', 'events.precio', 'events.limite', 'events.descuento', 'events.product_id', 'events.documento')
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
        $compra_evento = PurchasesEvents::where('uuid', $uuid)->with('event', 'event.product', 'purchase', 'purchase.user', 'event.product.images')->first();

        if (Auth::user()->roles[0]->name == "CheckTicket") {
            return Inertia::render('Boleto', ['boleto' => $compra_evento, 'rol' => Auth::user()->roles[0]->name]);
        } else if (Auth::user()->roles[0]->name == "Cliente") {
            if (Auth::user()->id == $compra_evento->purchase->user->id)
                return Inertia::render('Boleto', ['boleto' => $compra_evento, 'rol' => Auth::user()->roles[0]->name]);
            else return abort(403);
        } else {
            return abort(403);
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
        \Gate::authorize('haveaccess', 'client.perm');
        $compra_evento = PurchasesEvents::where('uuid', $uuid)->with('event', 'event.product', 'purchase', 'purchase.user', 'event.product.images')->first();

        if (Auth::user()->id == $compra_evento->purchase->user->id) {
            if ($compra_evento->asistio)
                return Inertia::render('Diploma', ['boleto' => $compra_evento]);
            else {
                $status = "No puedes solicitar tu diploma si no has acudido al taller. Tu boleto no ha sido usado";
                return redirect()->back()->with(compact('status'));
            }
        } else return abort(403);
    }
    public function diplomaGeneral()
    {
        \Gate::authorize('haveaccess', 'client.perm');
        return Inertia::render('DiplomaAvatar');
    }


    public function getDiploma(Request $request)
    {
        \Gate::authorize('haveaccess', 'client.perm');
        $datos = $request->all();
        $compra_evento = PurchasesEvents::where('uuid', $datos['data']['uuid'])->with('event', 'event.product', 'purchase', 'purchase.user', 'event.product.images', 'event.dates')->first();

        //Si ya tiene nombre en la base de datos si llega otro diferente de todos modos se pone en el diploma el de la base de datos
        //Si no hay nombre en la base de datos se guarda entonces el que llega del formulario.

        if ($compra_evento->nombre) {
            $datos['data']['nombre'] = $compra_evento->nombre;
        } else {
            $compra_evento->nombre = $datos['data']['nombre'];
            $compra_evento->save();
        }
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
    }

    public function getAvatarPdf(Request $request)
    {
        //genera un diploma general de avatar, sin restricciones

        \Gate::authorize('haveaccess', 'client.perm');
        $datos = $request->all();

        $data = [
            'nombre' => $datos['data']['nombre'],
            'ciudad' => 'León, Gto.',
            'fechas' => '5, 6 y 7 de noviembre de 2021'
        ];

        $pdf = PDF::loadView('diploma', $data)->setPaper('letter');
        return $pdf->download('diploma.pdf');
    }

    public function diplomasFecha()
    {
        \Gate::authorize('haveaccess', 'admin.perm');
        return Inertia::render('DiplomaFechas');
    }

    public function getDiplomaFecha(Request $request)
    {
        //genera un diploma general de avatar, sin restricciones

        \Gate::authorize('haveaccess', 'admin.perm');
        $datos = $request->all();

        $data = [
            'nombre' => $datos['data']['nombre'],
            'ciudad' => $datos['data']['ciudad'],
            'fechas' => $datos['data']['fecha'],
        ];

        $pdf = PDF::loadView('diploma', $data)->setPaper('letter');
        return $pdf->download('diploma.pdf');
    }

}
