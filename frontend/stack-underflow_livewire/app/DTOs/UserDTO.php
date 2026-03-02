<?php

namespace App\DTOs;

class UserDTO
{
    public function __construct(
        public readonly ?int $id,
        public readonly string $name,
        public readonly string $email,
        public readonly ?string $avatar,
        public readonly ?string $createdAt,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'] ?? null,
            name: $data['name'] ?? '',
            email: $data['email'] ?? '',
            avatar: $data['avatar'] ?? null,
            createdAt: $data['created_at'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->avatar,
            'created_at' => $this->createdAt,
        ];
    }
}
