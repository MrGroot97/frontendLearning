/**
 * Promise polyfill utility functions
 */
const promisePolyfills = {
  title: "Promise Polyfills",
  description:
    "Custom implementations of Promise methods like Promise.all, Promise.race, etc.",
  files: [
    {
      name: "promiseAll",
      description:
        "Custom implementation of Promise.all that resolves when all promises resolve, or rejects if any promise rejects.",
      code: `export function promiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    const results = [];
    let settlepromisecount = 0;
    promiseArr.forEach((promise, idx) => {
      promise
        .then((result) => {
          results[idx] = result;
          settlepromisecount++;
          if (settlepromisecount === promiseArr.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}`,
      usage: `// Example: Wait for multiple API calls to complete
const fetchUser = (id) => fetch(\`/api/users/\${id}\`).then(r => r.json());

const userIds = [1, 2, 3];
const userPromises = userIds.map(id => fetchUser(id));

// Using the custom promiseAll implementation
promiseAll(userPromises)
  .then(users => {
    console.log('All users fetched successfully:', users);
    // Process all users at once
  })
  .catch(error => {
    console.error('Failed to fetch at least one user:', error);
  });`,
      notes: [
        "Rejects immediately if any promise in the array rejects",
        "Returns results in the same order as the input promises",
        "Empty array input will resolve immediately with an empty array",
        "Handles non-promise values in the array by wrapping them in Promise.resolve()",
        "Native Promise.all is available in all modern browsers and Node.js",
      ],
    },
    {
      name: "promiseRace",
      description:
        "Custom implementation of Promise.race that resolves or rejects as soon as the first promise settles.",
      code: `export function promiseRace(promiseArr) {
  return new Promise((resolve, reject) => {
    promiseArr.forEach((promise) => {
      promise
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}`,
      usage: `// Example: Implementing a timeout for a fetch request
const fetchWithTimeout = (url, timeout = 5000) => {
  const fetchPromise = fetch(url).then(r => r.json());
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timed out')), timeout);
  });
  
  return promiseRace([fetchPromise, timeoutPromise]);
};

fetchWithTimeout('https://api.example.com/data', 3000)
  .then(data => console.log('Data fetched:', data))
  .catch(error => {
    if (error.message === 'Request timed out') {
      console.error('The request took too long to complete');
    } else {
      console.error('Error fetching data:', error);
    }
  });`,
      notes: [
        "Settles with the first promise that resolves or rejects",
        "Returns a promise that adopts the state of the first settled promise",
        "Empty array input will return a promise that never settles",
        "Useful for implementing timeouts or taking the fastest result",
        "Native Promise.race is available in all modern browsers and Node.js",
      ],
    },
    {
      name: "promiseAllSettled",
      description:
        "Custom implementation of Promise.allSettled that waits for all promises to settle regardless of whether they fulfill or reject.",
      code: `export function promiseAllSettled(promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw new TypeError("Argument must be an array of promises");
  }
  return new Promise((resolve) => {
    const results = [];
    let settledpromisecount = 0;
    promiseArr.forEach((promise, idx) => {
      promise
        .then((result) => {
          results[idx] = { status: "fulfilled", value: result };
          settledpromisecount++;
          if (settledpromisecount === promiseArr.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          results[idx] = { status: "rejected", reason: error };
          settledpromisecount++;
          if (settledpromisecount === promiseArr.length) {
            resolve(results);
          }
        });
    });
  });
}`,
      usage: `// Example: Handle multiple API calls and collect both successes and failures
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/invalid-url'
];

const fetchPromises = urls.map(url => 
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(\`Status \${response.status}\`);
      return response.json();
    })
);

promiseAllSettled(fetchPromises)
  .then(results => {
    const successful = results.filter(r => r.status === 'fulfilled');
    const failed = results.filter(r => r.status === 'rejected');
    
    console.log(\`\${successful.length} requests succeeded, \${failed.length} failed\`);
    
    // Process successful results
    successful.forEach(s => console.log('Successful data:', s.value));
    
    // Log failures
    failed.forEach(f => console.error('Failed request:', f.reason));
  });`,
      notes: [
        "Always resolves (never rejects) once all promises have settled",
        "Returns status and value/reason for each promise",
        "More reliable for handling multiple operations that might fail",
        "Native Promise.allSettled is available in modern browsers and Node.js 12.9.0+",
        "Useful for batch operations where partial failures are acceptable",
      ],
    },
    {
      name: "promiseAny",
      description:
        "Custom implementation of Promise.any that resolves when any promise resolves, or rejects if all promises reject.",
      code: `export function promiseAny(promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw new TypeError("Argument must be an array of promises");
  }
  return new Promise((resolve, reject) => {
    let rejectedPromiseCount = 0;
    promiseArr.forEach((promise) => {
      promise
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          rejectedPromiseCount++;
          if (rejectedPromiseCount === promiseArr.length) {
            reject("All promises were rejected");
          }
        });
    });
  });
}`,
      usage: `// Example: Try to load a resource from multiple CDNs
const cdns = [
  'https://cdn1.example.com/library.js',
  'https://cdn2.example.com/library.js',
  'https://cdn3.example.com/library.js'
];

const loadAttempts = cdns.map(url => 
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(\`Failed to load from \${url}\`);
      return response.text();
    })
);

promiseAny(loadAttempts)
  .then(libraryCode => {
    console.log('Successfully loaded library from one of the CDNs');
    // Use the library code
    eval(libraryCode);
  })
  .catch(error => {
    console.error('Failed to load from all CDNs:', error);
    // Show fallback UI or error message
  });`,
      notes: [
        "Resolves as soon as any promise in the array resolves",
        "Rejects only if all promises in the array reject",
        "Opposite behavior from Promise.all",
        "Native Promise.any is available in modern browsers and Node.js 15.0.0+",
        "Useful for implementing fallbacks or taking the first available result",
      ],
    },
    {
      name: "myPromise",
      description:
        "Simple implementation of a Promise constructor with basic then/catch methods.",
      code: `export function myPromise(executor) {
  let onResolve = () => {};
  let onReject = () => {};
  let isFullfilled = false;
  let isRejected = false;
  let isCalled = false;
  let value, error;

  function resolve(val) {
    if (isCalled) return;
    isCalled = true;
    isFullfilled = true;
    value = val;
    if (typeof onResolve === "function") {
      onResolve(value);
    }
  }

  function reject(err) {
    if (isCalled) return;
    isCalled = true;
    isRejected = true;
    error = err;
    if (typeof onReject === "function") {
      onReject(error);
    }
  }

  this.then = function (thenHandler) {
    onResolve = thenHandler;
    if (!isCalled && isFullfilled) {
      onResolve(value);
      isCalled = true;
    }
    return this;
  };

  this.catch = function (catchHandler) {
    onReject = catchHandler;
    if (!isCalled && isRejected) {
      onReject(error);
      isCalled = true;
    }
    return this;
  };

  executor(resolve, reject);
}`,
      usage: `// Example: Creating and using a basic promise
const fetchData = (shouldSucceed) => {
  return new myPromise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve('Data successfully fetched');
      } else {
        reject('Error: Could not fetch data');
      }
    }, 1000);
  });
};

// Using the promise
fetchData(true)
  .then(data => {
    console.log(data); // 'Data successfully fetched'
  })
  .catch(error => {
    console.error(error);
  });

fetchData(false)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error); // 'Error: Could not fetch data'
  });`,
      notes: [
        "This is a simplified implementation for educational purposes",
        "Missing advanced features like Promise chaining and microtask scheduling",
        "Does not implement Promise.resolve, Promise.reject static methods",
        "Not suitable for production use - use the native Promise implementation instead",
        "Useful for understanding how promises work internally",
      ],
    },
  ],
};

export default promisePolyfills;
