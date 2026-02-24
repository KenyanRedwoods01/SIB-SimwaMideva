<?php

namespace App\Http\Controllers;

class WalletController extends Controller
{
    public function index(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $wallets = \App\Models\Wallet::where('user_id', $validated['user_id'])->get();
        return response()->json($wallets);
    }

    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
        ]);

        $wallet = \App\Models\Wallet::create([
            'user_id' => $validated['user_id'],
            'name' => $validated['name'],
            'balance' => 0.00
        ]);

        return response()->json($wallet, 201);
    }

    public function show(\App\Models\Wallet $wallet)
    {
        $wallet->load('transactions');
        return response()->json($wallet);
    }
}
