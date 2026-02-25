<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,19,24,30,6&height=180&section=header&text=First%20Issue%20Finder&fontSize=48&fontColor=ffffff&fontAlignY=38&desc=Find%20Open%20Source%20Issues%20%C2%B7%20Submit%20PRs%20%C2%B7%20Get%20Merged&descAlignY=58&descSize=16&animation=fadeIn" width="100%"/>

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![GitHub API](https://img.shields.io/badge/GitHub%20API-Live-181717?style=for-the-badge&logo=github&logoColor=white)](https://docs.github.com/en/rest)
[![License](https://img.shields.io/badge/License-MIT-8b5cf6?style=for-the-badge)](LICENSE)

<br/>

> **Find real open source issues. Pick one. Submit a PR. Get merged. 🚀**

</div>

---

## ✨ Features

- 🔍 **Live GitHub API** — Real issues fetched in real-time, no fake data
- 🌐 **Language Filter** — JavaScript, Python, Java, TypeScript, Go, Rust & more
- 🏷️ **Label Filter** — good first issue, help wanted, documentation, bug & more
- 📝 **Topic Search** — Search by keyword like `react`, `cli`, `api`
- ↕️ **Sort Options** — Newest / Updated / Most Discussed
- 👤 **Unassigned Filter** — Show only available issues
- ★ **Save Issues** — Bookmark issues locally with localStorage
- ⭐ **Star Count** — See how popular the repo is
- 💬 **Comment Count** — Know how active the issue is
- 🕐 **Time Ago** — See when the issue was opened
- 🌌 **Glassmorphism UI** — Dark theme with frosted glass cards & purple glow

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub API](https://img.shields.io/badge/GitHub%20API-181717?style=for-the-badge&logo=github&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

</div>

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/avdhut400/first-issue-finder.git

# 2. Go into the project
cd first-issue-finder

# 3. Install dependencies
npm install

# 4. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser 🎉

### Build for Production

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
    ├── App.jsx                    ← Main app, canvas bg, cursor
    └── components/
        ├── SearchBar.jsx          ← Filters: language, label, topic, sort
        └── IssueCard.jsx          ← Individual issue card with save
```

---

## 🔧 How It Works

```javascript
const q = `label:"good first issue" language:javascript state:open no:assignee`
fetch(`https://api.github.com/search/issues?q=${q}&sort=created&per_page=12`)
```

1. Pick your **language** and **label**
2. Optionally add a **topic** keyword
3. Hit **Find Issues** — live GitHub results load
4. Click **View Issue ↗** to open on GitHub
5. Fork the repo, submit your PR! 🎯

---

## ⚠️ GitHub API Rate Limit

GitHub's public API allows **60 requests/hour** without authentication. If you hit the limit, wait 60 seconds and try again.

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Then open a Pull Request 🎉

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built with ❤️ by [Avdhut Magar](https://github.com/avdhut400) · [LinkedIn](https://www.linkedin.com/in/avdhut-magar-94088333b/) · [LeetCode](https://leetcode.com/u/avdhutmagar/)

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,19,24,30,6&height=100&section=footer&animation=fadeIn" width="100%"/>

</div>
