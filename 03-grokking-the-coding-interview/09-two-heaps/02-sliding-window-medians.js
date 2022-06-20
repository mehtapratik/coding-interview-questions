//
// INSTRUCTIONS
//
// Given an array of numbers and a number ‘k’, find the median of all the ‘k’
// sized sub - arrays(or windows) of the array.

//
// EXAMPLE
//
// input: [1, 2, -1, 3, 5], k = 2
// output: [1.5, 0.5, 1.0, 4.0]
//
// input: [1, 2, -1, 3, 5], k = 3
// output: [1.0, 2.0, 3.0]
//
// PREPARATION
//
// Use Heap (min/max) from collection JS
//

//
// CODE
//

class SlidingWindowMedian {
   find_sliding_window_median(nums, k) {
      let result = [];
      // by default, collection-js is MaxHeap. So...
      // a - b will be maxHeap comparer whereas b - a will be minHeap comparer)
      const minHeap = new Heap([], null, (a, b) => b - a);
      const maxHeap = new Heap([], null, (a, b) => a - b);

      for (let start = 0; start < nums.length; start++) {
         const n = nums[start];
         // 1. Identify which heap to insert the value into.
         // smaller half of the number goes in max heap (i.e. biggest number
         // of smaller half will be accessible through `peek`). bigger half
         // of the number will be in minHeap with smallest number being
         // accessible through `peek` method
         if (maxHeap.length === 0 || maxHeap.peek() >= n) {
            maxHeap.push(n);
         } else {
            minHeap.push(n);
         }

         // 2. make sure both heap are balanced has same numbers except that
         // max heap can have one more number than minHeap
         if (maxHeap.length > minHeap.length + 1) {
            minHeap.push(maxHeap.pop());
         } else if (minHeap.length > maxHeap.length) {
            maxHeap.push(minHeap.pop());
         }

         // If start is already at Kth number
         if (start + 1 >= k) {
            // 3. Find the median of K numbers distributed between
            // minHeap and maxHeap
            let median;
            if (minHeap.length === maxHeap.length) {
               median = (minHeap.peek() + maxHeap.peek()) / 2;
            } else {
               median = maxHeap.peek();
            }
            result.push(median);
            // 4. Start removing value from the heap in such way
            // that first inserted value in heap is removed first
            // this way at a time only K count numbers will be in heap
            const m = nums[start - k + 1];
            if (maxHeap.peek() >= m) {
               maxHeap.delete(m);
            } else {
               minHeap.delete(m);
            }
         }
      }
      return result;
   }
}

//
// TEST
//

var slidingWindowMedian = new SlidingWindowMedian();
result = slidingWindowMedian.find_sliding_window_median([1, 2, -1, 3, 5], 2);

console.log(`Sliding window medians are: ${result}`);

slidingWindowMedian = new SlidingWindowMedian();
result = slidingWindowMedian.find_sliding_window_median([1, 2, -1, 3, 5], 3);
console.log(`Sliding window medians are: ${result}`);
