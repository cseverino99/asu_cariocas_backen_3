const Router = require('koa-router');

const router = new Router();

// Endpoint GET /mazos/:mazoId
// por chatgpt
router.get('mazos.list', '/list', async (ctx) => {
  try {
    const mazos = await ctx.orm.Mazo.findAll(); // Consulta de mazos

    const mazoIds = mazos.map((mazo) => mazo.id); // Obtener los IDs de los mazos

    console.log('Mazos IDs:', mazoIds); // Verificar los IDs de los mazos

    const cartas = await ctx.orm.Carta.findAll({ // Consulta de cartas! relacionados
      where: { mazoId: mazoIds }, // Filtrar tableros por los IDs de los juegos
      attributes: ['id', 'rank', 'suit', 'mazoId'],
    });
    console.log('Cartas', cartas); // Verificar las cartas relacionados
    const gamesWithPlayersAndTables = mazos.map((mazo) => {
      // Combinar los resultados en un solo objeto
      const gameTables = cartas.filter((carta) => carta.mazoId === mazo.id);

      return {
        mazo,
        cartas: gameTables,
      };
    });

    ctx.body = gamesWithPlayersAndTables;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('mazos.create', '/create', async (ctx) => {
  try {
    const { playerId, mazo_central, mazo_basura } = ctx.request.body;
    const mazo = await ctx.orm.Mazo.create({
      playerId,
      mazo_central,
      mazo_basura,
    });

    ctx.body = mazo;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
