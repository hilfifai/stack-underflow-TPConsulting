<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-brand-dark mb-6">Ask a Question</h1>

    @if($isSuccess)
        <div class="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div class="flex">
                <svg class="h-6 w-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <div>
                    <h3 class="text-lg font-medium text-green-800">Question Posted Successfully!</h3>
                    <p class="mt-2 text-green-700">
                        Your question has been posted. You can now view it or continue to the home page.
                    </p>
                    <div class="mt-4 flex gap-3">
                        <a href="{{ route('questions.show', $createdQuestionId) }}" class="btn-primary">
                            View Your Question
                        </a>
                        <a href="{{ route('home') }}" class="btn-secondary">
                            Back to Questions
                        </a>
                        <button wire:click="resetForm" class="text-brand-orange hover:text-orange-600 font-medium">
                            Ask Another Question
                        </button>
                    </div>
                </div>
            </div>
        </div>
    @endif

    <form wire:submit.prevent="submit" class="space-y-6">
        <!-- Title -->
        <div class="card">
            <label for="title" class="block text-sm font-bold text-gray-700 mb-2">
                Title
            </label>
            <p class="text-sm text-gray-500 mb-3">
                Be specific and imagine you're asking a question to another person.
            </p>
            <input
                type="text"
                id="title"
                wire:model="title"
                class="input-field"
                placeholder="e.g. How do I filter a Laravel collection by multiple conditions?"
            >
            @error('title')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Body -->
        <div class="card">
            <label for="body" class="block text-sm font-bold text-gray-700 mb-2">
                Body
            </label>
            <p class="text-sm text-gray-500 mb-3">
                Include all the information someone would need to answer your question. Markdown is supported.
            </p>
            <textarea
                id="body"
                wire:model="body"
                class="input-field font-mono"
                rows="12"
                placeholder="Explain your problem in detail..."
            ></textarea>
            @error('body')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror

            <!-- Markdown Tips -->
            <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Markdown Tips:</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                    <li><code>**bold**</code> - Bold text</li>
                    <li><code>*italic*</code> - Italic text</li>
                    <li><code>`code`</code> - Inline code</li>
                    <li><code>```php\ncode block\n```</code> - Code block</li>
                    <li><code>[link text](url)</code> - Links</li>
                </ul>
            </div>
        </div>

        <!-- Tags -->
        <div class="card">
            <label for="tagInput" class="block text-sm font-bold text-gray-700 mb-2">
                Tags
            </label>
            <p class="text-sm text-gray-500 mb-3">
                Add up to 5 tags to describe what your question is about. Press Enter to add a tag.
            </p>

            <div class="flex flex-wrap gap-2 mb-3">
                @foreach($tags as $index => $tag)
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-orange text-white">
                        {{ $tag }}
                        <button
                            type="button"
                            wire:click="removeTag({{ $index }})"
                            class="ml-2 text-white hover:text-gray-200 focus:outline-none"
                        >
                            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                            </svg>
                        </button>
                    </span>
                @endforeach
            </div>

            <div class="flex gap-2">
                <input
                    type="text"
                    id="tagInput"
                    wire:model="tagInput"
                    wire:keydown.enter.prevent="addTag"
                    class="input-field"
                    placeholder="e.g. laravel, php, database"
                    {{ count($tags) >= 5 ? 'disabled' : '' }}
                >
                <button
                    type="button"
                    wire:click="addTag"
                    class="btn-secondary"
                    {{ empty($tagInput) ? 'disabled' : '' }}
                >
                    Add Tag
                </button>
            </div>
            @error('tags')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Submit -->
        <div class="flex justify-end gap-4">
            <a href="{{ route('home') }}" class="btn-secondary">
                Cancel
            </a>
            <button
                type="submit"
                wire:loading.attr="disabled"
                class="btn-primary"
            >
                <span wire:loading.remove wire:target="submit">Post Your Question</span>
                <span wire:loading wire:target="submit">Posting...</span>
            </button>
        </div>
    </form>
</div>
