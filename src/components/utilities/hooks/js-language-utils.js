/**
 * JavaScript language utility functions
 */
const jsLanguageUtils = {
  title: "JavaScript Core Utils",
  description:
    "Custom implementations of JavaScript core language features and polyfills.",
  files: [
    {
      name: "callBindApply",
      description:
        "Custom implementations of Function.prototype.call, bind, and apply methods.",
      code: `// Custom implementation of Function.prototype.call
export function myCall(fn, context = window, ...args) {
  // Save original property if it exists to restore later
  const originalProperty = context.hasOwnProperty('__fn__') 
    ? context.__fn__ 
    : undefined;
  
  // Add the function as a property of the context object
  context.__fn__ = fn;
  
  // Call the function with the context as 'this'
  const result = context.__fn__(...args);
  
  // Clean up - remove or restore the property
  if (originalProperty === undefined) {
    delete context.__fn__;
  } else {
    context.__fn__ = originalProperty;
  }
  
  return result;
}

// Custom implementation of Function.prototype.apply
export function myApply(fn, context = window, argsArray = []) {
  // Validate argsArray is array-like
  if (argsArray && !Array.isArray(argsArray) && !(argsArray instanceof Object)) {
    throw new TypeError('CreateListFromArrayLike called on non-object');
  }
  
  // Save original property if it exists to restore later
  const originalProperty = context.hasOwnProperty('__fn__') 
    ? context.__fn__ 
    : undefined;
  
  // Add the function as a property of the context object
  context.__fn__ = fn;
  
  // Call the function with the context as 'this'
  const result = context.__fn__(...argsArray);
  
  // Clean up - remove or restore the property
  if (originalProperty === undefined) {
    delete context.__fn__;
  } else {
    context.__fn__ = originalProperty;
  }
  
  return result;
}

// Custom implementation of Function.prototype.bind
export function myBind(fn, context, ...boundArgs) {
  // Return a new function
  return function(...callArgs) {
    // Combine the args bound at bind-time with args passed at call-time
    const allArgs = [...boundArgs, ...callArgs];
    
    // Use our myApply implementation to invoke the function
    return myApply(fn, context, allArgs);
  };
}`,
      usage: `// Example: Using custom call implementation
function greet(message, punctuation) {
  return \`\${message}, \${this.name}\${punctuation}\`;
}

const person = { name: 'Alice' };

// Using native method
const nativeResult = greet.call(person, 'Hello', '!');
console.log(nativeResult); // "Hello, Alice!"

// Using custom implementation
const customResult = myCall(greet, person, 'Hello', '!');
console.log(customResult); // "Hello, Alice!"

// Example: Using custom apply implementation
const numbers = [5, 8, 2, 1, 4];
const obj = {};

// Using native method
const nativeMax = Math.max.apply(null, numbers);
console.log(nativeMax); // 8

// Using custom implementation
const customMax = myApply(Math.max, null, numbers);
console.log(customMax); // 8

// Example: Using custom bind implementation
function multiply(x, y) {
  return x * y * this.factor;
}

const multiplyBy2 = {
  factor: 2
};

// Using native method
const nativeDoubler = multiply.bind(multiplyBy2, 5);
console.log(nativeDoubler(10)); // 100 (5 * 10 * 2)

// Using custom implementation
const customDoubler = myBind(multiply, multiplyBy2, 5);
console.log(customDoubler(10)); // 100 (5 * 10 * 2)`,
      notes: [
        "These implementations help understand how JavaScript's Function methods work",
        "Using a temporary property on the context object is the standard approach",
        "myCall and myApply handle edge cases like property name collisions",
        "myBind returns a new function with the context and initial args preset",
        "Polyfills are useful for supporting older browsers but modern browsers already implement these methods natively",
      ],
    },
    {
      name: "functionPrototypePolyfills",
      description:
        "Adds polyfills for Function.prototype methods directly to the global Function object.",
      code: `// Polyfill for Function.prototype.call
if (!Function.prototype.customCall) {
  Function.prototype.customCall = function(context = window, ...args) {
    // Store reference to the function
    context.__fn__ = this;
    
    // Call the function with the given context
    const result = context.__fn__(...args);
    
    // Remove the temporary property
    delete context.__fn__;
    
    return result;
  };
}

// Polyfill for Function.prototype.apply
if (!Function.prototype.customApply) {
  Function.prototype.customApply = function(context = window, argsArray = []) {
    // Store reference to the function
    context.__fn__ = this;
    
    // Call the function with the given context
    const result = context.__fn__(...argsArray);
    
    // Remove the temporary property
    delete context.__fn__;
    
    return result;
  };
}

// Polyfill for Function.prototype.bind
if (!Function.prototype.customBind) {
  Function.prototype.customBind = function(context, ...boundArgs) {
    // Store reference to the function
    const fn = this;
    
    // Return a new function
    return function(...callArgs) {
      // Combine the args bound at bind-time with args passed at call-time
      const allArgs = [...boundArgs, ...callArgs];
      
      // Call the original function with the specified context and arguments
      return fn.apply(context, allArgs);
    };
  };
}`,
      usage: `// Example: Adding custom methods to Function.prototype
// First, include the polyfills in your project

// Then use them directly on function instances
function greet(message) {
  return \`\${message}, \${this.name}!\`;
}

const person = { name: 'Bob' };

// Using the polyfills
const result = greet.customCall(person, 'Hello');
console.log(result); // "Hello, Bob!"

// Example: Using customBind to create a partial function
function add(a, b, c) {
  return a + b + c;
}

const add5 = add.customBind(null, 5);
console.log(add5(10, 20)); // 35 (5 + 10 + 20)

// Example: Using customApply with array arguments
function calculateTotal(tax, ...prices) {
  const subtotal = prices.reduce((sum, price) => sum + price, 0);
  return subtotal * (1 + tax);
}

const prices = [10, 20, 30, 40];
const result = calculateTotal.customApply(null, [0.1, ...prices]);
console.log(result); // 110 ((10+20+30+40) * 1.1)`,
      notes: [
        "Adding methods to built-in prototypes like Function.prototype can cause conflicts with other libraries",
        "Using 'custom' prefix helps prevent naming collisions with native methods",
        "These implementations can be useful for educational purposes",
        "In production code, it's better to use the native methods or utility functions",
        "For older browsers, consider using a standardized polyfill library like core-js",
      ],
    },
    {
      name: "objectCreate",
      description:
        "Custom implementation of Object.create method to create an object with a specified prototype.",
      code: `export function objectCreate(proto, propertiesObject) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null');
  }
  
  // Create a temporary constructor function
  function F() {}
  
  // Set its prototype to the provided proto
  F.prototype = proto;
  
  // Create a new instance
  const obj = new F();
  
  // If properties object is provided, define the properties
  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }
  
  return obj;
}`,
      usage: `// Example: Creating objects with custom prototypes
// Define a base object
const personProto = {
  greeting() {
    return \`Hello, my name is \${this.name}\`;
  }
};

// Create an object with personProto as its prototype
const john = objectCreate(personProto, {
  name: {
    value: 'John',
    enumerable: true,
    writable: true
  },
  age: {
    value: 30,
    enumerable: true,
    writable: true
  }
});

console.log(john.greeting()); // "Hello, my name is John"
console.log(john.age); // 30

// Example: Creating an object with null prototype
const noProto = objectCreate(null, {
  toString: {
    value: function() { return '[Custom Object]'; },
    enumerable: false,
    writable: true,
    configurable: true
  }
});

console.log(noProto.toString()); // "[Custom Object]"
console.log(noProto.__proto__); // undefined
console.log(Object.getPrototypeOf(noProto)); // null

// Example: Inheritance chain
const animalProto = {
  eat() {
    return \`\${this.name} is eating.\`;
  }
};

const dogProto = objectCreate(animalProto, {
  bark: {
    value: function() {
      return \`\${this.name} says woof!\`;
    },
    enumerable: true
  }
});

const spot = objectCreate(dogProto, {
  name: { value: 'Spot', enumerable: true }
});

console.log(spot.eat()); // "Spot is eating."
console.log(spot.bark()); // "Spot says woof!"`,
      notes: [
        "Object.create() is fundamental for prototype-based inheritance in JavaScript",
        "Creating objects with null prototype is useful for pure data objects with no inherited properties",
        "This implementation supports the properties parameter for defining property descriptors",
        "Modern JavaScript often uses class syntax instead, but Object.create() is still useful",
        "Be careful with deep prototype chains as they can impact performance",
      ],
    },
    {
      name: "objectAssign",
      description:
        "Custom implementation of Object.assign method to copy properties from source objects to a target object.",
      code: `export function objectAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  
  // Ensure target is an object
  const to = Object(target);
  
  // Process each source
  for (const source of sources) {
    // Skip null and undefined sources
    if (source === null || source === undefined) {
      continue;
    }
    
    // Ensure source is an object
    const from = Object(source);
    
    // Copy all enumerable own properties
    for (const key of Object.keys(from)) {
      to[key] = from[key];
    }
  }
  
  return to;
}`,
      usage: `// Example: Merging objects
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { c: 5, d: 6 };

// Using custom implementation
const result = objectAssign(target, source1, source2);
console.log(result); // { a: 1, b: 3, c: 5, d: 6 }
console.log(target === result); // true (target is modified)

// Example: Creating a new object by copying
function createPerson(name, age, additional) {
  // Start with default values
  const defaults = {
    active: true,
    createdAt: new Date().toISOString()
  };
  
  // Create a new empty object and merge properties
  return objectAssign({}, defaults, { name, age }, additional);
}

const person = createPerson('Alice', 30, { role: 'admin' });
console.log(person);
// { active: true, createdAt: "2023-03-22T...", name: "Alice", age: 30, role: "admin" }

// Example: Shallow copy
const original = { 
  name: 'Original',
  details: { id: 123, data: [1, 2, 3] }
};

const copy = objectAssign({}, original);
copy.name = 'Copy';
copy.details.id = 456;

console.log(original.name); // "Original" (primitive value is copied)
console.log(original.details.id); // 456 (object reference is shared)`,
      notes: [
        "Object.assign performs a shallow copy, not deep copy",
        "Later source properties overwrite earlier ones with the same key",
        "Only copies enumerable own properties, not inherited ones",
        "Cannot handle property descriptors (getters/setters are invoked, not copied)",
        "For deep cloning, consider using a specialized function or JSON.parse(JSON.stringify())",
      ],
    },
  ],
};

export default jsLanguageUtils;
