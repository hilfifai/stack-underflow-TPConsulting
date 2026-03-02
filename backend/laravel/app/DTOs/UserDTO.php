<?php

namespace App\DTOs;

class UserDTO
{
    public function __construct(
        public readonly string $username,
        public readonly string $email,
        public readonly string $password,
    ) {}
}
