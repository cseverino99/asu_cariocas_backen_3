// se hizo en base a las cápsulas del ramo
const multer = require('multer');

const Router = require('koa-router');

const router = new Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/imagenes');
  },
  filename: (req, file, cb) => {
    // Generar un nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop();
    cb(null, filename);
  }
});
const upload = multer({ storage });

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
