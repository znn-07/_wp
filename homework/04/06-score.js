function findMax(arr) {
  let max = arr[0];
  for (let num of arr) {
    if (num > max) max = num;
  }
  return max;
}
console.log(findMax([10, 5, 8, 20, 3])); // 20