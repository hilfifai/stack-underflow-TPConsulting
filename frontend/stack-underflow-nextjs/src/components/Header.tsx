"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { t, type Locale } from "@/i18n";

export default function Header({ locale = "en" }: { locale?: Locale }) {
  const { user, logout, loading } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo">
          StackUnderflow
        </Link>
        
        <nav className="nav">
          <Link href="/" className="nav-link">
            {t("nav.home", locale)}
          </Link>
          
          {loading ? (
            <span className="nav-link">{t("common.loading", locale)}</span>
          ) : user ? (
            <>
              <Link href="/questions/create" className="nav-link">
                {t("nav.create_question", locale)}
              </Link>
              <span className="nav-username">{user.username}</span>
              <button onClick={() => logout()} className="nav-link btn-logout">
                {t("nav.logout", locale)}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link">
                {t("nav.login", locale)}
              </Link>
              <Link href="/signup" className="nav-link btn-signup">
                {t("nav.signup", locale)}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
