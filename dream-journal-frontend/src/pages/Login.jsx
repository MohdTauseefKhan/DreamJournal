
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to log in. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <Link to="/" className="brand auth-brand">
        <span className="brand-icon">
          <Moon size={22} />
        </span>
        <span>Dreamscape</span>
      </Link>

      <section className="auth-card">
        <div className="auth-icon">
          <Sparkles size={25} />
        </div>

        <p className="auth-eyebrow">WELCOME BACK, DREAMER</p>

        <h1>Return to your universe.</h1>

        <p className="auth-description">
          Your dreams are waiting right where you left them.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="primary-button auth-submit"
            disabled={loading}
          >
            {loading ? "Entering your universe..." : "Log in"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="auth-switch">
          New to Dreamscape? <Link to="/register">Create an account</Link>
        </p>

        <Link to="/" className="back-home">
          Back to home
        </Link>
      </section>
    </main>
  );
}
