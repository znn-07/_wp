const contents = [
  "Very long content here", 
  "Another Very long content here", 
  "3rd Very long content here"
];

// 使用 map 遍歷並截斷字串
const truncatedContents = contents.map(str => {
  // 取出索引 0 到 10 的字元，並拼接 "..."
  return str.substring(0, 10) + "...";
});

console.log(truncatedContents);
// 輸出: ["Very long ...", "Another Ve...", "3rd Very l..."]