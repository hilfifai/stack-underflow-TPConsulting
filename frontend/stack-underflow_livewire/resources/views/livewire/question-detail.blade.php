<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Question Header -->
    <div class="border-b border-gray-200 pb-6 mb-6">
        <h1 class="text-2xl font-bold text-brand-dark mb-2">{{ $question->title }}</h1>
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>Asked {{ $question->createdAt ? \Carbon\Carbon::parse($question->createdAt)->diffForHumans() : '' }}</span>
            <span>Viewed {{ $question->views }} times</span>
        </div>
    </div>

    <div class="flex gap-6">
        <!-- Main Content -->
        <div class="flex-1">
            <!-- Question Body -->
            <div class="flex gap-4 mb-8">
                <!-- Vote -->
                <div class="flex flex-col items-center space-y-2">
                    <button wire:click="voteQuestion(1)" class="p-1 text-gray-400 hover:text-brand-orange transition">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 14l5-5 5 5H7z"/>
                        </svg>
                    </button>
                    <span class="text-xl font-bold text-gray-700">{{ $question->votes }}</span>
                    <button wire:click="voteQuestion(-1)" class="p-1 text-gray-400 hover:text-brand-orange transition">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5H7z"/>
                        </svg>
                    </button>
                </div>

                <!-- Body -->
                <div class="flex-1">
                    <div class="prose max-w-none mb-4">
                        {!! $question->body !!}
                    </div>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2 mb-4">
                        @foreach($question->tags as $tag)
                            <span class="tag">{{ $tag }}</span>
                        @endforeach
                    </div>

                    <!-- Author Info -->
                    <div class="flex justify-end">
                        @if($question->author)
                            <div class="bg-blue-50 p-3 rounded-lg">
                                <div class="text-xs text-gray-500 mb-1">asked {{ $question->createdAt ? \Carbon\Carbon::parse($question->createdAt)->diffForHumans() : '' }}</div>
                                <div class="flex items-center">
                                    <img
                                        src="{{ $question->author->avatar ?? 'https://ui-avatars.com/api/?name=' . urlencode($question->author->name) }}"
                                        alt="{{ $question->author->name }}"
                                        class="h-8 w-8 rounded-full mr-2"
                                    >
                                    <div>
                                        <a href="#" class="text-brand-orange hover:text-orange-600 text-sm font-medium">
                                            {{ $question->author->name }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        @endif
                    </div>

                    <!-- Add Comment -->
                    @auth
                        <div class="mt-4 border-t pt-4">
                            <button
                                wire:click="$toggle('showCommentForm')"
                                class="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Add a comment
                            </button>

                            @if($showCommentForm ?? false)
                                <div class="mt-3">
                                    <textarea
                                        wire:model="newComment"
                                        class="input-field mb-2"
                                        rows="2"
                                        placeholder="Write your comment..."
                                    ></textarea>
                                    @error('newComment')
                                        <p class="text-red-500 text-sm mb-2">{{ $message }}</p>
                                    @enderror
                                    <div class="flex gap-2">
                                        <button wire:click="submitComment()" class="btn-primary text-sm">
                                            Post Comment
                                        </button>
                                        <button wire:click="$set('showCommentForm', false)" class="btn-secondary text-sm">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            @endif
                        </div>
                    @endauth
                </div>
            </div>

            <!-- Answers Section -->
            <div class="mb-6">
                <h2 class="text-xl font-bold text-brand-dark mb-4">
                    {{ $question->answers }} Answers
                </h2>

                @foreach($answers['data'] ?? [] as $answer)
                    <div class="answer-card {{ $answer->isAccepted ? 'answer-accepted' : '' }}">
                        <div class="flex gap-4">
                            <!-- Vote -->
                            <div class="flex flex-col items-center space-y-2">
                                <button wire:click="voteAnswer({{ $answer->id }}, 1)" class="p-1 text-gray-400 hover:text-brand-orange transition">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7 14l5-5 5 5H7z"/>
                                    </svg>
                                </button>
                                <span class="text-lg font-bold text-gray-700">{{ $answer->votes }}</span>
                                <button wire:click="voteAnswer({{ $answer->id }}, -1)" class="p-1 text-gray-400 hover:text-brand-orange transition">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7 10l5 5 5-5H7z"/>
                                    </svg>
                                </button>

                                @if($answer->isAccepted)
                                    <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                @elseif(auth()->check() && $question->author && auth()->id() === $question->author->id)
                                    <button wire:click="acceptAnswer({{ $answer->id }})" class="p-1 text-gray-300 hover:text-green-500 transition" title="Accept this answer">
                                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                        </svg>
                                    </button>
                                @endif
                            </div>

                            <!-- Body -->
                            <div class="flex-1">
                                <div class="prose max-w-none mb-4">
                                    {!! $answer->body !!}
                                </div>

                                <!-- Author Info -->
                                <div class="flex justify-end">
                                    @if($answer->author)
                                        <div class="bg-green-50 p-3 rounded-lg">
                                            <div class="text-xs text-gray-500 mb-1">answered {{ $answer->createdAt ? \Carbon\Carbon::parse($answer->createdAt)->diffForHumans() : '' }}</div>
                                            <div class="flex items-center">
                                                <img
                                                    src="{{ $answer->author->avatar ?? 'https://ui-avatars.com/api/?name=' . urlencode($answer->author->name) }}"
                                                    alt="{{ $answer->author->name }}"
                                                    class="h-8 w-8 rounded-full mr-2"
                                                >
                                                <div>
                                                    <a href="#" class="text-brand-orange hover:text-orange-600 text-sm font-medium">
                                                        {{ $answer->author->name }}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <!-- Your Answer Form -->
            @auth
                <div class="card">
                    <h3 class="text-lg font-bold text-brand-dark mb-4">Your Answer</h3>
                    <form wire:submit.prevent="submitAnswer">
                        <div class="mb-4">
                            <textarea
                                wire:model="newAnswer"
                                class="input-field font-mono"
                                rows="10"
                                placeholder="Write your answer here... (Markdown is supported)"
                            ></textarea>
                            @error('newAnswer')
                                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                            @enderror
                        </div>
                        <button
                            type="submit"
                            wire:loading.attr="disabled"
                            class="btn-primary"
                        >
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
            @endauth
        </div>

        <!-- Sidebar -->
        <div class="w-72 hidden lg:block">
            <div class="card mb-4">
                <h3 class="font-bold text-gray-700 mb-3">Stats</h3>
                <div class="text-sm space-y-2">
                    <div class="flex justify-between">
                        <span class="text-gray-500">Asked:</span>
                        <span>{{ $question->createdAt ? \Carbon\Carbon::parse($question->createdAt)->diffForHumans() : '' }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-500">Viewed:</span>
                        <span>{{ $question->views }} times</span>
                    </div>
                </div>
            </div>

            <div class="card">
                <h3 class="font-bold text-gray-700 mb-3">Related Questions</h3>
                <ul class="space-y-2 text-sm">
                    <!-- Related questions would be loaded here -->
                    <li class="text-gray-500 italic">No related questions yet</li>
                </ul>
            </div>
        </div>
    </div>
</div>
