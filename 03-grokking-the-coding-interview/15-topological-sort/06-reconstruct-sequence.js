//
// INSTRUCTIONS
//
// Given a sequence originalSeq and an array of sequences, write a method
// to find if originalSeq can be uniquely reconstructed from the array of sequences.
//
// Unique reconstruction means that we need to find if originalSeq is the only
// sequence such that all sequences in the array are subsequences of it.
//

//
// EXAMPLE
//
// Input: originalSeq: [1, 2, 3, 4], seqs: [[1, 2], [2, 3], [3, 4]]
// Output: true
// Explanation: The sequences [1, 2], [2, 3], and [3, 4] can uniquely reconstruct
// [1, 2, 3, 4], in other words, all the given sequences uniquely define the order of numbers
// in the 'originalSeq'.
//
// Input: originalSeq: [1, 2, 3, 4], seqs: [[1, 2], [2, 3], [2, 4]]
// Output: false
// Explanation: The sequences [1, 2], [2, 3], and [2, 4] cannot uniquely reconstruct
// [1, 2, 3, 4]. There are two possible sequences we can construct from the given sequences:
// 1) [1, 2, 3, 4]
// 2) [1, 2, 4, 3]
//
// Input: originalSeq: [3, 1, 4, 2, 5], seqs: [[3, 1, 5], [1, 4, 2, 5]]
// Output: true
// Explanation: The sequences [3, 1, 5] and [1, 4, 2, 5] can uniquely reconstruct
// [3, 1, 4, 2, 5].
//

//
// CODE
//
// O(v + n)TS
// In step ‘d’, each number can become a source only once and each edge (a rule) will be
// accessed and removed once. Therefore, the time complexity of the above algorithm will
// be O(V + E), where ‘V’ is the count of distinct numbers and ‘E’ is the total number of the
// rules. Since, at most, each pair of numbers can give us one rule, we can conclude that the
// upper bound for the rules is O(N) where ‘N’ is the count of numbers in all sequences. So,
// we can say that the time complexity of our algorithm is O(V+N).
function canConstructSequence(originalSequence, sequences) {
   // # 1. Build graph and adjacency list
   const graph = {};
   for (const sequence of sequences) {
      for (let i = 0; i < sequence.length - 1; i++) {
         const [parent, child] = [sequence[i], sequence[i + 1]];
         graph[parent] = graph[parent] || { inDegrees: 0 };
         graph[parent][child] = true;
         graph[child] = graph[child] || { inDegrees: 0 };
         graph[child].inDegrees += 1;
      }
   }

   // if we don't have ordering rules for all the numbers we'll not able to uniquely
   // construct the sequence
   if (Object.keys(graph).length !== originalSequence.length) {
      return false;
   }

   // # 2. Find source nodes
   let sources = [];
   for (const vertex in graph) {
      if (graph[vertex].inDegrees === 0) {
         sources.push(vertex);
      }
   }

   // # 3. validate of original sequence by comparing source vertex with
   //      original sequence in its expected position
   let pos = 0;
   while (sources.length > 0) {
      // you can not build any sequence uniquely when you have more than one source vertex
      if (sources.length > 1) {
         return false;
      }

      const vertex = sources.shift();
      // sequence can't be build because current `vertex` is not located at expected
      // position in `originalSequence`
      if (originalSequence[pos] != vertex) {
         return false;
      }
      pos++;

      // reduce inDegrees of current `vertex`'s children by one and
      // add them to source array if there are no more in degrees
      for (let child in graph[vertex]) {
         const childVertex = graph[child];
         if (!childVertex) continue;
         childVertex.inDegrees -= 1;
         if (childVertex.inDegrees === 0) {
            sources.push(child);
         }
      }
   }

   // at this point, value of `pos` must match with `originalSequence` length
   // to confirm if we validated all elements of original sequence
   return pos === originalSequence.length;
}

//
// TEST
//

console.log(
   canConstructSequence(
      [1, 2, 3, 4],
      [
         [1, 2, 3],
         [1, 3, 4],
      ]
   )
);

console.log(
   canConstructSequence(
      [1, 2, 3, 4],
      [
         [1, 2],
         [2, 3],
         [3, 4],
      ]
   )
);

console.log(
   canConstructSequence(
      [1, 2, 3, 4],
      [
         [1, 2],
         [2, 3],
         [2, 4],
      ]
   )
);

console.log(
   canConstructSequence(
      [3, 1, 4, 2, 5],
      [
         [3, 1, 5],
         [1, 4, 2, 5],
      ]
   )
);
