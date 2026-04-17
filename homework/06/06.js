function myFilter(arr, callback) {
  const result = []; // 準備一個新陣列來存放符合條件的元素

  for (let i = 0; i < arr.length; i++) {
    // 執行 callback，並傳入目前的元素
    // 如果 callback 回傳 true，就推入結果陣列
    if (callback(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

// 測試：篩選出大於 7 的數字
const numbers = [1, 5, 8, 12];
const filteredNumbers = myFilter(numbers, (num) => num > 7);

console.log(filteredNumbers); // 輸出: [8, 12]
