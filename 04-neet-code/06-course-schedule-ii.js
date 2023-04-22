//
// INSTRUCTIONS
//
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
// You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you
// must take course `bi` first if you want to take course `ai`.
//
// For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
// Return the ordering of courses you should take to finish all courses. If there are many valid
// answers, return any of them.If it is impossible to finish all courses, return an empty array.
//

//
// EXAMPLE
//
// Example 1:
// Input: numCourses = 2, prerequisites = [[1,0]]
// Output: [0,1]
// Explanation: There are a total of 2 courses to take. To take course 1 you
// should have finished course 0. So the correct course order is[0, 1].
//
// Example 2:
// Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
// Output: [0,2,1,3]
// Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
// So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
//
// Example 3:
// Input: numCourses = 1, prerequisites = []
// Output: [0]
//

//
// CODE
//
function createCourseSchedule(courseCount, prerequisites) {
   // Step 1 -> Create graph
   const graph = {};
   for (let prereq of prerequisites) {
      const [after, before] = prereq;
      graph[before] = graph[before] || { inDegrees: 0, children: [] };
      graph[after] = graph[after] || { inDegrees: 0, children: [] };
      graph[before].children.push(after);
      graph[after].inDegrees += 1;
   }

   // Step 2 -> Find root nodes
   const sources = [];
   for (let nodeId in graph) {
      if (graph[nodeId].inDegrees === 0) {
         sources.push(Number(nodeId));
      }
   }

   // Step 3 -> Generate order
   const order = [];
   while (sources.length > 0) {
      const courseId = sources.shift();
      for (let depCourseId of graph[courseId].children) {
         graph[depCourseId].inDegrees--;
         if (graph[depCourseId].inDegrees === 0) {
            sources.push(depCourseId);
         }
      }
      order.push(courseId);
   }

   // Step 4 -> Find one-off courses and detect cyclic dependancy
   let courseNo = 0;
   while (order.length < courseCount) {
      if (!graph[courseNo]) {
         // found a course that neither have any prereq nor any course has it has prereq.
         order.unshift(courseNo);
      } else {
         // cyclic depedency - cannot build the order
         if (graph[courseNo].inDegrees > 0) {
            return [];
         }
         delete graph[courseNo];
      }
   }

   // Step 5 -> Return the order
   return order;
}

//
// TEST
//
console.log(
   createCourseSchedule(2, [
      [1, 0],
      [0, 1],
   ])
);

console.log(createCourseSchedule(2, [[1, 0]]));

console.log(
   createCourseSchedule(4, [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
   ])
);

console.log(createCourseSchedule(1, []));
