//
// INSTRUCTIONS
//
// We are given an undirected graph that has characteristics of a k-ary tree. In such a graph,
// we can choose any node as the root to make a k - ary tree.The root(or the tree) with the
// minimum height will be called Minimum Height Tree(MHT).There can be multiple MHTs for a
// graph.In this problem, we need to find all those roots which give us MHTs.Write a method
// to find all MHTs of the given graph and return a list of their roots.
//

//
// EXAMPLE
//
// Input: vertices: 5, Edges: [[0, 1], [1, 2], [1, 3], [2, 4]]
// Output:[1, 2]
// Explanation: Choosing '1' or '2' as roots give us MHTs. In the below diagram, we can see that the
// height of the trees with roots '1' or '2' is three which is minimum.
//
// Input: vertices: 4, Edges: [[0, 1], [0, 2], [2, 3]]
// Output:[0, 2]
// Explanation: Choosing '0' or '2' as roots give us MHTs. In the below diagram, we can see that the
// height of the trees with roots '0' or '2' is three which is minimum.
//

//
// EXPLANATION
//
// First of all, let us clarify some concepts.
//
//    | The distance between two nodes is the number of edges that connect the two nodes.
//
// Note, normally there could be multiple paths to connect nodes in a graph. In our case though,
// since the input graph can form a tree from any node, as specified in the problem, there could
// only be one path between any two nodes.In addition, there would be no cycle in the graph. As a
// result, there would be no ambiguity in the above definition of distance.
//
//    | The height of a tree can be defined as the maximum distance between the root and all its leaf nodes.
//
// With the above definitions, we can rephrase the problem as finding out the nodes that are overall
// close to all other nodes, especially the leaf nodes.
//
// If we view the graph as an area of circle, and the leaf nodes as the peripheral of the circle,
// then what we are looking for are actually the centroids of the circle, i.e.nodes that is close
// to all the peripheral nodes(leaf nodes).
//
//
//             0
//             |
//           | 1 |                      | 1 |
//           /  \                      /  |  \
//          2    3                    0   2   3
//
// For instance, in the above graph, it is clear that the node with the value 1 is the centroid of
// the graph.If we pick the node 1 as the root to form a tree, we would obtain a tree with the
// minimum height, compared to other trees that are formed with any other nodes.
//
// Before we proceed, here we make one assertion which is essential to the algorithm.
//
//     | For the tree-alike graph, the number of centroids is no more than 2.
//
// If the nodes form a chain, it is intuitive to see that the above statement holds,
// which can be broken into the following two cases:
//
// 1. If the number of nodes is even, then there would be two centroids.
// 2. If the number of nodes is odd, then there would be only one centroid.
//
//    3 - | 1 - 2 | - 4                 3 - | 1 | - 2
//
// For the rest of cases, we could prove by contradiction. Suppose that we have
// 3 centroids in the graph, if we remove all the non - centroid nodes in the graph,
// then the 3 centroids nodes must form a triangle shape, as follows:
//
//        |1|                    |1|
//       /   \                  /   \
//     |2| - |3|               2     3
//
//
// Because these centroids are equally important to each other, and they should equally close
// to each other as well. If any of the edges that is missing from the triangle, then the 3
// centroids would be reduced down to a single centroid.
//
// However, the triangle shape forms a cycle which is contradicted to the condition that
// there is no cycle in our tree - alike graph. Similarly, for any of the cases that have
// more than 2 centroids, they must form a cycle among the centroids, which is contradicted
// to our condition.
//
// Therefore, there cannot be more than 2 centroids in a tree-alike graph.
//
// Given the above intuition, the problem is now reduced down to looking for all the centroid
// nodes in a tree - alike graph, which in addition are no more than two.
//
// The idea is that we trim out the leaf nodes layer by layer, until we reach the core of the
// graph, which are the centroids nodes.
//
// Once we trim out the first layer of the leaf nodes (nodes that have only one connection),
// some of the non - leaf nodes would become leaf nodes.
//
// The trimming process continues until there are only two nodes left in the graph, which are
// the centroids that we are looking for.
//
// The above algorithm resembles the topological sorting algorithm which generates the order
// of objects based on their dependencies.For instance, in the scenario of course scheduling,
// the courses that have the least dependency would appear first in the order.
//
// In our case, we trim out the leaf nodes first, which are the farther away from the centroids.
// At each step, the nodes we trim out are closer to the centroids than the nodes in the previous
// step. At the end, the trimming process terminates at the centroids nodes.
//

//
// CODE
//
// O(v + e)TS
// each node can become a source only once and each edge will be accessed and removed once.
// Therefore, the time complexity of the above algorithm will be O(V + E), where ‘V’ is the
// total nodes and ‘E’ is the total number of the edges.
//
// The space complexity will be O(V+E), since we are storing all of the edges for each
// node in an adjacency list.
function minHeightTreeNode(nodeCount, edges) {
   if (nodeCount === 0) return [];
   if (nodeCount === 1) return [0];

   // # 1. Build graph
   const graph = {};
   for (const edge of edges) {
      const [a, b] = edge;
      graph[a] = graph[a] || { inDegrees: 0 };
      graph[a].inDegrees += 1; // undirected graph
      graph[a][b] = true;
      graph[b] = graph[b] || { inDegrees: 0 };
      graph[b].inDegrees += 1; // undirected graph
      graph[b][a] = true;
   }

   if (Object.keys(graph).length !== nodeCount) return [];

   // # 2. Find the leaf nodes (node with just one edge)
   const leaves = [];
   for (const nodeName in graph) {
      if (graph[nodeName].inDegrees === 1) {
         leaves.push(nodeName);
      }
   }

   // # 3. Start removing leaf nodes until you reach centeroids of the tree
   let remainingNodes = nodeCount;
   while (remainingNodes > 2) {
      // if nodes were cyclic, you will have zero leaves with more than 2 remaining nodes
      if (leaves.length === 0) {
         return [];
      }

      remainingNodes -= leaves.length;

      let leafCount = leaves.length;
      while (leafCount-- > 0) {
         const node = graph[leaves.shift()];
         for (let descendentName in node) {
            const descendent = graph[descendentName];
            if (!descendent) continue;
            descendent.inDegrees -= 1;
            if (descendent.inDegrees === 1) {
               leaves.push(descendentName);
            }
         }
      }
   }

   return leaves;
}

//
// TEST
//
console.log(
   minHeightTreeNode(4, [
      [0, 1],
      [1, 2],
      [1, 3],
   ])
);
console.log(
   minHeightTreeNode(4, [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 0],
   ])
);
console.log(
   minHeightTreeNode(5, [
      [0, 1],
      [1, 2],
      [1, 3],
      [3, 4],
   ])
);
console.log(
   minHeightTreeNode(4, [
      [0, 1],
      [0, 2],
      [2, 3],
   ])
);
