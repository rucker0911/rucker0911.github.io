# rucker.github.io

使用 React + Vite 建置，部署於 GitHub Pages。

## 技術棧

- **React** 18
- **React Router DOM** 7
- **Vite** 6
- **gray-matter** — Markdown frontmatter 解析
- **react-markdown** — Markdown 渲染
- **ESLint** 9

## 專案結構

```
rucker.github.io/
├── index.html                  # 入口 HTML（含 SEO meta tags）
├── package.json
├── vite.config.js
├── .github/
│   └── workflows/
│       └── deploy.yml          # 自動部署至 GitHub Pages
└── src/
    ├── main.jsx
    ├── App.jsx                 # 三欄佈局與路由
    ├── hooks/
    │   ├── useSidebarState.js  # Sidebar 寬度、收合、localStorage 狀態
    │   └── usePageMeta.js      # 動態更新 document.title 與 OG meta
    ├── lib/
    │   └── posts.js            # 讀取並快取所有 Markdown 文章
    ├── components/
    │   ├── AboutCard.jsx       # 右側欄個人簡介卡片
    │   ├── PostListSection.jsx # 文章列表（搜尋 / 分類 / 標籤篩選）
    │   └── RecentPosts.jsx     # 右側欄最近文章
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── PostsPage.jsx
    │   ├── PostPage.jsx        # 單篇文章頁
    │   ├── ProjectsPage.jsx
    │   ├── AboutPage.jsx
    │   ├── ContactPage.jsx
    │   └── NotFoundPage.jsx    # 404 頁面
    └── posts/                  # Markdown 文章來源
        └── *.md
```

## 新增文章

在 `src/posts/` 建立 `.md` 檔案，並在 frontmatter 填入以下欄位：

```markdown
---
title: '文章標題'
date: '2026-01-01'
category: '分類名稱'
tags: ['標籤A', '標籤B']
excerpt: '文章摘要，會顯示在列表與 SEO description。'
---

文章內容（支援 Markdown 語法）...
```

存檔後重新執行 `npm run dev` 或 `npm run build` 即會自動載入。

## 開發

```bash
npm install      # 安裝依賴
npm run dev      # 本地開發（http://localhost:5173）
npm run build    # 建置至 dist/
npm run preview  # 預覽建置結果
npm run lint     # ESLint 檢查
```

## 部署

push 至 `main` 分支後，`.github/workflows/deploy.yml` 會自動觸發 GitHub Actions，執行建置並部署至 GitHub Pages。

在 GitHub 倉庫的 **Settings → Pages** 中確認 **Source** 設為 **GitHub Actions** 即可。

## 授權

© 2026 曹同和
