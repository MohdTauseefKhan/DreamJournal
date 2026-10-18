
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Moon,
  ArrowLeft,
  Sparkles,
  Save,
  CloudMoon,
} from "lucide-react";
import { createDream } from "../services/dreamService";

export default function NewDream() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dreamDate, setDreamDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [mood, setMood] = useState("Peaceful");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const dreamData = {
      title: title.trim(),
      description: description.trim(),
      dreamDate,
      mood,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      await createDream(dreamData);
      navigate("/dashboard");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError(
          err.response?.data?.detail ||
          err.response?.data?.message ||
          "Unable to save your dream. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="new-dream-page">
      <header className="new-dream-header">
        <Link to="/" className="brand">
          <span className="brand-icon">
            <Moon size={22} />
          </span>
          <span>Dreamscape</span>
        </Link>

        <Link to="/dashboard" className="back-dashboard">
          <ArrowLeft size={16} />
          Back to journal
        </Link>
      </header>

      <section className="new-dream-content">
        <div className="new-dream-heading">
          <div className="new-dream-icon">
            <CloudMoon size={26} />
          </div>

          <p className="new-dream-eyebrow">
            <Sparkles size={13} />
            CAPTURE THE UNFORGETTABLE
          </p>

          <h1>A dream worth remembering.</h1>

          <p>
            Take a moment, close your eyes, and write down
            whatever remains from your journey last night.
          </p>
        </div>

        <form className="dream-form" onSubmit={handleSubmit}>
          <label htmlFor="dream-title">Dream title</label>
          <input
            id="dream-title"
            type="text"
            placeholder="Give your dream a name..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={150}
            required
          />

          <label htmlFor="dream-description">
            Tell your story
          </label>
          <textarea
            id="dream-description"
            placeholder="Where were you? Who was there? What happened? How did it feel?"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            rows={7}
            required
          />

          <div className="dream-form-row">
            <div>
              <label htmlFor="dream-date">
                When did you dream it?
              </label>
              <input
                id="dream-date"
                type="date"
                value={dreamDate}
                onChange={(event) =>
                  setDreamDate(event.target.value)
                }
                required
              />
            </div>

            <div>
              <label htmlFor="dream-mood">
                How did it feel?
              </label>
              <select
                id="dream-mood"
                value={mood}
                onChange={(event) => setMood(event.target.value)}
              >
                <option>Peaceful</option>
                <option>Happy</option>
                <option>Exciting</option>
                <option>Mysterious</option>
                <option>Confusing</option>
                <option>Scary</option>
                <option>Sad</option>
                <option>Strange</option>
              </select>
            </div>
          </div>

          <label htmlFor="dream-tags">Tags (optional)</label>
          <input
            id="dream-tags"
            type="text"
            placeholder="flying, ocean, family — separate with commas"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <div className="dream-form-footer">
            <p>
              Your dreams are personal. Give each memory its space.
            </p>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              <Save size={17} />
              {loading ? "Saving dream..." : "Save my dream"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
