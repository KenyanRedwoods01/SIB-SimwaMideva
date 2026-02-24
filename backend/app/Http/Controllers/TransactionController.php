<?php

namespace App\Http\Controllers;

class TransactionController extends Controller
{
    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'wallet_id' => 'required|exists:wallets,id',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'nullable|string|max:255',
        ]);

        return \Illuminate\Support\Facades\DB::transaction(function () use ($validated) {
            $transaction = \App\Models\Transaction::create($validated);
            
            $wallet = \App\Models\Wallet::lockForUpdate()->findOrFail($validated['wallet_id']);
            
            if ($validated['type'] === 'income') {
                $wallet->increment('balance', $validated['amount']);
            } else {
                $wallet->decrement('balance', $validated['amount']);
            }

            return response()->json($transaction, 201);
        });
    }
}
