/*
Given an array containing 0s, 1s and 2s, sort the array in-place. You should treat numbers of the array as objects, 
hence, we can’t count 0s, 1s, and 2s to recreate the array.

The flag of the Netherlands consists of three colors: red, white and blue; and since our input array also consists 
of three different numbers that is why it is called Dutch National Flag problem.

Example 1:
Input: [1, 0, 2, 1, 0]
Output: [0 0 1 1 2]

Example 2:
Input: [2, 2, 0, 1, 2, 0]
Output: [0 0 1 2 2 2 ]
*/

const dutch_flag_sort = function (arr) {
   let head = 0;
   let tail = arr.length - 1;
   let i = 0;
   while (i <= tail) {
      const currentNum = arr[i];
      if (currentNum === 0) {
         [arr[i], arr[head]] = [arr[head], arr[i]];
         i++;
         head++;
      } else if (currentNum === 1) {
         i++;
      } else {
         [arr[i], arr[tail]] = [arr[tail], arr[i]];
         tail--;
      }
   }
   return arr;
};
