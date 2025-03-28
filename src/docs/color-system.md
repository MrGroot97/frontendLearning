# Color System Documentation

This document explains the color variable system used in our application. The color system is designed to be theme-aware, supporting both light and dark modes.

## Automatic Theming

Our application uses CSS variables to automatically apply appropriate colors to HTML elements without requiring explicit classes or inline styles. The system is designed to "just work" by applying theme colors directly to HTML elements.

For example:

- `<header>` elements automatically get the correct header background and text colors
- `<footer>` elements automatically get the correct footer styling
- `<button>` elements automatically get styled with appropriate colors
- Links within headers and footers automatically inherit the correct text colors

## Variable Structure

Our color system is organized into logical categories:

### Primary Colors

- `--primary-bg`: Main background color for the application
- `--primary-text`: Main text color that ensures readability on the primary background

### Secondary Colors

- `--secondary-bg`: Background color for sections that need visual distinction
- `--secondary-text`: Secondary text color, typically for less emphasized content

### UI Element Colors

- `--header-bg`: Background color for the application header
- `--header-text`: Text color for content in the header
- `--footer-bg`: Background color for the application footer
- `--footer-text`: Text color for content in the footer

### Dropdown Colors

- `--dropdown-bg`: Background color for dropdown menus
- `--dropdown-text`: Text color for dropdown menu items
- `--dropdown-hover-bg`: Background color for dropdown items on hover
- `--dropdown-hover-text`: Text color for dropdown items on hover
- `--dropdown-button-bg`: Background color for dropdown toggle buttons
- `--dropdown-button-text`: Text color for dropdown toggle buttons
- `--dropdown-button-hover-bg`: Background color for dropdown toggle buttons on hover

### Accent Colors

- `--accent-color`: Primary accent color for buttons, links, and highlighted elements
- `--accent-hover`: Slightly darker/lighter version for hover states

### Utility Colors

- `--border-color`: Color for borders and dividers
- `--shadow-color`: Color for box shadows with transparency
- `--card-bg`: Background color for card components

## Using the Variables

You can use the color variables in two ways:

### 1. Automatically Applied to HTML Elements

The simplest approach is to just use HTML elements directly. Our CSS automatically applies the appropriate theme colors:

```jsx
<header>This header will have the correct background and text colors</header>
<button>This button will have the correct styling</button>
<footer>This footer will have the correct styling</footer>
```

### 2. In Custom CSS

For custom components or specific needs, you can use the variables directly:

```css
.my-custom-element {
  background-color: var(--primary-bg);
  color: var(--primary-text);
  border: 1px solid var(--border-color);
}
```

## Benefits of the Color System

1. **Simplicity**: Just use HTML elements, and they'll be properly styled
2. **Consistency**: All UI elements use the same color palette
3. **Maintainability**: Colors are defined in one place
4. **Theme Support**: Easy switching between light and dark modes
5. **Accessibility**: Colors are chosen for proper contrast

## Adding New Theme Colors

When adding new colors to the system:

1. Add the variable to both `:root` (light theme) and `.dark` (dark theme) in `src/App.css`
2. Use descriptive names that indicate purpose rather than specific color values
3. Add the CSS rules for the elements that should use these variables
4. Document the new variables in this file

## Troubleshooting

If colors aren't updating properly when switching themes:

- Check that the `dark` class is being properly applied to the root element
- Verify that transitions are included for a smooth experience
- Make sure the variable is defined in both `:root` and `.dark`
