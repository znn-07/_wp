let listA = [1, 2];
let listB = [3, 4];

function process(a, b) {
  a.push(99); //推進
  b = [100];
}
process(listA, listB);

//listA: [1, 2, 99]
//listB: [3, 4]
//push(), pop(), a[0] = x，會影響外部原始物件
//使用 = 賦予新值或新物，不會影響外部原始物件