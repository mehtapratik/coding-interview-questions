// O(a + b)T | O(z)
function generateDocument(source, document) {
   const sourceFreq = {}; // z

   for (let char of source) { // a
      if (!sourceFreq[char]) sourceFreq[char] = 0;
      sourceFreq[char] += 1;
   }

   for (let char of document) { // b
      if (!sourceFreq[char] || sourceFreq[char] === 0) return false;
      sourceFreq[char]--;
   }

   return true;
}

// m - document
// n - source
// O(m * (n + m))T / O(1)T
function generateDocument(source, document) {
   for (let i = 0; i < document.length; i++) {
      var sourceFreq = getFrequency(source, document[i]);
      var docFreq = getFrequency(document, document[i]);
      if (sourceFreq < docFreq) { return false; }
   }
   return true;
}

// m - document
// n - source
// c - number of unique characters in the document to be genrated
// O(m * (n + m))T / O(c)T
function generateDocument(source, document) {
   const validatedChars = {};
   for (let char of document) {
      if (validatedChars[char] == null) {
         console.log(`Validating ${char}`);
         var sourceFreq = getFrequency(source, char);
         var docFreq = getFrequency(document, char);
         if (sourceFreq < docFreq) {
            return false;
         } else {
            validatedChars[char] = true;
         }
      }
      else {
         console.log(`already validated ${char}`);
      }
   }
   return true;
}

function getFrequency(string, char) {
   let freq = 0;
   for (let j = 0; j < string.length; j++) {
      if (string[j] === char) {
         freq++;
      }
   }
   return freq;
}