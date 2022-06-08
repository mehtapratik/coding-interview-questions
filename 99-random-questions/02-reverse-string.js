function reverseString(str) {
  return str.split("").reverse().join("");
}

// function reverseString(str) {
//   var newString = "";
//   for (var i = str.length - 1; i >= 0; i--) {
//     newString += str[i];
//   }
//   return newString;
// }

// function reverseString(str) {
//   if (str === "") {
//     return str;
//   }
//   return reverseString(str.substr(1)) + str.charAt(0);
// }

console.log(reverseString("pratik mehta"));
