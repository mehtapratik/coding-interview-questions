// A single node without any links
class ANode {
  Value;
  constructor(value) {
    this.Value = value;
  }
}

// A single node with link to the next node
class BNode {
  Value;
  Next;
  constructor(value, next) {
    this.Value = value;
    this.Next = next;
  }
}

// A single node with link to next and previous node
class CNode {
  Value;
  Next;
  Previous;
  constructor(value, next, previous) {
    this.Value = value;
    this.Next = next;
    this.Previous = previous;
  }
}

// A single node with link to its childrens (nodes)
class DNode {
  Value;
  Links;
  constructor(value, links) {
    this.Value = value;
    this.Links = links;
  }
}
