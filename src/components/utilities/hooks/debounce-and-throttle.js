/**
 * Debounce & Throttle utility functions
 */
const debounceAndThrottle = {
  title: "Debounce & Throttle",
  description:
    "Functions to control the rate of execution for frequently called functions like scroll or input events.",
  files: [
    {
      name: "debounce",
      description:
        "Delays function execution until after a wait period has elapsed since the last call.",
      code: `export function debounce(cbFn, delay) {
    let timeout = null;
    return (...args) => {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(() =>{
            cbFn(...args);
        }, delay);
    }
}`,
      usage: `// Example: Debouncing a search input
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((e) => {
    // Make API call with search term
    console.log('Searching for:', e.target.value);
}, 300);

searchInput.addEventListener('input', debouncedSearch);`,
      notes: [
        "Useful for search inputs, form validation, and window resize events",
        "Prevents excessive function calls by waiting until user activity stops",
        "Remember to clear timeouts when used in React components using useEffect cleanup",
        "Consider adding immediate execution option for leading-edge cases",
      ],
    },
    {
      name: "throttle",
      description:
        "Limits function execution to once per specified time interval.",
      code: `export function throttle(cbFn, delay) {
    let shouldWait = false;
    let waitingArgs;

    const timeOutFunc = () => {
        if(waitingArgs){
            cbFn(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeOutFunc, delay);
        } else {
            shouldWait = false;
        }
    }

    return (...args) => {
        if(shouldWait){
            waitingArgs = args;
            return;
        }

        cbFn(...args);
        shouldWait = true;

        setTimeout(timeOutFunc, delay);
    }
}`,
      usage: `// Example: Throttling scroll events
const handleScroll = throttle(() => {
    // Update position indicators or load more content
    console.log('Scroll position:', window.scrollY);
}, 200);

window.addEventListener('scroll', handleScroll);`,
      notes: [
        "Ideal for scroll events, mouse movements, and game input",
        "Ensures consistent execution rate rather than waiting for inactivity",
        "This implementation queues the last call during the waiting period",
        "Can cause memory leaks if not properly cleaned up in components",
      ],
    },
  ],
};

export default debounceAndThrottle;
