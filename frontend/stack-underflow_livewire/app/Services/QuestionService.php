<?php

namespace App\Services;

use App\DTOs\QuestionDTO;
use Illuminate\Support\Collection;

class QuestionService extends ApiService
{
    public function getAll(array $params = []): array
    {
        $response = $this->get('/questions', ['query' => $params]);

        if ($response['success'] ?? false) {
            $questions = collect($response['data'] ?? [])->map(function ($item) {
                return QuestionDTO::fromArray($item);
            });

            return [
                'success' => true,
                'data' => $questions,
                'meta' => $response['meta'] ?? null,
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Failed to fetch questions',
            'data' => collect(),
        ];
    }

    public function getById(int $id): ?QuestionDTO
    {
        $response = $this->get("/questions/{$id}");

        if ($response['success'] ?? false) {
            return QuestionDTO::fromArray($response['data'] ?? []);
        }

        return null;
    }

    public function create(array $data): array
    {
        $response = $this->post('/questions', $data);

        if ($response['success'] ?? false) {
            return [
                'success' => true,
                'question' => QuestionDTO::fromArray($response['data'] ?? []),
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Failed to create question',
            'errors' => $response['errors'] ?? [],
        ];
    }

    public function update(int $id, array $data): array
    {
        $response = $this->put("/questions/{$id}", $data);

        if ($response['success'] ?? false) {
            return [
                'success' => true,
                'question' => QuestionDTO::fromArray($response['data'] ?? []),
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Failed to update question',
            'errors' => $response['errors'] ?? [],
        ];
    }

    public function delete(int $id): array
    {
        $response = $this->delete("/questions/{$id}");

        return $response;
    }

    public function search(string $query, array $params = []): array
    {
        $response = $this->get('/questions/search', [
            'query' => array_merge(['q' => $query], $params),
        ]);

        if ($response['success'] ?? false) {
            $questions = collect($response['data'] ?? [])->map(function ($item) {
                return QuestionDTO::fromArray($item);
            });

            return [
                'success' => true,
                'data' => $questions,
                'meta' => $response['meta'] ?? null,
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Search failed',
            'data' => collect(),
        ];
    }

    public function vote(int $questionId, int $direction): array
    {
        $response = $this->post("/questions/{$questionId}/vote", [
            'direction' => $direction, // 1 for upvote, -1 for downvote
        ]);

        return $response;
    }
}
