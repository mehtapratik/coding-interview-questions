// "xyz"
// 2
// O(N)T | O(N)S
function caesarCipherEncryptor(string, key) {
   const ALPHABETS = 26;
   const newKey = key % ALPHABETS;
   let encrypted = [];

   for (let i = 0; i < string.length; i++) {
      let ascii = string.charCodeAt(i) + newKey;
      ascii = ascii > 122 ? ascii - ALPHABETS : ascii;
      encrypted.push(String.fromCharCode(ascii));
   }
   return encrypted.join('');
}

// O(N)T | O(N)S
function caesarCipherEncryptor(string, key) {
   const range = 'abcdefghijklmnopqrstuvwxyz'.split('');
   let encrypted = [];

   for (let i = 0; i < string.length; i++) {
      const shiftedIdx = (range.indexOf(string[i]) + key) % range.length;
      encrypted.push(range[shiftedIdx]);
   }

   return encrypted.join('');
}