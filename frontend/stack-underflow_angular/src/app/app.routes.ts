import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home-page/home-page.component').then(m => m.HomePageComponent),
  },
  {
    path: 'questions/:id',
    loadComponent: () => import('./pages/question-detail-page/question-detail-page.component').then(m => m.QuestionDetailPageComponent),
  },
  {
    path: 'questions/new',
    loadComponent: () => import('./pages/create-question-page/create-question-page.component').then(m => m.CreateQuestionPageComponent),
    data: { requiresAuth: true },
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent),
    data: { guestOnly: true },
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup-page/signup-page.component').then(m => m.SignupPageComponent),
    data: { guestOnly: true },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
