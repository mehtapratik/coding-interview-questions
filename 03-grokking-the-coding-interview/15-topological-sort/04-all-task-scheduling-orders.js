//
// INSTRUCTIONS
//
// There are ‘N’ tasks, labeled from ‘0’ to ‘N-1’. Each task can have some prerequisite tasks
// which need to be completed before it can be scheduled.Given the number of tasks and a list
// of prerequisite pairs, write a method to print all possible ordering of tasks meeting all
// prerequisites.
//

//
// EXAMPLE
//
// Input: Tasks=3, Prerequisites=[0, 1], [1, 2]
// Output: [0, 1, 2]
// Explanation: There is only possible ordering of the tasks.
//
// Input: Tasks=4, Prerequisites=[3, 2], [3, 0], [2, 0], [2, 1]
// Output:
// 1) [3, 2, 0, 1]
// 2) [3, 2, 1, 0]
// Explanation: There are two possible orderings of the tasks meeting all prerequisites.
//
// Input: Tasks=6, Prerequisites=[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]
// Output:
// 1) [0, 1, 4, 3, 2, 5]
// 2) [0, 1, 3, 4, 2, 5]
// 3) [0, 1, 3, 2, 4, 5]
// 4) [0, 1, 3, 2, 5, 4]
// 5) [1, 0, 3, 4, 2, 5]
// 6) [1, 0, 3, 2, 4, 5]
// 7) [1, 0, 3, 2, 5, 4]
// 8) [1, 0, 4, 3, 2, 5]
// 9) [1, 3, 0, 2, 4, 5]
// 10) [1, 3, 0, 2, 5, 4]
// 11) [1, 3, 0, 4, 2, 5]
// 12) [1, 3, 2, 0, 5, 4]
// 13) [1, 3, 2, 0, 4, 5]
//

//
// CODE
//

// O(v! * e)TS
// If we don’t have any prerequisites, all combinations of the tasks can represent
// a topological ordering.As we know, that there can be N! combinations for ‘N’
// numbers, therefore the time and space complexity of our algorithm will be O(V!∗E)
// where ‘V’ is the total number of tasks and ‘E’ is the total prerequisites. We need
// the ‘E’ part because in each recursive call, at max, we remove(and add back)
// all the edges.
function allTaskScheduleOrders(taskCount, dependencies) {
   // # 1. Build the graph and adjacency matrix
   let graph = {};
   for (let i = 0; i < taskCount; i++) {
      graph[i] = {
         inDegrees: 0,
      };
   }

   for (const dependency of dependencies) {
      const [precedes, follows] = dependency;
      graph[precedes][follows] = true;
      graph[follows].inDegrees += 1; // # of predecessor tasks
   }

   // # 2. Find source nodes
   let sources = [];
   for (let taskNo in graph) {
      if (graph[taskNo].inDegrees === 0) {
         sources.push(taskNo);
      }
   }

   const schedules = [];

   // # 3. Depth first search to build the sortOrder of one root node at a time
   dfs(sources, []);
   console.log(schedules);
   console.log(`<-- Done -->`);

   function dfs(sources, sortOrder) {
      if (sources.length === 0) {
         // current sort order must have exact tasks in them to be printed
         // if less then we have cyclic dependency on one or more task preventing us from
         // generating sort order
         if (sortOrder.length === taskCount) {
            schedules.push([...sortOrder]);
         }

         return sortOrder.length === taskCount;
      }

      for (let i = 0; i < sources.length; i++) {
         // 1. Schedule `i`th task from `source` array
         const taskNo = sources[i];
         const task = graph[taskNo];
         const newSources = [...sources];
         newSources.splice(i, 1);
         sortOrder.push(taskNo);

         // 2. Identify all verticies that don't have any prerequesites anymore after scheduling `i`th task
         for (let follows in task) {
            const depedency = graph[follows];
            if (!depedency) continue;
            depedency.inDegrees -= 1;
            if (depedency.inDegrees === 0) {
               newSources.push(follows);
            }
         }

         // 3. DFS
         //   newSources
         // =
         //   existing `source` array
         // -
         //   the task that we just included in `sortOrder`
         // +
         //   all new verticies that become available after scheduling `i`th task
         //
         // Recursion will take care of "appending" all possible sort orders where current sequence is fixed
         // e.g. let's say you've [1, 2] source tasks. If you remove and schedule task 1 and it frees task 3.
         // sortOrder will be [1]. dfs below will be called with `newSources`=[2, 3]. recursive dfs calls will take
         // care of generating sort order as [1, 2, 3] and [1, 3, 2] (assuming task 2 and 3 do not have any further
         // dependents).
         if (dfs(newSources, sortOrder) === false) {
            // no need to proceed further. there is cyclic dependancy between verticies
            return false;
         }

         // 4. Backtracking - unschedule `i`th task
         // since all possible sort orders for source task at `i`th index have been generated and printed,
         // let's remove that task from `sortOrder` array and add edges back into dependent tasks
         sortOrder.pop();
         // sortOrder.splice(currentTaskOrderIndex, 1);
         for (let follows in task) {
            const depedency = graph[follows];
            if (!depedency) continue;
            depedency.inDegrees += 1;
         }
      }

      // at this point, you have successfully managed to generate all sort order for given sources
      return true;
   }
}

//
// TEST
//
allTaskScheduleOrders(3, [
   [0, 1],
   [1, 0],
]);

allTaskScheduleOrders(4, [
   [0, 2],
   [1, 2],
   [1, 3],
   [0, 3],
]);

allTaskScheduleOrders(4, [
   [3, 2],
   [3, 0],
   [2, 0],
   [2, 1],
]);

allTaskScheduleOrders(6, [
   [2, 5],
   [0, 5],
   [0, 4],
   [1, 4],
   [3, 2],
   [1, 3],
]);

allTaskScheduleOrders(4, []);
