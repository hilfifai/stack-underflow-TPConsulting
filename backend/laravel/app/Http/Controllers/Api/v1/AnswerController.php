<?php

namespace App\Http\Controllers\Api\v1;

use App\DTOs\AnswerDTO;
use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Services\AnswerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    protected $answerService;

    public function __construct(AnswerService $answerService)
    {
        $this->answerService = $answerService;
    }

    public function index(int $questionId): JsonResponse
    {
        $answers = $this->answerService->getByQuestionId($questionId);

        return response()->json([
            'success' => true,
            'data' => $answers,
        ]);
    }

    public function store(Request $request, int $questionId): JsonResponse
    {
        $validated = $request->validate([
            'body' => 'required|string',
        ]);

        $dto = new AnswerDTO($validated['body']);
        $user = auth()->user();
        $answer = $this->answerService->create($dto, $questionId, $user->id);

        return response()->json([
            'success' => true,
            'data' => $answer,
        ], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $answer = $this->answerService->getById($id);

        if (!$answer) {
            return response()->json([
                'success' => false,
                'message' => 'Answer not found',
            ], 404);
        }

        // Check ownership
        if ($answer->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $validated = $request->validate([
            'body' => 'required|string',
        ]);

        $dto = new AnswerDTO($validated['body']);
        $this->answerService->update($answer, $dto);

        return response()->json([
            'success' => true,
            'data' => $answer->fresh(),
        ]);
    }

    public function destroy(int $id): JsonResponse
    {
        $answer = $this->answerService->getById($id);

        if (!$answer) {
            return response()->json([
                'success' => false,
                'message' => 'Answer not found',
            ], 404);
        }

        // Check ownership
        if ($answer->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $this->answerService->delete($answer);

        return response()->json([
            'success' => true,
            'message' => 'Answer deleted successfully',
        ]);
    }

    public function accept(int $id): JsonResponse
    {
        $answer = $this->answerService->getById($id);

        if (!$answer) {
            return response()->json([
                'success' => false,
                'message' => 'Answer not found',
            ], 404);
        }

        // Only question owner can accept answer
        $question = $answer->question;
        if ($question->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Only the question owner can accept answers',
            ], 403);
        }

        $this->answerService->accept($answer);

        return response()->json([
            'success' => true,
            'data' => $answer->fresh(),
        ]);
    }
}
