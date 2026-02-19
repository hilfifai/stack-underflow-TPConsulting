<?php

namespace App\Services;

class AnswerService extends ApiService
{
    public function getByQuestion(int $questionId): array
    {
        return $this->get("/questions/{$questionId}/answers");
    }

    public function create(int $questionId, array $data): array
    {
        return $this->post("/questions/{$questionId}/answers", $data);
    }

    public function update(int $answerId, array $data): array
    {
        return $this->put("/answers/{$answerId}", $data);
    }

    public function delete(int $answerId): array
    {
        return $this->delete("/answers/{$answerId}");
    }

    public function accept(int $answerId): array
    {
        return $this->post("/answers/{$answerId}/accept");
    }

    public function vote(int $answerId, int $direction): array
    {
        return $this->post("/answers/{$answerId}/vote", [
            'direction' => $direction,
        ]);
    }
}
