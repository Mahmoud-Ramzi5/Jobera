<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
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

    public function RegJobTransaction(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'sender_id' => 'required',
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

        // Get company
        $company = Company::where('user_id', $validated['sender_id'])->first();

        // Check company
        if ($company == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }

        // Get wallets to change balances
        $senderWallet = Wallet::where('user_id', $validated['sender_id'])->first();
        $receiverWallet = Wallet::where('user_id', 1)->first();

        // Check wallets
        if ($senderWallet == null || $receiverWallet == null) {
            return response()->json([
                'message' => 'Error'
            ], 401);
        }

        // Do the transaction
        if ($senderWallet->current_balance > $validated['amount']) {
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
        ], 200);
    }

    public function FreelancingJobTransaction(Request $request)
    {
        // Validate request
        $validated = $request->validate([
            'sender_id' => 'required',
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

        // Check if job is freelancing
        $freelancing = FreelancingJob::where('id', $validated['job_id'])->first();
        if ($freelancing == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 401);
        }

        // Get wallets to change balances
        $senderWallet = Wallet::where('user_id', $validated['sender_id'])->first();
        $receiverWallet = Wallet::where('user_id', 1)->first();

        // Check wallets
        if ($senderWallet == null || $receiverWallet == null) {
            return response()->json([
                'message' => 'Error'
            ], 401);
        }

        // Calculate admin share
        $fullAmount = $validated['amount'];
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
        if ($senderWallet->current_balance > $fullAmount) {
            $senderWallet->current_balance -= $fullAmount;
            $senderWallet->available_balance -= $adminShare;
            $senderWallet->reserved_balance += $userShare;

            $receiverWallet->current_balance += $adminShare;
            $receiverWallet->available_balance += $adminShare;

            $senderWallet->save();
            $receiverWallet->save();
        } else {
            return response()->json([
                'message' => 'Insufficient balance'
            ], 400);
        }

        return response()->json([
            'message' => 'Transaction done successfully'
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

        // Check if job is freelancing
        $freelancing = FreelancingJob::where('id', $validated['job_id'])->first();
        if ($freelancing == null) {
            return response()->json([
                'errors' => ['job' => 'Invalid job']
            ], 401);
        }

        // Get wallets to change balances
        $senderWallet = Wallet::where('user_id', $validated['sender_id'])->first();
        $receiverWallet = Wallet::where('user_id', $validated['receiver_id'])->first();

        // Check wallets
        if ($senderWallet == null || $receiverWallet == null) {
            return response()->json([
                'message' => 'Error'
            ], 401);
        }

        // Calculate admin share
        $fullAmount = $validated['amount'];
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
            $senderWallet->available_balance -= $userShare;
            $receiverWallet->current_balance += $userShare;
            $receiverWallet->available_balance += $userShare;
            $senderWallet->save();
            $receiverWallet->save();
        } else {
            return response()->json([
                'message' => 'Insufficient balance'
            ], 400);
        }

        return response()->json([
            'message' => 'Transaction done successfully'
        ], 200);
    }

    public function RedeemCode(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required'
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
        if ($redeemCode !== null) {
            $userWallet = Wallet::where('user_id', $user->id)->first();
            $userWallet->available_balance += $redeemCode->value;
            $userWallet->current_balance += $redeemCode->value;
            $userWallet->save();
            $this->DeleteRedeemCode($user, $redeemCode);
            return response()->json([
                'message' => 'redeem code has been used successfully'
            ], 200);
        } else {
            return response()->json([
                'errors' => ['redeemcode' => 'code not found']
            ], 404);
        }
    }

    public function DeleteRedeemCode($user, $redeemCode)
    {
        // Check user
        if ($user == null) {
            return response()->json([
                'errors' => ['user' => 'Invalid user']
            ], 401);
        }
        if ($redeemCode !== null) {
            $redeemCode->delete();
            return response()->json([
                'message' => 'done with the code'
            ], 204);
        } else {
            return response()->json([
                'errors' => ['redeemcode' => 'code not found']
            ], 404);
        }
    }
}
