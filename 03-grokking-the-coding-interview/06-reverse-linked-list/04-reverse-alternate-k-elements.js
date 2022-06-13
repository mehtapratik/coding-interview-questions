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

const reverse_alternate_k_elements = function (head, k) {
   let previous = null;
   let current = head;
   let newHead = null;

   while (current) {
      const prevSeriesEndNode = previous;
      const currentSeriesStartNode = current;

      let i = 0;
      while (current && i < k) {
         const formerNext = current.next;
         current.next = previous;

         previous = current;
         current = formerNext;
         i++;
      }

      const currentSeriesEndNode = previous;
      const nextSeriesStartNode = current;
      if (newHead === null) newHead = currentSeriesEndNode;
      else prevSeriesEndNode.next = currentSeriesEndNode;
      currentSeriesStartNode.next = nextSeriesStartNode;

      i = 0;
      while (current && i < k) {
         const formerNext = current.next;
         previous = current;
         current = formerNext;
         i++;
      }
   }
   return newHead;
};

head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
head.next.next.next.next.next.next = new Node(7);
head.next.next.next.next.next.next.next = new Node(8);

console.log(`Nodes of original LinkedList are: ${head.get_list()}`);
console.log(
   `Nodes of reversed LinkedList are: ${reverse_alternate_k_elements(
      head,
      2
   ).get_list()}`
);
