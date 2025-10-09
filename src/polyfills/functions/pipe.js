function pipe(...functions) {
    return (...args) => {
        return functions.reduce((acc, fn) => fn(acc), args);
    }
}

const add = (a) => a + 1;
const multiply = (a) => a * 2;
const subtract = (a) => a - 1;
const pipeFn = pipe(add, multiply, subtract);
console.log(pipeFn(5));

function pipeAsync(...functions) {
    return (...args) => {
        return functions.reduce((chain, fn) => chain.then(fn), Promise.resolve(args));
    }
}

const addAsync = (a) => Promise.resolve(a + 1);
const multiplyAsync = (a) => Promise.resolve(a * 2);
const subtractAsync = (a) => Promise.resolve(a - 1);
const pipeAsyncFn = pipeAsync(addAsync, multiplyAsync, subtractAsync);
console.log(pipeAsyncFn(5));