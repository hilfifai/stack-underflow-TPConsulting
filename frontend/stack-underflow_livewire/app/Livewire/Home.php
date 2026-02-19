<?php

namespace App\Livewire;

use App\DTOs\QuestionDTO;
use App\Services\QuestionService;
use Illuminate\Support\Collection;
use Livewire\Component;
use Livewire\WithPagination;

class Home extends Component
{
    use WithPagination;

    protected QuestionService $questionService;

    public string $sortBy = 'newest';
    public string $search = '';

    protected $queryString = [
        'sortBy' => ['except' => 'newest'],
        'search' => ['except' => ''],
    ];

    public function __construct()
    {
        $this->questionService = new QuestionService();
    }

    public function render()
    {
        $params = [
            'sort' => $this->sortBy,
            'per_page' => 15,
        ];

        if (!empty($this->search)) {
            $params['q'] = $this->search;
        }

        $result = $this->questionService->getAll($params);

        return view('livewire.home', [
            'questions' => $result['data'],
            'meta' => $result['meta'] ?? null,
        ])->layout('layouts.app');
    }

    public function updatedSearch(): void
    {
        $this->resetPage();
    }

    public function updatingSortBy(): void
    {
        $this->resetPage();
    }

    public function getAuthUserProperty(): ?\App\DTOs\UserDTO
    {
        return auth()->user();
    }
}
