<header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <!-- Logo and Main Navigation -->
            <div class="flex items-center">
                <a href="{{ route('home') }}" class="flex items-center">
                    <svg class="h-8 w-8 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span class="ml-2 text-xl font-bold text-brand-dark">StackUnderflow</span>
                </a>

                <nav class="hidden md:ml-8 md:flex md:space-x-4">
                    <a href="{{ route('home') }}" class="px-3 py-2 text-sm font-medium {{ request()->routeIs('home') ? 'text-brand-orange' : 'text-gray-600 hover:text-gray-900' }}">
                        Questions
                    </a>
                    <a href="{{ route('tags') }}" class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                        Tags
                    </a>
                    <a href="{{ route('users') }}" class="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                        Users
                    </a>
                </nav>
            </div>

            <!-- Search Bar -->
            <div class="flex-1 max-w-lg mx-8 hidden md:block">
                <form action="{{ route('questions.search') }}" method="GET" class="relative">
                    <input
                        type="text"
                        name="q"
                        placeholder="Search questions..."
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
                    >
                    <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                </form>
            </div>

            <!-- User Actions -->
            <div class="flex items-center space-x-4">
                @if(session('user'))
                    <a href="{{ route('questions.create') }}" class="btn-primary">
                        Ask Question
                    </a>
                    <div class="relative" x-data="{ open: false }">
                        <button @click="open = !open" class="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                            <img
                                src="{{ session('user.avatar') ?? 'https://ui-avatars.com/api/?name=' . urlencode(session('user.name')) }}"
                                alt="{{ session('user.name') }}"
                                class="h-8 w-8 rounded-full"
                            >
                            <span class="hidden md:block text-sm font-medium">{{ session('user.name') }}</span>
                        </button>

                        <div x-show="open" @click.away="open = false" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50" style="display: none;">
                            <a href="{{ route('profile') }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Your Profile
                            </a>
                            <hr class="my-1">
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Log Out
                                </button>
                            </form>
                        </div>
                    </div>
                @else
                    <a href="{{ route('login') }}" class="text-sm font-medium text-gray-600 hover:text-gray-900">
                        Log in
                    </a>
                    <a href="{{ route('register') }}" class="btn-primary">
                        Sign up
                    </a>
                @endif
            </div>
        </div>
    </div>

    <!-- Mobile Search -->
    <div class="md:hidden px-4 pb-4">
        <form action="{{ route('questions.search') }}" method="GET" class="relative">
            <input
                type="text"
                name="q"
                placeholder="Search questions..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
            >
            <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
        </form>
    </div>
</header>
