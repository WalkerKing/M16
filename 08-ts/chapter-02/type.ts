let decLiteral: number = 10;
let hexLiteral: number = 0x14;

let age: string = '12'

let list: number[] = [1, 2, 4, 1]
let arr: Array<string> = ['1', '123']

// 元祖类型 tuple
// 访问越界元素会直接报错,ts3.1以上
let x: [string, number]
x = ['st', 12]

// 枚举类型
enum Colors {
    Red,
    Green,
    Blue
}
// 默认取值是数字, 0,1,2
// 可以修改

// any类型
// 一旦使用any类型,就不做静态语法检查
// 对现有js代码进行重构时,可以使用any
let notSure: any = 4;
notSure = '123';
notSure = false;

let items: any[] = [1, true, '123']

//void 类型
function warnUser(): void {
    console.log(123)
}


// null undefined 
let u: undefined = undefined
let n: null = undefined

// never
// never是任何数据类型的子类型
function error(message: string): never {
    throw new Error(message)
}

function fail() {
    return error('something failed')
}

//object

declare function create(o: object | null): void;

create(o: { prop: 0 })
create(o: null)

create(o: 42)
create(o: false)

// 类型断言的语法
let someValue: any = 'this is a string'
let strLenth: number = (<string>someValue).length
let strLength: number = (someValue as string).length

for (let i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i)
    }, i * 1000)
}

// 解构赋值,元祖类型使用
let input: [number, number] = [1, 2]
function f([first, second]: [number, number]) {
    console.log(first)
    console.log(second)
}
f(input)