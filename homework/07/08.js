const user = "Guest";

// 使用反引號與三元運算子判斷
const html = `<h1>Welcome, ${user ? user : "Stranger"}</h1>`;

console.log(html); // 輸出: <h1>Welcome, Guest</h1>

// --- 測試如果 user 為空 (例如 null 或空字串) ---
const noUser = "";
const html2 = `<h1>Welcome, ${noUser ? noUser : "Stranger"}</h1>`;

console.log(html2); // 輸出: <h1>Welcome, Stranger</h1>