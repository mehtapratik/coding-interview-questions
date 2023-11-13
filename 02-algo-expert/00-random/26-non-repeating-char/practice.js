// O(N)T | O(1)S
function firstNonRepeatingCharacter(string) {
  const frequences = {};
  for (let char of string) {
    if (char in frequences === false) frequences[char] = 0;
    frequences[char] += 1;
  }

  for (let i = 0; i < string.length; i++) {
    if (frequences[string[i]] === 1) return i;
  }
  return -1;
}