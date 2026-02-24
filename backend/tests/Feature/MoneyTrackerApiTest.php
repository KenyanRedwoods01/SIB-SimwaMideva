<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MoneyTrackerApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_user()
    {
        $response = $this->postJson('/api/users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('name', 'Test User')
                 ->assertJsonPath('email', 'test@example.com');

        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }

    public function test_can_create_wallet()
    {
        $user = User::factory()->create();

        $response = $this->postJson('/api/wallets', [
            'user_id' => $user->id,
            'name' => 'Savings Wallet',
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('name', 'Savings Wallet')
                 ->assertJsonPath('user_id', $user->id);

        $this->assertDatabaseHas('wallets', ['name' => 'Savings Wallet', 'user_id' => $user->id]);
    }

    public function test_can_process_transactions_and_update_balance()
    {
        $user = User::factory()->create();
        $wallet = Wallet::create([
            'user_id' => $user->id,
            'name' => 'Main Wallet',
            'balance' => 0
        ]);

        // Income
        $this->postJson('/api/transactions', [
            'wallet_id' => $wallet->id,
            'type' => 'income',
            'amount' => 1000,
            'description' => 'Salary'
        ])->assertStatus(201);

        $this->assertEquals(1000, $wallet->fresh()->balance);

        // Expense
        $this->postJson('/api/transactions', [
            'wallet_id' => $wallet->id,
            'type' => 'expense',
            'amount' => 200,
            'description' => 'Rent'
        ])->assertStatus(201);

        $this->assertEquals(800, $wallet->fresh()->balance);
    }

    public function test_can_view_profile_with_total_balance()
    {
        $user = User::factory()->create();
        $wallet1 = Wallet::create(['user_id' => $user->id, 'name' => 'Wallet 1', 'balance' => 500]);
        $wallet2 = Wallet::create(['user_id' => $user->id, 'name' => 'Wallet 2', 'balance' => 300]);

        $response = $this->getJson("/api/profile/{$user->id}");

        $response->assertStatus(200)
                 ->assertJsonPath('total_balance', 800)
                 ->assertJsonCount(2, 'wallets');
    }
}
