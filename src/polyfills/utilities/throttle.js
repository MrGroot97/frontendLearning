function throttle(fn, delay = 0) {
    if(typeof fn !== "function") {
        throw new TypeError("fn should be a function");
    }
    if(typeof delay !== "number") {
        throw new TypeError("delay should be a number");
    }
    // we can use a flag to check if the function is waiting to be called
    // and a variable to store the arguments
    let shouldWait = false;
    let waitingArgs;
    const timeOutFunc = () => {
        if(waitingArgs){
            fn(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeOutFunc, delay);
        } else {
            shouldWait = false;
        }
    }
    
    return (...args) => {
        if(shouldWait){
            waitingArgs = args;
            return;
        }
        fn(...args);
        shouldWait = true;
        setTimeout(timeOutFunc, delay);
    }
}

const throttledFn = throttle((data) => {
    console.log(data);
}, 1000);

throttledFn("Hello, world!");