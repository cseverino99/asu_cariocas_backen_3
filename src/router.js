const Router = require('koa-router');
const cartas = require('./routes/cartas.js')
const users = require('./routes/users.js')
const games = require('./routes/games.js')

const router = new Router();

router.use("/cartas", cartas.routes());
router.use("/users", users.routes());
router.use("/games", games.routes());


module.exports = router;