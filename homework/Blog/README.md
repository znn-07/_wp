# 我與AI對話內容

- Gemini 初次建置對話: https://gemini.google.com/share/3ca7351b8292
- opencode 對話記錄如下:

```
User: 截圖 2026-06-05 10.10.14
      我想讓我的網站可以看更多新聞，最多截取一個月內的新聞

Assistant: 查看了專案結構與程式碼後，進行以下修改：
  - server.js: 新增 page/pageSize 參數、everything 模式自動加上 from 日期限制（一個月）、回傳 totalResults
  - script.js: 新增分頁狀態追蹤、Load More 按鈕、append 追加模式渲染
  - index.html: 新增載入更多新聞按鈕，移除靜態範例卡片

User: 網站新聞擴展至一年內，然後頁面分成1,2,3,4,....之類的

Assistant: 將日期範圍改為 30 天（NewsAPI 免費方案限制），並把「載入更多」改為頁碼導航：
  - server.js: from 改為 30 天前（免費方案上限，若升級付費改為 365 即可）
  - script.js: 移除 Load More，改用 pageNav 分頁元件，renderPageNav() 產生 1,2,3,... 頁碼按鈕，點擊切頁並滾回頂部
  - index.html: 加入 .page-nav / .page-num CSS 樣式及分頁容器

User: 幫我修改一下README.md並加入我剛剛與你的對話內在第一行
Assistant: 將完整對話記錄寫入 README.md 開頭
```

本專案皆是由AI協作完成的。

## 🚀 EnglishNews 英文新聞快速瀏覽器

這是一個基於 Node.js 打造的輕量級科技新聞聚合平台。透過串接第三方 API，將全球最新的科技產業動態整合在一個簡潔的網頁介面中，方便使用者快速瀏覽。


## 🛠 開發環境與技術棧

- **整合開發環境 (IDE)**: Visual Studio Code (VS Code)
- **後端環境**: Node.js (v18+)
- **網頁伺服器**: Express.js
- **資料請求工具**: Axios (用於串接 NewsAPI)
- **前端技術**: HTML5, CSS3, Vanilla JavaScript

## 📁 專案資料夾結構

```text
Blog/
├── node_modules/
├── public/
│   ├── favicon.png
│   ├── index.html
│   └── script.js
├── .env                
├── .gitignore          
├── package-lock.json
├── package.json
├── README.md
└── server.js
```
## 📝 實作過程與步驟紀錄

### 1. 專案初始化與環境配置

- 在 VS Code 整合終端機執行 `npm init -y` 建立設定檔。
- 安裝核心套件：`npm install express axios`。
- 配置 `.gitignore` 確保大型依賴庫 `node_modules` 不會被錯誤地上傳。

### 2. 後端 API 代理服務 (`server.js`)

- 建立 `/api/news` 路由，作為前端與 NewsAPI 之間的橋樑。
- **原因**：前端直接呼叫第三方 API 常會遇到 CORS 跨域限制，透過 Node.js 後端代理請求可解決此問題並保護 API Key。

### 3. 前端介面渲染 (`public/index.html`)

- 使用 Fetch API 非同步向自定義的後端端點請求資料。
- 利用 `forEach` 遍歷新聞陣列，並透過動態 DOM 操作將新聞標題、描述、圖片渲染為卡片式 UI。

## 🔍 開發障礙排除紀錄 (Troubleshooting)
在開發過程中，我遇到了幾個關鍵問題並成功修復：

-  **npm 指令無法辨識**：
- - **原因**：電腦尚未安裝 Node.js 或環境變數 (Path) 未設定。
- - **解法**：下載 Node.js LTS 版本安裝並重啟 VS Code。

-  **修改代碼未生效**：
- - **原因**：VS Code 中的檔案未儲存（標籤頁顯示白色圓點），導致 Node.js 持續執行舊版快取。
- - **解法**：執行 `Ctrl + S` 存檔並重啟 `node server.js` 進程。

-  **資料抓取失敗 (500 Error)**：
- - **原因**：API Key 尚未生效或填寫位置錯誤。
- - **解法**：透過 `console.log(error.response.data)` 觀察後端回傳的具體 JSON 報錯資訊，精準定位問題。

## 🚀 如何快速啟動

1. 在 server.js 的 API_KEY 變數中填入 NewsAPI 金鑰。

2. 在 VS Code 終端機執行：

```bash
node server.js
```
3. 打開瀏覽器訪問：http://localhost:3000

## 🔐 安全規範與環境變數設定

為了確保資安防護，本專案**嚴禁將任何明文的 API Key、密碼或私鑰直接寫在程式碼中並推送到 Git 儲存庫**。我們統一使用環境變數（Environment Variables）來管理敏感資料。

 1. 本地環境變數設定 (`.env`)
在專案的根目錄（`Blog/`）下，已透過 `.gitignore` 排除環境設定檔。請在本地專案根目錄下自行建立一個 **`.env`** 檔案，並依據以下格式填入您的金鑰：

```env
# .env 檔案內容
API_KEY=your_actual_api_key_here
PORT=3000
```

## 🌐 伺服器運行生命週期 (Runtime Lifecycle)

本專案採用 **Node.js (Runtime)** 作為後端環境，伺服器必須處於「執行狀態」才能處理請求：
* **持續監聽 (Listening)**：當執行 `node server.js` 後，程式會佔用一個 Port（如本例的 3000）來等待瀏覽器連線。
* **關機現象**：若停止 Node.js 進程，該 Port 會立即釋放，導致瀏覽器找不到服務窗口，出現連線被拒絕的錯誤。
* **生產環境建議**：在實際商業應用中，會使用 `pm2` 等工具讓程式在背景 24 小時運作，避免關閉終端機導致服務中斷。

## 結論 
本專案是大部分是透過gemini製作的，然後我在跟著AI一步一步的學習，不僅看懂了程式是如何運作的，也懂了這些程式語言，雖然能力還沒有到可以從頭自己建立一個網站，但是可以透過更多練習去熟悉製作網站的過程，希望未來可以自己為主AI為輔去建立一個屬於自己的網站。
