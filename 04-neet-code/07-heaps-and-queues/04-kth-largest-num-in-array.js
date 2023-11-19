//
// INSTRUCTIONS
//
// Given an integer array nums and an integer k, return the kth largest element in the array.
//
// Note that it is the kth largest element in the sorted order, not the kth distinct element.
//
// Can you solve it without sorting?
//

//
// EXAMPLE
//
// Example 1:
// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5
//
// Example 2:
// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4
//

//
// CODE
//
function solve(nums, k) {
   if (k <= 0 || k > nums.length) {
      return undefined;
   }

   return heap(nums, k);
   return quickSelect(nums, k);
}

function heap(nums, k) {
   const heap = new Heap([], null, (a, b) => b - a);

   for (let num of nums) {
      if (heap.length < k || heap.peek() < num) {
         if (heap.length >= k) {
            heap.pop();
         }
         heap.push(num);
      }
   }

   return heap.peek();
}

function quickSelect(nums, k) {
   let start = 0;
   let end = nums.length - 1;
   let pivot = -1;

   while (pivot !== k) {
      pivot = partition(nums, start, end);
      if (pivot < k) {
         start = pivot;
      } else {
         end = pivot - 1;
      }
   }

   const a = nums.slice(0, k);
   return Math.min(...a);
}

function partition(nums, start, end) {
   const idx = midI(start, end);
   const pivotValue = nums[idx];

   while (start < end) {
      if (nums[start] <= pivotValue) {
         [nums[start], nums[end]] = [nums[end], nums[start]];
         end--;
      } else {
         start++;
      }
   }

   if (nums[start] >= pivotValue) {
      start++;
   }

   return start;
}

function midI(start, end) {
   return start + Math.floor((end - start) / 2);
}

//
// TEST
//
console.log(solve([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
