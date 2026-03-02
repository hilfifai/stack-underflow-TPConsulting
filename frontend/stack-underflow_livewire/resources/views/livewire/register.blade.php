<div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
    <div class="max-w-md w-full space-y-8">
        <div class="text-center">
            <a href="{{ route('home') }}" class="inline-block">
                <svg class="h-12 w-12 text-brand-orange mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            </a>
            <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
                Create your account
            </h2>
            <p class="mt-2 text-sm text-gray-600">
                Join the community and start asking questions
            </p>
        </div>

        <div class="card mt-8">
            <form wire:submit.prevent="submit" class="space-y-6">
                @csrf

                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">
                        Display name
                    </label>
                    <input
                        type="text"
                        id="name"
                        wire:model="name"
                        class="input-field mt-1"
                        placeholder="How should we call you?"
                        required
                    >
                    @error('name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        wire:model="email"
                        class="input-field mt-1"
                        placeholder="Enter your email"
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
                        wire:model="password"
                        class="input-field mt-1"
                        placeholder="Create a password"
                        required
                    >
                    @error('password')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="passwordConfirmation" class="block text-sm font-medium text-gray-700">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        id="passwordConfirmation"
                        wire:model="passwordConfirmation"
                        class="input-field mt-1"
                        placeholder="Confirm your password"
                        required
                    >
                    @error('passwordConfirmation')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex items-center">
                    <input
                        type="checkbox"
                        id="terms"
                        class="h-4 w-4 text-brand-orange focus:ring-brand-orange border-gray-300 rounded"
                        required
                    >
                    <label for="terms" class="ml-2 block text-sm text-gray-900">
                        I agree to the
                        <a href="#" class="text-brand-orange hover:text-orange-600">Terms of Service</a>
                        and
                        <a href="#" class="text-brand-orange hover:text-orange-600">Privacy Policy</a>
                    </label>
                </div>

                <div>
                    <button
                        type="submit"
                        wire:loading.attr="disabled"
                        class="w-full btn-primary flex justify-center"
                    >
                        <span wire:loading.remove wire:target="submit">Create Account</span>
                        <span wire:loading wire:target="submit">Creating Account...</span>
                    </button>
                </div>
            </form>

            <div class="mt-6">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">
                            Or sign up with
                        </span>
                    </div>
                </div>

                <div class="mt-6 grid grid-cols-2 gap-3">
                    <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                        </svg>
                    </a>
                    <a href="#" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.18.69.8.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <p class="mt-2 text-center text-sm text-gray-600">
            Already have an account?
            <a href="{{ route('login') }}" class="font-medium text-brand-orange hover:text-orange-600">
                Log in
            </a>
        </p>
    </div>
</div>
