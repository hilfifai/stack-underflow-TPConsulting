import { Link } from "react-router-dom";
import { useAuth } from "#src/store/AuthContext";

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          Stack Underflow
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">
            Questions
          </Link>
          {isAuthenticated && (
            <Link to="/questions/new" className="nav-link">
              Ask Question
            </Link>
          )}
        </nav>
        <div className="user-menu">
          {isAuthenticated ? (
            <>
              <span className="username">{user?.username}</span>
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <span className="guest">Guest</span>
          )}
        </div>
      </div>
    </header>
  );
}
