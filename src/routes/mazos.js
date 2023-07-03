const Router = require('koa-router');

const router = new Router();

// Endpoint GET /mazos/:mazo_id
// por chatgpt
router.get('mazos.list', '/list', async (ctx) => {
  try {
    const mazos = await ctx.orm.Mazo.findAll(); // Consulta de mazos

    const mazo_ids = mazos.map((mazo) => mazo.id); // Obtener los IDs de los mazos

    console.log('Mazos IDs:', mazo_ids); // Verificar los IDs de los mazos

    const gamesWithPlayersAndTables = mazos.map((mazo) =>
    // Combinar los resultados en un solo objeto

      // eslint-disable-next-line implicit-arrow-linebreak
      ({
        mazo,
      }));

    ctx.body = gamesWithPlayersAndTables;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('mazos.cartas', '/:id/cartas', async (ctx) => {
  try {
    const mazoId = parseInt(ctx.params.id, 10);

    // console.log(mazoId)

    const mazo = await ctx.orm.Mazo.findByPk(mazoId); // Consultar el mazo correspondiente al ID
    // console.log(":")
    // console.log(mazo.get())
    if (!mazo) {
      ctx.body = 'Mazo no encontrado';
      ctx.status = 404;
      return;
    }

    const cartas = await ctx.orm.Carta.findAll({
      where: { mazo_id: mazoId }, // Filtrar las cartas por el ID del mazo
      attributes: ['id', 'rank', 'suit', 'mazo_id', 'imagen'],
    });

    const response = {
      mazo,
      cartas,
    };

    ctx.body = response;
    ctx.status = 200;
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

router.patch('mazos.repartir', '/repartir', async (ctx) => {
  try {
    const { mazo_origen_id, mazo_destino_id } = ctx.request.body;

    const cartasOriginales = await ctx.orm.Carta.findAll({
      where: { mazo_id: mazo_origen_id },
      limit: 12,
      order: ctx.orm.sequelize.random(),
    });

    if (cartasOriginales.length < 12) {
      ctx.body = 'No hay suficientes cartas en el mazo de origen';
      ctx.status = 400;
      return;
    }

    await Promise.all(
      cartasOriginales.map((carta) => carta.update({ mazo_id: mazo_destino_id })),
    );

    ctx.body = 'Cartas movidas exitosamente';
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.patch('mazos.botar', '/botar', async (ctx) => {
  try {
    const { carta_id } = ctx.request.body;

    const carta = await ctx.orm.Carta.findByPk(carta_id);

    if (!carta) {
      ctx.body = 'Carta no encontrada';
      ctx.status = 404;
      return;
    }

    await carta.update({ mazo_id: 2 });

    ctx.body = 'Carta botada exitosamente';
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.patch('mazos.robar', '/robar', async (ctx) => {
  try {
    const { mazo_id } = ctx.request.body;

    // Obtener una carta aleatoria del mazo de origen
    const cartaAleatoria = await ctx.orm.Carta.findOne({
      where: { mazo_id: 1 },
      order: ctx.orm.sequelize.random(),
    });

    if (!cartaAleatoria) {
      ctx.body = 'No hay cartas en el mazo de origen';
      ctx.status = 400;
      return;
    }

    // Mover la carta al mazo de destino
    await cartaAleatoria.update({ mazo_id });

    ctx.body = 'Carta movida exitosamente';
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
