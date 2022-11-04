//
// INSTRUCTIONS
//
// For a given number ‘N’, write a function to generate all combination of ‘N’ pairs of balanced parentheses.
//

//
// EXAMPLE
//
// Example 1:
// Input: N=2
// Output: (()), ()()
//
// Example 2:
// Input: N=3
// Output: ((())), (()()), (())(), ()(()), ()()()
//

/*
INPUT -> 3
Method 1 - Track open/close braces
start -> []
1     -> [(]
2     -> [((, ()]
3     -> [(((, ((), ()(]
4     -> [(((),(()(, (()), ()((, ()()]
5     -> [((()),(()(), (())(, ()((), ()()(]
6     -> [((())),((())),(())(), ()(()), ()()()]

Method 2 - Prefix, Suffix and Hugging braces
start -> ['']
1     -> [()]
2     -> [(()), ()()]
3     -> [((())), (())(), ()(()), (()()), ()()()]
*/

//
// PREPARATION
//
class Braces {
   constructor(str, openCount, closeCount) {
      this.str = str;
      this.openCount = openCount;
      this.closeCount = closeCount;
   }
}

//
// CODE
//
const generate_valid_parentheses = function (num) {
   // Method 1 - Track open/close braces
   return recursiveSolution(Array(num * 2), 0, 0, 0, num, []);

   // Method 2 - Prefix, Suffix and Hugging braces
   // return recursiveSolution2(num);

   function recursiveSolution(
      strArray,
      strIndex,
      openCount,
      closeCount,
      n,
      results
   ) {
      if (closeCount === n) {
         results.push(strArray.join(""));
         return results;
      }
      if (openCount < n) {
         strArray[strIndex] = "(";
         recursiveSolution(
            strArray,
            strIndex + 1,
            openCount + 1,
            closeCount,
            n,
            results
         );
      }
      if (openCount > closeCount) {
         strArray[strIndex] = ")";
         recursiveSolution(
            strArray,
            strIndex + 1,
            openCount,
            closeCount + 1,
            n,
            results
         );
      }

      return results;
   }

   function recursiveSolution2(num) {
      if (num === 1) {
         return ["()"];
      }

      const results = [];
      const braces = recursiveSolution2(num - 1);
      const BRACE_COUNT = braces.length;
      for (let i = 0; i < BRACE_COUNT; i++) {
         const brace = braces.shift();
         results.push(`${brace}()`);
         if (i > 0) {
            results.push(`()${brace}`);
         }
         results.push(`(${brace})`);
      }

      return results;
   }
};

//
// TEST
//
console.log(generate_valid_parentheses(2));
console.log(generate_valid_parentheses(3));

//
// COMPLEXITY ANALYSIS
//

// O(2^N * N)T AND S
// If you see the visual representation closely you will realize that, in the worst case,
// it is equivalent to a binary tree, where each node will have two children.
// This means that we will have 2^N leaf nodes and  2^N-1  intermediate nodes. So the total
// number of elements pushed to the queue will be 2^N + 2^N-1, which is asymptotically
// equivalent to O(2^N). While processing each element, we do need to concatenate the
// current string with (or). This operation will take O(N), so the overall time complexity
// of our algorithm will be O(N * 2^N). This is not completely accurate but reasonable
// enough to be presented in the interview.
//
// The actual time complexity O(4 ^ N / SQRT(N)) is bounded by the Catalan number and is beyond
// the scope of a coding interview.See more details here.
//
// All the additional space used by our algorithm is for the output list. Since we can’t have
// more than O(2^N) combinations, the space complexity of our algorithm is O(N * 2^N).
//
