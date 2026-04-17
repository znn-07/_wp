const post = {
  id: 1,
  title: "Hello World",
  content: "Markdown content"
};

// 1. 點符號 (Dot notation)
console.log(post.title); // 輸出: Hello World

// 2. 中括號 (Bracket notation)
// 注意：中括號內必須是字串格式
console.log(post["title"]); // 輸出: Hello World

//屬性名是確定的、標準的，使用 post.title。
//屬性名是從其他地方傳過來的「變數」，或是名稱不規則，要換成 post[variable]。
