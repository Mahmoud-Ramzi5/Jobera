<?php

namespace App\Events;

use App\Models\Message;
use App\Models\Company;
use App\Models\Individual;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\IndividualResource;

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

class NewMessage implements ShouldBroadcastNow // ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The chat instance.
     *
     * @var
     */
    protected $currentUser;

    /**
     * The chat instance.
     *
     * @var int
     */
    protected int $otherUser;

    /**
     * The chat instance.
     *
     * @var \App\Models\Message
     */
    protected Message $message;

    /**
     * Create a new event instance.
     */
    public function __construct(int $currentUser_id, int $otherUser_id, Message $message)
    {
        $company = Company::where('user_id', $currentUser_id)->first();
        $individual = Individual::where('user_id', $currentUser_id)->first();
        if ($company == null) {
            $this->currentUser = new IndividualResource($individual);
        } else {
            $this->currentUser = new CompanyResource($company);
        }

        $this->otherUser = $otherUser_id;
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('user.' . $this->otherUser),
        ];
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'chat_id' => $this->message->chat_id,
            'other_user' => [
                'user_id' => $this->currentUser->user_id,
                'name' => ($this->currentUser->type == "individual" ?
                    $this->currentUser->full_name : $this->currentUser->name),
                'avatar_photo' => $this->currentUser->avatar_photo
            ],
            'message' => $this->message->message
        ];
    }
}
