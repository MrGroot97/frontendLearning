/**
 * Functional Programming utility functions
 */
const functionalUtils = {
  title: "Functional Programming",
  description:
    "Utility functions for functional programming paradigms like compose, pipe, curry, etc.",
  files: [
    {
      name: "compose",
      description:
        "Combines multiple functions into a single function, applying them from right to left.",
      code: `export const compose =
    (...functions) =>
    (value) => {
        return functions.reduceRight((currentValue, currentFunction) => {
            return currentFunction(currentValue);
        }, value);
    };`,
      usage: `// Example: Creating a composed function
const add = (a) => a + 1;
const multiply = (a) => a * 2;
const divide = (a) => a / 2;
const subtract = (a) => a - 1;

// Composed function applies from right to left: first add, then multiply
const addThenMultiply = compose(multiply, add);

console.log(addThenMultiply(5)); // 12
// (5 + 1 = 6, then 6 * 2 = 12)

// Another composition example
const calculateValue = compose(
  subtract,    // Step 3: Subtract 1
  multiply,    // Step 2: Multiply by 2
  add          // Step 1: Add 1
);

console.log(calculateValue(5)); // 11
// (5 + 1 = 6, then 6 * 2 = 12, then 12 - 1 = 11)`,
      notes: [
        "Functions are applied from right to left (mathematical composition)",
        "Each function should take a single argument (the result of the previous function)",
        "Useful for creating reusable data transformations",
        "Helps avoid intermediate variables and makes code more declarative",
        "A fundamental concept in functional programming languages",
      ],
    },
    {
      name: "pipe",
      description:
        "Combines multiple functions into a single function, applying them from left to right.",
      code: `export const pipe =
    (...functions) =>
    (value) => {
        return functions.reduce((currentValue, currentFunction) => {
            return currentFunction(currentValue);
        }, value);
    };`,
      usage: `// Example: Creating a piped function
const add = (a) => a + 1;
const multiply = (a) => a * 2;
const divide = (a) => a / 2;
const subtract = (a) => a - 1;

// Piped function applies from left to right: first add, then multiply
const addThenMultiply = pipe(add, multiply);

console.log(addThenMultiply(5)); // 12
// (5 + 1 = 6, then 6 * 2 = 12)

// Data processing pipeline
const processUserData = pipe(
  user => ({ ...user, name: user.name.toUpperCase() }),     // Step 1: Uppercase the name
  user => ({ ...user, age: user.age + 1 }),                 // Step 2: Increment age
  user => ({ ...user, isAdult: user.age >= 18 })            // Step 3: Add isAdult flag
);

const user = { name: 'john', age: 17 };
console.log(processUserData(user)); 
// { name: 'JOHN', age: 18, isAdult: true }`,
      notes: [
        "Functions are applied from left to right (opposite of compose)",
        "Each function should take a single argument (the result of the previous function)",
        "More intuitive for sequential operations than compose",
        "Commonly used in data processing pipelines",
        "Popular in functional libraries like Ramda and lodash/fp",
      ],
    },
    {
      name: "composeAsync",
      description:
        "Async version of compose that works with promises and async functions.",
      code: `export const composeAsync =
    (...fns) =>
    (input) =>
        fns.reduceRight(
            (chain, func) => chain.then(func),
            Promise.resolve(input)
        );`,
      usage: `// Example: Async data processing
const fetchUserData = async (userId) => {
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
};

const fetchUserPosts = async (user) => {
  const response = await fetch(\`/api/users/\${user.id}/posts\`);
  const posts = await response.json();
  return { ...user, posts };
};

const processUserData = async (userData) => {
  // Process the user data
  return {
    ...userData,
    name: userData.name.toUpperCase(),
    postCount: userData.posts.length
  };
};

// Create an async pipeline using composeAsync
const getUserWithProcessedData = composeAsync(
  processUserData,       // Step 3: Process user data
  fetchUserPosts,        // Step 2: Fetch user posts
  fetchUserData          // Step 1: Fetch user data
);

// Use the composed async function
getUserWithProcessedData(123)
  .then(result => console.log('Processed user data:', result))
  .catch(error => console.error('Error in pipeline:', error));`,
      notes: [
        "Works with both regular functions and async functions",
        "Automatically wraps non-promise values in Promise.resolve()",
        "Functions are executed in sequence, waiting for each promise to resolve",
        "Order of execution is from right to left (like regular compose)",
        "Useful for composing async operations like API calls and data transformations",
      ],
    },
    {
      name: "pipeAsync",
      description:
        "Async version of pipe that works with promises and async functions.",
      code: `export const pipeAsync =
    (...fns) =>
    (input) =>
        fns.reduce(
            (chain, func) => chain.then(func),
            Promise.resolve(input)
        );`,
      usage: `// Example: Async user registration flow
const validateUserData = async (userData) => {
  // Simulate validation
  if (!userData.email || !userData.password) {
    throw new Error('Invalid user data');
  }
  return userData;
};

const hashPassword = async (userData) => {
  // Simulate password hashing
  console.log('Hashing password...');
  return {
    ...userData,
    password: \`hashed_\${userData.password}\`
  };
};

const saveToDatabase = async (userData) => {
  // Simulate database save
  console.log('Saving to database...');
  return {
    ...userData,
    id: Math.floor(Math.random() * 1000),
    createdAt: new Date().toISOString()
  };
};

const sendWelcomeEmail = async (userData) => {
  // Simulate sending email
  console.log(\`Sending welcome email to \${userData.email}...\`);
  return {
    ...userData,
    emailSent: true
  };
};

// Create registration pipeline with pipeAsync
const registerUser = pipeAsync(
  validateUserData,   // Step 1: Validate
  hashPassword,       // Step 2: Hash password
  saveToDatabase,     // Step 3: Save to database
  sendWelcomeEmail    // Step 4: Send welcome email
);

// Use the pipeline
const newUser = {
  email: 'user@example.com',
  password: 'password123'
};

registerUser(newUser)
  .then(result => console.log('Registration complete:', result))
  .catch(error => console.error('Registration failed:', error));`,
      notes: [
        "Works with both regular functions and async functions",
        "Functions are executed in sequence, waiting for each promise to resolve",
        "Order of execution is from left to right (like regular pipe)",
        "Allows for clear, sequential async workflows",
        "Excellent for modeling step-by-step processes with async operations",
      ],
    },
    {
      name: "curry",
      description:
        "Transforms a function of multiple arguments into a sequence of functions each with a single argument.",
      code: `export function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}`,
      usage: `// Example: Creating a curried function
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

// Call it with all arguments at once
console.log(curriedAdd(1, 2, 3)); // 6

// Or call it with arguments one at a time
console.log(curriedAdd(1)(2)(3)); // 6

// Or any combination
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6

// Practical example: reusable filtering function
const filter = curry((predicate, array) => array.filter(predicate));

const isEven = x => x % 2 === 0;
const filterEven = filter(isEven);

console.log(filterEven([1, 2, 3, 4, 5, 6])); // [2, 4, 6]

// We can create multiple specialized filters from one function
const isOdd = x => x % 2 !== 0;
const filterOdd = filter(isOdd);

console.log(filterOdd([1, 2, 3, 4, 5, 6])); // [1, 3, 5]`,
      notes: [
        "Enables partial application of function arguments",
        "Creates reusable specialized functions from more general ones",
        "Can improve code readability by reducing repetition",
        "Works well with compose and pipe for building function pipelines",
        "Named after mathematician Haskell Curry",
      ],
    },
    {
      name: "chaining",
      description:
        "A pattern that allows methods to be called in sequence on the same object.",
      code: `// Example of a chainable object
export const calculator = (initialValue = 0) => {
  let value = initialValue;
  
  return {
    add(n) {
      value += n;
      return this;
    },
    subtract(n) {
      value -= n;
      return this;
    },
    multiply(n) {
      value *= n;
      return this;
    },
    divide(n) {
      if (n === 0) throw new Error('Cannot divide by zero');
      value /= n;
      return this;
    },
    result() {
      return value;
    }
  };
};`,
      usage: `// Example: Using method chaining with a calculator
const calc = calculator(10);

const result = calc.add(5)    // 10 + 5 = 15
                 .multiply(2)  // 15 * 2 = 30
                 .subtract(8)  // 30 - 8 = 22
                 .divide(2)    // 22 / 2 = 11
                 .result();

console.log(result); // 11

// Example: Query builder with chaining
const queryBuilder = (table) => {
  const query = {
    table,
    conditions: [],
    limitValue: null,
    orderByField: null,
    orderDirection: 'ASC'
  };
  
  return {
    where(field, operator, value) {
      query.conditions.push({ field, operator, value });
      return this;
    },
    limit(value) {
      query.limitValue = value;
      return this;
    },
    orderBy(field, direction = 'ASC') {
      query.orderByField = field;
      query.orderDirection = direction;
      return this;
    },
    build() {
      // Build SQL query string (simplified)
      let sql = \`SELECT * FROM \${query.table}\`;
      
      if (query.conditions.length > 0) {
        sql += ' WHERE ' + query.conditions.map(
          c => \`\${c.field} \${c.operator} '\${c.value}'\`
        ).join(' AND ');
      }
      
      if (query.orderByField) {
        sql += \` ORDER BY \${query.orderByField} \${query.orderDirection}\`;
      }
      
      if (query.limitValue) {
        sql += \` LIMIT \${query.limitValue}\`;
      }
      
      return sql;
    }
  };
};

// Using the query builder
const sql = queryBuilder('users')
  .where('age', '>', 18)
  .where('status', '=', 'active')
  .orderBy('created_at', 'DESC')
  .limit(10)
  .build();

console.log(sql);
// SELECT * FROM users WHERE age > '18' AND status = 'active' ORDER BY created_at DESC LIMIT 10`,
      notes: [
        "Methods return 'this' (the object itself) to enable chaining",
        "Makes code more fluent and readable for complex operations",
        "Common in libraries like jQuery, Lodash, and Mongoose",
        "Useful for building objects with many optional configurations",
        "Can simplify complex multi-step processes in a readable way",
      ],
    },
  ],
};

export default functionalUtils;
