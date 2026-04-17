const users = [
  {name: "Alice", age: 25}, 
  {name: "Bob", age: 17}
];

// 使用 filter 篩選出成年人 (age >= 18)
const adults = users.filter(user => user.age >= 18);

console.log(adults); 
// 輸出: [{name: "Alice", age: 25}]