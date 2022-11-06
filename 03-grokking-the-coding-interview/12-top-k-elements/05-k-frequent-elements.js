//
// INSTRUCTIONS
//
// Given an unsorted array of numbers, find the top ‘K’ frequently occurring numbers in it.
//

//
// EXAMPLE
//
// Example 1:
// Input: [1, 3, 5, 12, 11, 12, 11], K = 2
// Output: [12, 11]
// Explanation: Both '11' and '12' apeared twice.
//
// Example 2:
// Input: [5, 12, 11, 3, 11], K = 2
// Output: [11, 5] or [11, 12] or [11, 3]
// Explanation: Only '11' appeared twice, all other numbers appeared once.
//

//
// PREPARATION
//
class NumFrequency {
   constructor(num, count) {
      this.num = num;
      this.count = count;
   }
}

//
// CODE
//
function kFrequentElements(nums, k) {
   const hashMap = {};
   const minHeap = new Heap([], null, (a, b) => b.count - a.count);

   for (let num of nums) {
      if (!(num in hashMap)) {
         hashMap[num] = 0;
      }
      hashMap[num] += 1;
      if (minHeap.length < k) {
         minHeap.push(new NumFrequency(num, hashMap[num]));
      } else if (minHeap.peek().count < hashMap[num]) {
         minHeap.pop();
         minHeap.push(new NumFrequency(num, hashMap[num]));
      }
   }

   const topNums = [];
   while (minHeap.length > 0) {
      topNums.push(minHeap.pop().num);
   }
   return topNums;
}

//
// TEST
//
console.log(kFrequentElements([1, 3, 5, 12, 11, 12, 11], 4));
console.log(kFrequentElements([12, 5, 11, 3, 11], 2));

//
// COMPLEXITY ANALYSIS
//
// O(N log K)T -> Because we're looping going through all numbers (N) and pushing (logK) frequent numbers in heap.
// O(N + K)S -> We're storing N numbers in hashMap and storing K numbers in minHeap.
//
