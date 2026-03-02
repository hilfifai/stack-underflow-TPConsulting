<script lang="ts">
	import { isAuthenticated } from '$lib/stores/auth';
	import { createQuestion } from '$lib/services/questions';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let title = $state('');
	let content = $state('');
	let tags = $state('');
	let error = $state<string | null>(null);
	let loading = $state(false);

	onMount(() => {
		if (!$isAuthenticated) {
			goto('/login');
		}
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = null;

		if (!title.trim() || !content.trim()) {
			error = 'Title and content are required';
			return;
		}

		const tagsArray = tags
			.split(',')
			.map(t => t.trim())
			.filter(t => t.length > 0);

		loading = true;

		try {
			const question = await createQuestion({
				title,
				content,
				tags: tagsArray
			});
			goto(`/questions/${question.id}`);
		} catch (e) {
			error = e instanceof Error ? e.message : 'Failed to create question';
		} finally {
			loading = false;
		}
	}
</script>

<div class="container">
	<div class="ask-page">
		<h1>Ask a Question</h1>
		<p class="subtitle">Be specific and imagine you're asking a question to another person</p>

		{#if error}
			<div class="error-message">{error}</div>
		{/if}

		<form onsubmit={handleSubmit}>
			<div class="form-group">
				<label for="title">Title</label>
				<p class="help-text">Be specific and imagine you're asking a question to another person</p>
				<input
					type="text"
					id="title"
					bind:value={title}
					placeholder="e.g. How do I center a div in CSS?"
					required
				/>
			</div>

			<div class="form-group">
				<label for="content">Body</label>
				<p class="help-text">Include all the information someone would need to answer your question</p>
				<textarea
					id="content"
					bind:value={content}
					placeholder="Describe your problem in detail..."
					rows="10"
					required
				></textarea>
			</div>

			<div class="form-group">
				<label for="tags">Tags</label>
				<p class="help-text">Add up to 5 tags to describe what your question is about (comma separated)</p>
				<input
					type="text"
					id="tags"
					bind:value={tags}
					placeholder="e.g. javascript, css, html"
				/>
			</div>

			<button type="submit" class="btn btn-primary" disabled={loading}>
				{loading ? 'Posting...' : 'Post Question'}
			</button>
		</form>
	</div>
</div>

<style>
	.ask-page {
		max-width: 800px;
		margin: 0 auto;
	}

	.ask-page h1 {
		font-size: 1.75rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.subtitle {
		color: var(--text-secondary);
		margin-bottom: 2rem;
	}

	.error-message {
		background-color: #fef2f2;
		border: 1px solid #fecaca;
		color: var(--error-color);
		padding: 0.75rem;
		border-radius: 3px;
		margin-bottom: 1rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.help-text {
		font-size: 0.85rem;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--border-color);
		border-radius: 3px;
		font-size: 1rem;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--secondary-color);
		box-shadow: 0 0 0 3px rgba(0, 119, 204, 0.1);
	}

	textarea {
		resize: vertical;
	}
</style>
