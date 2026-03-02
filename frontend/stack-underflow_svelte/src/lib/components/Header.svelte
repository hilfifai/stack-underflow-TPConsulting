<script lang="ts">
	import { auth, isAuthenticated, currentUser } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		auth.init();
	});

	function handleLogout() {
		auth.logout();
		goto('/login');
	}
</script>

<header class="header">
	<div class="container header-content">
		<a href="/" class="logo">
			<span class="logo-icon">S</span>
			<span class="logo-text">Stack Underflow</span>
		</a>

		<nav class="nav">
			<a href="/" class="nav-link">Questions</a>
			{#if $isAuthenticated}
				<a href="/questions/ask" class="nav-link">Ask Question</a>
				<div class="user-menu">
					<span class="username">{$currentUser?.username}</span>
					<button class="btn btn-outline" on:click={handleLogout}>Logout</button>
				</div>
			{:else}
				<a href="/login" class="btn btn-primary">Log In</a>
				<a href="/register" class="btn btn-secondary">Sign Up</a>
			{/if}
		</nav>
	</div>
</header>

<style>
	.header {
		background-color: var(--card-background);
		border-bottom: 1px solid var(--border-color);
		padding: 0.75rem 0;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
	}

	.logo-icon {
		width: 2rem;
		height: 2rem;
		background-color: var(--primary-color);
		color: white;
		border-radius: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		font-size: 1.2rem;
	}

	.logo-text {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-color);
	}

	.nav {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.nav-link {
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.9rem;
	}

	.nav-link:hover {
		color: var(--text-color);
	}

	.user-menu {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.username {
		font-weight: 500;
		color: var(--text-color);
	}
</style>
