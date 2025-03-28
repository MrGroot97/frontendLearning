/**
 * DOM Manipulation utility functions
 */
const domUtils = {
  title: "DOM Utilities",
  description:
    "Helper functions for DOM manipulation and browser interactions.",
  files: [
    {
      name: "getElementsByClassName",
      description:
        "A polyfill for the getElementsByClassName method that works in older browsers.",
      code: `export function getElementsByClassName(className, element = document) {
  if (element.getElementsByClassName) {
    // Use native implementation if available
    return element.getElementsByClassName(className);
  }
  
  const results = [];
  const allElements = element.getElementsByTagName('*');
  
  for (let i = 0; i < allElements.length; i++) {
    const el = allElements[i];
    const classNames = el.className.split(' ');
    
    if (classNames.includes(className)) {
      results.push(el);
    }
  }
  
  return results;
}`,
      usage: `// Example: Find all elements with class 'highlight'
const highlights = getElementsByClassName('highlight');

// Process each element
for (let i = 0; i < highlights.length; i++) {
  highlights[i].style.backgroundColor = 'yellow';
}

// Example: Find elements within a specific container
const container = document.getElementById('content');
const buttons = getElementsByClassName('btn', container);

// Add click handlers
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    console.log('Button clicked:', this.textContent);
  });
}`,
      notes: [
        "Modern browsers already implement getElementsByClassName natively",
        "This polyfill is mainly useful for supporting very old browsers",
        "Returns a live HTMLCollection that updates when the DOM changes",
        "Performance is slower than the native implementation",
        "Consider using querySelectorAll('.classname') for a more modern approach",
      ],
    },
    {
      name: "eventEmitter",
      description:
        "A simple implementation of the publish-subscribe pattern for browser events.",
      code: `export function createEventEmitter() {
  const events = {};
  
  return {
    // Subscribe to an event
    on(event, listener) {
      if (!events[event]) {
        events[event] = [];
      }
      
      events[event].push(listener);
      return this;
    },
    
    // Remove a specific listener
    off(event, listenerToRemove) {
      if (!events[event]) return this;
      
      events[event] = events[event].filter(
        listener => listener !== listenerToRemove
      );
      
      return this;
    },
    
    // Emit an event with data
    emit(event, ...args) {
      if (!events[event]) return this;
      
      events[event].forEach(listener => {
        listener.apply(this, args);
      });
      
      return this;
    },
    
    // Subscribe to an event for one time only
    once(event, listener) {
      const onceWrapper = (...args) => {
        listener.apply(this, args);
        this.off(event, onceWrapper);
      };
      
      return this.on(event, onceWrapper);
    }
  };
}`,
      usage: `// Example: Creating a custom event system
const messageHub = createEventEmitter();

// Subscribe to events
messageHub.on('message', (sender, text) => {
  console.log(\`\${sender}: \${text}\`);
});

messageHub.on('userJoined', (username) => {
  console.log(\`\${username} has joined the chat\`);
});

// One-time subscription
messageHub.once('appStart', (version) => {
  console.log(\`App started (v\${version}). This message shows only once.\`);
});

// Emit events
messageHub.emit('appStart', '1.0.0');
messageHub.emit('appStart', '1.0.1'); // Not logged - 'once' was used

messageHub.emit('userJoined', 'Alice');
messageHub.emit('message', 'Alice', 'Hello everyone!');
messageHub.emit('message', 'Bob', 'Hi Alice!');

// Example: Component communication
const shoppingCart = createEventEmitter();

// UI Component 1: Cart Display
shoppingCart.on('itemAdded', (item) => {
  console.log(\`Added to cart: \${item.name} - $\${item.price}\`);
  // Update cart display
});

shoppingCart.on('itemRemoved', (itemId) => {
  console.log(\`Removed item #\${itemId} from cart\`);
  // Update cart display
});

// UI Component 2: Cart Total
let total = 0;
shoppingCart.on('itemAdded', (item) => {
  total += item.price;
  console.log(\`New total: $\${total}\`);
  // Update total display
});

shoppingCart.on('itemRemoved', (itemId, price) => {
  total -= price;
  console.log(\`New total: $\${total}\`);
  // Update total display
});

// Adding items
shoppingCart.emit('itemAdded', { id: 1, name: 'T-shirt', price: 19.99 });
shoppingCart.emit('itemAdded', { id: 2, name: 'Jeans', price: 49.99 });
shoppingCart.emit('itemRemoved', 1, 19.99);`,
      notes: [
        "Provides a way to decouple components that need to communicate",
        "Useful for cross-component communication in complex applications",
        "Similar to Node.js's EventEmitter but for browser environments",
        "The pattern is the foundation for many frameworks' event systems",
        "Can help manage complex UI state without direct dependencies between components",
      ],
    },
    {
      name: "domReady",
      description:
        "A cross-browser utility to run code when the DOM is fully loaded.",
      code: `export function domReady(callback) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // If document is already loaded, run callback
    setTimeout(callback, 1);
    return;
  }
  
  // Modern browsers
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', callback);
    return;
  }
  
  // IE8 and below
  document.attachEvent('onreadystatechange', function() {
    if (document.readyState === 'complete') {
      callback();
    }
  });
}`,
      usage: `// Example: Initialize app when DOM is ready
domReady(function() {
  console.log('DOM is fully loaded and parsed');
  
  // Initialize your application
  const app = {
    init: function() {
      this.setupEventListeners();
      this.loadInitialData();
    },
    
    setupEventListeners: function() {
      const button = document.getElementById('submit-btn');
      if (button) {
        button.addEventListener('click', this.handleSubmit);
      }
      
      const form = document.getElementById('contact-form');
      if (form) {
        form.addEventListener('submit', this.handleFormSubmit);
      }
    },
    
    loadInitialData: function() {
      console.log('Loading initial data...');
      // Fetch data or initialize components
    },
    
    handleSubmit: function(e) {
      console.log('Button clicked!', e);
    },
    
    handleFormSubmit: function(e) {
      e.preventDefault();
      console.log('Form submitted!');
    }
  };
  
  // Start the application
  app.init();
});

// You can have multiple domReady handlers
domReady(function() {
  // Analytics setup
  console.log('Setting up analytics...');
});`,
      notes: [
        "More reliable than window.onload (which waits for all resources to load)",
        "Works consistently across different browsers",
        "Handles the case when the script is loaded after the DOM is already ready",
        "Modern alternative: document.addEventListener('DOMContentLoaded', callback)",
        "For scripts that must run after images and other resources are loaded, use window.onload instead",
      ],
    },
    {
      name: "elementCreation",
      description: "Utilities for creating and manipulating DOM elements.",
      code: `/**
 * Creates a DOM element with specified attributes and children
 * @param {string} tagName - The HTML tag name
 * @param {Object} attributes - Key-value pairs of attributes to set
 * @param {Array|Node|string} children - Child elements, nodes or text content
 * @returns {HTMLElement} The created element
 */
export function createElement(tagName, attributes = {}, children = []) {
  const element = document.createElement(tagName);
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'style' && typeof value === 'object') {
      Object.assign(element.style, value);
    } else if (key === 'dataset' && typeof value === 'object') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else if (key === 'className') {
      element.className = value;
    } else if (key === 'innerHTML') {
      element.innerHTML = value;
    } else if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(key, value);
    }
  });
  
  // Append children
  if (children) {
    if (!Array.isArray(children)) {
      children = [children];
    }
    
    children.forEach(child => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof Node) {
        element.appendChild(child);
      }
    });
  }
  
  return element;
}

/**
 * Creates a document fragment with the given children
 * @param {Array|Node|string} children - Child elements, nodes or text content
 * @returns {DocumentFragment} The created fragment
 */
export function createFragment(children = []) {
  const fragment = document.createDocumentFragment();
  
  if (!Array.isArray(children)) {
    children = [children];
  }
  
  children.forEach(child => {
    if (typeof child === 'string') {
      fragment.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      fragment.appendChild(child);
    }
  });
  
  return fragment;
}`,
      usage: `// Example: Creating complex DOM structures
const card = createElement('div', 
  { 
    className: 'card',
    style: { 
      border: '1px solid #ccc', 
      borderRadius: '4px',
      padding: '16px'
    }
  }, [
    createElement('h2', { className: 'card-title' }, 'Hello World'),
    createElement('p', { className: 'card-content' }, 'This is a card created with the createElement utility.'),
    createElement('button', { 
      className: 'card-button',
      onClick: () => alert('Button clicked!')
    }, 'Click Me')
  ]
);

document.body.appendChild(card);

// Example: Building a data table
function createDataTable(data) {
  const table = createElement('table', { className: 'data-table' });
  const thead = createElement('thead');
  const tbody = createElement('tbody');
  
  if (data.length > 0) {
    // Create header row
    const headerRow = createElement('tr');
    Object.keys(data[0]).forEach(key => {
      headerRow.appendChild(createElement('th', {}, key));
    });
    thead.appendChild(headerRow);
    
    // Create data rows
    data.forEach(item => {
      const row = createElement('tr');
      Object.values(item).forEach(value => {
        row.appendChild(createElement('td', {}, String(value)));
      });
      tbody.appendChild(row);
    });
  }
  
  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

const users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

document.getElementById('table-container').appendChild(createDataTable(users));

// Example: Using document fragments for better performance
function createList(items) {
  const fragment = createFragment(
    items.map(item => createElement('li', {}, item))
  );
  const ul = createElement('ul');
  ul.appendChild(fragment);
  return ul;
}

const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];
document.getElementById('list-container').appendChild(createList(fruits));`,
      notes: [
        "Using createElement is more flexible than innerHTML and safer for handling user content",
        "Document fragments improve performance by reducing DOM reflows",
        "This approach creates cleaner code than directly manipulating the DOM",
        "Useful for creating dynamic UI components without a framework",
        "For complex applications, consider using a framework like React or Vue",
      ],
    },
    {
      name: "domTraversal",
      description: "Utilities for traversing and querying the DOM.",
      code: `/**
 * Gets all parents of an element up to the root or specified parent
 * @param {HTMLElement} element - The element to start from
 * @param {HTMLElement} [stopAt=null] - Element to stop at (optional)
 * @returns {Array<HTMLElement>} Array of parent elements
 */
export function getParents(element, stopAt = null) {
  const parents = [];
  let currentElement = element.parentElement;
  
  while (currentElement !== null) {
    parents.push(currentElement);
    
    if (currentElement === stopAt || currentElement === document.documentElement) {
      break;
    }
    
    currentElement = currentElement.parentElement;
  }
  
  return parents;
}

/**
 * Gets all siblings of an element
 * @param {HTMLElement} element - The element to find siblings for
 * @param {Function} [filter=null] - Optional filter function
 * @returns {Array<HTMLElement>} Array of sibling elements
 */
export function getSiblings(element, filter = null) {
  const siblings = [];
  
  if (!element.parentElement) {
    return siblings;
  }
  
  const children = Array.from(element.parentElement.children);
  
  for (const child of children) {
    if (child !== element) {
      if (filter && !filter(child)) {
        continue;
      }
      siblings.push(child);
    }
  }
  
  return siblings;
}

/**
 * Gets the closest ancestor matching a selector
 * @param {HTMLElement} element - The starting element
 * @param {string} selector - CSS selector to match
 * @returns {HTMLElement|null} The matching ancestor or null
 */
export function closest(element, selector) {
  // Use native closest if available
  if (element.closest) {
    return element.closest(selector);
  }
  
  // Fallback implementation
  let current = element;
  
  while (current) {
    if (current.matches && current.matches(selector)) {
      return current;
    }
    current = current.parentElement;
  }
  
  return null;
}

/**
 * Gets all elements matching a selector within a context
 * @param {string} selector - CSS selector
 * @param {HTMLElement|Document} [context=document] - Context element
 * @returns {Array<HTMLElement>} Array of matching elements
 */
export function queryAll(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}`,
      usage: `// Example: Find all parents with a specific class
const button = document.querySelector('.submit-button');
const parentSections = getParents(button).filter(
  parent => parent.classList.contains('section')
);

console.log('Button is nested in', parentSections.length, 'sections');

// Example: Toggle active state among siblings
function setActiveTab(tabElement) {
  // Remove active class from all siblings
  getSiblings(tabElement).forEach(sibling => {
    sibling.classList.remove('active');
  });
  
  // Add active class to current tab
  tabElement.classList.add('active');
  
  // Update corresponding panel
  const panelId = tabElement.getAttribute('aria-controls');
  const panel = document.getElementById(panelId);
  
  if (panel) {
    getSiblings(panel, el => el.classList.contains('panel')).forEach(
      sibling => sibling.classList.remove('active')
    );
    panel.classList.add('active');
  }
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => setActiveTab(tab));
});

// Example: Event delegation with closest
document.addEventListener('click', (event) => {
  const buttonParent = closest(event.target, '.button-container');
  
  if (buttonParent) {
    console.log('Clicked inside a button container');
    
    // Find actual button if user clicked on an icon inside the button
    const button = closest(event.target, 'button') || 
                  event.target.querySelector('button');
    
    if (button) {
      console.log('Button text:', button.textContent);
    }
  }
});

// Example: Applying styles to elements matching a pattern
function highlightExternalLinks() {
  queryAll('a[href^="http"]').forEach(link => {
    if (!link.hostname.includes(window.location.hostname)) {
      link.classList.add('external-link');
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

highlightExternalLinks();`,
      notes: [
        "These utilities provide cross-browser compatibility for DOM traversal",
        "getParents is useful for event bubbling and finding containing elements",
        "getSiblings helps manage related elements like tabs and accordions",
        "closest mimics jQuery's closest() method for finding matching ancestors",
        "Using these utilities can help avoid duplicating selector strings",
      ],
    },
    {
      name: "events",
      description: "Utilities for event handling and delegation.",
      code: `/**
 * Delegates an event to a selector
 * @param {HTMLElement} element - Element to attach the listener to
 * @param {string} eventName - Name of the event
 * @param {string} selector - Selector to delegate to
 * @param {Function} handler - Event handler
 * @param {Object} [options] - Event listener options
 * @returns {Function} Function to remove the event listener
 */
export function delegate(element, eventName, selector, handler, options) {
  const listener = function(event) {
    let target = event.target;
    
    while (target && target !== element) {
      if (target.matches(selector)) {
        // Create a new event object with the delegate target
        const delegateEvent = Object.create(event, {
          currentTarget: { value: target }
        });
        
        // Call the handler with the delegate target
        handler.call(target, delegateEvent);
        return;
      }
      target = target.parentNode;
    }
  };
  
  element.addEventListener(eventName, listener, options);
  
  // Return a function to remove the listener
  return function() {
    element.removeEventListener(eventName, listener, options);
  };
}

/**
 * Adds multiple event listeners with one call
 * @param {HTMLElement} element - Element to attach listeners to
 * @param {string|Array<string>} events - Event name or array of event names
 * @param {Function} handler - Event handler
 * @param {Object} [options] - Event listener options
 * @returns {Function} Function to remove all event listeners
 */
export function addEvents(element, events, handler, options) {
  if (!Array.isArray(events)) {
    events = [events];
  }
  
  events.forEach(event => {
    element.addEventListener(event, handler, options);
  });
  
  // Return a function to remove all listeners
  return function() {
    events.forEach(event => {
      element.removeEventListener(event, handler, options);
    });
  };
}

/**
 * Creates a debounced event handler
 * @param {Function} handler - The event handler to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced event handler
 */
export function debounceEvent(handler, delay) {
  let timeoutId;
  
  return function(...args) {
    const context = this;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      handler.apply(context, args);
    }, delay);
  };
}`,
      usage: `// Example: Event delegation for a dynamic list
const list = document.querySelector('.items-list');

// Single event listener handles clicks on any item, even those added later
const removeListener = delegate(list, 'click', '.item-delete', function(event) {
  event.preventDefault();
  
  // 'this' refers to the matched element (.item-delete button)
  const item = this.closest('.item');
  console.log('Removing item:', item.dataset.id);
  
  // Animate and remove
  item.classList.add('removing');
  setTimeout(() => item.remove(), 300);
});

// Later, to clean up
// removeListener();

// Example: Handle multiple related events with one handler
const draggable = document.querySelector('.draggable');
let isDragging = false;
let startX, startY;

function handleDragStart(event) {
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
  draggable.classList.add('dragging');
}

function handleDragMove(event) {
  if (!isDragging) return;
  
  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;
  
  const currentLeft = parseInt(getComputedStyle(draggable).left, 10);
  const currentTop = parseInt(getComputedStyle(draggable).top, 10);
  
  draggable.style.left = \`\${currentLeft + deltaX}px\`;
  draggable.style.top = \`\${currentTop + deltaY}px\`;
  
  startX = event.clientX;
  startY = event.clientY;
}

function handleDragEnd() {
  isDragging = false;
  draggable.classList.remove('dragging');
}

// Add mouse events
const removeMouseEvents = addEvents(draggable, 'mousedown', handleDragStart);
const removeDocumentEvents = addEvents(document, 
  ['mousemove', 'mouseup'], 
  function(event) {
    if (event.type === 'mousemove') {
      handleDragMove(event);
    } else {
      handleDragEnd();
    }
  }
);

// Example: Debounced window resize handler
const updateLayout = debounceEvent(function() {
  console.log('Window resized to', window.innerWidth, 'x', window.innerHeight);
  // Recalculate layout...
}, 200);

window.addEventListener('resize', updateLayout);`,
      notes: [
        "Event delegation reduces memory usage for large lists",
        "Using the delegate pattern allows you to handle events on dynamic elements",
        "The addEvents function makes it easier to manage related events",
        "Debouncing events like scroll and resize improves performance",
        "Always return cleanup functions to prevent memory leaks",
      ],
    },
    {
      name: "animation",
      description: "Utilities for smooth animations and transitions.",
      code: `/**
 * Animates an element's property from one value to another
 * @param {HTMLElement} element - Element to animate
 * @param {string} property - CSS property to animate
 * @param {number|string} start - Starting value
 * @param {number|string} end - Ending value
 * @param {number} duration - Duration in milliseconds
 * @param {Function} [easing] - Easing function
 * @param {Function} [callback] - Callback when animation completes
 * @returns {Object} Animation controller with stop method
 */
export function animate(element, property, start, end, duration, easing, callback) {
  // Default linear easing function
  const defaultEasing = t => t;
  
  // Parse start and end values if they're strings with units
  let startValue, endValue, unit;
  
  if (typeof start === 'string') {
    const startMatch = start.match(/^([+-]?[0-9.]+)(.*)$/);
    if (startMatch) {
      startValue = parseFloat(startMatch[1]);
      unit = startMatch[2];
    }
  } else {
    startValue = start;
    unit = '';
  }
  
  if (typeof end === 'string') {
    const endMatch = end.match(/^([+-]?[0-9.]+)(.*)$/);
    if (endMatch) {
      endValue = parseFloat(endMatch[1]);
      unit = unit || endMatch[2];
    }
  } else {
    endValue = end;
  }
  
  // Set up animation variables
  const startTime = performance.now();
  const easingFn = easing || defaultEasing;
  let animationId;
  let stopped = false;
  
  // Animation function
  function step(timestamp) {
    if (stopped) return;
    
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFn(progress);
    
    const currentValue = startValue + (endValue - startValue) * easedProgress;
    element.style[property] = currentValue + unit;
    
    if (progress < 1) {
      animationId = requestAnimationFrame(step);
    } else {
      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  }
  
  // Start animation
  animationId = requestAnimationFrame(step);
  
  // Return controller
  return {
    stop() {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      stopped = true;
    }
  };
}

/**
 * Common easing functions
 */
export const easings = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: t => t * t * t,
  easeOutCubic: t => (--t) * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
};

/**
 * Smoothly scrolls to a specific element
 * @param {HTMLElement|string} target - Target element or selector
 * @param {number} [duration=500] - Duration in milliseconds
 * @param {number} [offset=0] - Offset from the top in pixels
 * @param {Function} [easing] - Easing function
 * @returns {Object} Animation controller
 */
export function scrollTo(target, duration = 500, offset = 0, easing) {
  if (typeof target === 'string') {
    target = document.querySelector(target);
  }
  
  if (!target) {
    console.error('Target element not found');
    return { stop: () => {} };
  }
  
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  
  return animate(
    document.documentElement, 
    'scrollTop', 
    startPosition, 
    targetPosition, 
    duration, 
    easing || easings.easeInOutQuad,
    null
  );
}`,
      usage: `// Example: Fade in an element
const fadeIn = (element, duration = 400) => {
  element.style.opacity = '0';
  element.style.display = 'block';
  
  return animate(
    element,
    'opacity',
    0,
    1,
    duration,
    easings.easeOutQuad,
    () => console.log('Fade in complete')
  );
};

const modal = document.querySelector('.modal');
const fadeAnimation = fadeIn(modal);

// To stop the animation early
// fadeAnimation.stop();

// Example: Animated counter
function animateCounter(element, target, duration = 1000) {
  const start = parseInt(element.textContent, 10) || 0;
  
  return animate(
    { style: { value: start } }, // Use dummy object
    'value',
    start,
    target,
    duration,
    easings.easeOutCubic,
    () => console.log('Counter animation complete')
  );
}

const counterElement = document.querySelector('.counter');
let counterAnimation;

document.querySelector('.increase-button').addEventListener('click', () => {
  const currentValue = parseInt(counterElement.textContent, 10) || 0;
  const newValue = currentValue + 100;
  
  if (counterAnimation) {
    counterAnimation.stop();
  }
  
  counterAnimation = animateCounter(counterElement, newValue);
  
  // Update text during animation
  function updateCounter(timestamp) {
    const value = Math.round(counterElement.style.value);
    counterElement.textContent = value;
    
    if (counterAnimation && !counterAnimation.stopped) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
});

// Example: Smooth scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(event) {
    event.preventDefault();
    
    const targetId = this.getAttribute('href');
    scrollTo(targetId, 800, 60, easings.easeInOutCubic);
  });
});`,
      notes: [
        "Use requestAnimationFrame for smoother animations than setInterval",
        "Easing functions create more natural-feeling animations",
        "The animate function handles both numeric values and values with units (px, %, etc.)",
        "Provide a way to stop animations prematurely to prevent visual glitches",
        "For complex animations, consider using CSS transitions or animation libraries",
      ],
    },
  ],
};

export default domUtils;
