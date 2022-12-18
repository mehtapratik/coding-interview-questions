//
// INSTRUCTIONS
//
// We are given a ribbon of length ‘n’ and a set of possible ribbon lengths. We need to cut the ribbon
// into the maximum number of pieces that comply with the above - mentioned possible lengths. Write a
// method that will return the count of pieces.
//

//
// EXAMPLE
//
// n: 5
// Ribbon Lengths: {2,3,5}
// Output: 2
// Explanation: Ribbon pieces will be {2,3}.
//
// n: 7
// Ribbon Lengths: {2,3}
// Output: 3
// Explanation: Ribbon pieces will be {2,2,3}.
//
// n: 13
// Ribbon Lengths: {3,5,7}
// Output: 3
// Explanation: Ribbon pieces will be {3,3,7}.
//

//
// CODE
//
function maxRibbonCut(ribbons, length) {
   const cache = {};
   return memoization(0, length);
   // return tabulation();
   // return tabulation1c();

   // O(r * l)TS
   function memoization(index, remainingLength) {
      const CACHE_KEY = `${index},${remainingLength}`;
      if (CACHE_KEY in cache) {
         return cache[CACHE_KEY];
      }
      if (remainingLength === 0) {
         return 0;
      }
      if (remainingLength < 0 || index >= ribbons.length) {
         return -1;
      }

      let include = 0;
      let exclude = 0;
      if (remainingLength >= ribbons[index]) {
         include = memoization(index, remainingLength - ribbons[index]);
         if (include > -1) {
            include += 1;
         }
      }

      exclude = memoization(index + 1, remainingLength);

      cache[CACHE_KEY] = Math.max(include, exclude);
      return cache[CACHE_KEY];
   }

   // O(r * l)TS
   function tabulation() {
      const table = Array(ribbons.length)
         .fill(0)
         .map(() => Array(length + 1).fill(0));

      for (let r = 0; r < ribbons.length; r++) {
         for (let l = 0; l <= length; l++) {
            let include = 0;
            let exclude = 0;
            if (l >= ribbons[r]) {
               include = table[r][l - ribbons[r]] + 1;
            }

            if (r > 0) {
               exclude = table[r - 1][l];
            }
            table[r][l] = Math.max(include, exclude);
         }
      }
      showSelectedRibbons(table);
      return table;
   }

   function showSelectedRibbons(table) {
      let remainingLength = length;
      let r = ribbons.length - 1;
      while (remainingLength > 0) {
         if (
            r === 0 ||
            table[r][remainingLength] !== table[r - 1][remainingLength]
         ) {
            console.log(
               `Selected ribbon: ${ribbons[r]} | Remaning Length: ${remainingLength}`
            );
            remainingLength -= ribbons[r];
         } else {
            r--;
         }
      }
   }

   // O(r * l)T | O(l)S
   function tabulation1c() {
      const table = Array(length + 1).fill(0);

      for (let r = 0; r < ribbons.length; r++) {
         for (let l = 0; l <= length; l++) {
            let include = 0;
            let exclude = table[l];
            if (l >= ribbons[r]) {
               include = table[l - ribbons[r]] + 1;
            }

            table[l] = Math.max(include, exclude);
         }
      }

      return table[length];
   }
}

//
// TEST
//
console.log(maxRibbonCut([1, 3, 4, 2], 7));
