@extends('layouts.app')

@section('content')
<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div class="max-w-md w-full space-y-8">
        <div class="text-center">
            <a href="{{ route('home') }}" class="inline-block">
                <svg class="h-12 w-12 text-brand-orange mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            </a>
            <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
                Welcome back
            </h2>
            <p class="mt-2 text-sm text-gray-600">
                Log in to your account to continue
            </p>
        </div>

        <div class="card mt-8">
            <form action="{{ route('login') }}" method="POST" class="space-y-6">
                @csrf

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        class="input-field mt-1"
                        placeholder="Enter your email"
                        value="{{ old('email') }}"
                        required
                    >
                    @error('email')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        class="input-field mt-1"
                        placeholder="Enter your password"
                        required
                    >
                    @error('password')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            class="h-4 w-4 text-brand-orange focus:ring-brand-orange border-gray-300 rounded"
                        >
                        <label for="remember" class="ml-2 block text-sm text-gray-900">
                            Remember me
                        </label>
                    </div>
                </div>

                <div>
                    <button type="submit" class="w-full btn-primary flex justify-center">
                        Log in
                    </button>
                </div>
            </form>
        </div>

        <p class="mt-2 text-center text-sm text-gray-600">
            Don't have an account?
            <a href="{{ route('register') }}" class="font-medium text-brand-orange hover:text-orange-600">
                Sign up
            </a>
        </p>
    </div>
</div>
@endsection
