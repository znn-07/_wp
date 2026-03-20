const user = {
  name: "小明",
  age: 25
};

function introduce(person) {
  return `你好，我是 ${person.name}，今年 ${person.age} 歲。`;
}
console.log(introduce(user));