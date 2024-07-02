<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateChatRequest;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\MessageResource;
use App\Http\Resources\ChatResource;
use App\Http\Resources\ChatCollection;

class ChatController extends Controller
{
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
            $chat = new Chat();
            $chat->user1_id = $user->id;
            $chat->user2_id = $validated['reciver_id'];
            $chat->save();
        }
        $validated['user_id'] = $user->id;
        $validated['chat_id'] = $chat->id;
        $message = Message::create($validated);

        // Response
        return response()->json([
            'message' => new MessageResource($message)
        ], 201);
    }

    public function GetChat(Chat $chat)
    {
        // Response
        return response()->json([
            'chat' => new ChatResource($chat)
        ], 200);
    }

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
    public function CreateChat(CreateChatRequest $request){
        $validated=$request->validated();
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
            $chat = new Chat();
            $chat->user1_id = $user->id;
            $chat->user2_id = $validated['reciver_id'];
            $chat->save();
        }
        return response()->json([
            "message"=>"Chat created successfully",
            "chat"=>new ChatResource($chat)
        ],201);
    }
}
