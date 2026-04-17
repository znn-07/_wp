function multiplier(factor) {
  // 回傳一個接受 n 的箭頭函數
  return (n) => n * factor;
}

// 範例用法
const double = multiplier(2);
console.log(double(10)); // 輸出: 20

const triple = multiplier(3);
console.log(triple(10)); // 輸出: 30