function runLengthEncoding(string) {
   if (typeof string !== 'string' || string.length === 0) return;
   const runs = []; // n-s
   let currentCount = 1;
   let currentChar = string[0];
   for (let i = 1; i < string.length; i++) { //n-t
      if (string[i] === currentChar && currentCount < 9) {
         currentCount++;
      } else {
         runs.push(`${currentCount}${currentChar}`);
         currentCount = 1;
         currentChar = string[i];
      }
   }
   runs.push(`${currentCount}${currentChar}`);
   return runs.join('');
}

function runLengthEncoding(string) {
   if (typeof string !== 'string' || string.length === 0) return;
   const runs = [];
   let counter = 1;
   for (let i = 1; i < string.length; i++) {
      const prevChar = string[i - 1];
      const curChar = string[i];
      if (prevChar !== curChar || counter === 9) {
         runs.push(`${counter}${prevChar}`);
         counter = 0;
      }
      counter++;
   }
   runs.push(`${counter}${string[string.length - 1]}`);
   return runs.join('');
}