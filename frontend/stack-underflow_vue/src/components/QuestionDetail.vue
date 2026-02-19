<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import { dataStore } from "@/store/dataStore";
import { fetchQuestionById, updateQuestion } from "@/api/questions";
import { addComment as addCommentApi, updateComment } from "@/api/comments";
import { formatDate } from "@/utils/formatDate";
import type { QuestionStatus, Question, Comment } from "@/types";
import type { ApiError } from "@/api/types";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const question = ref<Question | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Edit state
const isEditing = ref(false);
const editTitle = ref("");
const editDescription = ref("");
const editStatus = ref<QuestionStatus>("open");

// Comment state
const newComment = ref("");
const editingCommentId = ref<string | null>(null);
const editCommentContent = ref("");

// Update state
const isUpdating = ref(false);
const isAddingComment = ref(false);
const isUpdatingComment = ref(false);

const questionId = computed(() => route.params.id as string);

// Get related questions and hot network questions
const relatedQuestions = computed(() =>
  questionId.value ? dataStore.getRelatedQuestions(questionId.value, 5) : []
);

const hotNetworkQuestions = computed(() =>
  dataStore.getHotNetworkQuestions(5)
);

const canEdit = computed(() =>
  user.value && dataStore.canEditQuestion(question.value?.id || "", user.value.id)
);

// Load question
onMounted(async () => {
  try {
    question.value = await fetchQuestionById(questionId.value);
  } catch (err) {
    const apiError = err as ApiError;
    error.value = apiError.message;
  } finally {
    isLoading.value = false;
  }
});

const handleEdit = () => {
  if (!question.value) return;
  editTitle.value = question.value.title;
  editDescription.value = question.value.description;
  editStatus.value = question.value.status;
  isEditing.value = true;
  error.value = null;
};

const handleSave = async () => {
  if (!user.value || !question.value) return;

  isUpdating.value = true;

  try {
    await updateQuestion({
      id: question.value.id,
      title: editTitle.value,
      description: editDescription.value,
      status: editStatus.value,
      userId: user.value.id,
    });

    // Refresh question data
    question.value = await fetchQuestionById(questionId.value);
    isEditing.value = false;
    error.value = null;
  } catch (err: unknown) {
    const apiError = err as ApiError;
    const errorMessages: Record<string, string> = {
      TITLE_REQUIRED: t("createQuestion.error.titleRequired"),
      TITLE_TOO_SHORT: t("createQuestion.error.titleTooShort"),
      TITLE_TOO_LONG: t("createQuestion.error.titleTooLong"),
      DESCRIPTION_REQUIRED: t("createQuestion.error.descriptionRequired"),
      DESCRIPTION_TOO_SHORT: t("createQuestion.error.descriptionTooShort"),
      DESCRIPTION_TOO_LONG: t("createQuestion.error.descriptionTooLong"),
      UNAUTHORIZED: t("questionDetail.error.unauthorized"),
    };

    error.value = errorMessages[apiError.code] || apiError.message;

    console.error("[QuestionDetail] Update error:", {
      code: apiError.code,
      message: apiError.message,
      details: apiError.details,
      timestamp: new Date().toISOString(),
    });
  } finally {
    isUpdating.value = false;
  }
};

const handleCancel = () => {
  isEditing.value = false;
  error.value = null;
};

const handleAddComment = async () => {
  if (!user.value || !question.value) return;

  isAddingComment.value = true;

  try {
    await addCommentApi({
      questionId: question.value.id,
      content: newComment.value,
      userId: user.value.id,
      username: user.value.username,
    });

    // Refresh question data
    question.value = await fetchQuestionById(questionId.value);
    newComment.value = "";
    error.value = null;
  } catch (err: unknown) {
    const apiError = err as ApiError;
    const errorMessages: Record<string, string> = {
      COMMENT_REQUIRED: t("questionDetail.error.commentRequired"),
      COMMENT_TOO_SHORT: t("questionDetail.error.commentTooShort"),
      COMMENT_TOO_LONG: t("questionDetail.error.commentTooLong"),
    };

    error.value = errorMessages[apiError.code] || apiError.message;

    console.error("[QuestionDetail] Add comment error:", {
      code: apiError.code,
      message: apiError.message,
      details: apiError.details,
      timestamp: new Date().toISOString(),
    });
  } finally {
    isAddingComment.value = false;
  }
};

