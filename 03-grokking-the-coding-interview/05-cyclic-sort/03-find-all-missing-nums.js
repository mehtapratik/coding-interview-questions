const find_missing_numbers = function (nums) {
   const missingNumbers = [];
   const len = nums.length;

   let i = 0;
   while (i < len) {
      const j = nums[i] - 1;
      if (j >= len || nums[j] === nums[i]) {
         i++;
      } else {
         [nums[i], nums[j]] = [nums[j], nums[i]];
      }
   }

   i = 0;
   while (i < len) {
      if (nums[i] !== i + 1) missingNumbers.push(i + 1);
      i++;
   }
   return missingNumbers;
};
