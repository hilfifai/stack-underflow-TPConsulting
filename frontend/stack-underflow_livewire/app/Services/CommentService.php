<?php

namespace App\Services;

use App\DTOs\CommentDTO;
use Illuminate\Support\Collection;

class CommentService extends ApiService
{
    public function getByQuestion(int $questionId): array
    {
        $response = $this->get("/questions/{$questionId}/comments");

        if ($response['success'] ?? false) {
            $comments = collect($response['data'] ?? [])->map(function ($item) {
                return CommentDTO::fromArray($item);
            });

            return [
                'success' => true,
                'data' => $comments,
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Failed to fetch comments',
            'data' => collect(),
        ];
    }

    public function getByAnswer(int $answerId): array
    {
        $response = $this->get("/answers/{$answerId}/comments");

        if ($response['success'] ?? false) {
            $comments = collect($response['data'] ?? [])->map(function ($item) {
                return CommentDTO::fromArray($item);
            });

            return [
                'success' => true,
                'data' => $comments,
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Failed to fetch comments',
            'data' => collect(),
        ];
    }

    public function createQuestionComment(int $questionId, array $data): array
    {
        $response = $this->post("/questions/{$questionId}/comments", $data);

        if ($response['success'] ?? false) {
            return [
                'success' => true,
                'comment' => CommentDTO::fromArray($response['data'] ?? []),
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Failed to create comment',
            'errors' => $response['errors'] ?? [],
        ];
    }

    public function createAnswerComment(int $answerId, array $data): array
    {
        $response = $this->post("/answers/{$answerId}/comments", $data);

        if ($response['success'] ?? false) {
            return [
                'success' => true,
                'comment' => CommentDTO::fromArray($response['data'] ?? []),
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Failed to create comment',
            'errors' => $response['errors'] ?? [],
        ];
    }

    public function delete(int $commentId): array
    {
        $response = $this->delete("/comments/{$commentId}");

        return $response;
    }
}
