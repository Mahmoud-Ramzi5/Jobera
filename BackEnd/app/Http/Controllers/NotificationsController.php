<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public function GetUserNotifications()
    {
        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Response
        return response()->json([
            'notifications' => $user->notifications,
        ], 200);
    }

    public function GetUnreadNotifications()
    {
        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Response
        return response()->json([
            'notifications' => $user->unreadNotifications,
        ], 200);
    }

    public function MarkNotificationsAsRead(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'notification_id' => 'required'
        ]);

        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // mark Notifications
        if ($validated['notification_id'] == 'all') {
            $user->unreadNotifications->markAsRead();
        } else {
            $user->unreadNotifications->where('id', $validated['notification_id'])->markAsRead();
        }

        // Response
        return response()->json([
            'message' => 'Notifications has been marked sucessfully',
        ], 200);
    }

    public function DeleteNotification(Request $request, $id)
    {
        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // delete Notification
        if ($id == 'all') {
            $user->notifications()->delete();
        } else {
            $user->notifications()->where('id', $id)->delete();
        }

        // Response
        return response()->json([
            'message' => 'Notification has been deleted sucessfully',
        ], 204);
    }
}
