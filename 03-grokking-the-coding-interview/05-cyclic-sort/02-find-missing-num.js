const find_missing_number = function (nums) {
   let i = 0;
   let len = nums.length;

   while (i < len) {
      let target = nums[i];
      if (target < len && nums[target] !== nums[i]) {
         [nums[target], nums[i]] = [nums[i], nums[target]];
      } else {
         i++;
      }
   }

   i = 0;
   while (i < len) {
      if (nums[i] !== i) return i;
      i++;
   }
   return -1;
};

console.log(find_missing_number([4, 0, 3, 1]));
console.log(find_missing_number([8, 3, 5, 2, 4, 6, 0, 1]));
