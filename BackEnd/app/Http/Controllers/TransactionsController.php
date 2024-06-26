<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    public function GetUserTransactions()
    {
        // Get User
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get user's wallet
        $wallet = $user->wallet;

        // Check user's wallet
        if ($wallet == null) {
            return response()->json([
                'message' => 'Error'
            ], 401);
        }

        // Get user's sentTransactions
        $sent = $wallet->sentTransactions;

        // Get user's receivedTransactions
        $received = $wallet->receivedTransactions;

        return response()->json([
            'sent_transactions' => $sent,
            'received_transactions' => $received
        ], 200);
    }

    public function AddUserTransaction(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'sender_id' => 'required',
            'receiver_id' => 'required',
            'job_id' => 'required',
            'amount' => 'required'
        ]);

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        if ($user->id != $validated['sender_id']) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get wallets to change balances
        $senderWallet = Wallet::where('user_id', $validated(['sender_id']))->first();
        $receiverWallet = Wallet::where('user_id', $validated(['receiver_id']))->first();

        // Check wallets
        if ($senderWallet == null || $receiverWallet == null) {
            return response()->json([
                'message' => 'Error'
            ], 401);
        }

        // Do the transaction
        if ($senderWallet->reserved_balance > $validated['amount']) {
            $senderWallet->reserved_balance -= $validated['amount'];
            $receiverWallet->current_balance += $validated['amount'];
            $receiverWallet->available_balance += $validated['amount'];
            $senderWallet->save();
            $receiverWallet->save();
        } else if ($senderWallet->available_balance > $validated['amount']) {
            $senderWallet->current_balance -= $validated['amount'];
            $senderWallet->available_balance -= $validated['amount'];
            $receiverWallet->current_balance += $validated['amount'];
            $receiverWallet->available_balance += $validated['amount'];
            $senderWallet->save();
            $receiverWallet->save();
        } else {
            return response()->json([
                'message' => 'Insufficient balance'
            ], 400);
        }

        return response()->json([
            'message' => 'Transaction done successfully'
        ], 400);
    }
}
