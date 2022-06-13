//
// INSTRUCTIONS
//
// Merge two sorted linked lists without using any extra space

//
// EXAMPLE
//
// input:
// a = 1 > 5 > 10
// b = 2 > 20 > 30
// output:
// 1 > 2 > 5 > 10 > 20 > 30
//

//
// PREPARATION
//
class LinkedList {
   constructor(value, next) {
      this.value = value;
      this.next = next;
   }
}
//
// CODE
//
function mergedLinkedList(a, b) {
   if (a == null) return b;
   if (b == null) return a;

   if (a.value < b.value) {
      a.next = mergedLinkedList(a.next, b);
      return a;
   } else {
      b.next = mergedLinkedList(a, b.next);
      return b;
   }
}

//
// TEST
//
const a = new LinkedList(1, new LinkedList(5, new LinkedList(10)));
const b = new LinkedList(2, new LinkedList(20, new LinkedList(30)));
console.log(mergedLinkedList(a, b));
