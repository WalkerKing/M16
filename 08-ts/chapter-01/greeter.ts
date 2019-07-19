interface Person {
    firstName: string,
    lastName: string
}
const greeter = function(user: Person) {
    return `Hello ${user.firstName} ${user.lastName}`
}

let user = {
    firstName: 'W',
    lastName: 'D'
}

console.log(greeter(user))