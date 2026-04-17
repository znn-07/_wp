function calculateTotal(cart, discountFunc) {
  // 1. 先計算 cart 內所有價格的總和
  // reduce 的第一個參數是累加器 (sum)，第二個是目前元素 (price)
  const subtotal = cart.reduce((sum, price) => sum + price, 0);
  
  // 2. 將總和傳入 discountFunc 處理，並回傳最終結果
  return discountFunc(subtotal);
}

// 測試：傳入價格陣列，並使用匿名函數扣除 50 元
const cart = [100, 200, 300];
const finalPrice = calculateTotal(cart, (total) => total - 50);

console.log(finalPrice); // 預期輸出: 550 (600 - 50)