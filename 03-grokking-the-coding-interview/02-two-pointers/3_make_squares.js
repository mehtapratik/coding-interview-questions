/*
Given a sorted array, create a new array containing squares of all the numbers of the input array in the sorted order.

Example 1:
Input: [-2, -1, 0, 2, 3]
Output: [0, 1, 4, 4, 9]

Example 2:
Input: [-3, -1, 0, 1, 2]
Output: [0, 1, 1, 4, 9]
*/

// O(N)TS -> AlgoExpert Way
const make_squares = function (arr) {
  const squares = new Array(arr.length).fill(0);

  let start = 0;
  let end = arr.length - 1;

  for (let i = arr.length - 1; i >= 0; i--) {
    const startSquared = arr[start] * arr[start];
    const endSquared = arr[end] * arr[end];
    if (endSquared > startSquared) {
      squares[i] = endSquared;
      end--;
    } else {
      squares[i] = startSquared;
      start++;
    }
  }
  return squares;
};

// O(N)TS -> Educative way
const make_squares = function (arr) {
  const squares = new Array(arr.length).fill(0);

  let cursor = arr.length - 1;
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    const startSquared = arr[start] * arr[start];
    const endSquared = arr[end] * arr[end];
    if (endSquared > startSquared) {
      squares[cursor] = endSquared;
      end--;
    } else {
      squares[cursor] = startSquared;
      start++;
    }
    cursor--;
  }
  return squares;
};
