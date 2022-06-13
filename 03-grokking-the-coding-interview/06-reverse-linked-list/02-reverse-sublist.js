class Node {
   constructor(value, next = null) {
      this.value = value;
      this.next = next;
   }

   get_list() {
      let result = "";
      let temp = this;
      while (temp !== null) {
         result += temp.value + " ";
         temp = temp.next;
      }
      return result;
   }
}

const reverse_sub_list = function (head, p, q) {
   // STEP 0 - Sanitize the input
   if (typeof p !== "number" || p <= 0) return head;
   if (typeof q !== "number" || q <= 0) return head;
   if (p === q) return head;
   if (p > q) [p, q] = [q, p];

   // STEP 1 - Move up to Pth node to find previous of Pth node and Pth node itself
   let i = 0;
   let formerPrev = null;
   let current = head;
   while (i < p - 1 && current) {
      formerPrev = current;
      current = current.next;
      i++;
   }
   // p's value is beyond LL node count - exit by keeping LL unchanged
   if (current === null) return head;

   // Keep track of previous node of P and P node itself
   const previousNodeOfP = formerPrev;
   const nodeP = current;

   // STEP 2 - Reverse all nodes from "p" to "q"
   let formerNext = null;
   while (i < q && current) {
      formerNext = current.next;
      current.next = formerPrev;
      formerPrev = current;
      current = formerNext;
      i++;
   }

   // STEP 3 - Now connect first and last nodes
   const nodeQ = formerPrev;
   const nextNodeOfQ = current;
   if (previousNodeOfP === null) {
      // "previousNodeOfP" will be null when user asks to reverse from 1st node (p = 1).
      // In that case nodeQ becomes new head
      head = nodeQ;
   } else {
      previousNodeOfP.next = nodeQ;
   }
   nodeP.next = nextNodeOfQ;

   return head;
};

head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);

// console.log(`Nodes of original LinkedList are: ${head.get_list()}`);
console.log(
   `Nodes of reversed LinkedList are: ${reverse_sub_list(
      head,
      1,
      4
   ).get_list()}`
);
