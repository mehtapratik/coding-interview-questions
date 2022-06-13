class Node {
   constructor(value, next = null) {
      this.value = value;
      this.next = next;
   }
}

function has_cycle(head) {
   let fast = head;
   let slow = head;

   while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) {
         return find_cycle_length(slow);
      }
   }

   return 0;
}

function find_cycle_length(node) {
   let cycleLength = 0;
   let currentNode = node;
   while (true) {
      cycleLength++;
      currentNode = currentNode.next;
      if (currentNode === node) break;
   }

   return cycleLength;
   // OR - Following
   // let cycleLength = 1;
   // let currentNode = node.next;
   // while (currentNode !== node) {
   //    cycleLength++;
   //    currentNode = currentNode.next;
   // }

   // return cycleLength;
}

const head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
console.log(`LinkedList has cycle: ${has_cycle(head)}`);

head.next.next.next.next.next.next = head.next.next;
console.log(`LinkedList has cycle: ${has_cycle(head)}`);

head.next.next.next.next.next.next = head.next.next.next;
console.log(`LinkedList has cycle: ${has_cycle(head)}`);
