/**
 * Array utility functions
 */
const arrayUtils = {
  title: "Array Utilities",
  description:
    "Helper functions for common array operations and manipulations.",
  files: [
    {
      name: "groupBy",
      description: "Groups an array of objects by a specified key or property.",
      code: `export function groupBy(array, key) {
    return array.reduce((result, item) => {
        // Get the key value - if key is a function, call it with the item
        const keyValue = typeof key === 'function' ? key(item) : item[key];
        
        // If this is the first item with this key value, create a new array
        if (!result[keyValue]) {
            result[keyValue] = [];
        }
        
        // Add the item to the array for this key
        result[keyValue].push(item);
        
        return result;
    }, {});
}`,
      usage: `// Example: Group an array of people by their city
const people = [
    { name: 'Alice', city: 'New York', age: 28 },
    { name: 'Bob', city: 'Chicago', age: 35 },
    { name: 'Charlie', city: 'New York', age: 42 },
    { name: 'David', city: 'Chicago', age: 29 },
    { name: 'Eve', city: 'Boston', age: 31 }
];

// Group by a property
const peopleByCity = groupBy(people, 'city');
console.log(peopleByCity);
/* Output:
{
    'New York': [
        { name: 'Alice', city: 'New York', age: 28 },
        { name: 'Charlie', city: 'New York', age: 42 }
    ],
    'Chicago': [
        { name: 'Bob', city: 'Chicago', age: 35 },
        { name: 'David', city: 'Chicago', age: 29 }
    ],
    'Boston': [
        { name: 'Eve', city: 'Boston', age: 31 }
    ]
}
*/

// Group using a function
const peopleByAgeGroup = groupBy(people, person => 
    person.age < 30 ? 'young' : person.age < 40 ? 'middle' : 'senior'
);
console.log(peopleByAgeGroup);`,
      notes: [
        "Similar to SQL's GROUP BY or Lodash's _.groupBy",
        "Can group by a property name (string) or a function that returns a key",
        "Returns an object where keys are the grouped values and values are arrays of items",
        "For null or undefined keys, considers them as the string 'null' or 'undefined'",
        "Useful for organizing data before rendering or further processing",
      ],
    },
    {
      name: "chunk",
      description: "Divides an array into smaller arrays of specified size.",
      code: `export function chunk(array, size = 1) {
    if (size < 1) throw new Error('Chunk size must be >= 1');
    
    const result = [];
    
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    
    return result;
}`,
      usage: `// Example: Split array into chunks for pagination
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const chunked = chunk(numbers, 3);
console.log(chunked);
/* Output:
[
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10]
]
*/

// Example: Create rows for a grid layout
const productItems = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const rows = chunk(productItems, 4);

// Render as a grid
rows.forEach(row => {
    console.log(\`<div class="row">\`);
    row.forEach(item => {
        console.log(\`  <div class="cell">\${item}</div>\`);
    });
    console.log(\`</div>\`);
});`,
      notes: [
        "Useful for pagination, batch processing, or creating grid layouts",
        "The last chunk may have fewer elements than the specified size",
        "Throws an error if the chunk size is less than 1",
        "Returns an empty array if the input array is empty",
        "For very large arrays, consider processing chunks on-demand instead of all at once",
      ],
    },
    {
      name: "shuffle",
      description:
        "Randomly shuffles the elements of an array using the Fisher-Yates algorithm.",
      code: `export function shuffle(array) {
    // Create a copy of the array to avoid mutating the original
    const result = [...array];
    
    // Fisher-Yates shuffle algorithm
    for (let i = result.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at indices i and j
        [result[i], result[j]] = [result[j], result[i]];
    }
    
    return result;
}`,
      usage: `// Example: Shuffle a deck of cards
const suits = ['♥', '♦', '♠', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const createDeck = () => {
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push(\`\${value}\${suit}\`);
        }
    }
    return deck;
};

const deck = createDeck();
console.log('Original deck:', deck);

const shuffledDeck = shuffle(deck);
console.log('Shuffled deck:', shuffledDeck);

// Example: Randomize quiz questions
const quizQuestions = [
    { id: 1, question: 'What is 2+2?' },
    { id: 2, question: 'Who was the first US President?' },
    { id: 3, question: 'What year did the Titanic sink?' },
    // more questions...
];

const randomizedQuiz = shuffle(quizQuestions);`,
      notes: [
        "Uses the Fisher-Yates (or Knuth) shuffle algorithm for unbiased shuffling",
        "Returns a new array instead of modifying the original",
        "Time complexity is O(n) where n is the array length",
        "For cryptographic purposes, use a more secure random number generator",
        "All permutations are equally likely (assuming a perfect random number generator)",
      ],
    },
  ],
};

export default arrayUtils;
