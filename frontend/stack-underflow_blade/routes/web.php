<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\QuestionController;
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

// Home
Route::get('/', [QuestionController::class, 'index'])->name('home');

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Questions Routes
Route::get('/questions', [QuestionController::class, 'index'])->name('questions.index');
Route::get('/questions/create', [QuestionController::class, 'create'])->name('questions.create');
Route::post('/questions', [QuestionController::class, 'store'])->name('questions.store');
Route::get('/questions/{id}', [QuestionController::class, 'show'])->name('questions.show');
Route::get('/questions/search', [QuestionController::class, 'search'])->name('questions.search');

// Answer Routes
Route::post('/questions/{questionId}/answers', [AnswerController::class, 'store'])->name('answers.store');

// Tags Routes
Route::get('/tags', function () {
    return view('tags');
})->name('tags');

// Users Routes
Route::get('/users', function () {
    return view('users');
})->name('users');

// Profile Routes
Route::get('/profile', function () {
    return view('profile');
})->name('profile')->middleware(function ($request) {
    if (!session('user')) {
        return redirect()->route('login');
    }
});
