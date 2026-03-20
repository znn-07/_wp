const book = { title: "JS 指南", author: "布蘭登" };

const jsonString = JSON.stringify(book);
console.log(jsonString); // '{"title":"JS 指南","author":"布蘭登"}'

const parsedObj = JSON.parse(jsonString);
console.log(parsedObj.title); // "JS 指南"