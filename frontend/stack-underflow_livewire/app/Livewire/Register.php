<?php

namespace App\Livewire;

use App\Services\AuthService;
use Livewire\Component;

class Register extends Component
{
    protected AuthService $authService;

    public string $name = '';
    public string $email = '';
    public string $password = '';
    public string $passwordConfirmation = '';

    protected $rules = [
        'name' => 'required|min:3|max:50',
        'email' => 'required|email',
        'password' => 'required|min:6|same:passwordConfirmation',
        'passwordConfirmation' => 'required|min:6',
    ];

    protected $messages = [
        'name.required' => 'Please enter your name.',
        'name.min' => 'Your name must be at least 3 characters.',
        'email.required' => 'Please enter your email address.',
        'email.email' => 'Please enter a valid email address.',
        'password.required' => 'Please enter a password.',
        'password.min' => 'Your password must be at least 6 characters.',
        'password.same' => 'Passwords do not match.',
        'passwordConfirmation.required' => 'Please confirm your password.',
        'passwordConfirmation.min' => 'Your password must be at least 6 characters.',
    ];

    public function __construct()
    {
        $this->authService = new AuthService();
    }

    public function render()
    {
        return view('livewire.register')->layout('layouts.app');
    }

    public function submit(): void
    {
        $this->validate();

        $result = $this->authService->register([
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password,
        ]);

        if ($result['success']) {
            session()->flash('success', 'Account created successfully!');
            redirect()->intended(route('home'));
        } else {
            $this->addError('email', $result['message'] ?? 'Registration failed.');
        }
    }
}
