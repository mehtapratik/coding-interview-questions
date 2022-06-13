/*
We are given a list of Jobs. Each job has a Start time, an End time, and a CPU load when it is running. Our goal is to find the maximum CPU load at any time if all the jobs are running on the same machine.

Example 1:
Jobs: [[1,4,3], [2,5,4], [7,9,6]]
Output: 7
Explanation: Since [1,4,3] and [2,5,4] overlap, their maximum CPU load (3+4=7) will be when both the 
jobs are running at the same time i.e., during the time interval (2,4).

Example 2:
[2,4] [6,7] [8 ,12]
Jobs: [[6,7,10], [2,4,11], [8,12,15]]
Output: 15
Explanation: None of the jobs overlap, therefore we will take the maximum load of any job which is 15.

Example 3:
Jobs: [[1,6,2], [2,4,1], [5,6,5]]
Output: 8
Explanation: Maximum CPU load will be 8 as all jobs overlap during the time interval [3,4].
*/

const Heap = require("./collections/heap"); //http://www.collectionsjs.com

class Job {
   constructor(start, end, cpu_load) {
      this.start = start;
      this.end = end;
      this.cpu_load = cpu_load;
   }
}

// Alternate approach without using Min Heap
const find_max_cpu_load = function (jobs) {
   if (Array.isArray(jobs) === false && jobs.length === 0) return 0;
   if (jobs.length === 1) return jobs[0].cpu_load;

   jobs.sort((a, b) => a.start - b.start);

   let maxCPULoad = 0;
   let currentLoad = jobs[0].cpu_load;
   for (let i = 1; i < jobs.length; i++) {
      let currentJob = jobs[i];
      let prevJob = jobs[i - 1];

      if (prevJob.end <= currentJob.start) {
         currentLoad = currentJob.cpu_load;
      } else {
         currentLoad += currentJob.cpu_load;
      }

      maxCPULoad = Math.max(maxCPULoad, currentLoad);
   }
   return maxCPULoad;
};

// Approach using MinHeap
const find_max_cpu_load = function (jobs) {
   if (!jobs || !Array.isArray(jobs)) return 0;
   if (jobs.length < 2) return jobs[2];

   jobs.sort((a, b) => a.start - b.start);

   let maxLoad = 0;
   let currentLoad = 0;
   const minHeap = new Heap([], null, (a, b) => b.end - a.end);
   for (let i = 0; i < jobs.length; i++) {
      const current = jobs[i];
      while (minHeap.length > 0 && current.start >= minHeap.peek().end) {
         const removed = minHeap.pop();
         currentLoad -= removed.cpu_load;
      }
      minHeap.push(current);
      currentLoad += current.cpu_load;
      maxLoad = Math.max(maxLoad, currentLoad);
   }

   return maxLoad;
};

console.log(
   `Maximum CPU load at any time: ${find_max_cpu_load([
      new Job(1, 4, 3),
      new Job(2, 5, 4),
      new Job(7, 9, 6),
   ])}`
);
console.log(
   `Maximum CPU load at any time: ${find_max_cpu_load([
      new Job(6, 7, 10),
      new Job(2, 4, 11),
      new Job(8, 12, 15),
   ])}`
);
console.log(
   `"Maximum CPU load at any time: ${find_max_cpu_load([
      new Job(1, 6, 2),
      new Job(2, 4, 1),
      new Job(5, 6, 5),
   ])}`
);
