//
// INSTRUCTIONS
//
// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if
// the input string is valid.
//
// An input string is valid if:
//
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Every close bracket has a corresponding open bracket of the same type.
//

//
// EXAMPLES
//
// Example 1:
// Input: s = "()"
// Output: true
//
// Example 2:
// Input: s = "()[]{}"
// Output: true
//
// Example 3:
// Input: s = "(]"
// Output: false
//

//
// CODE
//
/*
isOpen [, {, (

isClose ], }, )

isSameType

*/
function solve(braces) {
   const stack = [];
   const bracePairs = {
      "]": "[",
      "}": "{",
      ")": "(",
   };
   const isValidClosure = (v) => stack[stack.length - 1] === counterParts[v];
   for (let i = 0; i < braces.length; i++) {
      const current = braces[i];
      if (current in bracePairs) {
         // close brace
         if (isValidClosure(current)) {
            stack.pop();
         } else {
            return false;
         }
      } else {
         // open brace
         stack.push(current);
      }
   }

   return stack.length === 0;
}

//
// TEST
//
// Console.logs and tests of your algorithm
console.log(solve("()[]"));
console.log(solve("([])"));
console.log(solve("([)]"));
console.log(solve("(["));
