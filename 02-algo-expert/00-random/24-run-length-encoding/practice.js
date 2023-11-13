// O(N)T | O(N)S
function runLengthEncoding(string) {
  let encoded = [];
  let trackingChar = string[0];
  let trackingCount = 1;

  for (let i = 1; i < string.length; i++) {
    const currentChar = string[i];
    if (trackingCount === 9 || trackingChar !== currentChar) {
      encoded.push(`${trackingCount}${trackingChar}`);
      trackingCount = 0;
      trackingChar = currentChar;
    }
    trackingCount++;
  }
  encoded.push(`${trackingCount}${string[string.length - 1]}`);

  return encoded.join('');
}