<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $usuario = Auth::user()->roles;
            foreach ($usuario as $rol) {
                if ($rol->slug == 'admin') {
                    return $next($request);
                }
            }
            abort(403);
        }
        return redirect('/login');
    }
}