<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message;
use App\Events\NewMessage;
use App\Events\NewNotification;
use Illuminate\Http\Request;
use App\Http\Requests\SendMessageRequest;
use App\Http\Resources\MessageResource;
use App\Http\Resources\ChatResource;
use App\Http\Resources\ChatsCollection;

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
            'chats' => new ChatsCollection($chats)
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
            'receiver_id' => ['required', 'exists:users,id']
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
                ->where('user2_id', $validated['receiver_id']);
        })->orWhere(function ($query) use ($user, $validated) {
            $query->where('user1_id', $validated['receiver_id'])
                ->where('user2_id', $user->id);
        })->first();

        // Check chat
        if ($chat == null) {
            $chat = Chat::create([
                'user1_id' => $user->id,
                'user2_id' => $validated['receiver_id']
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
        if ($user->id == $validated['receiver_id']) {
            return response()->json([
                'errors' => ['error'=>"can't send messages to yourself"]
            ], 400);
        }

        // Get chat
        $chat = Chat::where(function ($query) use ($user, $validated) {
            $query->where('user1_id', $user->id)
                ->where('user2_id', $validated['receiver_id']);
        })->orWhere(function ($query) use ($user, $validated) {
            $query->where('user1_id', $validated['receiver_id'])
                ->where('user2_id', $user->id);
        })->first();

        // Check chat
        if ($chat == null) {
            $chat = Chat::create([
                'user1_id' => $user->id,
                'user2_id' => $validated['receiver_id']
            ]);
        }

        // Create message
        $message = Message::create([
            'message' => $validated['message'],
            'sender_id' => $user->id,
            'receiver_id' => $validated['receiver_id'],
            'chat_id' => $chat->id
        ]);

        // Push Notification
        broadcast(new NewMessage($message));
        broadcast(new NewNotification($validated['receiver_id'], $message));

        // Response
        return response()->json([
            'message' => new MessageResource($message)
        ], 201);

        // $beamsClient = new \Pusher\PushNotifications\PushNotifications(array(
        //     "instanceId" => "488b218d-2a72-4d5b-8940-346df9234336",
        //     "secretKey" => "4C9B94F31677EFBD2238FD2FE9D1D810C4DBB3215DF995C7ED106B7373CE3D03",
        // ));

        // $publishResponse = $beamsClient->publishToInterests(
        //     array("hello", "donuts"),
        //     array(
        //         "fcm" => array(
        //             "notification" => array(
        //                 "title" => "Hi!",
        //                 "body" => "This is my first Push Notification!"
        //             )
        //         ),
        //         "apns" => array("aps" => array(
        //             "alert" => array(
        //                 "title" => "Hi!",
        //                 "body" => "This is my first Push Notification!"
        //             )
        //         )),
        //         "web" => array(
        //             "notification" => array(
        //                 "title" => "Hi!",
        //                 "body" => "This is my first Push Notification!"
        //             )
        //         )
        //     )
        // );

        // $publishResponse = $beamsClient->publishToUsers(
        //     array("user-" . $validated['receiver_id'], "user-" . $user->id),
        //     array(
        //         "fcm" => array(
        //             "notification" => array(
        //                 "title" => "Hi!",
        //                 "body" => "This is my first Push Notification!"
        //             )
        //         ),
        //         "apns" => array("aps" => array(
        //             "alert" => array(
        //                 "title" => "Hi!",
        //                 "body" => "This is my first Push Notification!"
        //             )
        //         )),
        //         "web" => array(
        //             "notification" => array(
        //                 "title" => "Hi!",
        //                 "body" => "This is my first Push Notification!"
        //             )
        //         )
        //     )
        // );
    }

    public function MarkMessagesAsRead(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'chat_id' => 'required'
        ]);

        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // mark Messages
        $messages = Message::whereNull('read_at')->where('receiver_id', $user->id)
            ->where('chat_id', $validated['chat_id'])->get();

        foreach ($messages as $message) {
            $message->read_at = now();
            $message->save();
        }

        // Response
        return response()->json([
            'message' => 'Notifications has been marked sucessfully',
        ], 200);
    }
}
