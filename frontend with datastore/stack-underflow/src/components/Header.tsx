import { Link } from "react-router-dom";
import { useAuth } from "#src/store/AuthContext";
import { useTranslation } from "react-i18next";

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          {t("header.logo")}
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">
            {t("header.questions")}
          </Link>
          {isAuthenticated && (
            <Link to="/questions/new" className="nav-link">
              {t("header.askQuestion")}
            </Link>
          )}
        </nav>
        <div className="user-menu">
          <div className="language-switcher">
            <button
              onClick={() => changeLanguage("en")}
              className={`lang-btn ${i18n.language === "en" ? "active" : ""}`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage("id")}
              className={`lang-btn ${i18n.language === "id" ? "active" : ""}`}
            >
              ID
            </button>
          </div>
          {isAuthenticated ? (
            <>
              <span className="username">{user?.username}</span>
              <button onClick={logout} className="btn-logout">
                {t("header.logout")}
              </button>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login">
                {t("header.login")}
              </Link>
              <Link to="/signup" className="btn-signup">
                {t("header.signup")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
