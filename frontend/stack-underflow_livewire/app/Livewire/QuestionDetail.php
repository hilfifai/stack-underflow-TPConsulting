<?php

namespace App\Livewire;

use App\DTOs\AnswerDTO;
use App\DTOs\QuestionDTO;
use App\Services\AnswerService;
use App\Services\CommentService;
use App\Services\QuestionService;
use Livewire\Component;

class QuestionDetail extends Component
{
    protected QuestionService $questionService;
    protected AnswerService $answerService;
    protected CommentService $commentService;

    public QuestionDTO $question;
    public int $questionId;
    public string $newAnswer = '';
    public string $newComment = '';
    public ?int $commentAnswerId = null;
    public bool $isLoading = false;

    protected $listeners = [
        'refreshComponent' => '$refresh',
    ];

    public function mount(int $id): void
    {
        $this->questionId = $id;
        $this->loadQuestion();
    }

    public function render()
    {
        return view('livewire.question-detail')->layout('layouts.app');
    }

    protected function loadQuestion(): void
    {
        $this->questionService = new QuestionService();
        $question = $this->questionService->getById($this->questionId);

        if ($question) {
            $this->question = $question;
        } else {
            abort(404, 'Question not found');
        }
    }

    public function getAnswersProperty(): array
    {
        $this->answerService = new AnswerService();
        return $this->answerService->getByQuestion($this->questionId);
    }

    public function submitAnswer(): void
    {
        $this->validate([
            'newAnswer' => 'required|min:30',
        ]);

        $this->isLoading = true;

        $this->answerService = new AnswerService();
        $result = $this->answerService->create($this->questionId, [
            'body' => $this->newAnswer,
        ]);

        if ($result['success']) {
            $this->newAnswer = '';
            $this->dispatchBrowserEvent('answer-added');
            $this->loadQuestion();
            $this->dispatch('refreshComponent');
        } else {
            $this->addError('newAnswer', $result['message']);
        }

        $this->isLoading = false;
    }

    public function submitComment(?int $answerId = null): void
    {
        $this->validate([
            'newComment' => 'required|min:10',
        ]);

        $this->isLoading = true;

        $this->commentService = new CommentService();

        if ($answerId) {
            $result = $this->commentService->createAnswerComment($answerId, [
                'body' => $this->newComment,
            ]);
        } else {
            $result = $this->commentService->createQuestionComment($this->questionId, [
                'body' => $this->newComment,
            ]);
        }

        if ($result['success']) {
            $this->newComment = '';
            $this->commentAnswerId = null;
            $this->dispatchBrowserEvent('comment-added');
            $this->loadQuestion();
            $this->dispatch('refreshComponent');
        } else {
            $this->addError('newComment', $result['message']);
        }

        $this->isLoading = false;
    }

    public function voteQuestion(int $direction): void
    {
        $this->questionService = new QuestionService();
        $this->questionService->vote($this->questionId, $direction);
        $this->loadQuestion();
    }

    public function voteAnswer(int $answerId, int $direction): void
    {
        $this->answerService = new AnswerService();
        $this->answerService->vote($answerId, $direction);
        $this->dispatch('refreshComponent');
    }

    public function acceptAnswer(int $answerId): void
    {
        $this->answerService = new AnswerService();
        $this->answerService->accept($answerId);
        $this->loadQuestion();
        $this->dispatch('refreshComponent');
    }

    protected function rules(): array
    {
        return [
            'newAnswer' => 'required|min:30',
            'newComment' => 'required|min:10',
        ];
    }
}
