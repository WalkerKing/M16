function createSquare(config) {
    var newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: 'black' });
console.log(mySquare);
var p1 = {
    x: 10,
    y: 20
};
p1.x = 5;
// 3. ReadonlyArray 泛型数组
var a = [1, 23, 4];
var ro = a;
ro.length = 1;
ro.push(123);
var mySearch;
mySearch = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
var myArray;
myArray = ['Bob', 'Fred'];
var myStr = myArray['0'];
