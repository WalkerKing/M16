const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.cookies.set('pv_id', Math.random())
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
 
router.get('/json', async (ctx, next) => {
  let cookie = ctx.cookies.get('pv_id')
  ctx.body = {
    title: 'koa2 json',
    cookie
  }
})

module.exports = router
