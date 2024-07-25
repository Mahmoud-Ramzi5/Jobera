<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\MessageResource;
use App\Http\Resources\ChatResource;
use App\Http\Resources\ChatCollection;

class ChatController extends Controller
{
    public function GetAllChats()
    {
        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get chats
        $chats = Chat::where('user1_id', $user->id)
            ->orWhere('user2_id', $user->id)->get();

        // Response
        return response()->json([
            'chats' => new ChatCollection($chats)
        ], 200);
    }

    public function GetChat(Request $request, $id)
    {
        // Get chat
        $chat = Chat::find($id);

        // Check chat
        if ($chat == null) {
            return response()->json([
                'errors' => ['chat' => 'Invalid chat']
            ], 404);
        }

        // Response
        return response()->json([
            'chat' => new ChatResource($chat)
        ], 200);
    }

    public function CreateChat(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'reciver_id' => ['required', 'exists:users,id']
        ]);

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get chat
        $chat = Chat::where(function ($query) use ($user, $validated) {
            $query->where('user1_id', $user->id)
                ->where('user2_id', $validated['reciver_id']);
        })->orWhere(function ($query) use ($user, $validated) {
            $query->where('user1_id', $validated['reciver_id'])
                ->where('user2_id', $user->id);
        })->first();

        // Check chat
        if ($chat == null) {
            $chat = Chat::create([
                'user1_id' => $user->id,
                'user2_id' => $validated['reciver_id']
            ]);
        }

        // Response
        return response()->json([
            "message" => "Chat created successfully",
            "chat" => new ChatResource($chat)
        ], 201);
    }

    public function SendMessage(SendMessageRequest $request)
    {
        // Validate request
        $validated = $request->validated();

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }
        if ($user->id == $validated['reciver_id']) {
            return response()->json([
                "message" => "can not send message to your self"
            ], 400);
        }

        // Get chat
        $chat = Chat::where(function ($query) use ($user, $validated) {
            $query->where('user1_id', $user->id)
                ->where('user2_id', $validated['reciver_id']);
        })->orWhere(function ($query) use ($user, $validated) {
            $query->where('user1_id', $validated['reciver_id'])
                ->where('user2_id', $user->id);
        })->first();

        // Check chat
        if ($chat == null) {
            $chat = Chat::create([
                'user1_id' => $user->id,
                'user2_id' => $validated['reciver_id']
            ]);
        }

        // Create message
        $message = Message::create([
            'user_id' => $user->id,
            'chat_id' => $chat->id,
            'message' => $validated['message']
        ]);

        // Response
        return response()->json([
            'message' => new MessageResource($message)
        ], 201);
    }
}
