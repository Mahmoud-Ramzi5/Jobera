<?php

namespace App\Notifications;

use App\Models\Message;
use App\Models\Company;
use App\Models\Individual;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewNotification extends Notification
{
    use Queueable;

    /**
     * The message instance.
     *
     * @var \App\Models\Message
     */
    protected Message $message;

    /**
     * Create a new notification instance.
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the notification's database type.
     *
     * @return string
     */
    public function databaseType(object $notifiable): string
    {
        return 'NewNotification';
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $company = Company::select('name')->where('user_id', $this->message->sender_id)->first();
        $individual = Individual::select('full_name')->where('user_id', $this->message->sender_id)->first();

        return [
            'chat_id' => $this->message->chat_id,
            'sender_id' => $this->message->sender_id,
            'sender_name' => ($individual != null ?
                $individual->full_name : ($company != null ? $company->name : 'Jobera')),
            'message' => $this->message->message
        ];
    }
}
