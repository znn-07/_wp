# 💻 作業統整平台

課程作業展示與管理系統，整合所有作業於單一平台。

>  README 與 `index.html` 是由 [opencode](https://opencode.ai)（AI 程式碼助手）協作整理產出。

**入口首頁**：`index.html` — 整合 8 項作業的單頁應用，具備搜尋過濾、卡片式 UI，以及內建程式碼檢視器（支援語法高亮、可拖曳分割原始碼 / 預覽雙面板，HTML 檔案可直接即時預覽）。

---

## 📂 目錄總覽

| 目錄 | 標題 | 類別 | 狀態 |
|------|------|------|------|
| [`01/`](#01--關於我) | 關於我 — HTML 個人簡介 | HTML/CSS | ✅ 已完成 |
| [`02/`](#02--html-基礎) | HTML 基礎 — 服務回饋表單 | HTML/CSS | ✅ 已完成 |
| [`03/`](#03--javascript-入門) | JavaScript 入門 | JavaScript | ✅ 已完成 |
| [`04/`](#04--javascript-習題集-10-題) | JavaScript 習題集（10 題） | JavaScript | ✅ 已完成 |
| [`06/`](#06--javascript-進階習題) | JavaScript 進階習題 | JavaScript | ✅ 已完成 |
| [`07/`](#07--javascript-實踐習題) | JavaScript 實踐習題 | JavaScript | ✅ 已完成 |
| [`網頁設計/`](#網頁設計--專題) | 網頁設計專題 | Fullstack | ✅ 已完成 |
| [`Blog/`](#blog--新聞聚合平台) | 新聞聚合平台（Node.js） | Fullstack | ✅ 已完成 |

---

## 01 — 關於我

**路徑**：`01/`

一個個人簡介網頁，展示 HTML 基礎結構與排版。

| 檔案 | 說明 |
|------|------|
| `aboutme.html` | 個人簡介頁面 |

---

## 02 — HTML 基礎

**路徑**：`02/`

一個完整的服務回饋表單（Experience Feedback），包含：

- 星級評分元件（純 CSS 實現）
- 聯絡資訊欄位（姓名、電話、Email）
- 服務品質評分（速度、專業度、環境）
- 未來意願選擇（Yes / No / Maybe）
- 意見回饋文字區
- 響應式設計

| 檔案 | 說明 |
|------|------|
| `html` | 服務回饋表單（含完整 CSS 樣式） |

---

## 03 — JavaScript 入門

**路徑**：`03/`

JavaScript 基本語法練習。

| 檔案 | 說明 |
|------|------|
| `hello.js` | JavaScript 入門範例 |
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

---

## 06 — JavaScript 進階習題

**路徑**：`06/`

10 個進階 JavaScript 習題，循序漸進強化程式邏輯。

| 檔案 | 說明 |
|------|------|
| `01.js` ~ `10.js` | 進階 JavaScript 練習題 |

---

## 07 — JavaScript 實踐習題

**路徑**：`07/`

10 個實作應用習題，聚焦實際應用場景。

| 檔案 | 說明 |
|------|------|
| `01.js` ~ `10.js` | JavaScript 實踐應用練習 |

---

## 網頁設計 — 專題

**路徑**：`網頁設計/`

完整的網頁設計專題，以部落格系統為核心，包含從簡易版到多執行緒版本的多個迭代。

```
網頁設計/
└── 05-opencode/
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

每個部落格版本均包含：
| 檔案 | 說明 |
|------|------|
| `app.js` | Express 應用入口 |
| `database.js` | SQLite 資料庫操作 |
| `public/` | 前端靜態資源 |
| `views/` | EJS 模板 |

| 子專案 | 說明 |
|--------|------|
| `blog1simple/` | 最簡版本 — 基礎 CRUD 部落格 |
| `blog/` | 完整功能版 — 更多功能擴充 |
| `blog2user/` | 使用者版 — 加入使用者認證與權限 |
| `blogthreads/` | 多執行緒版 — 效能優化示範 |

---

## Blog — 新聞聚合平台

**路徑**：`Blog/`

一個基於 Node.js 的英文科技新聞快速瀏覽器，透過串接 NewsAPI 將全球最新科技新聞整合在單一頁面。

| 檔案 | 說明 |
|------|------|
| `server.js` | Express 伺服器（API 代理） |
| `package.json` | 專案依賴配置 |
| `public/index.html` | 前端頁面 |
| `public/script.js` | 前端邏輯 |
| `.env` | 環境變數（API Key） |

### 功能特點

- 後端代理 API 請求，解決 CORS 問題並保護 API Key
- 前端卡片式新聞展示（標題、描述、圖片）
- 非同步資料請求（Fetch API）

### 快速啟動

```bash
cd Blog
# 在 .env 中填入 NEWSAPI_KEY
node server.js
# 開啟 http://localhost:3000
```

> 詳細內容請見 [`Blog/README.md`](./Blog/README.md)

---

## 🛠 技術棧

| 技術 | 用途 |
|------|------|
| HTML5 / CSS3 | 網頁結構與樣式 |
| JavaScript (ES6+) | 前端邏輯與後端(Node.js) |
| Node.js / Express.js | 後端伺服器 (Blog, 網頁設計) |
| SQLite | 資料庫 (網頁設計) |
| EJS | 模板引擎 (網頁設計) |
| Axios | HTTP 請求 (Blog) |

## 🚀 快速導覽

直接在瀏覽器打開 `index.html` 即可進入作業統整平台，使用搜尋或分類過濾快速找到想瀏覽的作業。
