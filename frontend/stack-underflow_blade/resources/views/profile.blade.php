@extends('layouts.app')

@section('content')
<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="card mb-6">
        <div class="flex items-center space-x-6">
            <img
                src="https://ui-avatars.com/api/?name={{ urlencode(session('user.name') ?? 'User') }}&size=128&background=f48024&color=fff"
                alt="Profile"
                class="h-24 w-24 rounded-full"
            >
            <div>
                <h1 class="text-2xl font-bold text-brand-dark">{{ session('user.name') ?? 'User' }}</h1>
                <p class="text-gray-500">{{ session('user.email') ?? 'user@example.com' }}</p>
                <p class="text-sm text-gray-400 mt-1">
                    Member since {{ now()->format('F Y') }}
                </p>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Stats -->
        <div class="lg:col-span-1">
            <div class="card">
                <h2 class="text-lg font-bold text-brand-dark mb-4">Stats</h2>
                <div class="space-y-4">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Questions</span>
                        <span class="font-bold">{{ rand(1, 50) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Answers</span>
                        <span class="font-bold">{{ rand(10, 200) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Reputation</span>
                        <span class="font-bold">{{ number_format(rand(100, 5000)) }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Activity -->
        <div class="lg:col-span-2">
            <div class="card">
                <h2 class="text-lg font-bold text-brand-dark mb-4">Recent Activity</h2>
                <div class="space-y-4">
                    @for($i = 1; $i <= 5; $i++)
                        <div class="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                            <div class="flex-shrink-0">
                                <span class="inline-flex items-center justify-center h-8 w-8 rounded-full bg-brand-light-gray">
                                    <svg class="h-4 w-4 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                                    </svg>
                                </span>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm">
                                    Asked question:
                                    <a href="#" class="text-brand-orange hover:text-orange-600">
                                        How to filter a Laravel collection by multiple conditions?
                                    </a>
                                </p>
                                <p class="text-xs text-gray-400 mt-1">{{ rand(1, 24) }} hours ago</p>
                            </div>
                        </div>
                    @endfor
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
