# JavaScript Interview Preparation Components

A collection of practical React components and implementations commonly asked in JavaScript/React interviews. Built with React 18, TypeScript, and Vite for optimal performance.

## 🚀 About the Project

This project showcases various common frontend components and patterns that are frequently discussed in technical interviews. Each component demonstrates a specific implementation pattern or solution to a common problem in web development.

## ✨ Features

- **Component Implementations**:

  - Infinite Scroll
  - Image Slider
  - Confluence Tree Structure
  - Pagination
  - Sticky Notes
  - Sign Maker
  - LLD Interview Questions
  - Contact Form
  - Type Ahead Search
  - Nested Comments
  - Accordian
  - Currency Converter
  - Custom Link Component
  - Forward Ref Component
  - Popup System
  - Transfer List
  - Uber Box Selector
  - YouTube Live Stream Chat
  - Atlassian Chart

- **UI Features**:

  - Responsive design with Tailwind CSS
  - Modern animations and transitions
  - Clean and intuitive user interface
  - Developer profile showcase
  - Accessible components with Radix UI primitives

- **Developer Experience**:
  - TypeScript for type safety and better IDE integration
  - Mixed JavaScript/TypeScript codebase with gradual migration support
  - Modern module resolution with path aliases
  - Full ESLint integration for TypeScript files
  - Type checking in build process
  - Zustand for simple and efficient state management

## 🛠️ Technologies Used

- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Zustand (for state management)
- Radix UI (for accessible UI components)
- Typed.js (for typing animations)
- React Icons
- SWC (for Fast Refresh)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd js_interview_prep
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

Browse through the different components using the navigation menu. Each component demonstrates a specific implementation pattern commonly asked in JavaScript/React interviews.

## 🏗️ Build

To build the project for production:

```bash
npm run build
# or
yarn build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
```

## 🧪 Linting

```bash
npm run lint
# or
yarn lint
```

## 🧪 Type Checking

```bash
npm run type-check
# or
yarn type-check
```

## 🗃️ Zustand State Management

This project uses Zustand for state management. Zustand provides a simple and efficient way to manage state in React applications.

### Adding Zustand to Your Project

```bash
npm install zustand
# or
yarn add zustand
```

### Creating a Store

```typescript
// src/stores/useCounterStore.ts
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useCounterStore;
```

### Using the Store in Components

```tsx
// src/components/Counter.tsx
import React from 'react';
import useCounterStore from '../stores/useCounterStore';

const Counter: React.FC = () => {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
```

## 🧩 Radix UI Components

This project uses Radix UI for building accessible, high-quality UI components.

### Adding Radix UI to Your Project

```bash
npm install @radix-ui/react-dropdown-menu @radix-ui/react-dialog
# or
yarn add @radix-ui/react-dropdown-menu @radix-ui/react-dialog
```

### Using Radix UI Components

```tsx
// src/components/AccessibleDropdown.tsx
import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const AccessibleDropdown: React.FC = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="button">Options</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="dropdown-content">
          <DropdownMenu.Item className="dropdown-item">Profile</DropdownMenu.Item>
          <DropdownMenu.Item className="dropdown-item">Settings</DropdownMenu.Item>
          <DropdownMenu.Separator className="dropdown-separator" />
          <DropdownMenu.Item className="dropdown-item">Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default AccessibleDropdown;
```

## 🧩 TypeScript Migration Guide

This project supports a gradual migration approach from JavaScript to TypeScript:

1. The `allowJs` compiler option is enabled, allowing both `.js/.jsx` and `.ts/.tsx` files to coexist.
2. To convert a component to TypeScript:
   - Rename the file extension from `.jsx` to `.tsx`
   - Add proper type annotations to props, state, and functions
   - Run type checking with `npm run type-check` to ensure no errors

Example of converting a simple component:

```tsx
// Before (Component.jsx)
import React from "react";

function Component({ title, onClick }) {
  return <div onClick={onClick}>{title}</div>;
}

export default Component;

// After (Component.tsx)
import React from "react";

interface ComponentProps {
  title: string;
  onClick: () => void;
}

const Component: React.FC<ComponentProps> = ({ title, onClick }) => {
  return <div onClick={onClick}>{title}</div>;
};

export default Component;
```

### Configuration Files

Note that configuration files in this project use the CommonJS format with `.cjs` extension because:

1. The project is configured as an ES module project (`"type": "module"` in `package.json`)
2. Many build tools (PostCSS, Tailwind, etc.) expect CommonJS modules for their configuration

Configuration files include:

- `vite.config.ts` - TypeScript for Vite configuration
- `postcss.config.cjs` - CommonJS for PostCSS
- `tailwind.config.cjs` - CommonJS for Tailwind CSS

## 📝 Project Structure

```
src/
├── assets/            # Static assets like images
├── components/        # Reusable React components
├── db/                # Mock data for components
├── footer/            # Footer component
├── lib/               # Utility libraries
├── lldInterviewQuestions/ # Low-level design interview questions
├── stores/            # Zustand stores
├── utils/             # Utility functions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is [MIT](LICENSE) licensed.

## 👨‍💻 Author

- Ujjwal Kumar - [LinkedIn](https://www.linkedin.com/in/dev-ujjwal/) | [GitHub](https://github.com/MrGroot97) | [Twitter](https://x.com/Oye_ujju)

---

This project was bootstrapped with [Vite](https://vitejs.dev/) using the React template.
