const m3 = function (ctx) {
    global.console.log('m3') 
}
module.exports = function () {
    return async function(ctx, next) {
        global.console.log('m3 start')
        m3(ctx)
        await next()
        console.log('m3 end')
    } 
}