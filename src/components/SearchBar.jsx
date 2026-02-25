import { useState } from "react";

const languages = [
  "javascript", "python", "java", "typescript",
  "go", "rust", "cpp", "php", "ruby", "swift",
];

const labels = [
  "good first issue",
  "beginner friendly",
  "easy",
  "help wanted",
  "documentation",
  "bug",
];

const sortOptions = [
  { value: "created",  label: "Newest"         },
  { value: "updated",  label: "Recently Updated"},
  { value: "comments", label: "Most Discussed"  },
];

function SearchBar({ onSearch, loading }) {
  const [language, setLanguage] = useState("javascript");
  const [label, setLabel] = useState("good first issue");
  const [topic, setTopic] = useState("");
  const [sort, setSort] = useState("created");
  const [onlyUnassigned, setOnlyUnassigned] = useState(true);

  function handleSubmit() {
    onSearch({ language, label, topic, sort, onlyUnassigned });
  }

  return (
    <div style={styles.card}>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Language</label>
          <select style={styles.input} value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Label</label>
          <select style={styles.input} value={label} onChange={(e) => setLabel(e.target.value)}>
            {labels.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Topic (optional)</label>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. react, cli, api..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Sort By</label>
          <select style={styles.input} value={sort} onChange={(e) => setSort(e.target.value)}>
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.bottomRow}>
        <label style={styles.checkLabel}>
          <input
            type="checkbox"
            checked={onlyUnassigned}
            onChange={(e) => setOnlyUnassigned(e.target.checked)}
          />
          &nbsp; Show only unassigned issues
        </label>

        <button
          style={{ ...styles.searchBtn, opacity: loading ? 0.6 : 1 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Searching..." : "🔍 Find Issues"}
        </button>
      </div>

    </div>
  );
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "8px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  input: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "#e2e8f0",
    fontSize: "14px",
    padding: "10px 12px",
    outline: "none",
    fontFamily: "Segoe UI, sans-serif",
  },
  bottomRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
  },
  checkLabel: {
    fontSize: "14px",
    color: "#94a3b8",
    display: "flex",
    alignItems: "center",
  },
  searchBtn: {
    background: "#8b5cf6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "700",
    padding: "11px 28px",
    cursor: "pointer",
  },
};

export default SearchBar;