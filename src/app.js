const Koa = require('koa');
const logger = require('koa-logger');
const { koaBody } = require('koa-body');
const router = require('./router.js');


const app = new Koa();


app.use(logger());
app.use(koaBody());

app.use(router.routes());


app.use((ctx, next) => {
    ctx.body = 'Hola Mundo';
  });

app.listen(3000, () => {
    console.log('La aplicación está escuchando en el puerto 3000');
  });