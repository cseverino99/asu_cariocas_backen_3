const Router = require('koa-router');

const router = new Router();

// Se crea un tablero, se debe entregar el id del jugador y id game
// por chatgpt
router.post('tables.create', '/create', async (ctx) => {
  try {
    const table = await ctx.orm.Table.create({
      playerId: ctx.request.body.playerId,
      gameId: ctx.request.body.gameId,
    });

    ctx.body = table;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// endpoint que entrega listado de todos los tableros.
router.get('tables.list', '/list', async (ctx) => {
  try {
    const tables = await ctx.orm.Table.findAll();
    ctx.body = tables;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
