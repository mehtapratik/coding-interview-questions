//
// INSTRUCTIONS
//
// Given a string, sort it based on the decreasing frequency of its characters.
//

//
// EXAMPLE
//
// Example 1:
// Input: "Programming"
// Output: "rrggmmPiano"
// Explanation: 'r', 'g', and 'm' appeared twice, so they need to appear before any other character.
//
// Example 2:
// Input: "abcbab"
// Output: "bbbaac"
// Explanation: 'b' appeared three times, 'a' appeared twice, and 'c' appeared only once.
//

//
// PREPARATION
//
//
class CharFrequency {
   constructor(char, count) {
      this.char = char;
      this.count = count;
   }
}

//
// CODE
//
function frequencySort(inputString) {
   const hashMap = {};
   const minHeap = new Heap([], null, (a, b) => a.count - b.count);

   for (let inputChar of inputString) {
      if (!(inputChar in hashMap)) {
         hashMap[inputChar] = new CharFrequency(inputChar, 0);
      }
      hashMap[inputChar].count += 1;
   }

   for (let inputChar in hashMap) {
      minHeap.push(hashMap[inputChar]);
   }

   let outputString = [];
   while (minHeap.length > 0) {
      const charFreq = minHeap.pop();
      for (let i = 0; i < charFreq.count; i++) {
         outputString.push(charFreq.char);
      }
   }
   return outputString.join("");
}

//
// TEST
//
console.log(frequencySort("Programming"));
console.log(frequencySort("abcbab"));

//
// COMPLEXITY ANALYSIS
//
// The time complexity of the above algorithm is O(D*logD) where ‘D’ is the number of distinct
// characters in the input string.This means, in the worst case, when all characters are unique
// the time complexity of the algorithm will be O(N*logN) where ‘N’ is the total number of
// characters in the string.
//
// The space complexity will be O(N) as in the worst case, we need to store all the
// ‘N’ characters in the HashMap.
//
