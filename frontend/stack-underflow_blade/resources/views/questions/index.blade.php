@extends('layouts.app')

@section('content')
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-brand-dark">All Questions</h1>
        <a href="{{ route('questions.create') }}" class="btn-primary">
            Ask Question
        </a>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow mb-6 p-4">
        <form method="GET" class="flex flex-wrap gap-4 items-center justify-between">
            <div class="flex gap-2">
                <select name="sort" class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-orange focus:border-transparent">
                    <option value="newest" {{ request('sort', 'newest') == 'newest' ? 'selected' : '' }}>Newest</option>
                    <option value="votes" {{ request('sort') == 'votes' ? 'selected' : '' }}>Most Votes</option>
                    <option value="unanswered" {{ request('sort') == 'unanswered' ? 'selected' : '' }}>Unanswered</option>
                </select>
            </div>
            <button type="submit" class="btn-secondary">Filter</button>
        </form>
    </div>

    <!-- Questions List -->
    <div class="space-y-4">
        @forelse($questions as $question)
            <div class="question-card">
                <div class="flex">
                    <!-- Stats -->
                    <div class="flex-shrink-0 flex space-x-4 mr-4">
                        <div class="question-stat">
                            <span class="question-stat-value text-gray-700">{{ $question['votes'] ?? 0 }}</span>
                            <span class="text-xs text-gray-500">votes</span>
                        </div>
                        <div class="question-stat {{ ($question['is_answered'] ?? false) ? 'text-green-600 border border-green-500 rounded px-2' : '' }}">
                            <span class="question-stat-value">{{ $question['answers'] ?? 0 }}</span>
                            <span class="text-xs text-gray-500">answers</span>
                        </div>
                        <div class="question-stat">
                            <span class="question-stat-value text-gray-500">{{ $question['views'] ?? 0 }}</span>
                            <span class="text-xs text-gray-500">views</span>
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="flex-1">
                        <h2 class="text-lg font-medium mb-2">
                            <a href="{{ route('questions.show', $question['id']) }}" class="text-brand-orange hover:text-orange-600">
                                {{ $question['title'] }}
                            </a>
                        </h2>

                        <p class="text-gray-600 text-sm mb-3 line-clamp-2">
                            {{ \Str::limit(strip_tags($question['body'] ?? ''), 200) }}
                        </p>

                        <div class="flex flex-wrap items-center justify-between">
                            <div class="flex flex-wrap gap-2 mb-2 md:mb-0">
                                @foreach($question['tags'] ?? [] as $tag)
                                    <span class="tag">{{ $tag }}</span>
                                @endforeach
                            </div>

                            <div class="flex items-center text-sm text-gray-500">
                                @if(isset($question['author']))
                                    <img
                                        src="{{ $question['author']['avatar'] ?? 'https://ui-avatars.com/api/?name=' . urlencode($question['author']['name']) }}"
                                        alt="{{ $question['author']['name'] }}"
                                        class="h-5 w-5 rounded-full mr-2"
                                    >
                                    <a href="#" class="text-brand-orange hover:text-orange-600 mr-1">
                                        {{ $question['author']['name'] }}
                                    </a>
                                    <span class="text-gray-400">asked {{ $question['created_at'] ? \Carbon\Carbon::parse($question['created_at'])->diffForHumans() : '' }}</span>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @empty
            <div class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No questions yet</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by asking your first question.</p>
                <div class="mt-6">
                    <a href="{{ route('questions.create') }}" class="btn-primary">
                        Ask Question
                    </a>
                </div>
            </div>
        @endforelse
    </div>
</div>
@endsection
