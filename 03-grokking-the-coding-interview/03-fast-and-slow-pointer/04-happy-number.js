/*
Any number will be called a happy number if, after repeatedly replacing it with a number equal to the sum of the square 
of all of its digits, leads us to number ‘1’. All other (not-happy) numbers will never reach ‘1’. Instead, they will be 
stuck in a cycle of numbers which does not include ‘1’.

Example 1:
Input: 23   
Output: true (23 is a happy number)  
Explanations: Here are the steps to find out that 23 is a happy number:

Example: 2
Input: 12   
Output: false (12 is not a happy number)  
Explanations: Here are the steps to find out that 12 is not a happy number:

...
...
Step ‘13’ leads us back to step ‘5’ as the number becomes equal to ‘89’, 
this means that we can never reach ‘1’, therefore, ‘12’ is not a happy number.
*/

/*
23
base = 23 / 10 = floored = 2
rem = 23 % 10 = 3
{
   23: true,
   13: true
}
lastnum = num

newNum = 4 + 9 = 13
if(newNum === 1) return true;
if(newNum in hash) return false;
lastNum = newNew;

*/

// Method 1 - Per Educative
const find_happy_number = function (num, hash = {}) {
   let fast = getSquaredNumber(num); // 10
   let slow = getSquaredNumber(getSquaredNumber(num)); // 1

   while (fast !== slow) {
      fast = getSquaredNumber(getSquaredNumber(fast));
      slow = getSquaredNumber(slow);
   }

   return fast === 1;
};
//23
// 4 + 9 = 13
// 1 + 9 = 10
// 1 + 0 = 1
function getSquaredNumber(num) {
   let sum = 0;
   while (num > 0) {
      const mod = num % 10;
      sum += mod * mod;
      num = Math.floor(num / 10);
   }

   return sum;
}

// Method 2 - My Method
const find_happy_number = function (num, hash = {}) {
   if (num === 1) return true;
   let sum = 0;
   while (num > 0) {
      const rem = num % 10;
      sum += rem * rem;
      num = Math.floor(num / 10);
   }
   if (sum in hash) return false;
   hash[sum] = true;
   return find_happy_number(sum, hash);
};

console.log(`${find_happy_number(23)}`);
console.log(`${find_happy_number(12)}`);
