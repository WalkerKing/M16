const less = require('less')
const loader = function(source) {
    let css = '';
    less.render(source, function(err, c) {
        css = c.css;
    })
    return css
}

module.exports = loader;