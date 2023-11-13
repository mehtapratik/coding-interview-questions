// Avg O(N^2)T and O(N^2)S
// O(N^2)S because sumPairs hash can possibily store every possible combination
// Worst case O(N^3)T as third inner loop can store every possible combination resulting into N^3 time
// But mostly, it will be O^2 Time complexity will be yield
function fourNumberSum(array, targetSum) {
	const sumPairs = {}; 
	const quadruplets = [];
	
	for(let i = 1; i < array.length - 1; i++) {
		for(let j = i + 1; j < array.length; j++) {
			const currentSum = array[i] + array[j];
			const diff = targetSum - currentSum;
			if(diff in sumPairs) {
				for(let pairs of sumPairs[diff]) {
					quadruplets.push([...pairs, array[i], array[j]]);
				}
			}
		}
		
		for(let k = i - 1; k>=0; k--) {
			const currentSum = array[i] + array[k];
			if(currentSum in sumPairs) {
				sumPairs[currentSum].push([array[i], array[k]]);
			}
			else {
				sumPairs[currentSum] = [[array[i], array[k]]];
			}
		}
	}
	
	return quadruplets;
}