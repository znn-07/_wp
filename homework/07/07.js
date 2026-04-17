// 1. 定義模擬資料庫查詢的函數
function fakeGet(sql, params, callback) {
  // 在真實情況中，這裡會發生：
  // a. 建立網路連線
  // b. 將 sql 指令與 params 送往資料庫
  // c. 等待硬碟讀取資料
  
  console.log(`[系統訊息] 正在執行 SQL: ${sql}，參數為: ${params}`);

  // 模擬資料庫回傳的資料
  const row = { 
    id: 1, 
    title: "測試文章", 
    content: "這是內容" 
  };

  // 2. 模擬查詢完成，呼叫 Callback (Error-First 模式)
  // 第一個參數是錯誤 (null)，第二個是查詢結果 (row)
  callback(null, row);
}

// 3. 測試呼叫：傳入 SQL 與匿名回呼函數
fakeGet("SELECT * FROM posts WHERE id = ?", [1], (err, data) => {
  if (err) {
    console.error("資料庫查詢失敗:", err);
    return;
  }

  // 4. 印出文章的標題
  console.log("抓取到的文章標題是:", data.title);
});