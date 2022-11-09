//
// INSTRUCTIONS
//
// Given a string, find if its letters can be rearranged in such a way that no two same
// characters come next to each other.

//
// EXAMPLE
//
// Input: "aappp"
// Output: "papap"
// Explanation: In "papap", none of the repeating characters come next to each other.
//
// Input: "Programming"
// Output: "rgmrgmPiano" or "gmringmrPoa" or "gmrPagimnor", etc.
// Explanation: None of the repeating characters come next to each other.
//
// Input: "aapa"
// Output: ""
// Explanation: In all arrangements of "aapa", atleast two 'a' will come together e.g., "apaa", "paaa".
//

//
// CODE
//
function rearrangeString(input) {
   // Build hashmap of each character's repeat counts
   const frequencyMap = {};
   for (let inputChar of input) {
      if (!(inputChar in frequencyMap)) {
         frequencyMap[inputChar] = 0;
      }
      frequencyMap[inputChar] += 1;
   }

   // Build max heap that prioritizes character with maximum repeat counts to the top
   const maxHeap = new Heap([], null, (a, b) => a[1] - b[1]);
   for (let inputChar in frequencyMap) {
      maxHeap.push([inputChar, frequencyMap[inputChar]]);
   }

   const outputChars = [];
   let previousChar = null;
   let previousCount = 0;
   while (maxHeap.length > 0) {
      const [inputChar, frequency] = maxHeap.pop();
      // add the previous entry back in the heap if its frequency is greater than zero
      if (previousCount > 0) {
         maxHeap.push([previousChar, previousCount]);
      }

      // append the current character to the result string and decrement its count
      outputChars.push(inputChar);
      previousChar = inputChar;
      previousCount = frequency - 1; // decrement the frequency
   }

   // if we were successful in appending all the characters to the result string, return it
   if (outputChars.length === input.length) {
      return outputChars.join("");
   }

   return "[none]";
}

//
// TEST
//
console.log(rearrangeString("aappp"));
console.log(rearrangeString("Programming"));
console.log(rearrangeString("aapa"));

//
// COMPLEXITY ANALYSIS
//
// O(N * logN)T
// The time complexity of the above algorithm is O(N∗logN) where ‘N’ is the number
// of characters in the input string.
//
// O(N)S
// The space complexity will be O(N), as in the worst case, we need to store all
// the ‘N’ characters in the HashMap.
//
