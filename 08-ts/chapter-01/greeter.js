var greeter = function (user) {
    return "Hello " + user.firstName + " " + user.lastName;
};
var user = {
    firstName: 'W',
    lastName: 'D'
};
console.log(greeter(user));
