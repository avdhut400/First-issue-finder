

import { useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import IssueCard from "./components/IssueCard.jsx";

function App() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Search for open source issues above 👆");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [lastSearch, setLastSearch] = useState(null);

  async function searchIssues(filters, pageNum) {
    setLoading(true);
    const { language, label, topic, sort, onlyUnassigned } = filters;

    let query = `label:"${label}" language:${language} state:open`;
    if (topic) query += ` ${topic}`;
    if (onlyUnassigned) query += ` no:assignee`;

    const url = `https://api.github.com/search/issues?q=${encodeURIComponent(
      query
    )}&sort=${sort}&order=desc&per_page=12&page=${pageNum}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        setMessage("No issues found. Try different filters.");
        setIssues([]);
        setHasMore(false);
        setLoading(false);
        return;
      }

      if (pageNum === 1) setIssues(data.items);
      else setIssues((prev) => [...prev, ...data.items]);

      setMessage(`Found ${data.total_count.toLocaleString()} issues`);
      setHasMore(data.items.length === 12);
    } catch (error) {
      setMessage(
        "Something went wrong. GitHub may have rate limited you. Wait 60s and try again."
      );
    }

    setLoading(false);
  }

  function handleSearch(filters) {
    setLastSearch(filters);
    setPage(1);
    setIssues([]);
    searchIssues(filters, 1);
  }

  function handleLoadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    searchIssues(lastSearch, nextPage);
  }

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>🎯 First Issue Finder</h1>

      {/* GitHub Logo + Username */}
      <a
        href="https://github.com/avdhut400"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.author}
      >
        <svg
          height="18"
          width="18"
          viewBox="0 0 16 16"
          fill="currentColor"
          style={{ marginRight: "6px" }}
        >
          <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38
          0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
          -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87
          2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
          0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
          0 0 .67-.21 2.2.82a7.6 7.6 0 012-.27c.68 0 1.36.09
          2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08
          2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65
          3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01
          2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        @avdhut400
      </a>

      <p style={styles.subtitle}>
        Find beginner-friendly open source issues and submit your first PR!
      </p>

      <SearchBar onSearch={handleSearch} loading={loading} />

      <p style={styles.message}>{message}</p>

      {loading && issues.length === 0 && (
        <p style={styles.loading}>Loading issues...</p>
      )}

      <div style={styles.grid}>
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>

      {hasMore && !loading && (
        <button style={styles.loadMoreBtn} onClick={handleLoadMore}>
          Load More
        </button>
      )}

      {loading && issues.length > 0 && (
        <p style={styles.loading}>Loading more...</p>
      )}
    </div>
  );
}

const styles = {
  app: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily: "Segoe UI, sans-serif",
    color: "#e2e8f0",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "10px",
    color: "#fff",
  },
  author: {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "14px",
  color: "#8b5cf6",            
  textDecoration: "none",
  marginBottom: "24px",
  cursor: "pointer",
  transition: "all 0.3s ease",  
  padding: "4px 8px",
  borderRadius: "8px",
  backgroundColor: "rgba(139,92,246,0.1)", 
  boxShadow: "0 4px 15px rgba(139,92,246,0.2)",
},

authorHover: {
  transform: "translateY(-2px) scale(1.05)", 
  backgroundColor: "rgba(139,92,246,0.2)",   
  boxShadow: "0 6px 20px rgba(139,92,246,0.35)",
  color: "#ffffff",                        
},
  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "16px",
    marginBottom: "32px",
  },
  message: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
    margin: "16px 0 24px",
  },
  loading: {
    textAlign: "center",
    color: "#8b5cf6",
    fontSize: "14px",
    margin: "16px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "16px",
  },
  loadMoreBtn: {
    display: "block",
    margin: "32px auto 0",
    padding: "12px 32px",
    background: "#8b5cf6",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  loadMoreBtnHover: {
    background: "#7c3aed",
  },
};

export default App;