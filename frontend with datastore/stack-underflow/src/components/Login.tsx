import { useState } from "react";
import { useAuth } from "#src/store/AuthContext";
import { useTranslation } from "react-i18next";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username, password);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">{t("login.title")}</h1>
        <p className="login-subtitle">{t("login.subtitle")}</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">{t("login.usernameLabel")}</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t("login.usernamePlaceholder")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t("login.passwordLabel")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("login.passwordPlaceholder")}
              required
            />
          </div>
          <button type="submit" className="login-button">
            {t("login.loginButton")}
          </button>
        </form>
        <p className="login-note">
          {t("login.note")}
        </p>
      </div>
    </div>
  );
}
