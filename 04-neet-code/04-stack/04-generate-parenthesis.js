//
// INSTRUCTIONS
//
// Given n pairs of parentheses, write a function to generate all combinations of
// well-formed parentheses.
//

//
// EXAMPLES
//
// Example 1:
// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]
//
// Example 2:
// Input: n = 1
// Output: ["()"]
//

//
// CODE
//
function solve(n) {
   const permutations = [];
   return recursion(new Array(n * 2).fill(0), 0, 0, 0, []);

   function recursion(braces, index, openCount, closeCount) {
      if (closeCount === n) {
         permutations.push(braces.join(""));
         return permutations;
      }
      if (openCount < n) {
         braces[index] = "(";
         recursion(braces, index + 1, openCount + 1, closeCount);
      }

      if (closeCount < openCount) {
         braces[index] = ")";
         recursion(braces, index + 1, openCount, closeCount + 1);
      }

      return permutations;
   }
}

//
// TEST
//
console.log(solve(3));
