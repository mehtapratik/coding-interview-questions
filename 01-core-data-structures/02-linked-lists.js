class UnidirectionalNode {
  value;
  next;
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  head = null;
  tail = null;
  constructor(value) {
    if (value) {
      this.head = new UnidirectionalNode(value);
      this.tail = this.head;
    }
  }

  addToHead(value) {
    if (value) {
      const node = new UnidirectionalNode(value);
      if (this.head) {
        node.next = this.head;
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
      const node = new UnidirectionalNode(value);
      if (this.tail) {
        this.tail.next = node;
        this.tail = node;
      } else {
        this.tail = node;
        this.head = node;
      }
    }

    return this;
  }

  removeHead() {
    if (this.head && this.head.next) {
      this.head = this.head.next;
    } else if (this.head) {
      this.head = null;
      this.tail = null;
    }
    return this;
  }

  removeTail() {
    if (this.tail) {
      const prev = null;
      const current = this.head;
      while (current.next) {
        prev = current;
        current = current.next;
      }
      if (current === this.head) {
        this.head = prev;
      }
      this.tail = prev;
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
ll.addToHead(20).addToHead(10).addToTail(40).addToTail(40);
ll.print();
