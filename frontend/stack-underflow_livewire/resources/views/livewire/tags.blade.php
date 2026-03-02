<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-brand-dark">Tags</h1>
        <p class="text-sm text-gray-500">Browse questions by tags</p>
    </div>

    <div class="card mb-6">
        <input
            type="text"
            placeholder="Filter by tag name..."
            class="input-field"
        >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for($i = 1; $i <= 12; $i++)
            <div class="card hover:shadow-lg transition-shadow">
                <div class="flex flex-wrap gap-2 mb-3">
                    <span class="tag text-lg">laravel</span>
                    <span class="tag text-lg">php</span>
                </div>
                <p class="text-sm text-gray-600 mb-3">
                    Questions related to Laravel framework and PHP development.
                </p>
                <div class="flex justify-between text-sm text-gray-500">
                    <span>{{ rand(10, 100) }} questions</span>
                    <span>{{ rand(1, 10) }} this week</span>
                </div>
            </div>
        @endfor
    </div>
</div>
