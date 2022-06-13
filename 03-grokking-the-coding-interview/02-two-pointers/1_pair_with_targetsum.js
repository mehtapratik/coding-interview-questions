/*
Given an array of sorted numbers and a target sum, find a pair in the array whose sum is equal to the given target.

Write a function to return the indices of the two numbers (i.e. the pair) such that they add up to the given target.

Example 1:

Input: [1, 2, 3, 4, 6], target=6
Output: [1, 3]
Explanation: The numbers at index 1 and 3 add up to 6: 2+4=6

Example 2:

Input: [2, 5, 9, 11], target=11
Output: [0, 2]
Explanation: The numbers at index 0 and 2 add up to 11: 2+9=11
*/

// O(N)T | O(1)S - If input array is already sorted
// O(N*logN)T | O(1)S - If array is unsorted but you're allowed to sort and mutate original array
// O(N*logN)T | O(N)S - If array is unsorted but you're allowed to create a sorted copy 
//                      of the original without mutating original one
const pair_with_targetsum = function (arr, target_sum) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    const leftNum = arr[start];
    const rightNum = arr[end];
    const currentSum = leftNum + rightNum;
    if (currentSum === target_sum) return [start, end];
    else if (currentSum < target_sum) start++;
    else end--;
  }
  return [-1, -1];
}

// Alternate approach without using two pointer technique 
// O(N)TS - Does not require sorted array
const pair_with_targetsum = function (arr, target_sum) {
  const visitedNums = {};
  for (let i = 0; i < arr.length; i++) {
    const currentNum = arr[i];
    const remainder = target_sum - currentNum;
    if (remainder in visitedNums) return [visitedNums[remainder], i];
    visitedNums[currentNum] = i;
  }

  return [-1, -1];
}