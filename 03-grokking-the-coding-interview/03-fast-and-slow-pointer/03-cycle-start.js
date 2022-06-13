class Node {
   constructor(value, next = null) {
      this.value = value;
      this.next = next;
   }
}

const find_cycle_start = function (head) {
   let fast = head;
   let slow = head;
   let cycleLength = 0;

   while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) {
         cycleLength = findCycleLength(slow);
         break;
      }
   }
   return findCycleStart(head, cycleLength);
};

function findCycleLength(node) {
   let cycleLength = 1;
   let currentNode = node.next;
   while (currentNode !== node) {
      cycleLength++;
      currentNode = currentNode.next;
   }

   return cycleLength;
}

function findCycleStart(node, cycleLength) {
   let fast = node;
   let slow = node;

   while (cycleLength > 0) {
      fast = fast.next;
      cycleLength--;
   }

   while (fast !== slow) {
      fast = fast.next;
      slow = slow.next;
   }

   return fast;
}

head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);

head.next.next.next.next.next.next = head.next.next;
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);

head.next.next.next.next.next.next = head.next.next.next;
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);

head.next.next.next.next.next.next = head;
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`);
