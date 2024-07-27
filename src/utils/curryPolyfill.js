
export function curry(fns) {
    return function curried(...args){
        if(args.length >= fns.length){
            return fns(...args);
        } else {
            return function(...nextArgs){
                return curried(...args, ...nextArgs);
            }
        }
    }
}

//usage
const sum = (a,b,c,d) => {
    return a+b+c+d;
};

const curryFunction = curry(sum);
console.log(curryFunction(1)(2)(3)(4)(5)(6))
console.log(curryFunction(1,2)(3,4))