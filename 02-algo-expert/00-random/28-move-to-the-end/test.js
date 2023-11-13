function moveElementToEnd(array, toMove) {
   let availableIndex = array.length - 1;
   for (let i = array.length - 1; i > -1; i--) {
      while (array[availableIndex] === toMove) {
         availableIndex--;
      }
      if (array[i] === toMove && availableIndex > i) {
         console.log(i, availableIndex, array[i], array[availableIndex], array);
         [array[availableIndex], array[i]] = [array[i], array[availableIndex]];
         console.log(i, availableIndex, array[i], array[availableIndex], array);
      }
   }

   return array;
}