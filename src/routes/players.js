const Router = require('koa-router');

const router = new Router();

// se hizo en base a las cápsulas del ramo
router.post('players.create', '/create', async (ctx) => {
  try {
    const player = await ctx.orm.Player.create({
      userId: ctx.request.body.userId,
      gameId: ctx.request.body.gameId,
    });

    ctx.body = player;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});
router.get('players.list', '/list', async (ctx) => {
  try {
    const players = await ctx.orm.Player.findAll();
    ctx.body = players;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
