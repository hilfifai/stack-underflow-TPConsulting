<script setup lang="ts">
import type { Question } from "~/types";

const questions = ref<Question[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await $fetch<Question[]>("/api/questions");
    questions.value = response;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to load questions";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="home-page">
    <h1>Questions</h1>
    
    <div v-if="loading">Loading...</div>
    
    <div v-else-if="error" class="error-message">{{ error }}</div>
    
    <div v-else class="question-list">
      <div v-for="question in questions" :key="question.id" class="question-card">
        <NuxtLink :to="`/questions/${question.id}`" class="question-link">
          <h2 class="question-title">{{ question.title }}</h2>
        </NuxtLink>
        
        <p class="question-description">
          {{ question.description.length > 150 ? question.description.substring(0, 150) + "..." : question.description }}
        </p>
        
        <div class="question-meta">
          <span :class="`status-badge status-${question.status}`">{{ question.status }}</span>
          <span>Asked by {{ question.username }}</span>
        </div>
      </div>
      
      <div v-if="questions.length === 0" class="empty-state">
        <p>No questions yet. Be the first to ask!</p>
      </div>
    </div>
  </div>
</template>
