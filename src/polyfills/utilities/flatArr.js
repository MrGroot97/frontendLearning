function flatArr(arr) {
    if(typeof arr !== "array") {
        throw new TypeError("arr should be an array");
    }
    const flatArr = [];
    function flat(arr) {
        arr.forEach((item) => {
            if(Array.isArray(item)) {
                flat(item);
            } else {
                flatArr.push(item);
            }
        });
    }
    flat(arr);
    return flatArr;
}

function flatArr2(arr) {
    if(typeof arr !== "array") {
        throw new TypeError("arr should be an array");
    }
    const flatArr = [];
    arr.forEach((item) => {
        if(Array.isArray(item)) {
            flatArr.push(...flatArr2(item));
        } else {
            flatArr.push(item);
        }
    });
    return flatArr;
}

const arr = [1, 2, [3, 4, [5, 6]]];
console.log(flatArr(arr));
console.log(flatArr2(arr));