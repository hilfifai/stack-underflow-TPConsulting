<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

const router = useRouter();
const { t, locale } = useI18n();
const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);
const { logout } = authStore;

const changeLanguage = (lng: string) => {
  locale.value = lng;
};

const handleLogout = () => {
  logout();
  router.push("/");
};
</script>

<template>
  <header class="header">
    <div class="header-content">
      <router-link to="/" class="logo">
        {{ t("header.logo") }}
      </router-link>
      <nav class="nav">
        <router-link to="/" class="nav-link">
          {{ t("header.questions") }}
        </router-link>
        <router-link v-if="isAuthenticated" to="/questions/new" class="nav-link">
          {{ t("header.askQuestion") }}
        </router-link>
      </nav>
      <div class="user-menu">
        <div class="language-switcher">
          <button
            @click="changeLanguage('en')"
            :class="['lang-btn', { active: locale === 'en' }]"
          >
            EN
          </button>
          <button
            @click="changeLanguage('id')"
            :class="['lang-btn', { active: locale === 'id' }]"
          >
            ID
          </button>
        </div>
        <template v-if="isAuthenticated">
          <span class="username">{{ user?.username }}</span>
          <button @click="handleLogout" class="btn-logout">
            {{ t("header.logout") }}
          </button>
        </template>
        <template v-else>
          <div class="auth-buttons">
            <router-link to="/login" class="btn-login">
              {{ t("header.login") }}
            </router-link>
            <router-link to="/signup" class="btn-signup">
              {{ t("header.signup") }}
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>
