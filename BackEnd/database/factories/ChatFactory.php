<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chat>
 */
class ChatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        do {
            $user1_id = User::inRandomOrder()->first()->id;
            $user2_id = User::inRandomOrder()->first()->id;
        } while ($user1_id == $user2_id || $user1_id == 1 || $user2_id == 1);

        return [
            'user1_id' => $user1_id,
            'user2_id' => $user2_id,
        ];
    }

    public function withMessages()
    {
        return $this->afterCreating(function ($chat) {
            $sender_id = $this->faker->randomElement([$chat->user1_id, $chat->user2_id]);
            if ($sender_id == $chat->user1_id) {
                $receiver_id = $chat->user2_id;
            } else {
                $receiver_id = $chat->user1_id;
            }
            for ($i = 0; $i < 5; $i++) {
                Message::factory()->create([
                    'sender_id' => $sender_id,
                    'receiver_id' => $receiver_id,
                    'chat_id' => $chat->id,
                ]);
            }
        });
    }
}
