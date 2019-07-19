// 1. 可选属性
interface Square {
    color: string,
    area: number
}

interface SquareConfig {
    color?: string,
    width?: number
}

function createSquare(config: SquareConfig): Square {
    let newSquare = { color: 'white', area: 100 }
    if (config.color) {
    newSquare.color = config.color

    }
    if(config.width) {
        newSquare.area = config.width * config.width
    }

    return newSquare
}

let mySquare = createSquare({color: 'black'})

console.log(mySquare)

// 2. 只读属性
interface Point {
    readonly x: number
    readonly y: number
}

let p1: Point = {
    x: 10,
    y: 20
}

p1.x = 5;

// 3. ReadonlyArray 泛型数组
let a: number[] = [1,23,4 ]
let ro: ReadonlyArray<number> = a
ro.length = 1
ro.push(123)


// 4. 函数类型
// 定义函数的输入和返回值类型
interface SearchFunc {
    (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function(src: string, sub: string) {

    let result = src.search(sub)
    return result > -1
}

// 5. 可索引的类型
interface StringArray {
    // 索引签名
    [index: number]: string
}

let myArray: StringArray

myArray = ['Bob', 'Fred']

let myStr: string = myArray['0']

// 例子  
interface NumberArray {
    [index: string]: number
    length: number
    name: string
}

interface ClockInterface {
    currentTime: Date
    setTime(d: Date)
}

// 接口不能定义构造器签名
interface ClockConstructor {
    new(hour:number, minute: number)
}
class Clock implements ClockInterface {
    currentTime: Date
    constructor(h: number, m:number) {

    }
    setTime(d: Date) {

    }
}