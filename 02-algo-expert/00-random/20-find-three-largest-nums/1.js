// Approach One 
// [141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7] => [18, 141, 541]
// O(N)T
// O(1)S
// Compared to second solution, this solution is easier to scale 4 or more largest numbers.
function findThreeLargestNumbers(array) {
   const threeLargest = [-Infinity, -Infinity, -Infinity];
   for (let num of array) {
      let idx = -1;
      if (threeLargest[2] < num) {
         idx = 2;
      }
      else if (threeLargest[1] < num) {
         idx = 1;
      }
      else if(threeLargest[0] < num) {
         idx = 0;
      }
      if (idx > -1) shiftAndUpdate(threeLargest, num, idx);
   }
   return threeLargest;
}

function shiftAndUpdate(array, num, idx) {
   for (let i = 0; i <= idx; i++) {
      if (i === idx) {
         array[i] = num;
      } else {
         array[i] = array[i + 1];
      }
   }
}

// Second approach
// O(N)T
// O(1)S
// First solution is easier to scale for up to five or even 10 largest numbers. This one will not
// scale to larger set of numbers
function findThreeLargestNumbers(array) {
   let large = -Infinity;
   let larger = -Infinity;
   let largest = -Infinity;

   for (let num of array) {
      if (largest < num) {
         large = larger;
         larger = largest;
         largest = num;
      }
      else if (larger < num) {
         large = larger;
         larger = num;
      }
      else if (large < num) {
         large = num;
      }
   }

   return [large, larger, largest];
}
