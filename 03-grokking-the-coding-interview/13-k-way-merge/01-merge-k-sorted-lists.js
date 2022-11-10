//
// INSTRUCTIONS
//
// Given an array of ‘K’ sorted LinkedLists, merge them into one sorted list.
//

//
// EXAMPLE
//
// Example 1:
// Input: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4]
// Output: [1, 2, 3, 3, 4, 6, 6, 7, 8]
//
// Example 2:
// Input: L1=[5, 8, 9], L2=[1, 7]
// Output: [1, 5, 7, 8, 9]
//

//
// PREPARATION
//
class ListNode {
   constructor(value, next = null) {
      this.value = value;
      this.next = next;
   }
}

//
// CODE
//
function mergeKSortedArrays(arrays) {
   const minHeap = new Heap([], null, (a, b) => b[0] - a[0]);
   for (let i = 0; i < arrays.length; i++) {
      minHeap.push([arrays[i][0], i, 0]);
   }

   const result = [];
   while (minHeap.length > 0) {
      const [number, row, col] = minHeap.pop();
      result.push(number);
      if (col < arrays[row].length - 1) {
         minHeap.push([arrays[row][col + 1], row, col + 1]);
      }
   }

   return result;
}

function mergedKSortedLinkedLists(linkedLists) {
   const minHeap = new Heap([], null, (a, b) => b.value - a.value);
   for (let i = 0; i < linkedLists.length; i++) {
      minHeap.push(linkedLists[i]);
   }

   let head = null;
   let tail = null;
   while (minHeap.length > 0) {
      const node = minHeap.pop();
      if (head === null) {
         head = tail = node;
      } else {
         tail.next = node;
         tail = node;
      }

      if (node.next) {
         minHeap.push(node.next);
      }
   }

   return head;
}

//
// TEST
//
console.log(
   mergeKSortedArrays([
      [2, 6, 8],
      [3, 6, 7],
      [1, 3, 4],
   ])
);

console.log(
   mergeKSortedArrays([
      [5, 8, 9],
      [1, 7],
   ])
);

const l1 = new ListNode(2);
l1.next = new ListNode(6);
l1.next.next = new ListNode(8);

const l2 = new ListNode(3);
l2.next = new ListNode(6);
l2.next.next = new ListNode(7);

const l3 = new ListNode(1);
l3.next = new ListNode(3);
l3.next.next = new ListNode(4);

let result = mergedKSortedLinkedLists([l1, l2, l3]);
while (result !== null) {
   console.log(`${result.value}`);
   result = result.next;
}

//
// COMPLEXITY ANALYSIS
//
// O(N∗logK)T
// We're going through each and every node (N) of every linked lists while maintaining
// at max K items into min heap where K is number of linked lists in array, we're having
// N * logN time complexity.
//
// O(K)S
// The space complexity will be O(K) because, at any time, our min-heap will be storing
// one number from all the ‘K’ input lists.
//
