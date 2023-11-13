// [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]

// O(N)T | O(1)
function isMonotonic(array) {
  if (Array.isArray(array) === false) return false;
  if (array.length < 3) return true;

  let isForward = true;
  let isBackward = true;

  for (let i = 1; i < array.length; i++) {
    const prevNum = array[i - 1];
    const currNum = array[i];
    if (prevNum < currNum) isBackward = false;
    if (prevNum > currNum) isForward = false;
  }

  return isBackward || isForward;
}

// O(N)T | O(1)
function isMonotonic(array) {
  if (Array.isArray(array) === false) return false;
  if (array.length < 3) return true;

  let direction = array[0] - array[1];
  for (let i = 2; i < array.length; i++) {
    const prevNum = array[i - 1];
    const currNum = array[i];
    if (direction === 0) {
      direction = prevNum - currNum;
    } else {
      const difference = prevNum - currNum;
      if (direction > 0 && difference < 0) return false;
      if (direction < 0 && difference > 0) return false;
    }
  }

  return true;
}