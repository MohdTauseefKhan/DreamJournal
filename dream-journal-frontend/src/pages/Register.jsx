
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, ArrowRight, Sparkles } from "lucide-react";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({ name, email, password });
      navigate("/login", {
        state: { message: "Account created. Please log in." },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to create your account. Please try again."
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

        <p className="auth-eyebrow">YOUR STORY STARTS HERE</p>

        <h1>Make room for wonder.</h1>

        <p className="auth-description">
          Create your personal space for every dream, feeling, and
          midnight adventure.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            type="text"
            placeholder="What should we call you?"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            maxLength={80}
            required
          />

          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="register-password">Create a password</label>
          <input
            id="register-password"
            type="password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
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
            {loading ? "Creating your space..." : "Create my journal"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>

        <Link to="/" className="back-home">
          Back to home
        </Link>
      </section>
    </main>
  );
}
