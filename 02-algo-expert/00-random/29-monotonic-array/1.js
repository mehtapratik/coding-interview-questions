// O(N)T | O(1)S
function isMonotonic(array) {
   if (Array.isArray(array) === false) return false;
   if (array.length <= 2) return true;

   let dir = array[0] - array[1];
   for (let i = 2; i < array.length; i++) {
      if (dir === 0) {
         dir = array[i - 1] - array[i];
      }
      else {
         const diff = array[i - 1] - array[i];
         if (dir > 0 && diff < 0) return false;
         if (dir < 0 && diff > 0) return false;
         // dif is zero, which is fine. continue to next num in array
     }
   }

   return true;
}


// O(N)T | O(1)S
function isMonotonic(array) {
   if (Array.isArray(array) === false) return false;
   if (array.length <= 2) return true;

   let isForward = true;
   let isBackward = true;

   for (let i = 1; i < array.length; i++) {
      const prevNum = array[i - 1];
      const currentNum = array[i];

      if (prevNum < currentNum) isBackward = false;
      if (prevNum > currentNum) isForward = false;
   }

   return isBackward || isForward;
}