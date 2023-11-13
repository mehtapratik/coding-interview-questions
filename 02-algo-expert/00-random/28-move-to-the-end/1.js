// O(N)T | O(1)S
// O(N)T because inner loop is bounded by the limits of upper loop and both combined
// will never run more than N times.
function moveElementToEnd(array, toMove) {
   const i = 0;
   const j = array.length - 1;

   while (i < j) {
      // find the index <j> starting from tail that IS NOT <toMove> number
      while (i < j && array[j] === toMove) {
         j--;
      }

      // find the index <i> starting from head that IS <toMove> number
      if (array[i] === toMove) {
         [array[i], array[j]] = [array[j], array[i]];
      }
      i++;
   }
   
   return array;
}
