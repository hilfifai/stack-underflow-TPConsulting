<?php

namespace App\DTOs;

class QuestionDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $title,
        public readonly string $body,
        public readonly ?UserDTO $author,
        public readonly array $tags,
        public readonly int $votes,
        public readonly int $answers,
        public readonly int $views,
        public readonly ?string $createdAt,
        public readonly ?string $updatedAt,
        public readonly ?bool $isAnswered,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            title: $data['title'] ?? '',
            body: $data['body'] ?? '',
            author: isset($data['author']) ? UserDTO::fromArray($data['author']) : null,
            tags: $data['tags'] ?? [],
            votes: $data['votes'] ?? 0,
            answers: $data['answers'] ?? 0,
            views: $data['views'] ?? 0,
            createdAt: $data['created_at'] ?? null,
            updatedAt: $data['updated_at'] ?? null,
            isAnswered: $data['is_answered'] ?? false,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'author' => $this->author?->toArray(),
            'tags' => $this->tags,
            'votes' => $this->votes,
            'answers' => $this->answers,
            'views' => $this->views,
            'created_at' => $this->createdAt,
            'updated_at' => $this->updatedAt,
            'is_answered' => $this->isAnswered,
        ];
    }
}
