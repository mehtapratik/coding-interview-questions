const fibs = [0, 1];
function getNthFib_Recursive(n) {
   if (fibs[n - 1] == null) {
      fibs.push(getNthFib_Recursive(n - 1) + getNthFib_Recursive(n - 2));
      return fibs[n - 1];
   } else {
      return fibs[n - 1];
   }
}

function getNthFib_Iterative(n) {
   const fibs = [0, 1];

   if (fibs[n - 1] == null) {
      for (let i = fibs.length; i < n; i++) {
         fibs[i] = fibs[i - 1] + fibs[i - 2];
      }
   }

   return fibs[n - 1];
}
