<?php

namespace App\DTOs;

class QuestionDTO
{
    public function __construct(
        public readonly string $title,
        public readonly string $body,
        public readonly ?array $tags = null,
    ) {}
}
