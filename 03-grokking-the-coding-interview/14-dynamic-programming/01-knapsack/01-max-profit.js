//
// INSTRUCTIONS
//
// Given the weights and profits of ‘N’ items, we are asked to put these items in a knapsack
// with a capacity ‘C.’ The goal is to get the maximum profit out of the knapsack items.
// Each item can only be selected once, as we don’t have multiple quantities of any item.
//

//
// EXAMPLE
//
// Let’s take Merry’s example, who wants to carry some fruits in the knapsack to get maximum profit.
// Here are the weights and profits of the fruits:
// Items: { Apple, Orange, Banana, Melon }
// Weights: { 2, 3, 1, 4 }
// Profits: { 4, 5, 3, 7 }
// Knapsack capacity: 5
//
// Let’s try to put various combinations of fruits in the knapsack, such that their total weight
// is not more than 5:
// Apple + Orange (total weight 5) => 9 profit
// Apple + Banana (total weight 3) => 7 profit
// Orange + Banana (total weight 4) => 8 profit
// Banana + Melon (total weight 5) => 10 profit

// This shows that Banana + Melon is the best combination as it gives us the maximum profit,
// and the total weight does not exceed the capacity.
//

//
// PREPARATION
//
class ItemDescription {
   constructor(name, weight, profit) {
      this.name = name;
      this.weight = weight;
      this.profit = profit;
   }
}

