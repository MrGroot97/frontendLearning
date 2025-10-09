function flatObj(obj, prefix = "", delimiter = ".") {
    if(typeof obj !== "object" || obj === null) {
        throw new TypeError("obj should be an object");
    }
    const flatObj = {};
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const newPrefix = prefix ? `${prefix}${delimiter}${key}` : key;
        if(typeof value === "object" && value !== null) {
            Object.assign(flatObj, flatObj(value, newPrefix));
        } else {
            flatObj[newPrefix] = value;
        }
    });
    return flatObj;
}

const obj = {
    a: 1,
    b: {
        c: 2,
    },
    d: {
        e: 3,
        f: {
            g: 4,
        },
    },
};
console.log(flatObj(obj));