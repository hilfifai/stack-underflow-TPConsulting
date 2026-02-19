<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const { t } = useI18n();
const authStore = useAuthStore();
const { signup } = authStore;

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const error = ref("");

const handleSubmit = () => {
  error.value = "";

  if (!username.value.trim()) {
    error.value = t("signup.errors.usernameRequired");
    return;
  }

  if (!password.value.trim()) {
    error.value = t("signup.errors.passwordRequired");
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = t("signup.errors.passwordsNotMatch");
    return;
  }

  const success = signup(username.value, password.value);
  if (success) {
    router.push("/");
  } else {
    error.value = t("signup.errors.usernameExists");
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">{{ t("signup.title") }}</h1>
      <p class="login-subtitle">{{ t("signup.subtitle") }}</p>
      <p v-if="error" class="error-message">{{ error }}</p>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="username">{{ t("signup.usernameLabel") }}</label>
          <input
            type="text"
            id="username"
            v-model="username"
            :placeholder="t('signup.usernamePlaceholder')"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">{{ t("signup.passwordLabel") }}</label>
          <input
            type="password"
            id="password"
            v-model="password"
            :placeholder="t('signup.passwordPlaceholder')"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">{{ t("signup.confirmPasswordLabel") }}</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            :placeholder="t('signup.confirmPasswordPlaceholder')"
            required
          />
        </div>
        <button type="submit" class="login-button">
          {{ t("signup.signupButton") }}
        </button>
      </form>
      <p class="login-note">
        {{ t("signup.alreadyHaveAccount") }}
        <router-link to="/login" class="link">
          {{ t("signup.loginHere") }}
        </router-link>
      </p>
    </div>
  </div>
</template>
