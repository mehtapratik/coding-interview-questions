//
// INSTRUCTIONS
//
// There are ‘N’ tasks, labeled from ‘0’ to ‘N-1’. Each task can have some prerequisite tasks
// which need to be completed before it can be scheduled.Given the number of tasks and a
// list of prerequisite pairs, write a method to find the ordering of tasks we should pick
// to finish all tasks.
//

//
// EXAMPLE
//
// Input: Tasks=3, Prerequisites=[0, 1], [1, 2]
// Output: [0, 1, 2]
// Explanation: To execute task '1', task '0' needs to finish first. Similarly, task '1' needs
// to finish before '2' can be scheduled. A possible scheduling of tasks is: [0, 1, 2]
//
// Input: Tasks=3, Prerequisites=[0, 1], [1, 2], [2, 0]
// Output: []
// Explanation: The tasks have a cyclic dependency, therefore they cannot be scheduled.
//
// Input: Tasks=6, Prerequisites=[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]
// Output: [0 1 4 3 2 5]
// Explanation: A possible scheduling of tasks is: [0 1 4 3 2 5]
//

//
// CODE
//
function taskSchedulingOrder(taskCounts, dependencies) {
   // NOTE: Prefer BFS over DFS due to its simplicity
   return bfs();
   return dfs();

   // O(V + E)TS
   function dfs() {
      // Step 1: Build graph
      const graph = {};
      for (let dependency of dependencies) {
         const [task, depedentTask] = dependency;
         graph[task] = graph[task] || {};
         graph[depedentTask] = graph[depedentTask] || {};
         graph[depedentTask][task] = true;
      }

      // Step 2: Identify schedule order using DFS
      let schedule = [];
      // hashmap of tasks that have already been scheduled
      const done = {};
      // hashmap of task that are in current recursive chain.
      // in other words, tasks that are waiting for dependancies to be scheduled first
      const inProgress = {};
      for (let taskId in graph) {
         // no need to proceed further if one of the dependency is failed to be scheduled
         if (scheduleTask(taskId) === false) {
            return [];
         }
      }
      return schedule;

      function scheduleTask(taskName = null) {
         // task is already been scheduled
         if (taskName in done) {
            return true;
         }

         // tasks cannot be scheduled because current task
         // has cyclic dependency on one of its own depedent task
         if (taskName in inProgress) {
            return false;
         }

         inProgress[taskName] = true;

         // schedule dependent tasks first
         let task = graph[taskName];
         for (let dependentTaskName in task) {
            if (scheduleTask(dependentTaskName) === false) {
               return false;
            }
         }
         // by this point, all dependent tasks have been added.
         // so its safe to schedule current task
         schedule.push(taskName);

         delete inProgress[taskName];
         done[taskName] = true;

         return true;
      }
   }

   // O(V + E)TS
   function bfs() {
      // Step 1: Build a graph
      const graph = getNewNode();
      for (const dependency of dependencies) {
         const [providerTask, dependentTask] = dependency;
         graph[providerTask] = graph[providerTask] || getNewNode();
         graph[providerTask][dependentTask] = true;
         graph[dependentTask] = graph[dependentTask] || getNewNode();
         // inDegrees = how many tasks depends on a given task
         graph[dependentTask].inDegrees += 1;
      }

      // Step 2: All all source nodes (nodes with inDegrees = 0)
      const sources = [];
      for (let task in graph) {
         if (graph[task].inDegrees === 0) sources.push(task);
      }

      // Step 3: Start scheduling task
      const schedule = [];
      while (sources.length > 0) {
         let taskName = sources.shift();
         schedule.push(taskName);

         for (let dependentTaskName in graph[taskName]) {
            const depedentTask = graph[dependentTaskName];
            // reduce `depedentTask` inDegrees by 1 since we just cleared
            // one of its depedency and if there are no more dependency for this
            // `dependentTask`, it can be pushed to scheduling
            depedentTask.inDegrees -= 1;
            if (depedentTask.inDegrees === 0) {
               sources.push(dependentTaskName);
            }
         }
      }

      return schedule.length === taskCounts
         ? schedule
         : ["ERROR: Cannot be scheduled."];
   }

   function getNewNode() {
      return {
         inDegrees: 0,
      };
   }
}

//
// TEST
//
console.log(
   `Is scheduling possible: ${taskSchedulingOrder(3, [
      [0, 1],
      [1, 2],
   ])}`
);
console.log(
   `Is scheduling possible: ${taskSchedulingOrder(3, [
      [0, 1],
      [1, 2],
      [2, 0],
   ])}`
);
console.log(
   `Is scheduling possible: ${taskSchedulingOrder(6, [
      [2, 5],
      [0, 5],
      [0, 4],
      [1, 4],
      [3, 2],
      [1, 3],
   ])}`
);

console.log(
   `Is scheduling possible: ${taskSchedulingOrder(3, [
      [1, 2],
      [1, 3],
      [3, 2],
   ])}`
);
