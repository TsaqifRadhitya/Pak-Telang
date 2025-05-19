<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class messageController extends Controller
{
    public function getChatRoom($id)
    {
        $target = User::whereId($id)->first();
        $currentUser = Auth::user();
        $messages = Message::where(function ($query) use ($id, $currentUser) {
            // Messages sent to current user from target
            $query->where('from', $id)
                ->where('to', $currentUser->id);
        })->orWhere(function ($query) use ($id, $currentUser) {
            // Messages sent from current user to target
            $query->where('from', $currentUser->id)
                ->where('to', $id);
        }) // Eager load relationships if needed
            ->orderBy('created_at', 'asc')
            ->get();
        return Inertia::render('chat/roomChat', compact('messages', 'target'));
    }

    public function allPerson()
    {
        $persons = User::whereNot('id', '=', Auth::user()->id)->get();
        $persons->each(function ($person) {
            $person->profile_picture = json_decode($person->profile_picture);
        });
        return Inertia::render('chat/allPerson', compact('persons'));
    }

    public function pustChat(Request $request, $id)
    {
        Message::create(['message' => $request->input('message'), 'from' => Auth::user()->id, 'to' => $id]);
        // return response()->json(['message' => 'success']);
    }

    public function index()
    {
        $personChatRoom = Message::with('sender')->get()->groupBy('from');
    }

    public function indexMitra()
    {
        $user = Auth::user();
        $receiver = User::where('role', 'Pak Telang')->first();

        Message::where('from',$receiver->id)->where('to', $user->id)->update(
            ['isReaded' => true]
        );
        $messages = Message::where(function ($e) use ($receiver, $user) {
            $e->where('from', $receiver->id)->where('to', $user->id);
        })->orWhere(
            function ($e) use ($receiver, $user) {
                $e->where('to', $receiver->id)->where('from', $user->id);
            }
        )->orderBy('created_at', 'desc')->get();

        return Inertia::render('Mitra/Chat/create', compact('messages', 'receiver'));
    }

    public function destroy($id)
    {
        Message::destroy($id);
    }
}
