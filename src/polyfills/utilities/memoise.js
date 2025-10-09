function memoise(fn) {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if(cache.has(key)) {
            console.log("Fetching from cache");
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        console.log("returning from function call");
        return result;
    }
}

const add = (a, b) => a + b;
const memoisedAdd = memoise(add);
console.log(memoisedAdd(1, 2));
console.log(memoisedAdd(1, 2));