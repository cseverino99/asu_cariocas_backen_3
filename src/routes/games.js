const Router = require('koa-router');

const router = new Router();

// El siguiente get muestra todos los Games disponibles, con los jugadores
// y tableros que participan de este
// por chatgpt
router.get('games.list', '/list', async (ctx) => {
  try {
    const games = await ctx.orm.Game.findAll(); // Consulta de juegos

    const gameIds = games.map((game) => game.id); // Obtener los IDs de los juegos

    // console.log('Game IDs:', gameIds); // Verificar los IDs de los juegos

    const players = await ctx.orm.Player.findAll({ // Consulta de jugadores relacionados
      where: { gameId: gameIds }, // Filtrar jugadores por los IDs de los juegos
      attributes: ['gameId', 'id'],
    });

    // console.log('Players:', players); // Verificar los jugadores relacionados

    const tables = await ctx.orm.Table.findAll({ // Consulta de tableros relacionados
      where: { gameId: gameIds }, // Filtrar tableros por los IDs de los juegos
      attributes: ['gameId', 'id'],
    });

    const gamesWithPlayersAndTables = games.map((game) => {
      // Combinar los resultados en un solo objeto
      const gamePlayers = players.filter((player) => player.gameId === game.id);
      const gameTables = tables.filter((table) => table.gameId === game.id);

      return {
        game,
        players: gamePlayers,
        tables: gameTables,
      };
    });

    ctx.body = gamesWithPlayersAndTables;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
