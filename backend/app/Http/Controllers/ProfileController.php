<?php

namespace App\Http\Controllers;

class ProfileController extends Controller
{
    public function show(\App\Models\User $user)
    {
        $user->load('wallets');
        
        return response()->json([
            'user' => $user,
            'wallets' => $user->wallets,
            'total_balance' => $user->wallets->sum('balance'),
        ]);
    }
}
