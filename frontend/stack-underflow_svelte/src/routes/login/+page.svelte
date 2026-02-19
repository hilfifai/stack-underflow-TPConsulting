<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { login } from '$lib/services/auth';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let error = $state<string | null>(null);
	let loading = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = null;
		loading = true;

		try {
			const response = await login({ email, password });
			auth.login(response.token, response.user);
			goto('/');
		} catch (e) {
			error = e instanceof Error ? e.message : 'Login failed';
		} finally {
			loading = false;
		}
	}
</script>

<div class="container auth-container">
	<div class="auth-card">
		<h1>Log In</h1>
		<p class="auth-subtitle">Log in to your Stack Underflow account</p>

		{#if error}
			<div class="error-message">{error}</div>
		{/if}

		<form onsubmit={handleSubmit}>
			<div class="form-group">
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="Enter your email"
					required
				/>
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					placeholder="Enter your password"
					required
				/>
			</div>

			<button type="submit" class="btn btn-primary btn-full" disabled={loading}>
				{loading ? 'Logging in...' : 'Log In'}
			</button>
		</form>

		<p class="auth-footer">
			Don't have an account? <a href="/register">Sign up</a>
		</p>
	</div>
</div>

<style>
	.auth-container {
		display: flex;
		justify-content: center;
		padding-top: 2rem;
	}

	.auth-card {
		background-color: var(--card-background);
		border: 1px solid var(--border-color);
		border-radius: 5px;
		padding: 2rem;
		width: 100%;
		max-width: 400px;
	}

	.auth-card h1 {
		font-size: 1.5rem;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.auth-subtitle {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
	}

	.auth-card .error-message {
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
		gap: 1rem;
	}

	.btn-full {
		width: 100%;
		padding: 0.75rem;
		font-size: 1rem;
	}

	.auth-footer {
		text-align: center;
		margin-top: 1.5rem;
		color: var(--text-secondary);
	}

	.auth-footer a {
		color: var(--secondary-color);
	}
</style>
