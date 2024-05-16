<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return response()->json(['messages' => MessageResource::collection(Message::all())], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'title' => ['required', 'string'],
            'content' => ['required', 'string'],
            'send_date' => ['required', 'date'],
        ]);
        $newMessage = Message::create($data);
        return response()->json(['message' => new MessageResource($newMessage)], 201);
    }

    public function destroy(string $id)
    {
        Message::findOrFail($id)->delete();
    }
}
