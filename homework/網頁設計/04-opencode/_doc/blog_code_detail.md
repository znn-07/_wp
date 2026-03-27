# Threads 風格網誌系統 - 程式碼詳細解說

## 目錄

1. [專案架構](#1-專案架構)
2. [資料庫設計](#2-資料庫設計)
3. [伺服器核心 app.js](#3-伺服器核心-appjs)
4. [資料庫模組 database.js](#4-資料庫模組-databasejs)
5. [前端介面 EJS 模板](#5-前端介面-ejs-模板)
6. [樣式設計 style.css](#6-樣式設計-stylecss)
7. [前端互動 app.js](#7-前端互動-appjs)
8. [安全性考量](#8-安全性考量)
9. [技術原理深入解析](#9-技術原理深入解析)

---

## 1. 專案架構

```
blog/
├── app.js              # Express 應用程式主檔案
├── database.js         # SQLite 資料庫封裝模組
├── package.json        # Node.js 專案設定檔
├── blog.db             # SQLite 資料庫檔案（自動生成）
│
├── public/             # 靜態資源目錄
│   ├── css/
│   │   └── style.css   # Threads 風格樣式表
│   └── js/
│       └── app.js      # 前端 JavaScript
│
└── views/              # EJS 模板檔案
    ├── public.ejs      # 公共貼文頁面
    ├── myposts.ejs     # 個人貼文頁面
    ├── post.ejs        # 文章詳情頁面
    ├── login.ejs       # 登入頁面
    ├── register.ejs    # 註冊頁面
    └── new.ejs         # 發文頁面
```

### 請求流程圖

```
┌─────────┐    HTTP     ┌─────────┐    查詢    ┌─────────┐
│  瀏覽器  │ ────────→ │ Express │ ────────→ │ SQLite  │
│          │ ←─────── │  Server │ ←─────── │   DB   │
└─────────┘   HTML     └─────────┘   JSON     └─────────┘
     ↑                              │
     │                              ↓
     └─────────────────── EJS 模板引擎
                          (動態產生 HTML)
```

---

## 2. 資料庫設計

### 2.1 為何使用 SQLite？

**SQLite 的優點**：
- **零設定**：不需要安裝資料庫伺服器
- **單一檔案**：整個資料庫就是一個 `.db` 檔案
- **輕量級**：適合中小型應用程式
- **可攜性**：檔案可直接複製移動

### 2.2 資料表結構

#### users 表（用戶）

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,  -- 主鍵，自動遞增
  username TEXT UNIQUE NOT NULL,          -- 使用者名稱，不可重複
  password TEXT NOT NULL,                -- 加密後的密碼
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP  -- 創建時間
)
```

**設計說明**：
- `PRIMARY KEY AUTOINCREMENT`：確保每個用戶有唯一 ID
- `UNIQUE`：保證使用者名稱不重複
- `NOT NULL`：必填欄位

#### posts 表（文章）

```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER,           -- 外鍵，關聯到 users.id
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

**設計說明**：
- `author_id`：用於追蹤文章作者，顯示作者名稱
- 可為 NULL：允許訪客發文（匿名貼文）

#### comments 表（留言）

```sql
CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,    -- 外鍵，關聯到 posts.id
  user_id INTEGER NOT NULL,   -- 外鍵，關聯到 users.id
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

**設計說明**：
- `post_id`：知道這則留言屬於哪篇文章
- `user_id`：記錄留言者身份
- 刪除文章時需同時刪除相關留言（外部約束或程式處理）

---

## 3. 伺服器核心 app.js

### 3.1 Express 初始化

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// 設定模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 靜態檔案服務
app.use(express.static(path.join(__dirname, 'public')));

// URL 編碼解析
app.use(express.urlencoded({ extended: true }));
```

**原理說明**：

| 設定 | 作用 |
|------|------|
| `view engine: 'ejs'` | 指定使用 EJS 作為模板引擎 |
| `views` | 告訴 Express去哪找模板檔案 |
| `express.static` | 建立靜態檔案伺服器（CSS、JS、圖片） |
| `urlencoded` | 解析 POST 表單提交的資料 |

### 3.2 Session 中間件

```javascript
app.use(session({
  secret: 'blog-secret-key-2024',    // 用於簽章 Session ID
  resave: false,                     // 不強制儲存未修改的 Session
  saveUninitialized: false,          // 不儲存空的 Session
  cookie: { maxAge: 24 * 60 * 60 * 1000 }  // 有效期 24 小時
}));
```

**原理說明**：

```
┌─────────────────────────────────────────────────┐
│                  Session 工作流程                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  1. 用戶登入成功                                 │
│     ↓                                           │
│  2. Server 產生 Session ID + 寫入 Session Store  │
│     ↓                                           │
│  3. Server 回傳 Set-Cookie: session_id          │
│     ↓                                           │
│  4. 瀏覽器自動帶上 Cookie                        │
│     ↓                                           │
│  5. Server 比對 Session ID，取出用戶資料          │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Session 儲存的資料**：
```javascript
{
  userId: 1,          // 用戶 ID
  username: 'john'    // 用戶名稱
}
```

### 3.3 中間件設計模式

```javascript
// 認證檢查中間件
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');  // 未登入，跳轉登入頁
  }
  next();  // 已登入，繼續處理
}

// 全域用戶資料中間件
app.use((req, res, next) => {
  res.locals.currentUser = getCurrentUser(req);
  next();
});
```

**Express 中間件鏈**：
```
請求 → [URL解析] → [Static] → [Session] → [Body解析] → [路由處理]
                      ↑                           ↑
              全域 middleware              路由層 middleware
```

### 3.4 路由處理詳解

#### 公共貼文區 (/public)

```javascript
app.get('/public', (req, res) => {
  // 查詢所有文章與作者資訊
  const posts = db.exec(`
    SELECT posts.*, users.username,
    (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) as comment_count
    FROM posts 
    LEFT JOIN users ON posts.author_id = users.id 
    ORDER BY created_at DESC
  `);
  
  // 轉換為物件陣列
  const postList = posts[0] ? posts[0].values.map(row => ({
    id: row[0],
    title: row[1],
    content: row[2],
    author_id: row[3],
    created_at: row[4],
    author: row[5] || 'Anonymous',
    comment_count: row[6] || 0
  })) : [];
  
  res.render('public', { posts: postList, stats, currentPage: 'public' });
});
```

**SQL JOIN 說明**：

```sql
-- 原始查詢（複雜）
SELECT posts.*, users.username FROM posts LEFT JOIN users ON posts.author_id = users.id

-- 等價於（分解理解）
posts.*                          -- 所有文章欄位
users.username                   -- 關聯的用戶名稱
FROM posts                      -- 從文章表開始
LEFT JOIN users                 -- 左連接用戶表
ON posts.author_id = users.id   -- 連接條件：文章的作者ID = 用戶的ID
```

#### 留言處理 (/post/:id/comment)

```javascript
app.post('/post/:id/comment', requireAuth, (req, res) => {
  const { content } = req.body;
  if (content && content.trim()) {
    const db = getDB();
    db.run('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', 
      [req.params.id, req.session.userId, content.trim()]);
    saveDB();  // 寫入磁碟
  }
  res.redirect('/post/' + req.params.id);
});
```

**參數說明**：
- `req.params.id`：URL 中的文章 ID
- `req.session.userId`：目前登入用戶的 ID
- `req.body.content`：表單提交的留言內容
- `?`：SQL 參數化查詢，防止 SQL 注入

---

## 4. 資料庫模組 database.js

### 4.1 sql.js 的特性

```javascript
const initSqlJs = require('sql.js');
const fs = require('fs');

// 非同步初始化
async function initDB() {
  const SQL = await initSqlJs();  // 載入 WebAssembly 模組
  
  if (fs.existsSync(DB_PATH)) {
    // 資料庫已存在，讀取檔案
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    // 資料庫不存在，建立新資料庫
    db = new SQL.Database();
    db.run(`CREATE TABLE posts (...)`);
    db.run(`CREATE TABLE users (...)`);
    db.run(`CREATE TABLE comments (...)`);
    saveDB();  // 寫入磁碟
  }
  return db;
}
```

**sql.js vs 傳統 SQLite**：

| 特性 | sql.js | 傳統 SQLite |
|------|--------|-------------|
| 執行環境 | 純 JavaScript（WebAssembly） | 原生 C 函式庫 |
| 安裝 | npm install 即可 | 需要編譯 |
| 效能 | 稍慢 | 較快 |
| 檔案儲存 | 需手動 saveDB() | 自動持久化 |

### 4.2 資料持久化機制

```javascript
function saveDB() {
  const data = db.export();           // 匯出資料庫二進位資料
  const buffer = Buffer.from(data);   // 轉換為 Node.js Buffer
  fs.writeFileSync(DB_PATH, buffer);  // 寫入檔案
}
```

**為何需要手動儲存**：
- sql.js 是記憶體資料庫
- 預設不會自動寫入磁碟
- 每次修改後需呼叫 `saveDB()` 確保資料不遺失

---

## 5. 前端介面 EJS 模板

### 5.1 EJS 語法基礎

```ejs
<%# 這是註釋 %>
<%= variable %>           <%# 輸出 HTML 編碼後的內容 %>
<%- variable %>           <%# 輸出原始內容（可能有 XSS 風險） %>
<% if (condition) { %>    <%# JavaScript 邏輯 %>
<% } %>

<%# 迴圈範例 %>
<% posts.forEach(post => { %>
  <div><%= post.title %></div>
<% }) %>
```

### 5.2 樣板繼承概念

每個頁面都需要：
1. HTML 骨架結構
2. CSS/JS 引入
3. Header 導航列
4. Footer 版權資訊

```ejs
<!-- public.ejs -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <header class="header">...</header>
  
  <div class="main-container">
    <!-- 頁面特定內容 -->
    <% posts.forEach(post => { %>
      <article class="post-card">...</article>
    <% }) %>
  </div>
  
  <script src="/js/app.js"></script>
</body>
</html>
```

### 5.3 動態內容渲染

```ejs
<!-- 根據登入狀態顯示不同內容 -->
<% if (currentUser) { %>
  <span>Hello, <%= currentUser.username %></span>
  <a href="/post/new">New Post</a>
<% } else { %>
  <a href="/login">Login</a>
  <a href="/register">Register</a>
<% } %>
```

**原理**：
1. Express 呼叫 `res.render('public', { currentUser })`
2. EJS 接收 `currentUser` 變數
3. 根據真/假值條件渲染不同 HTML

---

## 6. 樣式設計 style.css

### 6.1 CSS 變數與主題

```css
:root {
  /* 主題色 */
  --bg-primary: #000;           /* 黑色背景 */
  --text-primary: #fff;         /* 白色文字 */
  --accent-red: #e74c3c;       /* 愛心紅色 */
  --border-color: rgba(255,255,255,0.1);
}
```

### 6.2 Flexbox 佈局

```css
.main-container {
  display: grid;                    /* 網格佈局 */
  grid-template-columns: 320px 1fr; /* 左側固定，右側自適應 */
  gap: 32px;                       /* 欄位間距 */
}

.post-actions {
  display: flex;                    /* 彈性盒子 */
  gap: 16px;                       /* 元素間距 */
  align-items: center;             /* 垂直置中 */
}
```

**Flexbox vs Grid**：

| 特性 | Flexbox | Grid |
|------|---------|------|
| 維度 | 一維（行或列） | 二維（行和列） |
| 適用場景 | 導航列、按鈕群組 | 頁面整體佈局 |
| 對齊方式 | 主軸/交叉軸 | 軌跡/單元格 |

### 6.3 響應式設計

```css
/* 平板以下 */
@media (max-width: 768px) {
  .main-container {
    grid-template-columns: 1fr;  /* 變成單欄 */
  }
  
  .sidebar {
    position: static;            /* 取消 sticky */
  }
  
  .user-card {
    flex-direction: row;         /* 水平排列 */
  }
}
```

**響應式斷點策略**：

```
320px  ────────────────  768px  ────────────────  1024px  ───────────
│                          │                          │
├──────────────────────────┼──────────────────────────┼────────────────
│      Mobile              │       Tablet             │     Desktop
│    單欄佈局              │    雙欄簡化              │     完整雙欄
└──────────────────────────┴──────────────────────────┴────────────────
```

### 6.4 SVG 圖示內嵌

```html
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
</svg>
```

**SVG 屬性說明**：

| 屬性 | 作用 |
|------|------|
| `viewBox="0 0 24 24"` | 定義視圖區域座標 |
| `fill="none"` | 填滿空白 |
| `stroke="currentColor"` | 使用 CSS currentColor |
| `stroke-width="2"` | 線條粗細 |

---

## 7. 前端互動 app.js

### 7.1 按讚功能

```javascript
function toggleLike(btn) {
  btn.classList.toggle('liked');              // 切換 liked 類別
  const countSpan = btn.querySelector('.like-count');
  let count = parseInt(countSpan.textContent) || 0;
  
  if (btn.classList.contains('liked')) {
    count++;
    btn.style.color = '#e74c3c';             // 紅色
  } else {
    count--;
    btn.style.color = '';
  }
  
  countSpan.textContent = count;
}
```

**DOM 操作說明**：

```
┌─────────────────────────────────────┐
│  toggleLike(btn)                    │
├─────────────────────────────────────┤
│                                      │
│  1. btn.classList.toggle('liked')   │
│     → 加入/移除 .liked 類別          │
│                                      │
│  2. btn.querySelector('.like-count')│
│     → 選取子元素中的計數器            │
│                                      │
│  3. btn.classList.contains('liked') │
│     → 檢查是否已被按讚               │
│                                      │
└─────────────────────────────────────┘
```

### 7.2 分享功能

```javascript
function sharePost(postId) {
  const url = window.location.origin + '/post/' + postId;
  
  if (navigator.share) {
    // 支援 Web Share API（手機）
    navigator.share({
      title: 'Check out this post',
      url: url
    });
  } else {
    // 降級：複製到剪貼簿
    navigator.clipboard.writeText(url);
    showToast('Link copied!');
  }
}
```

**Web Share API**：
- 僅支援 HTTPS 或 localhost
- 僅支援行動裝置
- 觸發原生分享選單

### 7.3 Toast 通知

```javascript
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}
```

**動畫原理**：
```css
.toast {
  transform: translateX(-50%) translateY(100px);  /* 隱藏在下 */
  opacity: 0;                                      /* 透明 */
  transition: all 0.3s ease;                       /* 動畫過渡 */
}

.toast.show {
  transform: translateX(-50%) translateY(0);        /* 滑入 */
  opacity: 1;                                      /* 顯示 */
}
```

---

## 8. 安全性考量

### 8.1 SQL 注入防護

**危險写法**：
```javascript
// 永遠不要這樣做！
const query = `SELECT * FROM users WHERE username = '${username}'`;
db.exec(query);
```

**攻擊示例**：
- 輸入 `admin' OR '1'='1` → 繞過登入驗證

**安全写法**：
```javascript
// 使用參數化查詢
db.exec('SELECT * FROM users WHERE username = ?', [username]);
```

### 8.2 密碼安全

**bcrypt 加密**：
```javascript
// 註冊時加密
const hashedPassword = await bcrypt.hash(password, 10);

// 登入時驗證
const valid = await bcrypt.compare(password, user.password);
```

**bcrypt 原理**：
```
┌─────────────────────────────────────────┐
│  bcrypt 雜湊過程                         │
├─────────────────────────────────────────┤
│                                          │
│  密碼 "123456"                           │
│       ↓                                  │
│  加鹽 (Salt) → 產生隨機字串             │
│       ↓                                  │
│  多次雜湊 (cost factor = 10)             │
│       ↓                                  │
│  $2b$10$N9qo8uLOickgx2ZMRZoMye...       │
│                                          │
└─────────────────────────────────────────┘
```

**為何需要加鹽**：
- 相同密碼 → 不同雜湊值（防止彩虹表攻擊）
- 暴力破解困難（每次計算需 100ms+）

### 8.3 Session 安全

```javascript
app.use(session({
  secret: 'blog-secret-key-2024',    // 複雜且足夠長
  cookie: {
    httpOnly: true,                  // 禁止 JavaScript 讀取
    secure: false,                   // 生產環境應為 true
    maxAge: 24 * 60 * 60 * 1000     // 過期時間
  }
}));
```

### 8.4 XSS 防護

EJS 的 `<%= %>` 會自動 HTML 編碼：
```ejs
<%= userInput %>  <!-- 安全：<script> → &lt;script&gt; -->
<%- userInput %>  <!-- 危險：會執行 script -->
```

---

## 9. 技術原理深入解析

### 9.1 Express 中間件管道

```
請求到達 → 中間件1 → 中間件2 → ... → 路由處理 → 回應發送
              ↓           ↓
          [執行業務]   [執行業務]
```

**本專案的中間件順序**：
1. `express.static()` - 靜態檔案
2. `express.urlencoded()` - POST 資料解析
3. `session()` - Session 管理
4. 全域 `currentUser` 設定
5. 路由處理

### 9.2 HTTP 請求生命週期

```
┌──────────────────────────────────────────────────────────────┐
│  HTTP 請求 → 回應流程                                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  1. 瀏覽器發送請求                                             │
│     GET /public HTTP/1.1                                     │
│     Cookie: session_id=abc123                                 │
│                                                               │
│  2. Express 接收請求                                           │
│     ↓                                                         │
│  3. 中間件處理                                                 │
│     - Session 解密                                            │
│     - URL 解析                                                 │
│     - 查詢資料庫                                               │
│                                                               │
│  4. 路由匹配                                                  │
│     app.get('/public', ...) → 執行處理函數                    │
│                                                               │
│  5. 模板渲染                                                  │
│     EJS + 資料 → HTML 字串                                    │
│                                                               │
│  6. 回傳響應                                                  │
│     HTTP/1.1 200 OK                                           │
│     Content-Type: text/html                                   │
│     Set-Cookie: ...                                           │
│     <!DOCTYPE html>...                                        │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 9.3 狀態管理架構

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Client         │     │   Express        │     │   SQLite         │
│   (瀏覽器)        │     │   (伺服器)        │     │   (資料庫)        │
├──────────────────┤     ├──────────────────┤     ├──────────────────┤
│                  │     │                  │     │                  │
│  DOM 狀態        │     │  Session        │     │  持久化資料      │
│  - 愛心是否被按   │     │  - userId       │     │  - users 表      │
│  - UI 互動       │     │  - username     │     │  - posts 表      │
│                  │     │                  │     │  - comments 表   │
│  關閉瀏覽器後消失 │     │  24小時有效     │     │  永久保存        │
│                  │     │                  │     │                  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
       ↑                        ↑                        ↑
       │                        │                        │
       └────────────────────────┴────────────────────────┘
                    狀態分層儲存
```

### 9.4 RESTful 路由設計原則

| 操作 | 方法 | 路由 | 說明 |
|------|------|------|------|
| 讀取資源 | GET | `/public` | 獲取所有文章 |
| 讀取資源 | GET | `/post/:id` | 獲取單篇文章 |
| 讀取資源 | GET | `/post/new` | 獲取發文表單 |
| 創建資源 | POST | `/post` | 發布新文章 |
| 創建資源 | POST | `/post/:id/comment` | 新增留言 |
| 刪除資源 | POST | `/post/:id/delete` | 刪除文章 |
| 認證 | POST | `/login` | 登入 |
| 認證 | POST | `/logout` | 登出 |
| 認證 | POST | `/register` | 註冊 |

**REST 原則**：
- 使用 HTTP 方法表示操作
- 使用名詞表示資源
- 無狀態請求

---

## 附錄：常用指令

```bash
# 安裝依賴
npm install

# 啟動伺服器
npm start
# 或
node app.js

# 刪除資料庫（重置）
rm blog.db

# 檢視資料庫內容
sqlite3 blog.db ".tables"
sqlite3 blog.db "SELECT * FROM posts;"
```

---

*文件版本：1.0*
*最後更新：2026-03-27*
