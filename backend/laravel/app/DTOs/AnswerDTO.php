<?php

namespace App\DTOs;

class AnswerDTO
{
    public function __construct(
        public readonly string $body,
    ) {}
}
