<?php

use App\Models\Chat;
use Illuminate\Support\Facades\Broadcast;

/*
All authorization callbacks receive the currently authenticated user as their first argument
and any additional wildcard parameters as their subsequent arguments, in this case {chat}
*/

Broadcast::channel('user.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
}, ['guards' => ['web', 'api']]);

Broadcast::channel('chat.{id}', function ($user, $id) {
    $chat = Chat::find($id);
    return ((int) $user->id === (int) $chat->user1_id)
        || ((int) $user->id === (int) $chat->user2_id);
}, ['guards' => ['web', 'api']]);
