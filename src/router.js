// Para la creación de rutas se utiliza el paquete koa-router,
// el cual permite crear rutas de manera sencilla y rápida.
// se hizo en base a las cápsulas del ramo

const Router = require('koa-router');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwtMiddleware = require('koa-jwt');
const cartas = require('./routes/cartas');
const users = require('./routes/users');
const games = require('./routes/games');
const players = require('./routes/players');
const tables = require('./routes/tables');
const mazos = require('./routes/mazos');
const authentication = require('./routes/authentiaction');
const scopeProtectedRoutes = require('./routes/scopeExample');

const router = new Router();
router.use(authentication.routes());

router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));
router.use('/users', users.routes());
router.use('/cartas', cartas.routes());

router.use('/games', games.routes());
router.use('/players', players.routes());
router.use('/tables', tables.routes());
router.use('/mazos', mazos.routes());
router.use('/scope-example', scopeProtectedRoutes.routes());

module.exports = router;
