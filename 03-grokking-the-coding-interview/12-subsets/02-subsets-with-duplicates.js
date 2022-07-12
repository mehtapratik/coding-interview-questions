//
// INSTRUCTIONS
//
// Given a set of numbers that might contain duplicates, find all of its distinct subsets.
//

//
// EXAMPLE
//
// Input: [1, 3, 3]
// Output: [], [1], [3], [1,3], [3,3], [1,3,3]
//
// Input: [1, 5, 3, 3]
// Output: [], [1], [5], [3], [1,5], [1,3], [5,3], [1,5,3], [3,3], [1,3,3], [3,3,5], [1,5,3,3]
//

//
// EXPLANATION
//
// This problem follows the Subsets pattern and we can follow a similar Breadth First Search
// (BFS) approach. The only additional thing we need to do is handle duplicates.Since the given
// set can have duplicate numbers, if we follow the same approach discussed in Subsets, we will
// end up with duplicate subsets, which is not acceptable.To handle this, we will do two extra things:
//
// 1. Sort all numbers of the given set. This will ensure that all duplicate numbers are next to each other.
// 2. Follow the same BFS approach but whenever we are about to process a duplicate (i.e., when the current
//    and the previous numbers are same), instead of adding the current number(which is a duplicate) to all
//    the existing subsets, only add it to the subsets which were created in the previous step.
//
// Let’s take Example-2 mentioned above to go through each step of our algorithm:
// Given set: [1, 5, 3, 3]
// Sorted set: [1, 3, 3, 5]
//
// 1. Start with an empty set: [[]]
// 2. Add the first number (1) to all the existing subsets to create new subsets: [[], [1]];
// 3. Add the second number (3) to all the existing subsets: [[], [1], [3], [1,3]].
// 4. The next number (3) is a duplicate. If we add it to all existing subsets we will get:
//     [[], [1], [3], [1,3], [3], [1,3], [3,3], [1,3,3]]
//     We got two duplicate subsets: [3], [1,3]
//     Whereas we only needed the new subsets: [3,3], [1,3,3]
// To handle this instead of adding (3) to all the existing subsets, we only add it to
// the new subsets which were created in the previous(3rd) step:
//     [[], [1], [3], [1,3], [3,3], [1,3,3]]
// Finally, add the fourth number (5) to all the existing subsets: [[], [1], [3], [1,3],
// [3, 3], [1, 3, 3], [5], [1, 5], [3, 5], [1, 3, 5], [3, 3, 5], [1, 3, 3, 5]]
//

//
// CODE
//
const find_subsets = function (nums) {
   // sort the numbers so that duplicate numbers are grouped together
   nums.sort((a, b) => a - b);

   const subsets = [[]];

   let start = 0;
   let end = subsets.length;
   for (let i = 0; i < nums.length; i++) {
      // reset start pointer to zero, if current number is non-duplicate
      // we want to insert permutations from the first subsets to the last
      start = 0;

      // if current number and previous numbers are same (duplicate), then you
      // only want to generate permutation from previously inserted number's subsets
      if (i > 0 && nums[i] === nums[i - 1]) {
         // previously inserted subsets would begin from `end` because
         // end was calculated before inserting previous subsets
         start = end;
      }

      // calculate end pointer before inserting current premutations to the subsets
      end = subsets.length;
      for (let j = start; j < end; j++) {
         subsets.push([...subsets[j], nums[i]]);
      }
   }

   return subsets;
};

//
// TEST
//
console.log(find_subsets([1, 3, 3]));
console.log(find_subsets([1, 3, 5, 3, 3]));

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
