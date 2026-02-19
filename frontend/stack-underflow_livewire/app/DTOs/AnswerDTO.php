<?php

namespace App\DTOs;

class AnswerDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $body,
        public readonly ?UserDTO $author,
        public readonly int $votes,
        public readonly bool $isAccepted,
        public readonly ?string $createdAt,
        public readonly ?string $updatedAt,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            body: $data['body'] ?? '',
            author: isset($data['author']) ? UserDTO::fromArray($data['author']) : null,
            votes: $data['votes'] ?? 0,
            isAccepted: $data['is_accepted'] ?? false,
            createdAt: $data['created_at'] ?? null,
            updatedAt: $data['updated_at'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'author' => $this->author?->toArray(),
            'votes' => $this->votes,
            'is_accepted' => $this->isAccepted,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt,
        ];
    }
}
