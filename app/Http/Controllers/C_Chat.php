<?php

namespace App\Http\Controllers;

use App\Mail\broadcastMail;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class C_Chat extends Controller
{
    public function getChatRoom($id)
    {
        $receiver = User::find($id);
        $currentUser = Auth::user();
        $messages = Message::where(function ($query) use ($id, $currentUser) {
            $query->where('from', $id)
                ->where('to', $currentUser->id);
        })->orWhere(function ($query) use ($id, $currentUser) {
            $query->where('from', $currentUser->id)
                ->where('to', $id);
        })
            ->orderBy('created_at', 'asc')
            ->get()->map(function ($msg) {
                if ($msg->image != null) {
                    $msg->image = json_decode($msg->image);
                }
                return $msg;
            });

        Message::where('from', $id)->where('to', $currentUser->id)->update(
            ['isReaded' => true]
        );
        return Inertia::render('Pak Telang/chat/V_DetailChat', compact('messages', 'receiver'));
    }

    public function allPerson()
    {
        $persons = User::whereNot('id', '=', Auth::user()->id)->get();
        $persons->each(function ($person) {
            $person->profile_picture = json_decode($person->profile_picture);
        });
        return Inertia::render('chat/allPerson', compact('persons'));
    }

    public function pushChat(Request $request, $id)
    {
        Message::create([
            'id' => $request->id,
            'message' => $request->input('message'),
            'from' => Auth::user()->id,
            'to' => $id,
            'isReaded' => false,
            'created_at' => $request->created_at,
            'image' => json_encode($request->image)
        ]);
        // return response()->json(['message' => 'success']);
    }

    public function index()
    {
        $chatPerson = User::whereNot('role', 'Pak Telang')->where(function ($e) {
            $e->whereHas('messageSend')->orWhereHas('messageReceives');
        })->get();

        $messages = $chatPerson->map(function ($user) {
            return [
                'senderProfile' => $user->toArray(),
                ...Message::where(function ($i) use ($user) {
                    $i->where('from', $user->id)->orWhere('to', $user->id);
                })->orderBy('created_at', 'desc')->first()->toArray(),
                'unreaded' => Message::where('from', $user->id)->where('isReaded', false)->count()
            ];
        })->sortByDesc('created_at')->values();
        return Inertia::render('Pak Telang/chat/V_Chat', compact('messages'));
    }

    public function swr()
    {
        $chatPerson = User::whereNot('role', 'Pak Telang')->where(function ($e) {
            $e->whereHas('messageSend')->orWhereHas('messageReceives');
        })->get();

        $messages = $chatPerson->map(function ($user) {
            return [
                'senderProfile' => $user->toArray(),
                ...Message::where(function ($i) use ($user) {
                    $i->where('from', $user->id)->orWhere('to', $user->id);
                })->orderBy('created_at', 'desc')->first()->toArray(),
                'unreaded' => Message::where('from', $user->id)->where('isReaded', false)->count()
            ];
        })->sortByDesc('created_at')->values();

        return response()->json($messages);
    }

    public function indexMitra()
    {
        $user = Auth::user();
        $receiver = User::where('role', 'Pak Telang')->first();

        Message::where('from', $receiver->id)->where('to', $user->id)->update(
            ['isReaded' => true]
        );
        $messages = Message::where(function ($e) use ($receiver, $user) {
            $e->where('from', $receiver->id)->where('to', $user->id);
        })->orWhere(
            function ($e) use ($receiver, $user) {
                $e->where('to', $receiver->id)->where('from', $user->id);
            }
        )->orderBy('created_at', 'asc')->get()->map(function ($msg) {
            if ($msg->image != null) {
                $msg->image = json_decode($msg->image);
            }
            return $msg;
        });
        return Inertia::render('Mitra/Chat/V_DetailChat', compact('messages', 'receiver'));
    }

    public function destroy($id)
    {
        Message::destroy($id);
    }

    public function broadcast(Request $request)
    {
        $mitra = User::whereHas('mitra')->get('email')->map(fn($mitra) => $mitra->email)->toArray();
        Mail::bcc($mitra)->send(new broadcastMail($request->title, $request->pesan));
        return back()->with('success', 'Berhasil Mengirimkan Pesan Broadcast');
    }
}
