<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct()
    {
        $this->authService = new AuthService();
    }

    public function showLogin()
    {
        if ($this->authService->isAuthenticated()) {
            return redirect()->route('home');
        }

        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        $result = $this->authService->login($credentials);

        if ($result['success']) {
            return redirect()->intended(route('home'))
                ->with('success', 'Welcome back!');
        }

        return back()->withErrors(['email' => $result['message'] ?? 'Invalid credentials.'])
            ->withInput();
    }

    public function showRegister()
    {
        if ($this->authService->isAuthenticated()) {
            return redirect()->route('home');
        }

        return view('auth.register');
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3|max:50',
            'email' => 'required|email',
            'password' => 'required|min:6|same:password_confirmation',
            'password_confirmation' => 'required|min:6',
        ]);

        $result = $this->authService->register($data);

        if ($result['success']) {
            return redirect()->intended(route('home'))
                ->with('success', 'Account created successfully!');
        }

        return back()->withErrors(['email' => $result['message'] ?? 'Registration failed.'])
            ->withInput();
    }

    public function logout()
    {
        $this->authService->logout();

        return redirect()->route('home')
            ->with('success', 'You have been logged out.');
    }
}
