let square = x => x*x;

console.log(square(9));

let user = {
    name: 'Andrew',
    sayHi: () => {
        // console.log(arguments);
        // arguments also doens't work in arrow functions
        console.log(`Hi, I'm ${this.name}`);
        // This doesn't work cause the arrow function
    },
    sayHiAlt() {
        console.log(arguments);
        console.log(`Hi, I'm ${this.name}`)
        // This works
    }
};

user.sayHi(1,2,3);
user.sayHiAlt(1,2,3);