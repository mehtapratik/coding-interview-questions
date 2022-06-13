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

const rotate = function (head, rotations) {
   if (head === null || head.next === null || rotations <= 0) return head;
   const oldHead = head;

   let previous = null;
   let current = head;
   let i = 1;
   while (i <= rotations) {
      if (current === null) {
         current = head;
      } else {
         previous = current;
         current = current.next;
      }
      i++;
   }
   if (previous.next === null) return head;
   else previous.next = null;

   const newHead = current;

   while (current.next) {
      previous = current;
      current = current.next;
   }
   current.next = oldHead; // connect old head to where current node ends

   return newHead;
};

head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);
head.next.next.next.next.next = new Node(6);

console.log(`Nodes of original LinkedList are: ${head.get_list()}`);
console.log(`Nodes of rotated LinkedList are: ${rotate(head, 10).get_list()}`);
