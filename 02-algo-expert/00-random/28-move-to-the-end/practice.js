// [2, 1, 2, 2, 2, 3, 4, 2]
// 2
// availableIdx = 6
function moveElementToEnd(array, toMove) {
   let availableIndex = array.length - 1;
   for (let i = array.length - 1; i > -1; i--) {
      while (array[availableIndex] === toMove) {
         availableIndex--;
      }
      if (array[i] === toMove && availableIndex > i) {
         [array[availableIndex], array[i]] = [array[i], array[availableIndex]];
      }
   }

   return array;
}

function moveElementToEnd(array, toMove) {
   let i = 0;
   let j = array.length - 1;
   while (i < j) {
      while (i < j && array[j] === toMove) j--;
      if (array[i] === toMove) {
         [array[j], array[i]] = [array[i], array[j]];
      }
      i++;
   }
   return array;
}