<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\MapsController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [MapsController::class, 'index']);

// ini artinya laravel membuat route yang extend ke crud punya nya controller maps
// bisa liat dengan cara : php artisan route:list
Route::resource('maps', MapsController::class);
// Auth::routes();

// Route::get('/home', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');

