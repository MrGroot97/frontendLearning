/**
 * Data structure for LLD interview questions categorized by component type
 */
const lldQuestions = {
  "User Input": {
    description: "Components that handle user input in various ways",
    components: [
      {
        title: "TypeAhead/AutoSuggestions",
        description:
          "A typeahead component that shows suggestions as the user types",
        problemStatement:
          "Implement a typeahead/autocomplete component that suggests options as users type and allows selection from a dropdown.",
        requirements: [
          "Show suggestions as the user types",
          "Allow keyboard navigation through suggestions",
          "Highlight matching text in suggestions",
          "Support selection via mouse click or keyboard",
        ],
        keyTakeaways: [
          "Debouncing input for performance optimization",
          "Proper keyboard accessibility implementation",
          "Efficient filtering algorithms",
        ],
        componentName: "TypeAhead",
        componentPath: "typeAhead",
      },
      {
        title: "Currency Converter",
        description: "A component that converts between different currencies",
        problemStatement:
          "Create a currency converter that allows users to convert amounts between different currencies with real-time exchange rates.",
        requirements: [
          "Support conversion between multiple currencies",
          "Show conversion rate",
          "Handle decimal input correctly",
          "Update conversion in real-time as user types",
        ],
        keyTakeaways: [
          "Working with currency formatting",
          "Handling decimal precision in JavaScript",
          "Implementing bidirectional data flow",
        ],
        componentName: "CurrencyConverter",
        componentPath: "currencyConverter",
      },
      {
        title: "ForwardRef based InputComponent",
        description: "An input component that uses React's forwardRef",
        problemStatement:
          "Implement a reusable input component that supports ref forwarding to access the underlying DOM element.",
        requirements: [
          "Support all native input properties",
          "Forward refs to access the native input element",
          "Customize input appearance based on props",
        ],
        keyTakeaways: [
          "Proper usage of forwardRef in React",
          "Creating flexible and reusable form components",
          "Controlling input focus programmatically",
        ],
        componentName: "InputComponent",
        componentPath: "forwardRefComponent",
      },
      {
        title: "Sign Maker",
        description: "A component for creating and customizing digital signs",
        problemStatement:
          "Create a sign maker component that allows users to customize text, colors, and styles to generate digital signs.",
        requirements: [
          "Allow text input for sign content",
          "Support customization of colors and styles",
          "Provide a preview of the sign as it's being created",
          "Enable saving or exporting the final design",
        ],
        keyTakeaways: [
          "Working with form controls for design customization",
          "Implementing real-time previews based on user input",
          "Managing complex styling state",
        ],
        componentName: "SignMaker",
        componentPath: "signMaker",
      },
    ],
  },
  "Selection & Filtering": {
    description: "Components for selecting, filtering, and organizing data",
    components: [
      {
        title: "Uber Box Selector",
        description:
          "A multi-select component with categories similar to Uber's ride selection",
        problemStatement:
          "Build a component that allows users to select options from different categories, with only one selection allowed per category.",
        requirements: [
          "Group options by categories",
          "Allow only one selection per category",
          "Provide visual feedback for selected options",
          "Support deselection of options",
        ],
        keyTakeaways: [
          "Maintaining complex state with multiple selections",
          "Creating intuitive user selection interfaces",
          "Implementing category-based validation",
        ],
        componentName: "UberBoxSelector",
        componentPath: "uberBoxSelector",
      },
      {
        title: "TransferList Meta",
        description: "A component to transfer items between two lists",
        problemStatement:
          "Implement a transfer list component that allows users to move items between two lists (available and selected).",
        requirements: [
          "Support multi-selection of items",
          "Provide buttons to transfer items between lists",
          "Allow searching/filtering in both lists",
          "Maintain the order of items",
        ],
        keyTakeaways: [
          "Managing bidirectional data flow",
          "Implementing efficient list operations",
          "Creating an accessible interface for list manipulation",
        ],
        componentName: "TransferList",
        componentPath: "transferListMeta",
      },
      {
        title: "Pagination",
        description:
          "A pagination component for navigating through pages of content",
        problemStatement:
          "Implement a pagination component that allows users to navigate through multiple pages of content with clear page indication.",
        requirements: [
          "Show current page and total pages",
          "Allow navigation to previous and next pages",
          "Support jumping to specific pages",
          "Display a reasonable number of page buttons",
        ],
        keyTakeaways: [
          "Managing complex pagination state",
          "Creating accessible navigation controls",
          "Implementing flexible page size options",
        ],
        componentName: "Pagination",
        componentPath: "pagination",
      },
    ],
  },
  Visualization: {
    description: "Components that visualize data and information",
    components: [
      {
        title: "Atlassian Chart",
        description:
          "A chart component similar to those used in Atlassian products",
        problemStatement:
          "Create a data visualization component that displays information in a chart format with interactive elements.",
        requirements: [
          "Render data in a visually appealing chart",
          "Support user interactions with chart elements",
          "Implement responsive design for different screen sizes",
          "Provide tooltips or additional information on hover",
        ],
        keyTakeaways: [
          "Working with data visualization libraries",
          "Handling responsive design for charts",
          "Creating interactive data representations",
        ],
        componentName: "AltassianChart",
        componentPath: "atlassianChart",
      },
      {
        title: "Image Slider",
        description: "An image carousel/slider component",
        problemStatement:
          "Create an image slider that allows users to navigate through a collection of images with smooth transitions.",
        requirements: [
          "Support automatic and manual image transitions",
          "Include navigation controls (next/previous)",
          "Show image indicators/pagination",
          "Implement smooth transition animations",
        ],
        keyTakeaways: [
          "Managing animation and transition states",
          "Implementing touch and gesture support",
          "Creating accessible carousel controls",
        ],
        componentName: "ImageSlider",
        componentPath: "imageSlider",
      },
    ],
  },
  "Interactive UI": {
    description: "UI components that provide rich user interactions",
    components: [
      {
        title: "Tabs Component",
        description: "A reusable tabs component with accessibility and keyboard navigation",
        problemStatement: "Create a tabs component that allows users to switch between different content panels with proper accessibility support and keyboard navigation.",
        requirements: [
          "Support dynamic tab creation and content switching",
          "Implement keyboard navigation (left/right arrows, home/end)",
          "Ensure proper ARIA attributes and roles",
          "Support both controlled and uncontrolled modes",
          "Handle tab focus management",
          "Provide smooth transitions between tabs"
        ],
        keyTakeaways: [
          "Implementing WAI-ARIA patterns for tabs",
          "Managing focus and keyboard interactions",
          "Creating reusable and flexible components",
          "Handling dynamic content loading"
        ],
        componentName: "Tabs",
        componentPath: "tabs"
      },
      {
        title: "Accordian",
        description: "An accordion component for collapsible content sections",
        problemStatement:
          "Implement an accordion component that allows users to expand and collapse content sections, with support for having multiple sections open simultaneously or restricting to one section at a time.",
        requirements: [
          "Support expanding and collapsing sections",
          "Option to allow multiple open sections or limit to one",
          "Smooth animations for expanding/collapsing",
          "Accessible implementation with proper ARIA attributes",
        ],
        keyTakeaways: [
          "Implementing collapsible UI patterns",
          "Managing state for multiple expandable sections",
          "Creating accessible interactive components",
        ],
        componentName: "Accordian",
        componentPath: "accordian",
      },
      {
        title: "Country Game Microsoft",
        description:
          "A game component for guessing countries, similar to a Microsoft interview question",
        problemStatement:
          "Create an interactive game where users need to guess country names with limited attempts and receive feedback on their guesses.",
        requirements: [
          "Track user guesses and attempts",
          "Provide feedback on correctness of guesses",
          "Implement game state (win/lose conditions)",
          "Display appropriate messages based on game progress",
        ],
        keyTakeaways: [
          "Managing complex game state",
          "Implementing validation logic",
          "Creating engaging user feedback mechanisms",
        ],
        componentName: "CountryGameMicrosoft",
        componentPath: "countryGameMicrosoft",
      },
      {
        title: "Portal Popup",
        description: "A popup component using React portals",
        problemStatement:
          "Implement a popup component that renders outside the normal DOM hierarchy using React portals, with support for positioning and closing behaviors.",
        requirements: [
          "Render popup content outside the parent DOM hierarchy",
          "Support different positioning options",
          "Close on outside click or escape key",
          "Include animations for open/close transitions",
        ],
        keyTakeaways: [
          "Proper usage of React portals",
          "Handling click outside detection",
          "Creating accessible modal interfaces",
        ],
        componentName: "PopupDemo",
        componentPath: "popup",
      },
      {
        title: "Sticky Notes",
        description: "A draggable sticky notes component",
        problemStatement:
          "Implement a sticky notes application where users can create, edit, and position notes on a canvas.",
        requirements: [
          "Create and edit notes with different colors",
          "Drag and position notes freely on the canvas",
          "Persist notes between sessions",
          "Support note deletion and editing",
        ],
        keyTakeaways: [
          "Implementing drag and drop functionality",
          "Managing position state for multiple elements",
          "Creating an intuitive editing interface",
        ],
        componentName: "StickyNote",
        componentPath: "stickyNotes",
      },
    ],
  },
  "Social Features": {
    description: "Components that replicate social media interactions",
    components: [
      {
        title: "Nested Comments",
        description:
          "A component for displaying and creating nested comment threads",
        problemStatement:
          "Build a nested comments component that allows users to reply to comments at any level of nesting, similar to Reddit or other discussion platforms.",
        requirements: [
          "Support unlimited levels of comment nesting",
          "Allow adding replies to any comment",
          "Display comments with proper indentation",
          "Include features like editing or deleting comments",
        ],
        keyTakeaways: [
          "Working with recursive component structures",
          "Managing deeply nested state",
          "Implementing thread-based user interactions",
        ],
        componentName: "NestedComments",
        componentPath: "nestedComments",
      },
      {
        title: "LiveStreamChat",
        description: "A component similar to YouTube live stream chat",
        problemStatement:
          "Implement a live chat component that displays messages in real-time and automatically scrolls to show the newest messages.",
        requirements: [
          "Display messages in chronological order",
          "Auto-scroll to newest messages",
          "Support sending new messages",
          "Handle high-frequency message updates efficiently",
        ],
        keyTakeaways: [
          "Managing auto-scrolling behavior",
          "Optimizing for frequent updates",
          "Creating real-time interaction patterns",
        ],
        componentName: "LiveStreamChat",
        componentPath: "youtubeLiveStremChat",
      },
    ],
  },
  "Performance & Loading": {
    description: "Components optimized for performance and loading patterns",
    components: [
      {
        title: "Infinite Scroll",
        description: "A component that loads content as the user scrolls",
        problemStatement:
          "Implement an infinite scroll component that efficiently loads and renders additional content as the user scrolls down the page.",
        requirements: [
          "Detect when user is near the bottom of the content",
          "Load additional items seamlessly",
          "Show loading indicator during content fetch",
          "Handle network errors gracefully",
        ],
        keyTakeaways: [
          "Implementing efficient scroll detection",
          "Managing asynchronous data loading",
          "Optimizing rendering for large content lists",
        ],
        componentName: "InfiniteScroll",
        componentPath: "infiniteScroll",
      },
    ],
  },
  "Data Structure Visualization": {
    description: "Components that visualize complex data structures",
    components: [
      {
        title: "Confluence Tree Structure",
        description:
          "A tree view component similar to Confluence's page hierarchy",
        problemStatement:
          "Implement a tree visualization component that displays hierarchical data with expandable/collapsible nodes and interactive features.",
        requirements: [
          "Render nested hierarchical data",
          "Support expanding and collapsing of tree nodes",
          "Allow node selection and interaction",
          "Implement proper visual indentation for hierarchy levels",
        ],
        keyTakeaways: [
          "Working with recursive tree structures",
          "Managing complex expand/collapse state",
          "Creating accessible tree navigation",
        ],
        componentName: "ConfluenceTreeStructure",
        componentPath: "confluenceTreeStructure",
      },
    ],
  },
};

export default lldQuestions;
