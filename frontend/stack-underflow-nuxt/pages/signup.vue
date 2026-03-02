<script setup lang="ts">
const { signup, error: authError, loading } = useAuth();
const username = ref("");
const password = ref("");
const router = useRouter();

const handleSubmit = async () => {
  try {
    await signup(username.value, password.value);
    router.push("/");
  } catch (err) {
    // Error handled by auth composable
  }
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Signup</h1>
      
      <div v-if="authError" class="error-message">{{ authError }}</div>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required :disabled="loading" />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required :disabled="loading" />
        </div>
        
        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? "Loading..." : "Signup" }}
        </button>
      </form>
      
      <p class="auth-switch">
        Already have an account? <NuxtLink to="/login">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>
