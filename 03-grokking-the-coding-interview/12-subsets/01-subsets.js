//
// INSTRUCTIONS
//
// Given a set with distinct elements, find all of its distinct subsets.

//
// EXAMPLE
//
// Input: [1, 3]
// Output: [], [1], [3], [1,3]
//
// Input: [1, 5, 3]
// Output: [], [1], [5], [3], [1,5], [1,3], [5,3], [1,5,3]
//

//
// EXPLANATION
//
// To generate all subsets of the given set, we can use the Breadth First Search (BFS) approach.
// We can start with an empty set, iterate through all numbers one - by - one, and add them
// to existing sets to create new subsets.
//
// Let’s take the example-2 mentioned above to go through each step of our algorithm:
//
// Given set: [1, 5, 3]
//
// Start with an empty set: [[]]
// Add the first number (1) to all the existing subsets to create new subsets: [[], [1]];
// Add the second number (5) to all the existing subsets: [[], [1], [5], [1,5]];
// Add the third number (3) to all the existing subsets: [[], [1], [5], [1,5], [3], [1,3], [5,3], [1,5,3]].
//
//Since the input set has distinct elements, the above steps will ensure that we will not have any duplicate subsets.
//

//
// CODE
//
const find_subsets = function (nums) {
   // Initialize an array with an empty subset.
   // At the very least, nums will have an empty subset as one of the combination
   const subsets = [[]];

   for (let num of nums) {
      // BFS - Go through all existing subsets and add current number by
      // making copy of the existing subset
      const n = subsets.length;
      for (let i = 0; i < n; i++) {
         // making copy of the existing subset and insert current num in the end
         subsets.push([...subsets[i], num]);
      }
   }
   return subsets;
};

//
// TEST
//
console.log(find_subsets([1, 3]));
console.log(find_subsets([1, 5, 3]));

//
// COMPLEXITY ANALYSIS
//
// Since, in each step, the number of subsets doubles as we add each element to all the existing subsets,
// therefore, we will have a total of O(2^N) subsets, where ‘N’ is the total number of elements in the
// input set. And since we construct a new subset from an existing set (spread operator
// OR slice method - N time complexity), therefore, the time complexity of the above algorithm will
// be O(N * 2 ^ N).
//
// All the additional space used by our algorithm is for the output list. Since we will have a total of
// O(2^N) subsets, and each subset can take up to O(N) space, therefore, the space complexity of our
// algorithm will be O(N * 2^N).
//
