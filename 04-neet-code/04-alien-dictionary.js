//
// INSTRUCTIONS
//
// There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.
//
// You are given a list of strings words from the alien language's dictionary, where the strings in words are
// sorted lexicographically
//  by the rules of this new language.
//
// Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by
// the new language's rules. If there is no solution, return "". If there are multiple solutions, return any of them.
//

//
// EXAMPLE
//
// Example 1:
// Input: words = ["wrt","wrf","er","ett","rftt"]
// Output: "wertf"
// Example 2:
// Input: words = ["z","x"]
// Output: "zx"
// Example 3:
// Input: words = ["z","x","z"]
// Output: ""
// Explanation: The order is invalid, so return "".
//

//
// CODE
//

// In step ‘d’, each task can become a source only once and each edge (a rule) will be accessed
// and removed once.Therefore, the time complexity of the above algorithm will be O(V+E),
// where ‘V’ is the total number of different characters and ‘E’ is the total number of
// the rules in the alien language.Since, at most, each pair of words can give us one rule,
// therefore, we can conclude that the upper bound for the rules is O(N) where ‘N’ is the number
// of words in the input.So, we can say that the time complexity of our algorithm is O(V+N).
function alienDictionary(words) {
   // Step 1 Build the graph
   const graph = {};
   for (let i = 0; i < words.length - 1; i++) {
      const [current, next] = [words[i], words[i + 1]];

      // invalid dictionary. next word is a prefix of current word.
      // e.g. "backpack" followed by "back" is invalid. "back" must come before "backpack"
      if (current.length > next.length && current.indexOf(next) === 0) {
         return "";
      }

      for (let j = 0; j < Math.min(current.length, next.length); j++) {
         const [parent, child] = [current[j], next[j]];

         if (parent !== child) {
            graph[parent] = graph[parent] || { inDegrees: 0 };
            graph[parent][child] = (graph[parent][child] || 0) + 1;
            graph[child] = graph[child] || { inDegrees: 0 };
            graph[child].inDegrees += 1;
            break;
         }
      }
   }

   // Step 2 find root nodes
   const rootNodes = [];
   for (let node in graph) {
      if (graph[node].inDegrees === 0) {
         rootNodes.push(node);
      }
   }

   // Step 3 Identify order
   const order = [];
   while (rootNodes.length) {
      const root = rootNodes.shift();
      order.push(root);
      for (let dependent in graph[root]) {
         const childNode = graph[dependent];
         if (!childNode) continue; //e.g. inDegrees property of root node should be ignored
         childNode.inDegrees -= graph[root][dependent];
         if (childNode.inDegrees === 0) {
            rootNodes.push(dependent);
         }
      }
   }

   if (order.length !== Object.keys(graph).length) {
      return "";
   }

   return order.join("");
}

//
// TEST
//

console.log(alienDictionary(["wrt", "wrf", "er", "ett", "rftt"]));
console.log(alienDictionary(["z", "x"]));
console.log(alienDictionary(["z", "x", "z"]));

console.log(`Character order: ${alienDictionary(["ba", "bc", "ac", "cab"])}`);
console.log(`Character order: ${alienDictionary(["backpack", "back", "a"])}`);
console.log(`Character order: ${alienDictionary(["back", "backpack", "a"])}`);
console.log(
   `Character order: ${alienDictionary(["ba", "bc", "ac", "cab", "bac"])}`
);

console.log(`Character order: ${alienDictionary(["cab", "aaa", "aab"])}`);
console.log(
   `Character order: ${alienDictionary([
      "ywx",
      "wz",
      "xww",
      "xz",
      "zyy",
      "zwz",
   ])}`
);
console.log(
   `Character order: ${alienDictionary(["bat", "bet", "car", "cell", "egg"])}`
);
