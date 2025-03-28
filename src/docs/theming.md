# Theming System Documentation

## Overview

The theming system provides a way to implement dark mode and light mode across the application. It uses React Context API to share the theme state and localStorage to persist the user's preference.

## Features

- Light and Dark mode toggle
- Persistence of theme preference
- Respects user's system preference
- Updates in real-time if system preference changes
- TypeScript support for type safety

## How to Use

### Adding Dark Mode Styles in Components

Use Tailwind's dark mode variant in your components:

```tsx
<div className="bg-white text-black dark:bg-gray-800 dark:text-white">
  This div changes colors based on theme
</div>
```

### Accessing the Theme in Components

Import and use the `useTheme` hook to access theme-related values and functions:

```tsx
import { useTheme } from "../contexts/ThemeContext";

const MyComponent = () => {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  );
};
```

### Available Values and Functions

The `useTheme` hook provides:

- `theme`: The current theme ('light' or 'dark')
- `toggleTheme()`: Function to toggle between light and dark mode
- `setTheme(themeValue)`: Function to directly set the theme to 'light' or 'dark'

## Implementation Details

The theming system consists of:

1. **ThemeContext**: Provides the theme state and functions to change it
2. **ThemeProvider**: Wraps your application and handles theme initialization
3. **useTheme Hook**: Allows components to access the theme

The system also:

- Saves the theme preference in localStorage
- Initializes based on saved preference or system preference
- Listens for system preference changes and updates accordingly

## Example Usage in Layout Components

```tsx
import { useTheme } from "../contexts/ThemeContext";

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {children}
    </div>
  );
};
```
