<?php

namespace App\Services;

class QuestionService extends ApiService
{
    public function getAll(array $params = []): array
    {
        $response = $this->get('/questions', ['query' => $params]);

        return $response;
    }

    public function getById(int $id): ?array
    {
        $response = $this->get("/questions/{$id}");

        if ($response['success'] ?? false) {
            return $response['data'];
        }

        return null;
    }

    public function create(array $data): array
    {
        return $this->post('/questions', $data);
    }

    public function update(int $id, array $data): array
    {
        return $this->put("/questions/{$id}", $data);
    }

    public function delete(int $id): array
    {
        return $this->delete("/questions/{$id}");
    }

    public function search(string $query, array $params = []): array
    {
        return $this->get('/questions/search', [
            'query' => array_merge(['q' => $query], $params),
        ]);
    }

    public function vote(int $questionId, int $direction): array
    {
        return $this->post("/questions/{$questionId}/vote", [
            'direction' => $direction,
        ]);
    }
}
