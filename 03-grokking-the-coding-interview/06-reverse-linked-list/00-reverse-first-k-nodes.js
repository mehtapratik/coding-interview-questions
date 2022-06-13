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

const reverse_first_k = function (head, k) {
   // STEP 0 / Sanitize the input
   if (typeof k !== "number" || k <= 0) return head;

   // STEP 1 / Reverse first K nodes
   let i = 0;
   let formerPrev = null;
   let current = head;
   let nextCurrent = current.next;
   while (i < k && current) {
      nextCurrent = current.next;
      current.next = formerPrev;
      formerPrev = current;
      current = nextCurrent;
      i++;
   }

   // STEP 2 / Flip the head
   head.next = current; // head = former first node / current =  next of Kth node
   head = formerPrev; // formerPrev = Kth node

   return head;
};

head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);

console.log(
   `Nodes of reversed LinkedList are: ${reverse_first_k(head, 0).get_list()}`
);
