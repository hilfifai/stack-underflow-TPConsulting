<?php

namespace App\Http\Controllers\Api\v1;

use App\DTOs\QuestionDTO;
use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Services\QuestionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    protected $questionService;

    public function __construct(QuestionService $questionService)
    {
        $this->questionService = $questionService;
    }

    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 10);
        $questions = $this->questionService->getAll($perPage);

        return response()->json([
            'success' => true,
            'data' => $questions,
        ]);
    }

    public function popular(): JsonResponse
    {
        $questions = $this->questionService->getPopular();

        return response()->json([
            'success' => true,
            'data' => $questions,
        ]);
    }

    public function recent(): JsonResponse
    {
        $questions = $this->questionService->getRecent();

        return response()->json([
            'success' => true,
            'data' => $questions,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $question = $this->questionService->getById($id);

        if (!$question) {
            return response()->json([
                'success' => false,
                'message' => 'Question not found',
            ], 404);
        }

        // Increment views
        $this->questionService->incrementViews($question);

        return response()->json([
            'success' => true,
            'data' => $question,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        $dto = new QuestionDTO(
            $validated['title'],
            $validated['body'],
            $validated['tags'] ?? null
        );

        $user = auth()->user();
        $question = $this->questionService->create($dto, $user->id);

        return response()->json([
            'success' => true,
            'data' => $question,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $question = $this->questionService->getById($id);

        if (!$question) {
            return response()->json([
                'success' => false,
                'message' => 'Question not found',
            ], 404);
        }

        // Check ownership
        if ($question->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        $dto = new QuestionDTO(
            $validated['title'],
            $validated['body'],
            $validated['tags'] ?? null
        );

        $this->questionService->update($question, $dto);

        return response()->json([
            'success' => true,
            'data' => $question->fresh(),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $question = $this->questionService->getById($id);

        if (!$question) {
            return response()->json([
                'success' => false,
                'message' => 'Question not found',
            ], 404);
        }

        // Check ownership
        if ($question->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $this->questionService->delete($question);

        return response()->json([
            'success' => true,
            'message' => 'Question deleted successfully',
        ]);
    }
}
