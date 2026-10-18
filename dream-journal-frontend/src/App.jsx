
import { motion } from "framer-motion";
import { Moon, Sparkles, ArrowRight, Stars } from "lucide-react";
import { Link } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <main className="dream-page">
      <nav className="navbar">
        <Link className="brand" to="/">
          <span className="brand-icon">
            <Moon size={22} />
          </span>
          <span>Dreamscape</span>
        </Link>

        <div className="nav-links">
          <a href="#discover">Discover</a>
          <a href="#about">Our story</a>
        </div>

        <Link to="/login" className="login-button">
          Log in
        </Link>
      </nav>

      <section className="hero" id="discover">
        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={15} />
            YOUR PERSONAL DREAM JOURNAL
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Some dreams
            <br />
            are too beautiful
            <br />
            <span>to forget.</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A quiet place for the worlds you visit while
            you sleep. Capture your dreams, explore your
            emotions, and discover the stories within.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/register" className="primary-button">
              Begin your journey
              <ArrowRight size={18} />
            </Link>

            <span className="free-note">
              Your dream world awaits
            </span>
          </motion.div>

          <div className="hero-note">
            <Stars size={16} />
            <span>Every night holds a story.</span>
          </div>
        </div>

        <motion.div
          className="dream-art"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="moon-glow">
            <div className="moon-disc">
              <div className="moon-crater crater-one" />
              <div className="moon-crater crater-two" />
              <div className="moon-crater crater-three" />
            </div>
          </div>

          <span className="star star-one">✦</span>
          <span className="star star-two">✧</span>
          <span className="star star-three">✦</span>
          <span className="star star-four">✧</span>
          <span className="star star-five">·</span>
          <span className="star star-six">✦</span>

          <div className="floating-card">
            <span className="card-label">TONIGHT'S THOUGHT</span>
            <p>
              Somewhere between
              <br />
              the stars and silence...
            </p>
            <span className="card-footer">
              <Moon size={13} /> A dream waiting to be written
            </span>
          </div>

          <div className="art-caption">
            <span className="caption-dot" />
            A universe within you
          </div>
        </motion.div>
      </section>

      <footer className="page-footer" id="about">
        <span>MADE FOR THE DREAMERS</span>
        <span>Close your eyes. Open a new world.</span>
      </footer>
    </main>
  );
}
