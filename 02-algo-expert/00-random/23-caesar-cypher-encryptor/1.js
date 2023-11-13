// O(N)T | O(N)S
function caesarCipherEncryptor(string, key) {
   let newChars = []; // 1
   const newKey = key % 26; // 1
   for (let char of string) { // O(N)
      let ascii = char.charCodeAt(0) + newKey; // 1
	   ascii = ascii > 122 ? ascii - 26 : ascii; // 1
      newChars.push(String.fromCharCode(ascii)); // O(1)
   }

   return newChars.join(''); // O(N)
}


// O(N)T / O(N)S
function caesarCipherEncryptor(string, key) {
   const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split(''); // 1
   let newChars = []; // 1
   const newKey = key % alphabets.length; // 1

   for (let char of string) { //Nt / 1s
      newChars.push(getShiftedChar(char, alphabets, newKey)); // 1t/ Ns
   }

   return newChars.join(''); // 1t/ ns

   function getShiftedChar(char, alphabets, newKey) {
      const ascii = alphabets.indexOf(char) + newKey; //1
      return alphabets[ascii % alphabets.length]; //1
   }
}