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

const reverse_every_k_elements = function (head, k) {
   if (head === null || k <= 1) {
      return head;
   }

   let previous = null;
   let current = head;
   while (current) {
      // STEP 1 / Always maintain cursor to...
      //          1. the last node of previous series and
      //          2. the first node of current series
      let lastNodeOfPreviousSeries = previous;
      let firstNodeOfCurrentSeries = current;

      // STEP 2 / Reverse "k" nodes from current position
      let i = 0;
      while (current != null && i < k) {
         const next = current.next;
         current.next = previous;
         previous = current;
         current = next;
         i++;
      }

      // When step 2 is finished...
      //   "previous" would be pointing to last node of current series
      //   "current" would be pointing to first node of next series
      const lastNodeOfCurrentSeries = previous;
      const firstNodeOfNextSeries = current;

      // STEP 3 / Connect reversed series with...
      //    first node of next series and last node of previous series
      firstNodeOfCurrentSeries.next = firstNodeOfNextSeries;
      if (lastNodeOfPreviousSeries == null) {
         head = lastNodeOfCurrentSeries;
      } else {
         lastNodeOfPreviousSeries.next = lastNodeOfCurrentSeries;
      }

      // previous pointer will now point to last node of currently reversed series (former first node)
      previous = firstNodeOfCurrentSeries;
   }

   return head;
};

head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);
head.next.next.next.next.next.next = new Node(7);
head.next.next.next.next.next.next.next = new Node(8);
head.next.next.next.next.next.next.next.next = new Node(9);

console.log(`Nodes of original LinkedList are: ${head.get_list()}`);
console.log(
   `Nodes of reversed LinkedList are: ${reverse_every_k_elements(
      head,
      3
   ).get_list()}`
);
