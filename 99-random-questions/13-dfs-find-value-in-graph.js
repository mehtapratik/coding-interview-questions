function find(graph, value) {
   return findRecursive(graph, value, []);
}

function findRecursive(node, value, visitedNodes) {
   if (node == null) {
      return false;
   }

   if (node.Value === value) {
      return true;
   }

   if (Array.isArray(node.Links)) {
      for (let i = 0; i < node.Links.length; i++) {
         const subNode = node.Links[i];
         if (visitedNodes === subNode) {
            continue;
         } else {
            visitedNodes.push(subNode);
         }
         if (findRecursive(subNode, value, visitedNodes)) {
            return true;
         }
      }
   }
   return false;
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

const graph = new DNode("a", [
   new DNode("b", [
      new DNode("c", [
         new DNode("d", [
            new DNode("e", [
               new DNode("f", [new DNode("i"), new DNode("j"), new DNode("k")]),
            ]),
            new DNode("g", [new DNode("h")]),
         ]),
      ]),
   ]),
]);

console.log(find(graph, "hh"));
