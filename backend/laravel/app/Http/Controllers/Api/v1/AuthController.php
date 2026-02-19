<?php

namespace App\Http\Controllers\Api\v1;

use App\DTOs\UserDTO;
use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $dto = new UserDTO(
            $validated['username'],
            $validated['email'],
            $validated['password']
        );

        $result = $this->authService->register($dto);

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $result['user'],
                'token' => $result['token'],
            ],
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $result = $this->authService->login($validated['email'], $validated['password']);

        if (!$result) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $result['user'],
                'token' => $result['token'],
            ],
        ]);
    }

    public function logout(): JsonResponse
    {
        $this->authService->logout();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    public function me(): JsonResponse
    {
        $user = $this->authService->me();

        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    public function refresh(): JsonResponse
    {
        $token = $this->authService->refresh();

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $token,
            ],
        ]);
    }
}
