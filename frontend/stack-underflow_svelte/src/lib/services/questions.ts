import type { Question, QuestionRequest, Comment, CommentRequest, Answer } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

async function request(endpoint: string, options: RequestInit = {}) {
	const token = localStorage.getItem('token');
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		...(token && { 'Authorization': `Bearer ${token}` }),
		...options.headers as Record<string, string>
	};

	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ message: 'Request failed' }));
		throw new Error(error.message || 'Request failed');
	}

	return response.json();
}

export async function getQuestions(): Promise<Question[]> {
	return request('/questions');
}

export async function getQuestion(id: number): Promise<Question> {
	return request(`/questions/${id}`);
}

export async function createQuestion(data: QuestionRequest): Promise<Question> {
	return request('/questions', {
		method: 'POST',
		body: JSON.stringify(data)
	});
}

export async function updateQuestion(id: number, data: Partial<QuestionRequest>): Promise<Question> {
	return request(`/questions/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data)
	});
}

export async function deleteQuestion(id: number): Promise<void> {
	await request(`/questions/${id}`, { method: 'DELETE' });
}

export async function getComments(questionId: number): Promise<Comment[]> {
	return request(`/questions/${questionId}/comments`);
}

export async function createComment(data: CommentRequest): Promise<Comment> {
	return request('/comments', {
		method: 'POST',
		body: JSON.stringify(data)
	});
}

export async function getAnswers(questionId: number): Promise<Answer[]> {
	return request(`/questions/${questionId}/answers`);
}

export async function createAnswer(questionId: number, content: string): Promise<Answer> {
	return request(`/questions/${questionId}/answers`, {
		method: 'POST',
		body: JSON.stringify({ content })
	});
}

export async function voteQuestion(questionId: number, voteType: 'up' | 'down'): Promise<Question> {
	return request(`/questions/${questionId}/vote`, {
		method: 'POST',
		body: JSON.stringify({ voteType })
	});
}

export async function voteAnswer(answerId: number, voteType: 'up' | 'down'): Promise<Answer> {
	return request(`/answers/${answerId}/vote`, {
		method: 'POST',
		body: JSON.stringify({ voteType })
	});
}

export async function acceptAnswer(answerId: number): Promise<Answer> {
	return request(`/answers/${answerId}/accept`, { method: 'POST' });
}
