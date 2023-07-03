const Router = require('koa-router');
const authUtils = require('../lib/auth/jwt');

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

router.post('games.create', '/create', authUtils.isAdmin, async (ctx) => {
  try {
    const { winnerId } = ctx.request.body;
    const game = await ctx.orm.Game.create({
      winnerId, // Crear la nueva carta en la base de datos
    });

    ctx.body = game;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.delete('games.delete', '/delete/:id', authUtils.isAdmin, async (ctx) => {
  try {
    const gameId = ctx.params.id;

    const game = await ctx.orm.Game.findByPk(gameId);

    if (!game) {
      ctx.status = 404; // Not Found
      ctx.body = { message: 'Game not found' };
      return;
    }

    await game.destroy();

    ctx.status = 204;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
