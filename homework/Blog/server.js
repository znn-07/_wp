const express = require('express'); // 用來建立 Express 伺服器
const axios = require('axios'); // 用來發送 HTTP 請求到 NewsAPI
const path = require('path'); // 用來處理檔案路徑，確保在不同作業系統上都能正確運行

const app = express(); // 建立 Express 應用程式
const PORT = 3000; // 定義伺服器監聽的埠號
//  NewsAPI API 金鑰
const API_KEY = 'a761338145ad49d4a931ded60eacb652'; 

app.use(express.static('public')); // 設定 Express 服務靜態檔案，讓前端可以直接訪問 public 資料夾中的檔案

app.get('/api/news', async (req, res) => {
    const query = req.query.q;
    console.log(`收到請求，搜尋關鍵字: ${query || '無(預設科技頭條)'}`);

    try {
        let params = {
            language: 'en',
            apiKey: API_KEY
        };

        let url = '';

        if (query) {
            // 搜尋模式
            url = 'https://newsapi.org/v2/everything'; 
            params.q = query;
            params.sortBy = 'publishedAt'; // 增加排序讓結果更準確
        } else {
            // 預設頭條模式
            url = 'https://newsapi.org/v2/top-headlines'; 
            params.category = 'technology';
        }

        const response = await axios.get(url, { params });
        res.json(response.data.articles);

    } catch (error) {
        console.error("❌ 發生錯誤:", error.message);
        res.status(500).json({ message: '搜尋失敗', detail: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ 伺服器啟動成功：http://localhost:${PORT}`); // 啟動伺服器並監聽指定的埠號
    console.log(`💡 提示：請開啟瀏覽器訪問上述網址`);
});