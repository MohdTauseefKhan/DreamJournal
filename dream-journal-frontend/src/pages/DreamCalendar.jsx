
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Moon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getDreams } from "../services/dreamService";

export default function DreamCalendar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");
  });

  const loadDreams = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getDreams();
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

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateKey = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const dreamsByDate = dreams.reduce((grouped, dream) => {
    if (dream.dreamDate) {
      if (!grouped[dream.dreamDate]) grouped[dream.dreamDate] = [];
      grouped[dream.dreamDate].push(dream);
    }
    return grouped;
  }, {});

  const selectedDreams = dreamsByDate[selectedDate] || [];

  const changeMonth = (amount) => {
    setCurrentMonth(new Date(year, month + amount, 1));
  };

  const formatSelectedDate = () => {
    const [selectedYear, selectedMonth, selectedDay] = selectedDate
      .split("-")
      .map(Number);

    return new Date(selectedYear, selectedMonth - 1, selectedDay)
      .toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
  };

  const today = new Date();
  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <main className="calendar-page">
      <header className="calendar-header">
        <Link to="/" className="brand">
          <span className="brand-icon"><Moon size={22} /></span>
          <span>Dreamscape</span>
        </Link>

        <Link to="/dashboard" className="back-dashboard">
          <ArrowLeft size={16} />
          Back to journal
        </Link>
      </header>

      <section className="calendar-content">
        <div className="calendar-heading">
          <p className="calendar-eyebrow">
            <Sparkles size={14} />
            YOUR DREAM TIMELINE
          </p>
          <h1>Dream calendar</h1>
          <p>Every date holds a memory. Explore the dreams you've recorded.</p>
        </div>

        {error && (
          <div className="calendar-message" role="alert">
            <p>{error}</p>
            <button className="secondary-button" onClick={loadDreams}>
              Try again
            </button>
          </div>
        )}

        <div className="calendar-layout">
          <section className="calendar-panel">
            <div className="calendar-month-header">
              <div>
                <p className="calendar-small-label">EXPLORE YOUR MEMORIES</p>
                <h2>
                  {currentMonth.toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
              </div>

              <div className="calendar-navigation">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  aria-label="Previous month"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  aria-label="Next month"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="calendar-loading">
                <Moon size={28} />
                <p>Gathering your dreams...</p>
              </div>
            ) : (
              <>
                <div className="calendar-grid calendar-weekdays">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div key={day}>{day}</div>
                    )
                  )}
                </div>

                <div className="calendar-grid calendar-days">
                  {Array.from({ length: firstWeekday }, (_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="calendar-day calendar-day-empty"
                    />
                  ))}

                  {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const key = dateKey(day);
                    const hasDreams = Boolean(dreamsByDate[key]?.length);
                    const isSelected = selectedDate === key;
                    const isToday = todayKey === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        className={[
                          "calendar-day",
                          isSelected ? "selected" : "",
                          isToday ? "today" : "",
                          hasDreams ? "has-dreams" : "",
                        ].filter(Boolean).join(" ")}
                        onClick={() => setSelectedDate(key)}
                        aria-label={`${day}${hasDreams ? ", dreams recorded" : ""}`}
                        aria-pressed={isSelected}
                      >
                        <span>{day}</span>
                        {hasDreams && (
                          <span className="calendar-dream-dot" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="calendar-legend">
                  <span className="calendar-dream-dot" />
                  <span>Dream recorded</span>
                </div>
              </>
            )}
          </section>

          <section className="calendar-selected-panel">
            <div className="selected-date-heading">
              <div className="selected-date-icon">
                <CalendarDays size={22} />
              </div>
              <div>
                <p className="calendar-small-label">YOUR MEMORIES</p>
                <h2>{formatSelectedDate()}</h2>
              </div>
            </div>

            {loading ? (
              <p className="calendar-empty-text">Loading your memories...</p>
            ) : selectedDreams.length > 0 ? (
              <div className="calendar-dream-list">
                {selectedDreams.map((dream) => (
                  <article className="calendar-dream-card" key={dream.id}>
                    <div className="calendar-dream-card-icon">
                      <Moon size={19} />
                    </div>
                    <h3>{dream.title}</h3>
                    <p>{dream.description}</p>
                    <div className="calendar-dream-meta">
                      <span><Clock size={14} />{dream.mood}</span>
                    </div>
                    {dream.tags?.length > 0 && (
                      <div className="calendar-dream-tags">
                        {dream.tags.map((tag, index) => (
                          <span key={`${tag}-${index}`}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="calendar-empty">
                <Moon size={30} />
                <h3>No dreams on this date</h3>
                <p>Select another date or record a new dream to keep your memories alive.</p>
                <Link to="/dreams/new" className="secondary-button">
                  Record a dream
                </Link>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
