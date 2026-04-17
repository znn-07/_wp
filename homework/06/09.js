const tasks = ["Task", "Completed"];

// setTimeout(callback, delay)
setTimeout(() => {
  // 將陣列元素用空格組合起來
  const message = tasks.join(" ");
  console.log(message);
}, 2000); // 2000 毫秒 = 2 秒