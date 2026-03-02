<?php

namespace App\Providers;

use App\Repositories\AnswerRepository;
use App\Repositories\QuestionRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Repositories
        $this->app->bind(UserRepository::class, function ($app) {
            return new UserRepository($app->make(\App\Models\User::class));
        });

        $this->app->bind(QuestionRepository::class, function ($app) {
            return new QuestionRepository($app->make(\App\Models\Question::class));
        });

        $this->app->bind(AnswerRepository::class, function ($app) {
            return new AnswerRepository($app->make(\App\Models\Answer::class));
        });
    }

    public function boot(): void
    {
        //
    }
}
