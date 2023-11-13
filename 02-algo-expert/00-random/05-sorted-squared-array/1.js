// O(N)T - Because we're looping thorugh array N time only once
// O(N)S - Because we're creating new array of size length as original input array
function sortedSquaredArray(array) {
   const output = new Array(array.length).fill(-1);

   let left = 0;
   let right = array.length - 1;
   for (let i = output.length - 1; i >= 0; i--) {
      const leftNum = Math.abs(array[left]);
      const rightNum = Math.abs(array[right]);
      if (leftNum > rightNum) {
         output[i] = leftNum * leftNum;
         left++;
      }
      else {
         output[i] = rightNum * rightNum;
         right--;
      }
   }

   return output;
}