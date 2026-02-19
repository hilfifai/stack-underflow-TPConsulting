<script lang="ts">
	import { page } from '$app/stores';
	import type { Question, Answer, Comment } from '$lib/types';
	import { onMount } from 'svelte';

	let question: Question | null = $state(null);
	let answers: Answer[] = $state([]);
	let comments: Comment[] = $state([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let newAnswer = $state('');
	let submitting = $state(false);

	const questionId = $derived(Number($page.params.id));

	onMount(async () => {
		await loadQuestion();
	});

	async function loadQuestion() {
		try {
			const [qRes, aRes, cRes] = await Promise.all([
				fetch(`http://localhost:8080/api/v1/questions/${questionId}`),
				fetch(`http://localhost:8080/api/v1/questions/${questionId}/answers`),
				fetch(`http://localhost:8080/api/v1/questions/${questionId}/comments`)
			]);

			if (!qRes.ok) throw new Error('Question not found');

			question = await qRes.json();
			answers = await aRes.json().catch(() => []);
			comments = await cRes.json().catch(() => []);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to load question';
		} finally {
			loading = false;
		}
	}

	async function submitAnswer() {
		if (!newAnswer.trim()) return;

		submitting = true;
		try {
			const token = localStorage.getItem('token');
			const res = await fetch(`http://localhost:8080/api/v1/questions/${questionId}/answers`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...(token && { 'Authorization': `Bearer ${token}` })
				},
				body: JSON.stringify({ content: newAnswer })
			});

			if (!res.ok) throw new Error('Failed to submit answer');

			const answer = await res.json();
			answers = [...answers, answer];
			newAnswer = '';
		} catch (e) {
			alert(e instanceof Error ? e.message : 'Failed to submit answer');
		} finally {
			submitting = false;
		}
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="container">
	{#if loading}
		<div class="loading">Loading...</div>
	{:else if error}
		<div class="error">{error}</div>
	{:else if question}
		<div class="question-detail">
			<div class="question-header">
				<h1>{question.title}</h1>
				<div class="question-meta">
					<span>Asked {formatDate(question.createdAt)}</span>
					<span>By {question.username}</span>
				</div>
			</div>

			<div class="question-body">
				<div class="vote-section">
					<button class="vote-btn">▲</button>
					<span class="vote-count">{question.votes || 0}</span>
					<button class="vote-btn">▼</button>
				</div>

				<div class="content-section">
					<p class="question-content">{question.content}</p>

					<div class="tags">
						{#each question.tags || [] as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>

					<div class="comments-section">
						{#each comments as comment}
							<div class="comment">
								<span class="comment-content">{comment.content}</span>
								<span class="comment-author"> – {comment.username}</span>
								<span class="comment-date">{formatDate(comment.createdAt)}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="answers-section">
				<h2>{answers.length} Answer{answers.length !== 1 ? 's' : ''}</h2>

				{#each answers as answer}
					<div class="answer-card" class:accepted={answer.isAccepted}>
						<div class="vote-section">
							<button class="vote-btn">▲</button>
							<span class="vote-count">{answer.votes || 0}</span>
							<button class="vote-btn">▼</button>
							{#if answer.isAccepted}
								<span class="accepted-badge">✓</span>
							{/if}
						</div>

						<div class="content-section">
							<p>{answer.content}</p>
							<div class="answer-meta">
								<span>Answered {formatDate(answer.createdAt)}</span>
								<span>By {answer.username}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<div class="add-answer-section">
				<h3>Your Answer</h3>
				<textarea
					bind:value={newAnswer}
					placeholder="Write your answer here..."
					rows="6"
				></textarea>
				<button
					class="btn btn-primary"
					onclick={submitAnswer}
					disabled={submitting || !newAnswer.trim()}
				>
					{submitting ? 'Posting...' : 'Post Answer'}
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	.loading,
	.error {
		text-align: center;
		padding: 3rem;
	}

	.error {
		color: var(--error-color);
	}

	.question-header {
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
	}

	.question-header h1 {
		font-size: 1.5rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.question-meta {
		color: var(--text-secondary);
		font-size: 0.9rem;
	}

	.question-meta span {
		margin-right: 1rem;
	}

	.question-body,
	.answer-card {
		display: flex;
		gap: 1.5rem;
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--border-color);
	}

	.vote-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		min-width: 50px;
	}

	.vote-btn {
		background: none;
		border: none;
		font-size: 1.25rem;
		color: var(--text-secondary);
		cursor: pointer;
		padding: 0.25rem;
	}

	.vote-btn:hover {
		color: var(--primary-color);
	}

	.vote-count {
		font-size: 1.25rem;
		font-weight: 500;
	}

	.content-section {
		flex: 1;
	}

	.question-content,
	.answer-card p {
		line-height: 1.6;
		white-space: pre-wrap;
	}

	.tags {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
		margin: 1rem 0;
	}

	.tag {
		padding: 0.25rem 0.5rem;
		background-color: #e1ecf4;
		color: #39739d;
		border-radius: 3px;
		font-size: 0.8rem;
	}

	.comments-section {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid var(--border-color);
	}

	.comment {
		font-size: 0.85rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border-color);
	}

	.comment:last-child {
		border-bottom: none;
	}

	.comment-content {
		color: var(--text-color);
	}

	.comment-author {
		color: var(--secondary-color);
		margin-left: 0.25rem;
	}

	.comment-date {
		color: var(--text-secondary);
		margin-left: 0.5rem;
	}

	.answers-section {
		margin-top: 2rem;
	}

	.answers-section h2 {
		font-size: 1.25rem;
		font-weight: 500;
		margin-bottom: 1rem;
	}

	.answer-card {
		background-color: var(--card-background);
	}

	.answer-card.accepted {
		border-left: 3px solid var(--success-color);
	}

	.accepted-badge {
		color: var(--success-color);
		font-size: 1.5rem;
		font-weight: bold;
	}

	.answer-meta {
		margin-top: 1rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
	}

	.answer-meta span {
		margin-right: 1rem;
	}

	.add-answer-section {
		margin-top: 2rem;
	}

	.add-answer-section h3 {
		font-size: 1.1rem;
		font-weight: 500;
		margin-bottom: 1rem;
	}

	.add-answer-section textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--border-color);
		border-radius: 3px;
		resize: vertical;
		margin-bottom: 1rem;
	}

	.add-answer-section textarea:focus {
		outline: none;
		border-color: var(--secondary-color);
	}
</style>
