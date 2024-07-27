export function flatArray(arr) {
    const flatArr = [];
    function flat(arr) {
        arr.forEach((item) => {
            if (Array.isArray(item)) {
                flat(item);
            } else {
                flatArr.push(item);
            }
        });
    }
    flat(arr);
    return flatArr;
}

// usage
const arr = [1, 2, [3, 4, [5, 6]]];
console.log(flatArray(arr));

export function flatObj(obj, prefix = "", delimiter = "_") {
    const flattened = {};
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const newPrefix = prefix ? `${prefix}${delimiter}${key}` : key;

        if (typeof value === "object" && value !== null) {
            // Recursive call for nested objects
            Object.assign(flattened, flatObj(value, newPrefix));
        } else {
            flattened[newPrefix] = value;
        }
    });

    return flattened;
}

// usage
const obj = {
    first: "first",
    name: {
        firstname: "Shubham",
        lastname: "Chauhan",
        phone: {
            mobile: "999999999",
        },
    },
    address: {
        city: "Moradabad",
        locality: "Linepar",
        pincode: 244001,
        country: "India",
    },
};

console.log(flatObj(obj));
