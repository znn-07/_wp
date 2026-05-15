const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  mainImage: String,          // 科技新聞的主圖
  sourceUrl: { type: String, unique: true }, // 防止重複抓取
  siteName: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

// 建立全文檢索索引
postSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Post', postSchema);