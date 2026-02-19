<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const { t } = useI18n();
const authStore = useAuthStore();
const { login } = authStore;

const username = ref("");
const password = ref("");

const handleSubmit = () => {
  if (username.value.trim()) {
    login(username.value, password.value);
    router.push("/");
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">{{ t("login.title") }}</h1>
      <p class="login-subtitle">{{ t("login.subtitle") }}</p>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="username">{{ t("login.usernameLabel") }}</label>
          <input
            type="text"
            id="username"
            v-model="username"
            :placeholder="t('login.usernamePlaceholder')"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">{{ t("login.passwordLabel") }}</label>
          <input
            type="password"
            id="password"
            v-model="password"
            :placeholder="t('login.passwordPlaceholder')"
            required
          />
        </div>
        <button type="submit" class="login-button">
          {{ t("login.loginButton") }}
        </button>
      </form>
      <p class="login-note">
        {{ t("login.note") }}
      </p>
    </div>
  </div>
</template>
