<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { dataStore } from "@/store/dataStore";
import { formatDate } from "@/utils/formatDate";
import type { Question, QuestionStatus } from "@/types";

const { t } = useI18n();
const searchQuery = ref("");
const statusFilter = ref<QuestionStatus | "all">("all");
const currentPage = ref(1);
const searchInputRef = ref<HTMLInputElement | null>(null);

const ITEMS_PER_PAGE = 10;

// Initialize search input on mount
onMounted(() => {
  if (searchInputRef.value) {
    searchInputRef.value.focus();
  }
});

// Reset to page 1 when search query or status filter changes
watch([searchQuery, statusFilter], () => {
  currentPage.value = 1;
});

const allQuestions = computed(() => dataStore.getQuestions());

// Filter questions based on search query and status
const filteredQuestions = computed(() => {
  let questions = searchQuery.value
    ? dataStore.searchQuestions(searchQuery.value)
    : allQuestions.value;

  if (statusFilter.value !== "all") {
    questions = questions.filter((q) => q.status === statusFilter.value);
  }

  return questions;
});

// Calculate pagination
const totalQuestions = computed(() => filteredQuestions.value.length);
const totalPages = computed(() => Math.ceil(totalQuestions.value / ITEMS_PER_PAGE));
const startIndex = computed(() => (currentPage.value - 1) * ITEMS_PER_PAGE);
const endIndex = computed(() => startIndex.value + ITEMS_PER_PAGE);
const displayedQuestions = computed(() =>
  filteredQuestions.value.slice(startIndex.value, endIndex.value)
);

const handlePageChange = (page: number) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "open":
      return "status-open";
    case "answered":
      return "status-answered";
    case "closed":
      return "status-closed";
    default:
      return "";
  }
};

const clearSearch = () => {
  searchQuery.value = "";
};
</script>

<template>
  <div class="question-list">
    <div class="question-list-header">
      <h2>{{ t("questionList.title") }}</h2>
      <router-link to="/questions/new" class="btn-primary">
        {{ t("questionList.askQuestion") }}
      </router-link>
    </div>

    <!-- Search Bar -->
    <div class="search-bar">
      <input
        type="text"
        :placeholder="t('questionList.searchPlaceholder')"
        v-model="searchQuery"
        class="search-input"
        ref="searchInputRef"
      />
      <button v-if="searchQuery" @click="clearSearch" class="search-clear">
        ✕
      </button>
    </div>

    <!-- Status Filter -->
    <div class="status-filter">
      <button
        @click="statusFilter = 'all'"
        :class="['filter-btn', { active: statusFilter === 'all' }]"
      >
        {{ t("questionList.filterAll") }}
      </button>
      <button
        @click="statusFilter = 'open'"
        :class="['filter-btn', { active: statusFilter === 'open' }]"
      >
        {{ t("questionDetail.status.open") }}
      </button>
      <button
        @click="statusFilter = 'answered'"
        :class="['filter-btn', { active: statusFilter === 'answered' }]"
      >
        {{ t("questionDetail.status.answered") }}
      </button>
      <button
        @click="statusFilter = 'closed'"
        :class="['filter-btn', { active: statusFilter === 'closed' }]"
      >
        {{ t("questionDetail.status.closed") }}
      </button>
    </div>

    <!-- Results count -->
    <div v-if="searchQuery || statusFilter !== 'all'" class="search-results-count">
      <template v-if="searchQuery && statusFilter !== 'all'">
        {{ t("questionList.searchAndFilterResults", {
          count: totalQuestions,
          query: searchQuery,
          status: t(`questionDetail.status.${statusFilter}`)
        }) }}
      </template>
      <template v-else-if="searchQuery">
        {{ t("questionList.searchResults", {
          count: totalQuestions,
          query: searchQuery
        }) }}
      </template>
      <template v-else>
        {{ t("questionList.filterResults", {
          count: totalQuestions,
          status: t(`questionDetail.status.${statusFilter}`)
        }) }}
      </template>
    </div>

    <div class="questions">
      <template v-if="displayedQuestions.length === 0">
        <p class="no-questions">
          <template v-if="searchQuery">
            {{ t("questionList.noSearchResults") }}
          </template>
          <template v-else>
            {{ t("questionList.noQuestions") }}
          </template>
        </p>
      </template>
      <template v-else>
        <router-link
          v-for="question in displayedQuestions"
          :key="question.id"
          :to="`/questions/${question.id}`"
          class="question-card"
        >
          <div class="question-header">
            <h3 class="question-title">{{ question.title }}</h3>
            <span :class="['status-badge', getStatusColor(question.status)]">
              {{ question.status }}
            </span>
          </div>
          <p class="question-description">{{ question.description }}</p>
          <div class="question-meta">
            <span class="question-author">
              {{ t("questionList.by") }} {{ question.username }}
            </span>
            <span class="question-date">
              {{ formatDate(question.createdAt, t) }}
            </span>
            <span class="question-comments">
              {{ question.comments.length }}
              {{ question.comments.length === 1 ? t("questionList.comment") : t("questionList.comments") }}
            </span>
          </div>
        </router-link>
      </template>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button
        @click="handlePageChange(currentPage - 1)"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        {{ t("questionList.previous") }}
      </button>

      <div class="pagination-numbers">
        <template v-for="page in totalPages" :key="page">
          <!-- Show first, last, current, and adjacent pages -->
          <template v-if="
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ">
            <button
              @click="handlePageChange(page)"
              :class="['pagination-number', { active: currentPage === page }]"
            >
              {{ page }}
            </button>
          </template>
          <!-- Show ellipsis for gaps -->
          <template v-else-if="
            (page === currentPage - 2 && page > 1) ||
            (page === currentPage + 2 && page < totalPages)
          ">
            <span class="pagination-ellipsis">...</span>
          </template>
        </template>
      </div>

      <button
        @click="handlePageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        {{ t("questionList.next") }}
      </button>
    </div>
  </div>
</template>
