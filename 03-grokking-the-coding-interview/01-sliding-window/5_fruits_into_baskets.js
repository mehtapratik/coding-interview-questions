/*
Given an array of characters where each character represents a fruit tree, you are given two baskets, and 
your goal is to put maximum number of fruits in each basket. The only restriction is that each basket can 
have only one type of fruit.

You can start with any tree, but you can’t skip a tree once you have started. You will pick one fruit from 
each tree until you cannot, i.e., you will stop when you have to pick from a third fruit type.

Write a function to return the maximum number of fruits in both baskets.

Example 1:
Input: Fruit=['A', 'B', 'C', 'A', 'C']
Output: 3
Explanation: We can put 2 'C' in one basket and one 'A' in the other from the subarray ['C', 'A', 'C']

Example 2:
Input: Fruit=['A', 'B', 'C', 'B', 'B', 'C']
Output: 5
Explanation: We can put 3 'B' in one basket and two 'C' in the other basket. 
This can be done if we start with the second letter: ['B', 'C', 'B', 'B', 'C']
*/

/*     |
["A", "B", "C", "B", "B", "C"]
                           |
      start       end      chars
      0 - 0       0        {} -> {a:1}
      0 - 0       1        {a: 1} -> {a:1, b:1}
      0 - 1       2        {a:1, b:1, c:1} -> {b:1, c:1}
      1           3        {b:1, c:1} -> {b:2, c:1}
      1           4        {b:2, c:1} -> {b:3, c:1}
      1           5        {b:3, c:1} -> {b:3, c:2}

      <- end - start + 1
*/

const fruits_into_baskets = function (fruits) {
   let windowStart = 0;
   let distinctFruitCount = 0;
   let maxFruitsInBasket = -Infinity;
   const charMap = {};

   for (let windowEnd = 0; windowEnd < fruits.length; windowEnd++) {
      const currentFruit = fruits[windowEnd];

      if (!(currentFruit in charMap)) {
         charMap[currentFruit] = 0;
         distinctFruitCount++;
      }
      charMap[currentFruit]++;

      while (distinctFruitCount > 2) {
         const formerFruit = fruits[windowStart];
         windowStart++;
         charMap[formerFruit]--;
         if (charMap[formerFruit] === 0) {
            distinctFruitCount--;
            delete charMap[formerFruit];
         }
      }

      maxFruitsInBasket = Math.max(
         maxFruitsInBasket,
         windowEnd - windowStart + 1
      );
   }

   return maxFruitsInBasket;
};

console.log(fruits_into_baskets(["A", "B", "C", "A", "C"]));
