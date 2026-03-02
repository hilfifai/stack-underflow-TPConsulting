<?php

namespace App\DTOs;

class CommentDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $body,
        public readonly ?UserDTO $author,
        public readonly ?string $createdAt,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            body: $data['body'] ?? '',
            author: isset($data['author']) ? UserDTO::fromArray($data['author']) : null,
            createdAt: $data['created_at'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'body' => $this->body,
            'author' => $this->author?->toArray(),
            'created_at' => $this->createdAt,
        ];
    }
}
