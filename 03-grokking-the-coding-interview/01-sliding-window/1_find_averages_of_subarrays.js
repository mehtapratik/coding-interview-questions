/*
   Given an array, find the average of all contiguous subarrays of size ‘K’ in it.

   Input: Array: [1, 3, 2, 6, -1, 4, 1, 8, 2], K=5
   Output: [2.2, 2.8, 2.4, 3.6, 2.8]
*/

function find_averages_of_subarrays(K, arr) {
  let from = 0;
  let sum = 0;
  const averages = [];
  for(let to = 0; to < arr.length; to++) {
    sum+= arr[to];
    if(to - from === K - 1) {
      averages.push(sum / K);
      sum-= arr[from];
      from++;
    }
  }
  return averages;
}
const result = find_averages_of_subarrays(5, [1, 3, 2, 6, -1, 4, 1, 8, 2]);
console.log(`Averages of subarrays of size K: ${result}`);
