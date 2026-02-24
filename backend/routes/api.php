<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/users', [UserController::class, 'store']);
Route::get('/wallets', [WalletController::class, 'index']);
Route::post('/wallets', [WalletController::class, 'store']);
Route::get('/wallets/{wallet}', [WalletController::class, 'show']);
Route::post('/transactions', [TransactionController::class, 'store']);
Route::get('/profile/{user}', [ProfileController::class, 'show']);
