/**
 * Promise utility functions
 */
const promiseUtils = {
  title: "Promise Utilities",
  description:
    "Helper functions for working with promises and asynchronous operations.",
  files: [
    {
      name: "promiseAllSettled",
      description:
        "Polyfill for Promise.allSettled that resolves when all promises settle, regardless of whether they fulfill or reject.",
      code: `export function promiseAllSettled(promises) {
    return Promise.all(
        promises.map(promise => 
            promise
                .then(value => ({ status: 'fulfilled', value }))
                .catch(reason => ({ status: 'rejected', reason }))
        )
    );
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
