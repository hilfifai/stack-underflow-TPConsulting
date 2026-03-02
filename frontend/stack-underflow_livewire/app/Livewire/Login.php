<?php

namespace App\Livewire;

use App\Services\AuthService;
use Livewire\Component;

class Login extends Component
{
    protected AuthService $authService;

    public string $email = '';
    public string $password = '';
    public bool $remember = false;

    protected $rules = [
        'email' => 'required|email',
        'password' => 'required|min:6',
    ];

    protected $messages = [
        'email.required' => 'Please enter your email address.',
        'email.email' => 'Please enter a valid email address.',
        'password.required' => 'Please enter your password.',
        'password.min' => 'Your password must be at least 6 characters.',
    ];

    public function __construct()
    {
        $this->authService = new AuthService();
    }

    public function render()
    {
        return view('livewire.login')->layout('layouts.app');
    }

    public function submit(): void
    {
        $this->validate();

        $result = $this->authService->login([
            'email' => $this->email,
            'password' => $this->password,
        ]);

        if ($result['success']) {
            session()->flash('success', 'Welcome back!');
            redirect()->intended(route('home'));
        }

        $this->addError('email', $result['message'] ?? 'Invalid credentials.');
    }
}
