# 💻 作業統整

> README 與 index.html 皆是由 opencode（AI 程式碼助手）協作整理產出（[對話紀錄](./AI-conversation.md)）。

> 本文件統整了 `_wp/homework` 目錄下所有作業的完整資訊。

> 視覺化入口：`index.html` — 整合 8 項作業的單頁應用，具備搜尋過濾、卡片式 UI、作品預覽區塊與程式碼檢視器。

---

## 📂 目錄總覽

| 目錄 | 標題 | 類別 | 狀態 |
|------|------|------|------|
| `01/` | 關於我 — HTML 個人簡介 | HTML/CSS | 
| `02/` | HTML 基礎 — 服務回饋表單 | HTML/CSS |
| `03/` | JavaScript 入門 | JavaScript | 
| `04/` | JavaScript 習題集（10 題） | JavaScript | 
| `06/` | JavaScript 進階習題 | JavaScript | 
| `07/` | JavaScript 實踐習題 | JavaScript | 
| `網頁設計/` | 網頁設計專題 — 部落格系統 | Fullstack | 
| `Blog/` | 新聞聚合平台（Node.js） | Fullstack | 

---

## 01 — 關於我

**路徑**：`01/`

個人簡介網頁，使用 HTML 基礎結構與 CSS 排版。

| 檔案 | 說明 |
|------|------|
| `aboutme.html` | 個人簡介頁面，含姓名、學校、科系、興趣、聯絡方式 |

**內容摘要**：姓名劉甄娜，國立金門大學資訊工程學系，學號 111410520。興趣為看比賽。頁面使用 `<header>`、`<div>`、`<ul>` 等基礎 HTML 標籤建構。

---

## 02 — HTML 基礎

**路徑**：`02/`

完整的服務回饋表單（Experience Feedback）。

**功能特色**：
- 星級評分元件（純 CSS 實現，使用 `flex-direction: row-reverse` + `:hover` / `:checked ~` 選擇器）
- 聯絡資訊欄位（姓名、電話、Email）
- 服務品質評分（速度、專業度、環境）
- 未來意願選擇（Yes, Definitely / No, Not really / Maybe）
- 意見回饋文字區
- 響應式設計（`@media max-width: 480px`）

| 檔案 | 說明 |
|------|------|
| `index.html` | 完整表單頁面，內嵌 CSS 樣式（289 行） |

---

## 03 — JavaScript 入門

**路徑**：`03/`

JavaScript 基本語法練習。

| 檔案 | 說明 |
|------|------|
| `hello.js` | 基本輸出練習：`console.log('hello 你好')` |
| `README.md` | （空白） |

---

## 04 — JavaScript 習題集（10 題）

**路徑**：`04/`

由淺入深的 10 個 JavaScript 核心範例，涵蓋基礎到進階。

| 檔案 | 主題 | 說明 |
|------|------|------|
| `01-score.js` | 基礎數字判斷 | `if/else` 判斷正負零 |
| `02-score.js` | 乘法表列印 | `for` 迴圈列印 2 的乘法表 |
| `03-score.js` | 倒數計時器 | `while` 迴圈倒數 + Blast off! |
| `04-score.js` | 陣列總和計算 | 陣列走訪與加總 |
| `05-score.js` | 物件屬性讀取 | 建立 `user` 物件並輸出自我介紹 |
| `06-score.js` | 尋找陣列最大值 | 走訪陣列找最大值 |
| `07-score.js` | JSON 格式轉換 | `JSON.stringify` / `JSON.parse` |
| `08-score.js` | 篩選陣列資料 | `Array.filter` 大於 10 |
| `09-score.js` | JSON 物件陣列處理 | 走訪學生陣列，印出及格者 |
| `10-score.js` | 簡易購物車計算 | 計算購物車總價 |

> 詳細內容含程式碼與輸出結果請見 [`04/README.md`](./04/README.md)
>
> AI 協作紀錄：https://gemini.google.com/share/938a7200d8f5

---

## 06 — JavaScript 進階習題

**路徑**：`06/`

10 個進階 JavaScript 習題，聚焦回呼函式（callback）、高階函式、閉包（closure）等概念。

| 檔案 | 主題 | 說明 |
|------|------|------|
| `01.js` | 高階函式 | `mathTool()` 接收回呼函式進行加減運算 |
| `02.js` | IIFE | 傳統匿名函數的立即呼叫表達式 |
| `03.js` | Array.map | 使用箭頭函數對價格陣列套用 8 折優惠 |
| `04.js` | 陣列操作 | `pop()` / `unshift()` 操作陣列資料 |
| `05.js` | 閉包 | `multiplier(factor)` 回傳 `(n) => n * factor` |
| `06.js` | 自訂 filter | 自製 `myFilter(arr, callback)` 函式 |
| `07.js` | 物件陣列 | 使用者資料陣列操作 |
| `08.js` | 傳參考 | 陣列 pass-by-reference 示範 |
| `09.js` | setTimeout | 非同步計時器搭配箭頭函式 |
| `10.js` | reduce + 回呼 | `calculateTotal()` 合併購物車金額並套用折扣 |

---

## 07 — JavaScript 實踐習題

**路徑**：`07/`

10 個實作應用習題，模擬後端伺服器開發的常見模式。

