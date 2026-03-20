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