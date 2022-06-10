function mergeSort(nums) {
   return doMergeSort(nums, 0, nums.length - 1);

   function doMergeSort(nums, start, end) {
      if (start < end) {
         const mid = Math.floor((start + end) / 2);
         doMergeSort(nums, start, mid);
         doMergeSort(nums, mid + 1, end);
         mergeAndSort(nums, start, mid, end);
      }

      return nums;
   }

   function mergeAndSort(nums, start, mid, end) {
      const temp = [];
      let i = start;
      let j = mid + 1;
      let k = 0;

      while (i <= mid && j <= end) {
         if (nums[i] < nums[j]) {
            temp[k++] = nums[i++];
         } else {
            temp[k++] = nums[j++];
         }
      }

      while (i <= mid) {
         temp[k++] = nums[i++];
      }

      while (j <= end) {
         temp[k++] = nums[j++];
      }

      k = 0;
      for (i = start; i <= end; i++) {
         nums[i] = temp[k++];
      }
   }
}

console.log(mergeSort([4, 1, 3, 2, 0, -1, 7, 10, 9, 20]));
