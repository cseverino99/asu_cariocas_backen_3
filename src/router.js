const Router = require('koa-router');
const cartas = require('./routes/cartas.js')
const users = require('./routes/users.js')

const router = new Router();

router.use("/cartas", cartas.routes());
router.use("/users", users.routes());


module.exports = router;