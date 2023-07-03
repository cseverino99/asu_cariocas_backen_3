/* eslint-disable camelcase */
// se hizo en base a las cápsulas del ramo

const Router = require('koa-router');

const router = new Router();

router.get('cartas.list', '/list', async (ctx) => {
  try {
    const cartas = await ctx.orm.Carta.findAll({
      attributes: ['id', 'rank', 'suit', 'createdAt', 'updatedAt', 'mazo_id', 'imagen'],
    });
    ctx.body = cartas;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

// por chatgpt
router.post('cartas.create', '/create', async (ctx) => {
  try {
    const { mazo_id, rank, suit } = ctx.request.body; // Obtener los datos del body de la solicitud

    const carta = await ctx.orm.Carta.create({ // Crear la nueva carta en la base de datos
      mazo_id,
      rank,
      suit,
    });

    ctx.body = carta;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});
//---
module.exports = router;
