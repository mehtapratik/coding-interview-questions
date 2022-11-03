//
// INSTRUCTIONS
//
// Given an expression containing digits and operations (+, -, *), find all possible ways in
// which the expression can be evaluated by grouping the numbers and operators using parentheses.

//
// EXAMPLE
//
// Input: "1+2*3"
// Output: 7, 9
// Explanation: 1+(2*3) => 7 and (1+2)*3 => 9
// Input: "2*3-4-5"
// Output: 8, -12, 7, -7, -3
// Explanation: 2*(3-(4-5)) => 8, 2*(3-4-5) => -12, 2*3-(4-5) => 7, 2*(3-4)-5 => -7, (2*3)-4-5 => -3
//

//
// CODE
//
const diff_ways_to_evaluate_expression = function (input) {
   return evaluate({}, input);
};

function evaluate(map, input) {
   if (input in map) {
      // Serve from cache (memoization)
      return map[input];
   }

   const result = [];
   if (
      !(
         input.includes("-") ||
         input.includes("+") ||
         input.includes("*") ||
         input.includes("/")
      )
   ) {
      result.push(Number(input));
   } else {
      for (let i = 0; i < input.length; i++) {
         const char = input[i];

         // non-number character indicates it's one of the operator
         if (isNaN(Number(char))) {
            const leftSide = evaluate(map, input.substring(0, i));
            const rightSide = evaluate(map, input.substring(i + 1));

            for (let left of leftSide) {
               for (let right of rightSide) {
                  switch (char) {
                     case "+":
                        result.push(left + right);
                        break;
                     case "-":
                        result.push(left - right);
                        break;
                     case "*":
                        result.push(left * right);
                        break;
                     case "/":
                        result.push(left / right);
                        break;
                  } // switch
               } // rightSide
            } // leftSide
         } // isNaN
      } // for loop
   } // if

   // Save outputs in cache (memoization) so we may be able to avoid calculation for same input in future
   map[input] = result;
   return result;
}

//
// TEST
//
console.log(diff_ways_to_evaluate_expression("1+2*3"));
console.log(diff_ways_to_evaluate_expression("2*3-4-5"));

//
// COMPLEXITY ANALYSIS
//
// N is the length of the string
// Time complexity -> O(N * 2^N) because each number have at max 2 possibilities (2^N) and you will have to iterate through entire string (N)
// to calculate the expression output
//
// Space complexity -> O(2^N) cause you will need 2^N space in resulting array to store all possible outcome of the given
// expression
//
