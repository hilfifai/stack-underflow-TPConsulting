<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-brand-dark">Users</h1>
        <p class="text-sm text-gray-500">Browse community members</p>
    </div>

    <div class="card mb-6">
        <input
            type="text"
            placeholder="Search users..."
            class="input-field"
        >
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for($i = 1; $i <= 9; $i++)
            <div class="card flex items-center space-x-4 hover:shadow-lg transition-shadow">
                <img
                    src="https://ui-avatars.com/api/?name=User+{{ $i }}&background=random"
                    alt="User {{ $i }}"
                    class="h-12 w-12 rounded-full"
                >
                <div class="flex-1">
                    <h3 class="font-semibold text-brand-orange hover:text-orange-600 cursor-pointer">
                        User {{ $i }}
                    </h3>
                    <p class="text-sm text-gray-500">
                        {{ rand(1, 20) }} questions • {{ rand(10, 100) }} answers
                    </p>
                </div>
                <div class="text-right">
                    <p class="text-lg font-bold text-gray-700">{{ number_format(rand(100, 5000)) }}</p>
                    <p class="text-xs text-gray-500">reputation</p>
                </div>
            </div>
        @endfor
    </div>
</div>
