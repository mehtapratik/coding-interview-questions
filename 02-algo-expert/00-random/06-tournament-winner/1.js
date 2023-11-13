function tournamentWinner(games, results) {
   const stats = {
         winner: null,
         winningScore: 0
   };

   for (let i = 0; i < games.length; i++) {
      const currentWinner = games[i][(results[i] === 0 ? 1 : 0)];
      stats[currentWinner] = currentWinner in stats ? (stats[currentWinner] + 1) : 1;
      if (stats[currentWinner] > stats.winningScore) {
         stats.winner = currentWinner;
         stats.winningScore = stats[currentWinner];
      }
   }

   return stats.winner;
}