//
// INSTRUCTIONS
//
// You're given an array of values generated by reading a BST in PreOrder traversal.
// Using this array as an input, rebuilt the same tree.
// PreOrder Traversal Order | Current Node -> Left Node -> Right Node

//
// EXAMPLE
//
// input: [10, 4, 2, 1, 5, 17, 19, 18]
// output:
//                    10
//                 /      \
//               4        17
//             /   \        \
//            2    5        19
//           /              /
//          1              18
//

//
// PREPARATION
//
class BST {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

//
// CODE
//
// O(n)T - Each item in array will be visited just once. Technically,
// time complexity will be more than "n" bcause each node without left
// and or right nodes (e.g. 1, 2, 5, 17, 19 and 81) will also be
// visited once. If we call them "m", m will always guaranteed to be less
// than "n". Therefore, roughly we can say time complexity could be
// O(2n) in worst case. Which asyptotically yields to O(n).
// O(h)S - Space complexity required for recursive call stack.
// Again, technically this space complexity will be O(n) due to
// the fact that we are regenerating entire tree - one node per each item
// in array. Make sure you discuss that with interviewer to confirm that
// if space required to generate requested output is considered in space
// complexity calculation. If yes, it is O(n)S otherwise, O(h)S.
function reconstructBst(preOrderTraversalValues) {
  // Unlike `lowerBound` and `upperBound`, `rootIndex` is
  // maintained as a global variable. Because, if this value is
  // changed by recursive calls further down the call stack,
  // all upper level calls in tree has should know that. On the other hand,
  // by keeping `lowerBound` and `upperBound` as parameter leve, we're
  // effectively freezing their value at a call-stack level. Values passed
  // to calls further down the stack will not be known by upper level of call stack.
  let rootIndex = 0;
  return buildTree(preOrderTraversalValues, -Infinity, Infinity);

  function buildTree(array, lowerBound, upperBound) {
    // Base condition: we've reached at the end of the array
    if (rootIndex === array.length) {
      return null;
    }

    const rootValue = array[rootIndex];
    // if value doesn't fit within the given bounds, return null
    // as a current node value
    if (rootValue < lowerBound || rootValue >= upperBound) {
      return null;
    }

    // found the current node that fits within given range.
    // increment the root index to find left and right node of current node
    rootIndex++;

    const leftSide = buildTree(array, lowerBound, rootValue);
    const rightSide = buildTree(array, rootValue, upperBound);

    return new BST(rootValue, leftSide, rightSide);
  }
}

//
// TEST
//

console.log(reconstructBst([10, 4, 2, 1, 5, 17, 19, 18]));