//
// CODE
//
function zeroOrOneknapsack(items, capacity) {
   return bottomUpTabulation();

   // COMPLEXITY ANALYSIS
   // -------------------->
   // The above algorithm’s time complexity is exponential O(2^n), where ‘n’ represents the
   // total number of items.This can also be confirmed from the above recursion tree. As we
   // can see, we will have a total of ‘31’ recursive calls – calculated through
   // (2 ^ n) + (2 ^ n) - 1, which is asymptotically equivalent to O(2^n).
   //
   // The space complexity is O(n). This space will be used to store the recursion stack.
   // Since the recursive algorithm works in a depth - first fashion, which means that we
   // can’t have more than ‘n’ recursive calls on the call stack at any time.
   function recursive(index, remainingCapacity) {
      // Base condition
      if (index >= items.length || remainingCapacity <= 0) {
         return { profit: 0, items: [] };
      }

      // Recursive Chain 1 -> Keep current item
      const { profit, weight, name } = items[index];
      let keepChain = { items: [], profit: -Infinity };
      // current item cannot be kept on current chain on recursive path as
      // its weight exceeds remaining weight
      if (weight <= remainingCapacity) {
         keepChain = recursive(index + 1, remainingCapacity - weight);
         keepChain.profit += profit;
         keepChain.items.push(name);
      }

      //Recursive Chain 2 -> Skip current item
      const skipChain = recursive(index + 1, remainingCapacity);

      // Maximize Profit - Pass down the output with greater profit
      if (keepChain.profit > skipChain.profit) {
         return keepChain;
      } else {
         return skipChain;
      }
   }

   // COMPLEXITY ANALYSIS
   // -------------------->
   // Since our memoization array dp[profits.length][capacity+1] stores the results for all subproblems,
   // we can conclude that we will not have more than N∗C subproblems (where ‘N’ is the number of items
   // and ‘C’ is the knapsack capacity). This means that our time complexity will be O(N∗C).
   //
   // The above algorithm will use O(N∗C) space for the memoization array. Other than that, we will use
   // O(N) space for the recursion call - stack.So the total space complexity will be O(N∗C+N), which is
   // asymptotically equivalent to O(N∗C).
   function topDownMemoization(index, remainingCapacity, cache = []) {
      // Base condition
      if (index >= items.length || remainingCapacity <= 0) {
         return { profit: 0, items: [] };
      }

      cache[index] = cache[index] || [];
      if (cache[index][remainingCapacity]) {
         return cache[index][remainingCapacity];
      }

      // Recursive Chain 1 -> Keep current item
      const { profit, weight, name } = items[index];
      let keepChain = { items: [], profit: -Infinity };
      // current item cannot be kept on current chain on recursive path as
      // its weight exceeds remaining weight
      if (weight <= remainingCapacity) {
         keepChain = topDownMemoization(
            index + 1,
            remainingCapacity - weight,
            cache
         );
         keepChain.profit += profit;
         keepChain.items.push(name);
      }

      //Recursive Chain 2 -> Skip current item
      const skipChain = topDownMemoization(index + 1, remainingCapacity, cache);

      // Maximize Profit - Pass down the output with greater profit
      if (keepChain.profit > skipChain.profit) {
         cache[index][remainingCapacity] = keepChain;
      } else {
         cache[index][remainingCapacity] = skipChain;
      }

      return cache[index][remainingCapacity];
   }

   // COMPLEXITY ANALYSIS
   // -------------------->
   // The above solution has the time and space complexity of O(N∗C), where ‘N’ represents total items,
   // and ‘C’ is the maximum capacity.
   function bottomUpTabulation() {
      const NO_PROFIT_OBJ = { profit: 0, items: [] };
      if (capacity <= 0 || items.length === 0) {
         return NO_PROFIT_OBJ;
      }

      // table of items by capacity
      const profitTable = Array(items.length)
         .fill(0)
         .map(() => Array(capacity + 1).fill(NO_PROFIT_OBJ));

      // we can't achieve any profit we don't have any capacity
      // hence, populate all items (row) with capacity zero (0th column) with 0 profit.
      for (let i = 0; i < items.length; i++) {
         // this step is for illustration only. if you notice above, each element in JS table
         // is already initialized with zero profit therefore, this isn't really necessary
         profitTable[i][0] = NO_PROFIT_OBJ;
      }

      // if we have only one weight, we will take it if it is not more than the capacity
      for (let c = 1; c <= capacity; c++) {
         if (items[0].weight <= c) {
            profitTable[0][c] = { profit: items[0].profit, items: [items[0]] };
         }
      }

      for (let i = 1; i < items.length; i++) {
         for (let c = 1; c <= capacity; c++) {
            let keepItem = NO_PROFIT_OBJ;
            let skipItem = NO_PROFIT_OBJ;
            const { profit, weight } = items[i];
            // keep the item, if it is not more than the capacity
            if (weight <= c) {
               // adding the profit from the co-ordinate where we substract current
               // item's weight
               relatedItem = profitTable[i - 1][c - weight];
               keepItem = {
                  profit: relatedItem.profit + profit,
                  items: [...relatedItem.items, items[i]], // deep copy
               };
            }
            // skip item
            skipItem = profitTable[i - 1][c];

            if (keepItem.profit > skipItem.profit) {
               profitTable[i][c] = keepItem;
            } else {
               profitTable[i][c] = skipItem;
            }
         }
      }

      showSelectedItems(profitTable);
      // maximum profit will be at the bottom-right corner.
      return profitTable[items.length - 1][capacity];
   }

   function showSelectedItems(dp) {
      let remainingCapacity = capacity;
      let remainingProfit = dp[items.length - 1][capacity].profit;
      for (let i = items.length - 1; i > 0; i--) {
         if (remainingProfit !== dp[i - 1][remainingCapacity].profit) {
            console.log(items[i]);
            remainingCapacity -= items[i].weight;
            remainingProfit -= items[i].profit;
         }
      }
   }

   // COMPLEXITY ANALYSIS
   // -------------------->
   // O(N*C)T | O(2C)S -> O(C)S
   // Can we improve our bottom-up DP solution even further? Can you find an algorithm that
   // has O(C) space complexity?
   //
   // We only need one previous row to find the optimal solution!
   //
   // The solution above is similar to the previous solution; the only difference is that we use i%2
   // instead of i and(i - 1) % 2 instead of i - 1. This solution has a space complexity of
   // O(2∗C)=O(C), where ‘C’ is the knapsack’s maximum capacity.
   function buTabulation2C() {
      const NO_PROFIT_OBJ = { profit: 0, items: [] };
      if (capacity <= 0 || items.length === 0) {
         return NO_PROFIT_OBJ;
      }

      // we only need one previous row to find the optimal solution, overall we need '2' rows
      // the above solution is similar to the previous solution, the only difference is that
      // we use `i%2` instead if `i` and `(i-1)%2` instead if `i-1`
      const profitTable = Array(2)
         .fill(0)
         .map(() => Array(capacity + 1).fill(NO_PROFIT_OBJ));

      // if we have only one weight, we will take it if it is not more than the capacity
      for (let c = 1; c <= capacity; c++) {
         if (items[0].weight <= c) {
            profitTable[0][c] = { profit: items[0].profit, items: [items[0]] };
         }
      }

      for (let i = 1; i < items.length; i++) {
         for (let c = 1; c <= capacity; c++) {
            let keepItem = NO_PROFIT_OBJ;
            let skipItem = NO_PROFIT_OBJ;
            const { profit, weight } = items[i];
            // keep the item, if it is not more than the capacity
            if (weight <= c) {
               // adding the profit from the co-ordinate where we substract current
               // item's weight
               relatedItem = profitTable[(i - 1) % 2][c - weight];
               keepItem = {
                  profit: relatedItem.profit + profit,
                  items: [...relatedItem.items, items[i]], // deep copy
               };
            }
            // skip item
            skipItem = profitTable[(i - 1) % 2][c];

            if (keepItem.profit > skipItem.profit) {
               profitTable[i % 2][c] = keepItem;
            } else {
               profitTable[i % 2][c] = skipItem;
            }
         }
      }

      return profitTable[(items.length - 1) % 2][capacity];
   }

   // COMPLEXITY ANALYSIS
   // -------------------->
   // O(N*C)T | O(C)S
   // This space optimization solution can also be implemented using a single array.
   // It is a bit tricky, but the intuition is to use the same array for the previous
   // and the next iteration! If you see closely, we need two values from the previous
   // iteration  dp[c] and dp[c - weight[i]]
   //
   // Since our inner loop is iterating over c: 0-->capacity, let’s see how this might
   // affect our two required values:
   // 1. When we access dp[c], it has not been overridden yet for the current iteration,
   //    so it should be fine.
   // 2. dp[c-weight[i]] might be overridden if “weight[i] > 0”. Therefore we can’t use
   //    this value for the current iteration.
   // To solve the second case, we can change our inner loop to process in the reverse
   // direction: c: capacity-- > 0. This will ensure that whenever we change a value
   // in dp[], we will not need it again in the current iteration.
   function buTabulationC() {
      const NO_PROFIT_OBJ = { profit: 0, items: [] };
      if (items.length === 0 || capacity <= 0) {
         return NO_PROFIT_OBJ;
      }

      const profitTable = Array(capacity + 1).fill(NO_PROFIT_OBJ);

      for (let c = 1; c <= capacity; c++) {
         if (items[0].weight <= c) {
            profitTable[c] = { profit: items[0].profit, items: [items[0]] };
         }
      }

      for (let i = 1; i < items.length; i++) {
         for (let c = capacity; c >= 0; c--) {
            let keepItem = NO_PROFIT_OBJ;
            let skipItem = NO_PROFIT_OBJ;
            const curItem = items[i];
            const prevItem = profitTable[c - curItem.weight];
            if (curItem.weight <= c) {
               keepItem = {
                  profit: prevItem.profit + curItem.profit,
                  items: [...prevItem.items, curItem],
               };
            }

            skipItem = profitTable[c];

            if (keepItem.profit > skipItem.profit) {
               profitTable[c] = keepItem;
            } else {
               profitTable[c] = skipItem;
            }
         }
      }

      return profitTable[capacity];
   }
}

//
// TEST
//
const items1 = [
   new ItemDescription("Apple", 2, 4),
   new ItemDescription("Orange", 3, 5),
   new ItemDescription("Banana", 1, 3),
   new ItemDescription("Melon", 4, 7),
];

console.log(zeroOrOneknapsack(items1, 5));

const items2 = [
   new ItemDescription("a", 1, 1),
   new ItemDescription("b", 2, 6),
   new ItemDescription("c", 3, 10),
   new ItemDescription("d", 5, 16),
];

console.log(zeroOrOneknapsack(items2, 7));
