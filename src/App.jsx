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

    const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&sort=${sort}&order=desc&per_page=12&page=${pageNum}`;

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

      if (pageNum === 1) {
        setIssues(data.items);
      } else {
        setIssues((prev) => [...prev, ...data.items]);
      }

      setMessage(`Found ${data.total_count.toLocaleString()} issues`);
      setHasMore(data.items.length === 12);
    } catch (error) {
      setMessage("Something went wrong. GitHub may have rate limited you. Wait 60s and try again.");
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
      <p style={styles.subtitle}>Find beginner-friendly open source issues and submit your first PR!</p>

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
    marginBottom: "8px",
    color: "#fff",
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
  },
};

export default App;