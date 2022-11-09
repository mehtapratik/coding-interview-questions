//
// INSTRUCTIONS
//
// Given an array of numbers and a number ‘K’, we need to remove ‘K’ numbers from the array such
// that we are left with maximum distinct numbers.
//

//
// EXAMPLE
//
// Example 1
// Input: [7, 3, 5, 8, 5, 3, 3], and K=2
// Output: 3
// Explanation: We can remove two occurrences of 3 to be left with 3 distinct numbers [7, 3, 8], we have
// to skip 5 because it is not distinct and occurred twice.
// Another solution could be to remove one instance of '5' and '3' each to be left with three distinct
// numbers [7, 5, 8], in this case, we have to skip 3 because it occurred twice.
//
// Example 2
// Input: [3, 5, 12, 11, 12], and K=3
// Output: 2
// Explanation: We can remove one occurrence of 12, after which all numbers will become distinct.
// Then we can delete any two numbers which will leave us 2 distinct numbers in the result.
//
// Example 3
// Input: [1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5], and K=2
// Output: 3
// Explanation: We can remove one occurrence of '4' to get three distinct numbers.
//

//
// CODE
//
function maxDistinctElements(numbers, k) {
   // find the frequency of each number
   const numFrequency = {};
   for (let number of numbers) {
      if (!(number in numFrequency)) {
         numFrequency[number] = 0;
      }
      numFrequency[number] += 1;
   }

   let distinctNumCount = 0;
   // insert all numbers with frequency greater than '1' into the min-heap
   const minHeap = new Heap([], null, (a, b) => b - a);
   for (let num in numFrequency) {
      if (numFrequency[num] > 1) {
         minHeap.push(numFrequency[num]);
      } else {
         distinctNumCount++;
      }
   }

   // following a greedy approach, try removing the least frequent numbers
   // first from the min-heap
   let count = k;
   while (minHeap.length > 0 || count > 0) {
      const freq = minHeap.pop();
      // to make an element distinct, we need to remove all of its occurrences except one
      count = count - (freq - 1);
      if (count >= 0) {
         distinctNumCount++;
      }
   }

   // if k > 0, this means we have to remove some distinct numbers
   if (count > 0) {
      distinctNumCount -= count;
   }

   return distinctNumCount;
}

//
// TEST
//
console.log(maxDistinctElements([7, 3, 5, 8, 5, 3, 3], 2));

//
// COMPLEXITY ANALYSIS
//
// O(N∗logN+KlogN)T
// Since we will insert all numbers in a HashMap and a Min Heap, this will take O(N∗logN)
// where ‘N’ is the total input numbers.While extracting numbers from the heap, in the worst
// case, we will need to take out ‘K’ numbers.This will happen when we have at least ‘K’ numbers
// with a frequency of two.Since the heap can have a maximum of ‘N / 2’ numbers, therefore,
// extracting an element from the heap will take O(logN) and extracting ‘K’ numbers will take O(KlogN).
// So overall, the time complexity of our algorithm will be O(N∗logN+KlogN).
//
// O(N)S
// The space complexity will be O(N) as, in the worst case, we need to store ‘N/2’ characters in the HashMap.
//