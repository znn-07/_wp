const cron = require('node-cron');
const Parser = require('rss-parser');
const axios = require('axios');
const Post = require('../models/Post');
const distill = require('../utils/distiller');

const parser = new Parser();

// 鎖定科技相關來源
const TECH_SOURCES = [
  'https://technews.tw/feed/',                // 科技新報
  'https://feeds.feedburner.com/TechCrunch/'  // TechCrunch
];

const startAggregator = () => {
  // 每小時執行一次 (0 * * * *)，測試時可以改為 '*/5 * * * *' (每五分鐘)
  cron.schedule('0 * * * *', async () => {
    console.log('--- [科技監控中] 開始掃描最新技術動向 ---');
    
    for (const url of TECH_SOURCES) {
      try {
        const feed = await parser.parseURL(url);
        
        for (const item of feed.items) {
          // 檢查資料庫是否已存在該文章，避免重複
          const exists = await Post.findOne({ sourceUrl: item.link });
          if (!exists) {
            console.log(`發現新文章：${item.title}`);
            
            // 抓取網頁原始碼並洗滌
            const response = await axios.get(item.link);
            const pureData = await distill(item.link, response.data);
            
            // 存入 MongoDB
            await Post.create({
              title: pureData.title,
              content: pureData.content,
              mainImage: pureData.mainImage,
              sourceUrl: item.link,
              siteName: pureData.siteName,
              tags: item.categories || []
            });
          }
        }
      } catch (err) {
        console.error(`抓取來源 ${url} 失敗:`, err.message);
      }
    }
    console.log('--- [任務完成] 資料庫已更新 ---');
  });
};

module.exports = startAggregator;