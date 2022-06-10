/*
   Find binary of a given number by perfoming calculation in following manner:

   Input => 233

   Floor of 233 / 2 = 116           233 % 2 =   1
   116 / 2 = 58                     116 % 2 =   0
   58 / 2 = 29                      58 % 2  =   0
   29 / 2 = 14                      29 % 2  =   1
   14 / 2 = 7                                   0
   7 / 2  = 3                                   1
   3 / 2  = 1                                   1
   1 / 2  = 0                                   1
   0 ====> return the accumulated output 10010111
*/
function findBinary(num, binary = "") {
   console.log(binary);
   if (num === 0) return binary;
   binary += num % 2;
   return findBinary(num, binary);
}

console.log(findBinary(233));
