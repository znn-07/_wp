const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 50 },
  { name: "Charlie", score: 72 }
];

for (let s of students) {
  if (s.score >= 60) {
    console.log(`${s.name} 及格了`);
  }
}