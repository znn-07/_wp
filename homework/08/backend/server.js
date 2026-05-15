const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const startAggregator = require('./services/aggregator');

const app = express();
app.use(cors());
app.use(express.json());

// 連接資料庫 (請確保你的 MongoDB 已啟動)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tech_minimalist')
  .then(() => {
    console.log("MongoDB 連線成功");
    // 啟動新聞自動聚合機器人
    startAggregator();
  })
  .catch(err => console.error("資料庫連線失敗:", err));

// 簡單的搜尋 API
app.get('/api/news/search', async (req, res) => {
  const { q } = req.query;
  const results = await require('./models/Post').find(
    q ? { $text: { $search: q } } : {},
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" }, createdAt: -1 }).limit(20);
  
  res.json(results);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`後端伺服器運行於埠號 ${PORT}`));