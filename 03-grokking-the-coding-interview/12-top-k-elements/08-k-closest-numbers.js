//
// INSTRUCTIONS
//
// Given a sorted number array and two integers ‘K’ and ‘X’, find ‘K’ closest numbers
// to ‘X’ in the array. Return the numbers in the sorted order. ‘X’ is not
// necessarily present in the array.
//

//
// EXAMPLE
//
// Example 1:
// Input: [5, 6, 7, 8, 9], K = 3, X = 7
// Output: [6, 7, 8]
//
// Example 2:
// Input: [2, 4, 5, 6, 9], K = 3, X = 6
// Output: [4, 5, 6]
//
// Example 3:
// Input: [2, 4, 5, 6, 9], K = 3, X = 10
// Output: [5, 6, 9]
//

//
// CODE
//
function closestNumbersWithTwoPointers(numbers, x, k) {
   let midPoint = binarySearch(numbers, x);
   if (midPoint === numbers.length) {
      midPoint--;
   }

   let from = midPoint;
   let to = midPoint + 1;
   const output = []; // mimicing double ended queue
   while (output.length < k) {
      if (from >= 0 && to < numbers.length) {
         const fromDistance = Math.abs(numbers[from] - x);
         const toDistance = Math.abs(numbers[to] - x);

         if (fromDistance <= toDistance) {
            output.unshift(numbers[from]);
            from--;
         } else {
            output.push(numbers[to]);
            to++;
         }
      } else if (from >= 0) {
         output.unshift(numbers[from]);
         from--;
      } else if (to < numbers.length) {
         output.push(numbers[to]);
         to++;
      }
   }
   return output.toArray();
}

function closestNumbersWithMaxHeap(numbers, x, k) {
   let midPoint = binarySearch(numbers, x);
   if (midPoint === numbers.length) {
      midPoint--;
   }

   const rangeFrom = Math.max(midPoint - k, 0);
   const rangeTo = Math.min(midPoint + k, numbers.length - 1);

   const maxHeap = new Heap([], null, (a, b) => a[1] - b[1]);
   for (let i = rangeFrom; i <= rangeTo; i++) {
      const number = numbers[i];
      const distance = Math.abs(number - x);

      if (maxHeap.length < k) {
         maxHeap.push([number, distance]);
      } else if (maxHeap.peek()[1] > distance) {
         maxHeap.pop();
         maxHeap.push([number, distance]);
      }
   }

   const closestNums = [];
   while (maxHeap.length > 0) {
      closestNums.push(maxHeap.pop()[0]);
   }

   closestNums.sort((a, b) => a - b);
   return closestNums;
}

function binarySearch(numbers, target) {
   let start = 0;
   let end = numbers.length - 1;
   let i = 0;
   while (start <= end && ++i < 100) {
      const midIndex = Math.floor(start + (end - start) / 2);
      const midNumber = numbers[midIndex];
      if (midNumber === target) {
         return midIndex;
      }
      if (midNumber < target) {
         start = midIndex + 1;
      } else {
         end = midIndex - 1;
      }
   }

   return start;
}

//
// TEST
//
console.log(closestNumbersWithTwoPointers([2, 4, 5, 6, 9], 6, 3));
console.log(closestNumbersWithMaxHeap([2, 4, 5, 6, 9], 6, 3));
console.log(closestNumbersWithTwoPointers([2, 4, 5, 6, 9], 10, 3));
console.log(closestNumbersWithMaxHeap([2, 4, 5, 6, 9], 10, 3));
console.log(closestNumbersWithTwoPointers([5, 6, 7, 8, 9], 7, 3));
console.log(closestNumbersWithMaxHeap([5, 6, 7, 8, 9], 7, 3));

//
// COMPLEXITY ANALYSIS
//
// Two Pointer Solution
// ========================
// O(logN + K)T -> logN for binary search of N numbers. K for finding K closest numbers in array.
// O(1)S -> If we ignore the space required for output list, the algorithm runs in constant space O(1).
//
// MaxHeap Solution
// ========================
// O(logN + (K * logK))T -> The time complexity of the above algorithm is O(logN + K*logK). We need
// O(logN) for Binary Search and O(K∗logK) to insert the numbers in the Min Heap, as well as to
// sort the output array.
// O(K)S -> The space complexity will be O(K), as we need to put a maximum of 2K numbers in the heap.
//
