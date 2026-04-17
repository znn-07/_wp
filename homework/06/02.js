// 1. 使用傳統匿名函數的 IIFE
(function() {
  const count = 100;
  console.log("Count is: " + count);
})();

// 2. 使用箭頭函數的 IIFE (更簡潔)
(() => {
  const count = 100;
  console.log(`Count is: ${count}`);
})();

// 驗證外部存取
try {
  console.log(count);
} 
catch (e) {
  console.log("外部無法存取 count: " + e.message);
}