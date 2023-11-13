function findThreeLargestNumbers(array) {
  if (Array.isArray(array) === false || array.length < 3) return null;
  
  const largestNums = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < array.length; i++) {
    updateNumbers(largestNums, array[i]);
  }

  return largestNums;
}

function updateNumbers(nums, n) {
  if (n > nums[2]) {
    [nums[0], nums[1], nums[2]] = [nums[1], nums[2], n];
  } else if (n > nums[1]) {
    [nums[0], nums[1]] = [nums[1], n];    
  } else if (n > nums[0]) {
    nums[0] = n;
  }
}
