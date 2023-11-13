// [ -9, 1, 2, 3, 4, 5, 6]
function sortedSquaredArray(array) {
   array.sort((a, b) => a - b);

   const squaredArray = new Array(array.length).fill(null);

   let start = 0;
   let end = array.length - 1;
   
   for (let i = array.length - 1; i >= 0; i--) {
      const tailNum = array[end];
      const headNum = array[start];
      if (Math.abs(headNum) > Math.abs(tailNum)) {
         squaredArray[i] = headNum * headNum;
         start++;
      } else {
         squaredArray[i] = tailNum * tailNum;
         end--;
      }
   }

   return squaredArray;
}