function reverseString(str) {
  let result = "";
  for (let char of str) {
    result = char + result;
  }
  return result;
}

console.log(reverseString("hello"));