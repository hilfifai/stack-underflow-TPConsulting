<?php

namespace App\Services;

use App\DTOs\UserDTO;

class AuthService extends ApiService
{
    public function login(array $credentials): array
    {
        $response = $this->post('/auth/login', $credentials);

        if ($response['success'] ?? false) {
            $token = $response['data']['token'] ?? null;
            $user = $response['data']['user'] ?? null;

            if ($token && $user) {
                session(['token' => $token, 'user' => $user]);
            }

            return [
                'success' => true,
                'user' => UserDTO::fromArray($user),
                'token' => $token,
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Login failed',
            'errors' => $response['errors'] ?? [],
        ];
    }

    public function register(array $data): array
    {
        $response = $this->post('/auth/register', $data);

        if ($response['success'] ?? false) {
            $token = $response['data']['token'] ?? null;
            $user = $response['data']['user'] ?? null;

            if ($token && $user) {
                session(['token' => $token, 'user' => $user]);
            }

            return [
                'success' => true,
                'user' => UserDTO::fromArray($user),
                'token' => $token,
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Registration failed',
            'errors' => $response['errors'] ?? [],
        ];
    }

    public function logout(): array
    {
        $response = $this->post('/auth/logout');

        session()->forget(['token', 'user']);

        return $response;
    }

    public function getCurrentUser(): ?UserDTO
    {
        $user = session('user');

        return $user ? UserDTO::fromArray($user) : null;
    }

    public function isAuthenticated(): bool
    {
        return session()->has('token');
    }
}
