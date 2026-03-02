import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/store/auth";

import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import CreateQuestionPage from "@/pages/CreateQuestionPage.vue";
import QuestionDetailPage from "@/pages/QuestionDetailPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/questions/:id",
      name: "question-detail",
      component: QuestionDetailPage,
    },
    {
      path: "/questions/new",
      name: "create-question",
      component: CreateQuestionPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: { guestOnly: true },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupPage,
      meta: { guestOnly: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: "login" });
  } else if (to.meta.guestOnly && isAuthenticated.value) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
