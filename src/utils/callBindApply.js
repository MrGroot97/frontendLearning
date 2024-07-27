let car = {
    brand: "Nissan",
    color: "White",
    getBrand: function () {
        return this.brand;
    },
};

function purchaseCar(price, location) {
    return `I bought a ${this.color} ${this.brand} car for ${price} USD in ${location}`;
}

// purchaseCar.call(car, 20000, "New York");
// purchaseCar.apply(car, [20000, "New York"]);

function myCall(context = {}, ...args) {
    if (typeof this !== "function") {
        throw new TypeError(this + " is not a function");
    }

    context.fn = this;
    context.fn(...args);
}

Function.prototype.myCall = myCall;
purchaseCar.myCall(car, 20000, "New York");

function myApply(context = {}, args) {
    if (typeof this !== "function") {
        throw new TypeError(this + " is not a function");
    }

    if (!Array.isArray(args)) {
        throw new TypeError("CreateListFromArrayLike called on non-object");
    }

    context.fn = this;
    context.fn(...args);
}

Function.prototype.myApply = myApply;
purchaseCar.myApply(car, [20000, "New York"]);

//bind method just returns a new function with the context bound to the object passed as an argument

const newPurchaseCar = purchaseCar.bind(car); // returns a new function

console.log(newPurchaseCar(20000, "New York"));

function myBind(context, ...args) {
    if (typeof this !== "function") {
        throw new TypeError(this + " is not a function");
    }

    context.fn = this;

    // return (...a) => {
    //     this.call(context, ...args, ...a);
    // };
    return function (...newArgs) {
        context.fn(...args, ...newArgs);
    };
}

// Function.prototype.myBind = function (...args) {
//     var callback = this,
//         ctx = args.splice(1);
//     return function (...a) {
//         callback.call(args[0], ...[...ctx, ...a]);
//     };
// };

Function.prototype.myBind = myBind;

const newPurchaseCar2 = purchaseCar.myBind(car);
console.log(newPurchaseCar2(20000, "New York"));


