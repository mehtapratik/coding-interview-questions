//
// INSTRUCTIONS
//
// Given an integer array nums, return an array answer such that answer[i] is equal to the
// product of all the elements of nums except nums[i].
//
// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
//
// You must write an algorithm that runs in O(n) time and without using the division operation.
//

//
// EXAMPLES
//
// Example 1:
// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]
//
// Example 2:
// Input: nums = [-1,1,0,-3,3]
// Output: [0,0,9,0,0]
//

//
// CODE
//
function productExceptSelf(nums) {
   let fwdProduct = 1;
   let bwdProduct = 1;
   const products = [];

   for (let i = 0; i < nums.length; i++) {
      products[i] = fwdProduct;
      fwdProduct *= nums[i];
   }

   for (let i = nums.length - 2; i >= 0; i--) {
      bwdProduct *= nums[i + 1];
      products[i] *= bwdProduct;
   }

   return products;
}

//
// TEST
//
console.log(productExceptSelf([1, 2, 3, 4]));
