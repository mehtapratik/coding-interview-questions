class BidirectionalNode {
  value;
  next;
  constructor(value = null, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class LinkedList {
  head = null;
  tail = null;
  constructor(value) {
    if (value) {
      this.head = new BidirectionalNode(value);
      this.tail = this.head;
    }
  }

  addToHead(value) {
    if (value) {
      const node = new BidirectionalNode(value);
      if (this.head) {
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
      } else {
        this.head = node;
        this.tail = node;
      }
    }

    return this;
  }

  addToTail(value) {
    if (value) {
      const node = new BidirectionalNode(value);
      if (this.tail) {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      } else {
        this.tail = node;
        this.head = node;
      }
    }

    return this;
  }

  remove(value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        if (currentNode.prev == null) {
          this.head = currentNode.next;
          if (this.head == null) this.tail = null;
        } else {
          currentNode.prev.next = currentNode.next;
        }
        currentNode = null;
        break;
      } else {
        currentNode = currentNode.next;
      }
    }

    return this;
  }

  removeHead() {
    if (this.head && this.head.next) {
      this.head = this.head.next;
      this.head.prev = null;
    } else if (this.head) {
      this.head = null;
      this.tail = null;
    }
    return this;
  }

  removeTail() {
    if (this.tail && this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return this;
  }

  print() {
    const output = [];
    let currentNode = this.head;
    while (currentNode) {
      output.push(`${currentNode.value} ->`);
      currentNode = currentNode.next;
    }

    console.log(output.join(" "));

    return this;
  }
}

const ll = new LinkedList(30);
ll.addToTail(20).addToHead(10);
ll.print();
ll.remove(30);
ll.print();
ll.removeTail();
ll.print();
ll.removeHead();
ll.print();
ll.removeHead();
ll.print();
ll.removeTail();
ll.print();
