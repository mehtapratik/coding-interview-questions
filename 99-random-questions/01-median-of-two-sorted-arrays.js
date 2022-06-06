//
// INSTRUCTIONS
//
// Find median of two sorted arrays

//
// EXAMPLE
//
// input (one)
// [1, 2, 3]
// input (two)
// [3, 4, 5, 6, 7]
// output
// [1, 2, 3, 3, 4, 5, 6, 7] - median is 3 + 4 / 2 = 3.5
//
// input (one)
// [1, 2, 3]
// input (two)
// [3, 4, 5, 6, 7, 8]
// output
// [1, 2, 3, 3, 4, 5, 6, 7, 8] - median is 4

//
// CODE
//
// O(n + m)T | O(1)S
// Time complexity will be (m + n) / 2 which yield to O(m+n)
var findMedianSortedArrays = function (nums1, nums2) {
  let pointer1 = 0;
  let pointer2 = 0;
  let median1 = -1;
  let median2 = -1;
  const len1 = nums1.length;
  const len2 = nums2.length;

  for (let counter = 0; counter <= (len1 + len2) / 2; counter++) {
    median2 = median1;
    if (pointer1 < len1 && pointer2 < len2) {
      median1 =
        nums1[pointer1] < nums2[pointer2]
          ? nums1[pointer1++]
          : nums2[pointer2++];
    } else if (pointer1 < len1) {
      median1 = nums1[pointer1++];
    } else {
      median1 = nums2[pointer2++];
    }
  }
  return (len1 + len2) % 2 === 0 ? (median1 + median2) / 2 : median1;
};

//
// TEST
//
console.log(findMedianSortedArrays([1, 2, 3], [3, 4, 5, 6, 7]));
