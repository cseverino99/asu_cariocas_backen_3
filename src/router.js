const Router = require('koa-router');
const cartas = require('./routes/cartas.js')

const router = new Router();

router.use("/cartas", cartas.routes());

module.exports = router;