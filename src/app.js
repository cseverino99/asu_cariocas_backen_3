const Koa = require('koa');
const logger = require('koa-logger');
const { koaBody } = require('koa-body');
const { koaSwagger } = require('koa2-swagger-ui');
const cors = require('@koa/cors');
const yamljs = require('yamljs');
const router = require('./router');
const orm = require('./models');

const app = new Koa();

// .load loads file from root.
const spec = yamljs.load('./openapi.yaml');

router.get(
  '/docs',
  koaSwagger({ routePrefix: false, swaggerOptions: { spec } }),
);

app.context.orm = orm;
app.use(cors());
app.use(logger());
app.use(koaBody());

app.use(router.routes());

app.use((ctx) => {
  ctx.body = 'Hola Mundo';
});

// app.listen(3000, () => {
//      console.log('La aplicación está escuchando en el puerto 3000');
//    });

module.exports = app;
