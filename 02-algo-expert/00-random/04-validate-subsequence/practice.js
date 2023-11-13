function isValidSubsequence(source, sequence) {
   let j = 0;

   for (let i = 0; i < source.length; i++) {
      if (source[i] === sequence[j]) j++;
      if (sequence.length === j) break;
   }

   return j === sequence.length;
}