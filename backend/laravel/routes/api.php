<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\AnswerController;
use App\Http\Controllers\Api\v1\QuestionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::prefix('v1')->group(function () {
    // Auth routes
    Route::post('/auth/register', [AuthController::class, 'register']);
    Route::post('/auth/login', [AuthController::class, 'login']);

    // Public question routes
    Route::get('/questions', [QuestionController::class, 'index']);
    Route::get('/questions/popular', [QuestionController::class, 'popular']);
    Route::get('/questions/recent', [QuestionController::class, 'recent']);
    Route::get('/questions/{id}', [QuestionController::class, 'show']);

    // Public answer routes
    Route::get('/questions/{questionId}/answers', [AnswerController::class, 'index']);
});

// Protected routes (require JWT authentication)
Route::prefix('v1')->middleware('auth:api')->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/refresh', [AuthController::class, 'refresh']);

    // Question routes
    Route::post('/questions', [QuestionController::class, 'store']);
    Route::put('/questions/{id}', [QuestionController::class, 'update']);
    Route::delete('/questions/{id}', [QuestionController::class, 'destroy']);

    // Answer routes
    Route::post('/questions/{questionId}/answers', [AnswerController::class, 'store']);
    Route::put('/answers/{id}', [AnswerController::class, 'update']);
    Route::delete('/answers/{id}', [AnswerController::class, 'destroy']);
    Route::post('/answers/{id}/accept', [AnswerController::class, 'accept']);
});
