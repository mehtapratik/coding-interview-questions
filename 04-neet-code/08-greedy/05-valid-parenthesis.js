//
// INSTRUCTIONS
//
// Given a string s containing only three types of characters: '(', ')' and '*',
// return true if s is valid.
//
// The following rules define a valid string:
//
// Any left parenthesis '(' must have a corresponding right parenthesis ')'.
// Any right parenthesis ')' must have a corresponding left parenthesis '('.
// Left parenthesis '(' must go before the corresponding right parenthesis ')'.
// '*' could be treated as a single right parenthesis ')' or a single left
// parenthesis '(' or an empty string "".
//

//
// EXAMPLES
//
// Example 1:
// Input: s = "()"
// Output: true
//
// Example 2:
// Input: s = "(*)"
// Output: true
//
// Example 3:
// Input: s = "(*))"
// Output: true
//

//
// CODE
//
// ())
function solve(s) {
   let [opens, closes] = [0, 0];

   for (let c of s) {
      opens += c === "(" ? 1 : -1;
      closes += c === ")" ? -1 : 1;

      // this means braces were closed before they were opened.
      if (closes < 0) {
         break;
      }

      // negative value at this stage simply means additional "*" which can be ignored
      // because if it were ")" closes would have been negative and broke out of the
      // loop
      opens = Math.max(opens, 0);
   }

   return opens === 0;
}

//
// TEST
//
console.log(solve("((*))"));
console.log(solve("((*)"));
console.log(solve("(*))"));
console.log(solve("(*)))"));
console.log(solve("())(*))"));
