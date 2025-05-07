/**
 * Object and Array manipulation utility functions
 */
const objectArrayUtils = {
  title: "Object & Array Utils",
  description:
    "Advanced utilities for manipulating complex objects and arrays.",
  files: [
    {
      name: "myReduce",
      description: "Polyfill implementation of Array.prototype.reduce method.",
      code: `export function myReduce(array, callback, initialValue) {
    if (!Array.isArray(array)) {
        throw new TypeError('First argument must be an array');
    }
    
    if (typeof callback !== 'function') {
        throw new TypeError('Second argument must be a function');
    }
    
    const len = array.length;
    
    // If array is empty and no initialValue, throw an error
    if (len === 0 && initialValue === undefined) {
        throw new TypeError('Reduce of empty array with no initial value');
    }
    
    let accumulator;
    let startIndex;
    
    // If initialValue is provided, use it as accumulator and start from index 0
    // Otherwise, use first element as accumulator and start from index 1
    if (initialValue !== undefined) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        // Find the first initialized index in the array
        let firstInitializedIndex = 0;
        while (firstInitializedIndex < len && !(firstInitializedIndex in array)) {
            firstInitializedIndex++;
        }
        
        // If no initialized element is found, throw an error
        if (firstInitializedIndex >= len) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        
        accumulator = array[firstInitializedIndex];
        startIndex = firstInitializedIndex + 1;
    }
    
    // Perform the reduction
    for (let i = startIndex; i < len; i++) {
        // Only call callback for indexes that have been initialized
        if (i in array) {
            accumulator = callback(accumulator, array[i], i, array);
        }
    }
    
    return accumulator;
}`,
      usage: `// Example: Sum an array of numbers
const numbers = [1, 2, 3, 4, 5];
const sum = myReduce(numbers, (acc, curr) => acc + curr, 0);
console.log(sum); // 15

// Example: Without initial value - first element becomes the initial accumulator
const product = myReduce(numbers, (acc, curr) => acc * curr);
console.log(product); // 120 (1*2*3*4*5)

// Example: Creating an object from an array
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitCount = myReduce(fruits, (acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(fruitCount); // { apple: 3, banana: 2, orange: 1 }

// Example: Flattening an array of arrays
const nestedArrays = [[1, 2], [3, 4], [5, 6]];
const flattened = myReduce(nestedArrays, (acc, curr) => acc.concat(curr), []);
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// Example: Composing functions
const double = x => x * 2;
const square = x => x * x;
const addOne = x => x + 1;

const compose = functions => myReduce(
    functions, 
    (acc, fn) => value => acc(fn(value)),
    value => value
);

const pipeline = compose([addOne, square, double]);
console.log(pipeline(3)); // double(square(addOne(3))) = double(square(4)) = double(16) = 32`,
      notes: [
        "Implements the same behavior as the native Array.prototype.reduce method",
        "Handles edge cases like empty arrays and missing initial values",
        "Properly skips uninitialized array elements (holes in sparse arrays)",
        "Throws appropriate errors when required (empty array with no initial value)",
        "Very versatile - can be used to implement map, filter, find, and many other array methods",
        "The accumulator retains its type throughout the reduction, allowing complex transformations",
      ],
    },
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
    {
      name: "flattenArray",
      description: "Flattens a nested array into a single-level array.",
      code: `export function flattenArray(arr) {
  return arr.reduce((result, item) => {
    if (Array.isArray(item)) {
      return result.concat(flattenArray(item));
    }
    return result.concat(item);
  }, []);
}`,
      usage: `// Example: Flatten nested arrays
const nestedArray = [1, 2, [3, 4, [5, 6]], 7, [8, [9, 10]]];
const flattened = flattenArray(nestedArray);

console.log(flattened);
// Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Example: Processing nested data structures
const categories = [
  'Electronics',
  ['Phones', 'Laptops', ['Accessories', 'Parts']],
  'Clothing',
  ['Men', 'Women']
];

const allCategories = flattenArray(categories);
console.log(allCategories);
// ['Electronics', 'Phones', 'Laptops', 'Accessories', 'Parts', 'Clothing', 'Men', 'Women']

// Create navigation links
const navLinks = allCategories.map(category => 
  \`<a href="/category/\${category.toLowerCase()}">\${category}</a>\`
).join(' | ');

console.log(navLinks);
// <a href="/category/electronics">Electronics</a> | <a href="/category/phones">Phones</a> | ...`,
      notes: [
        "Works with arrays nested to any depth",
        "Uses recursion to handle deeply nested structures",
        "Similar to Array.flat() but works in older browsers",
        "Modern alternative: Array.flat(Infinity) is available in newer browsers",
        "Maintains the order of elements in the original array",
      ],
    },
    {
      name: "flattenObject",
      description:
        "Flattens a nested object into a single-level object with dot notation keys.",
      code: `export function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((result, key) => {
    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flattenObject(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
    
    return result;
  }, {});
}`,
      usage: `// Example: Flatten a nested configuration object
const config = {
  app: {
    name: 'MyApp',
    version: '1.0.0',
    settings: {
      theme: 'dark',
      notifications: {
        email: true,
        push: false
      }
    }
  },
  server: {
    host: 'localhost',
    port: 3000
  }
};

const flatConfig = flattenObject(config);
console.log(flatConfig);
/* Output:
{
  'app.name': 'MyApp',
  'app.version': '1.0.0',
  'app.settings.theme': 'dark',
  'app.settings.notifications.email': true,
  'app.settings.notifications.push': false,
  'server.host': 'localhost',
  'server.port': 3000
}
*/

// Easy access to deeply nested properties
console.log(flatConfig['app.settings.notifications.email']); // true

// Example: Generating form fields from configuration
const formFields = Object.entries(flatConfig).map(([key, value]) => {
  return \`
    <div class="form-field">
      <label for="\${key}">\${key}</label>
      <input 
        type="\${typeof value === 'boolean' ? 'checkbox' : 'text'}" 
        id="\${key}" 
        name="\${key}" 
        value="\${value}"
        \${typeof value === 'boolean' && value ? 'checked' : ''}
      />
    </div>
  \`;
}).join('');

console.log(formFields);`,
      notes: [
        "Creates dot notation paths for accessing nested properties",
        "Useful for configuration objects, form data, and API responses",
        "Doesn't flatten arrays - keeps them as values",
        "Be cautious with objects that have circular references",
        "To handle arrays and null values differently, modify the condition check",
      ],
    },
    {
      name: "unflattenObject",
      description:
        "Transforms a flattened object with dot notation back into a nested object structure.",
      code: `export function unflattenObject(obj) {
  const result = {};
  
  for (const key in obj) {
    const keys = key.split('.');
    let current = result;
    
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      
      if (i === keys.length - 1) {
        // We've reached the end of the path, set the value
        current[k] = obj[key];
      } else {
        // We're still traversing the path, create nested object if needed
        current[k] = current[k] || {};
        current = current[k];
      }
    }
  }
  
  return result;
}`,
      usage: `// Example: Convert flat form data to nested object
const formData = {
  'user.name': 'John Doe',
  'user.email': 'john@example.com',
  'user.address.street': '123 Main St',
  'user.address.city': 'New York',
  'user.address.zip': '10001',
  'preferences.theme': 'dark',
  'preferences.notifications': 'true'
};

const userData = unflattenObject(formData);
console.log(userData);
/* Output:
{
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    address: {
      street: '123 Main St',
      city: 'New York',
      zip: '10001'
    }
  },
  preferences: {
    theme: 'dark',
    notifications: 'true'
  }
}
*/

// Example: Converting URL parameters to nested configuration
const queryString = 'app.theme=dark&app.sidebar=collapsed&user.id=123&user.role=admin';
const params = {};

queryString.split('&').forEach(param => {
  const [key, value] = param.split('=');
  params[key] = value;
});

const config = unflattenObject(params);
console.log(config);
/* Output:
{
  app: {
    theme: 'dark',
    sidebar: 'collapsed'
  },
  user: {
    id: '123',
    role: 'admin'
  }
}
*/`,
      notes: [
        "Inverse operation of flattenObject",
        "Creates a hierarchical object structure from dotted key paths",
        "Useful for converting form data to API request format",
        "Handles overlapping paths correctly by merging objects",
        "When used with JSON.stringify, can convert flat data to nested JSON",
      ],
    },
    {
      name: "pickProperties",
      description:
        "Creates a new object with only the specified properties from the source object.",
      code: `export function pickProperties(obj, props) {
  return props.reduce((result, prop) => {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result[prop] = obj[prop];
    }
    return result;
  }, {});
}`,
      usage: `// Example: Extract specific data for an API request
const user = {
  id: 123,
  username: 'johndoe',
  email: 'john@example.com',
  password: 'hashedpassword',
  createdAt: '2023-01-15',
  lastLogin: '2023-03-21',
  preferences: {
    theme: 'dark',
    language: 'en'
  },
  role: 'user'
};

// Only send required fields to update profile API
const profileData = pickProperties(user, ['username', 'email', 'preferences']);
console.log(profileData);
/* Output:
{
  username: 'johndoe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    language: 'en'
  }
}
*/

// Example: Creating a public user object without sensitive information
function createPublicUserData(user) {
  return pickProperties(user, ['id', 'username', 'createdAt', 'role']);
}

const publicUser = createPublicUserData(user);
console.log(publicUser);
/* Output:
{
  id: 123,
  username: 'johndoe',
  createdAt: '2023-01-15',
  role: 'user'
}
*/`,
      notes: [
        "Similar to Lodash's _.pick or destructuring with explicit properties",
        "Useful for sanitizing objects before sending to an API",
        "Only copies own properties, not inherited ones",
        "For nested picking, consider a deep version or use with flattenObject",
        "The inverse operation would be 'omit' which excludes specified properties",
      ],
    },
    {
      name: "omitProperties",
      description:
        "Creates a new object excluding the specified properties from the source object.",
      code: `export function omitProperties(obj, props) {
  return Object.keys(obj)
    .filter(key => !props.includes(key))
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
}`,
      usage: `// Example: Remove sensitive data before sending to client
const userRecord = {
  id: 456,
  name: 'Jane Smith',
  email: 'jane@example.com',
  password: 'hashed_password',
  passwordResetToken: 'abc123',
  creditCardNumber: '4111111111111111',
  role: 'admin',
  lastLogin: '2023-03-22'
};

const safeUserData = omitProperties(userRecord, [
  'password', 
  'passwordResetToken', 
  'creditCardNumber'
]);

console.log(safeUserData);
/* Output:
{
  id: 456,
  name: 'Jane Smith',
  email: 'jane@example.com',
  role: 'admin',
  lastLogin: '2023-03-22'
}
*/

// Example: Removing temporary or internal fields before storing in database
const formSubmission = {
  name: 'Product XYZ',
  price: 99.99,
  _csrf: 'token123',
  _formId: 'product-form',
  description: 'Amazing product',
  inStock: true,
  _submittedAt: '2023-03-22T10:30:00'
};

// Remove all fields starting with underscore
const fieldsToRemove = Object.keys(formSubmission)
  .filter(key => key.startsWith('_'));

const cleanData = omitProperties(formSubmission, fieldsToRemove);
console.log(cleanData);
/* Output:
{
  name: 'Product XYZ',
  price: 99.99,
  description: 'Amazing product',
  inStock: true
}
*/`,
      notes: [
        "Opposite of pickProperties - removes instead of selects properties",
        "Useful for sanitizing objects for security purposes",
        "Only looks at own properties, not inherited ones",
        "Can improve performance by avoiding sending large or unused properties",
        "For nested omitting, consider using with flattenObject and unflattenObject",
      ],
    },
  ],
};

export default objectArrayUtils;
