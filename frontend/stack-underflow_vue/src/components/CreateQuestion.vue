<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";
import { createQuestion } from "@/api/questions";
import type { ApiError } from "@/api/types";

const router = useRouter();
const { t } = useI18n();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const title = ref("");
const description = ref("");
const error = ref<string | null>(null);
const isSubmitting = ref(false);

const handleSubmit = async () => {
  error.value = null;

  if (!user.value) {
    error.value = t("createQuestion.error.notLoggedIn");
    return;
  }

  isSubmitting.value = true;

  try {
    await createQuestion({
      title: title.value,
      description: description.value,
      userId: user.value.id,
      username: user.value.username,
    });
    router.push("/");
  } catch (err: unknown) {
    const apiError = err as ApiError;
    const errorMessages: Record<string, string> = {
      TITLE_REQUIRED: t("createQuestion.error.titleRequired"),
      TITLE_TOO_SHORT: t("createQuestion.error.titleTooShort"),
      TITLE_TOO_LONG: t("createQuestion.error.titleTooLong"),
      DESCRIPTION_REQUIRED: t("createQuestion.error.descriptionRequired"),
      DESCRIPTION_TOO_SHORT: t("createQuestion.error.descriptionTooShort"),
      DESCRIPTION_TOO_LONG: t("createQuestion.error.descriptionTooLong"),
    };

    error.value = errorMessages[apiError.code] || apiError.message;

    console.error("[CreateQuestion] Error:", {
      code: apiError.code,
      message: apiError.message,
      details: apiError.details,
      timestamp: new Date().toISOString(),
    });
  } finally {
    isSubmitting.value = false;
  }
};

const handleCancel = () => {
  router.push("/");
};
</script>

<template>
  <div class="create-question">
    <div class="create-question-card">
      <h1>{{ t("createQuestion.title") }}</h1>
      <div v-if="error" class="error-message" role="alert">
        {{ error }}
      </div>
      <form @submit.prevent="handleSubmit" class="question-form">
        <div class="form-group">
          <label for="title">{{ t("createQuestion.titleLabel") }}</label>
          <input
            id="title"
            type="text"
            v-model="title"
            :placeholder="t('createQuestion.titlePlaceholder')"
            :disabled="isSubmitting"
            required
          />
          <small class="form-hint">
            {{ t("createQuestion.titleHint") }}
          </small>
        </div>
        <div class="form-group">
          <label for="description">{{ t("createQuestion.descriptionLabel") }}</label>
          <textarea
            id="description"
            v-model="description"
            :placeholder="t('createQuestion.descriptionPlaceholder')"
            rows="6"
            :disabled="isSubmitting"
            required
          />
          <small class="form-hint">
            {{ t("createQuestion.descriptionHint") }}
          </small>
        </div>
        <div class="form-actions">
          <button
            type="submit"
            class="btn-primary"
            :disabled="isSubmitting"
          >
            <template v-if="isSubmitting">
              {{ t("createQuestion.submitting") }}
            </template>
            <template v-else>
              {{ t("createQuestion.postQuestion") }}
            </template>
          </button>
          <button
            type="button"
            @click="handleCancel"
            class="btn-secondary"
            :disabled="isSubmitting"
          >
            {{ t("createQuestion.cancel") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
