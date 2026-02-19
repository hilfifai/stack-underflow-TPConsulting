<script lang="ts">
	import type { Question } from '$lib/types';
	import { onMount } from 'svelte';

	let questions: Question[] = $state([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	onMount(async () => {
		try {
			const response = await fetch('http://localhost:8080/api/v1/questions');
			if (!response.ok) throw new Error('Failed to load questions');
			questions = await response.json();
		} catch (e) {
			error = e instanceof Error ? e.message : 'An error occurred';
		} finally {
			loading = false;
		}
	});

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<div class="container">
	<div class="page-header">
		<h1>All Questions</h1>
		<a href="/questions/ask" class="btn btn-primary">Ask Question</a>
	</div>

	{#if loading}
		<div class="loading">Loading questions...</div>
	{:else if error}
		<div class="error">{error}</div>
	{:else if questions.length === 0}
		<div class="empty-state">
			<p>No questions yet. Be the first to ask!</p>
		</div>
	{:else}
		<div class="questions-list">
			{#each questions as question}
				<div class="question-card">
					<div class="question-stats">
						<div class="stat">
							<span class="stat-value">{question.votes || 0}</span>
							<span class="stat-label">votes</span>
						</div>
						<div class="stat">
							<span class="stat-value">{question.answersCount || 0}</span>
							<span class="stat-label">answers</span>
						</div>
					</div>
					<div class="question-content">
						<h2 class="question-title">
							<a href="/questions/{question.id}">{question.title}</a>
						</h2>
						<p class="question-excerpt">
							{question.content.substring(0, 150)}{question.content.length > 150 ? '...' : ''}
						</p>
						<div class="question-meta">
							<div class="tags">
								{#each question.tags || [] as tag}
									<span class="tag">{tag}</span>
								{/each}
							</div>
							<div class="question-info">
								<span class="author">{question.username}</span>
								<span class="date">{formatDate(question.createdAt)}</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.page-header h1 {
		font-size: 1.75rem;
		font-weight: 500;
	}

	.loading,
	.error,
	.empty-state {
		text-align: center;
		padding: 3rem;
		color: var(--text-secondary);
	}

	.error {
		color: var(--error-color);
	}

	.questions-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.question-card {
		display: flex;
		gap: 1.5rem;
		padding: 1.25rem;
		background-color: var(--card-background);
		border: 1px solid var(--border-color);
		border-radius: 5px;
	}

	.question-stats {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-width: 80px;
		text-align: center;
	}

	.stat {
		display: flex;
		flex-direction: column;
	}

	.stat-value {
		font-size: 1.1rem;
		font-weight: 500;
		color: var(--text-color);
	}

	.stat-label {
		font-size: 0.75rem;
		color: var(--text-secondary);
	}

	.question-content {
		flex: 1;
	}

	.question-title {
		font-size: 1.1rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.question-title a {
		color: var(--secondary-color);
		text-decoration: none;
	}

	.question-title a:hover {
		text-decoration: underline;
	}

	.question-excerpt {
		color: var(--text-secondary);
		font-size: 0.9rem;
		margin-bottom: 0.75rem;
		line-height: 1.5;
	}

	.question-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.tags {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.tag {
		padding: 0.25rem 0.5rem;
		background-color: #e1ecf4;
		color: #39739d;
		border-radius: 3px;
		font-size: 0.8rem;
	}

	.question-info {
		font-size: 0.8rem;
		color: var(--text-secondary);
	}

	.question-info .author {
		color: var(--secondary-color);
		margin-right: 0.5rem;
	}

	.question-info .date {
		color: var(--text-secondary);
	}
</style>
