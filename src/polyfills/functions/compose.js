function compose(...functions) {
    return (...args) => {
        return functions.reduceRight((acc, fn) => fn(acc), args);
    }
}

const add = (a) => a + 1;
const multiply = (a) => a * 2;
const subtract = (a) => a - 1;
const composeFn = compose(add, multiply, subtract);
console.log(composeFn(5));


function composeAsync(...functions) {
    return (...args) => {
        const result = functions.reduceRight((chain, fn) => chain.then(fn), Promise.resolve(args));
        return result;
    }
}

const addAsync = (a) => Promise.resolve(a + 1);
const multiplyAsync = (a) => Promise.resolve(a * 2);
const subtractAsync = (a) => Promise.resolve(a - 1);
const composeAsyncFn = composeAsync(addAsync, multiplyAsync, subtractAsync);
console.log(composeAsyncFn(5));