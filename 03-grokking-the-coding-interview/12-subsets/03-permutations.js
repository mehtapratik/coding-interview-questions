//
// INSTRUCTIONS
//
// Given a set of distinct numbers, find all of its permutations.
//
// Permutation is defined as the re-arranging of the elements of the set. For example, {1, 2, 3} has the following six permutations:
//
// {1, 2, 3}
// {1, 3, 2}
// {2, 1, 3}
// {2, 3, 1}
// {3, 1, 2}
// {3, 2, 1}
//
// If a set has ‘n’ distinct elements it will have n! permutations.
//
// EXAMPLE
//
// Input: [1,3,5]
// Output: [1,3,5], [1,5,3], [3,1,5], [3,5,1], [5,1,3], [5,3,1]
//

//
// EXPLANATION
//
// This problem follows the Subsets pattern and we can follow a similar Breadth First
// Search (BFS) approach.However, unlike Subsets, every permutation must contain all the numbers.
//
// Let’s take the example-1 mentioned above to generate all the permutations. Following a
// BFS approach, we will consider one number at a time:
//
// If the given set is empty then we have only an empty permutation set: []
// Let’s add the first element (1), the permutations will be: [1]
// Let’s add the second element (3), the permutations will be: [3,1], [1,3]
// Let’s add the third element (5), the permutations will be: [5,3,1], [3,5,1], [3,1,5], [5,1,3], [1,5,3], [1,3,5]
//
// Let’s analyze the permutations in the 3rd and 4th step. How can we generate permutations in the
// 4th step from the permutations of the 3rd step?
//
// If we look closely, we will realize that when we add a new number (5), we take each permutation
// of the previous step and insert the new number in every position to generate the new permutations.
// For example, inserting ‘5’ in different positions of[3, 1] will give us the following permutations:
//
// Inserting ‘5’ before ‘3’: [5,3,1]
// Inserting ‘5’ between ‘3’ and ‘1’: [3,5,1]
// Inserting ‘5’ after ‘1’: [3,1,5]
//

//
// CODE
//
const find_permutations = function (nums) {
   const result = [];
   // RECURSIVE SOLUTION
   // find_permutations_recursive(nums, 0, [], result);
   // return result;
   //
   // OR
   //
   // ITERATIVE SOLUTION
   const NUM_COUNT = nums.length;
   const permutations = [[]];

   for (let i = 0; i < NUM_COUNT; i++) {
      const currentNum = nums[i];
      const PERM_COUNT = permutations.length;

      for (let j = 0; j < PERM_COUNT; j++) {
         const currentPerm = permutations.shift();
         for (let k = 0; k < currentPerm.length + 1; k++) {
            const newPerm = currentPerm.slice(0);
            newPerm.splice(k, 0, currentNum);
            if (newPerm.length === NUM_COUNT) {
               result.push(newPerm);
            } else {
               permutations.push(newPerm);
            }
         }
      }
   }
   return result;
};

const find_permutations_recursive = function (
   nums,
   index,
   currentPermutation,
   result
) {
   if (index === nums.length) {
      result.push(currentPermutation);
   } else {
      for (let i = 0; i < currentPermutation.length + 1; i++) {
         const newPermutation = currentPermutation.slice(0);
         newPermutation.splice(i, 0, nums[index]);
         find_permutations_recursive(nums, index + 1, newPermutation, result);
      }
   }
};

//
// TEST
//
console.log(find_permutations([1, 3, 5]));

//
// COMPLEXITY ANALYSIS
//
// We know that there are a total of O(N!) permutations of a set with ‘N’ numbers. In the algorithm
// above, we are iterating through all of these permutations with the help of the two ‘for’ loops.
// In each iteration, we go through all the current permutations to insert a new number in them using
// splice method. To insert a number into a permutation of size ‘N’ will take O(N) which makes the
// overall time complexity of our algorithm O(N * N!).
//
// All the additional space used by our algorithm is for the result list and the queue to store the
// intermediate permutations.If you see closely, at any time, we don’t have more than N! permutations
// between the result list and the queue.Therefore the overall space complexity to store permutations
// each containing N elements will be O(N * N!).
//
