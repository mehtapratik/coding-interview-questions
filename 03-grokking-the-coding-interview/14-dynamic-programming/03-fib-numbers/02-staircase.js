//
// INSTRUCTIONS
//
// Given a stair with ‘n’ steps, implement a method to count how many possible ways are there to reach
// the top of the staircase, given that, at every step you can either take 1 step, 2 steps, or 3 steps.
//

//
// EXAMPLE
//
// Number of stairs (n) : 3
// Number of ways = 4
// Explanation: Following are the four ways we can climb : {1,1,1}, {1,2}, {2,1}, {3}
//
// Number of stairs (n) : 4
// Number of ways = 7
// Explanation: Following are the seven ways we can climb : {1,1,1,1}, {1,1,2}, {1,2,1}, {2,1,1},
// {2,2}, {1,3}, {3,1}
//

//
// CODE
//
const cache = {};
function staircase(noOfSteps) {
   return tabulation(noOfSteps);

   // O(3^n)T | O(n)S
   function recursive(remaniningSteps) {
      // anytime you reach the dfs recursion with `remainingSteps` to zero,
      // you've found one way to reach end of staircase
      if (remaniningSteps === 0) {
         return 1;
      }
      // you've over-reached # of steps in current dfs recursion path,
      // return 0 to indicate that this recursion path is not valid
      if (remaniningSteps < 0) {
         return 0;
      }

      // at any steps, you can either take 1, 2 or 3 steps
      return (
         recursive(remaniningSteps - 1) +
         recursive(remaniningSteps - 2) +
         recursive(remaniningSteps - 3)
      );
   }

   // O(n)TS
   function memoization(remaniningSteps) {
      if (remaniningSteps in cache) {
         return cache[remaniningSteps];
      }
      if (remaniningSteps === 0) {
         return 1;
      }
      if (remaniningSteps < 0) {
         return 0;
      }

      cache[remaniningSteps] =
         memoization(remaniningSteps - 1) +
         memoization(remaniningSteps - 2) +
         memoization(remaniningSteps - 3);

      return cache[remaniningSteps];
   }

   //O(n0)T | O(1)S
   function tabulation() {
      let one = 1;
      let two = 2;
      let three = 4;
      let temp = null;
      for (let i = 4; i <= noOfSteps; i++) {
         temp = one;
         one = two;
         two = three;
         three = temp + one + two;
      }

      return three;
   }
}

//
// TEST
//
console.log(staircase(3));
console.log(staircase(4));
console.log(staircase(10));
