import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "#src/store/AuthContext";
import { Header } from "#src/components/Header";
import { HomePage } from "#src/pages/HomePage";
import { LoginPage } from "#src/pages/LoginPage";
import { SignupPage } from "#src/pages/SignupPage";
import { CreateQuestionPage } from "#src/pages/CreateQuestionPage";
import { QuestionDetailPage } from "#src/pages/QuestionDetailPage";

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/questions/:id" element={<QuestionDetailPage />} />
          <Route
            path="/questions/new"
            element={
              isAuthenticated ? (
                <CreateQuestionPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
