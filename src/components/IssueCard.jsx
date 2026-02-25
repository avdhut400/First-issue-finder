import { useState } from "react";

function timeAgo(dateString) {
  const days = Math.floor((Date.now() - new Date(dateString)) / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30)  return `${days} days ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

function IssueCard({ issue }) {
  const [saved, setSaved] = useState(() => {
    const savedList = JSON.parse(localStorage.getItem("savedIssues") || "[]");
    return savedList.includes(issue.id);
  });

  const repoName = issue.repository_url.replace("https://api.github.com/repos/", "");

  function toggleSave() {
    const savedList = JSON.parse(localStorage.getItem("savedIssues") || "[]");
    if (saved) {
      const updated = savedList.filter((id) => id !== issue.id);
      localStorage.setItem("savedIssues", JSON.stringify(updated));
    } else {
      savedList.push(issue.id);
      localStorage.setItem("savedIssues", JSON.stringify(savedList));
    }
    setSaved(!saved);
  }

  return (
    <div style={styles.card}>

      <div style={styles.repoName}>📦 {repoName}</div>

      <p style={styles.title}>{issue.title}</p>

      <div style={styles.labelsRow}>
        {issue.labels.slice(0, 4).map((label) => (
          <span
            key={label.id}
            style={{
              ...styles.label,
              background: `#${label.color}22`,
              border: `1px solid #${label.color}66`,
              color: `#${label.color}`,
            }}
          >
            {label.name}
          </span>
        ))}
      </div>

      <div style={styles.meta}>
        <span>🕐 {timeAgo(issue.created_at)}</span>
        <span>💬 {issue.comments} comments</span>
      </div>

      <div style={styles.actions}>
        <a href={issue.html_url} target="_blank" rel="noreferrer" style={styles.viewBtn}>
          View Issue ↗
        </a>
        <button onClick={toggleSave} style={saved ? styles.savedBtn : styles.saveBtn}>
          {saved ? "★ Saved" : "☆ Save"}
        </button>
      </div>

    </div>
  );
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transition: "border-color 0.2s",
  },
  repoName: {
    fontSize: "12px",
    color: "#8b5cf6",
    fontWeight: "600",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  title: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#e2e8f0",
    lineHeight: "1.5",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    margin: 0,
  },
  labelsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  label: {
    fontSize: "11px",
    padding: "3px 8px",
    borderRadius: "20px",
    fontWeight: "500",
  },
  meta: {
    display: "flex",
    gap: "16px",
    fontSize: "12px",
    color: "#64748b",
  },
  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "4px",
  },
  viewBtn: {
    flex: 1,
    background: "#8b5cf6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    padding: "9px",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
  },
  saveBtn: {
    flex: 1,
    background: "transparent",
    color: "#64748b",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    padding: "9px",
    cursor: "pointer",
  },
  savedBtn: {
    flex: 1,
    background: "rgba(6,182,212,0.1)",
    color: "#06b6d4",
    border: "1px solid rgba(6,182,212,0.3)",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    padding: "9px",
    cursor: "pointer",
  },
};

export default IssueCard;