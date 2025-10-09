function call(context, ...args) {
    if(typeof this !== "function") {
        throw new TypeError("this should be a function");
    }
    context.fn = this;
    context.fn(...args);
}

function bind(context, ...args) {
    if(typeof this !== "function") {
        throw new TypeError("this should be a function");
    }
    context.fn = this;
    return function(...newArgs) {
        context.fn(...args, ...newArgs);
    }
}

function apply(context, args) {
    if(typeof this !== "function") {
        throw new TypeError("this should be a function");
    }
    if(!Array.isArray(args)) {
        throw new TypeError("args should be an array");
    }
    context.fn = this;
    context.fn(...args);
}

Function.prototype.myCall = call;
Function.prototype.myBind = bind;
Function.prototype.myApply = apply;

const obj = {
    name: "John",
} 

function purchaseCar(price, location) {
    return `I bought a ${this.color} ${this.brand} car for ${price} USD in ${location}`;
}

purchaseCar.myCall(obj, 20000, "New York");
purchaseCar.myBind(obj)(20000, "New York");
purchaseCar.myApply(obj, [20000, "New York"]);