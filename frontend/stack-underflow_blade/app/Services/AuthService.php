<?php

namespace App\Services;

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
                'user' => $user,
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
                'user' => $user,
                'token' => $token,
            ];
        }

        return [
            'success' => false,
            'message' => $response['message'] ?? 'Registration failed',
            'errors' => $response['errors'] ?? [],
        ];
    }

    public function logout(): void
    {
        $this->post('/auth/logout');
        session()->forget(['token', 'user']);
    }

    public function getCurrentUser(): ?array
    {
        return session('user');
    }

    public function isAuthenticated(): bool
    {
        return session()->has('token');
    }
}
