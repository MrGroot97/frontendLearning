export function deepCompare(source, target) {
    if( typeof source !== typeof target ) return false;

    if( Array.isArray(source) && Array.isArray(target) ) {
        if( source.length !== target.length ) return false;
        return source.every((item, index) => deepCompare(item, target[index]));
    }

    if( typeof source === 'object' && typeof target === 'object' ) {
        if( Object.keys(source).length !== Object.keys(target).length ) return false;
        return Object.keys(source).every((key) => deepCompare(source[key], target[key]));
    }

    return source === target;
}

// export function deepCompare(valueOne, valueTwo) {
//     if (valueOne === valueTwo) return true; // Covers primitives and same reference objects
//     if (valueOne == null || valueTwo == null) return false; // Handles null values

//     if (typeof valueOne !== "object" || typeof valueTwo !== "object") {
//         const isValueOneNaN = isNaN(valueOne) && typeof valueOne === "number";
//         const isValueTwoNaN = isNaN(valueTwo) && typeof valueTwo === "number";
//         return isValueOneNaN && isValueTwoNaN;
//     }

//     if (Array.isArray(valueOne) && Array.isArray(valueTwo)) {
//         if (valueOne.length !== valueTwo.length) return false;
//         for (let i = 0; i < valueOne.length; i++) {
//             if (!deepEquals(valueOne[i], valueTwo[i])) return false;
//         }
//         return true;
//     }
//     if (Array.isArray(valueOne) || Array.isArray(valueTwo)) return false;

//     if (Object.keys(valueOne).length !== Object.keys(valueTwo).length) {
//         return false;
//     }

//     for (let key in valueOne) {
//         if (Object.prototype.hasOwnProperty.call(valueOne, key)) {
//             if (!deepEquals(valueOne[key], valueTwo[key])) {
//                 return false;
//             }
//         }
//     }

//     return true;
// }

//usage
// console.log(deepCompare([1,2,2], [1,2,2]));
// console.log(deepCompare({a:1, b:2}, {a:1, b:2}))


export function deepClone(obj) {
    if( Array.isArray(obj) || typeof obj !== 'object' ) return obj;

    if( Array.isArray(obj) ) {
        return obj.slice();
    }

    const newObj = {};
    for( let key in obj ) {
        newObj[key] = deepClone(obj[key]);
    }

    return newObj;
}

//usage

// const test = {
//     a: 10,
//     b: {
//         c: [1, 2, 3],
//         d: function() {
//             console.log("d");
//         }
//     }
// }

// console.log(deepClone(test));
