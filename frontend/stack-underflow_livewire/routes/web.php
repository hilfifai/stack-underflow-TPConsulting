<?php

use App\Livewire\CreateQuestion;
use App\Livewire\Home;
use App\Livewire\Login;
use App\Livewire\QuestionDetail;
use App\Livewire\Register;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group.
|
*/

Route::get('/', Home::class)->name('home');

// Authentication Routes
Route::get('/login', Login::class)->name('login');
Route::get('/register', Register::class)->name('register');

// Questions Routes
Route::get('/questions', Home::class)->name('questions.index');
Route::get('/questions/create', CreateQuestion::class)->name('questions.create');
Route::get('/questions/{id}', QuestionDetail::class)->name('questions.show');
Route::get('/questions/search', Home::class)->name('questions.search');

// Tags Routes
Route::get('/tags', function () {
    return view('livewire.tags');
})->name('tags');

// Users Routes
Route::get('/users', function () {
    return view('livewire.users');
})->name('users');

// Profile Routes
Route::get('/profile', function () {
    return view('livewire.profile');
})->name('profile')->middleware('auth');
