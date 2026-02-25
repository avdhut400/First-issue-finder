# First Issue Finder

A modern web application that helps developers discover real open-source issues to contribute to.

Find beginner-friendly issues, submit pull requests, and start contributing to open source effectively.

---

## 🚀 Overview

First Issue Finder uses the GitHub REST API to fetch live open issues from public repositories.  
It allows filtering by programming language, labels, keywords, and sorting preferences.

This project is designed to help:
- Beginners find their first open-source contribution
- Developers discover active repositories
- Contributors quickly identify unassigned issues

---

## ✨ Features

- Live GitHub API integration (real-time issue data)
- Filter by programming language
- Filter by labels (good first issue, help wanted, bug, documentation)
- Keyword-based topic search
- Sort by newest, recently updated, or most discussed
- Show only unassigned issues
- Bookmark issues locally (localStorage)
- Display repository star count
- Display issue comment count
- Relative time display (e.g., "2 hours ago")
- Modern glassmorphism dark UI

---

## 🛠️ Tech Stack

- React 18
- Vite 5
- JavaScript (ES6+)
- GitHub REST API
- CSS3

---

## 📦 Installation

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Setup

```bash
git clone https://github.com/avdhut400/first-issue-finder.git
cd first-issue-finder
npm install
npm run dev
```

Application runs at:

```
http://localhost:5173
```

---

## 🏗️ Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
first-issue-finder/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    └── components/
        ├── SearchBar.jsx
        └── IssueCard.jsx
```

---

## 🔎 How It Works

The application queries GitHub's search API:

```javascript
const query = `label:"good first issue" language:javascript state:open no:assignee`
fetch(`https://api.github.com/search/issues?q=${query}&sort=created&per_page=12`)
```

Results are dynamically rendered in the UI with repository metadata.

---

<img width="1887" height="920" alt="food" src="https://github.com/user-attachments/assets/33327fc3-78e1-494b-b0bc-dd3a8b9ae577" />


## ⚠️ GitHub API Rate Limiting

Unauthenticated requests are limited to 60 requests per hour.  
For higher limits, authentication can be implemented using a GitHub token.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch  
   `git checkout -b feature/your-feature`
3. Commit changes  
   `git commit -m "feat: add new feature"`
4. Push to your branch  
   `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

Avdhut Magar  
GitHub: https://github.com/avdhut400  
LinkedIn: https://www.linkedin.com/in/avdhut-magar-94088333b/

---
