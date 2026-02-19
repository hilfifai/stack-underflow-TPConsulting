@extends('layouts.app')

@section('content')
<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-brand-dark mb-6">Ask a Question</h1>

    <form action="{{ route('questions.store') }}" method="POST" class="space-y-6">
        @csrf

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
                name="title"
                class="input-field"
                placeholder="e.g. How do I filter a Laravel collection by multiple conditions?"
                value="{{ old('title') }}"
                required
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
                name="body"
                class="input-field font-mono"
                rows="12"
                placeholder="Explain your problem in detail..."
                required
            >{{ old('body') }}</textarea>
            @error('body')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Tags -->
        <div class="card">
            <label for="tags" class="block text-sm font-bold text-gray-700 mb-2">
                Tags
            </label>
            <p class="text-sm text-gray-500 mb-3">
                Add up to 5 tags to describe what your question is about. Separate tags with commas.
            </p>
            <input
                type="text"
                id="tags"
                name="tags"
                class="input-field"
                placeholder="e.g. laravel, php, database"
                value="{{ old('tags') }}"
                required
            >
            @error('tags')
                <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
        </div>

        <!-- Submit -->
        <div class="flex justify-end gap-4">
            <a href="{{ route('home') }}" class="btn-secondary">
                Cancel
            </a>
            <button type="submit" class="btn-primary">
                Post Your Question
            </button>
        </div>
    </form>
</div>
@endsection
