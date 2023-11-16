//
// INSTRUCTIONS
//
// You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.
//
// Evaluate the expression. Return an integer that represents the value of the expression.
//
// Note that:
// The valid operators are '+', '-', '*', and '/'.
// Each operand may be an integer or another expression.
// The division between two integers always truncates toward zero.
// There will not be any division by zero.
// The input represents a valid arithmetic expression in a reverse polish notation.
// The answer and all the intermediate calculations can be represented in a 32-bit integer.
//

//
// EXAMPLES
//
// Example 1:
// Input: tokens = ["2","1","+","3","*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9
//
// Example 2:
// Input: tokens = ["4","13","5","/","+"]
// Output: 6
// Explanation: (4 + (13 / 5)) = 6
//
// Example 3:
// Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
// Output: 22
// Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
// = ((10 * (6 / (12 * -11))) + 17) + 5
// = ((10 * (6 / -132)) + 17) + 5
// = ((10 * 0) + 17) + 5
// = (0 + 17) + 5
// = 17 + 5
// = 22
//

//
// CODE
//
function evalRPN(tokens) {
   const stack = [];
   const operations = new Map({
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => Math.trunc(a / b),
   });
   const isOperator = (token) => operations.has(token);
   for (let token of tokens) {
      if (!isOperator(token)) {
         stack.push({ num: Number(token), exp: Number(token) });
         continue;
      }

      if (stack.length < 2) {
         return Number.NaN;
      }
      const y = stack.pop();
      const x = stack.pop();
      const exp = "(" + x.exp + token + y.exp + ")";
      stack.push({ num: operations.get(token)(x.num, y.num), exp });
   }

   if (stack.length === 1) {
      return stack.pop().num;
   }
   return Number.NaN;
}

//
// TEST
//
console.log(evalRPN(["4", "-2", "/", "2", "-3", "-", "-"]));
console.log(evalRPN(["4", "13", "5", "/", "+"]));
console.log(
   evalRPN([
      "10",
      "6",
      "9",
      "3",
      "+",
      "-11",
      "*",
      "/",
      "*",
      "17",
      "+",
      "5",
      "+",
   ])
);
