//
// INSTRUCTIONS
//
// Given an array, find the sum of all numbers between the K1’th and K2’th smallest elements of that array.
//

//
// EXAMPLE
//
// Example 1:
// Input: [1, 3, 12, 5, 15, 11], and K1=3, K2=6
// Output: 23
// Explanation: The 3rd smallest number is 5 and 6th smallest number 15. The sum of numbers coming
// between 5 and 15 is 23 (11+12).
//
// Example 2:
// Input: [3, 5, 8, 7], and K1=1, K2=4
// Output: 12
// Explanation: The sum of the numbers between the 1st smallest number (3) and the 4th smallest
// number (8) is 12 (5+7).
//

//
// CODE
//
function sumOfElements(numbers, k1, k2) {
   const maxHeap = new Heap([], null, (a, b) => a - b);
   for (let number of numbers) {
      // We want to store only k1 - 1 small numbers in heap because
      // we want to find sum of all number "between" k1th and k2th not
      // including k1th and k2th. Therefore, storing k2th smallest number
      // is not useful
      if (maxHeap.length < k2 - 1) {
         maxHeap.push(number);
      } else if (maxHeap.peek() > number) {
         maxHeap.pop();
         maxHeap.push(number);
      }
   }

   let sum = 0;
   // Keep poping and suming all numbers from heap until its length reaches either
   // k1th small number or zero whicher earlier
   while (maxHeap.length > Math.max(k1, 0)) {
      sum += maxHeap.pop();
   }

   return sum;
}

//
// TEST
//
console.log(sumOfElements([1, 3, 12, 5, 15, 11], -1, 9));
console.log(sumOfElements([3, 5, 8, 7], 1, 4));

//
// COMPLEXITY ANALYSIS
//
// O(N * logK2)T
// Since we need to put only the top K2 numbers in the max-heap at any time, the time complexity
// of the above algorithm will be O(N∗logK2).
//
// O(K2)S
// Since we need to put only the top K2 numbers in the max-heap at any time, the time complexity
// of the above algorithm will be O(N∗logK2).
//
