//O(2N)T -> Dropping Constant -> O(N)T
//O(c) -> number of unique characters in string
function firstNonRepeatingCharacter(string) {
   const frequencies = {};
   for (let char of string) { // N
      if (!frequencies[char]) frequencies[char] = 0;
      frequencies[char] += 1;
   }

   for (let i = 0; i < string.length; i++) { // N
      if (frequencies[string[i]] === 1) return i;
   }
   return -1;
}

//O(N^2)T 
//O(1)S
function firstNonRepeatingCharacter(string) {
   for (let i = 0; i < string.length; i++) {
      let duplicate = false;
      for (let j = 0; j < string.length; j++) {
         console.log(i, j, string[i], string[j]);
         if (string[i] === string[j] && i !== j) duplicate = true;
      }
      if (!duplicate) return i;
   }

   return -1;
}