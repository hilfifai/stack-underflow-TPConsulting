export interface User {
	id: number;
	username: string;
	email: string;
	createdAt: string;
}

export interface Question {
	id: number;
	title: string;
	content: string;
	userId: number;
	username: string;
	createdAt: string;
	updatedAt: string;
	votes: number;
	answersCount: number;
	tags: string[];
}

export interface Comment {
	id: number;
	content: string;
	userId: number;
	username: string;
	questionId: number;
	answerId?: number;
	createdAt: string;
}

export interface Answer {
	id: number;
	content: string;
	userId: number;
	username: string;
	questionId: number;
	createdAt: string;
	updatedAt: string;
	votes: number;
	isAccepted: boolean;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	user: User;
}

export interface RegisterRequest {
	username: string;
	email: string;
	password: string;
}

export interface QuestionRequest {
	title: string;
	content: string;
	tags: string[];
}

export interface CommentRequest {
	content: string;
	questionId?: number;
	answerId?: number;
}

export interface VoteRequest {
	questionId?: number;
	answerId?: number;
	voteType: 'up' | 'down';
}

export interface ApiError {
	message: string;
	statusCode: number;
}
