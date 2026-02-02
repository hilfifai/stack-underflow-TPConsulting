import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "#src/store/AuthContext";
import { useTranslation } from "react-i18next";

export function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError(t("signup.errors.usernameRequired"));
      return;
    }

    if (!password.trim()) {
      setError(t("signup.errors.passwordRequired"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("signup.errors.passwordsNotMatch"));
      return;
    }

    const success = signup(username, password);
    if (success) {
      navigate("/");
    } else {
      setError(t("signup.errors.usernameExists"));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">{t("signup.title")}</h1>
        <p className="login-subtitle">{t("signup.subtitle")}</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">{t("signup.usernameLabel")}</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t("signup.usernamePlaceholder")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t("signup.passwordLabel")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("signup.passwordPlaceholder")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">{t("signup.confirmPasswordLabel")}</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t("signup.confirmPasswordPlaceholder")}
              required
            />
          </div>
          <button type="submit" className="login-button">
            {t("signup.signupButton")}
          </button>
        </form>
        <p className="login-note">
          {t("signup.alreadyHaveAccount")}{" "}
          <Link to="/login" className="link">
            {t("signup.loginHere")}
          </Link>
        </p>
      </div>
    </div>
  );
}
