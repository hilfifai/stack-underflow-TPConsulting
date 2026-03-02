"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { t, type Locale } from "@/i18n";

interface SignupProps {
  locale?: Locale;
}

export default function Signup({ locale = "en" }: SignupProps) {
  const router = useRouter();
  const { signup, error, clearError, loading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      await signup(username, password);
      router.push("/");
    } catch (err) {
      // Error is handled by context
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{t("auth.signup", locale)}</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">{t("auth.username", locale)}</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">{t("auth.password", locale)}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? t("common.loading", locale) : t("auth.signup", locale)}
          </button>
        </form>
        
        <p className="auth-switch">
          {t("auth.has_account", locale)}{" "}
          <Link href="/login">{t("nav.login", locale)}</Link>
        </p>
      </div>
    </div>
  );
}
