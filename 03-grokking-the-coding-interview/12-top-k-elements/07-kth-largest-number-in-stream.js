//
// INSTRUCTIONS
//
// Design a class to efficiently find the Kth largest element in a stream of numbers.
//
// The class should have the following two things:
//
// The constructor of the class should accept an integer array containing initial numbers from the stream and an integer ‘K’.
// The class should expose a function add(int num) which will store the given number and return the Kth largest number.
//

//
// EXAMPLE
//
// Input: [3, 1, 5, 12, 2, 11], K = 4
// 1. Calling add(6) should return '5'.
// 2. Calling add(13) should return '6'.
// 3. Calling add(4) should still return '6'.
//

//
// CODE
//
class NumberStream {
   constructor(numbers = [], k = 0) {
      this.heap = new Heap([], null, (a, b) => b - a);
      this.k = k;
      // nlogk operation
      for (let number of numbers) {
         this.add(number);
      }
   }

   // log(k)
   add(number) {
      this.heap.push(number);
      if (this.heap.length > this.k) {
         this.heap.pop();
      }

      return this.heap.peek();
   }
}

//
// TEST
//
const numStream = new NumberStream([3, 1, 5, 12, 2, 11], 4);
console.log(numStream.add(6));
console.log(numStream.add(13));
console.log(numStream.add(4));
console.log(numStream.add(600));

//
// TIME COMPLEXITY
//
// The time complexity of the add() function will be O(logK) since we are
// inserting the new number in the heap.
//
// The space complexity will be O(K) for storing numbers in the heap.
//
