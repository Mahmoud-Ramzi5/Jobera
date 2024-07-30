<?php

use Illuminate\Support\Facades\Broadcast;

/*
All authorization callbacks receive the currently authenticated user as their first argument
and any additional wildcard parameters as their subsequent arguments, in this case {chat}
*/

Broadcast::channel('user.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
}, ['guards' => ['web', 'api']]);
