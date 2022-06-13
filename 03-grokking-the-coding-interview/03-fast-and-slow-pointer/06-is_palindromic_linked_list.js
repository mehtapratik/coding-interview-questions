/*
Given the head of a Singly LinkedList, write a method to check if the LinkedList is a palindrome or not.

Your algorithm should use constant space and the input LinkedList should be in the original form once 
the algorithm is finished. The algorithm should have O(N) time complexity where ‘N’ is the number of 
nodes in the LinkedList.

Example 1:
Input: 2 -> 4 -> 6 -> 4 -> 2 -> null
Output: true

Example 2:
Input: 2 -> 4 -> 6 -> 4 -> 2 -> 2 -> null
Output: false
*/

class Node {
   constructor(value, next = null) {
      this.value = value;
      this.next = next;
   }
}

const is_palindromic_linked_list = function (head) {
   let isPalindrome = false;

   // Step 1 - Find mid point of linked list
   let slow = head;
   let fast = head;

   while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
   }

   // Step 2 - Reverse second half of the array from mid-point
   const reversedSecondHalf = reverseSinglyLinkedList(slow);

   // Step 3 - Compare each node of non-reversed first half and reversed second half
   let firstHalf = head;
   let secondHalf = reversedSecondHalf;
   while (firstHalf && secondHalf) {
      // Keep looping for next elements until values match. When they don't, break out of the loop
      if (firstHalf.value !== secondHalf.value) break;

      firstHalf = firstHalf.next;
      secondHalf = secondHalf.next;
   }

   // 1. In case of even length linkedlist both half will be null
   // 2. In case of odd length linkedlist, only one of the half will be null
   // 3. In case of non-palindrome linked list, both half will be non null (see break condition above)
   if (firstHalf === null || secondHalf === null) isPalindrome = true;

   // Step 4 - Since you broke original linkedlist into two halves, restore
   // original linked list by revesing reversed linked list
   reverseSinglyLinkedList(reversedSecondHalf);

   return isPalindrome;
};

function reverseSinglyLinkedList(head) {
   let prev = null;
   while (head !== null) {
      const currentNext = head.next;
      head.next = prev;
      prev = head;
      head = currentNext;
   }

   return prev;
}

head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(3);
head.next.next.next.next = new Node(2);
head.next.next.next.next.next = new Node(1);

console.log(`Is palindrome: ${is_palindromic_linked_list(head)}`);

head.next.next.next.next.next = new Node(2);
console.log(`Is palindrome: ${is_palindromic_linked_list(head)}`);
