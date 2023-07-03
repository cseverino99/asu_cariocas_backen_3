const Router = require('koa-router');

const router = new Router();
// se hizo en base a las cápsulas del ramo

// endpoin que lista usuarios
router.get('users.list', '/list', async (ctx) => {
  try {
    const users = await ctx.orm.User.findAll({
      attributes: ['id', 'username', 'password', 'mail', 'is_admin'],
    });
    ctx.body = users;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});
// endpoint que muestra usuario por id
router.get('users.show', '/show/:id', async (ctx) => {
  try {
    const user = await ctx.orm.User.findOne({ where: { id: ctx.params.id } });
    //    const user = await ctx.orm.User.findByPk(ctx.params.id);
    ctx.body = user;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
