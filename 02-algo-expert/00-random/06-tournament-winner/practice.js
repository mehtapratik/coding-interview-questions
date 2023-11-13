// O(K)S | O(N)T
function tournamentWinner(games, results) {
   const scores = {
      winner: null,
      winningScore: 0
   };

   for (let i = 0; i < games.length; i++) {
      const winnerIdx = results[i] === 0 ? 1 : 0;
      const winner = games[i][winnerIdx];
      scores[winner] = winner in scores ? (scores[winner] + 1) : 1;
      if (scores.winningScore < scores[winner]) {
         scores.winner = winner;
         scores.winningScore = scores[winner];
      }
   }

   return scores.winner;
}