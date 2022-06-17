//
// INSTRUCTIONS
//
// Given a list of integers where each one represents the amount of time it takes to complete
// a task and an integer which represents the number of given threads. Write a function that
// distributes these tasks amongst the threads such that they complete them in the shortest
// amount of time. Return a list which contains the list of tasks given to each thread and
// the time it'll take to complete them all.
//

//
// EXAMPLE
//
// Input: tasks = [100, 1, 3, 5], threads = 2
// Output: [[100], [1,3,5]], time_to_finish = 100
// Because 100 is the longest so we'll have to wait for that to finish
//
// Input: tasks = [2, 1, 4, 6], threads = 2
// Output: [[2,4], [6,1]], time_to_finish = 7
//
// Input: tasks = [1], threads = 2
// Output: [[], [1]], time_to_finish = 1
//

//
// CODE
//

// Complexity Analysis
// ------------------------
// O(n(log(k))) Time - We're poping (constant time operation) a thread (k) from
// minHeap, updating it and then pushing(log(k)) it back. This is happening for each task (n).
// O(n + k) Space - For min/max heap
function distributeTasks(tasks, threads) {
   const distribution = [];
   const initialLoad = [];
   for (let i = 0; i < threads; i++) {
      initialLoad.push({ load: 0, index: i });
      distribution.push([]);
   }
   // minHeap to place thread with minimum load on top
   const minHeap = new Heap(initialLoad, null, (a, b) => b.load - a.load);
   // maxHeap to place highest time on top
   const maxHeap = new Heap(tasks, null, (a, b) => a - b);

   let maxTime = 0;
   while (maxHeap.length > 0) {
      const task = maxHeap.pop();
      const leastLoadedThread = minHeap.pop();
      distribution[leastLoadedThread.index].push(task);
      leastLoadedThread.load += task;
      maxTime = Math.max(maxTime, leastLoadedThread.load);
      minHeap.push(leastLoadedThread);
   }

   return { distribution, maxTime };
}

//
// TEST
//
console.log(distributeTasks([6], 3));
console.log(distributeTasks([6, 2, 2], 3));
console.log(distributeTasks([6, 2, 2, 1, 2, 4, 2, 8], 3));
console.log(distributeTasks([6, 2, 2, 1], 3));
