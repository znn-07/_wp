const posts = [
  {id: 1, t: "A"}, 
  {id: 2, t: "B"}
];

let html = "";

// 使用 forEach 遍歷陣列
posts.forEach(post => {
  // 使用反引號 `` 與 ${} 語法進行字串拼接
  html += `<div>${post.t}</div>`;
});

console.log(html); 
// 輸出: <div>A</div><div>B</div>

//反引號可用於插值、多行支援（例如：html）

