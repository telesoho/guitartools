const autoprefixer = require('autoprefixer');

module.exports = {
    parser: 'sugarss',
    plugins: {
        autoprefixer,
        'postcss-import': {},
        'postcss-cssnext': {},
        'cssnano': {}
    }
};