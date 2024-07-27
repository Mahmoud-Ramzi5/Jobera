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
            $user1_id = User::inRandomOrder()->first();
            $user2_id = User::inRandomOrder()->first();
        } while ($user1_id == $user2_id);

        return [
            'user1_id' => $user1_id->id,
            'user2_id' => $user2_id->id,
        ];
    }
    public function withMessages()
    {
        return $this->afterCreating(function ($chat) {
            for ($i = 0; $i < 5; $i++) {
                Message::factory()->create([
                    'chat_id' => $chat->id,
                    'user_id' => $this->faker->randomElement([$chat->user1_id, $chat->user2_id])
                ]);
            }
        });
    }
}
