//
// INSTRUCTIONS
//
// Given a string, find all of its permutations preserving the character sequence but changing case.
//

//
// EXAMPLE
//
// Input: "ad52"
// Output: "ad52", "Ad52", "aD52", "AD52"
//
// Input: "ab7c"
// Output: "ab7c", "Ab7c", "aB7c", "AB7c", "ab7C", "Ab7C", "aB7C", "AB7C"
//

//
// EXPLANATION
//
// This problem follows the Subsets pattern and can be mapped to Permutations.
//
// Let’s take Example-2 mentioned above to generate all the permutations.
// Following a BFS approach, we will consider one character at a time.Since we need
// to preserve the character sequence, we can start with the actual string and process
// each character (i.e., make it upper-case or lower-case) one by one:
//
// 1.  Starting with the actual string: "ab7c"
// 2. Processing the first character (‘a’), we will get two permutations: "ab7c", "Ab7c"
// 3. Processing the second character (‘b’), we will get four permutations: "ab7c", "Ab7c", "aB7c", "AB7c"
// 4. Since the third character is a digit, we can skip it.
// 5. Processing the fourth character (‘c’), we will get a total of eight permutations: "ab7c", "Ab7c", "aB7c", "AB7c", "ab7C", "Ab7C", "aB7C", "AB7C"
//
// Let’s analyze the permutations in the 3rd and the 5th step.How can we generate the permutations in
// the 5th step from the permutations in the 3rd step ?
//
// If we look closely, we will realize that in the 5th step, when we processed the new character (‘c’),
// we took all the permutations of the previous step(3rd) and changed the case of the letter(‘c’) in them
// to create four new permutations.
//

//
// CODE
//
const find_letter_case_string_permutations = function (str) {
   const permutations = [str];

   for (let i = 0; i < str.length; i++) {
      // Assuming `str` consists of only alpha-numeric chars.
      // Only process non - numeric characters
      if (isNaN(Number(str[i]))) {
         // avoid infinite loop by taking len as constant value
         // since we're inserting permutations inside for loop
         const len = permutations.length;
         // process all existing permutations to switch
         // current char's case to uppercase
         for (let j = 0; j < len; j++) {
            const newPermutation = permutations[j].split("");
            if (newPermutation[i] === newPermutation[i].toUpperCase()) {
               newPermutation[i] = newPermutation[i].toLowerCase();
            } else {
               newPermutation[i] = newPermutation[i].toUpperCase();
            }
            permutations.push(newPermutation.join(""));
         }
      }
   }
   return permutations;
};

//
// OR
//

const find_letter_case_string_permutations1 = function (str) {
   const permutations = [""];

   for (let char of str) {
      const len = permutations.length;
      for (let i = 0; i < len; i++) {
         const current = permutations.shift();
         permutations.push([current + char.toLowerCase()]);
         if (char.toLowerCase() !== char.toUpperCase()) {
            permutations.push([current + char.toUpperCase()]);
         }
      }
   }
   return permutations;
};

//
// TEST
//
console.log(
   `String permutations are: ${find_letter_case_string_permutations("abcd")}`
);
console.log(
   `String permutations are: ${find_letter_case_string_permutations("ad52")}`
);
console.log(
   `String permutations are: ${find_letter_case_string_permutations("ab7c")}`
);
console.log(
   `String permutations are: ${find_letter_case_string_permutations1("abcd")}`
);
console.log(
   `String permutations are: ${find_letter_case_string_permutations1("ad52")}`
);
console.log(
   `String permutations are: ${find_letter_case_string_permutations1("ab7c")}`
);

//
// COMPLEXITY ANALYSIS
//
// Since we can have 2^N permutations at the most and while processing each permutation we convert it into a character array,
// the overall time complexity of the algorithm will be O(N * 2^N).
//
// All the additional space used by our algorithm is for the output list. Since we can have a total of 2^N permutations,
// the space complexity of our algorithm is O(N * 2^N).
//
