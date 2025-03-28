/**
 * Deep Equality & Clone utility functions
 */
const deepEqualAndClone = {
  title: "Deep Equality & Clone",
  description:
    "Utility functions for deep comparison and copying of complex objects and arrays.",
  files: [
    {
      name: "deepEqual",
      description:
        "Compares two values for deep equality, including nested objects and arrays.",
      code: `export function deepEqual(obj1, obj2) {
    // Check if the references are identical
    if (obj1 === obj2) return true;
    
    // If either value is null or not an object, they can't be deep equal
    if (obj1 === null || obj2 === null || 
        (typeof obj1 !== 'object' && typeof obj2 !== 'object')) {
        return obj1 === obj2;
    }
    
    // Get all keys from both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    // If the number of keys is different, they're not equal
    if (keys1.length !== keys2.length) return false;
    
    // Check if all keys from obj1 are in obj2 with the same values
    for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        
        // Recursively check if the values are equal
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }
    
    return true;
}`,
      usage: `// Example: Comparing two complex objects
const obj1 = { 
    name: 'John', 
    address: { city: 'New York', zip: 10001 },
    hobbies: ['reading', 'coding']
};

const obj2 = { 
    name: 'John', 
    address: { city: 'New York', zip: 10001 },
    hobbies: ['reading', 'coding']
};

const areEqual = deepEqual(obj1, obj2); // true

const obj3 = { 
    name: 'John', 
    address: { city: 'Boston', zip: 10001 }, 
    hobbies: ['reading', 'coding']
};

const areEqual2 = deepEqual(obj1, obj3); // false`,
      notes: [
        "More reliable than === for comparing objects or arrays",
        "Useful in React's shouldComponentUpdate or useMemo dependencies",
        "Can be performance-intensive for very large or deeply nested objects",
        "Consider adding special handling for Date objects, RegExp, and other complex types",
      ],
    },
    {
      name: "deepClone",
      description:
        "Creates a deep copy of an object or array, including all nested values.",
      code: `export function deepClone(obj) {
    // Handle primitive types and null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle Date objects
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    // Handle Array objects
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    // Handle Object objects
    const clonedObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clonedObj[key] = deepClone(obj[key]);
        }
    }
    
    return clonedObj;
}`,
      usage: `// Example: Creating a deep copy of a nested object
const original = {
    user: {
        name: 'Alice',
        settings: {
            theme: 'dark',
            notifications: true
        }
    },
    posts: [1, 2, 3]
};

const copy = deepClone(original);

// Modify the copy without affecting the original
copy.user.settings.theme = 'light';
copy.posts.push(4);

console.log(original.user.settings.theme); // 'dark'
console.log(original.posts); // [1, 2, 3]`,
      notes: [
        "Use when you need a completely separate copy of an object",
        "JSON.parse(JSON.stringify()) is faster but doesn't handle functions, undefined, or circular references",
        "This implementation handles Date objects specially, but might need extensions for Maps, Sets, etc.",
        "Be aware of performance considerations for very large objects",
        "Does not handle circular references - will cause stack overflow",
      ],
    },
  ],
};

export default deepEqualAndClone;
