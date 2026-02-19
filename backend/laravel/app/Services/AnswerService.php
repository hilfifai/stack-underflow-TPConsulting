<?php

namespace App\Services;

use App\DTOs\AnswerDTO;
use App\Models\Answer;
use App\Repositories\AnswerRepository;

class AnswerService
{
    protected $answerRepository;

    public function __construct(AnswerRepository $answerRepository)
    {
        $this->answerRepository = $answerRepository;
    }

    public function getByQuestionId(int $questionId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->answerRepository->findByQuestionId($questionId);
    }

    public function getById(int $id): ?Answer
    {
        return $this->answerRepository->findById($id);
    }

    public function create(AnswerDTO $dto, int $questionId, int $userId): Answer
    {
        $data = [
            'body' => $dto->body,
            'question_id' => $questionId,
            'user_id' => $userId,
            'is_accepted' => false,
            'votes' => 0,
        ];

        return $this->answerRepository->create($data);
    }

    public function update(Answer $answer, AnswerDTO $dto): bool
    {
        $data = [
            'body' => $dto->body,
        ];

        return $this->answerRepository->update($answer, $data);
    }

    public function delete(Answer $answer): bool
    {
        return $this->answerRepository->delete($answer);
    }

    public function accept(Answer $answer): bool
    {
        return $this->answerRepository->accept($answer);
    }

    public function vote(Answer $answer, int $value): void
    {
        $this->answerRepository->incrementVotes($answer, $value);
    }
}
