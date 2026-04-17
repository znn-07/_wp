// 定義 mathTool 函數
function mathTool(num1, num2, action) {
  // 執行傳入的 action，並將 num1 與 num2 作為參數傳給它
  return action(num1, num2);
}

// 2. 傳入相加的匿名函數 (箭頭函數寫法)
const addResult = mathTool(10, 5, (a, b) => a + b);

// 2. 傳入相減的匿名函數 (箭頭函數寫法)
const subtractionResult = mathTool(10, 5, (a, b) => a - b);

// 輸出結果
console.log(addResult);    // console.log 是debug的用途
console.log(subtractionResult);
