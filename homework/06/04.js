function cleanData(arr) {
  // 1. 移除最後一個元素
  arr.pop(); 
  
  // 2. 在最前面加上 "Start"
  arr.unshift("Start");
}

// 驗證
let myData = [1, 2, 3];
cleanData(myData);

console.log(myData); // 輸出: ["Start", 1, 2]