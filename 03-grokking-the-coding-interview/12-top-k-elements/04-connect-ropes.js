//
// INSTRUCTIONS
//
// Given ‘N’ ropes with different lengths, we need to connect these ropes into one big rope
// with minimum cost.The cost of connecting two ropes is equal to the sum of their lengths.
//

//
// EXAMPLE
//
// Example 1:
// Input: [1, 3, 11, 5]
// Output: 33
// Explanation: First connect 1+3(=4), then 4+5(=9), and then 9+11(=20). So the total cost is 33 (4+9+20)
//
// Example 2:
// Input: [3, 4, 5, 6]
// Output: 36
// Explanation: First connect 3+4(=7), then 5+6(=11), 7+11(=18). Total cost is 36 (7+11+18)
//
// Example 3:
// Input: [1, 3, 11, 5, 2]
// Output: 42
// Explanation: First connect 1+2(=3), then 3+3(=6), 6+5(=11), 11+11(=22). Total cost is 42 (3+6+11+22)
//

//
// CODE
//
const minimum_cost_to_connect_ropes = function (ropeLengths) {
   const minHeap = new Heap(ropeLengths, null, (a, b) => b - a);

   let totalCost = 0;
   while (minHeap.length > 1) {
      const cost = minHeap.pop() + minHeap.pop();
      minHeap.push(cost);
      totalCost += cost;
   }

   return totalCost;
};

//
// TEST
//

console.log(
   `Minimum cost to connect ropes: ${minimum_cost_to_connect_ropes([
      1, 3, 11, 5,
   ])}`
);
console.log(
   `Minimum cost to connect ropes: ${minimum_cost_to_connect_ropes([
      3, 4, 5, 6,
   ])}`
);
console.log(
   `Minimum cost to connect ropes: ${minimum_cost_to_connect_ropes([
      1, 3, 11, 5, 2,
   ])}`
);

//
// COMPLEXITY ANALYSIS
//
// The time complexity of this algorithm is O(N * logN) as we iterating all ropes in the heap.
// In each step, while processing the heap, we take out two elements from the heap and insert
// one.This means we will have a total of ‘N’ steps, having a total time complexity of O(N*logN)
//
// The space complexity will be O(N) because we need pushing all ropes into the heap.
//
