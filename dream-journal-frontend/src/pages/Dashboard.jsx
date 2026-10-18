
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Moon,
  Sparkles,
  Plus,
  Search,
  BookOpen,
  CalendarDays,
  LogOut,
  Clock,
  Tag,
  Trash2,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {
  getDreams,
  deleteDream,
  updateDream,
} from "../services/dreamService";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingDream, setEditingDream] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    dreamDate: "",
    mood: "Peaceful",
    tags: "",
  });

  const loadDreams = useCallback(async (query = "") => {
    setLoading(true);
    setError("");

    try {
      const data = await getDreams(query);
      setDreams(data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }

      setError("Unable to load your dreams. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => {
    loadDreams();
  }, [loadDreams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDreams(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, loadDreams]);

  const openEditForm = (dream) => {
    setEditingDream(dream);

    setForm({
      title: dream.title || "",
      description: dream.description || "",
      dreamDate: dream.dreamDate || "",
      mood: dream.mood || "Peaceful",
      tags: (dream.tags || []).join(", "),
    });

    setError("");
  };

  const closeEditForm = () => {
    setEditingDream(null);
    setSaving(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!editingDream) return;

    setSaving(true);
    setError("");

    const dreamData = {
      title: form.title.trim(),
      description: form.description.trim(),
      dreamDate: form.dreamDate,
      mood: form.mood,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    try {
      await updateDream(editingDream.id, dreamData);
      closeEditForm();
      await loadDreams(search);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }

      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Unable to update this dream. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this dream?"
    );

    if (!confirmed) return;

    try {
      await deleteDream(id);
      setDreams((current) => current.filter((dream) => dream.id !== id));
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/login", { replace: true });
        return;
      }

      setError("Unable to delete this dream. Please try again.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatDate = (date) => {
    if (!date) return "Date not specified";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <Link to="/" className="brand">
          <span className="brand-icon"><Moon size={22} /></span>
          <span>Dreamscape</span>
        </Link>

        <p className="sidebar-label">YOUR SPACE</p>

        <div className="sidebar-item active">
          <BookOpen size={18} />
          <span>My dream journal</span>
        </div>

        <Link to="/dream-calendar" className="sidebar-item">
          <CalendarDays size={18} />
          <span>Dream calendar</span>
        </Link>

        <div className="sidebar-bottom">
          <button
            className="sidebar-item logout-button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">
              <Sparkles size={14} /> YOUR PERSONAL UNIVERSE
            </p>
            <h1>Your dream journal</h1>
            <p className="dashboard-subtitle">
              Every dream has a story. Let's remember yours.
            </p>
          </div>

          <Link to="/dreams/new" className="primary-button">
            <Plus size={18} /> Write a dream
          </Link>
        </header>

        <div className="dashboard-welcome">
          <div>
            <span className="welcome-label">A LITTLE REMINDER</span>
            <h2>Your imagination has no limits.</h2>
            <p>
              Remember a dream from last night? Save it before the little
              details fade away.
            </p>
          </div>

          <div className="welcome-moon">
            <Moon size={65} strokeWidth={1} />
            <Sparkles size={19} />
          </div>
        </div>

        <div className="dream-list-header">
          <div>
            <h2>Your dreams ({dreams.length})</h2>
            <p>Your personal collection of nighttime stories.</p>
          </div>

          <label className="dream-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search your dreams..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        {loading ? (
          <div className="empty-dreams">
            <Moon size={30} />
            <h3>Gathering your dreams...</h3>
            <p>Your personal universe is loading.</p>
          </div>
        ) : error && !editingDream ? (
          <div className="empty-dreams">
            <h3>Something went wrong</h3>
            <p>{error}</p>
            <button
              className="secondary-button"
              onClick={() => loadDreams(search)}
            >
              Try again
            </button>
          </div>
        ) : dreams.length > 0 ? (
          <div className="dream-cards">
            {dreams.map((dream) => (
              <article className="dream-card" key={dream.id}>
                <div className="dream-card-top">
                  <div className="dream-card-icon">
                    <Moon size={21} />
                  </div>

                  <div className="dream-card-actions">
                    <button
                      type="button"
                      className="edit-dream-button"
                      onClick={() => openEditForm(dream)}
                      aria-label={`Edit ${dream.title}`}
                      title="Edit dream"
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      className="delete-dream-button"
                      onClick={() => handleDelete(dream.id)}
                      aria-label={`Delete ${dream.title}`}
                      title="Delete dream"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                <h3>{dream.title}</h3>
                <p className="dream-card-description">
                  {dream.description}
                </p>

                <div className="dream-card-meta">
                  <span>
                    <CalendarDays size={14} />
                    {formatDate(dream.dreamDate)}
                  </span>
                  <span>
                    <Clock size={14} />
                    {dream.mood}
                  </span>
                </div>

                {dream.tags?.length > 0 && (
                  <div className="dream-card-tags">
                    <Tag size={14} />
                    {dream.tags.map((tag, index) => (
                      <span key={`${tag}-${index}`}>{tag}</span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-dreams">
            <div className="empty-dream-icon">
              <Moon size={34} />
              <Sparkles size={16} />
            </div>

            <h3>{search ? "No dreams found" : "Your story begins tonight"}</h3>
            <p>
              {search
                ? "Try another search term to find your dream."
                : "Your dream journal is waiting for its first entry. Capture a dream and keep its magic alive."}
            </p>

            {!search && (
              <Link to="/dreams/new" className="secondary-button">
                <Plus size={17} /> Write your first dream
              </Link>
            )}
          </div>
        )}
      </section>

      {editingDream && (
        <div className="dream-edit-overlay">
          <section
            className="dream-edit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-dream-heading"
          >
            <div className="dream-edit-header">
              <div>
                <p className="new-dream-eyebrow">
                  <Sparkles size={13} /> UPDATE YOUR MEMORY
                </p>
                <h2 id="edit-dream-heading">Edit your dream</h2>
              </div>

              <button
                type="button"
                className="dream-edit-close"
                onClick={closeEditForm}
                aria-label="Close edit form"
              >
                <X size={20} />
              </button>
            </div>

            <form className="dream-form" onSubmit={handleUpdate}>
              <label htmlFor="edit-dream-title">Dream title</label>
              <input
                id="edit-dream-title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleFormChange}
                maxLength={150}
                required
              />

              <label htmlFor="edit-dream-description">Tell your story</label>
              <textarea
                id="edit-dream-description"
                name="description"
                value={form.description}
                onChange={handleFormChange}
                rows={6}
                required
              />

              <div className="dream-form-row">
                <div>
                  <label htmlFor="edit-dream-date">Dream date</label>
                  <input
                    id="edit-dream-date"
                    name="dreamDate"
                    type="date"
                    value={form.dreamDate}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="edit-dream-mood">Mood</label>
                  <select
                    id="edit-dream-mood"
                    name="mood"
                    value={form.mood}
                    onChange={handleFormChange}
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

              <label htmlFor="edit-dream-tags">Tags (optional)</label>
              <input
                id="edit-dream-tags"
                name="tags"
                type="text"
                placeholder="flying, ocean, family"
                value={form.tags}
                onChange={handleFormChange}
              />

              {error && (
                <p className="auth-error" role="alert">{error}</p>
              )}

              <div className="dream-edit-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeEditForm}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  <Save size={17} />
                  {saving ? "Saving changes..." : "Save changes"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}
