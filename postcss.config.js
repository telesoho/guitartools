module.exports = (ctx) => ({
    //test: console.log(ctx),
    parser: ctx.parser ? 'sugarss' : false,
    map: ctx.env === 'development' ? true : false,
    plugins: {
        'autoprefixer': {},
        cssnano: ctx.env === 'production' ? {} : false
    }
});