| 檔案 | 主題 | 說明 |
|------|------|------|
| `01.js` | 物件建模 | 部落格文章物件（點符號 / 中括號存取） |
| `02.js` | req.body 模擬 | 模擬 HTTP 請求的 body 資料 |
| `03.js` | 文章陣列 | 多篇文章的陣列操作 |
| `04.js` | 路由參數 | 動態建立 `params` 物件模擬路由參數 |
| `05.js` | 非同步回呼 | 模擬資料庫查詢的 callback 模式 |
| `06.js` | JSON 處理 | `JSON.parse` / `JSON.stringify` 來回轉換 |
| `07.js` | SQL 查詢模擬 | 模擬參數化 SQL 查詢 + callback |
| `08.js` | 模板字串 | 使用 template literal + 三元運算子渲染 HTML |
| `09.js` | 摘要功能 | 將長字串截斷為 20 字的摘要 |
| `10.js` | Error-first callback | 檢查角色權限的錯誤優先回呼模式 |

---

## 05 - 網頁設計 — 專題

**路徑**：`網頁設計/05-opencode/`

完整的網頁設計專題，以部落格系統為核心，包含從簡易版到多執行緒版本的多個迭代。

```
網頁設計/05-opencode/
├── _doc/                          # 開發文件
│   ├── blog_code_detail.md        # 程式碼細節說明
│   ├── blog_session_transcript.md # 開發過程記錄
│   ├── blog-ai-HTML-chat.md       # AI 協作紀錄
│   └── blog-summary.md            # 專案摘要
├── blog/                          # 完整部落格應用
├── blog1simple/                   # 簡化版部落格
├── blog2user/                     # 使用者功能版
└── blogthreads/                   # 多執行緒版本
```

### 子專案比較

| 子專案 | 說明 | 認證 | 視圖數 | app.js 行數 |
|--------|------|------|--------|-------------|
| `blog1simple/` | 最簡 CRUD 部落格，單一使用者，無認證 | ❌ | 3 | ~70 行 |
| `blog2user/` | 多使用者部落格，含註冊/登入 | ✅ session + bcrypt | 5 | ~157 行 |
| `blog/` | 完整功能版，含「我的文章」、公開頁面、前端 JS | ✅ session + bcrypt | 7 | ~231 行 |
| `blogthreads/` | 完整功能 + 執行緒功能 | ✅ session + bcrypt | 7 | ~231 行 |

**每個版本均包含的架構**：
| 檔案/目錄 | 說明 |
|-----------|------|
| `app.js` | Express 應用入口 |
| `database.js` | SQLite 資料庫操作（sql.js） |
| `public/` | 前端靜態資源（CSS） |
| `views/` | EJS 模板 |

**共用技術棧**：
- **後端**：Node.js + Express.js
- **資料庫**：SQLite（透過 `sql.js` 操作）
- **模板引擎**：EJS
- **認證**：express-session + bcryptjs（blog2user / blog / blogthreads）

---

## 期中作業  - Blog — 新聞聚合平台

**路徑**：`Blog/`

基於 Node.js 的英文科技新聞快速瀏覽器，透過串接 NewsAPI 將全球最新科技新聞整合在單一頁面。

### 專案結構

```
Blog/
├── server.js              # Express 伺服器（API 代理）
├── package.json           # 專案依賴配置
├── .env                   # 環境變數（API_KEY）
├── .gitignore
├── public/
│   ├── index.html         # 前端頁面
│   ├── script.js          # 前端邏輯（Fetch API）
│   └── favicon.png
└── README.md
```

### 功能特點

- 後端代理 API 請求，解決 CORS 問題並保護 API Key
- 前端卡片式新聞展示（標題、描述、圖片）
- 非同步資料請求（Fetch API）
- 支援搜尋關鍵字查詢新聞

### 技術棧

| 技術 | 用途 |
|------|------|
| Node.js / Express.js | 後端伺服器 |
| Axios | 第三方 HTTP 請求（NewsAPI） |
| dotenv | 環境變數管理 |
| HTML5 / CSS3 | 前端頁面與樣式 |
| Vanilla JavaScript | 前端邏輯 |

### 快速啟動

```bash
cd Blog
# 在 .env 中填入 NEWSAPI_KEY
node server.js
# 開啟 http://localhost:3000
```

### API 路由

| 路由 | 說明 |
|------|------|
| `GET /api/news` | 預設回傳科技頭條新聞 |
| `GET /api/news?q=keyword` | 依關鍵字搜尋新聞 |

> 詳細內容請見 [`Blog/README.md`](./Blog/README.md)
>
> AI 協作紀錄：https://gemini.google.com/share/3ca7351b8292

---

## 🛠 全專案技術棧

| 技術 | 用途 |
|------|------|
| HTML5 / CSS3 | 網頁結構與樣式 |
| JavaScript (ES6+) | 前端邏輯與後端 (Node.js) |
| Node.js / Express.js | 後端伺服器（Blog, 網頁設計） |
| SQLite (sql.js) | 資料庫（網頁設計部落格） |
| EJS | 模板引擎（網頁設計） |
| Axios | HTTP 請求（Blog） |
| bcryptjs + express-session | 使用者認證（網頁設計） |

---

## 作業整合平台
- https://znn-07.github.io/_wp/homework/index.html

## 📊 統計

| 項目 | 數量 |
|------|------|
| 總作業數 | 8 項 |
| HTML 作業 | 2 項（01, 02） |
| JavaScript 習題 | 3 組共 30 題（04, 06, 07） |
| 全端專題 | 2 項（網頁設計, Blog） |
| 部落格子專案 | 4 個版本 |
| 全部狀態 | ✅ 已完成 |
