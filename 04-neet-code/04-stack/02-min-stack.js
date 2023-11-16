//
// INSTRUCTIONS
//
// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
//
// Implement the MinStack class:
//
// 1. MinStack() initializes the stack object.
// 2. void push(int val) pushes the element val onto the stack.
// 3. void pop() removes the element on the top of the stack.
// 4. int top() gets the top element of the stack.
// 5. int getMin() retrieves the minimum element in the stack.
// 6. You must implement a solution with O(1) time complexity for each function.
//

//
// EXAMPLES
//
// Input
// ["MinStack","push","push","push","getMin","pop","top","getMin"]
// [[],[-2],[0],[-3],[],[],[],[]]
//
// Output
// [null,null,null,null,-3,null,0,-2]
//
// Explanation
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin(); // return -3
// minStack.pop();
// minStack.top();    // return 0
// minStack.getMin(); // return -2
//

//
// CODE
//
class MinStack {
   #stack;

   constructor() {
      this.#stack = [];
   }

   length() {
      return this.#stack.length;
   }

   top() {
      return this.#stack[this.length() - 1].val;
   }

   getMin() {
      if (this.#stack.length === 0) {
         return Infinity;
      }

      return this.#stack[this.length() - 1].min;
   }

   push(val) {
      const min = Math.min(this.getMin(), val);
      this.#stack.push({ val, min });
   }

   pop() {
      this.#stack.pop();
   }
}

//
// TEST
//
const minStack = new MinStack();
console.log(minStack.push(-2));
console.log(minStack.push(0));
console.log(minStack.push(-3));
console.log(minStack.getMin()); // return -3
console.log(minStack.pop());
console.log(minStack.top()); // return 0
console.log(minStack.getMin()); // return -2
