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
        ]);
        $data['send_date'] = now();
        $newMessage = Message::create($data);
        return response()->json(['message' => new MessageResource($newMessage)], 201);
    }

    public function getUserMessages(string $id)
    {
        return response()->json(['messages' => MessageResource::collection(Message::where('user_id', $id)->get())], 200);
    }

    public function AcceptMessage(string $id)
    {
        try {
            $message = Message::findOrFail($id);
            $message->update(['status' => 'accepted']);
            return response()->json(['message' => new MessageResource($message)], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Message not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while accepting the message'], 500);
        }
    }
    public function RejectedMessage(string $id)
    {
        try {
            $message = Message::findOrFail($id);
            $message->update(['status' => 'rejected']);
            return response()->json(['message' => new MessageResource($message)], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Message not found'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while rejecting the message'], 500);
        }
    }

    public function destroy(string $id)
    {
        Message::findOrFail($id)->delete();
    }
}
