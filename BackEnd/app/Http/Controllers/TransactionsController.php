<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use App\Models\Transaction;
use App\Models\Company;
use App\Models\RedeemCode;
use App\Models\FreelancingJob;
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

    public function RegJobTransaction($sender_id, $defJob_id, $amount)
    {

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        if ($user->id != $sender_id) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get company
        $company = Company::where('user_id', $sender_id)->first();

        // Check company
        if ($company == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get wallets to change balances
        $senderWallet = Wallet::where('user_id', $sender_id)->first();
        $receiverWallet = Wallet::where('user_id', 1)->first();

        // Check wallets
        if ($senderWallet == null || $receiverWallet == null) {
            return response()->json([
                'message' => 'Error'
            ], 401);
        }

        // Do the transaction
        if ($senderWallet->available_balance > $amount) {
            $senderWallet->available_balance -= $amount;
            $senderWallet->total_balance -= $amount;
            $receiverWallet->available_balance += $amount;
            $receiverWallet->total_balance += $amount;
            $senderWallet->save();
            $receiverWallet->save();
            $transactionParams = [
                'sender_id' => $senderWallet->id,
                'receiver_id' => 1,
                'defJob_id' => $defJob_id,
                'amount' => $amount,
                'date' => now()
            ];
            $transaction = Transaction::create($transactionParams);
        } else {
            return response()->json([
                'message' => 'Insufficient balance'
            ], 400);
        }

        return response()->json([
            'message' => 'money transfered smoothly'
        ], 200);
    }

    public function FreelancingJobTransaction($sender_id, $job_id, $amount)
    {

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }


        if ($user->id != $sender_id) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Check if job is freelancing
        $freelancing = FreelancingJob::where('id', $job_id)->first();
        if ($freelancing == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 401);
        }

        // Get wallets to change balances
        $senderWallet = Wallet::where('user_id', $sender_id)->first();
        $receiverWallet = Wallet::where('user_id', 1)->first();

        // Check wallets
        if ($senderWallet == null || $receiverWallet == null) {
            return response()->json([
                'message' => 'Error'
            ], 401);
        }

        // Calculate admin share
        $fullAmount = $amount;
        if ($fullAmount > 0 && $fullAmount <= 2000) {
            $adminShare = $fullAmount * 0.15;
        } else if ($fullAmount > 2000 && $fullAmount <= 15000) {
            $adminShare = $fullAmount * 0.12;
        } else if ($fullAmount > 15000) {
            $adminShare = $fullAmount * 0.10;
        } else {
            return response()->json([
                'message' => 'Error'
            ], 401);
        }

        // Do the transaction
        $userShare = $fullAmount - $adminShare;
        if ($senderWallet->available_balance > $fullAmount) {
            $senderWallet->available_balance -= $fullAmount;
            $senderWallet->total_balance -= $adminShare;
            $senderWallet->reserved_balance += $userShare;

            $receiverWallet->available_balance += $adminShare;
            $receiverWallet->total_balance += $adminShare;

            $senderWallet->save();
            $receiverWallet->save();
            $transactionParams = [
                'sender_id' => $senderWallet->id,
                'receiver_id' => 1,
                'defJob_id' => $job_id,
                'amount' => $adminShare,
                'date' => now()
            ];
            $transaction = Transaction::create($transactionParams);
        } else {
            return response()->json([
                'message' => 'Insufficient balance'
            ], 400);
        }

        return response()->json([
            'message' => 'money transfered smoothly'
        ], 200);
    }

    public function AddUserTransaction($sender_id, $receiver_id, $job_id, $amount)
    {

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        if ($user->id != $sender_id) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Check if job is freelancing
        $freelancing = FreelancingJob::where('id', $job_id)->first();
        if ($freelancing == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 401);
        }

        // Get wallets to change balances
        $senderWallet = Wallet::where('user_id', $sender_id)->first();
        $receiverWallet = Wallet::where('user_id', $receiver_id)->first();

        // Check wallets
        if ($senderWallet == null || $receiverWallet == null) {
            return response()->json([
                'message' => 'Error'
            ], 401);
        }

        // Calculate admin share
        $fullAmount = $amount;
        if ($fullAmount > 0 && $fullAmount <= 2000) {
            $adminShare = $fullAmount * 0.15;
        } else if ($fullAmount > 2000 && $fullAmount <= 15000) {
            $adminShare = $fullAmount * 0.12;
        } else if ($fullAmount > 15000) {
            $adminShare = $fullAmount * 0.10;
        } else {
            return response()->json([
                'message' => 'Error'
            ], 401);
        }

        // Do the transaction
        $userShare = $fullAmount - $adminShare;
        if ($senderWallet->reserved_balance >= $userShare) {
            $senderWallet->reserved_balance -= $userShare;
            $senderWallet->total_balance -= $userShare;
            $receiverWallet->available_balance += $userShare;
            $receiverWallet->total_balance += $userShare;
            $senderWallet->save();
            $receiverWallet->save();
            $transactionParams = [
                'sender_id' => $senderWallet->id,
                'receiver_id' => $receiver_id,
                'defJob_id' => $job_id,
                'amount' => $userShare,
                'date' => now()
            ];
            $transaction = Transaction::create($transactionParams);
        } else {
            return response()->json([
                'message' => 'something went wrong'
            ], 400);
        }

        return response()->json([
            'message' => 'money transfered smoothly'
        ], 200);
    }

    public function RedeemCode(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required',
            'user_id' => 'required'
        ]);

        // Get user
        $user = auth()->user();

        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }
        $redeemCode = RedeemCode::where('code', $validated['code'])->first();
        if ($redeemCode !== null && $redeemCode->user_id === null) {
            $userWallet = Wallet::where('user_id', $user->id)->first();
            $userWallet->total_balance += $redeemCode->value;
            $userWallet->available_balance += $redeemCode->value;
            $userWallet->save();
            $redeemCode->update(['user_id' => $validated['user_id']]);
            return response()->json([
                'message' => 'redeem code has been used successfully'
            ], 200);
        } else {
            return response()->json([
                'errors' => ['redeemcode' => 'code not found']
            ], 404);
        }
    }
}
