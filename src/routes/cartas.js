const Router = require('koa-router');

const router = new Router();

//por chatgpt
const suits = ['pica', 'corazon', 'diamante', 'trebol'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
//solo un mazo

router.get("cartas.list", "/list", async (ctx) => {
  try {
    const cartas = await ctx.orm.Carta.findAll();
    ctx.body = cartas;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});
router.post("cartas.create", "/create", async (ctx) => {
  try {
    const { mazoId, rank, suit } = ctx.request.body; // Obtener los datos del body de la solicitud

    const carta = await ctx.orm.Carta.create({ // Crear la nueva carta en la base de datos
      mazoId,
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




module.exports = router;