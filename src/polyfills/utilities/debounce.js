export function debounce(fn, delay = 0) {
    if(typeof fn !== "function") {
        throw new TypeError("fn should be a function");
    }
    if(typeof delay !== "number") {
        throw new TypeError("delay should be a number");
    }
    let timeout = null;
    return (...args) => {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...args);
        }, delay);
    }
}

const debouncedFn = debounce((data) => {
    console.log(data);
}, 1000);

debouncedFn("Hello, world!");