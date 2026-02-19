<?php

namespace App\Livewire;

use App\DTOs\QuestionDTO;
use App\Services\QuestionService;
use Livewire\Component;

class CreateQuestion extends Component
{
    protected QuestionService $questionService;

    public string $title = '';
    public string $body = '';
    public array $tags = [];
    public string $tagInput = '';

    public bool $isLoading = false;
    public bool $isSuccess = false;
    public ?int $createdQuestionId = null;

    protected $rules = [
        'title' => 'required|min:15|max:200',
        'body' => 'required|min:30',
        'tags' => 'required|array|min:1|max:5',
        'tags.*' => 'string|max:25',
    ];

    protected $messages = [
        'title.required' => 'Please enter a title for your question.',
        'title.min' => 'Your title must be at least 15 characters.',
        'body.required' => 'Please provide details about your question.',
        'body.min' => 'Your question body must be at least 30 characters.',
        'tags.required' => 'Please add at least one tag.',
        'tags.min' => 'Please add at least one tag.',
        'tags.max' => 'You can add at most 5 tags.',
    ];

    public function __construct()
    {
        $this->questionService = new QuestionService();
    }

    public function render()
    {
        return view('livewire.create-question')->layout('layouts.app');
    }

    public function addTag(): void
    {
        $tag = trim($this->tagInput);

        if (!empty($tag) && strlen($tag) <= 25 && !in_array($tag, $this->tags)) {
            $this->tags[] = $tag;
            $this->tagInput = '';
        }
    }

    public function removeTag(int $index): void
    {
        unset($this->tags[$index]);
        $this->tags = array_values($this->tags);
    }

    public function submit(): void
    {
        $this->validate();

        $this->isLoading = true;

        $result = $this->questionService->create([
            'title' => $this->title,
            'body' => $this->body,
            'tags' => $this->tags,
        ]);

        if ($result['success']) {
            $this->isSuccess = true;
            $this->createdQuestionId = $result['question']->id;
        } else {
            $this->addError('title', $result['message'] ?? 'Failed to create question.');
        }

        $this->isLoading = false;
    }

    public function resetForm(): void
    {
        $this->title = '';
        $this->body = '';
        $this->tags = [];
        $this->tagInput = '';
        $this->isSuccess = false;
        $this->createdQuestionId = null;
    }
}
