//
// INSTRUCTIONS
//
// Topological Sort of a directed graph (a graph with unidirectional edges)
// is a linear ordering of its vertices such that for every directed edge
// (U, V) from vertex U to vertex V, U comes before V in the ordering.
//
// Given a directed graph, find the topological ordering of its vertices.
//

//
// EXAMPLE
//
// Input: Vertices=4, Edges=[3, 2], [3, 0], [2, 0], [2, 1]
// Output: Following are the two valid topological sorts for the given graph:
// 1) 3, 2, 0, 1
// 2) 3, 2, 1, 0
//
// Input: Vertices=5, Edges=[4, 2], [4, 3], [2, 0], [2, 1], [3, 1]
// Output: Following are all valid topological sorts for the given graph:
// 1) 4, 2, 3, 0, 1
// 2) 4, 3, 2, 0, 1
// 3) 4, 3, 2, 1, 0
// 4) 4, 2, 3, 1, 0
// 5) 4, 2, 0, 3, 1
//
// Input: Vertices=7, Edges=[6, 4], [6, 2], [5, 3], [5, 4], [3, 0], [3, 1], [3, 2], [4, 1]
// Output: Following are all valid topological sorts for the given graph:
// 1) 5, 6, 3, 4, 0, 1, 2
// 2) 6, 5, 3, 4, 0, 1, 2
// 3) 5, 6, 4, 3, 0, 2, 1
// 4) 6, 5, 4, 3, 0, 1, 2
// 5) 5, 6, 3, 4, 0, 2, 1
// 6) 5, 6, 3, 4, 1, 2, 0
// There are other valid topological ordering of the graph too.
//

// EXPLANATION
//
// The basic idea behind the topological sort is to provide a partial ordering among the vertices of the graph
// such that if there is an edge from U to V then U≤V i.e., U comes before V in the ordering.Here are a few
// fundamental concepts related to topological sort:
//
// Source: Any node that has no incoming edge and has only outgoing edges is called a source.
// Sink: Any node that has only incoming edges and no outgoing edge is called a sink.
// So, we can say that a topological ordering starts with one of the sources and ends at one of the sinks.
// A topological ordering is possible only when the graph has no directed cycles, i.e. if the graph is a
// Directed Acyclic Graph (DAG).If the graph has a cycle, some vertices will have cyclic dependencies which
// makes it impossible to find a linear ordering among vertices.
// To find the topological sort of a graph we can traverse the graph in a Breadth First Search (BFS) way.
// We will start with all the sources, and in a stepwise fashion, save all sources to a sorted list. We
// will then remove all sources and their edges from the graph.After the removal of the edges, we will
// have new sources, so we will repeat the above process until all vertices are visited.
//

//
// CODE
//
// O(V+E)TS
// In step ‘d’, each vertex will become a source only once and each edge will be accessed and removed once.
// Therefore, the time complexity of the above algorithm will be O(V+E), where ‘V’ is the total number of
// vertices and ‘E’ is the total number of edges in the graph.
//
// The space complexity will be O(V+E), since we are storing all of the edges for each vertex in an
// adjacency list.
function topologicalSort(vertices, edges) {
   // Initialize graph data structure
   const graph = {}; // this can possibly constructed as array as well

   class Vertex {
      parents = {}; // this can possibly constructed as array as well
      children = {}; // this can possibly constructed as array as well
   }

   function countNodes(obj) {
      return Object.keys(obj).length;
   }

   // Build graph
   for (let edge of edges) {
      const [parent, child] = edge;
      graph[parent] = graph[parent] || new Vertex();
      graph[child] = graph[child] || new Vertex();
      graph[parent].children[child] = true;
      graph[child].parents[parent] = true;
   }

   // Find all sources, i.e. all nodes (vertices) with 0 parents (in-degrees)
   const sources = []; //NOTE: mimicing queue here, i.e. adding at bottom, removing from top
   for (let vertex in graph) {
      if (countNodes(graph[vertex].parents) === 0) {
         sources.push(vertex);
      }
   }

   // add sources to sort order output since they don't have any dependancy and then,
   // remove in-degree (parent) relationship from its children. If children have 0 parents (in-degree),
   // they, too, can now be added to sources for sorting. Keep doing this until no more nodes are left
   // as source nodes in the graph (cyclic dependancy nodes will be left out)
   const order = [];
   while (sources.length > 0) {
      // since all nodes in source array is root nodes, it really doesn't matter much whether
      // you pop or shift the node. Ask interviewer if there is any preference. If pop is desired,
      // you can get away with array without the need of queue data structrue
      const vertex = sources.shift();
      order.push(vertex);

      for (let child in graph[vertex].children) {
         delete graph[child].parents[vertex];
         if (countNodes(graph[child].parents) === 0) {
            sources.push(child);
         }
      }
   }

   // number of nodes in sort order must match number of nodes in graph
   // otherwise, there must be cycling depedancy in graph making it impossible
   // to generate sort order
   if (order.length !== countNodes(graph)) {
      return [`ERR: Cycling Dependacy`];
   }

   return order;
}

//
// TEST
//
console.log(
   `Topological sort: ${topologicalSort(4, [
      [3, 2],
      [3, 0],
      [2, 0],
      [2, 1],
   ])}`
);

console.log(
   `Topological sort: ${topologicalSort(5, [
      [4, 2],
      [4, 3],
      [2, 0],
      [2, 1],
      [3, 1],
   ])}`
);
console.log(
   `Topological sort: ${topologicalSort(7, [
      [6, 4],
      [6, 2],
      [5, 3],
      [5, 4],
      [3, 0],
      [3, 1],
      [3, 2],
      [4, 1],
   ])}`
);

// cycling depedancy
console.log(
   `Topological sort: ${topologicalSort(7, [
      [1, 2],
      [2, 3],
      [3, 1],
      [0, 1],
   ])}`
);
