function fetchData(id, callback) {
  // 模擬資料庫查詢的結果
  const fakeData = {
    id: id,
    status: "success"
  };

  // 依照 Error-First 慣例：
  // 第一個參數是錯誤物件 (null 代表沒事)
  // 第二個參數是實際得到的資料
  callback(null, fakeData);
}

// --- 測試調用 ---

fetchData(101, (err, post) => {
  if (err) {
    console.error("發生錯誤了:", err);
    return;
  }

  console.log("成功抓取資料:", post);
  // 輸出: 成功抓取資料: { id: 101, status: "success" }
});