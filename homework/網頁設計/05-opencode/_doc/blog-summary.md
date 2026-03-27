# HTML 網頁設計 - 網誌系統開發紀錄

## 專案概述

使用 Node.js + SQLite 開發的 Threads 風格網誌系統，具備用戶註冊、登入、發文、留言、按讚、分享等功能。

---

## 技術棧

- **後端**：Node.js + Express
- **資料庫**：SQLite (sql.js)
- **模板引擎**：EJS
- **認證**：express-session + bcryptjs
- **前端**：純 HTML/CSS/JS，響應式設計

---

## 專案結構

```
blog/
├── app.js           # Express 主程式
├── database.js      # SQLite 資料庫設定
├── package.json     # 專案依賴
├── blog.db          # SQLite 資料庫檔案
├── public/
│   ├── css/
│   │   └── style.css    # Threads 風格樣式
│   └── js/
│       └── app.js       # 前端互動腳本
└── views/
    ├── public.ejs      # 公共貼文區
    ├── myposts.ejs     # 個人貼文區
    ├── post.ejs        # 文章詳情 + 留言
    ├── login.ejs       # 登入頁面
    ├── register.ejs    # 註冊頁面
    └── new.ejs         # 發文頁面
```

---

## 功能列表

### 1. 用戶系統
- [x] 用戶註冊 (`/register`)
- [x] 用戶登入 (`/login`)
- [x] 用戶登出 (`/logout`)
- [x] 密碼加密儲存 (bcrypt)

### 2. 貼文系統
- [x] 發表新文章 (`POST /post`)
- [x] 瀏覽所有文章 (`/public`)
- [x] 瀏覽個人文章 (`/my-posts`)
- [x] 刪除文章 (`POST /post/:id/delete`)
- [x] 文章顯示作者名稱與頭像

### 3. 留言系統
- [x] 在文章底下留言 (`POST /post/:id/comment`)
- [x] 顯示留言列表
- [x] 留言顯示作者與時間
- [x] 刪除文章時一併刪除留言

### 4. 互動功能
- [x] 按讚（愛心按鈕，紅色效果）
- [x] 留言計數顯示
- [x] 分享（紙飛機圖示，複製連結）

### 5. 介面設計
- [x] Threads 風格深色主題
- [x] 黑白配色為主
- [x] 響應式設計（手機/平板/桌面）
- [x] 側邊欄用戶資訊與導航
- [x] 按鈕順序：愛心 → 留言 → 分享

---

## 資料庫結構

### users 表
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### posts 表
```sql
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### comments 表
```sql
CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

---

## API 路由

| 方法 | 路徑 | 說明 |
|------|------|------|
| GET | `/` | 重新導向至 `/public` |
| GET | `/public` | 公共貼文區（首頁） |
| GET | `/my-posts` | 個人貼文區（需登入） |
| GET | `/login` | 登入頁面 |
| POST | `/login` | 執行登入 |
| GET | `/register` | 註冊頁面 |
| POST | `/register` | 執行註冊 |
| POST | `/logout` | 執行登出 |
| GET | `/post/new` | 發文頁面（需登入） |
| POST | `/post` | 發布文章（需登入） |
| GET | `/post/:id` | 文章詳情 + 留言 |
| POST | `/post/:id/comment` | 發表留言（需登入） |
| POST | `/post/:id/delete` | 刪除文章（需登入） |

---

## 啟動方式

```bash
cd blog
npm install
npm start
# 開啟 http://localhost:3000
```

---

## 開發紀錄

### 2026-03-27
1. 建立基本 Node.js + Express + SQLite 網誌系統
2. 加入用戶註冊、登入、登出功能
3. 實作文章 CRUD 功能
4. 修改成 Threads.com 風格介面
   - 深色背景、毛玻璃效果
   - 左側邊欄個人資訊
   - 公共區與私人區分開
5. 加入留言系統
6. 加入按讚、分享功能
7. 調整配色為黑白為主
8. 按鈕順序：愛心 → 留言 → 分享（紙飛機）

---

## .gitignore 設定

已加入以下忽略規則：

```
# Dependencies
node_modules/

# Database
*.db
*.sqlite
*.sqlite3

# Logs
logs/
*.log

# Environment
.env
```

---

## 待優化項目

- [ ] 按讚功能改為資料庫持久化
- [ ] 分享功能改為 URL 分享
- [ ] 圖片上傳功能
- [ ] 用戶頭像上傳
- [ ] 文章分類/標籤
- [ ] 搜尋功能
- [ ] 通知系統
