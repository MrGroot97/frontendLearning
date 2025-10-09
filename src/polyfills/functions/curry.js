// fn(a,b)(c)()

const sum = (a,b) => a+b;

function curry(fn) {
    return function curried(...args) {
        if(args.length >= fn.length) {
            return fn(...args);
        } else {
            return function(...nextArgs) {
                return curried(...args, ...nextArgs);
            }
        }
    }
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2));
console.log(curriedSum(1,2));


//sum of all given arguments
// sum(1)(2)(3)(4)(5)()

const sumOfAll = (...args) => {
    return args.reduce((acc, curr) => acc + curr, 0);
}

function currySumOfAll(fn) {
    let aggargs = []
    return function curried(...args) {
        if(!args.length) {
            return fn(...aggargs);
        } else {
            aggargs = [...aggargs,...args]
            return curried;
        }
    }
}

const curriedSumOfAll = currySumOfAll(sumOfAll);
console.log(curriedSumOfAll(1)(2)(3)(4)(5)()); // 15