const handleEditComment = (commentId: string, content: string) => {
  editingCommentId.value = commentId;
  editCommentContent.value = content;
  error.value = null;
};

const handleSaveComment = async () => {
  if (!user.value || !question.value || !editingCommentId.value) return;

  isUpdatingComment.value = true;

  try {
    await updateComment({
      questionId: question.value.id,
      commentId: editingCommentId.value,
      content: editCommentContent.value,
      userId: user.value.id,
    });

    // Refresh question data
    question.value = await fetchQuestionById(questionId.value);
    editingCommentId.value = null;
    editCommentContent.value = "";
    error.value = null;
  } catch (err: unknown) {
    const apiError = err as ApiError;
    const errorMessages: Record<string, string> = {
      COMMENT_REQUIRED: t("questionDetail.error.commentRequired"),
      COMMENT_TOO_SHORT: t("questionDetail.error.commentTooShort"),
      COMMENT_TOO_LONG: t("questionDetail.error.commentTooLong"),
      UNAUTHORIZED: t("questionDetail.error.unauthorized"),
    };

    error.value = errorMessages[apiError.code] || apiError.message;

    console.error("[QuestionDetail] Update comment error:", {
      code: apiError.code,
      message: apiError.message,
      details: apiError.details,
      timestamp: new Date().toISOString(),
    });
  } finally {
    isUpdatingComment.value = false;
  }
};

