class Greeter {
    greeting: string

    constructor(message: string) {
        this.greeting = message
    }

    greet() {
        return `Hello, ` + this.greeting
    }

}
let greeter = new Greeter('w')

class Animal {
    protected name: string
    public constructor(name: string) {
        this.name = name
    }
    public move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}`)
    }
}

class Dog extends Animal {
    dark() {
        console.log('Woof Woof')
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name)
    }

    move(distance: number = 1) {
        console.log('Slithering...')
        super.move(distance)
    }
}

class Horse extends Animal {
    constructor(name: string) {
        super(name)
    }

    move(distance: number) {
        console.log('Galloping...')

        super.move(distance)
    }
}

let snake = new Snake('Sammy')

snake.move(11)

let horse = new Horse('Tommy')

horse.move(100)

class Person {
    protected name: string
    protected constructor(name) {
        this.name = name
    }
}

class Employee extends Person {
    constructor(name) {
        super(name)
    }

    getElevatorPitch() {
        console.log(`This is ${this.name}`)
    }
}

let howard = new Employee('Howard')
howard.getElevatorPitch()
// 使用protected 属性保护构造器方法,可以防止这个类被实例化,但它仍然可以被继承
// let john = new Person('John')

class Grid {
    static origin = { x: 0, y: 0 }

    scale: number

    constructor(scale: number) {
        this.scale = scale
    }

    calculateDistanceFromOrigin(point: { x: number, y: number }) {
        let xDist = point.x - Grid.origin.x
        let yDist = point.y - Grid.origin.y
        return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
    }
}
let grid1 = new Grid(1)
let grid2 = new Grid(5)

console.log(grid1.calculateDistanceFromOrigin({ x: 3, y: 4 }))
console.log(grid2.calculateDistanceFromOrigin({ x: 3, y: 4 }))

abstract class Department {
    name: string

    constructor(name: string) {
        this.name = name
    }

    printName() : void {
        console.log(`Department name is ${this.name}`)
    }

    abstract printMeeting(): void
}

class AccountingDepartment extends Department {
    constructor() {
        super('Accounting and Auditing')
    } 

    printMeeting(): void {
        console.log(`The Accounting Department meets each Monday at 10am`)
    }

    generateReports(): void {
        console.log(`Generating accounting reports...`)
    }
}

// 创建对象的时候带上类的类型,这样才会检查抽象类上的方法
let accountDep: Department = new AccountingDepartment()

accountDep.printMeeting()

// accountDep.generateReports()

