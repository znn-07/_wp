function checkAdmin(role, callback) {
  if (role !== "admin") {
    // 發生錯誤：第一個參數傳入錯誤訊息，立即 return 中止函數
    return callback("Access Denied");
  }

  // 成功：第一個參數傳入 null，第二個參數傳入成功資料
  callback(null, "Welcome");
}

// --- 測試狀況 1：非管理員 ---
checkAdmin("guest", (err, message) => {
  if (err) {
    console.log("失敗狀況：", err); // 輸出: Access Denied
    return; // 煞車，不執行後面的程式碼
  }
  console.log(message);
});

// --- 測試狀況 2：管理員 ---
checkAdmin("admin", (err, message) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("成功狀況：", message); // 輸出: Welcome
});