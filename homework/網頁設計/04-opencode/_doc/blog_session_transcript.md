# OpenCode Memory - Threads 風格網誌系統

## 基本資訊

| 項目 | 內容 |
|------|------|
| 專案路徑 | `/Users/liuzhenna/Desktop/html/_wp/homework/網頁設計/04-opencode/blog` |
| 專案類型 | Node.js + SQLite 網誌系統 |
| 框架 | Express + EJS + sql.js |
| 啟動指令 | `cd blog && npm start` |
| 預設 Port | 3000 |

---

## 專案現況

### 已完成功能

1. **用戶系統**
   - 註冊 `/register`
   - 登入 `/login`
   - 登出 `/logout`
   - 密碼 bcrypt 加密

2. **貼文系統**
   - 發表文章 `/post/new` (需登入)
   - 公共貼文區 `/public` (首頁)
   - 個人貼文區 `/my-posts` (需登入)
   - 刪除文章 `/post/:id/delete`

3. **留言系統**
   - 文章留言 `/post/:id/comment`
   - 留言列表顯示
   - 刪除文章時一併刪除留言

4. **互動功能**
   - 按讚（愛心，紅色效果）
   - 留言計數
   - 分享（紙飛機，複製連結）

5. **介面設計**
   - Threads 風格深色主題
   - 黑白配色為主
   - 響應式設計
   - 側邊欄導航

### 檔案結構

```
blog/
├── app.js              # Express 主程式 (~170 行)
├── database.js         # SQLite 設定
├── package.json        # 依賴：express, sql.js, ejs, express-session, bcryptjs
├── blog.db             # SQLite 資料庫
├── public/
│   ├── css/style.css   # Threads 風格樣式
│   └── js/app.js       # 前端互動 (按讚、分享、toast)
└── views/
    ├── public.ejs      # 公共貼文
    ├── myposts.ejs     # 個人貼文
    ├── post.ejs        # 文章詳情 + 留言
    ├── login.ejs       # 登入
    ├── register.ejs    # 註冊
    └── new.ejs         # 發文
```

### 資料庫結構

- **users 表**：id, username, password, created_at
- **posts 表**：id, title, content, author_id, created_at
- **comments 表**：id, post_id, user_id, content, created_at

---

## 技術棧版本

```json
{
  "express": "^4.18.2",
  "sql.js": "^1.10.3",
  "ejs": "^3.1.9",
  "express-session": "^1.18.0",
  "bcryptjs": "^2.4.3"
}
```

**注意**：sql.js 是純 JavaScript 版本的 SQLite，不需要編譯，但需每次修改後呼叫 `saveDB()` 寫入磁碟。

---

## 重要程式碼摘要

### app.js 路由

```
GET  /              → redirect /public
GET  /public       → 公共貼文列表
GET  /my-posts     → 個人貼文 (需登入)
GET  /login        → 登入頁
POST /login        → 執行登入
GET  /register     → 註冊頁
POST /register     → 執行註冊
POST /logout       → 登出
GET  /post/new     → 發文頁 (需登入)
POST /post         → 發布文章
GET  /post/:id     → 文章詳情 + 留言
POST /post/:id/comment → 新增留言
POST /post/:id/delete  → 刪除文章
```

### Session 設定

```javascript
app.use(session({
  secret: 'blog-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
```

### 認證中間件

```javascript
function requireAuth(req, res, next) {
  if (!req.session.userId) return res.redirect('/login');
  next();
}
```

---

## 已遭遇的問題與解決

### 1. better-sqlite3 編譯失敗

**問題**：原生 SQLite 模組需要 C++ 編譯，環境不相容
**解決**：改用 sql.js（純 JS 版本）

### 2. 資料庫初始化

**問題**：sql.js 是記憶體資料庫，修改後需手動儲存
**解決**：每次修改資料後呼叫 `saveDB()` 寫入 `blog.db`

### 3. 新增 comments 表

**問題**：舊資料庫沒有 comments 表
**解決**：刪除舊 `blog.db`，重啟後自動建立新資料庫

### 4. 按讚功能

**現況**：目前是前端 JS 狀態，刷新後重置
**原因**：節省資料庫複雜度
**可改進**：建立 likes 表持久化

---

## UI/UX 設計要點

### 配色
- 背景：#000（黑）
- 文字：#fff（白）
- 愛心紅：#e74c3c
- 頭像背景：#333 + 白邊框

### 按鈕順序
1. ❤️ 愛心（按讚）
2. 💬 留言（計數）
3. ✈️ 分享（紙飛機）

### 響應式斷點
- 768px 以下：單欄佈局
- 側邊欄變為水平排列

---

## 文件位置

| 文件 | 路徑 |
|------|------|
| AI 對話紀錄 | `_doc/blog-ai-HTML-chat.md` |
| 程式碼詳解 | `_doc/blog_code_detail.md` |
| 開發摘要 | `_doc/blog-summary.md` |
| gitignore | `/Users/liuzhenna/Desktop/html/_wp/.gitignore` |

---

## 繼續開發建議

### 待優化項目
- [ ] 按讚功能持久化（建立 likes 表）
- [ ] 分享改為支援 Web Share API（已部分實作）
- [ ] 圖片上傳功能
- [ ] 用戶頭像上傳
- [ ] 文章分類/標籤
- [ ] 搜尋功能

### 常用指令
```bash
# 重置資料庫
rm blog.db

# 安裝依賴
npm install

# 啟動
npm start
```

---

## 注意事項

1. **sql.js 特性**：修改資料後必須呼叫 `saveDB()` 否則重啟後資料遺失
2. **bcryptjs**：密碼加密需使用 `bcrypt.hash()` 註冊，`bcrypt.compare()` 驗證
3. **Session**：需要 express-session 中間件才能使用 `req.session`
4. **EJS 安全**：使用 `<%= %>` 自動轉義，`<%- %>` 可能有 XSS 風險

---

*記憶建立時間：2026-03-27*
