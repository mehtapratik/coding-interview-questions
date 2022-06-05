//
// INSTRUCTIONS
//
// You're given two array of integer and you're tasked to figure out if
// BST built from the both are will yield same BST or not. But, you have to
// achieve this without building the BST and just by traversing the array.

//
// EXAMPLE
// input:
// const arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11];
// const arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81];
// Both array will yield same BST, if built:
//                    10
//                 /      \
//               8        15
//             /  \     /   \
//            5   9    12   94
//           /         /    /
//          2         11   81
//

//
// CODE
//
// O(n^2) - since we're going over the entire array inside each of their element to find
// next smaller or greater number index to compare.
// O(d)   - is the depth of the tree for recursive call stack
function sameBsts(arrayOne, arrayTwo) {
  return areSameBSTArrays(arrayOne, arrayTwo, 0, 0, -Infinity, Infinity);

  function areSameBSTArrays(one, two, idxOne, idxTwo, min, max) {
    if (idxOne === -1 || idxTwo === -1) return idxOne === idxTwo;

    if (one[idxOne] !== two[idxTwo]) return false;

    const currentValue = one[idxOne];
    const leftSideIdxOne = getLeftIdx(one, idxOne + 1, min, currentValue);
    const leftSideIdxTwo = getLeftIdx(two, idxTwo + 1, min, currentValue);
    const rightSideIdxOne = getRightIdx(one, idxOne + 1, currentValue, max);
    const rightSideIdxTwo = getRightIdx(two, idxTwo + 1, currentValue, max);

    return (
      areSameBSTArrays(
        one,
        two,
        leftSideIdxOne,
        leftSideIdxTwo,
        min,
        currentValue
      ) &&
      areSameBSTArrays(
        one,
        two,
        rightSideIdxOne,
        rightSideIdxTwo,
        currentValue,
        max
      )
    );
  }

  function getLeftIdx(array, startFrom, min, max) {
    for (let i = startFrom; i < array.length; i++) {
      if (array[i] >= min && array[i] < max) {
        return i;
      }
    }

    return -1;
  }

  function getRightIdx(array, startFrom, min, max) {
    for (let i = startFrom; i < array.length; i++) {
      if (array[i] >= min && array[i] < max) {
        return i;
      }
    }

    return -1;
  }
}

//
// TEST
//
const arrayOne = [10, 15, 8, 12, 94, 81, 5, 2, 11];
const arrayTwo = [10, 8, 5, 15, 2, 12, 11, 94, 81];
console.log(sameBsts(arrayOne, arrayTwo));
