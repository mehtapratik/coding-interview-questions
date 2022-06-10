class LL {
   constructor(value, next = null) {
      this.value = value;
      this.next = next;
   }
}
// 1 > 2 > 3 > 4
// 4 > 3 > 2 > 1
function reverseLinkedList(node, prev = null) {
   if (node == null) return prev;
   const next = node.next; // 3
   node.next = prev; // null < 1 < 2
   return reverseLinkedList(next, node);
}

const ll = new LL(1, new LL(2, new LL(3, new LL(4))));
console.log(reverseLinkedList(ll));
