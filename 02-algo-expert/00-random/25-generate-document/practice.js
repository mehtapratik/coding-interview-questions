function generateDocument(source, document) {
   const docFrequencies = getFrequency(document);
   const sourceFrequecies = getFrequency(source);

   for (let char in docFrequencies) {
      if (sourceFrequecies[char] == null || docFrequencies[char] < sourceFrequecies[char]) {
         return false;
      }
   }

   return true;
}

function getFrequency(text) {
   const freq = {};
   for (let char in text) {
      if (!freq[char]) freq[char] = 0;
      freq[char] += 1;
   }
   return freq;
}

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