function insertionSort(keys, n) {
   if (!Array.isArray(keys) || keys.length < 2) {
      return keys;
   }
   n = Math.min(n ?? keys.length, n);

   for (let i = 1; i < n; i++) {
      let j = i - 1;
      while (j >= 0 && keys[j] > keys[j + 1]) {
         [keys[j], keys[j + 1]] = [keys[j + 1], keys[j]];
         j -= 1;
      }
   }

   return keys;
}
