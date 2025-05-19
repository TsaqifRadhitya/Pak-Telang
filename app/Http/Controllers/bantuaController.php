<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class bantuaController extends Controller
{
    public function index()
    {
        $Admin = User::where('role', 'Pak Telang')->first();
        $user = Auth::user();
        $lastChat = Message::where(function ($e) use ($Admin, $user) {
            $e->where('from', $Admin->id)->where('to', $user->id);
        })->orWhere(
            function ($e) use ($Admin, $user) {
                $e->where('to', $Admin->id)->where('from', $user->id);
            }
        )->orderBy('created_at', 'desc')->first();

        if ($lastChat) {
            $lastChat = [...$lastChat->toArray(), 'senderProfile' => $Admin, 'unreaded' => Message::where('to', $user->id)->where('from', $Admin->id)->where('isReaded', false)->count('id') ?? 0];
        } else {
            $lastChat = ['senderProfile' => $Admin];
        }
        return Inertia::render('Mitra/Bantuan/index', compact('lastChat'));
    }
}
