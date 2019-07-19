console.log('script start')

async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
}
async1()

setTimeout(function () {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
    .then(function () {
        console.log('promise1')
    })
    .then(function () {
        console.log('promise2')
    })

console.log('script end')

// start 
// Promise
// script end
// async2 end
// async1 end
//promise1
//promise2
// setTimeout



console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
    Promise.resolve().then(function () {
        console.log('promise1');
    }).then(function () {
        console.log('promise2');
    });
}, 0);

Promise.resolve().then(function () {
    console.log('promise3');
}).then(function () {
    console.log('promise4');
});
setTimeout(() => {
    console.log(123)
}, 0);

console.log('script end');
