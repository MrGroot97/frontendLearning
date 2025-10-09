function deepEqual(obj1, obj2) {
    if( typeof obj1 !== typeof obj2 ) return false;
    if( Array.isArray(obj1) && Array.isArray(obj2) ) {
        if( obj1.length !== obj2.length ) return false;
        return obj1.every((item, index) => deepEqual(item, obj2[index]));
    }
    if( typeof obj1 === "object" && typeof obj2 === "object" ) {
        if( Object.keys(obj1).length !== Object.keys(obj2).length ) return false;
        return Object.keys(obj1).every((key) => deepEqual(obj1[key], obj2[key]));
    }
    return obj1 === obj2;
}

const obj1 = {
    a: 1,
    b: {
        c: 2,
    },
};
const obj2 = {
    a: 1,
    b: {
        c: 2,
    },
};
console.log(deepEqual(obj1, obj2));

const arr1 = [1, 2, 3];
const arr2 = [1, 2, 4];
console.log(deepEqual(arr1, arr2));