//
// INSTRUCTIONS
//
// There are ‘N’ tasks, labeled from ‘0’ to ‘N-1’. Each task can have some prerequisite tasks
// which need to be completed before it can be scheduled.Given the number of tasks and a list
// of prerequisite pairs, find out if it is possible to schedule all the tasks.
//

//
// EXAMPLE
//
// Input: Tasks=3, Prerequisites=[0, 1], [1, 2]
// Output: true
// Explanation: To execute task '1', task '0' needs to finish first. Similarly, task '1' needs
// to finish before '2' can be scheduled. One possible scheduling of tasks is: [0, 1, 2]
//
// Input: Tasks=3, Prerequisites=[0, 1], [1, 2], [2, 0]
// Output: false
// Explanation: The tasks have a cyclic dependency, therefore they cannot be scheduled.
//
// Input: Tasks=6, Prerequisites=[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]
// Output: true
// Explanation: A possible scheduling of tasks is: [0 1 4 3 2 5]
//

//
// CODE
//
function canScheduleTasks(taskCount, edges) {
   return dfs();
   // return bfs();

   // O(V + E)TS
   // Each task can visited only once, and each edge(i.e., prerequisite), too,
   // will be accessed only once. Therefore, the time complexity of the above algorithm will be
   // O(V + E).
   // Since this is a recursive loop, space complexity for this algorithm will be O(V + E) for call
   // stack where graph is like a linked list.
   function dfs() {
      // Step 1: Build the graph
      const graph = {};
      for (let edge of edges) {
         const [parent, child] = edge;
         graph[parent] = graph[parent] || {};
         graph[parent][child] = true;
         graph[child] = graph[child] || {};
      }

      // Step 2: Detect cycle using DFS
      return isCyclicNode(graph) === false;

      function isCyclicNode(node) {
         // node has been visited already and identified as not cyclic
         if (!node || node.visited) return false;

         // we came across a path where a node being visited is already marked as
         // 'exploring' for dependancy. This means we have cyclic dependancy task
         // cannot be scheduled.
         if (node.exploring) return true;

         // mark current node as exploring to indicate that this node is already
         // in path of dependancy
         node.exploring = true;
         for (let childId in node) {
            const childNode = graph[childId];
            if (childNode.visited) continue;
            if (isCyclicNode(childNode)) {
               return true;
            }
         }

         // reset flags - if we end up here, this means current node
         // doesn't have cyclic depedancy
         node.exploring = false; // we are done exploring current node
         node.visited = true; // mark node as visited to avoid rework
         return false;
      }
   }

   // O(V + E)TS
   // In step ‘d’, each task can become a source only once, and each edge (i.e., prerequisite)
   // will be accessed and removed once.Therefore, the time complexity of the above algorithm
   // will be O(V+E), where ‘V’ is the total number of tasks and ‘E’ is the total number of
   // prerequisites.
   // The space complexity will be O(V+E), since we are storing nodes and its edges in graph.
   function bfs() {
      // Step 1: Build graph
      const graph = { inDegrees: 0, root: true };
      for (let edge of edges) {
         const [parent, child] = edge;
         graph[parent] = graph[parent] || { inDegrees: 0 };
         graph[parent][child] = true;
         graph[child] = graph[child] || { inDegrees: 0 };
         graph[child].inDegrees += 1;
      }

      // Step 2: Detect cycle by adding root node into queue
      const queue = [graph]; // immitating queue where add in the tail and remove from the head
      // we're setting counter to -1 to offset for the fact that we're adding extra one
      // node (root itself into queue, see above)
      let count = -1;
      while (queue.length > 0) {
         const node = queue.shift();
         count++;
         for (let childId in node) {
            const childNode = graph[childId];
            // first node (root) will always have zero in degrees.
            // no need to decrement indegrees, if so.
            if (!node.root) childNode.inDegrees -= 1;
            // if current child's in degrees are zero, they do not
            // have any depedancy. Therefore, that task can be scheduled
            if (childNode.inDegrees === 0) {
               queue.push(childNode);
            }
         }
      }

      // if no of task schedule matches number of tasks supplied,
      // all tasks can be scheduled. Otherwise, some of the tasks
      // could not be scheduled due to cyclic dependancy
      return count === taskCount;
   }
}

//
// TEST
//
console.log(
   `Is scheduling possible: ${canScheduleTasks(3, [
      [0, 1],
      [1, 2],
   ])}`
);
console.log(
   `Is scheduling possible: ${canScheduleTasks(3, [
      [0, 1],
      [1, 2],
      [2, 0],
   ])}`
);
console.log(
   `Is scheduling possible: ${canScheduleTasks(6, [
      [2, 5],
      [0, 5],
      [0, 4],
      [1, 4],
      [3, 2],
      [1, 3],
   ])}`
);
