<?php

namespace App\Repositories;

use App\Models\Question;

class QuestionRepository
{
    protected $model;

    public function __construct(Question $question)
    {
        $this->model = $question;
    }

    public function findById(int $id): ?Question
    {
        return $this->model->with(['user', 'answers', 'tags', 'comments'])->find($id);
    }

    public function findBySlug(string $slug): ?Question
    {
        return $this->model->where('slug', $slug)->with(['user', 'answers', 'tags', 'comments'])->first();
    }

    public function create(array $data): Question
    {
        return $this->model->create($data);
    }

    public function update(Question $question, array $data): bool
    {
        return $question->update($data);
    }

    public function delete(Question $question): bool
    {
        return $question->delete();
    }

    public function all(): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->with(['user', 'tags'])->get();
    }

    public function paginate(int $perPage = 10): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        return $this->model->with(['user', 'tags'])->paginate($perPage);
    }

    public function popular(int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->with(['user', 'tags'])->popular()->limit($limit)->get();
    }

    public function recent(int $limit = 10): \Illuminate\Database\Eloquent\Collection
    {
        return $this->model->with(['user', 'tags'])->recent()->limit($limit)->get();
    }

    public function incrementViews(Question $question): bool
    {
        return $question->increment('views');
    }

    public function incrementVotes(Question $question, int $value = 1): bool
    {
        return $question->increment('votes', $value);
    }
}
