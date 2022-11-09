//
// INSTRUCTIONS
//
// You are given a list of tasks that need to be run, in any order, on a server.
// Each task will take one CPU interval to execute but once a task has finished,
// it has a cooling period during which it can’t be run again. If the cooling period
// for all tasks is ‘K’ intervals, find the minimum number of CPU intervals that the
// server needs to finish all tasks.
//
// If at any time the server can’t execute any task then it must stay idle.
//

//
// EXAMPLE
//
// Example 1:
// Input: [a, a, a, b, c, c], K=2
// Output: 7
// Explanation: a -> c -> b -> a -> c -> idle -> a
//
// Example 2:
// Input: [a, b, a], K=3
// Output: 5
// Explanation: a -> b -> idle -> idle -> a
//

//
// CODE
//
function scheduleTasks(tasks, k) {
   const taskFrequencyMap = {};
   for (let task of tasks) {
      if (!(task in taskFrequencyMap)) {
         taskFrequencyMap[task] = 0;
      }
      taskFrequencyMap[task] += 1;
   }

   const maxHeap = new Heap([], null, (a, b) => a - b);
   for (let task in taskFrequencyMap) {
      maxHeap.push([task, taskFrequencyMap[task]]);
   }

   let totalIntervals = 0;
   while (maxHeap.length > 0) {
      const waitlist = [];
      // try to execute as many as 'k + 1' tasks from the max-heap because
      // if k is 2 you need to have two task in between a before executing same task again.
      // therefore we can execute 3 unqiue tasks from heap at a time
      let n = k + 1;

      // run either N tasks or entire length of max heap, whichever is smaller
      while (n > 0 && maxHeap.length > 0) {
         const [task, freq] = maxHeap.pop();
         totalIntervals += 1;
         if (freq > 1) {
            waitlist.push([task, freq - 1]);
         }
         n -= 1;
      }

      // push remaining task executing back into max heap
      for (let item of waitlist) {
         maxHeap.push(item);
      }

      // if there are remaining tasks that means there were more tasks in heap
      // than N executions. add remaining N as an idle time.
      if (maxHeap.length > 0) {
         totalIntervals += n;
      }
   }
   return totalIntervals;
}

//
// TEST
//
console.log(scheduleTasks(["a", "a", "a", "b", "c", "c"], 2));
console.log(scheduleTasks(["a", "a", "a"], 5));

//
// COMPLEXITY ANALYSIS
//
// O(N * logN)T
// The time complexity of the above algorithm is O(N∗logN) where ‘N’ is the number
// of tasks. Our while loop will iterate once for each occurrence of the task in
// the input (i.e. ‘N’) and in each iteration we will remove a task from the heap
// which will take O(logN) time. Hence the overall time complexity of our algorithm
// is O(N∗logN).
//
// O(N)S
// The space complexity will be as in the worst case, we need to store all the ‘N’ tasks
// in the HashMap.
//
