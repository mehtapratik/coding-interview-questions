/*
Given the head of a Singly LinkedList, write a method to modify the LinkedList such that the nodes from 
the second half of the LinkedList are inserted alternately to the nodes from the first half in reverse order. 
So if the LinkedList has nodes 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null, 
your method should return      1 -> 6 -> 2 -> 5 -> 3 -> 4 -> null.

Your algorithm should not use any extra space and the input LinkedList should be modified in-place.

Example 1:
Input: 2 -> 4 -> 6 -> 8 -> 10 -> 12 -> null
Output: 2 -> 12 -> 4 -> 10 -> 6 -> 8 -> null 

Example 2:
Input: 2 -> 4 -> 6 -> 8 -> 10 -> null
Output: 2 -> 10 -> 4 -> 8 -> 6 -> null
*/

/*
Input:  1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
Output: 1 -> 6 -> 2 -> 5 -> 3 -> 4 -> null

Step 1: find midpoint
                               .
1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
               .

4 - midpoint

Step 2
Split into two halves
1 -> 2 -> 3 -> 4 -> null
6 -> 5 -> 4 -> null

Step 3
Insert second half in middle of first half
1 -> 6 -> 2 -> 5 -> 3 -> 4 ->
*/
class Node {
   constructor(value, next = null) {
      this.value = value;
      this.next = next;
   }

   print_list() {
      let result = "";
      let temp = this;
      while (temp !== null) {
         result += temp.value + " ";
         temp = temp.next;
      }
      console.log(result);
   }
}

const reorder = function (head) {
   console.log(`Original linked list is -> `, head);

   let slow = head;
   let fast = head;

   // Step 1: Find mid-point of singly linked list
   while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
   }

   // Step 2: Reverse the second half from the previously identified mid-point
   const reversedSecondHalf = reverseSinglyLinkedList(slow);

   // Step 3: Assemble linked list in desired order
   let firstHalf = head;
   let secondHalf = reversedSecondHalf;

   while (firstHalf && secondHalf) {
      let former = firstHalf.next;
      firstHalf.next = secondHalf;
      firstHalf = former;

      former = secondHalf.next;
      secondHalf.next = firstHalf;
      secondHalf = former;
   }

   // this is important - Otherwise, you last node may point to
   // some other node in second half causing circular links.
   if (firstHalf !== null) firstHalf.next = null;
   console.log(`Rearranged linked list is -> `, head);
};

function reverseSinglyLinkedList(head) {
   let prev = null;

   while (head) {
      const currentNext = head.next;
      head.next = prev;
      prev = head;
      head = currentNext;
   }

   return prev;
}

head = new Node(2);
head.next = new Node(4);
head.next.next = new Node(6);
head.next.next.next = new Node(8);
head.next.next.next.next = new Node(10);
head.next.next.next.next.next = new Node(12);
reorder(head);
head.print_list();
