class Node {
   constructor(value, next = null) {
      this.value = value;
      this.next = next;
   }

   get_list() {
      result = "";
      temp = this;
      while (temp !== null) {
         result += temp.value + " ";
         temp = temp.next;
      }
      return result;
   }
}

const reverse = function (head) {
   let prev = null;
   let currentNode = head;
   while (currentNode) {
      const next = currentNode.next;
      currentNode.next = prev;
      prev = currentNode;
      currentNode = next;
   }
   return prev;
};

head = new Node(2);
head.next = new Node(4);
head.next.next = new Node(6);
head.next.next.next = new Node(8);
head.next.next.next.next = new Node(10);

console.log(`Nodes of original LinkedList are: ${head.get_list()}`);
console.log(`Nodes of reversed LinkedList are: ${reverse(head).get_list()}`);
