<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChatCollection;
use auth;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Http\Resources\ChatResource;
use App\Http\Resources\MessageResource;
use App\Http\Requests\SendMessageRequest;

class ChatController extends Controller
{
    public function SendMessage(SendMessageRequest $request){
        $validated=$request->validated();
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        if($user->id==$validated->reciver_id){
            return response()->json([
                "message"=>"can not send message to your self"
            ],400);
        }

        $chat = Chat::where(function ($query) use ($user, $validated) {
            $query->where('user1_id', $user->id)
                  ->where('user2_id', $validated->receiver_id);
        })->orWhere(function ($query) use ($user, $validated) {
            $query->where('user1_id', $validated->receiver_id)
                  ->where('user2_id', $user->id);
        })->first();
        
        if ($chat==null) {
            $chat = new Chat();
            $chat->user1_id = $user->id;
            $chat->user2_id = $validated->receiver_id;
            $chat->save();            
        }
        $validated['user_id']=$user->id;
        $validated['chat_id']=$chat->id;
        $message=Message::create($validated);
        
        return response()->json(new MessageResource($message));
    }
    public function GetChat(Chat $chat){
        return response()->json(new ChatResource($chat));
    }
    public function GetAllChats(){
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }
        $chats=Chat::where('user1_id', $user->id)
                ->orWhere('user2_id',$user->id)->get();
        return response()->json(new ChatCollection($chats));
    }
}
