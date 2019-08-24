function loader(source) {
    // console.log(typeof source)
    // console.log(source)
    // console.log(JSON.stringify(source).replace(/\\n/g, '\\\\n'))
    let style = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source).replace(/\\n/g, '\\\\n')};
        document.head.appendChild(style);
    `
    return style
}

module.exports = loader;