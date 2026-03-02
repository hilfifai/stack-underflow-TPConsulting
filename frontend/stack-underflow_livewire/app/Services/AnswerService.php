<?php

namespace App\Services;

use App\DTOs\AnswerDTO;
use Illuminate\Support\Collection;

class AnswerService extends ApiService
{
    public function getByQuestion(int $questionId): array
    {
        $response = $this->get("/questions/{$questionId}/answers");

        if ($response['success'] ?? false) {
            $answers = collect($response['data'] ?? [])->map(function ($item) {
                return AnswerDTO::fromArray($item);
            });

            return [
                'success' => true,
                'data' => $answers,
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Failed to fetch answers',
            'data' => collect(),
        ];
    }

    public function create(int $questionId, array $data): array
    {
        $response = $this->post("/questions/{$questionId}/answers", $data);

        if ($response['success'] ?? false) {
            return [
                'success' => true,
                'answer' => AnswerDTO::fromArray($response['data'] ?? []),
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Failed to create answer',
            'errors' => $response['errors'] ?? [],
        ];
    }

    public function update(int $answerId, array $data): array
    {
        $response = $this->put("/answers/{$answerId}", $data);

        if ($response['success'] ?? false) {
            return [
                'success' => true,
                'answer' => AnswerDTO::fromArray($response['data'] ?? []),
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Failed to update answer',
            'errors' => $response['errors'] ?? [],
        ];
    }

    public function delete(int $answerId): array
    {
        $response = $this->delete("/answers/{$answerId}");

        return $response;
    }

    public function accept(int $answerId): array
    {
        $response = $this->post("/answers/{$answerId}/accept");

        return $response;
    }

    public function vote(int $answerId, int $direction): array
    {
        $response = $this->post("/answers/{$answerId}/vote", [
            'direction' => $direction,
        ]);

        return $response;
    }
}
