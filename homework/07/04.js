// 1. 建立空物件模擬 params
const params = {};

// 2. 動態新增鍵為 "id"，值為 99 的屬性
params.id = 99; 

// 或者使用中括號寫法：params["id"] = 99;

// 3. 印出物件
console.log(params); 
// 輸出: { id: 99 }

// 驗證存取
console.log(`The ID from URL is: ${params.id}`);