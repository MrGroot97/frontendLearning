/**
 * Promise utility functions
 * 
 * This module provides a comprehensive set of promise utilities that can be used to handle
 * various asynchronous programming scenarios. It includes polyfills for standard Promise
 * methods as well as additional utilities for common async patterns.
 * 
 * Included utilities:
 * - promiseAll: Wait for all promises to complete or any to fail
 * - promiseRace: Get the first promise to settle (fulfill or reject)
 * - promiseAllSettled: Wait for all promises to settle regardless of outcome
 * - promiseAny: Get the first promise to fulfill or all to fail
 * - promiseTimeout: Add timeout capability to any promise
 * - retry: Retry failed promises with configurable attempts and delay
 * - myPromise: A basic Promise implementation for educational purposes
 */
const promiseUtils = {
  title: "Promise Utilities",
  description:
    "Helper functions for working with promises and asynchronous operations.",
  files: [
    {
      name: "promiseAll",
      description:
        "Polyfill for Promise.all that resolves when all promises are fulfilled or rejects when any promise rejects.",
      code: `export function promiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    const results = [];
    let settlepromisecount = 0;
    
    // Handle empty array case
    if (promiseArr.length === 0) {
      resolve(results);
      return;
    }
    
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
const fetchPosts = (userId) => fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json());
const fetchComments = (postIds) => fetch(\`/api/comments?postIds=\${postIds.join(',')}\`).then(r => r.json());

// Fetch data for a dashboard
promiseAll([
  fetchUser(1),
  fetchPosts(1),
  fetchComments([101, 102])
])
  .then(([user, posts, comments]) => {
    console.log('User:', user);
    console.log('Posts:', posts);
    console.log('Comments:', comments);
    // Render dashboard with all data
  })
  .catch(error => {
    console.error('One of the requests failed:', error);
    // Show error message to user
  });`,
      notes: [
        "Rejects immediately if any of the input promises rejects",
        "Preserves the order of results to match the order of input promises",
        "Returns an empty array if the input array is empty",
        "Native Promise.all is available in all modern browsers and Node.js environments",
        "Use when all operations must succeed to proceed",
      ],
    },
    {
      name: "promiseRace",
      description:
        "Polyfill for Promise.race that resolves or rejects as soon as the first promise settles.",
      code: `export function promiseRace(promiseArr) {
  return new Promise((resolve, reject) => {
    // Handle empty array case - this implementation will never settle
    // Note: Native Promise.race also never settles with an empty array
    
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
      usage: `// Example: Implement a timeout for any async operation
function fetchWithTimeout(url, timeout = 5000) {
  return promiseRace([
    fetch(url).then(r => r.json()),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    )
  ]);
}

// Use the function
fetchWithTimeout('https://api.example.com/data', 3000)
  .then(data => {
    console.log('Data received:', data);
  })
  .catch(error => {
    if (error.message === 'Request timed out') {
      console.error('The request took too long to complete');
    } else {
      console.error('Error fetching data:', error);
    }
  });`,
      notes: [
        "Returns a promise that resolves/rejects with the value/reason of the first settled promise",
        "Useful for implementing timeouts, fallbacks, or using the first available resource",
        "If empty array is provided, the returned promise will never settle",
        "If multiple promises settle at the same time, the first one in the array wins",
        "Native Promise.race is available in all modern browsers and Node.js environments",
      ],
    },
    {
      name: "promiseAllSettled",
      description:
        "Polyfill for Promise.allSettled that resolves when all promises settle, regardless of whether they fulfill or reject.",
      code: `export function promiseAllSettled(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError("Argument must be an array of promises");
  }
  return new Promise((resolve) => {
    const results = [];
    let settledpromisecount = 0;
    
    // Handle empty array case
    if (promises.length === 0) {
      resolve(results);
      return;
    }
    
    promises.forEach((promise, idx) => {
      promise
        .then((result) => {
          results[idx] = { status: "fulfilled", value: result };
          settledpromisecount++;
          if (settledpromisecount === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          results[idx] = { status: "rejected", reason: error };
          settledpromisecount++;
          if (settledpromisecount === promises.length) {
            resolve(results);
          }
        });
    });
  });
}`,
      usage: `// Example: Handling multiple API calls where some might fail
const getUserData = (id) => fetch(\`/api/users/\${id}\`).then(r => r.json());

const userIds = [1, 2, 3, 999]; // 999 might cause an error

promiseAllSettled(userIds.map(id => getUserData(id)))
    .then(results => {
        const successful = results.filter(r => r.status === 'fulfilled');
        const failed = results.filter(r => r.status === 'rejected');
        
        console.log(\`Successfully fetched \${successful.length} users\`);
        console.log(\`Failed to fetch \${failed.length} users\`);
        
        // Process successful results
        successful.forEach(s => console.log('User data:', s.value));
    });`,
      notes: [
        "Native Promise.allSettled is available in modern browsers and Node.js 12.9.0+",
        "Use when you need to attempt multiple operations and handle results regardless of success/failure",
        "Returns a new promise that resolves after all the given promises have settled",
        "Each result object has a 'status' property with value 'fulfilled' or 'rejected'",
        "Fulfilled results have a 'value' property, rejected results have a 'reason' property",
      ],
    },
    {
      name: "promiseAny",
      description:
        "Polyfill for Promise.any that resolves as soon as any of the promises fulfills, or rejects if all promises reject.",
      code: `export function promiseAny(promiseArr) {
  if (!Array.isArray(promiseArr)) {
    throw new TypeError("Argument must be an array of promises");
  }
  return new Promise((resolve, reject) => {
    let rejectedPromiseCount = 0;
    
    // Handle empty array case
    if (promiseArr.length === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }
    
    promiseArr.forEach((promise) => {
      promise
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          rejectedPromiseCount++;
          if (rejectedPromiseCount === promiseArr.length) {
            reject(new AggregateError(
              ['All promises were rejected'],
              'All promises were rejected'
            ));
          }
        });
    });
  });
}`,
      usage: `// Example: Try multiple API endpoints and use the first successful response
const endpoints = [
  'https://api1.example.com/data',
  'https://api2.example.com/data',
  'https://api3.example.com/data'
];

const fetchRequests = endpoints.map(url => 
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(\`Failed to fetch from \${url}\`);
      return response.json();
    })
);

promiseAny(fetchRequests)
  .then(data => {
    console.log('Successfully fetched data:', data);
    // Use the first successful response
  })
  .catch(error => {
    console.error('All endpoints failed:', error);
    // Show fallback UI or error message
  });`,
      notes: [
        "Native Promise.any is available in modern browsers and Node.js 15.0.0+",
        "Returns the first fulfilled promise, even if previous promises were rejected",
        "Rejects with an AggregateError if all promises reject",
        "Useful for utilizing the first available resource from multiple options",
        "Unlike Promise.race, Promise.any ignores rejections until all promises reject",
      ],
    },
    {
      name: "myPromise",
      description:
        "A simple implementation of Promise to understand the core concepts of the Promise specification.",
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

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}`,
      usage: `// Example: Using the custom Promise implementation
const fetchData = () => {
  return new myPromise((resolve, reject) => {
    // Simulate async operation
    setTimeout(() => {
      const success = Math.random() > 0.3;
      if (success) {
        resolve({ id: 1, name: 'Test User', email: 'test@example.com' });
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
};

fetchData()
  .then(data => {
    console.log('Data received:', data);
    return data.id;
  })
  .then(id => {
    console.log('User ID:', id);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });`,
      notes: [
        "This is a simplified implementation to understand Promise mechanics",
        "Missing features from the complete Promise/A+ spec: promise chaining, thenable resolution, etc.",
        "Useful for educational purposes to understand how promises work",
        "In production code, always use the native Promise implementation",
        "Try/catch in executor ensures errors during execution are properly caught and rejected",
      ],
    },
    {
      name: "promiseTimeout",
      description:
        "Creates a promise that will be rejected after a specified timeout if the original promise doesn't resolve first.",
      code: `export function promiseTimeout(promise, ms, errorMessage = 'Operation timed out') {
    // Create a promise that rejects after the timeout
    const timeoutPromise = new Promise((_, reject) => {
        const timeoutId = setTimeout(() => {
            clearTimeout(timeoutId);
            reject(new Error(errorMessage));
        }, ms);
    });
    
    // Return a race between the original promise and the timeout
    return Promise.race([promise, timeoutPromise]);
}`,
      usage: `// Example: Fetch with a timeout
const fetchWithTimeout = (url, options = {}, timeout = 5000) => {
    return promiseTimeout(
        fetch(url, options),
        timeout,
        \`Request to \${url} timed out after \${timeout}ms\`
    );
};

fetchWithTimeout('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log('Data:', data))
    .catch(error => {
        if (error.message.includes('timed out')) {
            console.error('Request took too long, possibly a network issue');
        } else {
            console.error('Error:', error);
        }
    });`,
      notes: [
        "Useful for network requests, database operations, or any async task that might hang",
        "Prevents operations from taking too long and blocking user experience",
        "This implementation uses Promise.race() to compare which promise resolves/rejects first",
        "Be careful with the side effects of the original promise - it will still continue executing even after timeout",
        "Consider adding an abort mechanism where applicable (e.g., AbortController for fetch)",
      ],
    },
    {
      name: "retry",
      description:
        "Executes an async function repeatedly until it succeeds or reaches the maximum number of retries.",
      code: `export function retry(fn, retries = 3, delay = 300, retryCondition = () => true) {
    return new Promise((resolve, reject) => {
        function attempt(attemptsLeft) {
            fn()
                .then(resolve)
                .catch(error => {
                    // Stop if we've run out of attempts or retry condition returns false
                    if (attemptsLeft <= 1 || !retryCondition(error)) {
                        return reject(error);
                    }
                    
                    // Wait for the delay and try again
                    setTimeout(() => {
                        attempt(attemptsLeft - 1);
                    }, delay);
                });
        }
        
        attempt(retries);
    });
}`,
      usage: `// Example: Retry an API call with exponential backoff
let attemptCount = 0;
const fetchData = () => {
    attemptCount++;
    console.log(\`Attempt #\${attemptCount}\`);
    return fetch('https://api.example.com/data')
        .then(res => {
            if (!res.ok) throw new Error(\`Status \${res.status}\`);
            return res.json();
        });
};

// Retry up to 5 times with exponential backoff
// Only retry on 5xx server errors
let currentDelay = 200;
retry(
    fetchData,
    5,
    currentDelay,
    (error) => {
        // Update delay for next attempt (exponential backoff)
        currentDelay *= 2;
        
        // Only retry on server errors (status 5xx)
        return error.message.includes('Status 5');
    }
)
    .then(data => console.log('Success:', data))
    .catch(error => console.error('All attempts failed:', error));`,
      notes: [
        "Ideal for handling transient failures in distributed systems",
        "The delay parameter can be increased with each retry attempt for exponential backoff",
        "The retryCondition function allows selective retry based on the type of error",
        "Consider adding jitter to the delay to prevent thundering herd problems",
        "Be cautious with non-idempotent operations (e.g., POST requests that create resources)",
      ],
    },
  ],
};

export default promiseUtils;
