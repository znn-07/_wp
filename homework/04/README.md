## 習題 4

AI 問答 -- https://gemini.google.com/share/938a7200d8f5

## 我的測試結果

liuzhenna@liuzhennadeMacBook-Air 04 % node 01-score.js
正數

liuzhenna@liuzhennadeMacBook-Air 04 % node 02-score.js
2 * 1 = 2
2 * 2 = 4
2 * 3 = 6
2 * 4 = 8
2 * 5 = 10
2 * 6 = 12
2 * 7 = 14
2 * 8 = 16
2 * 9 = 18
2 * 10 = 20

liuzhenna@liuzhennadeMacBook-Air 04 % node 03-score.js
5
4
3
2
1
Blast off!

liuzhenna@liuzhennadeMacBook-Air 04 % node 04-score.js 
15

liuzhenna@liuzhennadeMacBook-Air 04 % node 05-score.js 
你好，我是 小明，今年 25 歲。

liuzhenna@liuzhennadeMacBook-Air 04 % node 06-score.js 
20

liuzhenna@liuzhennadeMacBook-Air 04 % node 07-score.js 
{"title":"JS 指南","author":"布蘭登"}
JS 指南

liuzhenna@liuzhennadeMacBook-Air 04 % node 08-score.js 
[ 12, 130, 44 ]

liuzhenna@liuzhennadeMacBook-Air 04 % node 09-score.js 
Alice 及格了
Charlie 及格了

liuzhenna@liuzhennadeMacBook-Air 04 % node 10-score.js 
60

## 摘要
這份練習透過 10 個核心範例，由淺入深地整合了 JavaScript 的邏輯控制（if、for、while）、資料結構（Array、Object、JSON）與功能封裝（function），展示了如何從基礎的數值運算到處理複雜的物件陣列，是掌握網頁前端邏輯與資料交換的關鍵基礎。


## 1.基礎數字判斷 (if/else)

題目： 寫一個函式判斷數字是正數、負數或零。

JavaScript
function checkNumber(num) {
  if (num > 0) return "正數";
  else if (num < 0) return "負數";
  else return "零";
}
console.log(checkNumber(10)); // "正數"

## 2.乘法表列印 (for loop)

題目： 使用 for 迴圈印出 2 的乘法表（2x1 到 2x10）。

JavaScript
for (let i = 1; i <= 10; i++) {
  console.log(`2 * ${i} = ${2 * i}`);
}
## 3.倒數計時器 (while loop)

題目： 使用 while 迴圈從 5 倒數到 1，最後印出 "Blast off!"。

JavaScript
let count = 5;
while (count > 0) {
  console.log(count);
  count--;
}
console.log("Blast off!");
## 4.陣列總和計算 (array + for)

題目： 寫一個函式傳入數字陣列，回傳所有數字的總和。

JavaScript
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
console.log(sumArray([1, 2, 3, 4, 5])); // 15
## 5.物件屬性讀取 (object)

題目： 建立一個 user 物件，包含姓名與年齡，並寫一個函式印出自我介紹。

JavaScript
const user = {
  name: "小明",
  age: 25
};

function introduce(person) {
  return `你好，我是 ${person.name}，今年 ${person.age} 歲。`;
}
console.log(introduce(user));
## 6.尋找陣列最大值 (array + if)

題目： 寫一個函式找出陣列中的最大數字。

JavaScript
function findMax(arr) {
  let max = arr[0];
  for (let num of arr) {
    if (num > max) max = num;
  }
  return max;
}
console.log(findMax([10, 5, 8, 20, 3])); // 20
## 7.JSON 格式轉換 (JSON)

題目： 將一個 JavaScript 物件轉為 JSON 字串，再轉回物件。

JavaScript
const book = { title: "JS 指南", author: "布蘭登" };

const jsonString = JSON.stringify(book);
console.log(jsonString); // '{"title":"JS 指南","author":"布蘭登"}'

const parsedObj = JSON.parse(jsonString);
console.log(parsedObj.title); // "JS 指南"
## 8.篩選陣列資料 (array + function)

題目： 寫一個函式，從陣列中篩選出大於 10 的數字。

JavaScript
function filterNumbers(arr) {
  return arr.filter(num => num > 10);
}
console.log(filterNumbers([5, 12, 8, 130, 44])); // [12, 130, 44]
## 9.處理 JSON 物件陣列 (object + array + for)

題目： 有一組學生資料，請印出所有及格（>=60）學生的姓名。

JavaScript
const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 50 },
  { name: "Charlie", score: 72 }
];

for (let s of students) {
  if (s.score >= 60) {
    console.log(`${s.name} 及格了`);
  }
}
## 10.簡易購物車計算 (advanced object)

題目： 計算購物車內物品的總價。

JavaScript
const cart = [
  { item: "Apple", price: 10, quantity: 3 },
  { item: "Banana", price: 5, quantity: 6 }
];

function calculateTotal(items) {
  let total = 0;
  items.forEach(product => {
    total += product.price * product.quantity;
  });
  return total;
}
console.log(totalPrice = calculateTotal(cart)); // 60
