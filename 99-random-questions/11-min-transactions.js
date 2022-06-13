function min_transactions(arr) {
   arr.sort((a, b) => a - b);

   let avg = 0;
   for (let num of arr) {
      avg += num;
   }
   avg = avg / arr.length;
   avg = avg.toFixed(2);
   let start = 0;
   let end = arr.length - 1;
   let underpaid = 0;
   let overpaid = 0;

   console.log(`Avg amount to distribute between ${arr} is ${avg}`);
   while (start < end) {
      if (underpaid === 0) underpaid = avg - arr[start];
      if (overpaid === 0) overpaid = arr[end] - avg;

      if (underpaid <= 0) return;

      if (underpaid < overpaid) {
         overpaid = overpaid - underpaid;
         console.log(
            `${start} pays ${underpaid} to ${end}; ${end} now needs ${overpaid}.`
         );
         start++;
         underpaid = 0;
      } else {
         underpaid = underpaid - overpaid;
         console.log(
            `${start} pays ${overpaid} to ${end};  ${start} now owes ${underpaid}.`
         );
         end--;
         overpaid = 0;
      }
   }
}

console.log(min_transactions([2, 5.3, 4.5, 10, 13, 20]));
