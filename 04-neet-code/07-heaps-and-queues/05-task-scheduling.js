//
// INSTRUCTIONS
//
// Given a characters array tasks, representing the tasks a CPU needs to do, where each letter
// represents a different task. Tasks could be done in any order. Each task is done in one unit
// of time. For each unit of time, the CPU could complete either one task or just be idle.
//
// However, there is a non-negative integer n that represents the cooldown period between
// two same tasks (the same letter in the array), that is that there must be at least n
// units of time between any two same tasks.
//
// Return the least number of units of times that the CPU will take to finish all
// the given tasks.
//

//
// EXAMPLES
//
// Example 1:
// Input: tasks = ["A","A","A","B","B","B"], n = 2
// Output: 8
// Explanation:
// A -> B -> idle -> A -> B -> idle -> A -> B
// There is at least 2 units of time between any two same tasks.
//
// Example 2:
// Input: tasks = ["A","A","A","B","B","B"], n = 0
// Output: 6
// Explanation: On this case any permutation of size 6 would work since n = 0.
// ["A","A","A","B","B","B"]
// ["A","B","A","B","A","B"]
// ["B","B","B","A","A","A"]
//
// Example 3:
// Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
// Output: 16
// Explanation:
// One possible solution is
// A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A
//

//
// CODE
//
function solve(tasks, n) {
   const heap = getMaxHeap(tasks);

   let minTime = 0;
   const taskOrder = [];
   const waitingTasks = new Heap([], null, (a, b) => b.index - a.index);
   while (heap.length > 0 || waitingTasks.length > 0) {
      minTime += 1;
      if (heap.length === 0) {
         taskOrder.push("idle");
      } else {
         const currentTask = heap.pop();
         currentTask.count -= 1;
         taskOrder.push(currentTask.name);
         if (currentTask.count > 0) {
            waitingTasks.push({
               index: taskOrder.length + n,
               task: currentTask,
            });
         }
      }
      if (taskOrder.length === waitingTasks.peek()?.index) {
         heap.push(waitingTasks.pop().task);
      }
   }
   console.log(taskOrder);
   return minTime;
}

function getMaxHeap(tasks) {
   return new Heap(getTaskCounts(tasks), null, (a, b) => a.count - b.count);
}

function getTaskCounts(tasks) {
   const freq = new Map();
   for (let task of tasks) {
      const count = (freq.get(task) ?? 0) + 1;
      freq.set(task, count);
   }

   return Array.from(freq, ([key, val]) => ({
      name: key,
      count: val,
   }));
}

//
// TEST
//
console.log(
   solve(["B", "A", "A", "A", "A", "A", "A", "B", "D", "E", "F", "G"], 2)
);
console.log(solve(["A", "A", "A", "B"], 1));
