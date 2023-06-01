const Router = require('koa-router');
const cartas = require('./routes/cartas.js')
const users = require('./routes/users.js')
const games = require('./routes/games.js')
const players = require('./routes/players.js')
const tables = require('./routes/tables.js')
const mazos = require('./routes/mazos.js')

const router = new Router();

router.use("/cartas", cartas.routes());
router.use("/users", users.routes());
router.use("/games", games.routes());
router.use("/players", players.routes());
router.use("/tables", tables.routes());
router.use("/mazos", mazos.routes());
module.exports = router;