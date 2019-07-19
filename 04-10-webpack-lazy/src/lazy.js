document.getElementById('play').addEventListener('click', function(){
    // import 异步加载模块,是ES7语法
    // 在webpack里import是一个天然的分割点
    import('./video.js').then(video => {
        let s = video.getName()
        console.log(s)
    })
})