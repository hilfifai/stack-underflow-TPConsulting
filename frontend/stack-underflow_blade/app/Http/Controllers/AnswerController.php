<?php

namespace App\Http\Controllers;

use App\Services\AnswerService;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    protected AnswerService $answerService;

    public function __construct()
    {
        $this->answerService = new AnswerService();
    }

    public function store(Request $request, int $questionId)
    {
        $authService = new AuthService();
        if (!$authService->isAuthenticated()) {
            return redirect()->route('login');
        }

        $data = $request->validate([
            'body' => 'required|min:30',
        ]);

        $result = $this->answerService->create($questionId, $data);

        if ($result['success'] ?? false) {
            return redirect()->route('questions.show', $questionId)
                ->with('success', 'Answer posted successfully!');
        }

        return back()->withErrors(['body' => $result['message'] ?? 'Failed to post answer.'])
            ->withInput();
    }

    public function accept(int $questionId, int $answerId)
    {
        $authService = new AuthService();
        if (!$authService->isAuthenticated()) {
            return redirect()->route('login');
        }

        $this->answerService->accept($answerId);

        return redirect()->route('questions.show', $questionId);
    }

    public function vote(Request $request, int $questionId, int $answerId)
    {
        $authService = new AuthService();
        if (!$authService->isAuthenticated()) {
            return redirect()->route('login');
        }

        $direction = $request->get('direction', 1);

        $this->answerService->vote($answerId, $direction);

        return redirect()->route('questions.show', $questionId);
    }
}
