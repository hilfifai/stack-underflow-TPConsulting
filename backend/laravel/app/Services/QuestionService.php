<?php

namespace App\Services;

use App\DTOs\QuestionDTO;
use App\Models\Question;
use App\Repositories\QuestionRepository;
use Illuminate\Support\Str;

class QuestionService
{
    protected $questionRepository;

    public function __construct(QuestionRepository $questionRepository)
    {
        $this->questionRepository = $questionRepository;
    }

    public function getAll(int $perPage = 10): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        return $this->questionRepository->paginate($perPage);
    }

    public function getPopular(int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return $this->questionRepository->popular($limit);
    }

    public function getRecent(int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return $this->questionRepository->recent($limit);
    }

    public function getById(int $id): ?Question
    {
        return $this->questionRepository->findById($id);
    }

    public function create(QuestionDTO $dto, int $userId): Question
    {
        $data = [
            'title' => $dto->title,
            'body' => $dto->body,
            'slug' => Str::slug($dto->title) . '-' . time(),
            'user_id' => $userId,
            'views' => 0,
            'votes' => 0,
        ];

        $question = $this->questionRepository->create($data);

        // Attach tags if provided
        if ($dto->tags) {
            $question->tags()->attach($dto->tags);
        }

        return $question;
    }

    public function update(Question $question, QuestionDTO $dto): bool
    {
        $data = [
            'title' => $dto->title,
            'body' => $dto->body,
            'slug' => Str::slug($dto->title) . '-' . time(),
        ];

        $updated = $this->questionRepository->update($question, $data);

        // Sync tags if provided
        if ($dto->tags) {
            $question->tags()->sync($dto->tags);
        }

        return $updated;
    }

    public function delete(Question $question): bool
    {
        return $this->questionRepository->delete($question);
    }

    public function incrementViews(Question $question): void
    {
        $this->questionRepository->incrementViews($question);
    }

    public function vote(Question $question, int $value): void
    {
        $this->questionRepository->incrementVotes($question, $value);
    }
}
