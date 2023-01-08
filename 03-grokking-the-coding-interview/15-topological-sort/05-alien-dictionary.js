\//
// INSTRUCTIONS
//
// There is a dictionary containing words from an alien language for which we don’t know the ordering
// of the letters.Write a method to find the correct order of the letters in the alien language.
// It is given that the input is a valid dictionary and there exists an ordering among its letters.
//

//
// EXAMPLE
//
// Input: Words: ["ba", "bc", "ac", "cab"]
// Output: bac
// Explanation: Given that the words are sorted lexicographically by the rules of the alien language, so
// from the given words we can conclude the following ordering among its characters:
// 1. From "ba" and "bc", we can conclude that 'a' comes before 'c'.
// 2. From "bc" and "ac", we can conclude that 'b' comes before 'a'
// From the above two points, we can conclude that the correct character order is: "bac"
//
// Input: Words: ["cab", "aaa", "aab"]
// Output: cab
// Explanation: From the given words we can conclude the following ordering among its characters:
// 1. From "cab" and "aaa", we can conclude that 'c' comes before 'a'.
// 2. From "aaa" and "aab", we can conclude that 'a' comes before 'b'
// From the above two points, we can conclude that the correct character order is: "cab"
//
// Input: Words: ["ywx", "wz", "xww", "xz", "zyy", "zwz"]
// Output: ywxz
// Explanation: From the given words we can conclude the following ordering among its characters:
// 1. From "ywx" and "wz", we can conclude that 'y' comes before 'w'.
// 2. From "wz" and "xww", we can conclude that 'w' comes before 'x'.
// 3. From "xww" and "xz", we can conclude that 'w' comes before 'z'
// 4. From "xz" and "zyy", we can conclude that 'x' comes before 'z'
// 5. From "zyy" and "zwz", we can conclude that 'y' comes before 'w'
// From the above five points, we can conclude that the correct character order is: "ywxz"
//

//
// CODE
//
function alienDictionary(words) {
   return dfs();
   return bfs();

   // O(v + n)TS
   // In step ‘d’, each task can become a source only once and each edge (a rule) will be accessed
   // and removed once.Therefore, the time complexity of the above algorithm will be O(V+E),
   // where ‘V’ is the total number of different characters and ‘E’ is the total number of
   // the rules in the alien language.Since, at most, each pair of words can give us one rule,
   // therefore, we can conclude that the upper bound for the rules is O(N) where ‘N’ is the number
   // of words in the input.So, we can say that the time complexity of our algorithm is O(V+N).
   function dfs() {
      // # 1. Build the graph with adjacency list
      const graph = {};
      for (let i = 0; i < words.length - 1; i++) {
         const [current, next] = [words[i], words[i + 1]];

         // it is not possible to come up with valid sequence when next word is
         // prefix of current word, e.g. 'backpack', 'back' is invalid sequence
         if (next.length < current.length && current.indexOf(next) === 0) {
            return "";
         }

         for (let j = 0; j < Math.min(current.length, next.length); j++) {
            const [before, after] = [current[j], next[j]];
            if (before !== after) {
               graph[before] = graph[before] || { inDegrees: 0 };
               graph[after] = graph[after] || { inDegrees: 0 };
               graph[before][after] = (graph[before][after] || 0) + 1;
               graph[after].inDegrees += 1;
               break;
            }
         }
      }

      const sortOrder = [];
      // chars that are already sorted
      const explored = {};
      // chars that are in process or being sorted but waiting for
      // dependent to be sorted as well, e.g. a.exploring will be true until all it's
      // dependents are sorted as well such as a -> b -> c
      const exploring = {};
      for (let char in graph) {
         // we only want to process source nodes
         if (graph[char].inDegrees > 0) continue;
         if (recursion(char) === false) {
            // invalid dictionary - characters are cyclic, e.g. a -> b -> a
            return "";
         }
      }

      return sortOrder;

      function recursion(char) {
         const node = graph[char];
         if (char in explored) return true;
         if (char in exploring || node.inDegrees > 0) return false;

         exploring[char] = true;

         sortOrder.push(char);
         for (let nextChar in node) {
            const nextNode = graph[nextChar];
            if (!nextNode || !nextNode.inDegrees) continue;
            nextNode.inDegrees -= node[nextChar];
            if (nextNode.inDegrees === 0) {
               if (recursion(nextChar) === false) {
                  return false;
               }
            }
         }

         delete exploring[char];
         explored[char] = true;

         return true;
      }
   }

   // O(v + n)TS
   // In step ‘d’, each task can become a source only once and each edge (a rule) will be accessed
   // and removed once.Therefore, the time complexity of the above algorithm will be O(V+E),
   // where ‘V’ is the total number of different characters and ‘E’ is the total number of
   // the rules in the alien language.Since, at most, each pair of words can give us one rule,
   // therefore, we can conclude that the upper bound for the rules is O(N) where ‘N’ is the number
   // of words in the input.So, we can say that the time complexity of our algorithm is O(V+N).
   function bfs() {
      // 1. Build the graph with adjacency list
      const graph = {};

      for (let i = 0; i < words.length - 1; i++) {
         const [current, next] = [words[i], words[i + 1]];

         // it is not possible to come up with valid sequence when next word is
         // prefix of current word, e.g. 'backpack' & 'back'
         if (next.length < current.length && current.indexOf(next) === 0) {
            return "";
         }

         for (let j = 0; j < Math.min(current.length, next.length); j++) {
            const [parent, child] = [current[j], next[j]];

            if (parent !== child) {
               graph[parent] = graph[parent] || { inDegrees: 0 };
               graph[child] = graph[child] || { inDegrees: 0 };

               // most dictionary will have same characters folowing each other many times, e.g. bat, bet, car, cell, egg.
               // In this case `a` comes before `e` will yield two times. when we add `a` into sort order `b` should be
               // reduced by 2 degrees. therefore, we are tracking count of parent/child relationship to reduce the degrees
               // as many times.
               graph[parent][child] = (graph[parent][child] || 0) + 1;
               graph[child].inDegrees += 1;
               // we can only rely on first different character to identify order of alphabets
               // e.g. from 'car', 'cell' we can reliability tell `a` comes before `e`. But we
               // cannot conclude that `r` comes before `l`.
               break;
            }
         }
      }

      // 2. Identify source verticies
      const sources = [];
      for (let char in graph) {
         if (graph[char].inDegrees === 0) {
            sources.add(char);
         }
      }

      // 3. Build the sort order
      const sortOrder = [];
      while (sources.length > 0) {
         const char = sources.shift();
         sortOrder.push(char);

         for (let follows in graph[char]) {
            if (!graph[follows]) continue;
            // instead of reducing inDegree just by 1 reduce the number of times
            // we actually found given `char` as a parent of current child (`follows`).
            graph[follows].inDegrees -= graph[char][follows];
            if (graph[follows].inDegrees === 0) {
               sources.push(follows);
            }
         }
      }

      if (sortOrder.length === Object.keys(graph).length) {
         return sortOrder;
      } else {
         return [];
      }
   }
}

//
// TEST
//
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
