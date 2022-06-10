/*
Palindrome is a string that's same when reversed

"racecar" reversed is same, i.e. "racecar".
"a" reversed is same, i.e. "a".
*/

function isPalindrome(str) {
   // Best approach is approach 4 due to its minimal space complexity
   return approach_4(str, 0, str.length - 1);

   // O(N)T | O(N)S
   // Space complexity due to the fact that we're mutating the original string
   // to pass down smaller version of the string to check palindrome. Additionally,
   // callstack frames will also amount to same amount of space complexity O(n / 2) => O(n)
   function approach_1(str) {
      if (str.length < 2) {
         return true;
      }
      if (str[0] !== str[str.length - 1]) {
         return false;
      }
      return approach_1(str.substr(1, str.length - 2));
   }

   // If you use string
   //    O(N^2)T - Because strings are immutable in JavaScript. Everytime you do newString+= string[i]
   //              It has to go through old newString char by char and add new letter to the end and then
   //              discard old newString.
   //    O(N)S   - We are creating new reversed version of the string
   // If you use array
   // O(N)T        Here you are not mutating immutable string but pushing into the end of the array
   // O(N)S        You are storing reversed version of string in array
   function approach_2(str) {
      // let reversedString = ''; // option 1
      const reversedStringArray = []; // option 2

      for (let i = str.length - 1; i >= 0; i--) {
         // O(N)
         // reversedString += string[i]; // O(N)
         reversedStringArray.push(str[i]);
      }

      // return reversedString === str;
      return reversedStringArray.join("") === str;
   }

   // O(N)T - Since we're looping through string in N/2 time but we drop the constant so it turns out to be N
   // O(N)S - Since we're adding N/2 items in call stack. This is a tail recursion call (i.e. recursive call is at the tail
   //         of the program and it decides the final outcome). In tail recursion calls, program may not need to keep track of
   //         previous calls in stack since they state is not relevant anymore. In such case, compiler may optimize the
   //         program and make space complexity to O(1) but it is always safe to assume that compiler may not and
   //         your space complexity may end-up being O(N)S.
   function isPalindrome(str, start, end) {
      if (start >= end) {
         return true;
      }
      if (str[start] !== str[end]) {
         return false;
      }
      return isPalindrome(str, ++start, --end);
   }

   // O(N)T | O(1)S - Use this approach for interview due to its minimal space complexity
   function approach_4(str) {
      if (typeof str !== "string") {
         return false;
      }
      if (str.length < 2) {
         return true;
      }

      let start = 0;
      let end = str.length - 1;
      while (start < end) {
         if (str[start] !== str[end]) {
            return false;
         }

         start++;
         end--;
      }

      return true;
   }
}

console.log(isPalindrome("pratikaakitarp"));
