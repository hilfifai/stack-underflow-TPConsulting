<?php

namespace App\Http\Controllers;

use App\Services\AnswerService;
use App\Services\AuthService;
use App\Services\QuestionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class QuestionController extends Controller
{
    protected QuestionService $questionService;
    protected AnswerService $answerService;

    public function __construct()
    {
        $this->questionService = new QuestionService();
        $this->answerService = new AnswerService();
    }

    public function index(Request $request)
    {
        $params = [];
        if ($request->has('sort')) {
            $params['sort'] = $request->sort;
        }

        $questions = $this->questionService->getAll($params);

        return view('questions.index', [
            'questions' => $questions['data'] ?? [],
            'meta' => $questions['meta'] ?? null,
        ]);
    }

    public function show(int $id)
    {
        $question = $this->questionService->getById($id);

        if (!$question) {
            abort(404, 'Question not found');
        }

        $answers = $this->answerService->getByQuestion($id);

        return view('questions.show', [
            'question' => $question,
            'answers' => $answers['data'] ?? [],
        ]);
    }

    public function create()
    {
        $authService = new AuthService();
        if (!$authService->isAuthenticated()) {
            return redirect()->route('login');
        }

        return view('questions.create');
    }

    public function store(Request $request)
    {
        $authService = new AuthService();
        if (!$authService->isAuthenticated()) {
            return redirect()->route('login');
        }

        $data = $request->validate([
            'title' => 'required|min:15|max:200',
            'body' => 'required|min:30',
            'tags' => 'required|array|min:1',
        ]);

        $result = $this->questionService->create($data);

        if ($result['success'] ?? false) {
            return redirect()->route('questions.show', $result['data']['id'])
                ->with('success', 'Question posted successfully!');
        }

        return back()->withErrors(['title' => $result['message'] ?? 'Failed to create question.'])
            ->withInput();
    }

    public function search(Request $request)
    {
        $query = $request->get('q', '');
        $results = $this->questionService->search($query);

        return view('questions.search', [
            'query' => $query,
            'questions' => $results['data'] ?? [],
        ]);
    }
}
