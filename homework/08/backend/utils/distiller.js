const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const TurndownService = require('turndown');

const distill = async (url, htmlContent) => {
  const dom = new JSDOM(htmlContent, { url });
  const doc = dom.window.document;

  // 1. 抓取科技新聞主圖 (OG Image)
  const metaImg = doc.querySelector('meta[property="og:image"]');
  const mainImage = metaImg ? metaImg.getAttribute('content') : null;

  // 2. 使用 Readability 提取核心文字內容
  const reader = new Readability(doc);
  const article = reader.parse();

  if (!article) throw new Error("無法解析內容");

  // 3. 轉為 Markdown 格式
  const turndownService = new TurndownService();
  const markdownContent = turndownService.turndown(article.content);

  return {
    title: article.title,
    content: markdownContent,
    mainImage: mainImage,
    siteName: article.siteName || "科技來源"
  };
};

module.exports = distill;