const express = require('express'); // 用來建立 Express 伺服器
const axios = require('axios'); // 用來發送 HTTP 請求到 NewsAPI
const path = require('path'); // 用來處理檔案路徑，確保在不同作業系統上都能正確運行

const app = express(); // 建立 Express 應用程式
const PORT = 3000; // 定義伺服器監聽的埠號

// server.js
require('dotenv').config();

// 透過 process.env 讀取
const apiKey = process.env.API_KEY;

// 之後在程式碼中就用 apiKey 這個變數替代原本明文的字串
console.log(`你的 API Key 是: ${apiKey}`);

app.use(express.static('public')); // 設定 Express 服務靜態檔案，讓前端可以直接訪問 public 資料夾中的檔案

app.get('/api/news', async (req, res) => {
    const query = req.query.q;
    const page = parseInt(req.query.page) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize) || 20, 100);
    console.log(`收到請求，搜尋關鍵字: ${query || '無(預設科技頭條)'}，頁碼: ${page}`);

    try {
        let params = {
            language: 'en',
            apiKey: apiKey,
            page,
            pageSize
        };

        let url = ''; // 根據是否有搜尋關鍵字來決定使用哪個 API 端點

        if (query) {
            url = 'https://newsapi.org/v2/everything';
            params.q = query;
            params.sortBy = 'publishedAt';
            const fromDate = new Date();
            fromDate.setDate(fromDate.getDate() - 30);
            params.from = fromDate.toISOString().split('T')[0];
        } else {
            url = 'https://newsapi.org/v2/top-headlines'; 
            params.category = 'technology';
        }

        const response = await axios.get(url, { params });
        res.json({
            articles: response.data.articles,
            totalResults: response.data.totalResults,
            page,
            pageSize
        });

    } catch (error) {
        console.error("❌ 發生錯誤:", error.message);
        res.status(500).json({ message: '搜尋失敗', detail: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ 伺服器啟動成功：http://localhost:${PORT}`); // 啟動伺服器並監聽指定的埠號
    console.log(`💡 提示：請開啟瀏覽器訪問上述網址`);
});