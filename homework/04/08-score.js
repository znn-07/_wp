function filterNumbers(arr) {
  return arr.filter(num => num > 10);
}
console.log(filterNumbers([5, 12, 8, 130, 44])); // [12, 130, 44]