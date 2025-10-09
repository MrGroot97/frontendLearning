function deepClone(obj) {
    if(Array.isArray(obj) || typeof obj !== "object" || obj === null) {
        return obj;
    }
    if(Array.isArray(obj)) {
        return obj.slice();
    }
    const newObj = {};
    for(let key in obj) {
        newObj[key] = deepClone(obj[key]);
    }
    return newObj;
}

const obj = {
    a: 1,
    b: {
        c: 2,
        d: [1, 2, 3],
    },
};

const test = {
    a: 10,
    b: {
        c: [1, 2, 3],
        d: function() {
            console.log("d");
        }
    }
}
console.log(deepClone(obj));
console.log(deepClone(test));