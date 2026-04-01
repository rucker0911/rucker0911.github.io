# 進度

- PostListSection 已拆分：`PostListToolbar`、`PostListCard`；常數於 `src/lib/postListConstants.js`，分類色於 `src/lib/postListCategoryAccent.js`（`CATEGORY_ACCENT_MAP` 對照表 + `DEFAULT_CATEGORY_ACCENT`）。
- `npm run test` 涵蓋 `getCategoryAccent`（Node 內建 `node:test`）。
- `posts.js`：`BlogPost` JSDoc typedef；`_parsePost` 拆為 `_parseMatterBody`、`_buildBlogPost`。
