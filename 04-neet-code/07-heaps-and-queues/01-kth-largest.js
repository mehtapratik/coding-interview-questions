//
// INSTRUCTIONS
//
// Design a class to find the kth largest element in a stream. Note that it is the kth
// largest element in the sorted order, not the kth distinct element.
//
// Implement KthLargest class:
//
// KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream
// of integers nums.
// int add(int val) Appends the integer val to the stream and returns the element representing
// the kth largest element in the stream.
//

//
// EXAMPLES
//
// Input
// ["KthLargest", "add", "add", "add", "add", "add"]
// [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
// Output
// [null, 4, 5, 5, 8, 8]
// Explanation
// KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
// kthLargest.add(3);   // return 4
// kthLargest.add(5);   // return 5
// kthLargest.add(10);  // return 5
// kthLargest.add(9);   // return 8
// kthLargest.add(4);   // return 8
//

//
// CODE
//
class Stream {
   constructor(k, nums) {
      this.k = k;
      this.nums = nums;
      this.heap = new Heap([], null, (a, b) => b - a);
      for (const num of nums) {
         this.add(num);
      }
   }

   add(num) {
      if (this.heap.length < this.k || this.heap.peek() < num) {
         if (this.heap.length >= this.k) {
            this.heap.pop();
         }
         this.heap.push(num);
      }

      return this.heap.peek();
   }
}

//
// TEST
//
const kthLargest = new Stream(3, [4, 5, 8, 2]);
console.log(kthLargest.add(3)); // 4
console.log(kthLargest.add(5)); // 5
console.log(kthLargest.add(10)); // 5
console.log(kthLargest.add(9)); // 8
console.log(kthLargest.add(4)); // 8
