@extends('layouts.app')

@section('content')
<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Question Header -->
    <div class="border-b border-gray-200 pb-6 mb-6">
        <h1 class="text-2xl font-bold text-brand-dark mb-2">{{ $question['title'] }}</h1>
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>Asked {{ $question['created_at'] ? \Carbon\Carbon::parse($question['created_at'])->diffForHumans() : '' }}</span>
            <span>Viewed {{ $question['views'] ?? 0 }} times</span>
        </div>
    </div>

    <div class="flex gap-6">
        <!-- Main Content -->
        <div class="flex-1">
            <!-- Question Body -->
            <div class="flex gap-4 mb-8">
                <!-- Body -->
                <div class="flex-1">
                    <div class="prose max-w-none mb-4">
                        {!! $question['body'] !!}
                    </div>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2 mb-4">
                        @foreach($question['tags'] ?? [] as $tag)
                            <span class="tag">{{ $tag }}</span>
                        @endforeach
                    </div>

                    <!-- Author Info -->
                    <div class="flex justify-end">
                        @if(isset($question['author']))
                            <div class="bg-blue-50 p-3 rounded-lg">
                                <div class="text-xs text-gray-500 mb-1">asked {{ $question['created_at'] ? \Carbon\Carbon::parse($question['created_at'])->diffForHumans() : '' }}</div>
                                <div class="flex items-center">
                                    <img
                                        src="{{ $question['author']['avatar'] ?? 'https://ui-avatars.com/api/?name=' . urlencode($question['author']['name']) }}"
                                        alt="{{ $question['author']['name'] }}"
                                        class="h-8 w-8 rounded-full mr-2"
                                    >
                                    <div>
                                        <a href="#" class="text-brand-orange hover:text-orange-600 text-sm font-medium">
                                            {{ $question['author']['name'] }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            </div>

            <!-- Answers Section -->
            <div class="mb-6">
                <h2 class="text-xl font-bold text-brand-dark mb-4">
                    {{ count($answers) }} Answers
                </h2>

                @foreach($answers as $answer)
                    <div class="answer-card {{ $answer['is_accepted'] ? 'answer-accepted' : '' }}">
                        <div class="prose max-w-none mb-4">
                            {!! $answer['body'] !!}
                        </div>

                        <!-- Author Info -->
                        <div class="flex justify-end">
                            @if(isset($answer['author']))
                                <div class="bg-green-50 p-3 rounded-lg">
                                    <div class="text-xs text-gray-500 mb-1">answered {{ $answer['created_at'] ? \Carbon\Carbon::parse($answer['created_at'])->diffForHumans() : '' }}</div>
                                    <div class="flex items-center">
                                        <img
                                            src="{{ $answer['author']['avatar'] ?? 'https://ui-avatars.com/api/?name=' . urlencode($answer['author']['name']) }}"
                                            alt="{{ $answer['author']['name'] }}"
                                            class="h-8 w-8 rounded-full mr-2"
                                        >
                                        <div>
                                            <a href="#" class="text-brand-orange hover:text-orange-600 text-sm font-medium">
                                                {{ $answer['author']['name'] }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>

            <!-- Your Answer Form -->
            @if(session('user'))
                <div class="card">
                    <h3 class="text-lg font-bold text-brand-dark mb-4">Your Answer</h3>
                    <form action="{{ route('answers.store', $question['id']) }}" method="POST">
                        @csrf
                        <div class="mb-4">
                            <textarea
                                name="body"
                                class="input-field font-mono"
                                rows="10"
                                placeholder="Write your answer here... (Markdown is supported)"
                                required
                            ></textarea>
                            @error('body')
                                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>
                        <button type="submit" class="btn-primary">
                            Post Your Answer
                        </button>
                    </form>
                </div>
            @else
                <div class="card text-center">
                    <p class="text-gray-600 mb-4">
                        You need to be logged in to answer this question.
                    </p>
                    <a href="{{ route('login') }}" class="btn-primary">
                        Log in
                    </a>
                    <span class="text-gray-400 mx-2">or</span>
                    <a href="{{ route('register') }}" class="text-brand-orange hover:text-orange-600">
                        Sign up
                    </a>
                </div>
            @endif
        </div>

        <!-- Sidebar -->
        <div class="w-72 hidden lg:block">
            <div class="card mb-4">
                <h3 class="font-bold text-gray-700 mb-3">Stats</h3>
                <div class="text-sm space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-500">Asked:</span>
                        <span>{{ $question['created_at'] ? \Carbon\Carbon::parse($question['created_at'])->diffForHumans() : '' }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Viewed:</span>
                        <span>{{ $question['views'] ?? 0 }} times</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
