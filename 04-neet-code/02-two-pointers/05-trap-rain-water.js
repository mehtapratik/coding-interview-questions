//
// INSTRUCTIONS
//
// Given n non-negative integers representing an elevation map where the width of
// each bar is 1, compute how much water it can trap after raining.
//

//
// EXAMPLE
//
// https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array
// [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1].In this case, 6 units of rain
// water (blue section) are being trapped.
//

//
// CODE
//
function trapRainWater(els) {
   let start = 0;
   let end = els.length - 1;
   let trappedWater = 0;
   let maxStart = els[start];
   let maxEnd = els[end];
   while (start < end) {
      if (maxStart < maxEnd) {
         start++;
         maxStart = Math.max(maxStart, els[start]);
         trappedWater += maxStart - els[start];
      } else {
         end--;
         maxEnd = Math.max(maxEnd, els[end]);
         trappedWater += maxEnd - els[end];
      }
   }

   return trappedWater;
}

//
// TEST
//
console.log(trapRainWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
console.log(trapRainWater([4, 2, 0, 3, 2, 5]));
