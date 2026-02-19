<?php

namespace App\Services;

use App\DTOs\UserDTO;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(UserDTO $dto): array
    {
        $data = [
            'username' => $dto->username,
            'email' => $dto->email,
            'password' => Hash::make($dto->password),
            'reputation' => 0,
        ];

        $user = $this->userRepository->create($data);
        $token = JWTAuth::fromUser($user);

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function login(string $email, string $password): ?array
    {
        $user = $this->userRepository->findByEmail($email);

        if (!$user || !Hash::check($password, $user->password)) {
            return null;
        }

        $token = JWTAuth::fromUser($user);

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function logout(): void
    {
        JWTAuth::invalidate(JWTAuth::getToken());
    }

    public function me(): \App\Models\User
    {
        return JWTAuth::user();
    }

    public function refresh(): string
    {
        return JWTAuth::refresh(JWTAuth::getToken());
    }
}
