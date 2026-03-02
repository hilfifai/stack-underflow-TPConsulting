<?php

namespace App\Repositories;

use App\Models\Answer;

class AnswerRepository
{
    protected $model;

    public function __construct(Answer $answer)
    {
        $this->model = $answer;
    }

    public function findById(int $id): ?Answer
    {
        return $this->model->with(['user', 'comments'])->find($id);
    }

    public function findByQuestionId(int $questionId): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->where('question_id', $questionId)
            ->with(['user', 'comments'])
            ->orderBy('is_accepted', 'desc')
            ->orderBy('votes', 'desc')
            ->get();
    }

    public function create(array $data): Answer
    {
        return $this->model->create($data);
    }

    public function update(Answer $answer, array $data): bool
    {
        return $answer->update($data);
    }

    public function delete(Answer $answer): bool
    {
        return $answer->delete();
    }

    public function accept(Answer $answer): bool
    {
        // Unaccept all other answers for this question
        $this->model->where('question_id', $answer->question_id)
            ->where('id', '!=', $answer->id)
            ->update(['is_accepted' => false]);

        return $answer->update(['is_accepted' => true]);
    }

    public function incrementVotes(Answer $answer, int $value = 1): bool
    {
        return $answer->increment('votes', $value);
    }
}
