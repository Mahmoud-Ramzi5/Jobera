<?php

namespace App\Events;

use App\Models\User;
use App\Models\Message;

use App\Notifications\NewNotification as DBNotification;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

/*
    Laravel uses Queue in events
    and if queue connection is database like this -> QUEUE_CONNECTION=database it will not work.
    Change it to sync so that it gets triggered and does not queue it for later like this -> QUEUE_CONNECTION=sync.
    Also there is another way: on event file instead of ShouldBroadcast use this -> ShouldBroadcastNow.
*/

class NewNotification implements ShouldBroadcastNow // ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The reciver_id.
     *
     * @var int
     */
    protected $otherUser_id;

    /**
     * The message instance.
     *
     * @var \App\Models\Message
     */
    protected Message $message;

    /**
     * Create a new event instance.
     */
    public function __construct(int $otherUser_id, Message $message)
    {
        $this->message = $message;
        $this->otherUser_id = $otherUser_id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\PrivateChannel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('user.' . $this->otherUser_id),
        ];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'NewNotification';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        // Create notification
        $otherUser = User::find($this->otherUser_id);
        $otherUser->notify(new DBNotification($this->message));

        // Get The new Notification
        $notification = $otherUser->notifications->first();

        // Notification
        return [
            'notification' => $notification
        ];
    }
}