const handleCancelEditComment = () => {
  editingCommentId.value = null;
  editCommentContent.value = "";
  error.value = null;
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

const canEditComment = (comment: Comment): boolean => {
  return user.value !== null && dataStore.canEditComment(comment.id, user.value.id);
};
</script>

<template>
  <div class="question-detail-layout">
    <!-- Loading state -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading question...</p>
    </div>

    <!-- Error state -->
    <template v-else-if="error && !question">
      <div class="error-container">
        <h2>Error loading question</h2>
        <p>{{ error }}</p>
        <router-link to="/" class="btn-primary">
          {{ t("questionDetail.backToQuestions") }}
        </router-link>
      </div>
    </template>

    <!-- Not found state -->
    <template v-else-if="!question">
      <div class="not-found">
        <h2>{{ t("questionDetail.notFound") }}</h2>
        <router-link to="/" class="btn-primary">
          {{ t("questionDetail.backToQuestions") }}
        </router-link>
      </div>
    </template>

    <!-- Question detail -->
    <template v-else>
      <div class="question-detail-main">
        <router-link to="/" class="back-link">
          {{ t("questionDetail.backLink") }}
        </router-link>

        <div v-if="error" class="error-message" role="alert">
          {{ error }}
        </div>

        <!-- Edit form -->
        <div v-if="isEditing" class="edit-form">
          <h2>{{ t("questionDetail.editQuestion") }}</h2>
          <div class="form-group">
            <label for="edit-title">{{ t("questionDetail.titleLabel") }}</label>
            <input
              id="edit-title"
              type="text"
              v-model="editTitle"
              :disabled="isUpdating"
            />
          </div>
          <div class="form-group">
            <label for="edit-description">{{ t("questionDetail.descriptionLabel") }}</label>
            <textarea
              id="edit-description"
              v-model="editDescription"
              rows="5"
              :disabled="isUpdating"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="edit-status">{{ t("questionDetail.statusLabel") }}</label>
            <select
              id="edit-status"
              v-model="editStatus"
              :disabled="isUpdating"
            >
              <option value="open">{{ t("questionDetail.status.open") }}</option>
              <option value="answered">{{ t("questionDetail.status.answered") }}</option>
              <option value="closed">{{ t("questionDetail.status.closed") }}</option>
            </select>
          </div>
          <div class="form-actions">
            <button
              @click="handleSave"
              class="btn-primary"
              :disabled="isUpdating"
            >
              {{ isUpdating ? t("questionDetail.saving") : t("questionDetail.save") }}
            </button>
            <button
              @click="handleCancel"
              class="btn-secondary"
              :disabled="isUpdating"
            >
              {{ t("questionDetail.cancel") }}
            </button>
          </div>
        </div>

        <!-- Question content -->
        <div v-else class="question-content">
          <div class="question-header">
            <h1 class="question-title">{{ question.title }}</h1>
            <span :class="['status-badge', getStatusColor(question.status)]">
              {{ question.status }}
            </span>
          </div>
          <p class="question-description">{{ question.description }}</p>
          <div class="question-meta">
            <span class="question-author">
              {{ t("questionDetail.askedBy") }} {{ question.username }}
            </span>
            <span class="question-date">
              {{ formatDate(question.createdAt, t) }}
            </span>
            <button v-if="canEdit" @click="handleEdit" class="btn-edit">
              {{ t("questionDetail.edit") }}
            </button>
          </div>
        </div>

        <!-- Comments section -->
        <div class="comments-section">
          <h3>{{ t("questionDetail.comments") }} ({{ question.comments.length }})</h3>

          <div v-if="user" class="add-comment">
            <textarea
              v-model="newComment"
              :placeholder="t('questionDetail.addCommentPlaceholder')"
              rows="3"
              :disabled="isAddingComment"
            ></textarea>
            <button
              @click="handleAddComment"
              class="btn-primary"
              :disabled="!newComment.trim() || isAddingComment"
            >
              {{ isAddingComment ? t("questionDetail.submitting") : t("questionDetail.addComment") }}
            </button>
          </div>

          <div class="comments-list">
            <template v-if="question.comments.length === 0">
              <p class="no-comments">{{ t("questionDetail.noComments") }}</p>
            </template>
            <template v-else>
              <div
                v-for="comment in question.comments"
                :key="comment.id"
                class="comment-card"
              >
                <!-- Edit comment form -->
                <div v-if="editingCommentId === comment.id" class="edit-comment-form">
                  <textarea
                    v-model="editCommentContent"
                    rows="3"
                    :disabled="isUpdatingComment"
                  ></textarea>
                  <div class="comment-actions">
                    <button
                      @click="handleSaveComment"
                      class="btn-primary"
                      :disabled="isUpdatingComment"
                    >
                      {{ isUpdatingComment ? t("questionDetail.saving") : t("questionDetail.save") }}
                    </button>
                    <button
                      @click="handleCancelEditComment"
                      class="btn-secondary"
                      :disabled="isUpdatingComment"
                    >
                      {{ t("questionDetail.cancel") }}
                    </button>
                  </div>
                </div>

                <!-- Comment content -->
                <template v-else>
                  <div class="comment-header">
                    <span class="comment-author">{{ comment.username }}</span>
                    <span class="comment-date">{{ formatDate(comment.createdAt, t) }}</span>
                    <button
                      v-if="canEditComment(comment)"
                      @click="handleEditComment(comment.id, comment.content)"
                      class="btn-edit-small"
                    >
                      {{ t("questionDetail.edit") }}
                    </button>
                  </div>
                  <p class="comment-content">{{ comment.content }}</p>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="question-sidebar">
        <!-- Related Questions -->
        <div v-if="relatedQuestions.length > 0" class="sidebar-section">
          <h3 class="sidebar-title">{{ t("questionDetail.relatedQuestions") }}</h3>
          <ul class="sidebar-list">
            <li v-for="q in relatedQuestions" :key="q.id" class="sidebar-item">
              <router-link :to="`/questions/${q.id}`" class="sidebar-link">
                {{ q.title }}
              </router-link>
              <div class="sidebar-item-meta">
                <span class="sidebar-comments">
                  {{ q.comments.length }}
                  {{ q.comments.length === 1 ? t("questionList.comment") : t("questionList.comments") }}
                </span>
                <span :class="['status-badge', getStatusColor(q.status), 'status-sm']">
                  {{ q.status }}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Hot Network Questions -->
        <div class="sidebar-section">
          <h3 class="sidebar-title">{{ t("questionDetail.hotNetworkQuestions") }}</h3>
          <ul class="sidebar-list">
            <li v-for="q in hotNetworkQuestions" :key="q.id" class="sidebar-item">
              <router-link :to="`/questions/${q.id}`" class="sidebar-link">
                {{ q.title }}
              </router-link>
              <div class="sidebar-item-meta">
                <span class="sidebar-comments">
                  {{ q.comments.length }}
                  {{ q.comments.length === 1 ? t("questionList.comment") : t("questionList.comments") }}
                </span>
                <span :class="['status-badge', getStatusColor(q.status), 'status-sm']">
                  {{ q.status }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </template>
  </div>
</template>
