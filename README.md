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

- **Developer Experience**:
  - TypeScript for type safety and better IDE integration
  - Mixed JavaScript/TypeScript codebase with gradual migration support
  - Modern module resolution with path aliases
  - Full ESLint integration for TypeScript files
  - Type checking in build process

## 🛠️ Technologies Used

- React 18
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
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
