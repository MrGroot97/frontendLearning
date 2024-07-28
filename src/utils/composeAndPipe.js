/* destructuring to unpack our array of functions into functions */
export const pipe =
    (...functions) =>
    /* value is the received argument */
    (value) => {
        /* reduce helps by doing the iteration over all functions stacking the result */
        return functions.reduce((currentValue, currentFunction) => {
            /* we return the current function, sending the current value to it */
            return currentFunction(currentValue);
        }, value);
    };
// usage
// const add = (a) => a + 1;
// const multiply = (a) => a * 2;
// const divide = (a) => a / 2;
// const subtract = (a) => a - 1;
// const addThenMultiply = pipe(add, multiply);
// const divideThenSubtract = pipe(divide, subtract);
// console.log(addThenMultiply(5)); // 12
// console.log(divideThenSubtract(5)); // 1


export const compose =
    (...functions) =>
    (value) => {
        return functions.reduceRight((currentValue, currentFunction) => {
            return currentFunction(currentValue);
        }, value);
    };
// usage
// const addThenMultiply1 = compose(multiply, add);
// const divideThenSubtract1 = compose(subtract, divide);
// console.log(addThenMultiply1(5)); // 12
// console.log(divideThenSubtract1(5)); // 1


/**
 * Applies Function piping to an array of async Functions.
 * @param  {Promise<Function>[]} fns
 * @returns {Function}
 */
export const pipeAsync =
    (...fns) =>
    (/** @type {any} */ input) =>
        fns.reduce(
            (
                /** @type {Promise<Function>} */ chain,
                /** @type {Function | Promise<Function> | any} */ func
            ) => chain.then(func),
            Promise.resolve(input)
        );

export const composeAsync =
    (...fns) =>
    (input) =>
        fns.reduceRight(
            (chain, func) => chain.then(func),
            Promise.resolve(input)
        );