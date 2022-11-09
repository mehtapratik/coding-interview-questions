//
// INSTRUCTIONS
//
// Given a string and a number ‘K’, find if the string can be rearranged such that the same
// characters are at least ‘K’ distance apart from each other.
//

//
// EXAMPLE
//
// Example 1:
// Input: "mmpp", K=2
// Output: "mpmp" or "pmpm"
// Explanation: All same characters are 2 distance apart.
//
// Example 2:
// Input: "Programming", K=3
// Output: "rgmPrgmiano" or "gmringmrPoa" or "gmrPagimnor" and a few more
// Explanation: All same characters are 3 distance apart.
//
// Example 3:
// Input: "aab", K=2
// Output: "aba"
// Explanation: All same characters are 2 distance apart.
//
// Example 4:
// Input: "aappa", K=3
// Output: ""
// Explanation: We cannot find an arrangement of the string where any two 'a' are 3 distance apart.
//

//
// CODE
//
function rearrangeStringKDistance(str, distance) {
   const characterMap = {};
   for (let char of str) {
      if (!(char in characterMap)) {
         characterMap[char] = 0;
      }
      characterMap[char] += 1;
   }

   const maxHeap = new Heap([], null, (a, b) => a[1] - b[1]);
   for (let char in characterMap) {
      maxHeap.push([char, characterMap[char]]);
   }

   let outputChars = [];
   const queue = [];
   while (maxHeap.length > 0) {
      const [char, freq] = maxHeap.pop();
      outputChars.push(char);
      queue.push([char, freq - 1]);
      if (queue.length === distance) {
         const [char, freq] = queue.shift();
         if (freq > 0) {
            maxHeap.push([char, freq]);
         }
      }
   }

   console.log(outputChars, maxHeap, queue);

   if (outputChars.length === str.length) {
      return outputChars.join("");
   }

   return "[none]";
}

//
// TEST
//
console.log(rearrangeStringKDistance("aapp", 2));
console.log(rearrangeStringKDistance("aappaa", 3));

//
// COMPLEXITY ANALYSIS
//
// O(N * logN)T
// The time complexity of the above algorithm is O(N∗logN) where ‘N’ is the number of
// characters in the input string.
//
// O(N + K)S
// The space complexity will be O(N + K). We need to store all the ‘N’ characters in the HashMap.
// And K characters in queue to push them after K length.
