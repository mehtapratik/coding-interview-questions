const find_corrupt_numbers = function (nums) {
   let i = 0;
   while (i < nums.length) {
      const j = nums[i] - 1;
      if (nums[i] === nums[j]) {
         i++;
      } else {
         [nums[i], nums[j]] = [nums[j], nums[i]];
      }
   }

   for (i = 0; i < nums.length; i++) {
      if (nums[i] !== i + 1) return [nums[i], i + 1];
   }

   return [-1, -1];
};
