//
// INSTRUCTIONS
//
// Design a class that simulates a Stack data structure, implementing the following two operations:
//
// 1. push(int num): Pushes the number ‘num’ on the stack.
// 2. pop(): Returns the most frequent number in the stack. If there is a tie,
//    return the number which was pushed later.
//

//
// EXAMPLE
//
// After following push operations: push(1), push(2), push(3), push(2), push(1), push(2), push(5)
// 1. pop() should return 2, as it is the most frequent number
// 2. Next pop() should return 1
// 3. Next pop() should return 2
//

//
// CODE
//
class FrequencyStackNumber {
   constructor(number, frequency, sequence) {
      this.number = number;
      this.frequency = frequency;
      this.sequence = sequence;
   }

   compare(target) {
      if (this.frequency !== target.frequency) {
         return this.frequency - target.frequency;
      }

      return this.sequence - target.sequence;
   }
}

class FrequencyStack {
   constructor() {
      this.maxHeap = new Heap([], null, (a, b) => a.compare(b));
      this.numberFrequencyMap = {};
      this.nextSequenceNumber = 0;
   }

   push(number) {
      if (!(number in this.numberFrequencyMap)) {
         this.numberFrequencyMap[number] = 0;
      }
      this.numberFrequencyMap[number] += 1;

      this.maxHeap.push(
         new FrequencyStackNumber(
            number,
            this.numberFrequencyMap[number],
            ++this.nextSequenceNumber
         )
      );
   }

   pop() {
      const { number } = this.maxHeap.pop();
      if (this.numberFrequencyMap[number] > 1) {
         this.numberFrequencyMap[number] -= 1;
      } else {
         delete this.numberFrequencyMap[number];
      }

      return number;
   }
}

//
// TEST
//
const frequencyStack = new FrequencyStack();
frequencyStack.push(1);
frequencyStack.push(2);
frequencyStack.push(3);
frequencyStack.push(2);
frequencyStack.push(1);
frequencyStack.push(2);
frequencyStack.push(5);
console.log(frequencyStack.pop());
console.log(frequencyStack.pop());
console.log(frequencyStack.pop());
console.log(frequencyStack.pop());
console.log(frequencyStack.pop());
console.log(frequencyStack.pop());

//
// COMPLEXITY ANALYSIS
//
// O(logN)T
// The time complexity of push() and pop() is O(logN) where ‘N’ is the current number of elements in the heap.
//
// O(N)S
// We will need O(N) space for the heap and the map, so the overall space complexity of the algorithm is O(N).
//
