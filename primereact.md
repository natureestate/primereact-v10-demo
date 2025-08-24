# PrimeReact v10

# Configuration

Application wide configuration for PrimeReact v10. This documentation covers the stable version 10.x which is recommended for production use.

⚠️ **Version Note**: This guide is specifically for PrimeReact v10. For v11 (currently in alpha), please refer to the official v11 documentation.

## Installation

Install PrimeReact v10 using your preferred package manager:

```bash
# Using npm
npm install primereact@^10.0.0

# Using yarn
yarn add primereact@^10.0.0

# Using pnpm
pnpm add primereact@^10.0.0
```

## Basic Setup

For PrimeReact v10, you don't need a special provider. Simply import the theme and components directly:

## Theme (V10 Styled Mode)

PrimeReact v10 uses the traditional CSS import method for theming. Import a theme CSS file to style your components:

```tsx showLineNumbers {1-4}
// Import theme CSS (choose one)
import 'primereact/resources/themes/lara-light-cyan/theme.css';
// or
// import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/themes/lara-dark-cyan/theme.css';
// import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
// import 'primereact/resources/themes/material-light/theme.css';

// Core CSS
import 'primereact/resources/primereact.min.css';

// PrimeIcons
import 'primeicons/primeicons.css';

// Your app component
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
```

## Unstyled Mode (V10)

In PrimeReact v10, unstyled mode is controlled per component or globally via configuration. To use unstyled mode:

### Per Component
```tsx showLineNumbers
import { Button } from 'primereact/button';

// Individual component unstyled
<Button unstyled={true} label="Unstyled Button" />
```

### Global Configuration
```tsx showLineNumbers
import PrimeReact from 'primereact/api';

// Configure globally in your main file
PrimeReact.unstyled = true;

// Then use components normally
<Button label="Globally Unstyled Button" />
```

## PassThrough (V10)

PrimeReact v10 supports PassThrough properties for advanced customization. Apply them directly to components:

```tsx showLineNumbers
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

// PassThrough on individual components
<Button 
    label="Custom Button"
    pt={{
        root: { className: 'custom-button-root' },
        label: { style: { fontWeight: 'bold' } }
    }}
/>

<DataTable 
    value={data}
    pt={{
        header: { className: 'custom-header' },
        table: { style: { border: '1px solid #ccc' } }
    }}
/>
```

## PassThrough Options

Used to configure the `ptOptions` properties of components. The `mergeSections` defines whether the sections from the main configuration gets added and the `mergeProps` controls whether to override or merge the defined props.
Defaults are `true` for `mergeSections` and `false` for `mergeProps`.

```tsx showLineNumbers {4-7,11}
import { PrimeReactProvider } from '@primereact/core';
...

const ptOptions = {
    mergeSections: true,
    mergeProps: false
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <PrimeReactProvider ptOptions={ptOptions}>
            <App />
        </PrimeReactProvider>
    </React.StrictMode>
);
```

## InputVariant (V10)

Input fields come in two styles, default is `outlined` with borders around the field whereas `filled` alternative adds a background color to the field.

### Method 1: CSS Class (Recommended for V10)
Apply `p-variant-filled` to an ancestor of an input to enable the filled style:

```css
/* Apply to entire application */
body {
    /* Add filled variant class */
}

.p-variant-filled .p-inputtext {
    background-color: var(--surface-200);
}
```

### Method 2: Global API Configuration
```tsx showLineNumbers
import PrimeReact from 'primereact/api';

// Set global input variant for V10
PrimeReact.inputVariant = 'filled'; // or 'outlined'
```

### Method 3: Individual Component Props
```tsx showLineNumbers
import { InputText } from 'primereact/inputtext';

<InputText variant="filled" placeholder="Filled input" />
<InputText variant="outlined" placeholder="Outlined input" />
```


# LLMs.txt

LLMs.txt is a file that contains the LLMs for the PrimeReact documentation.


## /llms.txt

The [llms.txt](https://llmstxt.org/) file is an industry standard that helps AI models better understand and navigate the PrimeReact documentation. It lists key pages in a structured format, making it easier for LLMs to retrieve relevant information.

<Button as="a" href="/llms.txt" target="_blank">Open llms.txt</Button>

&nbsp;

## /llms-full.txt

The `llms-full.txt` file is a complete list of all the pages in the PrimeReact documentation. It is used to help AI models understand the entire documentation set.

<Button as="a" href="/llms-full.txt" target="_blank">Open llms-full.txt</Button>

&nbsp;

## .md extension

Add a `.md` to a page’s URL to display a Markdown version of that page.

<Button as="a" href="/docs/llms.md" target="_blank">Open /docs/llms.md</Button>


# Pass Through

The Pass Through attributes is an API to access the internal DOM Structure of the components.


## Introduction

In traditional 3rd party UI libraries, users are limited to the API provided by component author. This API commonly consists of props, events and slots. Whenever a requirement emerges for a new customization option in the API, the component
author needs to develop and publish it with a new release.

Vision of PrimeTek is _Your components, not ours_. The pass through feature is a key element to implement this vision by exposing the component internals in order to apply arbitrary attributes and listeners to the DOM elements. The primary
advantage of this approach is that it frees you from being restricted by the main component API. We recommend considering the pass-through feature whenever you need to tailor a component that lacks a built-in feature for your specific
requirement.

## Basic

Each component has a special `pt` property to define an object with keys corresponding to the available DOM elements. Each value can either be a string, an object or a function that returns a string or an object to define the
arbitrary properties to apply to the element such as styling, aria, data-\* or custom attributes. If the value is a string or a function that returns a string, it is considered as a className definition and added to the className attribute of the
element. Every component documentation has a dedicated section to document the available section names exposed via PT.

Most common usage of `pt` is styling and customization. Example below styles an unstyled Panel component with Tailwind CSS library.

```tsx
import { Panel } from 'primereact/panel';

export default function BasicDemo() {
    return (
        <div className="card">
            <Panel
                pt={{
                    root: 'border border-primary rounded-xl p-4',
                    header: {
                        id: 'myPanelHeader',
                        style: {
                            userSelect: 'none'
                        },
                        className: 'flex items-center justify-between text-primary font-bold'
                    },
                    content: { className: 'text-primary-700 dark:text-primary-200 mt-4' },
                    title: 'text-xl'
                }}
            >
                <Panel.Header>
                    <Panel.Title> Header</Panel.Title>
                </Panel.Header>
                <Panel.Content>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Panel.Content>
            </Panel>
        </div>
    );
}

```

## Global

Defines the shared pass through properties per component type. For example, with the configuration below all panel headers have the `bg-primary` style class and the all autocomplete components have a fixed width. These settings can be overriden by a particular component as components `pt` property has higher precedence over global `pt`.

```tsx
pt: {
    panel: {
        header: {
            className: 'bg-primary text-primary-contrast'
        }
    },
    autocomplete: {
        input: {
            root: 'w-64' // OR { class: 'w-64' }
        }
    }
}
```

## Custom CSS

The `global` property has a `css` option to define custom css that belongs to a global `pt` configuration. Common use case of this feature is defining global styles and animations related to the pass through configuration.

```tsx
pt: {
    global: {
        css: \`
            .my-button {
                border-width: 2px;
            }
        \`
    },
    button: {
        root: 'my-button'
    }
}
```


# Tailwind CSS

Integration between PrimeReact and Tailwind CSS both in styled and unstyled modes.


## Overview

Tailwind CSS is a popular CSS framework based on a utility-first design. The core provides flexible CSS classes with predefined CSS rules to build your own UI elements. For example, instead of an opinionated `btn` className as in
Bootstrap, Tailwind offers primitive classes like `bg-blue-500`, `rounded` and `p-4` to apply a button.

Tailwind is an outstanding CSS library, however it lacks a true comprehensive UI suite when combined with Vue.js, this is where PrimeReact comes in by providing a wide range of highly accessible and feature rich UI component library. The
core of PrimeReact does not depend on Tailwind CSS, instead we provide the necessary integration points such as the primeui tailwind plugin and the Tailwind version for the unstyled mode.

<DocNotification>
    Tailwind CSS and PrimeReact can be used together via two main approaches. Simple approach is using Tailwind CSS _around_ PrimeReact components for layout purposes as demonstrated in the samples section below, the advanced approach takes the
    integration a step further by allowing Tailwind CSS _within_ the component internals to style the entire UI suite in unstyled mode.
</DocNotification>

## Tailwind Theme (V10)

PrimeReact v10 provides excellent Tailwind CSS integration through two approaches:

### 1. Styled Mode + Tailwind (Recommended for V10)
Use PrimeReact styled components with Tailwind utilities for layout and spacing:

```tsx
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';

// Use Tailwind for layout, PrimeReact for components
<div className="p-4 bg-gray-100 rounded-lg">
    <Button label="Primary" className="mr-2" />
    <Button label="Secondary" severity="secondary" />
</div>
```

### 2. Unstyled Mode + Tailwind (Advanced)
Complete customization with Tailwind classes:

```tsx
import PrimeReact from 'primereact/api';

// Enable unstyled mode globally
PrimeReact.unstyled = true;

// Style with Tailwind classes
<Button 
    unstyled
    pt={{
        root: { className: 'bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded' }
    }}
    label="Custom Button"
/>
```

## Plugin

The [tailwindcss-primeui](https://www.npmjs.com/package/tailwindcss-primeui) is an official plugin by PrimeTek to provide first className integration between a Prime UI library like
PrimeReact and Tailwind CSS. It is designed to work both in styled and unstyled modes. In styled mode, for instance the semantic colors such as primary and surfaces are provided as Tailwind utilities e.g. `bg-primary`,
`text-surface-500`, `text-muted-color`.

If you haven't already done so, start by integrating Tailwind into your project. Detailed steps for this process can be found in the Tailwind [documentation](https://tailwindcss.com/).
After successfully installing Tailwind, proceed with the installation of the PrimeUI plugin. This single npm package comes with two libraries: the CSS version is compatible with Tailwind v4, while the JS version is designed for Tailwind
v3.

```bash
npm i tailwindcss-primeui
```

### Tailwind v4

In the CSS file that contains the tailwindcss import, add the `tailwindcss-primeui` import as well.

```css
@import 'tailwindcss';

@import 'tailwindcss-primeui';
```

### Tailwind v3

Use the plugins option in your Tailwind config file to configure the plugin.

```tsx
// tailwind.config.js
import PrimeUI from 'tailwindcss-primeui';

export default {
    // ...
    plugins: [PrimeUI]
};
```

## Extensions

The plugin extends the default configuration with a new set of utilities whose values are derived from the PrimeReact theme in use. All variants and breakpoints are supported e.g. `dark:sm:hover:bg-primary`.

| Class                       | Property                                  |
| --------------------------- | ----------------------------------------- |
| `primary-[50-950]`          | Primary color palette.                    |
| `surface-[0-950]`           | Surface color palette.                    |
| `primary`                   | Default primary color.                    |
| `primary-contrast`          | Default primary contrast color.           |
| `primary-emphasis`          | Default primary emphasis color.           |
| `border-surface`            | Default primary emphasis color.           |
| `bg-emphasis`               | Emphasis background e.g. hovered element. |
| `bg-highlight`              | Highlight background.                     |
| `bg-highlight-emphasis`     | Highlight background with emphasis.       |
| `rounded-border`            | Border radius.                            |
| `text-color`                | Text color with emphasis.                 |
| `text-color-emphasis`       | Default primary emphasis color.           |
| `text-muted-color`          | Secondary text color.                     |
| `text-muted-color-emphasis` | Secondary text color with emphasis.       |

## Dark Mode

In styled mode, PrimeReact uses the `system` as the default `darkModeSelector` in theme configuration. If you have a dark mode switch in your application, ensure that `darkModeSelector` is aligned with the Tailwind dark
variant for seamless integration. Note that, this particular configuration isn't required if you're utilizing the default system color scheme.

### V10 Dark Mode Setup

```tsx showLineNumbers
import 'primereact/resources/themes/lara-dark-cyan/theme.css'; // Dark theme
// or conditionally:
// import 'primereact/resources/themes/lara-light-cyan/theme.css'; // Light theme

import PrimeReact from 'primereact/api';

// Configure dark mode for V10

const primereact = {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark'
        }
    }
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PrimeReactProvider {...primereact}>
            <App />
        </PrimeReactProvider>
    </StrictMode>
);
```

### Tailwind v4

Add a custom variant for dark with a custom selector.

```css
@import "tailwindcss";
@import "tailwindcss-primeui";
@custom-variant dark (&:where(.my-app-dark, .my-app-dark *));     //dark mode configuration
```

### Tailwind v3

Use the plugins option in your Tailwind config file to configure the plugin.

```tsx
// tailwind.config.js
import PrimeUI from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[className~="my-app-dark"]'], //dark mode configuration
    plugins: [PrimeUI]
};
```

## Override

Tailwind utilities may not be able to override the default styling of components due to css specificity, there are two possible solutions; Important and CSS Layer.

### Important

Use the `!` as a prefix to enforce the styling. This is not the recommend approach, and should be used as last resort to avoid adding unnecessary style classes to your bundle.

##### Tailwind v4

```tsx
<InputText placeholder="Overriden" className="p-8!" />
```

##### Tailwind v3

```tsx
<InputText placeholder="Overriden" className="!p-8" />
```

### CSS Layer

CSS Layer provides control over the css specificity so that Tailwind utilities can safely override components.

##### Tailwind v4

Ensure `primereact` layer is after `theme` and `base`, but before the other Tailwind layers such as `utilities`.

```tsx showLineNumbers
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PrimeReactProvider } from '@primereact/core';
import Aura from '@primeuix/themes/aura';

const primereact = {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primereact',
                order: 'theme, base, primereact'
            }
        }
    }
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PrimeReactProvider {...primereact}>
            <App />
        </PrimeReactProvider>
    </StrictMode>
);
```

No change in the CSS configuration is required.

```css
@import 'tailwindcss';
@import 'tailwindcss-primeui';
```

##### Tailwind v3

The `primereact` layer should be between base and utilities.

```tsx showLineNumbers
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PrimeReactProvider } from '@primereact/core';
import Aura from '@primeuix/themes/aura';

const primereact = {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primereact',
                order: 'tailwind-base, primereact, tailwind-utilities'
            }
        }
    }
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PrimeReactProvider {...primereact}>
            <App />
        </PrimeReactProvider>
    </StrictMode>
);
```

Tailwind v3 does not use native `layer` so needs to be defined with CSS.

```css
@layer tailwind-base, primereact, tailwind-utilities;

@layer tailwind-base {
    @tailwind base;
}

@layer tailwind-utilities {
    @tailwind components;
    @tailwind utilities;
}
```

## Samples

Example uses cases with PrimeReact and Tailwind CSS.

### Color Palette

PrimeReact color palette as utility classes.

```tsx
export default function ColorPaletteDemo() {
    const colors = ['primary', 'surface'];
    const shades = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    return (
        <div className="card">
            <div className="flex flex-col gap-12">
                <ul className="p-0 m-0 list-none flex sm:flex-col gap-4 flex-wrap sm:flex-nowrap">
                    {colors.map((color, i) => (
                        <li key={i} className="flex-auto" style={{ minWidth: '6rem' }}>
                            <span className="font-medium capitalize block mb-2 text-center sm:text-left">{color}</span>
                            <div className="flex gap-4 flex-auto flex-col sm:flex-row">
                                {shades.map((shade) => (
                                    <div key={shade} className={`flex flex-col items-center gap-1 flex-1 ${color === 'primary' && shade === 0 ? 'invisible' : ''}`}>
                                        <div className="rounded h-8 w-full" style={{ backgroundColor: `var(--p-${color}-${shade})` }}></div>
                                        <span className="text-sm text-surface-500 dark:text-surface-400 font-medium">{shade}</span>
                                    </div>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex gap-6 flex-wrap">
                    <div className="rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast font-medium flex-auto transition-colors">primary</div>
                    <div className="rounded-border p-4 border border-transparent flex items-center justify-center bg-highlight hover:bg-highlight-emphasis font-medium flex-auto transition-colors">highlight</div>
                    <div className="rounded-border p-4 border border-surface flex items-center justify-center text-muted-color hover:text-color hover:bg-emphasis font-medium flex-auto transition-colors">box</div>
                </div>
            </div>
        </div>
    );
}

```

```tsx
<div className="flex flex-col gap-12">
    <div className="flex gap-6 flex-wrap">
        <div className="rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast font-medium flex-auto transition-colors">primary</div>
        <div className="rounded-border p-4 border border-transparent flex items-center justify-center bg-highlight hover:bg-highlight-emphasis font-medium flex-auto transition-colors">highlight</div>
        <div className="rounded-border p-4 border border-surface flex items-center justify-center text-muted-color hover:text-color hover:bg-emphasis font-medium flex-auto transition-colors">box</div>
    </div>
</div>
```

### Starter

The Tailwind v4 and PrimeReact [starter example](https://github.com/primefaces/primereact-examples/tree/main/vite-quickstart-nextgen) is available to demonstrate the integration setup with an example dashboard.

## Animations

The plugin also adds extended animation utilities that can be used with the styleclass and animateonscroll components.

### Animation Name

| Class                  | Property                                                                                                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `animate-enter`        | animation-name: enter; <br />--p-enter-opacity: initial; <br />--p-enter-scale: initial; <br />--p-enter-rotate: initial; <br />--p-enter-translate-x: initial; <br />--p-enter-translate-y: initial; |
| `animate-leave`        | animation-name: leave; <br />--p-leave-opacity: initial; <br />--p-leave-scale: initial; <br />--p-leave-rotate: initial; <br />--p-leave-translate-x: initial; <br />--p-leave-translate-y: initial; |
| `animate-leave`        | fadein 0.15s linear                                                                                                                                                                                   |
| `animate-fadein`       | fadein 0.15s linear                                                                                                                                                                                   |
| `animate-fadeout`      | fadeout 0.15s linear                                                                                                                                                                                  |
| `animate-slidedown`    | slidedown 0.45s ease-in-out                                                                                                                                                                           |
| `animate-slideup`      | slideup 0.45s cubic-bezier(0, 1, 0, 1)                                                                                                                                                                |
| `animate-scalein`      | scalein 0.15s linear                                                                                                                                                                                  |
| `animate-fadeinleft`   | fadeinleft 0.15s linear                                                                                                                                                                               |
| `animate-fadeoutleft`  | fadeoutleft 0.15s linear                                                                                                                                                                              |
| `animate-fadeinright`  | fadeinright 0.15s linear                                                                                                                                                                              |
| `animate-fadeoutright` | fadeoutright 0.15s linear                                                                                                                                                                             |
| `animate-fadeinup`     | fadeinup 0.15s linear                                                                                                                                                                                 |
| `animate-fadeoutup`    | fadeoutup 0.15s linear                                                                                                                                                                                |
| `animate-fadeindown`   | fadeindown 0.15s linear                                                                                                                                                                               |
| `animate-fadeoutup`    | fadeoutup 0.15s linear                                                                                                                                                                                |
| `animate-width`        | width 0.15s linear                                                                                                                                                                                    |
| `animate-flip`         | flip 0.15s linear                                                                                                                                                                                     |
| `animate-flipup`       | flipup 0.15s linear                                                                                                                                                                                   |
| `animate-flipleft`     | fadein 0.15s linear                                                                                                                                                                                   |
| `animate-flipright`    | flipright 0.15s linear                                                                                                                                                                                |
| `animate-zoomin`       | zoomin 0.15s linear                                                                                                                                                                                   |
| `animate-zoomindown`   | zoomindown 0.15s linear                                                                                                                                                                               |
| `animate-zoominleft`   | zoominleft 0.15s linear                                                                                                                                                                               |
| `animate-zoominright`  | zoominright 0.15s linear                                                                                                                                                                              |
| `animate-zoominup`     | zoominup 0.15s linear                                                                                                                                                                                 |

### Animation Duration

| Class                      | Property                   |
| -------------------------- | -------------------------- |
| `animate-duration-0`       | animation-duration: 0s     |
| `animate-duration-75`      | animation-duration: 75ms   |
| `animate-duration-100`     | animation-duration: 100ms  |
| `animate-duration-200`     | animation-duration: 200ms  |
| `animate-duration-300`     | animation-duration: 300ms  |
| `animate-duration-400`     | animation-duration: 400ms  |
| `animate-duration-500`     | animation-duration: 500ms  |
| `animate-duration-700`     | animation-duration: 700ms  |
| `animate-duration-1000`    | animation-duration: 1000ms |
| `animate-duration-2000`    | animation-duration: 2000ms |
| `animate-duration-3000`    | animation-duration: 300ms  |
| `animate-duration-[value]` | animation-duration: value  |

### Animation Delay

| Class                | Property                |
| -------------------- | ----------------------- |
| `animate-delay-none` | animation-duration: 0s  |
| `animate-delay-75`   | animation-delay: 75ms   |
| `animate-delay-100`  | animation-delay: 100ms  |
| `animate-delay-150`  | animation-delay: 150ms  |
| `animate-delay-200`  | animation-delay: 200ms  |
| `animate-delay-300`  | animation-delay: 300ms  |
| `animate-delay-400`  | animation-delay: 400ms  |
| `animate-delay-500`  | animation-delay: 500ms  |
| `animate-delay-700`  | animation-delay: 700ms  |
| `animate-delay-1000` | animation-delay: 1000ms |

### Iteration Count

| Class              | Property                            |
| ------------------ | ----------------------------------- |
| `animate-infinite` | animation-iteration-count: infinite |
| `animate-once`     | animation-iteration-count: 1        |
| `animate-twice`    | animation-iteration-count: 2        |

### Direction

| Class                       | Property                               |
| --------------------------- | -------------------------------------- |
| `animate-normal`            | animation-direction: normal            |
| `animate-reverse`           | animation-direction: reverse           |
| `animate-alternate`         | animation-direction: alternate         |
| `animate-alternate-reverse` | animation-direction: alternate-reverse |

### Timing Function

| Class                 | Property                                                |
| --------------------- | ------------------------------------------------------- |
| `animate-ease-linear` | animation-timing-function: linear                       |
| `animate-ease-in`     | animation-timing-function: cubic-bezier(0.4, 0, 1, 1)   |
| `animate-ease-out`    | animation-timing-function: cubic-bezier(0, 0, 0.2, 1)   |
| `animate-ease-in-out` | animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1) |

### Fill Mode

| Class                    | Property                       |
| ------------------------ | ------------------------------ |
| `animate-fill-none`      | animation-fill-mode: normal    |
| `animate-fill-forwards`  | animation-fill-mode: forwards  |
| `animate-fill-backwards` | animation-fill-mode: backwards |
| `animate-fill-both`      | animation-fill-mode: both      |

### Play State

| Class             | Property                      |
| ----------------- | ----------------------------- |
| `animate-running` | animation-play-state: running |
| `animate-paused`  | animation-play-state: paused  |

### Backface Visibility State

| Class              | Property                     |
| ------------------ | ---------------------------- |
| `backface-visible` | backface-visibility: visible |
| `backface-hidden`  | backface-visibility: hidden  |

### Fade In and Out

Values are derived from the Tailwind CSS [opacity](https://tailwindcss.com/docs/opacity) e.g. _fade-in-50_ and _fade-out-20_. Arbitrary values such as _fade-in-[15]_ are also supported.

| Class              | Property                     |
| ------------------ | ---------------------------- |
| `fade-in-{value}`  | --p-enter-opacity: \{value\} |
| `fade-out-{value}` | --p-leave-opacity: \{value\} |

### Zoom In and Out

Values are derived from the Tailwind CSS [scale](https://tailwindcss.com/docs/scale) e.g. _zoom-in-50_ and _zoom-out-75_. Arbitrary values such as _zoom-in-[0.8]_ are also supported.

| Class              | Property                   |
| ------------------ | -------------------------- |
| `zoom-in-{value}`  | --p-enter-scale: \{value\} |
| `zoom-out-{value}` | --p-leave-scale: \{value\} |

### Spin In and Out

Values are derived from the Tailwind CSS [rotate](https://tailwindcss.com/docs/rotate) e.g. _spin-in-45_ and _spin-out-90_. Arbitrary values such as _spin-in-[60deg]_ are also supported.

| Class              | Property                    |
| ------------------ | --------------------------- |
| `spin-in-{value}`  | --p-enter-rotate: \{value\} |
| `spin-out-{value}` | --p-leave-rotate: \{value\} |

### Slide In and Out

Values are derived from the Tailwind CSS [translate](https://tailwindcss.com/docs/translate) e.g. _slide-in-from-t-50_ and _slide-out-to-l-8_. Arbitrary values such as _slide-in-from-b-[8px]_ are also supported.

| Class                     | Property                          |
| ------------------------- | --------------------------------- |
| `slide-in-from-t-{value}` | --p-enter-translate-y: -\{value\} |
| `slide-in-from-b-{value}` | --p-enter-translate-y: \{value\}  |
| `slide-in-from-l-{value}` | --p-enter-translate-x: -\{value\} |
| `slide-in-from-r-{value}` | --p-enter-translate-x: \{value\}  |
| `slide-out-to-t-{value}`  | --p-leave-translate-y: -\{value\} |
| `slide-out-to-b-{value}`  | --p-leave-translate-y: \{value\}  |
| `slide-out-to-l-{value}`  | --p-leave-translate-x: -\{value\} |
| `slide-out-to-r-{value}`  | --p-leave-translate-x: \{value\}  |


# Contribution Guide

Welcome to the PrimeReact Contribution Guide and thank you for considering contributing.


## Introduction

PrimeReact is a popular Vue UI library maintained by PrimeTek, a company renowned for its comprehensive set of UI components for various frameworks. PrimeTek is dedicated to providing high-quality, versatile, and accessible UI components
that help developers build better applications faster.

### Development Setup

To begin with, clone the PrimeReact repository from GitHub:

```bash
git clone https://github.com/primefaces/primereact.git
cd primereact
```

Then run the showcase in your local environment at `http://localhost:3000/`.

```bash
pnpm run setup
pnpm run dev
```

### Project Structure

PrimeReact utilizes a monorepo architecture, the libraries are located at `packages` folder and the website is at `apps/showcase`.

```bash
- apps
  - showcase                // website
- packages
  - core                    // core api
  - headless                // headless components
  - hooks                   // hooks for components
  - icons                   // primeicons
  - primereact              // main package of components and directives
  - styles                  // styles for components
  - types                   // types for components
```

## Help Needed

PrimeReact is a community-driven project backed by the expertise and sponsorship of PrimeTek, and we appreciate any help you can provide. Here are some areas where you can contribute:

### Issue Triage

Help us manage issues by;

- Reproducing reported bugs
- Clarifying issue descriptions
- Tagging issues with appropriate labels

### Sending Pull Requests

We encourage you to send pull requests, especially for issues tagged with the `help-needed` label.

### Community Support

Assist other users by participating in the issue tracker, [GitHub discussions](https://github.com/orgs/primefaces/discussions/categories/primereact), and the [PrimeLand Discord](https://discord.gg/primefaces) server. Your expertise can help others solve problems and improve their experience with PrimeReact.

## Key Points

PrimeReact has several add-ons such as UI Kit, Premium Templates, and Blocks that rely on design tokens and styling. Any core structural changes, such as adding new props, events, or updating design tokens, should be communicated with the
core team to ensure consistency and compatibility.

## Communication

Join the Contributors channel on the [PrimeLand Discord](https://discord.gg/primefaces) server to connect with PrimeReact staff and fellow contributors. In this channel, you can discuss the areas you want to
contribute to and receive feedback. This channel is open to everyone who'd like to contribute.

## Pathway

PrimeTek offers an organization structure involving contributors and the core team:

### Contributor Role

After a certain period of frequent contributions, a community member is offered the Contributor role. On average, it may take about three months, but the exact duration can vary depending on the individual commitment.

### Committer Role

If a contributor actively participates in the codebase and PRs, their role may be upgraded to a Committer level, providing direct commit access to the PrimeReact codebase.

### Employment

PrimeTek prefers to hire team members from open source committers, so you may be offered a full-time position when a position becomes available.

## Benefits

Contributing to PrimeReact comes with several benefits. Being part of an open-source project will enhance your career and open up exciting opportunities. Contributors and Committers will be listed on our [team page](/docs/team). You'll gain significant visibility in the developer community while improving yourself as a professional.

You'll be invited to a private communication channel at Discord to get in touch with PrimeTek. In addition, contributors have access to all PrimeReact add-ons like Premium Templates, Blocks, and UI Kit free of charge.

## CLA

When a community member is offered the Contributor role, they are expected to sign a Contributor License Agreement (CLA) for legal purposes. This helps protect both the contributor and PrimeTek.


# Introduction

Next-generation UI Component suite for React.


## Overview

PrimeReact is a complete UI suite for React consisting of a rich set of UI components, icons, blocks, and application templates. The project's primary goal is to boost developer productivity by offering reusable solutions that are easy to tune and customize as an in-house library.
The project has been created by [PrimeTek](https://www.primetek.com.tr) a world-renowned vendor of popular UI Component suites, including [PrimeFaces](https://primefaces.org),
[PrimeNG](https://primeng.org), [PrimeReact](https://primereact.org), and [PrimeVue](https://primevue.org). All the members in [our team](/team) are full time employees of PrimeTek who share the same passion and vision for open
source to create awesome UI libraries. Depending on a 3rd party library may introduce risks if the library maintainers decide not to work on the project, however, this is not the case with PrimeReact as the track record of PrimeTek shows.

## Theming (V10)

PrimeReact v10 can be styled in two modes: **styled** or **unstyled**.

### Styled Mode (Recommended)
- Uses pre-built CSS themes with consistent design
- Available themes: **Lara** (Light/Dark), **Material**, **Bootstrap**, **Arya**, **Saga**, **Vela**
- ⚠️ **Legacy themes** (Nova, Luna, Rhea) are deprecated in v10
- Simply import theme CSS: `import 'primereact/resources/themes/lara-light-cyan/theme.css';`

### Unstyled Mode
- Complete control over styling with no default styles
- Perfect for **Tailwind CSS**, Bootstrap, or custom CSS
- Enable per component: `<Button unstyled={true} />`
- Or globally: `PrimeReact.unstyled = true;`

### Available V10 Themes
```bash
# Modern themes (recommended)
lara-light-cyan, lara-light-blue, lara-dark-cyan, lara-dark-blue
material-light, material-dark
bootstrap4-light-blue, bootstrap4-dark-blue

# Legacy themes (deprecated)
nova-light, nova-dark, luna-amber, luna-blue, rhea
```

## Accessibility

PrimeReact has WCAG 2.1 AA level compliance; each component has a dedicated accessibility section to document several aspects, including keyboard and screen reader support. Through communication channels such as GitHub or Discord, numerous
accessibility experts worldwide continue to provide constant feedback to improve the accessibility features further. View the [accessibility guide](/guides/accessibility) to learn more.

## PassThrough

PassThrough is an innovative API to provide access to the internal DOM elements to add arbitrary attributes. In general, traditional UI component libraries encapsulate UI and logic with limited APIs that makes the developers dependant on
the library maintainer to extend this API by adding new props or events. With [Pass Through](/docs/passthrough) this limitation has been eliminated since, you'll be able to access the internal of the components to add
events and attributes. Some common use-cases are adding test attributes, additional aria attributes, custom events and styling.

## V10 Changes & Deprecations

### 🚨 Deprecated Components (Use Alternatives)
- **SlideMenu** → Use Drawer or Sidebar instead
- **FullCalendar** → Theme support removed, use external library

### ⚠️ Legacy Themes (Deprecated)
- Nova, Luna, Rhea themes → Migrate to Lara or Material themes

### ✅ New Features in V10
- Enhanced **PassThrough** support for better customization
- Improved **Tailwind CSS** integration
- Better **Accessibility** with WCAG 2.1 AA compliance
- **VirtualScroller** component for large datasets
- **Dock** component for macOS-like interface

## AddOns

PrimeReact does not require financial sponsorships from its community; instead, to be backed by a solid financial foundation, optional add-ons are offered. These include a Figma UI Kit, premium application templates, and reusable UI blocks
called PrimeBlocks. The add-ons are optional and there is no paywall when using PrimeReact.


# Setup

Installation guides for popular development environments.


## Guides

<DocDemoViewer name='gettingstarted:setup-demo' hideCode/>


# Accessibility

PrimeReact has WCAG 2.1 AA level compliance, refer to the accessibility documentation of each component for detailed information.


## Introduction

According to the World Health Organization, 15% of the world population has a disability to some degree. As a result, accessibility features in any context such as a ramp for wheelchair users or a multimedia with captions are crucial to ensure content can be consumed by anyone.

Types of disabilities are diverse so you need to know your audience well and how they interact with the content created. There four main categories;

### Visual Impairments

Blindness, low-level vision or color blindness are the common types of visual impairments. Screen magnifiers and the color blind mode are usually built-in features of the browsers whereas for people who rely on screen readers, page developers are required to make sure content is readable by the readers. Popular readers are NVDA , JAWS and ChromeVox .

### Hearing Impairments

Deafness or hearing loss refers to the inability to hear sounds totally or partially. People with hearing impairments use assistive devices however it may not be enough when interacting with a web page. Common implementation is providing textual alternatives, transcripts and captions for content with audio.

### Mobility Impairments

People with mobility impairments have disabilities related to movement due to loss of a limb, paralysis or other varying reasons. Assistive technologies like a head pointer is a device to interact with a screen whereas keyboard or a trackpad remain as solutions for people who are not able to utilize a mouse.

### Cognitive Impairments

Cognitive impairments have a wider range that includes people with learning disabilities, depression and dyslexia. A well designed content also leads to better user experience for people without disabilities so designing for cognitive impairments result in better design for any user.

## WCAG

Correct page structure with the aid of assistive technologies are the core ingridients for an accessible web content. HTML is based on an accessible foundation, form controls can be used by keyboard by default and semantic HTML is easier to be processed by a screen reader.

[WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) refers to **Web Content Accessibility Guideline**, a standard managed by the WAI (Web Accessibility Initiative) of W3C (World Wide Web Consortium). WCAG consists of recommendations for making the web content more accessible. PrimeReact components aim high level of WCAG compliancy in the near future.

Various countries around the globe have governmental policies regarding web accessibility as well. Most well known of these are Section 508 in the US and [Web Accessibility Directive](https://digital-strategy.ec.europa.eu/en/policies/web-accessibility) of the European Union.

## Form Controls

Native form elements should be preferred instead of elements that are meant for other purposes like presentation. As an example, button below is rendered as a form control by the browser, can receive focus via tabbing and can be used with space key as well to trigger.

```tsx
<button onClick={(event) => onButtonClick(event)}>Click</button>
```

On the other hand, a fancy css based button using a div has no keyboard or screen reader support.

```tsx
<div className="fancy-button" onClick={(event) => onButtonClick(event)}>
    Click
</div>
```

`tabIndex` is required to make a div element accessible in addition to use a keydown to bring the keyboard support back. To avoid the overload and implementing functionality that is already provided by the browser, native form controls should be preferred.

```tsx
<div className="fancy-button" onClick={(event) => onClick(event)} onKeyDown={(event) => onKeyDown(event)} tabIndex="0">
    Click
</div>
```

Form components must be related to another element that describes what the form element is used for. This is usually achieved with the `label` element.

```tsx
<label htmlFor="myinput">Username:</label>
<input id="myinput" type="text" name="username" />
```

## Semantic HTML

HTML offers various element to organize content on a web page that screen readers are aware of. Preferring Semantic HTML for good semantics provide out of the box support for reader which is not possible when regular `div` elements with classes are used. Consider the following example that do not mean too much for readers.

```tsx
<div className="header">
    <div className="header-text">Header</div>
</div>

<div className="nav"></div>

<div className="main">
    <div className="content">
    </div>

    <div className="sidebar">
    </div>
</div>

<div className="footer"></div>
```

Same layout can be achieved using the semantic elements with screen reader support built-in.

```tsx
<header>
    <h1>Header</h1>
</header>

<nav></nav>

<main>
    <article></article>

    <aside></aside>

</main>

<footer></footer>
```

## WAI ARIA

ARIA refers to "Accessible Rich Internet Applications" is a suite to fill the gap where semantic HTML is inadequate. These cases are mainly related to rich UI components/widgets. Although browser support for rich UI components such as a datepicker or colorpicker has been improved over the past years many web developers still utilize UI components derived from standard HTML elements created by them or by other projects like PrimeReact. These types of components must provide keyboard and screen reader support, the latter case is where the WAI-ARIA is utilized.

ARIA consists of roles, properties and attributes. **Roles** define what the element is mainly used for e.g. `checkbox`, `dialog`, `tablist` whereas **States** and **Properties** define the metadata of the element like `aria-checked`, `aria-disabled`.

Consider the following case of a native checkbox. It has built-in keyboard and screen reader support.

```tsx
<input type="checkbox" value="Prime" name="ui" checked />
```

A fancy checkbox with css animations might look more appealing but accessibility might be lacking. Checkbox below may display a checked font icon with animations however it is not tabbable, cannot be checked with space key and cannot be read by a reader.

```tsx
<div className="fancy-checkbox">{checked && <i className="checked-icon" />}</div>
```

One alternative is using ARIA roles for readers and use javascript for keyboard support. Notice the usage of `aria-labelledby` as a replacement of the `label` tag with `htmlFor`.

```tsx
<span id="chk-label">Remember Me</span>
<div className="fancy-checkbox" role="checkbox" aria-checked="false" tabIndex="0" aria-labelledby="chk-label"
    onClick={toggle} onKeyDown={(event) => onKeyDown(event)}>
    {checked && <i className="checked-icon" />}
</div>
```

However the best practice is combining semantic HTML for accessibility while keeping the design for UX. This approach involves hiding a native checkbox for accessibility and using javascript events to update its state. Notice the usage of `p-hidden-accessible` that hides the elements from the user but not from the screen reader.

```tsx
<label htmlFor="chkbox">Remember Me</label>
<div className="fancy-checkbox" onClick={toggle}>
    <input className="p-hidden-accessible" type="checkbox" id="chkbox" onFocus={updateParentVisuals} onBlur={updateParentVisuals}
        onKeyDown={(event) => onKeyDown(event)} />
    {checked && <i className="checked-icon" />}
</div>
```

A working sample is the PrimeReact checkbox that is tabbable, keyboard accessible and is compliant with a screen reader. Instead of ARIA roles it relies on a hidden native checkbox.

```tsx
import { Checkbox } from 'primereact/checkbox';

export default function AccessibilityCheckboxDemo() {
    return (
        <div className="card flex items-center justify-center">
            <label htmlFor="chkbox" className="mr-2">
                Remember Me
            </label>
            <Checkbox id="chkbox" />
        </div>
    );
}

```

## Colors

Colors on a web page should aim a contrast ratio of at least 4.5:1 and consider a selection of colors that do not cause vibration.

### Good Contrast

Color contrast between the background and the foreground content should be sufficient enough to ensure readability. Example below displays two cases with good and bad samples.

<div className="flex">
    <div className="h-32 w-32 flex justify-center items-center mr-8 font-bold bg-blue-600 rounded-lg">
        <span className="text-white">GOOD</span>
    </div>
    <div className="h-32 w-32 flex justify-center items-center mr-8 font-bold bg-blue-400 rounded-lg">
        <span className="text-white">BAD</span>
    </div>
</div>

### Vibration

Color vibration is leads to an illusion of motion due to choosing colors that have low visibility against each other. Color combinations need to be picked with caution to avoid vibration.

<div className="flex">
    <div className="h-32 w-32 flex justify-center items-center mr-8 font-bold bg-pink-500 rounded-lg">
        <span className="text-blue-500">VIBRATE</span>
    </div>
</div>

### Dark Mode

Highly saturated colors should be avoided when used within a dark design scheme as they cause eye strain. Instead desaturated colors should be preferred.

<div className="flex">
    <div className="h-32 w-32 flex flex-col justify-center items-center mr-8 font-bold bg-gray-900 rounded-lg">
        <span className="text-indigo-500">Indigo 500</span>
        <i className="text-indigo-500 pi pi-times-circle mt-4 text-xl" />
    </div>
    <div className="h-32 w-32 flex flex-col justify-center items-center mr-8 font-bold bg-gray-900 rounded-lg">
        <span className="text-indigo-200">Indigo 200</span>
        <i className="text-indigo-200 pi pi-check-circle mt-4 text-xl" />
    </div>
</div>


# RTL Support

Right-to-left direction support of PrimeReact.


## Configuration

The PrimeReact components natively support Right-to-Left (RTL) text direction through a modern CSS implementation utilizing FlexBox and classes like `*-inline-start` and `*-block-end`. Consequently, no JavaScript configuration is necessary; setting the document's text direction to RTL is sufficient to enable this feature.

The RTL setting can either be set using the `dir` attribute or with the `direction` style property.

### With Markup

```html
<html dir="rtl"></html>
```

### With CSS

```css
html {
    direction: rtl;
}
```

## Limitations

RTL is widely supported by the UI suite except the Galleria and Carousel components. These components will be enhanced with a modern implementation in upcoming versions with built-in support for RTL.


# Custom Icons

PrimeReact components can be used with any icon library using the templating features.


## Material

[Material icons](https://fonts.google.com/icons) is the official icon library based on Google Material Design.

```tsx
<Button>
    <span className="material-icons">arrow_drop_down</span>
</Button>
```

## FontAwesome

[Font Awesome](https://fontawesome.com/) is a popular icon library with a wide range of icons.

```tsx
<Button>
    <i className="fa-light fa-chevron-down"></i>
</Button>
```

## SVG

Inline SVGs are embedded inside the dom.

```tsx
<Button>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g id="chevron-down">
            <path d="M12,15.25a.74.74,0,0,1-.53-.22l-5-5A.75.75,0,0,1,7.53,9L12,13.44,16.47,9A.75.75,0,0,1,17.53,10l-5,5A.74.74,0,0,1,12,15.25Z" />
        </g>
    </svg>
</Button>
```

## Image

Any type of image can be used as an icon.

```tsx
<Button>
    <img alt="dropdown icon" src="/assets/icons/arrow_down.png">
</Button>
```


# Prime Icons

PrimeIcons is the default icon library of PrimeReact with over 250 open source icons developed by PrimeTek. PrimeIcons library is optional as PrimeReact components can use any icon with templating.


## Download

PrimeIcons is available at npm, run the following command to download it to your project.

```bash
npm install primeicons
```

## Import

CSS file of the icon library needs to be imported in `styles.css` of your application.

```css
@import 'primeicons/primeicons.css';
```

## Figma

PrimeIcons library is now available on [Figma Community](https://www.figma.com/community/file/1354343849355792252/primeicons). By adding them as a library, you can easily use these icons in your designs.

## Basic

PrimeIcons use the `pi pi-{icon}` syntax such as `pi pi-check`. A standalone icon can be displayed using an element such as `i` or `span`.

<div className="card flex justify-center gap-4">
    <i className="pi pi-check"></i>
    <i className="pi pi-times"></i>
    <span className="pi pi-search"></span>
    <span className="pi pi-user"></span>
</div>

```tsx
<i className="pi pi-check"></i>
<i className="pi pi-times"></i>
<span className="pi pi-search"></span>
<span className="pi pi-user"></span>
```

## Size

Size of an icon is controlled with the font-size property of the element.

<div className="card flex justify-center items-center gap-4">
    <i className="pi pi-check" style={{ fontSize: '1rem' }}></i>
    <i className="pi pi-times" style={{ fontSize: '1.5rem' }}></i>
    <i className="pi pi-search" style={{ fontSize: '2rem' }}></i>
    <i className="pi pi-user" style={{ fontSize: '2.5rem' }}></i>
</div>

```tsx
<i className="pi pi-check" style={{ fontSize: '1rem' }}></i>
<i className="pi pi-times" style={{ fontSize: '1.5rem' }}></i>
<i className="pi pi-search" style={{ fontSize: '2rem' }}></i>
<i className="pi pi-user" style={{ fontSize: '2.5rem' }}></i>
```

## Color

Icon color is defined with the `color` property which is inherited from parent by default.

<div className="card flex justify-center items-center gap-4">
    <i className="pi pi-check" style={{ color: 'slateblue' }}></i>
    <i className="pi pi-times" style={{ color: 'green' }}></i>
    <i className="pi pi-search" style={{ color: 'var(--p-primary-color)' }}></i>
    <i className="pi pi-user" style={{ color: '#708090' }}></i>
</div>

```tsx
<i className="pi pi-check" style={{ color: 'slateblue' }}></i>
<i className="pi pi-times" style={{ color: 'green' }}></i>
<i className="pi pi-search" style={{ color: 'var(--p-primary-color)' }}></i>
<i className="pi pi-user" style={{ color: '#708090' }}></i>
```

## Spin

Special `pi-spin` className applies infinite rotation to an icon.

<div className="card flex justify-center gap-4">
    <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
    <i className="pi pi-spin pi-cog" style={{ fontSize: '2rem' }}></i>
</div>

```tsx
<i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
<i className="pi pi-spin pi-cog" style={{ fontSize: '2rem' }}></i>
```

## List

Here is the full list of PrimeIcons. More icons will be added periodically and you may also [request new icons](https://github.com/primefaces/primeicons/issues) at the issue tracker.

```tsx
import { IconService } from '@/services/icon.service';
import { InputText } from 'primereact/inputtext';
import * as React from 'react';

interface IconItem {
    properties: {
        id: string;
        name: string;
    };
    icon: {
        tags: string[];
    };
}

export default function ListDemo() {
    const [icons, setIcons] = React.useState<IconItem[] | null>(null);
    const [filteredIcons, setFilteredIcons] = React.useState<IconItem[] | null>(null);

    React.useEffect(() => {
        IconService.getIcons().then((data) => {
            const d_data = data;
            const d_icons = d_data.filter((value: IconItem) => {
                return value.icon.tags.indexOf('deprecate') === -1;
            });

            d_icons.sort((icon1: IconItem, icon2: IconItem) => {
                if (icon1.properties.name < icon2.properties.name) return -1;
                else if (icon1.properties.name > icon2.properties.name) return 1;
                else return 0;
            });

            setIcons(d_icons);
            setFilteredIcons(d_icons);
        });
    }, []);

    const onFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!icons) {
            setFilteredIcons([]);
        }

        if (!event.target.value) {
            setFilteredIcons(icons);
        }

        if (event.target.value && icons) {
            const sanitizedInput = event.target.value.replace(/[^\w\s]/gi, '').replace(/\s/g, '');

            const newFilteredIcons = icons.filter((icon) => {
                return (
                    icon.icon.tags.some((tag) =>
                        tag
                            .replace(/[^\w\s]/gi, '')
                            .replace(/\s/g, '')
                            .includes(sanitizedInput.toLowerCase())
                    ) ||
                    icon.properties.name
                        .replace(/[^\w\s]/gi, '')
                        .replace(/\s/g, '')
                        .toLowerCase()
                        .includes(sanitizedInput.toLowerCase())
                );
            });

            setFilteredIcons(newFilteredIcons);
        }
    };

    return (
        <div>
            <InputText onChange={onFilter} className="w-full p-4 mt-4 mb-6" placeholder="Search an icon" />

            <div className="card">
                <div className="grid grid-cols-12 gap-4 text-center">
                    {filteredIcons?.map((icon) => (
                        <div key={icon.properties.name} className="col-span-12 md:col-span-2 mb-8">
                            <i className={`text-2xl mb-4 text-surface-500 dark:text-surface-400 pi pi-${icon.properties.name}`}></i>
                            <div>pi-{icon.properties.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

```


# With Next.js

Setting up PrimeReact in a Next.js project.


## Working Example

<DocLinkCard href='https://github.com/primefaces/primereact-examples/tree/main/nextjs-quickstart-nextgen'>
    <span className='text-2xl font-semibold'>Quickstart your project with our PrimeReact + Next.js template</span>
    <div>Use this Next.js template pre-configured with PrimeReact to quickly start building your app with ready-to-use UI components and styles.</div>
    <div className='flex items-center gap-2 text-surface-500 dark:text-surface-400'>
        <i className='pi pi-github opacity-75' />
        <span>github.com/primefaces/primereact-examples</span>
    </div>
</DocLinkCard>

## Installation

<DocStepper>
    <DocStep>

### Install Packages

Install PrimeReact and a theme package using your favorite package manager:

```bash
npm install primereact@^10.0.0
```

    </DocStep>
    <DocStep>

### PrimeReactProvider

Create a `prime-ssr-provider.tsx` file in the root of your project and add the following code:

```tsx showLineNumbers
'use client';
import { PrimeReactProvider, PrimeReactStyleSheet } from '@primereact/core';
import { useServerInsertedHTML } from 'next/navigation';
import * as React from 'react';
import Aura from '@primeuix/themes/aura';

const styledStyleSheet = new PrimeReactStyleSheet();

export default function PrimeSSRProvider({
    children
}: Readonly<{
    children?: React.ReactNode;
}>) {
    useServerInsertedHTML(() => {
        const styleElements = styledStyleSheet.getAllElements();

        styledStyleSheet.clear();

        return <>{styleElements}</>;
    });

    const primereact = {
        theme: {
            preset: Aura
        }
    };

    return (
        <PrimeReactProvider {...primereact} stylesheet={styledStyleSheet}>
            {children}
        </PrimeReactProvider>
    );
}
```

    </DocStep>
    <DocStep>

### Add SSRProvider

Import the `PrimeSSRProvider` in your root `layout.tsx` file and wrap your app with it.

```tsx showLineNumbers {2,12}
...
import PrimeSSRProvider from './prime-ssr-provider';

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <PrimeSSRProvider>{children}</PrimeSSRProvider>
            </body>
        </html>
    );
}
```

    </DocStep>
    <DocStep>
     ### Verify

To verify that PrimeReact is installed correctly, you can create a simple component such as <Link href="/button">Button</Link> and render it in your application.
Each component can be imported and registered individually so that you only include what you use for bundle optimization. Import path is available in the documentation of the corresponding component.

```tsx
import { Button } from 'primereact/button';

export default function VerifyDemo() {
    return (
        <div className="card flex justify-center">
            <Button>Verify</Button>
        </div>
    );
}

```

```tsx showLineNumbers {1,6}
import { Button } from 'primereact/button';

export default function VerifyInstallation() {
    return (
        <div className="card flex justify-center">
            <Button>Verify</Button>
        </div>
    );
}
```

    </DocStep>

</DocStepper>

## More Tips

- You can import and use only the components you need for a smaller bundle size.
- For icons, custom themes, and advanced setup, see the [PrimeReact v10 documentation](https://v10.primereact.org/setup).

## Troubleshooting

If you encounter issues during installation or setup, check the following:

- Ensure that you have the latest version of Vite and Node.js installed.
- Verify that your project structure is correct and that the `PrimeReactProvider` is properly wrapped around your application.
- Check the browser console for any errors related to PrimeReact components or themes.
- If you are using TypeScript, ensure that you have the necessary type definitions installed.
- Refer to the [PrimeReact GitHub repository](https://github.com/primefaces/primereact) for more information and support.


# With Vite

Setting up PrimeReact in a Vite project.


## Working Example

<DocLinkCard href='https://github.com/primefaces/primereact-examples/tree/main/vite-quickstart-nextgen'>
    <span className='text-2xl font-semibold'>Quickstart your project with our PrimeReact + Vite template</span>
    <div>Use this Vite template pre-configured with PrimeReact to quickly start building your app with ready-to-use UI components and styles.</div>
    <div className='flex items-center gap-2 text-surface-500 dark:text-surface-400'>
        <i className='pi pi-github opacity-75' />
        <span>github.com/primefaces/primereact-examples</span>
    </div>
</DocLinkCard>

## Installation

<DocStepper>
    <DocStep>

### Install Packages

Install PrimeReact and a theme package using your favorite package manager:

```bash
npm install primereact@^10.0.0
```

    </DocStep>
    <DocStep>

### PrimeReactProvider

Wrap your app with `PrimeReactProvider` in your main file (like `main.tsx` or `App.tsx`). This enables PrimeReact features everywhere in your app:

```tsx showLineNumbers {5,11-13}
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrimeReactProvider } from "@primereact/core";

...

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
        <App />
    </PrimeReactProvider>
  </StrictMode>,
)
```

    </DocStep>
    <DocStep>

### Theme

PrimeReact supports many themes. To use the Aura theme, import it and pass it to the provider:

```tsx showLineNumbers {1,7-9,13}
import Aura from '@primeuix/themes/aura';
import { PrimeReactProvider } from '@primereact/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const theme = {
    preset: Aura
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <PrimeReactProvider theme={theme}>
            <App />
        </PrimeReactProvider>
    </React.StrictMode>
);
```

    </DocStep>
    <DocStep>

### Verify

To verify that PrimeReact is installed correctly, you can create a simple component such as [Button](/button) and render it in your application.
Each component can be imported and registered individually so that you only include what you use for bundle optimization. Import path is available in the documentation of the corresponding component.

```tsx
import { Button } from 'primereact/button';

export default function VerifyDemo() {
    return (
        <div className="card flex justify-center">
            <Button>Verify</Button>
        </div>
    );
}

```

```tsx showLineNumbers {1,6}
import { Button } from 'primereact/button';

export default function VerifyInstallation() {
    return (
        <div className="card flex justify-center">
            <Button>Verify</Button>
        </div>
    );
}
```

    </DocStep>

</DocStepper>

## More Tips

- You can import and use only the components you need for a smaller bundle size.
- For icons, custom themes, and advanced setup, see the [PrimeReact v10 documentation](https://v10.primereact.org/setup).

## Troubleshooting

If you encounter issues during installation or setup, check the following:

- Ensure that you have the latest version of Vite and Node.js installed.
- Verify that your project structure is correct and that the `PrimeReactProvider` is properly wrapped around your application.
- Check the browser console for any errors related to PrimeReact components or themes.
- If you are using TypeScript, ensure that you have the necessary type definitions installed.
- Refer to the [PrimeReact GitHub repository](https://github.com/primefaces/primereact) for more information and support.


# Styled Mode

Choose from a variety of pre-styled themes or develop your own.


## Architecture

PrimeReact is a design agnostic library so unlike some other UI libraries it does not enforce a certain styling such as material design. Styling is decoupled from the components using the themes instead. A theme consists of two parts; _base_ and _preset_. The base is the style rules with CSS variables as placeholders whereas the preset is a set of design tokens to feed a base by mapping the tokens to CSS variables. A base may be configured with different presets,
currently Aura, Material, Lara and Nora are the available built-in options.

![Architecture](https://primefaces.org/cdn/primevue/images/primevue-v4-styled-architecture.png)

The core of the styled mode architecture is based on a concept named _design token_, a preset defines the token configuration in 3 tiers; _primitive_, _semantic_ and _component_.

### Primitive Tokens

Primitive tokens have no context, a color palette is a good example for a primitive token such as `blue-50` to `blue-900`. A token named `blue-500` may be used as the primary color, the background of a message however on its own, the name of the token does not indicate context. Usually they are utilized by the semantic tokens.

### Semantic Tokens

Semantic tokens define content and their names indicate where they are utilized, a well known example of a semantic token is the `primary.color`. Semantic tokens map to primitive tokens or other semantic tokens. The `colorScheme` token group is a special variable to define tokens based on the color scheme active in the application, this allows defining different tokens based on the color scheme like dark mode.

### Component Tokens

Component tokens are isolated tokens per component such as `inputtext.background` or `button.color` that map to the semantic tokens. As an example, `button.background` component token maps to the `primary.color` semantic token which maps to the `green.500` primitive token.

### Best Practices

Use primitive tokens when defining the core color palette and semantic tokens to specify the common design elements such as focus ring, primary colors and surfaces. Components tokens should only be used when customizing a specific
component. By defining your own design tokens as a custom preset, you'll be able to define your own style without touching CSS. Overriding the PrimeReact components using style classes is not a best practice and should be the last resort,
design tokens are the suggested approach.

## Configuration API

### Theme

The `theme` property is used to customize the initial theme.

### Options

The `options` property defines the how the CSS would be generated from the design tokens of the preset.

#### prefix

The prefix of the CSS variables, defaults to `p`. For instance, the `primary.color` design token would be `var(--p-primary-color)`.

```tsx
options: {
    prefix: 'my';
}
```

#### darkModeSelector

The CSS rule to encapsulate the CSS variables of the dark mode, the default is the `system` to generate `@media (prefers-color-scheme: dark)`. If you need to make the dark mode toggleable based on the user selection define a
class selector such as `.app-dark` and toggle this class at the document root. See the dark mode toggle section for an example.

```tsx
options: {
    darkModeSelector: '.my-app-dark';
}
```

#### cssLayer

Defines whether the styles should be defined inside a [CSS layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) by default or not. A CSS layer would be handy to declare a
custom cascade layer for easier customization if necessary. The default is `false`.

```tsx
options: {
    cssLayer: {
        name: 'primereact',
        order: 'app-styles, primereact, another-css-library'
    }
}
```

### Presets

Aura, Material, Lara and Nora are the available built-in options, created to demonstrate the power of the design-agnostic theming. Aura is PrimeTek's own vision, Material follows Google Material Design v2, Lara is based on Bootstrap and
Nora is inspired by enterprise applications. Visit the [source code](https://github.com/primefaces/primeuix/tree/main/packages/themes/src/presets)
to learn more about the structure of presets. You may use them out of the box with modifications or utilize them as reference in case you need to build your own presets from scratch.

### Reserved Keys

Following keys are reserved in the preset scheme and cannot be used as a token name; `primitive`, `semantic`, `components`, `directives`, `colorscheme`, `light`, `dark`, `common`, `root`, `states`, and `extend`.

### Colors

Color palette of a preset is defined by the `primitive` design token group. You can access colors using CSS variables or the `$dt` utility.

```tsx
// With CSS
var(--p-blue-500)

// With JS
$dt('blue.500').value
```

```tsx
export default function ColorsListDemo() {
    const colors = ['emerald', 'green', 'lime', 'red', 'orange', 'amber', 'yellow', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone'];
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    return (
        <div className="card">
            <ul className="p-0 m-0 list-none flex sm:flex-col gap-4 flex-wrap sm:flex-nowrap">
                {colors.map((color, i) => (
                    <li key={i} className="flex-auto" style={{ minWidth: '6rem' }}>
                        <span className="font-medium capitalize block mb-2 text-center sm:text-left">{color}</span>
                        <div className="flex gap-4 flex-auto flex-col sm:flex-row">
                            {shades.map((shade, j) => (
                                <div key={j} className="flex flex-col items-center gap-1 flex-1">
                                    <div className="rounded h-8 w-full" style={{ backgroundColor: `var(--p-${color}-${shade})` }}></div>
                                    <span className="text-sm text-surface-500 dark:text-surface-400 font-medium">{shade}</span>
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

```

## Dark Mode

PrimeReact uses the `system` as the default `darkModeSelector` in theme configuration. If you have a dark mode switch in your application, set the `darkModeSelector` to the selector you utilize such as `.my-app-dark` so that PrimeReact can fit in
seamlessly with your color scheme.

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PrimeReactProvider } from '@primereact/core';
import Aura from '@primeuix/themes/aura';

const primereact = {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark'
        }
    }
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PrimeReactProvider {...primereact}>
            <App />
        </PrimeReactProvider>
    </StrictMode>
);
```

Following is a very basic example implementation of a dark mode switch, you may extend it further by involving `prefers-color-scheme` to retrieve it from the system initially and use `localStorage` to make it stateful. See this [article](https://dev.to/abbeyperini/dark-mode-toggle-and-prefers-color-scheme-4f3m) for more information.

```tsx
<Button label="Toggle Dark Mode" onClick={toggleDarkMode} />
```

```tsx
const toggleDarkMode = () => {
    document.documentElement.classList.toggle('my-app-dark');
};
```

In case you prefer to use dark mode all the time, apply the `darkModeSelector` initially and never change it.

```tsx
<html className="my-app-dark">
```

It is also possible to disable dark mode completely using `false` or `none` as the value of the selector.

```tsx
theme: {
    preset: Aura,
    options: {
        darkModeSelector: false || 'none',
    }
}
```

## Customization

### definePreset

The `definePreset` utility is used to customize an existing preset during the PrimeReact setup. The first parameter is the preset to customize and the second is the design tokens to override.

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PrimeReactProvider } from '@primereact/core';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
    //Your customizations, see the following sections for examples
});

const primereact = {
    theme: {
        preset: MyPreset
    }
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PrimeReactProvider {...primereact}>
            <App />
        </PrimeReactProvider>
    </StrictMode>
);
```

### Primary

The `primary` defines the main color palette, default value maps to the `emerald` primitive token. Let's setup to use `indigo` instead.

```tsx
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        }
    }
});
```

### Surface

The color scheme palette that varies between light and dark modes is specified with the surface tokens. Example below uses `zinc` for light mode and `slategray` for dark mode. With this setting, light mode, would have a
grayscale tone and dark mode would include bluish tone.

```tsx
const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{slate.400}',
                    500: '{slate.500}',
                    600: '{slate.600}',
                    700: '{slate.700}',
                    800: '{slate.800}',
                    900: '{slate.900}',
                    950: '{slate.950}'
                }
            }
        }
    }
});
```

### Noir

The `noir` mode is the nickname of a variant that uses surface tones as the primary and requires and additional `colorScheme` configuration to implement. A sample preset configuration with black and white variants as the primary
color;

```tsx
const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{zinc.50}',
            100: '{zinc.100}',
            200: '{zinc.200}',
            300: '{zinc.300}',
            400: '{zinc.400}',
            500: '{zinc.500}',
            600: '{zinc.600}',
            700: '{zinc.700}',
            800: '{zinc.800}',
            900: '{zinc.900}',
            950: '{zinc.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{zinc.950}',
                    inverseColor: '#ffffff',
                    hoverColor: '{zinc.900}',
                    activeColor: '{zinc.800}'
                },
                highlight: {
                    background: '{zinc.950}',
                    focusBackground: '{zinc.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }
            },
            dark: {
                primary: {
                    color: '{zinc.50}',
                    inverseColor: '{zinc.950}',
                    hoverColor: '{zinc.100}',
                    activeColor: '{zinc.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            }
        }
    }
});
```

### Font

There is no design for fonts as UI components inherit their font settings from the application.

### Forms

The design tokens of the form input components are derived from the `form.field` token group. This customization example changes border color to primary on hover. Any component that depends on this semantic token such as
`dropdown.hover.border.color` and `textarea.hover.border.color` would receive the change.

```tsx
const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                formField: {
                    hoverBorderColor: '{primary.color}'
                }
            },
            dark: {
                formField: {
                    hoverBorderColor: '{primary.color}'
                }
            }
        }
    }
});
```

### Focus Ring

Focus ring defines the outline width, style, color and offset. Let's use a thicker ring with the primary color for the outline.

```tsx
const MyPreset = definePreset(Aura, {
    semantic: {
        focusRing: {
            width: '2px',
            style: 'dashed',
            color: '{primary.color}',
            offset: '1px'
        }
    }
});
```

### Component

The design tokens of a specific component is defined at `components` layer. Overriding components tokens is not the recommended approach if you are building your own style, building your own preset should be preferred instead. This
configuration is global and applies to all card components, in case you need to customize a particular component on a page locally, view the Scoped CSS section for an example.

```tsx
const MyPreset = definePreset(Aura, {
    components: {
        card: {
            colorScheme: {
                light: {
                    root: {
                        background: '{surface.0}',
                        color: '{surface.700}'
                    },
                    subtitle: {
                        color: '{surface.500}'
                    }
                },
                dark: {
                    root: {
                        background: '{surface.900}',
                        color: '{surface.0}'
                    },
                    subtitle: {
                        color: '{surface.400}'
                    }
                }
            }
        }
    }
});
```

### Extend

The theming system can be extended by adding custom design tokens and additional styles. This feature provides a high degree of customization, allowing you to adjust styles according to your needs, as you are not limited to the default tokens.

The example preset configuration adds a new `accent` button with custom `button.accent.color` and `button.accent.inverse.color` tokens. It is also possible to add tokens globally to share them within the components.

```tsx
const MyPreset = definePreset(Aura, {
    components: {
        // custom button tokens and additional style
        button: {
            extend: {
                accent: {
                    color: '#f59e0b',
                    inverseColor: '#ffffff'
                }
            }
        css: ({ dt }) => \`
.p-button-accent {
    background: \${dt('button.accent.color')};
    color: \${dt('button.accent.inverse.color')};
    transition-duration: \${dt('my.transition.fast')};
}
\`
        }
    },
    // common tokens and styles
    extend: {
        my: {
            transition: {
                slow: '0.75s'
                normal: '0.5s'
                fast: '0.25s'
            },
            imageDisplay: 'block'
        }
    },
    css: ({ dt }) => \`
        /* Global CSS */
        img {
            display: \${dt('my.image.display')};
        }
    \`
});
```

## Scoped Tokens

Design tokens can be scoped to a certain component using the `dt` property. In this example, first switch uses the global tokens whereas second one overrides the global with its own tokens.

```tsx
import { Switch } from 'primereact/switch';

export default function ScopedTokensDemo() {
    const amberSwitch = {
        handle: {
            borderRadius: '4px'
        },
        colorScheme: {
            light: {
                root: {
                    checkedBackground: '{amber.500}',
                    checkedHoverBackground: '{amber.600}',
                    borderRadius: '4px'
                },
                handle: {
                    checkedBackground: '{amber.50}',
                    checkedHoverBackground: '{amber.100}'
                }
            },
            dark: {
                root: {
                    checkedBackground: '{amber.400}',
                    checkedHoverBackground: '{amber.300}',
                    borderRadius: '4px'
                },
                handle: {
                    checkedBackground: '{amber.900}',
                    checkedHoverBackground: '{amber.800}'
                }
            }
        }
    };

    return (
        <div className="card flex justify-center gap-4">
            <Switch defaultChecked>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
            </Switch>
            <Switch defaultChecked dt={amberSwitch}>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
            </Switch>
        </div>
    );
}

```

## Utils

### usePreset

Replaces the current presets entirely, common use case is changing the preset dynamically at runtime.

```tsx
import { usePreset } from '@primeuix/themes';

const onButtonClick() {
    usePreset(MyPreset);
}
```

### updatePreset

Merges the provided tokens to the current preset, an example would be changing the primary color palette dynamically.

```tsx
import { updatePreset } from '@primeuix/themes';

const changePrimaryColor() {
    updatePreset({
        semantic: {
            primary: {
                50: '{indigo.50}',
                100: '{indigo.100}',
                200: '{indigo.200}',
                300: '{indigo.300}',
                400: '{indigo.400}',
                500: '{indigo.500}',
                600: '{indigo.600}',
                700: '{indigo.700}',
                800: '{indigo.800}',
                900: '{indigo.900}',
                950: '{indigo.950}'
            }
        }
    })
}
```

### updatePrimaryPalette

Updates the primary colors, this is a shorthand to do the same update using `updatePreset`.

```tsx
import { updatePrimaryPalette } from '@primeuix/themes';

const changePrimaryColor() {
    updatePrimaryPalette({
        50: '{indigo.50}',
        100: '{indigo.100}',
        200: '{indigo.200}',
        300: '{indigo.300}',
        400: '{indigo.400}',
        500: '{indigo.500}',
        600: '{indigo.600}',
        700: '{indigo.700}',
        800: '{indigo.800}',
        900: '{indigo.900}',
        950: '{indigo.950}'
    });
}
```

### updateSurfacePalette

Updates the surface colors, this is a shorthand to do the same update using `updatePreset`.

```tsx
import { updateSurfacePalette } from '@primeuix/themes';

const changeSurfaces() {
    //changes surfaces both in light and dark mode
    updateSurfacePalette({
        50: '{zinc.50}',
        // ...
        950: '{zinc.950}'
    });
}

const changeLightSurfaces() {
    //changes surfaces only in light
    updateSurfacePalette({
        light: {
            50: '{zinc.50}',
            // ...
            950: '{zinc.950}'
        }
    });
}

const changeDarkSurfaces() {
    //changes surfaces only in dark mode
    updateSurfacePalette({
        dark: {
            50: '{zinc.50}',
            // ...
            950: '{zinc.950}'
        }
    });
}
```

### $dt

The `$dt` function returns the information about a token like the full path and value. This would be useful if you need to access tokens programmatically.

```tsx
import { $dt } from '@primeuix/themes';

const duration = $dt('transition.duration');
/*
    duration: {
        name: '--transition-duration',
        variable: 'var(--p-transition-duration)',
        value: '0.2s'
    }
*/

const primaryColor = $dt('primary.color');
/*
    primaryColor: {
        name: '--primary-color',
        variable: 'var(--p-primary-color)',
        value: {
        light: {
            value: '#10b981',
            paths: {
                name: 'semantic.primary.color',
                binding: {
                    name: 'primitive.emerald.500'
                }
            }
        },
        dark: {
            value: '#34d399',
            paths: {
                name: 'semantic.primary.color',
                binding: {
                    name: 'primitive.emerald.400'
                }
            }
        }
    }
}
*/
```

### palette

Returns shades and tints of a given color from 50 to 950 as an object.

```tsx
import { palette } from '@primeuix/themes';

// custom color
const values1 = palette('#10b981');

// copy an existing token set
const primaryColor = palette('{blue}');
```

## CSS Layer

The PrimeReact CSS layer only applies to styled mode when layering is enabled explicitly at theme configuration, in unstyled mode the built-in CSS classes are not included and as a result no layer is necessary.

### Specificity

The `@layer` is a standard CSS feature to define cascade layers for a customizable order of precedence. If you need to become more familiar with layers, visit the documentation at [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) to begin with.

The `cssLayer` is disabled by default, when it is enabled at theme configuration, PrimeReact wraps the built-in style classes under the `primereact` cascade layer to make the library styles easy to override. CSS in your app without a layer has the
highest CSS specificity, so you'll be able to override styles regardless of the location or how strong a class is written.

Layers also make it easier to use CSS Modules, view the CSS Modules guide for examples.

### Reset

In case PrimeReact components have visual issues in your application, a Reset CSS may be the culprit. CSS layers would be an efficient solution that involves enabling the PrimeReact layer, wrapping the Reset CSS in another layer and defining the
layer order. This way, your Reset CSS does not get in the way of PrimeReact components.

```css
/* Order */
@layer reset, primereact;

/* Reset CSS */
@layer reset {
    button,
    input {
        /* CSS to Reset */
    }
}
```

## CSS Modules

[CSS modules](https://github.com/css-modules/css-modules) are supported by enabling the `module` property on a style element within your SFC. Use the `$style` keyword to apply classes to a PrimeReact component. It is recommend to enable
`cssLayer` when using CSS modules so that the PrimeReact styles have low CSS specificity.

```tsx
import * as React from 'react';
import { InputText } from 'primereact/inputtext';
import styles from './css-modules-demo.module.css';

export default function CSSModulesDemo() {
    return (
        <div className="card flex justify-center">
            <InputText className={styles.myinput} placeholder="Search" />
        </div>
    );
}

```

```css
.myinput {
    border-radius: 2rem;
    padding: 1rem 2rem;
    border-width: 2px;
}
```

## Scale

PrimeReact UI component use `rem` units, 1rem equals to the font size of the `html` element which is `16px` by default. Use the root font-size to adjust the size of the components globally. This website uses `14px` as the base
so it may differ from your application if your base font size is different.

```css
html {
    font-size: 14px;
}
```


# Unstyled Mode

Build fully customizable components with complete control over styling by disabling default themes and implementing your own design system.


## Architecture

The term `unstyled` is used to define an alternative styling approach instead of the default theming with design tokens. In unstyled mode the css variables of the design tokens and the css rule sets that utilize them are not
included. Here is an example of an Unstyled Checkbox, the core functionality and accessibility is provided whereas styling is not included. Unstyled components still need to be styled on your end, in the next sections, we'll cover the
styling solutions for both modes.

```tsx
import { Checkbox } from 'primereact/checkbox';

export default function CheckboxDemo() {
    return (
        <div className="card flex items-center justify-center">
            <div className="flex items-center gap-2">
                <Checkbox unstyled />
            </div>
        </div>
    );
}

```

## Setup

Unstyled mode is enabled for the whole suite by enabling `unstyled` option during PrimeReact installation.

```tsx showLineNumbers
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PrimeReactProvider } from '@primereact/core';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PrimeReactProvider unstyled={true}>
            <App />
        </PrimeReactProvider>
    </StrictMode>
);
```

Alternatively even in the default styled mode, a particular component can still be used as unstyled by adding the `unstyled` prop of the component.

```tsx
import { Button } from 'primereact/button';

export default function AlternativeButtonDemo() {
    return (
        <div className="card flex justify-center">
            <Button unstyled>
                Check
                <i className="pi pi-check" />
            </Button>
        </div>
    );
}

```

## Example

Here is a sample that styles a button component with Tailwind CSS using [passthrough](/docs/passthrough) attributes. Before beginning, head over to the the pass through section at
[button](/docs/button) documentation to learn more about the components internals section. We'll be using the `root` element to add a custom style.

```tsx
import { Button } from 'primereact/button';

export default function ButtonDemo() {
    return (
        <div className="card flex justify-center">
            <Button unstyled pt-root-className="bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2 text-white text-lg font-bold">
                Search
                <i className="pi pi-search !text-lg !font-bold" />
            </Button>
        </div>
    );
}

```

## Global

A global configuration can be created at application level to avoid repetition via the global `pt` option so that the styles can be shared from a single location. A particular component can still override a global configuration with
its own `pt` property.

```tsx showLineNumbers
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PrimeReactProvider } from '@primereact/core';

const globalPT = {
    button: {
        root: "bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2 text-white text-lg font-bold"
    }
    panel: {
        header: 'bg-primary text-primary-contrast border-primary',
        content: 'border-primary text-lg text-primary-700',
        title: 'bg-primary text-primary-contrast text-xl'
    }
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PrimeReactProvider pt={globalPT}>
            <App />
        </PrimeReactProvider>
    </StrictMode>
);
```


# Accordion API

API documentation for Accordion component


## Accordion

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: AccordionInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: AccordionInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<AccordionPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: AccordionInstance) => ReactNode) | null | The children to render. |
| lazy | boolean | false | When enabled, hidden tabs are not rendered at all. Defaults to false that hides tabs with css. |
| tabIndex | number | 0 | Index of the element in tabbing order. |
| defaultValue | string \\| number \\| (string \\| number)[] | null | Default value of the active panel or an array of values in multiple mode. |
| value | string \\| number \\| (string \\| number)[] | null | Value of the active panel or an array of values in multiple mode. |
| multiple | boolean | false | When enabled, multiple tabs can be activated at the same time. |
| selectOnFocus | boolean | false | When enabled, the accordion will be selected on focus. |
| onValueChange | (event: useAccordionChangeEvent) => void | null | Callback fired when the accordion's value changes. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | string \\| number \\| (string \\| number)[] | null | Value of the active panel or an array of values in multiple mode. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useAccordionState | null | The state of the useAccordion. |
| updateValue | (key: string \\| number) => void | null | The method to update the value of the active panel. |
| isItemActive | (key: string \\| number) => boolean | null | The method to check if the panel is active. |
| onHeaderClick | (event: MouseEvent<HTMLButtonElement>, value: string \\| number) => void | null | The method to handle the click event of the accordion header. |
| onHeaderFocus | (event: FocusEvent<HTMLButtonElement>, value: string \\| number) => void | null | The method to handle the focus event of the accordion header. |
| onHeaderKeyDown | (event: KeyboardEvent<HTMLButtonElement>, value: string \\| number) => void | null | The method to handle the key down event of the accordion header. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Accordion component. | [object Object],[object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Avatar component. | [object Object] |


## AccordionPanel

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: AccordionPanelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: AccordionPanelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<AccordionPanelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: AccordionPanelInstance) => ReactNode) | null | The children to render. |
| value | string \\| number | null | Unique value of item. |
| disabled | boolean | false | Whether the item is disabled. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| accordion | AccordionInstance | null | The Accordion component instance. |
| active | boolean | null | Whether the item is active. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of AccordionPanel component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of AccordionPanel component. | [object Object] |


## AccordionHeader

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: AccordionHeaderInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: AccordionHeaderInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<AccordionHeaderPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: AccordionHeaderInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| accordion | AccordionInstance | null | The Accordion component instance. |
| accordionpanel | AccordionPanelInstance | null | The AccordionPanel component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of AccordionHeader component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of AccordionHeader component. | [object Object] |


## AccordionHeaderIndicator

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: AccordionHeaderIndicatorInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: AccordionHeaderIndicatorInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<AccordionHeaderIndicatorPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: AccordionHeaderIndicatorInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| accordion | AccordionInstance | null | The Accordion component instance. |
| accordionpanel | AccordionPanelInstance | null | The AccordionPanel component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of AccordionHeaderIndicator component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of AccordionHeaderIndicator component. | [object Object] |


## AccordionContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: AccordionContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: AccordionContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<AccordionContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: AccordionContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| accordion | AccordionInstance | null | The Accordion component instance. |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of AccordionContent component. | [object Object] |



# Accordion

Accordion groups a collection of contents in panels.


## Usage

```tsx
import { Accordion } from 'primereact/accordion';
```

```tsx
<Accordion>
    <Accordion.Panel value="1">
        <Accordion.Header>
            Title
            <Accordion.HeaderIndicator />
        </Accordion.Header>
        <Accordion.Content>Content</Accordion.Content>
    </Accordion.Panel>
</Accordion>
```

## Examples

### Basic

Accordion is defined using `Accordion`, `Accordion.Panel`, `Accordion.Header`, `Accordion.HeaderIndicator` and `Accordion.Content` components. Each `Accordion.Panel` must contain a unique `value` property to specify the active item.

```tsx
import { Accordion } from 'primereact/accordion';

export default function BasicDemo() {
    return (
        <div className="card">
            <Accordion className="max-w-md mx-auto">
                <Accordion.Panel value="1">
                    <Accordion.Header>
                        What is this service about?
                        <Accordion.HeaderIndicator />
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>This service helps you manage your projects more efficiently by offering real-time collaboration, task tracking, and powerful analytics. Whether you’re working solo or in a team, it’s built to scale with your needs.</p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel value="2">
                    <Accordion.Header>
                        Is my data secure?
                        <Accordion.HeaderIndicator />
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>Yes. We use end-to-end encryption and follow industry best practices to ensure your data is protected. Your information is stored on secure servers and regularly backed up.</p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel value="3">
                    <Accordion.Header>
                        Can I upgrade or downgrade my plan later?
                        <Accordion.HeaderIndicator />
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>Absolutely. You can change your subscription plan at any time from your account settings. Changes take effect immediately, and any billing adjustments are handled automatically.</p>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    );
}

```

### Multiple

Only one tab at a time can be active by default, enabling `multiple` property changes this behavior to allow multiple panels. In this case `multiple` needs to be an array.

```tsx
import { Accordion } from 'primereact/accordion';

export default function MultipleDemo() {
    return (
        <div className="card">
            <Accordion multiple className="max-w-md mx-auto">
                <Accordion.Panel value="1">
                    <Accordion.Header>
                        What is this service about?
                        <Accordion.HeaderIndicator />
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>This service helps you manage your projects more efficiently by offering real-time collaboration, task tracking, and powerful analytics. Whether you’re working solo or in a team, it’s built to scale with your needs.</p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel value="2">
                    <Accordion.Header>
                        Is my data secure?
                        <Accordion.HeaderIndicator />
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>Yes. We use end-to-end encryption and follow industry best practices to ensure your data is protected. Your information is stored on secure servers and regularly backed up.</p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel value="3">
                    <Accordion.Header>
                        Can I upgrade or downgrade my plan later?
                        <Accordion.HeaderIndicator />
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>Absolutely. You can change your subscription plan at any time from your account settings. Changes take effect immediately, and any billing adjustments are handled automatically.</p>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    );
}

```

### Custom Indicator

The `Accordion.HeaderIndicator` component is used to display the indicator of the header. It can be customized by passing a function that returns a React element or `data-p-active` attribute.

```tsx
import { MinusIcon, PlusIcon } from '@primereact/icons';
import type { AccordionHeaderIndicatorInstance } from '@primereact/types/shared/accordion';
import { Accordion } from 'primereact/accordion';

export default function CustomIndicatorDemo() {
    return (
        <div className="card">
            <Accordion className="max-w-md mx-auto" multiple>
                <Accordion.Panel value="1">
                    <Accordion.Header>
                        What is this service about?
                        <Accordion.HeaderIndicator className="group">
                            <PlusIcon className="group-data-[p-active=true]:rotate-45 transition-transform ease-out" />
                        </Accordion.HeaderIndicator>
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>
                            This service helps you manage your projects more efficiently by offering real-time collaboration, task tracking, and powerful analytics. Whether you&apos;re working solo or in a team, it&apos;s built to scale with your
                            needs.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel value="2">
                    <Accordion.Header>
                        Is my data secure?
                        <Accordion.HeaderIndicator>{({ accordionpanel }: AccordionHeaderIndicatorInstance) => (accordionpanel?.active ? <MinusIcon /> : <PlusIcon />)}</Accordion.HeaderIndicator>
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>Yes. We use end-to-end encryption and follow industry best practices to ensure your data is protected. Your information is stored on secure servers and regularly backed up.</p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel value="3">
                    <Accordion.Header className="justify-start gap-2">
                        <Accordion.HeaderIndicator />
                        Can I upgrade or downgrade my plan later?
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>Absolutely. You can change your subscription plan at any time from your account settings. Changes take effect immediately, and any billing adjustments are handled automatically.</p>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    );
}

```

### Disabled

Enabling `disabled` property of an `Accordion.Panel` prevents user interaction of the panel or enable `disabled` of the `Accordion` component disables all panels.

```tsx
import { Accordion } from 'primereact/accordion';

export default function DisabledDemo() {
    return (
        <div className="card space-y-8">
            <Accordion disabled className="max-w-md mx-auto">
                <Accordion.Panel value="1">
                    <Accordion.Header>
                        How do I reset my password?
                        <Accordion.HeaderIndicator />
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>You can reset your password by clicking the “Forgot password?” link on the login page. We’ll send a password reset link to your registered email address.</p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel value="2">
                    <Accordion.Header>
                        Do you offer team accounts?
                        <Accordion.HeaderIndicator />
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>Yes. Our Team and Business plans are designed for collaboration. You can invite team members, assign roles, and manage permissions easily from your dashboard.</p>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
            <Accordion className="max-w-md mx-auto">
                <Accordion.Panel value="1">
                    <Accordion.Header>
                        What happens if I exceed my usage limit?
                        <Accordion.HeaderIndicator />
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>If you go over your plan limits (e.g., storage or API requests), you’ll receive a notification. You can either upgrade your plan or wait until the next billing cycle resets.</p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel value="2" disabled>
                    <Accordion.Header>
                        Is there a mobile app available?
                        <Accordion.HeaderIndicator />
                    </Accordion.Header>
                    <Accordion.Content>
                        <p>Yes, we offer both iOS and Android apps so you can manage your account and stay connected on the go.</p>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    );
}

```

### Template

The optional `as` property controls the default container element of a header, for example setting it to a div renders a div for the header instead of a button. The `asChild` option enables the headless mode for further customization by passing callbacks and properties to implement your own header.

```tsx
import { Icon } from '@primereact/core/icon';
import type { AccordionHeaderInstance } from '@primereact/types/shared/accordion';
import { Accordion } from 'primereact/accordion';

const items = [
    {
        label: 'What is this service about?',
        value: '1',
        icon: 'pi pi-question-circle text-yellow-500',
        content: 'This service helps you manage your projects more efficiently by offering real-time collaboration, task tracking, and powerful analytics. Whether you’re working solo or in a team, it’s built to scale with your needs.'
    },
    {
        label: 'Is my data secure?',
        value: '2',
        icon: 'pi pi-lock text-blue-500',
        content: 'Yes. We use end-to-end encryption and follow industry best practices to ensure your data is protected. Your information is stored on secure servers and regularly backed up.'
    },
    {
        label: 'Can I upgrade or downgrade my plan later?',
        value: '3',
        icon: 'pi pi-credit-card text-green-500',
        content: 'Absolutely. You can change your subscription plan at any time from your account settings. Changes take effect immediately, and any billing adjustments are handled automatically.'
    }
];

export default function TemplateDemo() {
    return (
        <div className="card">
            <Accordion className="max-w-md mx-auto border border-surface-200 dark:border-surface-700 rounded-md divide-y divide-surface-200 dark:divide-surface-700">
                {items.map((item) => (
                    <Accordion.Panel key={item.value} value={item.value} className="last:border-none transition-all ease-out">
                        <Accordion.Header className="bg-transparent py-3.5">
                            <span className="flex items-center gap-4">
                                <i className={item.icon}></i>
                                <span className="font-medium">{item.label}</span>
                            </span>
                            <Accordion.HeaderIndicator>{({ accordionpanel }: AccordionHeaderInstance) => <Icon className="pi pi-plus transition-transform ease-out" rotate={accordionpanel?.active ? 45 : 0} />}</Accordion.HeaderIndicator>
                        </Accordion.Header>
                        <Accordion.Content className="bg-transparent px-4 pb-3.5 leading-6 pl-13">
                            <p>{item.content}</p>
                        </Accordion.Content>
                    </Accordion.Panel>
                ))}
            </Accordion>
        </div>
    );
}

```

### With RadioButton

`RadioButton` component can be used to group multiple `Accordion.Panel` components.

```tsx
import type { useAccordionChangeEvent } from '@primereact/types/shared/accordion';
import type { RadioButtonGroupValueChangeEvent } from '@primereact/types/shared/radiobutton';
import { Accordion } from 'primereact/accordion';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import * as React from 'react';

const items = [
    {
        label: 'Starter Plan',
        description: 'Perfect for individuals getting started. Includes access to core components and community support.',
        value: '1',
        price: '$99'
    },
    {
        label: 'Growth Plan',
        description: 'Ideal for freelancers and small teams. Unlocks advanced UI components and priority email support.',
        value: '2',
        price: '$249'
    },
    {
        label: 'Scale Plan',
        description: 'Best for growing businesses. Includes all features, early access to new releases, and Slack support.',
        value: '3',
        price: '$499'
    }
];

export default function UseWithRadioButton() {
    const [selected, setSelected] = React.useState<string>('1');

    return (
        <div className="card">
            <div className="max-w-md mx-auto w-full">
                <RadioButton.Group className="w-full" value={selected} onValueChange={(e: RadioButtonGroupValueChangeEvent) => setSelected(e.value as string)}>
                    <Accordion
                        value={selected}
                        onChange={(e: useAccordionChangeEvent) => setSelected(e.value as string)}
                        className="w-full border border-surface-200 dark:border-surface-700 rounded-md divide-y divide-surface-200 dark:divide-surface-700"
                    >
                        {items.map((item) => (
                            <Accordion.Panel key={item.value} value={item.value} className="last:border-none transition-all ease-out">
                                <Accordion.Header onClick={() => setSelected(item.value)} className="flex items-center justify-between bg-transparent py-3.5">
                                    <span className="flex items-center gap-4">
                                        <RadioButton inputId={`radio-${item.value}`} name="price" value={item.value} />
                                        <span className="font-semibold text-xl">{item.label}</span>
                                    </span>
                                    <span className="text-xl font-semibold">{item.price}</span>
                                </Accordion.Header>
                                <Accordion.Content className="bg-transparent px-4 pb-3.5 leading-6 pl-14">
                                    <p>{item.description}</p>
                                </Accordion.Content>
                            </Accordion.Panel>
                        ))}
                    </Accordion>
                </RadioButton.Group>
                <Button className="w-full mt-4" size="large">
                    Buy Now for {items.find((item) => item.value === selected)?.price}
                </Button>
            </div>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Accordion header elements is a button element and use aria-controls to define the id of the content section along with aria-expanded for the visibility state. The value to read a header element defaults to the value of the header property and can be customized by defining an aria-label or aria-labelledby via the pt property.

The content uses region role, defines an id that matches the aria-controls of the header and aria-labelledby referring to the id of the header.

### Header Keyboard Support

| Key           | Function                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `tab`         | Moves focus to the next focusable element in the page tab sequence.                                  |
| `shift + tab` | Moves focus to the previous focusable element in the page tab sequence.                              |
| `enter`       | Toggles the visibility of the content.                                                               |
| `space`       | Toggles the visibility of the content.                                                               |
| `down arrow`  | Moves focus to the next header. If focus is on the last header, moves focus to the first header.     |
| `up arrow`    | Moves focus to the previous header. If focus is on the first header, moves focus to the last header. |
| `home`        | Moves focus to the first header.                                                                     |
| `end`         | Moves focus to the last header.                                                                      |


# Accordion Pass Through

Pass Through documentation for accordion component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="accordion-pt" components={['Accordion', 'AccordionPanel', 'AccordionHeader', 'AccordionHeaderIndicator', 'AccordionContent']} />

## Accordion PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | AccordionPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| panel | AccordionPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the panel's DOM element. |
| header | AccordionPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the header's DOM element. |
| content | AccordionPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the content's DOM element. |
| headerindicator | AccordionPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the header indicator's DOM element. |


## AccordionPanel PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | AccordionPanelPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |


## AccordionHeader PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | AccordionHeaderPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |


## AccordionHeaderIndicator PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | AccordionHeaderIndicatorPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |


## AccordionContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | AccordionContentPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |



# Accordion Theming

Theming documentation for accordion component


## Styled

### Accordion CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-accordion | Class name of the root element |
| p-accordioncontent | Class name of the content element |
| p-accordionheader | Class name of the header element |
| p-accordionpanel | Class name of the panel element |
| p-accordionheader-toggle-icon | Class name of the toggle icon element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| accordion.transition.duration | --p-accordion-transition-duration | Transition duration of root |
| accordion.panel.border.width | --p-accordion-panel-border-width | Border width of panel |
| accordion.panel.border.color | --p-accordion-panel-border-color | Border color of panel |
| accordion.header.color | --p-accordion-header-color | Color of header |
| accordion.header.hover.color | --p-accordion-header-hover-color | Hover color of header |
| accordion.header.active.color | --p-accordion-header-active-color | Active color of header |
| accordion.header.active.hover.color | --p-accordion-header-active-hover-color | Active hover color of header |
| accordion.header.padding | --p-accordion-header-padding | Padding of header |
| accordion.header.font.weight | --p-accordion-header-font-weight | Font weight of header |
| accordion.header.border.radius | --p-accordion-header-border-radius | Border radius of header |
| accordion.header.border.width | --p-accordion-header-border-width | Border width of header |
| accordion.header.border.color | --p-accordion-header-border-color | Border color of header |
| accordion.header.background | --p-accordion-header-background | Background of header |
| accordion.header.hover.background | --p-accordion-header-hover-background | Hover background of header |
| accordion.header.active.background | --p-accordion-header-active-background | Active background of header |
| accordion.header.active.hover.background | --p-accordion-header-active-hover-background | Active hover background of header |
| accordion.header.focus.ring.width | --p-accordion-header-focus-ring-width | Focus ring width of header |
| accordion.header.focus.ring.style | --p-accordion-header-focus-ring-style | Focus ring style of header |
| accordion.header.focus.ring.color | --p-accordion-header-focus-ring-color | Focus ring color of header |
| accordion.header.focus.ring.offset | --p-accordion-header-focus-ring-offset | Focus ring offset of header |
| accordion.header.focus.ring.shadow | --p-accordion-header-focus-ring-shadow | Focus ring shadow of header |
| accordion.header.toggle.icon.color | --p-accordion-header-toggle-icon-color | Toggle icon color of header |
| accordion.header.toggle.icon.hover.color | --p-accordion-header-toggle-icon-hover-color | Toggle icon hover color of header |
| accordion.header.toggle.icon.active.color | --p-accordion-header-toggle-icon-active-color | Toggle icon active color of header |
| accordion.header.toggle.icon.active.hover.color | --p-accordion-header-toggle-icon-active-hover-color | Toggle icon active hover color of header |
| accordion.header.first.top.border.radius | --p-accordion-header-first-top-border-radius | First top border radius of header |
| accordion.header.first.border.width | --p-accordion-header-first-border-width | First border width of header |
| accordion.header.last.bottom.border.radius | --p-accordion-header-last-bottom-border-radius | Last bottom border radius of header |
| accordion.header.last.active.bottom.border.radius | --p-accordion-header-last-active-bottom-border-radius | Last active bottom border radius of header |
| accordion.content.border.width | --p-accordion-content-border-width | Border width of content |
| accordion.content.border.color | --p-accordion-content-border-color | Border color of content |
| accordion.content.background | --p-accordion-content-background | Background of content |
| accordion.content.color | --p-accordion-content-color | Color of content |
| accordion.content.padding | --p-accordion-content-padding | Padding of content |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# AnimateOnScroll

AnimateOnScroll is used to apply animations to elements when entering or leaving the viewport during scrolling.


## Usage

```tsx
import { AnimateOnScroll } from 'primereact/animateonscroll';
```

```tsx
<AnimateOnScroll enterClassName="" exitClassName="">
    Animated Element
</AnimateOnScroll>
```

## Examples

### Basic

Animation classes are defined with the `enterClassName` and `leaveClassName` properties. This example utilizes `tailwindcss-primeui` plugin animations however any valid CSS animation is supported.

```tsx
import { AnimateOnScroll } from 'primereact/animateonscroll';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';

export default function BasicDemo() {
    return (
        <div className="card flex flex-col items-center overflow-hidden">
            <div className="flex flex-col items-center gap-2">
                <span className="text-xl font-medium">Scroll Down</span>
                <span className="animate-bounce h-8 w-8 bg-primary text-primary-contrast rounded-full inline-flex items-center justify-center">
                    <i className="pi pi-arrow-down" />
                </span>
            </div>
            <div className="h-[30rem]"></div>
            <div className="flex flex-wrap justify-center gap-8">
                <AnimateOnScroll
                    className="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
                    enterClassName="animate-enter fade-in-10 slide-in-from-l-8 animate-duration-1000"
                    leaveClassName="animate-leave fade-out-0 animate-duration-100"
                >
                    <div className="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center">
                        <i className="pi pi-user !text-2xl"></i>
                    </div>
                    <span className="text-2xl font-bold">Individual</span>
                    <span className="text-muted-color text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>
                <AnimateOnScroll
                    className="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
                    enterClassName="animate-enter fade-in-10 animate-duration-1000"
                    leaveClassName="animate-leave fade-out-0 animate-duration-100"
                >
                    <div className="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center">
                        <i className="pi pi-users !text-2xl"></i>
                    </div>
                    <span className="text-2xl font-bold">Team</span>
                    <span className="text-muted-color text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>
                <AnimateOnScroll className="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" enterClassName="animate-enter fade-in-10 slide-in-from-r-8 animate-duration-1000">
                    <div className="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center">
                        <i className="pi pi-building !text-2xl"></i>
                    </div>
                    <span className="text-2xl font-bold">Enterprise</span>
                    <span className="text-muted-color text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>
            </div>
            <div className="h-[30rem]"></div>
            <div className="flex flex-wrap justify-center gap-8">
                <AnimateOnScroll
                    className="flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
                    enterClassName="animate-enter fade-in-10 slide-in-from-t-20 animate-duration-1000"
                    leaveClassName="animate-leave fade-out-0 animate-duration-100"
                >
                    <Avatar shape="circle" size="xlarge">
                        <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
                    </Avatar>
                    <span className="text-2xl font-medium">Jenna Thompson</span>
                    <span className="text-muted-color text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>
                <AnimateOnScroll
                    className="flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
                    enterClassName="animate-enter fade-in-10 slide-in-from-b-20 animate-duration-1000"
                    leaveClassName="animate-leave fade-out-0 animate-duration-100"
                >
                    <Avatar shape="circle" size="xlarge">
                        <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" />
                    </Avatar>
                    <span className="text-2xl font-medium">Isabel Garcia</span>
                    <span className="text-muted-color text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>
                <AnimateOnScroll
                    className="flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
                    enterClassName="animate-enter fade-in-10 slide-in-from-t-20 animate-duration-1000"
                    leaveClassName="animate-leave fade-out-0 animate-duration-100"
                >
                    <Avatar shape="circle" size="xlarge">
                        <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" />
                    </Avatar>
                    <span className="text-2xl font-medium">Xavier Mason</span>
                    <span className="text-muted-color text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>
            </div>
            <div className="h-[30rem]"></div>
            <div className="flex flex-wrap justify-center gap-8">
                <AnimateOnScroll
                    className="flex flex-col bg-primary text-primary-contrast border-primary shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
                    enterClassName="animate-enter fade-in-10 spin-in-45 slide-in-from-t-12 animate-duration-1000"
                    leaveClassName="animate-leave fade-out-0 animate-duration-100"
                >
                    <span className="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">850K</span>
                    <span className="text-2xl font-bold">Customers</span>
                    <span className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>
                <AnimateOnScroll
                    className="flex flex-col bg-primary text-primary-contrast border-primary shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
                    enterClassName="animate-enter fade-in-10 zoom-in-50 slide-in-from-t-20 animate-duration-1000"
                    leaveClassName="animate-leave fade-out-0 animate-duration-100"
                >
                    <span className="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">$1.5M</span>
                    <span className="text-2xl font-bold">Revenue</span>
                    <span className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>
                <AnimateOnScroll
                    className="flex flex-col bg-primary text-primary-contrast border-primary shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
                    enterClassName="animate-enter fade-in-10 spin-in-[-45deg] slide-in-from-t-16 animate-duration-1000"
                    leaveClassName="animate-leave fade-out-0 animate-duration-100"
                >
                    <span className="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">140K</span>
                    <span className="text-2xl font-bold">Sales</span>
                    <span className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>
            </div>
            <div className="h-[30rem]"></div>
            <div className="flex flex-wrap justify-center gap-8">
                <AnimateOnScroll
                    className="flex flex-col bg-purple-500 text-white border-purple-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
                    enterClassName="animate-enter fade-in-10 zoom-in-50 animate-duration-1000"
                    leaveClassName="animate-leave fade-out-0 animate-duration-100"
                >
                    <div className="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                        <i className="pi pi-wifi !text-2xl"></i>
                    </div>
                    <span className="text-2xl font-bold">Bandwidth</span>
                    <span className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>
                <AnimateOnScroll
                    className="flex flex-col bg-teal-500 text-white border-teal-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
                    enterClassName="animate-enter fade-in-10 zoom-in-75 animate-duration-1000"
                    leaveClassName="animate-leave fade-out-0 animate-duration-1000"
                >
                    <div className="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                        <i className="pi pi-database !text-2xl"></i>
                    </div>
                    <span className="text-2xl font-bold">Storage</span>
                    <span className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>

                <AnimateOnScroll
                    className="flex flex-col bg-indigo-500 text-white border-indigo-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4"
                    enterClassName="animate-enter fade-in-10 zoom-in-50 animate-duration-1000"
                    leaveClassName="animate-leave fade-out-0 animate-duration-100"
                >
                    <div className="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
                        <i className="pi pi-arrows-v !text-2xl"></i>
                    </div>
                    <span className="text-2xl font-bold">Requests</span>
                    <span className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
                </AnimateOnScroll>
            </div>
            <div className="h-[30rem]"></div>
            <div className="flex flex-col items-center gap-8 w-full">
                <AnimateOnScroll enterClassName="animate-enter fade-in-10 slide-in-from-b-16 animate-duration-1000" leaveClassName="animate-leave fade-out-0 animate-duration-100">
                    <div className="text-5xl lg:text-7xl text-center font-bold max-w-lg lg:max-w-3xl text-surface-900 dark:text-surface-50">Discover real-world design inspiration.</div>
                </AnimateOnScroll>
                <AnimateOnScroll enterClassName="animate-enter fade-in-10 slide-in-from-b-16 animate-duration-1000" leaveClassName="animate-leave fade-out-0 animate-duration-100">
                    <div className="max-w-md lg:max-w-2xl text-lg lg:text-xl text-center text-muted-color">Featuring over 400.000 screens and 1,000 iOS, Android & Web apps — New content weekly.</div>
                </AnimateOnScroll>
                <AnimateOnScroll enterClassName="animate-enter fade-in-10 slide-in-from-b-16 animate-duration-1000" leaveClassName="animate-leave fade-out-0 animate-duration-100">
                    <div className="flex items-center justify-center gap-4">
                        <Button size="large" rounded>
                            Join for free
                        </Button>
                        <Button size="large" variant="outlined" rounded severity="secondary">
                            See our plans
                        </Button>
                    </div>
                </AnimateOnScroll>
            </div>
            <div className="h-[15rem]"></div>
        </div>
    );
}

```

## Accessibility

### Screen Reader

AnimateOnScroll does not require any roles and attributes.

### Keyboard Support

Component does not include any interactive elements.


# Avatar API

API documentation for Avatar component


## Avatar

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: AvatarInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: AvatarInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<AvatarPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: AvatarInstance) => ReactNode) | null | The children to render. |
| size | "large" \\| "normal" \\| "xlarge" | normal | Defines the size of the avatar. |
| shape | "circle" \\| "square" | square | Defines the shape of the avatar. |
| delayDuration | number | null | The delay duration of the avatar. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| load | boolean | null | Whether the avatar's image is loading or not. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useAvatarState | null | The state of the useAvatar. |
| handleImageLoad | (src?: string) => void | null | The method to handle image load. |
| handleImageUnload | () => void | null | The method to handle image unload. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Avatar component. | [object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Avatar component. | [object Object] |


## AvatarFallback

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: AvatarFallbackInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: AvatarFallbackInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<AvatarFallbackPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: AvatarFallbackInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| avatar | AvatarInstance | null | The Avatar component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of AvatarFallback component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of AvatarFallback component. | [object Object] |


## AvatarImage

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: AvatarImageInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: AvatarImageInstance) => string) | null | The class name to apply to the component. |
| as | ReactNode | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<AvatarImagePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: AvatarImageInstance) => ReactNode) | null | The children to render. |
| src | string | null | Specifies the path to the image to display. |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| avatar | AvatarInstance | null | The Avatar component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of AvatarImage component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of AvatarImage component. | [object Object] |


## AvatarGroup

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: AvatarGroupInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: AvatarGroupInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<AvatarGroupPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: AvatarGroupInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of AvatarGroup component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of AvatarGroup component. | [object Object] |


## useAvatar

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| delayDuration | number | null | The delay duration of the avatar. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| load | boolean | null | Whether the avatar's image is loading or not. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useAvatarState | null | The state of the useAvatar. |
| handleImageLoad | (src?: string) => void | null | The method to handle image load. |
| handleImageUnload | () => void | null | The method to handle image unload. |


### Events

<DocTable name="useAvatar" category="api" type="events" />

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useAvatar headless. | [object Object] |



# Avatar

Avatar represents people using icons, labels and images.


## Usage

```tsx
import { Avatar } from 'primereact/avatar';
```

```tsx
<Avatar>
    <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/avatar-1.png" />
    <Avatar.Fallback>CC</Avatar.Fallback>
</Avatar>
```

## Examples

### Fallback

The `Avatar.Fallback` component displays a label or an icon when an image fails to load or when an image is not preferred.

```tsx
import { CheckIcon } from '@primereact/icons';
import { Avatar } from 'primereact/avatar';

export default function LabelDemo() {
    return (
        <div className="card flex items-center justify-center gap-4">
            <Avatar>
                <Avatar.Fallback>J</Avatar.Fallback>
            </Avatar>
            <Avatar className="bg-amber-100 dark:bg-amber-950/50 text-amber-500 dark:text-amber-500">
                <Avatar.Fallback>CC</Avatar.Fallback>
            </Avatar>
            <Avatar>
                <Avatar.Fallback>
                    <CheckIcon className="size-4" />
                </Avatar.Fallback>
            </Avatar>
            <Avatar className="bg-blue-100 dark:bg-blue-950/50 text-blue-500 dark:text-blue-500">
                <Avatar.Fallback>
                    <i className="pi pi-user" />
                </Avatar.Fallback>
            </Avatar>
        </div>
    );
}

```

### Image

The `Avatar.Image` component displays an image as an Avatar.

```tsx
import { Avatar } from 'primereact/avatar';

export default function ImageDemo() {
    return (
        <div className="card flex items-center justify-center gap-4">
            <Avatar size="large" shape="circle">
                <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
                <Avatar.Fallback>A</Avatar.Fallback>
            </Avatar>
            <Avatar size="large" shape="circle">
                <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" />
                <Avatar.Fallback>A</Avatar.Fallback>
            </Avatar>
            <Avatar size="large" shape="circle">
                <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" />
                <Avatar.Fallback>O</Avatar.Fallback>
            </Avatar>
        </div>
    );
}

```

### Badge

[`Badge`](/docs/components/badge) component can be used to display a badge on an Avatar.

```tsx
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';

const BadgeDemo = () => {
    return (
        <div className="card flex items-center justify-center gap-8">
            <Badge.Overlay>
                <Avatar size="large" shape="circle">
                    <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" />
                    <Avatar.Fallback>O</Avatar.Fallback>
                </Avatar>
                <Badge size="small" shape="circle" severity="success">
                    2
                </Badge>
            </Badge.Overlay>
            <Badge.Overlay>
                <Avatar size="large">
                    <Avatar.Image src="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" />
                    <Avatar.Fallback>W</Avatar.Fallback>
                </Avatar>
                <Badge shape="circle" severity="danger"></Badge>
            </Badge.Overlay>
        </div>
    );
};

export default BadgeDemo;

```

### Shape

Use the `shape` property to change the appearance.

```tsx
import { Avatar } from 'primereact/avatar';

const ShapeDemo = () => {
    return (
        <div className="card flex items-center justify-center gap-4">
            <Avatar shape="circle" size="large">
                <Avatar.Image src="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" />
                <Avatar.Fallback>W</Avatar.Fallback>
            </Avatar>
            <Avatar shape="square" size="large">
                <Avatar.Image src="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" />
                <Avatar.Fallback>W</Avatar.Fallback>
            </Avatar>
        </div>
    );
};

export default ShapeDemo;

```

### Sizes

Use the `size` property to change the size of an avatar.

```tsx
import { Avatar } from 'primereact/avatar';

const SizeDemo = () => {
    return (
        <div className="card flex items-center justify-center gap-4">
            <Avatar shape="circle" size="normal">
                <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
                <Avatar.Fallback>CC</Avatar.Fallback>
            </Avatar>
            <Avatar shape="circle" size="large">
                <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
                <Avatar.Fallback>CC</Avatar.Fallback>
            </Avatar>
            <Avatar shape="circle" size="xlarge">
                <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
                <Avatar.Fallback>CC</Avatar.Fallback>
            </Avatar>
        </div>
    );
};

export default SizeDemo;

```

### AvatarGroup

Grouping is available by wrapping multiple Avatar components inside an `Avatar.Group` component.

```tsx
import { Avatar } from 'primereact/avatar';

export default function GroupDemo() {
    return (
        <div className="card flex justify-center">
            <Avatar.Group>
                <Avatar shape="circle">
                    <Avatar.Image className="w-2" src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
                    <Avatar.Fallback>A</Avatar.Fallback>
                </Avatar>
                <Avatar shape="circle">
                    <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" />
                    <Avatar.Fallback>A</Avatar.Fallback>
                </Avatar>
                <Avatar shape="circle">
                    <Avatar.Image className="w-2" src="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" />
                    <Avatar.Fallback>O</Avatar.Fallback>
                </Avatar>
                <Avatar shape="circle">
                    <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" />
                    <Avatar.Fallback>I</Avatar.Fallback>
                </Avatar>
                <Avatar shape="circle">
                    <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" />
                    <Avatar.Fallback>X</Avatar.Fallback>
                </Avatar>
                <Avatar shape="circle">
                    <Avatar.Fallback className="">+2</Avatar.Fallback>
                </Avatar>
            </Avatar.Group>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Avatar does not include any roles and attributes by default. Any attribute is passed to the root element so you may add a role like img along with aria-labelledby or aria-label to describe the component. In case avatars need to be tabbable, tabindex can be added as well to implement custom key handlers.

### Keyboard Support

Component does not include any interactive elements.


# Avatar Pass Through

Pass Through documentation for avatar component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="avatar-pt" components={['Avatar', 'AvatarGroup']} />

## Avatar PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | AvatarPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| fallback | AvatarPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the fallback's DOM element. |
| image | AvatarPassThroughType<HTMLAttributes<HTMLImageElement>> | Used to pass attributes to the image's DOM element. |


## AvatarFallback PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | AvatarFallbackPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |


## AvatarImage PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | AvatarImagePassThroughType<HTMLAttributes<HTMLImageElement>> | Used to pass attributes to the root's DOM element. |


## AvatarGroup PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | AvatarGroupPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Avatar Theming

Theming documentation for avatar component


## Styled

### Avatar CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-avatar | Class name of the root element |
| p-avatar-label | Class name of the box element |
| p-avatar-icon | Class name of the input element |


### AvatarGroup CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-avatar-group | Class name of the root element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| avatar.width | --p-avatar-width | Width of root |
| avatar.height | --p-avatar-height | Height of root |
| avatar.font.size | --p-avatar-font-size | Font size of root |
| avatar.background | --p-avatar-background | Background of root |
| avatar.color | --p-avatar-color | Color of root |
| avatar.border.radius | --p-avatar-border-radius | Border radius of root |
| avatar.icon.size | --p-avatar-icon-size | Size of icon |
| avatar.group.border.color | --p-avatar-group-border-color | Border color of group |
| avatar.group.offset | --p-avatar-group-offset | Offset of group |
| avatar.lg.width | --p-avatar-lg-width | Width of lg |
| avatar.lg.height | --p-avatar-lg-height | Height of lg |
| avatar.lg.font.size | --p-avatar-lg-font-size | Font size of lg |
| avatar.lg.icon.size | --p-avatar-lg-icon-size | Icon size of lg |
| avatar.lg.group.offset | --p-avatar-lg-group-offset | Group offset of lg |
| avatar.xl.width | --p-avatar-xl-width | Width of xl |
| avatar.xl.height | --p-avatar-xl-height | Height of xl |
| avatar.xl.font.size | --p-avatar-xl-font-size | Font size of xl |
| avatar.xl.icon.size | --p-avatar-xl-icon-size | Icon size of xl |
| avatar.xl.group.offset | --p-avatar-xl-group-offset | Group offset of xl |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Badge API

API documentation for Badge component


## Badge

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: BadgeInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: BadgeInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<BadgePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: BadgeInstance) => ReactNode) | null | The children to render. |
| shape | "circle" | null | Defines the shape of the badge. |
| size | "small" \\| "large" \\| "xlarge" | null | Size of the badge. |
| severity | "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" | null | Severity type of the badge. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Badge component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Badge component. | [object Object] |


## OverlayBadge

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: OverlayBadgeInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: OverlayBadgeInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<OverlayBadgePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: OverlayBadgeInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of OverlayBadge component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of OverlayBadge component. | [object Object] |


## useBadge

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useBadge headless. | [object Object] |



# Badge

Badge is a small status indicator for another element.


## Usage

```tsx
import { Badge } from 'primereact/badge';
```

```tsx
<Badge>Badge</Badge>
```

## Examples

### Basic

```tsx
import { Badge } from 'primereact/badge';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <Badge>Badge</Badge>
        </div>
    );
}

```

### Severity

The `severity` property defines the visual style of a badge.

```tsx
import { Badge } from 'primereact/badge';

export default function SeverityDemo() {
    return (
        <div className="card flex flex-wrap justify-center gap-2">
            <Badge>Default</Badge>
            <Badge severity="secondary">Secondary</Badge>
            <Badge severity="success">Success</Badge>
            <Badge severity="info">Info</Badge>
            <Badge severity="warn">Warning</Badge>
            <Badge severity="danger">Danger</Badge>
            <Badge severity="contrast">Contrast</Badge>
        </div>
    );
}

```

### Size

Use the `size` property to change the size of a badge.

```tsx
import { Badge } from 'primereact/badge';

export default function SizeDemo() {
    return (
        <div className="card flex flex-wrap items-center justify-center gap-2">
            <Badge size="small">Small</Badge>
            <Badge>Default</Badge>
            <Badge size="large">Large</Badge>
            <Badge size="xlarge">XLarge</Badge>
        </div>
    );
}

```

### Overlay

A badge can be added to any element by encapsulating the content with the `Badge.Overlay` component.

```tsx
import { Badge } from 'primereact/badge';

export default function BasicDemo() {
    return (
        <div className="card flex flex-wrap justify-center gap-6">
            <Badge.Overlay>
                <i className="pi pi-bell" style={{ fontSize: '2rem' }} />
                <Badge shape="circle">2</Badge>
            </Badge.Overlay>
            <Badge.Overlay>
                <i className="pi pi-calendar" style={{ fontSize: '2rem' }} />
                <Badge shape="circle" severity="danger">
                    4
                </Badge>
            </Badge.Overlay>
            <Badge.Overlay>
                <i className="pi pi-envelope" style={{ fontSize: '2rem' }} />
                <Badge shape="circle"></Badge>
            </Badge.Overlay>
        </div>
    );
}

```

### Button

Buttons have built-in support for badges to display a badge inline.

```tsx
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';

export default function ButtonDemo() {
    return (
        <div className="card flex justify-center flex-wrap gap-4">
            <Button type="button">
                Emails
                <Badge severity="secondary" shape="circle">
                    8
                </Badge>
            </Button>

            <Button type="button" variant="outlined">
                <i className="pi pi-users" />
                Messages
                <Badge severity="contrast" shape="circle">
                    2
                </Badge>
            </Button>

            <Badge.Overlay>
                <Button type="button" variant="outlined">
                    <i className="pi pi-bell" />
                </Button>
                <Badge severity="info" className="animate-pulse" />
            </Badge.Overlay>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Badge does not include any roles and attributes by default, any attribute is passed to the root element so aria roles and attributes can be added if required. If the badges are dynamic, _aria-live_ may be utilized as well. In case badges need to be tabbable, _tabindex_ can be added to implement custom key handlers.

### Keyboard Support

Component does not include any interactive elements.


# Badge Pass Through

Pass Through documentation for Badge component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="badge-pt" components={['Badge', 'OverlayBadge']} />

## Badge PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | BadgePassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |


## OverlayBadge PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | OverlayBadgePassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Badge Theming

Theming documentation for badge component


## Styled

### Badge CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-badge | Class name of the root element |


### OverlayBadge CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-overlaybadge | Class name of the root element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| badge.border.radius | --p-badge-border-radius | Border radius of root |
| badge.padding | --p-badge-padding | Padding of root |
| badge.font.size | --p-badge-font-size | Font size of root |
| badge.font.weight | --p-badge-font-weight | Font weight of root |
| badge.min.width | --p-badge-min-width | Min width of root |
| badge.height | --p-badge-height | Height of root |
| badge.dot.size | --p-badge-dot-size | Size of dot |
| badge.sm.font.size | --p-badge-sm-font-size | Font size of sm |
| badge.sm.min.width | --p-badge-sm-min-width | Min width of sm |
| badge.sm.height | --p-badge-sm-height | Height of sm |
| badge.lg.font.size | --p-badge-lg-font-size | Font size of lg |
| badge.lg.min.width | --p-badge-lg-min-width | Min width of lg |
| badge.lg.height | --p-badge-lg-height | Height of lg |
| badge.xl.font.size | --p-badge-xl-font-size | Font size of xl |
| badge.xl.min.width | --p-badge-xl-min-width | Min width of xl |
| badge.xl.height | --p-badge-xl-height | Height of xl |
| badge.primary.background | --p-badge-primary-background | Background of primary |
| badge.primary.color | --p-badge-primary-color | Color of primary |
| badge.secondary.background | --p-badge-secondary-background | Background of secondary |
| badge.secondary.color | --p-badge-secondary-color | Color of secondary |
| badge.success.background | --p-badge-success-background | Background of success |
| badge.success.color | --p-badge-success-color | Color of success |
| badge.info.background | --p-badge-info-background | Background of info |
| badge.info.color | --p-badge-info-color | Color of info |
| badge.warn.background | --p-badge-warn-background | Background of warn |
| badge.warn.color | --p-badge-warn-color | Color of warn |
| badge.danger.background | --p-badge-danger-background | Background of danger |
| badge.danger.color | --p-badge-danger-color | Color of danger |
| badge.contrast.background | --p-badge-contrast-background | Background of contrast |
| badge.contrast.color | --p-badge-contrast-color | Color of contrast |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Button API

API documentation for Button component


## Button

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ButtonInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ButtonInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ButtonPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ButtonInstance) => ReactNode) | null | The children to render. |
| size | "small" \\| "large" \\| "normal" | null | Size of the Button. |
| severity | string & {} \\| "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" \\| "help" | null | Severity type of the Button. |
| variant | "link" \\| "text" \\| "outlined" | null | Variant of the Button. |
| plain | boolean | null | Whether to show the Button with a plain style. |
| rounded | boolean | null | Whether to show the Button with a rounded style. |
| raised | boolean | null | Whether to show the Button with a raised style. |
| iconOnly | boolean | null | Whether to show the Button with a borderless style. |
| fluid | boolean | null | Whether to show the Button with a fluid width. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Button component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Button component. | [object Object] |


## ButtonGroup

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ButtonGroupInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ButtonGroupInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ButtonGroupPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ButtonGroupInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Button component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ButtonGroup component. | [object Object] |


## useButton

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useButton headless. | [object Object] |



# Button

Button is an extension to standard input element with icons and theming.


## Usage

```tsx
import { Button } from 'primereact/button';
```

```tsx
<Button>Button</Button>
```

## Examples

### Basic

```tsx
import { Button } from 'primereact/button';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <Button>Submit</Button>
        </div>
    );
}

```

### Icons

```tsx
import { Button } from 'primereact/button';

export default function IconDemo() {
    return (
        <div className="card flex flex-col items-center gap-4">
            <div className="flex flex-wrap gap-4 justify-center">
                <Button aria-label="Save">
                    <i className="pi pi-home" />
                </Button>
                <Button>
                    <i className="pi pi-user" />
                    Profile
                </Button>
                <Button>
                    Save
                    <i className="pi pi-check" />
                </Button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                <Button className="flex-col">
                    <i className="pi pi-search" />
                    Search
                </Button>
                <Button className="flex-col">
                    Update
                    <i className="pi pi-refresh" />
                </Button>
            </div>
        </div>
    );
}

```

### Loading

```tsx
import { Button } from 'primereact/button';
import { useState } from 'react';

export default function LoadingDemo() {
    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="card flex flex-wrap gap-4 justify-center">
            <Button type="button" onClick={load} disabled={loading}>
                {loading ? <i className="pi pi-spinner animate-spin" /> : <i className="pi pi-check" />}
                {loading ? 'Loading...' : 'Search'}
            </Button>
            <Button type="button" onClick={load} disabled={loading} iconOnly>
                {loading ? <i className="pi pi-spinner animate-spin" /> : <i className="pi pi-check" />}
            </Button>
        </div>
    );
}

```

### As Link

Use `as="a"` to render a button as HTML anchor tag or use `as={Link}` to use Next.js Link.

```tsx
import Link from 'next/link';
import { Button } from 'primereact/button';

export default function LinkDemo() {
    return (
        <div className="card flex justify-center gap-4">
            <Button variant="link">Link</Button>
            <Button as="a" href="https://reactjs.org/" target="_blank" rel="noopener">
                External
            </Button>
            <Button as={Link} href="/">
                Router
            </Button>
        </div>
    );
}

```

### Severity

The `severity` property defines the variant of a button.

```tsx
import { Button } from 'primereact/button';

export default function SeverityDemo() {
    return (
        <div className="card flex justify-center flex-wrap gap-4">
            <Button>Primary</Button>
            <Button severity="secondary">Secondary</Button>
            <Button severity="success">Success</Button>
            <Button severity="info">Info</Button>
            <Button severity="warn">Warn</Button>
            <Button severity="help">Help</Button>
            <Button severity="danger">Danger</Button>
            <Button severity="contrast">Contrast</Button>
        </div>
    );
}

```

### Disabled

When `disabled` is present, the element cannot be used.

```tsx
import { Button } from 'primereact/button';

export default function DisabledDemo() {
    return (
        <div className="card flex justify-center">
            <Button disabled>Submit</Button>
        </div>
    );
}

```

### Raised

Raised buttons display a shadow to indicate elevation.

```tsx
import { Button } from 'primereact/button';

export default function RaisedDemo() {
    return (
        <div className="card flex justify-center flex-wrap gap-4">
            <Button raised>Primary</Button>
            <Button severity="secondary" raised>
                Secondary
            </Button>
            <Button severity="success" raised>
                Success
            </Button>
            <Button severity="info" raised>
                Info
            </Button>
            <Button severity="warn" raised>
                Warn
            </Button>
            <Button severity="help" raised>
                Help
            </Button>
            <Button severity="danger" raised>
                Danger
            </Button>
            <Button severity="contrast" raised>
                Contrast
            </Button>
        </div>
    );
}

```

### Rounded

Rounded buttons have a circular border radius.

```tsx
import { Button } from 'primereact/button';

export default function RoundedDemo() {
    return (
        <div className="card flex justify-center flex-wrap gap-4">
            <Button rounded>Primary</Button>
            <Button severity="secondary" rounded>
                Secondary
            </Button>
            <Button severity="success" rounded>
                Success
            </Button>
            <Button severity="info" rounded>
                Info
            </Button>
            <Button severity="warn" rounded>
                Warn
            </Button>
            <Button severity="help" rounded>
                Help
            </Button>
            <Button severity="danger" rounded>
                Danger
            </Button>
            <Button severity="contrast" rounded>
                Contrast
            </Button>
        </div>
    );
}

```

### Text

Text buttons are displayed as textual elements.

```tsx
import { Button } from 'primereact/button';

export default function TextDemo() {
    return (
        <div className="card flex justify-center flex-wrap gap-4">
            <Button variant="text">Primary</Button>
            <Button severity="secondary" variant="text">
                Secondary
            </Button>
            <Button severity="success" variant="text">
                Success
            </Button>
            <Button severity="info" variant="text">
                Info
            </Button>
            <Button severity="warn" variant="text">
                Warn
            </Button>
            <Button severity="help" variant="text">
                Help
            </Button>
            <Button severity="danger" variant="text">
                Danger
            </Button>
            <Button severity="contrast" variant="text">
                Contrast
            </Button>
        </div>
    );
}

```

### Raised Text

Text buttons can be displayed elevated with the `raised` option.

```tsx
import { Button } from 'primereact/button';

export default function RaisedTextDemo() {
    return (
        <div className="card flex justify-center flex-wrap gap-4">
            <Button raised variant="text">
                Primary
            </Button>
            <Button raised severity="secondary" variant="text">
                Secondary
            </Button>
            <Button raised severity="success" variant="text">
                Success
            </Button>
            <Button raised severity="info" variant="text">
                Info
            </Button>
            <Button raised severity="warn" variant="text">
                Warn
            </Button>
            <Button raised severity="help" variant="text">
                Help
            </Button>
            <Button raised severity="danger" variant="text">
                Danger
            </Button>
            <Button raised severity="contrast" variant="text">
                Contrast
            </Button>
        </div>
    );
}

```

### Outlined

Outlined buttons display a border without a transparent background.

```tsx
import { Button } from 'primereact/button';

export default function OutlinedDemo() {
    return (
        <div className="card flex justify-center flex-wrap gap-4">
            <Button variant="outlined">Primary</Button>
            <Button severity="secondary" variant="outlined">
                Secondary
            </Button>
            <Button severity="success" variant="outlined">
                Success
            </Button>
            <Button severity="info" variant="outlined">
                Info
            </Button>
            <Button severity="warn" variant="outlined">
                Warn
            </Button>
            <Button severity="help" variant="outlined">
                Help
            </Button>
            <Button severity="danger" variant="outlined">
                Danger
            </Button>
            <Button severity="contrast" variant="outlined">
                Contrast
            </Button>
        </div>
    );
}

```

### Icon Only

Buttons can have icons without labels. Use `iconOnly` to display only an icon.

```tsx
import { Button } from 'primereact/button';
import { useState } from 'react';

export default function IconOnlyDemo() {
    /*const sizeOptions = useRef([
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' }
    ]);*/

    const [size] = useState<'small' | 'normal' | 'large'>('normal');

    return (
        <div className="card">
            <div className="flex justify-center mb-8">{/*<SelectButton v-model="size" :options="sizeOptions" optionLabel="label" optionValue="value" dataKey="label" />*/}</div>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Button aria-label="Filter" size={size} iconOnly>
                    <i className="pi pi-check" />
                </Button>
                <Button severity="secondary" aria-label="Bookmark" size={size} iconOnly>
                    <i className="pi pi-bookmark" />
                </Button>
                <Button severity="success" aria-label="Search" size={size} iconOnly>
                    <i className="pi pi-search" />
                </Button>
                <Button severity="info" aria-label="User" size={size} iconOnly>
                    <i className="pi pi-user" />
                </Button>
                <Button severity="warn" aria-label="Notification" size={size} iconOnly>
                    <i className="pi pi-bell" />
                </Button>
                <Button severity="help" aria-label="Favorite" size={size} iconOnly>
                    <i className="pi pi-heart" />
                </Button>
                <Button severity="danger" aria-label="Cancel" size={size} iconOnly>
                    <i className="pi pi-times" />
                </Button>
                <Button severity="contrast" aria-label="Star" size={size} iconOnly>
                    <i className="pi pi-star" />
                </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Button rounded aria-label="Filter" size={size} iconOnly>
                    <i className="pi pi-check" />
                </Button>
                <Button severity="secondary" rounded aria-label="Bookmark" size={size} iconOnly>
                    <i className="pi pi-bookmark" />
                </Button>
                <Button severity="success" rounded aria-label="Search" size={size} iconOnly>
                    <i className="pi pi-search" />
                </Button>
                <Button severity="info" rounded aria-label="User" size={size} iconOnly>
                    <i className="pi pi-user" />
                </Button>
                <Button severity="warn" rounded aria-label="Notification" size={size} iconOnly>
                    <i className="pi pi-bell" />
                </Button>
                <Button severity="help" rounded aria-label="Favorite" size={size} iconOnly>
                    <i className="pi pi-heart" />
                </Button>
                <Button severity="danger" rounded aria-label="Cancel" size={size} iconOnly>
                    <i className="pi pi-times" />
                </Button>
                <Button severity="contrast" rounded aria-label="Star" size={size} iconOnly>
                    <i className="pi pi-star" />
                </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Button rounded variant="outlined" aria-label="Filter" size={size} iconOnly>
                    <i className="pi pi-check" />
                </Button>
                <Button severity="secondary" rounded variant="outlined" aria-label="Bookmark" size={size} iconOnly>
                    <i className="pi pi-bookmark" />
                </Button>
                <Button severity="success" rounded variant="outlined" aria-label="Search" size={size} iconOnly>
                    <i className="pi pi-search" />
                </Button>
                <Button severity="info" rounded variant="outlined" aria-label="User" size={size} iconOnly>
                    <i className="pi pi-user" />
                </Button>
                <Button severity="warn" rounded variant="outlined" aria-label="Notification" size={size} iconOnly>
                    <i className="pi pi-bell" />
                </Button>
                <Button severity="help" rounded variant="outlined" aria-label="Favorite" size={size} iconOnly>
                    <i className="pi pi-heart" />
                </Button>
                <Button severity="danger" rounded variant="outlined" aria-label="Cancel" size={size} iconOnly>
                    <i className="pi pi-times" />
                </Button>
                <Button severity="contrast" rounded variant="outlined" aria-label="Star" size={size} iconOnly>
                    <i className="pi pi-star" />
                </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
                <Button rounded raised aria-label="Filter" size={size} iconOnly>
                    <i className="pi pi-check" />
                </Button>
                <Button severity="secondary" rounded raised aria-label="Bookmark" size={size} iconOnly>
                    <i className="pi pi-bookmark" />
                </Button>
                <Button severity="success" rounded raised aria-label="Search" size={size} iconOnly>
                    <i className="pi pi-search" />
                </Button>
                <Button severity="info" rounded raised aria-label="User" size={size} iconOnly>
                    <i className="pi pi-user" />
                </Button>
                <Button severity="warn" rounded raised aria-label="Notification" size={size} iconOnly>
                    <i className="pi pi-bell" />
                </Button>
                <Button severity="help" rounded raised aria-label="Favorite" size={size} iconOnly>
                    <i className="pi pi-heart" />
                </Button>
                <Button severity="danger" rounded raised aria-label="Cancel" size={size} iconOnly>
                    <i className="pi pi-times" />
                </Button>
                <Button severity="contrast" rounded raised aria-label="Star" size={size} iconOnly>
                    <i className="pi pi-star" />
                </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                <Button rounded variant="text" aria-label="Filter" size={size} iconOnly>
                    <i className="pi pi-check" />
                </Button>
                <Button severity="secondary" rounded variant="text" aria-label="Bookmark" size={size} iconOnly>
                    <i className="pi pi-bookmark" />
                </Button>
                <Button severity="success" rounded variant="text" aria-label="Search" size={size} iconOnly>
                    <i className="pi pi-search" />
                </Button>
                <Button severity="info" rounded variant="text" aria-label="User" size={size} iconOnly>
                    <i className="pi pi-user" />
                </Button>
                <Button severity="warn" rounded variant="text" aria-label="Notification" size={size} iconOnly>
                    <i className="pi pi-bell" />
                </Button>
                <Button severity="help" rounded variant="text" aria-label="Favorite" size={size} iconOnly>
                    <i className="pi pi-heart" />
                </Button>
                <Button severity="danger" rounded variant="text" aria-label="Cancel" size={size} iconOnly>
                    <i className="pi pi-times" />
                </Button>
                <Button severity="contrast" rounded variant="text" aria-label="Star" size={size} iconOnly>
                    <i className="pi pi-star" />
                </Button>
            </div>
        </div>
    );
}

```

### Badge

`Badge` component can be used to display a badge inside a button. `Badge.Overlay` is used to display a badge on a button.

```tsx
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';

export default function BadgeDemo() {
    return (
        <div className="card flex justify-center flex-wrap gap-4">
            <Button type="button">
                Emails
                <Badge severity="secondary" shape="circle">
                    2
                </Badge>
            </Button>

            <Button type="button" variant="outlined">
                <i className="pi pi-users" />
                Messages
                <Badge severity="contrast" shape="circle">
                    2
                </Badge>
            </Button>

            <Badge.Overlay>
                <Button type="button" variant="outlined">
                    <i className="pi pi-bell" />
                </Button>
                <Badge severity="info" className="animate-pulse" />
            </Badge.Overlay>
        </div>
    );
}

```

### Button Group

Multiple buttons are grouped when wrapped inside an element with `Button.Group` component.

```tsx
import { Button } from 'primereact/button';

export default function GroupDemo() {
    return (
        <div className="card flex justify-center">
            <Button.Group>
                <Button>
                    <i className="pi pi-check" />
                    Save
                </Button>
                <Button>
                    <i className="pi pi-trash" />
                    Delete
                </Button>
                <Button>
                    <i className="pi pi-times" />
                    Cancel
                </Button>
            </Button.Group>
        </div>
    );
}

```

### Sizes

Button provides `small` and `large` sizes as alternatives to the base.

```tsx
import { Button } from 'primereact/button';

export default function SizeDemo() {
    return (
        <div className="card flex flex-wrap items-center justify-center gap-4">
            <Button size="small">
                <i className="pi pi-check" />
                Small
            </Button>
            <Button>
                <i className="pi pi-check" />
                Normal
            </Button>
            <Button size="large">
                <i className="pi pi-check" />
                Large
            </Button>
        </div>
    );
}

```


# Button Pass Through

Pass Through documentation for button component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="button-pt" components={['Button', 'ButtonGroup']} />

## Button PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ButtonPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ButtonGroup PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ButtonGroupPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Button Theming

Theming documentation for Button component


## Styled

### Button CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-button | Class name of the root element |
| p-button-loading-icon | Class name of the loading icon element |
| p-button-icon | Class name of the icon element |
| p-button-label | Class name of the label element |


### ButtonGroup CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-buttongroup | Class name of the root element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| button.border.radius | --p-button-border-radius | Border radius of root |
| button.rounded.border.radius | --p-button-rounded-border-radius | Rounded border radius of root |
| button.gap | --p-button-gap | Gap of root |
| button.padding.x | --p-button-padding-x | Padding x of root |
| button.padding.y | --p-button-padding-y | Padding y of root |
| button.icon.only.width | --p-button-icon-only-width | Icon only width of root |
| button.sm.font.size | --p-button-sm-font-size | Sm font size of root |
| button.sm.padding.x | --p-button-sm-padding-x | Sm padding x of root |
| button.sm.padding.y | --p-button-sm-padding-y | Sm padding y of root |
| button.sm.icon.only.width | --p-button-sm-icon-only-width | Sm icon only width of root |
| button.lg.font.size | --p-button-lg-font-size | Lg font size of root |
| button.lg.padding.x | --p-button-lg-padding-x | Lg padding x of root |
| button.lg.padding.y | --p-button-lg-padding-y | Lg padding y of root |
| button.lg.icon.only.width | --p-button-lg-icon-only-width | Lg icon only width of root |
| button.label.font.weight | --p-button-label-font-weight | Label font weight of root |
| button.raised.shadow | --p-button-raised-shadow | Raised shadow of root |
| button.focus.ring.width | --p-button-focus-ring-width | Focus ring width of root |
| button.focus.ring.style | --p-button-focus-ring-style | Focus ring style of root |
| button.focus.ring.offset | --p-button-focus-ring-offset | Focus ring offset of root |
| button.badge.size | --p-button-badge-size | Badge size of root |
| button.transition.duration | --p-button-transition-duration | Transition duration of root |
| button.primary.background | --p-button-primary-background | Primary background of root |
| button.primary.hover.background | --p-button-primary-hover-background | Primary hover background of root |
| button.primary.active.background | --p-button-primary-active-background | Primary active background of root |
| button.primary.border.color | --p-button-primary-border-color | Primary border color of root |
| button.primary.hover.border.color | --p-button-primary-hover-border-color | Primary hover border color of root |
| button.primary.active.border.color | --p-button-primary-active-border-color | Primary active border color of root |
| button.primary.color | --p-button-primary-color | Primary color of root |
| button.primary.hover.color | --p-button-primary-hover-color | Primary hover color of root |
| button.primary.active.color | --p-button-primary-active-color | Primary active color of root |
| button.primary.focus.ring.color | --p-button-primary-focus-ring-color | Primary focus ring color of root |
| button.primary.focus.ring.shadow | --p-button-primary-focus-ring-shadow | Primary focus ring shadow of root |
| button.secondary.background | --p-button-secondary-background | Secondary background of root |
| button.secondary.hover.background | --p-button-secondary-hover-background | Secondary hover background of root |
| button.secondary.active.background | --p-button-secondary-active-background | Secondary active background of root |
| button.secondary.border.color | --p-button-secondary-border-color | Secondary border color of root |
| button.secondary.hover.border.color | --p-button-secondary-hover-border-color | Secondary hover border color of root |
| button.secondary.active.border.color | --p-button-secondary-active-border-color | Secondary active border color of root |
| button.secondary.color | --p-button-secondary-color | Secondary color of root |
| button.secondary.hover.color | --p-button-secondary-hover-color | Secondary hover color of root |
| button.secondary.active.color | --p-button-secondary-active-color | Secondary active color of root |
| button.secondary.focus.ring.color | --p-button-secondary-focus-ring-color | Secondary focus ring color of root |
| button.secondary.focus.ring.shadow | --p-button-secondary-focus-ring-shadow | Secondary focus ring shadow of root |
| button.info.background | --p-button-info-background | Info background of root |
| button.info.hover.background | --p-button-info-hover-background | Info hover background of root |
| button.info.active.background | --p-button-info-active-background | Info active background of root |
| button.info.border.color | --p-button-info-border-color | Info border color of root |
| button.info.hover.border.color | --p-button-info-hover-border-color | Info hover border color of root |
| button.info.active.border.color | --p-button-info-active-border-color | Info active border color of root |
| button.info.color | --p-button-info-color | Info color of root |
| button.info.hover.color | --p-button-info-hover-color | Info hover color of root |
| button.info.active.color | --p-button-info-active-color | Info active color of root |
| button.info.focus.ring.color | --p-button-info-focus-ring-color | Info focus ring color of root |
| button.info.focus.ring.shadow | --p-button-info-focus-ring-shadow | Info focus ring shadow of root |
| button.success.background | --p-button-success-background | Success background of root |
| button.success.hover.background | --p-button-success-hover-background | Success hover background of root |
| button.success.active.background | --p-button-success-active-background | Success active background of root |
| button.success.border.color | --p-button-success-border-color | Success border color of root |
| button.success.hover.border.color | --p-button-success-hover-border-color | Success hover border color of root |
| button.success.active.border.color | --p-button-success-active-border-color | Success active border color of root |
| button.success.color | --p-button-success-color | Success color of root |
| button.success.hover.color | --p-button-success-hover-color | Success hover color of root |
| button.success.active.color | --p-button-success-active-color | Success active color of root |
| button.success.focus.ring.color | --p-button-success-focus-ring-color | Success focus ring color of root |
| button.success.focus.ring.shadow | --p-button-success-focus-ring-shadow | Success focus ring shadow of root |
| button.warn.background | --p-button-warn-background | Warn background of root |
| button.warn.hover.background | --p-button-warn-hover-background | Warn hover background of root |
| button.warn.active.background | --p-button-warn-active-background | Warn active background of root |
| button.warn.border.color | --p-button-warn-border-color | Warn border color of root |
| button.warn.hover.border.color | --p-button-warn-hover-border-color | Warn hover border color of root |
| button.warn.active.border.color | --p-button-warn-active-border-color | Warn active border color of root |
| button.warn.color | --p-button-warn-color | Warn color of root |
| button.warn.hover.color | --p-button-warn-hover-color | Warn hover color of root |
| button.warn.active.color | --p-button-warn-active-color | Warn active color of root |
| button.warn.focus.ring.color | --p-button-warn-focus-ring-color | Warn focus ring color of root |
| button.warn.focus.ring.shadow | --p-button-warn-focus-ring-shadow | Warn focus ring shadow of root |
| button.help.background | --p-button-help-background | Help background of root |
| button.help.hover.background | --p-button-help-hover-background | Help hover background of root |
| button.help.active.background | --p-button-help-active-background | Help active background of root |
| button.help.border.color | --p-button-help-border-color | Help border color of root |
| button.help.hover.border.color | --p-button-help-hover-border-color | Help hover border color of root |
| button.help.active.border.color | --p-button-help-active-border-color | Help active border color of root |
| button.help.color | --p-button-help-color | Help color of root |
| button.help.hover.color | --p-button-help-hover-color | Help hover color of root |
| button.help.active.color | --p-button-help-active-color | Help active color of root |
| button.help.focus.ring.color | --p-button-help-focus-ring-color | Help focus ring color of root |
| button.help.focus.ring.shadow | --p-button-help-focus-ring-shadow | Help focus ring shadow of root |
| button.danger.background | --p-button-danger-background | Danger background of root |
| button.danger.hover.background | --p-button-danger-hover-background | Danger hover background of root |
| button.danger.active.background | --p-button-danger-active-background | Danger active background of root |
| button.danger.border.color | --p-button-danger-border-color | Danger border color of root |
| button.danger.hover.border.color | --p-button-danger-hover-border-color | Danger hover border color of root |
| button.danger.active.border.color | --p-button-danger-active-border-color | Danger active border color of root |
| button.danger.color | --p-button-danger-color | Danger color of root |
| button.danger.hover.color | --p-button-danger-hover-color | Danger hover color of root |
| button.danger.active.color | --p-button-danger-active-color | Danger active color of root |
| button.danger.focus.ring.color | --p-button-danger-focus-ring-color | Danger focus ring color of root |
| button.danger.focus.ring.shadow | --p-button-danger-focus-ring-shadow | Danger focus ring shadow of root |
| button.contrast.background | --p-button-contrast-background | Contrast background of root |
| button.contrast.hover.background | --p-button-contrast-hover-background | Contrast hover background of root |
| button.contrast.active.background | --p-button-contrast-active-background | Contrast active background of root |
| button.contrast.border.color | --p-button-contrast-border-color | Contrast border color of root |
| button.contrast.hover.border.color | --p-button-contrast-hover-border-color | Contrast hover border color of root |
| button.contrast.active.border.color | --p-button-contrast-active-border-color | Contrast active border color of root |
| button.contrast.color | --p-button-contrast-color | Contrast color of root |
| button.contrast.hover.color | --p-button-contrast-hover-color | Contrast hover color of root |
| button.contrast.active.color | --p-button-contrast-active-color | Contrast active color of root |
| button.contrast.focus.ring.color | --p-button-contrast-focus-ring-color | Contrast focus ring color of root |
| button.contrast.focus.ring.shadow | --p-button-contrast-focus-ring-shadow | Contrast focus ring shadow of root |
| button.outlined.primary.hover.background | --p-button-outlined-primary-hover-background | Primary hover background of outlined |
| button.outlined.primary.active.background | --p-button-outlined-primary-active-background | Primary active background of outlined |
| button.outlined.primary.border.color | --p-button-outlined-primary-border-color | Primary border color of outlined |
| button.outlined.primary.color | --p-button-outlined-primary-color | Primary color of outlined |
| button.outlined.secondary.hover.background | --p-button-outlined-secondary-hover-background | Secondary hover background of outlined |
| button.outlined.secondary.active.background | --p-button-outlined-secondary-active-background | Secondary active background of outlined |
| button.outlined.secondary.border.color | --p-button-outlined-secondary-border-color | Secondary border color of outlined |
| button.outlined.secondary.color | --p-button-outlined-secondary-color | Secondary color of outlined |
| button.outlined.success.hover.background | --p-button-outlined-success-hover-background | Success hover background of outlined |
| button.outlined.success.active.background | --p-button-outlined-success-active-background | Success active background of outlined |
| button.outlined.success.border.color | --p-button-outlined-success-border-color | Success border color of outlined |
| button.outlined.success.color | --p-button-outlined-success-color | Success color of outlined |
| button.outlined.info.hover.background | --p-button-outlined-info-hover-background | Info hover background of outlined |
| button.outlined.info.active.background | --p-button-outlined-info-active-background | Info active background of outlined |
| button.outlined.info.border.color | --p-button-outlined-info-border-color | Info border color of outlined |
| button.outlined.info.color | --p-button-outlined-info-color | Info color of outlined |
| button.outlined.warn.hover.background | --p-button-outlined-warn-hover-background | Warn hover background of outlined |
| button.outlined.warn.active.background | --p-button-outlined-warn-active-background | Warn active background of outlined |
| button.outlined.warn.border.color | --p-button-outlined-warn-border-color | Warn border color of outlined |
| button.outlined.warn.color | --p-button-outlined-warn-color | Warn color of outlined |
| button.outlined.help.hover.background | --p-button-outlined-help-hover-background | Help hover background of outlined |
| button.outlined.help.active.background | --p-button-outlined-help-active-background | Help active background of outlined |
| button.outlined.help.border.color | --p-button-outlined-help-border-color | Help border color of outlined |
| button.outlined.help.color | --p-button-outlined-help-color | Help color of outlined |
| button.outlined.danger.hover.background | --p-button-outlined-danger-hover-background | Danger hover background of outlined |
| button.outlined.danger.active.background | --p-button-outlined-danger-active-background | Danger active background of outlined |
| button.outlined.danger.border.color | --p-button-outlined-danger-border-color | Danger border color of outlined |
| button.outlined.danger.color | --p-button-outlined-danger-color | Danger color of outlined |
| button.outlined.contrast.hover.background | --p-button-outlined-contrast-hover-background | Contrast hover background of outlined |
| button.outlined.contrast.active.background | --p-button-outlined-contrast-active-background | Contrast active background of outlined |
| button.outlined.contrast.border.color | --p-button-outlined-contrast-border-color | Contrast border color of outlined |
| button.outlined.contrast.color | --p-button-outlined-contrast-color | Contrast color of outlined |
| button.outlined.plain.hover.background | --p-button-outlined-plain-hover-background | Plain hover background of outlined |
| button.outlined.plain.active.background | --p-button-outlined-plain-active-background | Plain active background of outlined |
| button.outlined.plain.border.color | --p-button-outlined-plain-border-color | Plain border color of outlined |
| button.outlined.plain.color | --p-button-outlined-plain-color | Plain color of outlined |
| button.text.primary.hover.background | --p-button-text-primary-hover-background | Primary hover background of text |
| button.text.primary.active.background | --p-button-text-primary-active-background | Primary active background of text |
| button.text.primary.color | --p-button-text-primary-color | Primary color of text |
| button.text.secondary.hover.background | --p-button-text-secondary-hover-background | Secondary hover background of text |
| button.text.secondary.active.background | --p-button-text-secondary-active-background | Secondary active background of text |
| button.text.secondary.color | --p-button-text-secondary-color | Secondary color of text |
| button.text.success.hover.background | --p-button-text-success-hover-background | Success hover background of text |
| button.text.success.active.background | --p-button-text-success-active-background | Success active background of text |
| button.text.success.color | --p-button-text-success-color | Success color of text |
| button.text.info.hover.background | --p-button-text-info-hover-background | Info hover background of text |
| button.text.info.active.background | --p-button-text-info-active-background | Info active background of text |
| button.text.info.color | --p-button-text-info-color | Info color of text |
| button.text.warn.hover.background | --p-button-text-warn-hover-background | Warn hover background of text |
| button.text.warn.active.background | --p-button-text-warn-active-background | Warn active background of text |
| button.text.warn.color | --p-button-text-warn-color | Warn color of text |
| button.text.help.hover.background | --p-button-text-help-hover-background | Help hover background of text |
| button.text.help.active.background | --p-button-text-help-active-background | Help active background of text |
| button.text.help.color | --p-button-text-help-color | Help color of text |
| button.text.danger.hover.background | --p-button-text-danger-hover-background | Danger hover background of text |
| button.text.danger.active.background | --p-button-text-danger-active-background | Danger active background of text |
| button.text.danger.color | --p-button-text-danger-color | Danger color of text |
| button.text.contrast.hover.background | --p-button-text-contrast-hover-background | Contrast hover background of text |
| button.text.contrast.active.background | --p-button-text-contrast-active-background | Contrast active background of text |
| button.text.contrast.color | --p-button-text-contrast-color | Contrast color of text |
| button.text.plain.hover.background | --p-button-text-plain-hover-background | Plain hover background of text |
| button.text.plain.active.background | --p-button-text-plain-active-background | Plain active background of text |
| button.text.plain.color | --p-button-text-plain-color | Plain color of text |
| button.link.color | --p-button-link-color | Color of link |
| button.link.hover.color | --p-button-link-hover-color | Hover color of link |
| button.link.active.color | --p-button-link-active-color | Active color of link |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Card

Card is a flexible container component.


## Usage

```tsx
import { Card } from 'primereact/card';
```

```tsx
<Button>Button</Button>
```

## Examples

### With Form

Use `Card`, `Card.Body`, `Card.Caption`, `Card.Title`, `Card.Subtitle`, `Card.Content`, `Card.Footer`, to create a simple card.

```tsx
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';

export default function BasicDemo() {
    return (
        <Card className="mb-4 max-w-sm mx-auto p-1.5">
            <Card.Body className="space-y-4">
                <Card.Caption>
                    <Card.Title>Welcome back</Card.Title>
                    <Card.Subtitle>Sign in with your email to continue.</Card.Subtitle>
                </Card.Caption>
                <Card.Content>
                    <form className="space-y-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <InputText id="email" type="email" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="flex-1">
                                    Password
                                </Label>
                                <Button as={Link} href="/forgot-password" variant="link" className="p-0">
                                    Forgot password?
                                </Button>
                            </div>
                            <InputText id="password" type="password" />
                        </div>
                    </form>
                </Card.Content>
                <Card.Footer className="flex flex-col gap-4">
                    <Button>Login</Button>
                    <Button severity="secondary" variant="outlined">
                        Login with Google
                    </Button>
                    <div className="mt-2 text-center text-surface-500">
                        Don’t have an account?{' '}
                        <Button as={Link} href="/signup" variant="link" className="p-0">
                            Sign up
                        </Button>
                    </div>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
}

```

### Advanced

Use `Card.Header` to place an image, avatar or other content in the header.

```tsx
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

export default function AdvancedDemo() {
    return (
        <Card className="max-w-sm mx-auto overflow-hidden mb-4">
            <Card.Header className="relative">
                <img
                    className="w-full max-h-48 object-cover"
                    alt="user header"
                    src="https://images.unsplash.com/photo-1513649718256-1a7162666bad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Avatar shape="circle" className="w-28 h-28 border-3 border-surface-0 dark:border-surface-900 absolute -bottom-14 left-4 z-10">
                    <Avatar.Image className="object-cover" src="https://images.unsplash.com/photo-1722495178488-c8056c4ec2c0?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </Avatar>
            </Card.Header>
            <Card.Body className="pt-16">
                <Card.Caption>
                    <Card.Title className="font-bold text-2xl">Sakura Fresh Market</Card.Title>
                    <div className="flex items-center gap-2">
                        <Tag className="w-fit" severity="info">
                            Daily
                        </Tag>
                        <Tag className="w-fit" severity="info">
                            Premium
                        </Tag>
                    </div>
                </Card.Caption>
                <Card.Content className="space-y-4">
                    <p>Sakura Fresh Market is your go-to store for fresh local produce, Japanese snacks, and daily essentials — all in one place!</p>
                    <div className="flex items-center gap-2">
                        <i className="pi pi-star-fill text-yellow-500"></i>
                        <span>
                            <b>4.6</b> (200+ reviews)
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <i className="pi pi-map-marker"></i>
                        <span>Tokyo, Shibuya-ku</span>
                    </div>
                </Card.Content>
                <Card.Footer className="flex items-center gap-2 mt-4">
                    <Button className="flex-1" severity="secondary" variant="outlined">
                        <i className="pi pi-phone"></i>
                        Call Us
                    </Button>
                    <Button className="flex-1">
                        <i className="pi pi-globe"></i>
                        Visit Site
                    </Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
}

```


# Checkbox API

API documentation for Checkbox component


## Checkbox

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: CheckboxInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: CheckboxInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<CheckboxPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: CheckboxInstance) => ReactNode) | null | The children to render. |
| value | unknown | null | Value of the checkbox. |
| name | string | null | The name of the checkbox. |
| size | "small" \\| "large" \\| "normal" | null | Defines the size of the checkbox. |
| variant | "outlined" \\| "filled" | null | Specifies the input variant of the component. |
| disabled | boolean | false | When present, it specifies that the element should be disabled. |
| readOnly | boolean | false | When present, it specifies that an input field is read-only. |
| required | boolean | false | When present, it specifies that the element is required. |
| invalid | boolean | false | When present, it specifies that the component should have invalid state style. |
| inputId | string | null | Identifier of the underlying input element. |
| inputStyle | CSSProperties | null | Inline style of the input field. |
| inputClassName | string | null | Style class of the input field. |
| ariaLabel | string | null | Establishes a string value that labels the component. |
| ariaLabelledby | string | null | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| onFocus | (event: FocusEvent<HTMLInputElement>) => void | null | Callback function that is called when the checkbox is focused. |
| onBlur | (event: FocusEvent<HTMLInputElement>) => void | null | Callback function that is called when the checkbox loses focus. |
| onCheckedChange | (event: CheckboxChangeEvent) => void | null | Callback fired when the checkbox's checked state changes. |
| checked | boolean | null | When present, it specifies the input's checked state. |
| defaultChecked | boolean | null | The default value for the input when not controlled by  `checked`  and  `onCheckedChange` . |
| indeterminate | boolean | false | When present, it specifies input state as indeterminate. |
| trueValue | string \\| number \\| boolean | true | Value in checked state. |
| falseValue | string \\| number \\| boolean | false | Value in unchecked state. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| checked | boolean | null | The checked state of the useCheckbox. |
| indeterminate | boolean | null | The indeterminate state of the useCheckbox. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| group | CheckboxGroupInstance | null | The group instance of the checkbox. |
| state | useCheckboxState | null | The state of the useCheckbox. |
| onChange | (event: useCheckboxChangeEvent) => void | null | Callback fired when the useCheckbox's checked state changes. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.checkbox.events.CheckboxChangeEvent | CheckboxChangeEvent | Event fired when the checkbox's checked state changes. |  | [object Object],[object Object],[object Object] |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Checkbox component. | [object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Checkbox component. | [object Object] |


## CheckboxGroup

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: CheckboxGroupInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: CheckboxGroupInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<CheckboxGroupPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: CheckboxGroupInstance) => ReactNode) | null | The children to render. |
| value | unknown[] | null | Value of the checkbox group. |
| defaultValue | unknown[] | null | The default value of the checkbox group. |
| name | string | null | The name of the checkboxes. |
| disabled | boolean | false | When present, it specifies that the checkbox group should be disabled. |
| invalid | boolean | false | When present, it specifies that the checkbox group is invalid. |
| onValueChange | (event: CheckboxGroupValueChangeEvent) => void | null | Callback function that is called when the checkbox group value changes. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | unknown[] | null | Value of the checkbox group. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | CheckboxGroupState | null | The state of the checkbox group. |
| updateChange | (event: CheckboxGroupUpdateChangeEvent) => void | null | Updates the value of the checkbox group. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.checkboxgroup.events.CheckboxGroupValueChangeEvent | CheckboxGroupValueChangeEvent | Event fired when the checkbox group's value changes. |  | [object Object] |
| api.checkboxgroup.events.CheckboxGroupUpdateChangeEvent | CheckboxGroupUpdateChangeEvent | Used to update the checkbox group value. |  | [object Object],[object Object],[object Object] |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Checkbox component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of CheckboxGroup component. | [object Object] |


## useCheckbox

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| checked | boolean | null | When present, it specifies the input's checked state. |
| defaultChecked | boolean | null | The default value for the input when not controlled by  `checked`  and  `onCheckedChange` . |
| indeterminate | boolean | false | When present, it specifies input state as indeterminate. |
| trueValue | string \\| number \\| boolean | true | Value in checked state. |
| falseValue | string \\| number \\| boolean | false | Value in unchecked state. |
| onCheckedChange | (event: useCheckboxChangeEvent) => void | null | Callback fired when the checkbox's checked state changes. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| checked | boolean | null | The checked state of the useCheckbox. |
| indeterminate | boolean | null | The indeterminate state of the useCheckbox. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useCheckboxState | null | The state of the useCheckbox. |
| onChange | (event: useCheckboxChangeEvent) => void | null | Callback fired when the useCheckbox's checked state changes. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.usecheckbox.events.useCheckboxChangeEvent | useCheckboxChangeEvent | Event fired when the checkbox's checked state changes. |  | [object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useCheckbox headless. | [object Object] |



# Checkbox

Checkbox is an extension to standard checkbox element with theming.


## Usage

```tsx
import { Checkbox } from 'primereact/checkbox';
```

```tsx
<Checkbox.Group>
    <Checkbox />
</Checkbox.Group>
```

## Examples

### Basic

```tsx
import { Checkbox } from 'primereact/checkbox';

const BasicDemo = () => {
    return (
        <div className="card flex items-center justify-center">
            <div className="flex items-center gap-2">
                <Checkbox inputId="basic-checkbox" />
                <label htmlFor="basic-checkbox">
                    I accept the <a className="font-semibold">Terms of Service</a>
                </label>
            </div>
        </div>
    );
};

export default BasicDemo;

```

### Group

Use the `Checkbox.Group` component with `value` and `onValueChange` props to control the selected state of checkboxes.

```tsx
'use client';
import type { CheckboxGroupValueChangeEvent } from '@primereact/types/shared/checkbox';
import { Checkbox } from 'primereact/checkbox';
import React from 'react';

export default function GroupDemo() {
    const [value, setValue] = React.useState<string[]>();

    return (
        <div className="card flex items-center justify-center">
            <Checkbox.Group defaultValue={['Cheese']} value={value} onValueChange={(e: CheckboxGroupValueChangeEvent) => setValue(e.value as string[])} className="gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <Checkbox inputId="cheese" value="Cheese" />
                    <label htmlFor="cheese">Cheese</label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox inputId="mushroom" value="Mushroom" />
                    <label htmlFor="mushroom">Mushroom</label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox inputId="pepper" value="Pepper" />
                    <label htmlFor="pepper">Pepper</label>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox inputId="onion" value="Onion" />
                    <label htmlFor="onion">Onion</label>
                </div>
            </Checkbox.Group>
        </div>
    );
}

```

### Dynamic

Checkboxes can be generated using a list of values.

```tsx
'use client';
import type { CheckboxGroupValueChangeEvent } from '@primereact/types/shared/checkbox';
import { Checkbox } from 'primereact/checkbox';
import React from 'react';

export default function DynamicDemo() {
    const [value, setValue] = React.useState<string[]>([]);
    const categories = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];

    return (
        <div className="card flex items-center justify-center">
            <Checkbox.Group value={value} onValueChange={(e: CheckboxGroupValueChangeEvent) => setValue(e.value as string[])} className="flex-col gap-4">
                {categories.map((category) => (
                    <div key={category.key} className="flex items-center gap-2">
                        <Checkbox inputId={category.key} value={category.key} />
                        <label htmlFor={category.key}>{category.name}</label>
                    </div>
                ))}
            </Checkbox.Group>
        </div>
    );
}

```

### Card

Checkboxes can be displayed in a card format.

```tsx
'use client';
import type { CheckboxGroupValueChangeEvent } from '@primereact/types/shared/checkbox';
import { Checkbox } from 'primereact/checkbox';
import React from 'react';

const interests = [
    {
        id: 'tech',
        title: '💻 Technology',
        description: 'Latest updates in software, gadgets, and innovation.'
    },
    {
        id: 'design',
        title: '🎨 Design',
        description: 'UI/UX trends, graphic design tips, and creativity.'
    },
    {
        id: 'finance',
        title: '💰 Finance',
        description: 'Investing, saving, and crypto news.'
    }
];

export default function CardDemo() {
    const [value, setValue] = React.useState<string[]>([]);

    return (
        <div className="card flex items-center justify-center">
            <div className="max-w-3xl ">
                <div className=" font-semibold leading-none">Select your interests</div>
                <Checkbox.Group value={value} onValueChange={(e: CheckboxGroupValueChangeEvent) => setValue(e.value as string[])} className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                    {interests.map((interest) => (
                        <label
                            key={interest.id}
                            className={`flex-1 flex items-start gap-4 p-4 rounded-md border border-surface-200 dark:border-surface-800 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer ${value.includes(interest.id) ? '!border-primary' : ''}`}
                        >
                            <Checkbox key={interest.id} value={interest.id} />
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="text-lg font-semibold leading-none">{interest.title}</div>
                                <div className="text-sm text-surface-500">{interest.description}</div>
                            </div>
                        </label>
                    ))}
                </Checkbox.Group>
            </div>
        </div>
    );
}

```

### Indeterminate

Use the `indeterminate` property to display an indeterminate state.

```tsx
'use client';
import type { CheckboxChangeEvent, CheckboxGroupValueChangeEvent } from '@primereact/types/shared/checkbox';
import { Checkbox } from 'primereact/checkbox';
import React from 'react';

const categories = [
    { name: 'Product updates', key: 'product-updates' },
    { name: 'Weekly newsletter', key: 'weekly-newsletter' },
    { name: 'Security alerts', key: 'security-alerts' }
];

export default function IndeterminateDemo() {
    const [value, setValue] = React.useState<string[]>([]);

    const isAllSelected = categories.every((category) => value.includes(category.key));
    const indeterminate = categories.some((category) => value.includes(category.key)) && !isAllSelected;

    return (
        <div className="card flex items-center justify-center">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Checkbox inputId="indeterminate-checkbox" indeterminate={indeterminate} checked={isAllSelected} onCheckedChange={(e: CheckboxChangeEvent) => setValue(e.checked ? categories.map((category) => category.key) : [])} />
                    <label htmlFor="indeterminate-checkbox">Email Notifications</label>
                </div>
                <Checkbox.Group value={value} onValueChange={(e: CheckboxGroupValueChangeEvent) => setValue(e.value as string[])} className="flex-col gap-4 pl-7">
                    {categories.map((item) => (
                        <div key={item.key} className="flex items-center gap-2">
                            <Checkbox inputId={item.key} value={item.key} />
                            <label htmlFor={item.key}>{item.name}</label>
                        </div>
                    ))}
                </Checkbox.Group>
            </div>
        </div>
    );
}

```

### Sizes

Use the `size` property to change the size of a checkbox.

```tsx
import { Checkbox } from 'primereact/checkbox';

export default function SizesDemo() {
    return (
        <div className="card flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
                <Checkbox inputId="small" size="small" />
                <label htmlFor="small" className="text-sm">
                    Small
                </label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox inputId="normal" size="normal" />
                <label htmlFor="normal">Normal</label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox inputId="large" size="large" />
                <label htmlFor="large" className="text-lg">
                    Large
                </label>
            </div>
        </div>
    );
}

```

### Filled

Specify the `filled` property to display the component with a higher visual emphasis than the default outlined style.

```tsx
import { Checkbox } from 'primereact/checkbox';

export default function FilledDemo() {
    return (
        <div className="card flex items-center justify-center">
            <div className="flex items-center gap-2">
                <Checkbox inputId="filled" variant="filled" />
                <label htmlFor="filled">Filled</label>
            </div>
        </div>
    );
}

```

### Disabled

Use the `disabled` property to disable a checkbox.

```tsx
import { Checkbox } from 'primereact/checkbox';

export default function DisabledDemo() {
    return (
        <div className="card flex items-center justify-center gap-4">
            <Checkbox inputId="disabled" disabled />
            <Checkbox inputId="disabled" disabled checked />
        </div>
    );
}

```

### Invalid

Specify the `invalid` property to display the component with a red border.

```tsx
import { Checkbox } from 'primereact/checkbox';

export default function InvalidDemo() {
    return (
        <div className="card flex items-center justify-center">
            <div className="flex items-center gap-2">
                <Checkbox inputId="invalid" invalid />
                <label htmlFor="invalid" className="text-red-500 dark:text-red-400">
                    Invalid
                </label>
            </div>
        </div>
    );
}

```


# Checkbox Pass Through

Pass Through documentation for Checkbox component


## Viewer

Some sections may not be visible due to the availability of the particular feature. Section names that start with the pc prefix indicate that the element is a PrimeReact component not a DOM element.

<DocPTViewer name="checkbox-pt" components={['Checkbox', 'CheckboxGroup']} />

## Checkbox PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | CheckboxPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| input | CheckboxPassThroughType<InputHTMLAttributes<HTMLInputElement>> | Used to pass attributes to the input's DOM element. |
| box | CheckboxPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the box's DOM element. |
| icon | CheckboxPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the icon's DOM element. |


## CheckboxGroup PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | CheckboxGroupPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Checkbox Theming

Theming documentation for Checkbox component


## Styled

### Checkbox CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-checkbox | Class name of the root element |
| p-checkbox-box | Class name of the box element |
| p-checkbox-input | Class name of the input element |
| p-checkbox-icon | Class name of the icon element |


### CheckboxGroup CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-checkbox-group | Class name of the root element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| checkbox.border.radius | --p-checkbox-border-radius | Border radius of root |
| checkbox.width | --p-checkbox-width | Width of root |
| checkbox.height | --p-checkbox-height | Height of root |
| checkbox.background | --p-checkbox-background | Background of root |
| checkbox.checked.background | --p-checkbox-checked-background | Checked background of root |
| checkbox.checked.hover.background | --p-checkbox-checked-hover-background | Checked hover background of root |
| checkbox.disabled.background | --p-checkbox-disabled-background | Disabled background of root |
| checkbox.filled.background | --p-checkbox-filled-background | Filled background of root |
| checkbox.border.color | --p-checkbox-border-color | Border color of root |
| checkbox.hover.border.color | --p-checkbox-hover-border-color | Hover border color of root |
| checkbox.focus.border.color | --p-checkbox-focus-border-color | Focus border color of root |
| checkbox.checked.border.color | --p-checkbox-checked-border-color | Checked border color of root |
| checkbox.checked.hover.border.color | --p-checkbox-checked-hover-border-color | Checked hover border color of root |
| checkbox.checked.focus.border.color | --p-checkbox-checked-focus-border-color | Checked focus border color of root |
| checkbox.checked.disabled.border.color | --p-checkbox-checked-disabled-border-color | Checked disabled border color of root |
| checkbox.invalid.border.color | --p-checkbox-invalid-border-color | Invalid border color of root |
| checkbox.shadow | --p-checkbox-shadow | Shadow of root |
| checkbox.focus.ring.width | --p-checkbox-focus-ring-width | Focus ring width of root |
| checkbox.focus.ring.style | --p-checkbox-focus-ring-style | Focus ring style of root |
| checkbox.focus.ring.color | --p-checkbox-focus-ring-color | Focus ring color of root |
| checkbox.focus.ring.offset | --p-checkbox-focus-ring-offset | Focus ring offset of root |
| checkbox.focus.ring.shadow | --p-checkbox-focus-ring-shadow | Focus ring shadow of root |
| checkbox.transition.duration | --p-checkbox-transition-duration | Transition duration of root |
| checkbox.sm.width | --p-checkbox-sm-width | Sm width of root |
| checkbox.sm.height | --p-checkbox-sm-height | Sm height of root |
| checkbox.lg.width | --p-checkbox-lg-width | Lg width of root |
| checkbox.lg.height | --p-checkbox-lg-height | Lg height of root |
| checkbox.icon.size | --p-checkbox-icon-size | Size of icon |
| checkbox.icon.color | --p-checkbox-icon-color | Color of icon |
| checkbox.icon.checked.color | --p-checkbox-icon-checked-color | Checked color of icon |
| checkbox.icon.checked.hover.color | --p-checkbox-icon-checked-hover-color | Checked hover color of icon |
| checkbox.icon.disabled.color | --p-checkbox-icon-disabled-color | Disabled color of icon |
| checkbox.icon.sm.size | --p-checkbox-icon-sm-size | Sm size of icon |
| checkbox.icon.lg.size | --p-checkbox-icon-lg-size | Lg size of icon |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Chip API

API documentation for Chip component


## Chip

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ChipInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ChipInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ChipPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ChipInstance) => ReactNode) | null | The children to render. |
| onRemove | (event: useChipRemoveEvent) => void | null | Callback fired when the chip is removed. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| visible | boolean | null | The visibility state of the chip. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useChipState | null | The state of the useChip. |
| close | (event: SyntheticEvent<HTMLElement>) => void | null | Closes the chip. |
| removeIconProps | { onKeyDown: (event: KeyboardEvent<HTMLElement>) => void } | null | Props for the remove icon. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Chip component. | [object Object],[object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Chip component. | [object Object] |


## ChipIcon

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ChipIconInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ChipIconInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ChipIconPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ChipIconInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

<DocTable name="ChipIcon" category="api" type="state" />

### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| chip | ChipInstance | null | The Chip component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ChipIcon component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ChipIcon component. | [object Object] |


## ChipLabel

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ChipLabelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ChipLabelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ChipLabelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ChipLabelInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| chip | ChipInstance | null | The Chip component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ChipLabel component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ChipLabel component. | [object Object] |


## ChipImage

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ChipImageInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ChipImageInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ChipImagePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ChipImageInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| chip | ChipInstance | null | The Chip component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ChipImage component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ChipImage component. | [object Object] |


## ChipRemoveIcon

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ChipRemoveIconInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ChipRemoveIconInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ChipRemoveIconPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ChipRemoveIconInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| chip | ChipInstance | null | The Chip component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ChipRemoveIcon component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ChipRemoveIcon component. | [object Object] |


## useChip

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| onRemove | (event: useChipRemoveEvent) => void | null | Callback fired when the chip is removed. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| visible | boolean | null | The visibility state of the chip. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useChipState | null | The state of the useChip. |
| close | (event: SyntheticEvent<HTMLElement>) => void | null | Closes the chip. |
| removeIconProps | { onKeyDown: (event: KeyboardEvent<HTMLElement>) => void } | null | Props for the remove icon. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.usechip.events.useChipRemoveEvent | useChipRemoveEvent | Event fired when the chip's remove icon is clicked. |  | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useChip headless. | [object Object] |



# Chip

Chip represents entities using icons, labels and images.


## Usage

```tsx
import { Chip } from 'primereact/chip';
```

```tsx
<Chip>
    <Chip.Label>Chip</Chip.Label>
</Chip>
```

## Examples

### Basic

A basic chip with a text is created with the _Chip.Label_ component. In addition when <i>Chip.RemoveIcon</i> is added, a delete icon is displayed to remove a chip.

```tsx
import { Chip } from 'primereact/chip';

export default function BasicDemo() {
    return (
        <div className="card flex flex-wrap gap-2">
            <Chip>
                <Chip.Label>Action</Chip.Label>
            </Chip>
            <Chip>
                <Chip.Label>Comedy</Chip.Label>
            </Chip>
            <Chip>
                <Chip.Label>Mystery</Chip.Label>
            </Chip>
            <Chip>
                <Chip.Label>Thriller</Chip.Label>
                <Chip.RemoveIcon />
            </Chip>
        </div>
    );
}

```

### Icon

A font icon next to the label can be displayed with the _className_ property.

```tsx
import { Chip } from 'primereact/chip';

export default function IconDemo() {
    return (
        <div className="card flex flex-wrap gap-2">
            <Chip>
                <Chip.Icon className="pi pi-apple" />
                <Chip.Label>Apple</Chip.Label>
            </Chip>
            <Chip>
                <Chip.Icon className="pi pi-facebook" />
                <Chip.Label>Facebook</Chip.Label>
            </Chip>
            <Chip>
                <Chip.Icon className="pi pi-google" />
                <Chip.Label>Google</Chip.Label>
            </Chip>
            <Chip>
                <Chip.Icon className="pi pi-microsoft" />
                <Chip.Label>Microsoft</Chip.Label>
                <Chip.RemoveIcon />
            </Chip>
            <Chip>
                <Chip.Icon className="pi pi-github" />
                <Chip.Label>GitHub</Chip.Label>
                <Chip.RemoveIcon asChild>
                    <i className="pi pi-minus-circle" />
                </Chip.RemoveIcon>
            </Chip>
        </div>
    );
}

```

### Image

The _Chip.Image_ is used to display an image like an avatar.

```tsx
import { Chip } from 'primereact/chip';

export default function ImageDemo() {
    return (
        <div className="card flex flex-wrap gap-2">
            <Chip>
                <Chip.Image src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
                <Chip.Label>Amy Elsner</Chip.Label>
            </Chip>
            <Chip>
                <Chip.Image src="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" />
                <Chip.Label>Asiya Javayant</Chip.Label>
            </Chip>
            <Chip>
                <Chip.Image src="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" />
                <Chip.Label>Onyama Limba</Chip.Label>
            </Chip>
            <Chip>
                <Chip.Image src="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" />
                <Chip.Label>Xuxue Feng</Chip.Label>
                <Chip.RemoveIcon />
            </Chip>
        </div>
    );
}

```

### Template

Chip also allows displaying custom content inside a itself.

```tsx
import { Chip } from 'primereact/chip';

export default function TemplateDemo() {
    return (
        <div className="card">
            <Chip className="py-0 pl-0 pr-4">
                <span className="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center">P</span>
                <span className="ml-2 font-medium">PRIME</span>
            </Chip>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Chip uses the `label` property as the default `aria-label`. Any attribute passed to the root element like `aria-labelledby` or `aria-label` can be used to override the default behavior. Removable chips are focusable with the tab key.

### Keyboard Support

| Key       | Function             |
| --------- | -------------------- |
| backspace | Hides removable chip |
| enter     | Hides removable chip |


# Chip Pass Through

Pass Through documentation for Chip component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="chip-pt" components={['Chip']} />

## Chip PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ChipPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| icon | ChipPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the icon's DOM element. |
| image | ChipPassThroughType<HTMLAttributes<HTMLImageElement>> | Used to pass attributes to the image's DOM element. |
| label | ChipPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the label's DOM element. |
| removeIcon | ChipPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the remove icon's DOM element. |



# Chip Theming

Theming documentation for chip component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-chip | Class name of the root element |
| p-chip-image | Class name of the image element |
| p-chip-icon | Class name of the icon element |
| p-chip-label | Class name of the label element |
| p-chip-remove-icon | Class name of the remove icon element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| chip.border.radius | --p-chip-border-radius | Border radius of root |
| chip.padding.x | --p-chip-padding-x | Padding x of root |
| chip.padding.y | --p-chip-padding-y | Padding y of root |
| chip.gap | --p-chip-gap | Gap of root |
| chip.transition.duration | --p-chip-transition-duration | Transition duration of root |
| chip.background | --p-chip-background | Background of root |
| chip.color | --p-chip-color | Color of root |
| chip.image.width | --p-chip-image-width | Width of image |
| chip.image.height | --p-chip-image-height | Height of image |
| chip.icon.size | --p-chip-icon-size | Size of icon |
| chip.icon.color | --p-chip-icon-color | Color of icon |
| chip.remove.icon.size | --p-chip-remove-icon-size | Size of remove icon |
| chip.remove.icon.focus.ring.width | --p-chip-remove-icon-focus-ring-width | Focus ring width of remove icon |
| chip.remove.icon.focus.ring.style | --p-chip-remove-icon-focus-ring-style | Focus ring style of remove icon |
| chip.remove.icon.focus.ring.color | --p-chip-remove-icon-focus-ring-color | Focus ring color of remove icon |
| chip.remove.icon.focus.ring.offset | --p-chip-remove-icon-focus-ring-offset | Focus ring offset of remove icon |
| chip.remove.icon.focus.ring.shadow | --p-chip-remove-icon-focus-ring-shadow | Focus ring shadow of remove icon |
| chip.remove.icon.color | --p-chip-remove-icon-color | Color of remove icon |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# ConfirmDialog API

API documentation for ConfirmDialog component


## ConfirmDialog

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmDialogInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmDialogInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmDialogPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmDialogInstance) => ReactNode) | null | The children to render. |
| modal | boolean | true | Defines if background should be blocked when dialog is displayed. |
| position | "center" \\| "top" \\| "bottom" \\| "left" \\| "right" \\| "topleft" \\| "topright" \\| "bottomleft" \\| "bottomright" | center | Position of the dialog. |
| onOpenChange | (event: ConfirmDialogChangeEvent) => void | null | Callback function that is called when the trigger is clicked. |
| open | boolean | false | Specifies the visibility of the dialog. |
| defaultOpen | boolean | false | Specifies the default visibility of the dialog. |
| draggable | boolean | true | Enables dragging to change the position using header. |
| keepInViewport | boolean | true | Keeps dialog in the viewport. |
| dismissableMask | boolean | false | Specifies if clicking the modal background should hide the dialog. |
| closeOnEscape | boolean | true | Specifies if pressing escape key should hide the dialog. |
| blockScroll | boolean | false | Whether background scroll should be blocked when dialog is visible. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| appendTo | HTMLElement \\| "body" \\| "self" | body | A valid query selector or an HTMLElement to specify where the dialog gets attached. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| opened | boolean | null | Whether the dialog is currently opened. |
| maskVisible | boolean | null | Whether the mask is currently visible. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useDialogState | null | Current state of the dialog. |
| maskRef | RefObject<HTMLDivElement> | null | Reference to the mask element. |
| motionRef | RefObject<{ elementRef: RefObject<HTMLDivElement> }> | null | Reference to the close button element. |
| closeButtonRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the close button element. |
| onOpenStateChange | () => void | null | Method to change the open state of the dialog. |
| close | () => void | null | Method to close the dialog. |
| onMaskMouseDown | (event: MouseEvent) => void | null | Handler for mask mouse down events. |
| onMaskMouseUp | () => void | null | Handler for mask mouse up events. |
| onDragStart | (event: MouseEvent) => void | null | Handler for drag start events. |
| onMotionEnter | () => void | null | Handler for motion enter events. |
| onMotionAfterEnter | () => void | null | Handler for motion after enter events. |
| onMotionBeforeLeave | () => void | null | Handler for motion before leave events. |
| onMotionLeave | () => void | null | Handler for motion leave events. |
| onMotionAfterLeave | () => void | null | Handler for motion after leave events. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmDialog component. | [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmDialog component. | [object Object] |


## ConfirmDialogTrigger

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmDialogTriggerInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmDialogTriggerInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmDialogTriggerPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmDialogTriggerInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmdialog | ConfirmDialogInstance | null | Instance of the ConfirmDialog component. |
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmDialogTrigger component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmDialogTrigger component. | [object Object] |


## ConfirmDialogPortal

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmDialogPortalInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmDialogPortalInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmDialogPortalPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmDialogPortalInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmdialog | ConfirmDialogInstance | null | Instance of the ConfirmDialog component. |
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmDialogPortal component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmDialogPortal component. | [object Object] |


## ConfirmDialogHeader

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmDialogHeaderInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmDialogHeaderInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmDialogHeaderPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmDialogHeaderInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmdialog | ConfirmDialogInstance | null | The ConfirmDialog component instance. |
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmDialogHeader component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmDialogHeader component. | [object Object] |


## ConfirmDialogTitle

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmDialogTitleInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmDialogTitleInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmDialogTitlePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmDialogTitleInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmdialog | ConfirmDialogInstance | null | The ConfirmDialog component instance. |
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmDialogTitle component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmDialogTitle component. | [object Object] |


## ConfirmDialogHeaderActions

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmDialogHeaderActionsInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmDialogHeaderActionsInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmDialogHeaderActionsPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmDialogHeaderActionsInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmdialog | ConfirmDialogInstance | null | The confirmdialog instance that the header actions belong to. |
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmDialogHeaderActions component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmDialogHeaderActions component. | [object Object] |


## ConfirmDialogAction

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmDialogActionInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmDialogActionInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmDialogActionPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmDialogActionInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmdialog | ConfirmDialogInstance | null | Instance of the ConfirmDialog component. |
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmDialogAction component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmDialogAction component. | [object Object] |


## ConfirmDialogClose

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmDialogCloseInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmDialogCloseInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmDialogClosePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmDialogCloseInstance) => ReactNode) | null | The children to render. |
| iconOnly | boolean | true | Whether to show the ConfirmDialogClose with a borderless style. |
| severity | string & {} \\| "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" \\| "help" | 'secondary' | Severity type of the ConfirmDialogClose. |
| variant | "link" \\| "text" \\| "outlined" | 'text' | Variant of the ConfirmDialogClose. |
| rounded | boolean | true | Whether to show the ConfirmDialogClose with a rounded style. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmdialog | ConfirmDialogInstance | null | Instance of the ConfirmDialog component. |
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmDialogClose component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmDialogClose component. | [object Object] |


## ConfirmDialogContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmDialogContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmDialogContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmDialogContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmDialogContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmdialog | ConfirmDialogInstance | null | The ConfirmDialog component instance. |
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmDialogContent component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmDialogContent component. | [object Object] |


## ConfirmDialogFooter

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmDialogFooterInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmDialogFooterInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmDialogFooterPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmDialogFooterInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmdialog | ConfirmDialogInstance | null | The ConfirmDialog component instance. |
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmDialogFooter component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmDialogFooter component. | [object Object] |


## useConfirmDialog

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| modal | boolean | true | Defines if background should be blocked when dialog is displayed. |
| open | boolean | false | Specifies the visibility of the dialog. |
| defaultOpen | boolean | false | Specifies the default visibility of the dialog. |
| draggable | boolean | true | Enables dragging to change the position using header. |
| keepInViewport | boolean | true | Keeps dialog in the viewport. |
| dismissableMask | boolean | false | Specifies if clicking the modal background should hide the dialog. |
| closeOnEscape | boolean | true | Specifies if pressing escape key should hide the dialog. |
| blockScroll | boolean | false | Whether background scroll should be blocked when dialog is visible. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| appendTo | HTMLElement \\| "body" \\| "self" | body | A valid query selector or an HTMLElement to specify where the dialog gets attached. |
| onOpenChange | (event: useDialogChangeEvent) => void | null | Callback function that is called when the trigger is clicked. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| opened | boolean | null | Whether the dialog is currently opened. |
| maskVisible | boolean | null | Whether the mask is currently visible. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useDialogState | null | Current state of the dialog. |
| maskRef | RefObject<HTMLDivElement> | null | Reference to the mask element. |
| motionRef | RefObject<{ elementRef: RefObject<HTMLDivElement> }> | null | Reference to the close button element. |
| closeButtonRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the close button element. |
| onOpenStateChange | () => void | null | Method to change the open state of the dialog. |
| close | () => void | null | Method to close the dialog. |
| onMaskMouseDown | (event: MouseEvent) => void | null | Handler for mask mouse down events. |
| onMaskMouseUp | () => void | null | Handler for mask mouse up events. |
| onDragStart | (event: MouseEvent) => void | null | Handler for drag start events. |
| onMotionEnter | () => void | null | Handler for motion enter events. |
| onMotionAfterEnter | () => void | null | Handler for motion after enter events. |
| onMotionBeforeLeave | () => void | null | Handler for motion before leave events. |
| onMotionLeave | () => void | null | Handler for motion leave events. |
| onMotionAfterLeave | () => void | null | Handler for motion after leave events. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.useconfirmdialog.events.useConfirmDialogChangeEvent | useConfirmDialogChangeEvent | Event fired when the confirmdialog's open state changes. |  | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useConfirmDialog headless. | [object Object] |



# ConfirmDialog

ConfirmDialog uses a Dialog UI


## Usage

```tsx
import { ConfirmDialog } from 'primereact/confirmdialog';
```

```tsx
<ConfirmDialog>
    <ConfirmDialog.Trigger />
    <ConfirmDialog.Portal>
        <ConfirmDialog.Header>
            <ConfirmDialog.Title />
            <ConfirmDialog.HeaderActions>
                <ConfirmDialog.Close />
            </ConfirmDialog.HeaderActions>
        </ConfirmDialog.Header>
        <ConfirmDialog.Content />
        <ConfirmDialog.Footer />
    </ConfirmDialog.Portal>
</ConfirmDialog>
```

## Examples

### Basic

ConfirmDialog is defined using `ConfirmDialog`, `ConfirmDialog.Trigger`, `ConfirmDialog.Portal`, `ConfirmDialog.Header`, `ConfirmDialog.Content` and `ConfirmDialog.Footer` components.

```tsx
import { ConfirmDialog } from 'primereact/confirmdialog';

export default function BasicDemo() {
    return (
        <div className="card flex flex-wrap gap-2 justify-center">
            <ConfirmDialog>
                <ConfirmDialog.Trigger variant="outlined">Save</ConfirmDialog.Trigger>
                <ConfirmDialog.Portal>
                    <ConfirmDialog.Header>
                        <ConfirmDialog.Title>Edit Profile</ConfirmDialog.Title>
                        <ConfirmDialog.Close />
                    </ConfirmDialog.Header>
                    <ConfirmDialog.Content>
                        <ConfirmDialog.Icon className="pi pi-exclamation-triangle" />
                        <ConfirmDialog.Message>Are you sure you want to proceed?</ConfirmDialog.Message>
                    </ConfirmDialog.Content>
                    <ConfirmDialog.Footer>
                        <ConfirmDialog.Cancel variant="outlined">Cancel</ConfirmDialog.Cancel>
                        <ConfirmDialog.Action>Save</ConfirmDialog.Action>
                    </ConfirmDialog.Footer>
                </ConfirmDialog.Portal>
            </ConfirmDialog>
            <ConfirmDialog>
                <ConfirmDialog.Trigger severity="danger" variant="outlined">
                    Delete
                </ConfirmDialog.Trigger>
                <ConfirmDialog.Portal>
                    <ConfirmDialog.Header>
                        <ConfirmDialog.Title>Danger Zone</ConfirmDialog.Title>
                        <ConfirmDialog.Close />
                    </ConfirmDialog.Header>
                    <ConfirmDialog.Content>
                        <ConfirmDialog.Icon className="pi pi-exclamation-triangle" />
                        <ConfirmDialog.Message>Do you want to delete this record?</ConfirmDialog.Message>
                    </ConfirmDialog.Content>
                    <ConfirmDialog.Footer>
                        <ConfirmDialog.Cancel variant="outlined">Cancel</ConfirmDialog.Cancel>
                        <ConfirmDialog.Action severity="danger">Delete</ConfirmDialog.Action>
                    </ConfirmDialog.Footer>
                </ConfirmDialog.Portal>
            </ConfirmDialog>
        </div>
    );
}

```

### Position

The position of the confirmdialog can be customized with the `position` property. The available values are `top`, `top-left`, `top-right`, `bottom`, `bottom-left`, `bottom-right`, `left`, `right`, and `center`.

```tsx
import { ConfirmDialogChangeEvent, ConfirmDialogProps } from '@primereact/types/shared/confirmdialog';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import * as React from 'react';

export default function PositionDemo() {
    const [open, setOpen] = React.useState<boolean>(false);
    const [position, setPosition] = React.useState<ConfirmDialogProps['position']>('center');

    const openPosition = (position: ConfirmDialogProps['position']) => {
        setOpen(true);
        setPosition(position);
    };

    return (
        <div className="card">
            <div className="flex flex-wrap justify-center gap-2 mb-2">
                <Button onClick={() => openPosition('left')} severity="secondary" style={{ minWidth: '10rem' }}>
                    Left
                    <i className="pi pi-arrow-right" />
                </Button>
                <Button onClick={() => openPosition('right')} severity="secondary" style={{ minWidth: '10rem' }}>
                    Right
                    <i className="pi pi-arrow-left" />
                </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-2">
                <Button onClick={() => openPosition('topleft')} severity="secondary" style={{ minWidth: '10rem' }}>
                    TopLeft
                    <i className="pi pi-arrow-down-right" />
                </Button>
                <Button onClick={() => openPosition('top')} severity="secondary" style={{ minWidth: '10rem' }}>
                    Top
                    <i className="pi pi-arrow-down" />
                </Button>
                <Button onClick={() => openPosition('topright')} severity="secondary" style={{ minWidth: '10rem' }}>
                    TopRight
                    <i className="pi pi-arrow-down-left" />
                </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={() => openPosition('bottomleft')} severity="secondary" style={{ minWidth: '10rem' }}>
                    BottomLeft
                    <i className="pi pi-arrow-up-right" />
                </Button>
                <Button onClick={() => openPosition('bottom')} severity="secondary" style={{ minWidth: '10rem' }}>
                    Bottom
                    <i className="pi pi-arrow-up" />
                </Button>
                <Button onClick={() => openPosition('bottomright')} severity="secondary" style={{ minWidth: '10rem' }}>
                    BottomRight
                    <i className="pi pi-arrow-up-left" />
                </Button>
            </div>
            <ConfirmDialog open={open} onOpenChange={(e: ConfirmDialogChangeEvent) => setOpen(e.value as boolean)} position={position}>
                <ConfirmDialog.Portal>
                    <ConfirmDialog.Header>
                        <ConfirmDialog.Title>Edit Profile</ConfirmDialog.Title>
                        <ConfirmDialog.Close />
                    </ConfirmDialog.Header>
                    <ConfirmDialog.Content>
                        <ConfirmDialog.Icon className="pi pi-exclamation-triangle" />
                        <ConfirmDialog.Message>Are you sure you want to proceed?</ConfirmDialog.Message>
                    </ConfirmDialog.Content>
                    <ConfirmDialog.Footer>
                        <ConfirmDialog.Cancel>Cancel</ConfirmDialog.Cancel>
                        <ConfirmDialog.Action>Save</ConfirmDialog.Action>
                    </ConfirmDialog.Footer>
                </ConfirmDialog.Portal>
            </ConfirmDialog>
        </div>
    );
}

```

## Accessibility

### Screen Reader

ConfirmDialog component uses `confirmdialog` role along with `aria-labelledby` referring to the header element however any attribute is passed to the root element so you may use `aria-labelledby` to override this default behavior. In addition `aria-modal` is added since focus is kept within the popup.

Trigger element also has aria-expanded and aria-controls to be handled explicitly.

### Overlay Keyboard Support

| Key           | Function                                                                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tab`         | Moves focus to the next the focusable element within the confirmdialog if `modal` is true. Otherwise, the focusable element in the page tab sequence.     |
| `shift + tab` | Moves focus to the previous the focusable element within the confirmdialog if `modal` is true. Otherwise, the focusable element in the page tab sequence. |
| `escape`      | Closes the confirmdialog if `closeOnEscape` is true.                                                                                                      |

### Close Button Keyboard Support

| Key     | Function                  |
| ------- | ------------------------- |
| `enter` | Closes the confirmdialog. |
| `space` | Closes the confirmdialog. |


# ConfirmDialog Pass Through

Pass Through documentation for ConfirmDialog component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="confirmdialog-pt" components={['ConfirmDialog']} />

## ConfirmDialog PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmDialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| mask | ConfirmDialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the mask's DOM element. |
| trigger | ConfirmDialogPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the trigger's DOM element. |
| triggerIcon | ConfirmDialogPassThroughType<HTMLAttributes<HTMLElement>> | Used to pass attributes to the trigger icon's DOM element. |
| portal | ConfirmDialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the portal's DOM element. |
| header | ConfirmDialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the header's DOM element. |
| title | ConfirmDialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the title's DOM element. |
| headerActions | ConfirmDialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the headerActions's DOM element. |
| close | ConfirmDialogPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the close's DOM element. |
| closeIcon | ConfirmDialogPassThroughType<HTMLAttributes<HTMLElement>> | Used to pass attributes to the close icon's DOM element. |
| content | ConfirmDialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the content's DOM element. |
| icon | ConfirmDialogPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the icon's DOM element. |
| message | ConfirmDialogPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the message's DOM element. |
| cancel | ConfirmDialogPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the cancel's DOM element. |
| action | ConfirmDialogPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the action's DOM element. |
| footer | ConfirmDialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the footer's DOM element. |


## ConfirmDialogTrigger PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmDialogTriggerPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmDialogPortal PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmDialogPortalPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmDialogHeader PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmDialogHeaderPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmDialogTitle PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmDialogTitlePassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmDialogHeaderActions PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmDialogHeaderActionsPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmDialogAcionPT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmDialogActionPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmDialogClose PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmDialogClosePassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmDialogContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmDialogContentPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmDialogFooter PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmDialogFooterPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# ConfirmDialog Theming

Theming documentation for ConfirmDialog component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-confirmdialog | Class name of the root element |
| p-confirmdialog-trigger-button | Class name of the trigger button element |
| p-confirmdialog-icon | Class name of the icon element |
| p-confirmdialog-message | Class name of the message element |
| p-confirmdialog-close-button | Class name of the close button element |
| p-confirmdialog-action-button | Class name of the action button element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| confirmdialog.icon.size | --p-confirmdialog-icon-size | Size of icon |
| confirmdialog.icon.color | --p-confirmdialog-icon-color | Color of icon |
| confirmdialog.content.gap | --p-confirmdialog-content-gap | Gap of content |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# ConfirmPopup API

API documentation for ConfirmPopup component


## ConfirmPopup

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmPopupInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmPopupInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmPopupPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmPopupInstance) => ReactNode) | null | The children to render. |
| open | boolean | false | Specifies the visibility of the confirmpopup. |
| defaultOpen | boolean | false | Specifies the default visibility of the confirmpopup. |
| defaultFocus | "accept" \\| "reject" | undefined | Element to receive the focus when the confirmpopup gets visible, valid values are "accept" and "reject". |
| onOpenChange | (event: useConfirmPopupChangeEvent) => void | null | Callback function that is called when the trigger is clicked. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| opened | boolean | null | Whether the confirmpopup is currently opened. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useConfirmPopupState | null | Current state of the confirmpopup. |
| motionRef | RefObject<{ elementRef: RefObject<HTMLDivElement> }> | null | Reference to the motion element. |
| triggerRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the trigger element. |
| rejectRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the reject element. |
| acceptRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the accept element. |
| onOpenStateChange | () => void | null | Method to change the open state of the confirmpopup. |
| close | () => void | null | Method to close the confirmpopup. |
| onMotionEnter | () => void | null | Handler for motion enter events. |
| onMotionAfterEnter | () => void | null | Handler for motion after enter events. |
| onMotionAfterLeave | () => void | null | Handler for motion after leave events. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmPopup component. | [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmPopup component. | [object Object] |


## ConfirmPopupTrigger

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmPopupTriggerInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmPopupTriggerInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmPopupTriggerPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmPopupTriggerInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmpopup | ConfirmPopupInstance | null | Instance of the ConfirmPopup component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmPopupTrigger component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmPopupTrigger component. | [object Object] |


## ConfirmPopupPortal

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmPopupPortalInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmPopupPortalInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmPopupPortalPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmPopupPortalInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmpopup | ConfirmPopupInstance | null | Instance of the ConfirmPopup component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmPopupPortal component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmPopupPortal component. | [object Object] |


## ConfirmPopupContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmPopupContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmPopupContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmPopupContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmPopupContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmpopup | ConfirmPopupInstance | null | Instance of the ConfirmPopup component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmPopupContent component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmPopupContent component. | [object Object] |


## ConfirmPopupIcon

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmPopupIconInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmPopupIconInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmPopupIconPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmPopupIconInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmpopup | ConfirmPopupInstance | null | Instance of the ConfirmPopup component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmPopupIcon component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmPopupIcon component. | [object Object] |


## ConfirmPopupMessage

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmPopupMessageInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmPopupMessageInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmPopupMessagePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmPopupMessageInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmpopup | ConfirmPopupInstance | null | Instance of the ConfirmPopup component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmPopupMessage component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmPopupMessage component. | [object Object] |


## ConfirmPopupFooter

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmPopupFooterInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmPopupFooterInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmPopupFooterPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmPopupFooterInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmpopup | ConfirmPopupInstance | null | Instance of the ConfirmPopup component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmPopupFooter component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmPopupFooter component. | [object Object] |


## ConfirmPopupReject

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmPopupRejectInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmPopupRejectInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmPopupRejectPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmPopupRejectInstance) => ReactNode) | null | The children to render. |
| size | "small" \\| "large" \\| "normal" | small | The size of the reject button |
| variant | "link" \\| "text" \\| "outlined" | text | the variant of the reject button |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmpopup | ConfirmPopupInstance | null | Instance of the ConfirmPopup component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmPopupReject component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmPopupReject component. | [object Object] |


## ConfirmPopupAccept

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ConfirmPopupAcceptInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ConfirmPopupAcceptInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ConfirmPopupAcceptPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ConfirmPopupAcceptInstance) => ReactNode) | null | The children to render. |
| size | "small" \\| "large" \\| "normal" | small | The size of the accept button |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| confirmpopup | ConfirmPopupInstance | null | Instance of the ConfirmPopup component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ConfirmPopupAccept component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ConfirmPopupAccept component. | [object Object] |


## useConfirmPopup

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| open | boolean | false | Specifies the visibility of the confirmpopup. |
| defaultOpen | boolean | false | Specifies the default visibility of the confirmpopup. |
| defaultFocus | "accept" \\| "reject" | undefined | Element to receive the focus when the confirmpopup gets visible, valid values are "accept" and "reject". |
| onOpenChange | (event: useConfirmPopupChangeEvent) => void | null | Callback function that is called when the trigger is clicked. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| opened | boolean | null | Whether the confirmpopup is currently opened. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useConfirmPopupState | null | Current state of the confirmpopup. |
| motionRef | RefObject<{ elementRef: RefObject<HTMLDivElement> }> | null | Reference to the motion element. |
| triggerRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the trigger element. |
| rejectRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the reject element. |
| acceptRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the accept element. |
| onOpenStateChange | () => void | null | Method to change the open state of the confirmpopup. |
| close | () => void | null | Method to close the confirmpopup. |
| onMotionEnter | () => void | null | Handler for motion enter events. |
| onMotionAfterEnter | () => void | null | Handler for motion after enter events. |
| onMotionAfterLeave | () => void | null | Handler for motion after leave events. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.useconfirmpopup.events.useConfirmPopupChangeEvent | useConfirmPopupChangeEvent | Event fired when the confirmpopup's open state changes. |  | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useConfirmPopup headless. | [object Object] |



# ConfirmPopup

ConfirmPopup uses a Dialog UI


## Usage

```tsx
import { ConfirmPopup } from 'primereact/confirmpopup';
```

```tsx
<ConfirmPopup>
    <ConfirmPopup.Trigger />
    <ConfirmPopup.Portal>
        <ConfirmPopup.Content>
            <ConfirmPopup.Icon />
            <ConfirmPopup.Message />
        </ConfirmPopup.Content>
        <ConfirmPopup.Footer>
            <ConfirmPopup.Reject />
            <ConfirmPopup.Accept />
        </ConfirmPopup.Footer>
    </ConfirmPopup.Portal>
</ConfirmPopup>
```

## Examples

### Basic

ConfirmPopup is defined using `ConfirmPopup`, `ConfirmPopup.Trigger`, `ConfirmPopup.Portal`, `ConfirmPopup.Content`, `ConfirmPopup.Footer`, `ConfirmPopup.Reject` and `ConfirmPopup.Accept` components.

```tsx
import { ConfirmPopup } from 'primereact/confirmpopup';

export default function BasicDemo() {
    return (
        <div className="card flex flex-wrap gap-2 justify-center">
            <ConfirmPopup>
                <ConfirmPopup.Trigger variant="outlined">Save</ConfirmPopup.Trigger>
                <ConfirmPopup.Portal>
                    <ConfirmPopup.Content>
                        <ConfirmPopup.Icon className="pi pi-exclamation-triangle" />
                        <ConfirmPopup.Message>Are you sure you want to proceed?</ConfirmPopup.Message>
                    </ConfirmPopup.Content>
                    <ConfirmPopup.Footer>
                        <ConfirmPopup.Reject severity="secondary" variant="outlined">
                            Cancel
                        </ConfirmPopup.Reject>
                        <ConfirmPopup.Accept>Save</ConfirmPopup.Accept>
                    </ConfirmPopup.Footer>
                </ConfirmPopup.Portal>
            </ConfirmPopup>
            <ConfirmPopup>
                <ConfirmPopup.Trigger severity="danger" variant="outlined">
                    Delete
                </ConfirmPopup.Trigger>
                <ConfirmPopup.Portal>
                    <ConfirmPopup.Content>
                        <ConfirmPopup.Icon className="pi pi-info-circle" />
                        <ConfirmPopup.Message>Are you sure you want to proceed?</ConfirmPopup.Message>
                    </ConfirmPopup.Content>
                    <ConfirmPopup.Footer>
                        <ConfirmPopup.Reject severity="secondary" variant="outlined">
                            Cancel
                        </ConfirmPopup.Reject>
                        <ConfirmPopup.Accept severity="danger">Delete</ConfirmPopup.Accept>
                    </ConfirmPopup.Footer>
                </ConfirmPopup.Portal>
            </ConfirmPopup>
        </div>
    );
}

```

### Template

ConfirmPopup can be customized with templates. The `ConfirmPopup.Content` can be used to define the content of the popup, while `ConfirmPopup.Footer` can be used to define the footer actions.

```tsx
import { ConfirmPopup } from 'primereact/confirmpopup';

export default function TemplateDemo() {
    return (
        <div className="card flex justify-center">
            <ConfirmPopup>
                <ConfirmPopup.Trigger>Save</ConfirmPopup.Trigger>
                <ConfirmPopup.Portal>
                    <ConfirmPopup.Content>
                        <div className="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
                            <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                            <p>Please confirm to proceed moving forward.</p>
                        </div>
                    </ConfirmPopup.Content>
                    <ConfirmPopup.Footer>
                        <ConfirmPopup.Reject variant="outlined">
                            <i className="pi pi-times" />
                            Cancel
                        </ConfirmPopup.Reject>
                        <ConfirmPopup.Accept>
                            <i className="pi pi-check" />
                            Confirm
                        </ConfirmPopup.Accept>
                    </ConfirmPopup.Footer>
                </ConfirmPopup.Portal>
            </ConfirmPopup>
        </div>
    );
}

```

## Accessibility

### Screen Reader

ConfirmPopup component uses `alertdialog` role and since any attribute is passed to the root element you may define attributes like `aria-label` or `aria-labelledby` to describe the popup contents. In addition `aria-modal` is added since focus is kept within the popup.

### Overlay Keyboard Support

| Key           | Function                                                                   |
| ------------- | -------------------------------------------------------------------------- |
| `tab`         | Moves focus to the next the focusable element within the confirmpopup.     |
| `shift + tab` | Moves focus to the previous the focusable element within the confirmpopup. |
| `escape`      | Closes the popup and moves focus to the trigger.                           |

### Close Button Keyboard Support

| Key     | Function                                                              |
| ------- | --------------------------------------------------------------------- |
| `enter` | Triggers the action, closes the popup and moves focus to the trigger. |
| `space` | Triggers the action, closes the popup and moves focus to the trigger. |


# ConfirmPopup Pass Through

Pass Through documentation for ConfirmPopup component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="confirmpopup-pt" components={['ConfirmPopup']} />

## ConfirmPopup PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmPopupPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| trigger | ConfirmPopupPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the trigger's DOM element. |
| portal | ConfirmPopupPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the portal's DOM element. |
| content | ConfirmPopupPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the content's DOM element. |
| icon | ConfirmPopupPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the icon's DOM element. |
| message | ConfirmPopupPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the message's DOM element. |
| footer | ConfirmPopupPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the footer's DOM element. |
| reject | ConfirmPopupPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the reject's DOM element. |
| accept | ConfirmPopupPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the accept's DOM element. |


## ConfirmPopupTrigger PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmPopupTriggerPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmPopupPortal PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmPopupPortalPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmPopupContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmPopupContentPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmPopupIcon PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmPopupIconPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmPopupMessage PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmPopupMessagePassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmPopupFooter PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmPopupFooterPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmPopupReject PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmPopupRejectPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ConfirmPopupAccept PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ConfirmPopupAcceptPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |



# ConfirmPopup Theming

Theming documentation for ConfirmPopup component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-confirmpopup | Class name of the root element |
| p-confirmpopup-content | Class name of the content element |
| p-confirmpopup-icon | Class name of the icon element |
| p-confirmpopup-message | Class name of the message element |
| p-confirmpopup-footer | Class name of the footer element |
| p-confirmpopup-reject-button | Class name of the reject element |
| p-confirmpopup-accept-button | Class name of the accept element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| confirmpopup.background | --p-confirmpopup-background | Background of root |
| confirmpopup.border.color | --p-confirmpopup-border-color | Border color of root |
| confirmpopup.color | --p-confirmpopup-color | Color of root |
| confirmpopup.border.radius | --p-confirmpopup-border-radius | Border radius of root |
| confirmpopup.shadow | --p-confirmpopup-shadow | Shadow of root |
| confirmpopup.gutter | --p-confirmpopup-gutter | Gutter of root |
| confirmpopup.arrow.offset | --p-confirmpopup-arrow-offset | Arrow offset of root |
| confirmpopup.content.padding | --p-confirmpopup-content-padding | Padding of content |
| confirmpopup.content.gap | --p-confirmpopup-content-gap | Gap of content |
| confirmpopup.icon.size | --p-confirmpopup-icon-size | Size of icon |
| confirmpopup.icon.color | --p-confirmpopup-icon-color | Color of icon |
| confirmpopup.footer.gap | --p-confirmpopup-footer-gap | Gap of footer |
| confirmpopup.footer.padding | --p-confirmpopup-footer-padding | Padding of footer |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Dialog API

API documentation for Dialog component


## Dialog

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DialogInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DialogInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DialogPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DialogInstance) => ReactNode) | null | The children to render. |
| position | "center" \\| "top" \\| "bottom" \\| "left" \\| "right" \\| "topleft" \\| "topright" \\| "bottomleft" \\| "bottomright" | center | Position of the dialog. |
| onOpenChange | (event: DialogChangeEvent) => void | null | Callback function that is called when the trigger is clicked. |
| open | boolean | false | Specifies the visibility of the dialog. |
| defaultOpen | boolean | false | Specifies the default visibility of the dialog. |
| draggable | boolean | true | Enables dragging to change the position using header. |
| keepInViewport | boolean | true | Keeps dialog in the viewport. |
| minX | number | 0 | Minimum value for the left coordinate of dialog in dragging. |
| minY | number | 0 | Minimum value for the top coordinate of dialog in dragging. |
| modal | boolean | undefined | Defines if background should be blocked when dialog is displayed. |
| dismissableMask | boolean | false | Specifies if clicking the modal background should hide the dialog. |
| closeOnEscape | boolean | true | Specifies if pressing escape key should hide the dialog. |
| blockScroll | boolean | false | Whether background scroll should be blocked when dialog is visible. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| appendTo | HTMLElement \\| "body" \\| "self" | body | A valid query selector or an HTMLElement to specify where the dialog gets attached. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| opened | boolean | null | Whether the dialog is currently opened. |
| maximized | boolean | null | Whether the dialog is currently maximized. |
| maskVisible | boolean | null | Whether the mask is currently visible. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useDialogState | null | Current state of the dialog. |
| maskRef | RefObject<HTMLDivElement> | null | Reference to the mask element. |
| motionRef | RefObject<{ elementRef: RefObject<HTMLDivElement> }> | null | Reference to the close button element. |
| closeButtonRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the close button element. |
| maximizableButtonRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the maximizable button element. |
| onOpenStateChange | () => void | null | Method to change the open state of the dialog. |
| close | () => void | null | Method to close the dialog. |
| toggleMaximized | () => void | null | Method to toggle maximized state. |
| onMaskMouseDown | (event: MouseEvent) => void | null | Handler for mask mouse down events. |
| onMaskMouseUp | () => void | null | Handler for mask mouse up events. |
| onDragStart | (event: MouseEvent) => void | null | Handler for drag start events. |
| onMotionEnter | () => void | null | Handler for motion enter events. |
| onMotionAfterEnter | () => void | null | Handler for motion after enter events. |
| onMotionBeforeLeave | () => void | null | Handler for motion before leave events. |
| onMotionLeave | () => void | null | Handler for motion leave events. |
| onMotionAfterLeave | () => void | null | Handler for motion after leave events. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Dialog component. | [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Dialog component. | [object Object] |


## DialogTrigger

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DialogTriggerInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DialogTriggerInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DialogTriggerPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DialogTriggerInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DialogTrigger component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DialogTrigger component. | [object Object] |


## DialogPortal

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DialogPortalInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DialogPortalInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DialogPortalPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DialogPortalInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DialogPortal component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DialogPortal component. | [object Object] |


## DialogHeader

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DialogHeaderInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DialogHeaderInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DialogHeaderPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DialogHeaderInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| dialog | DialogInstance | null | The Dialog component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DialogHeader component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DialogHeader component. | [object Object] |


## DialogTitle

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DialogTitleInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DialogTitleInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DialogTitlePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DialogTitleInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| dialog | DialogInstance | null | The Dialog component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DialogTitle component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DialogTitle component. | [object Object] |


## DialogHeaderActions

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DialogHeaderActionsInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DialogHeaderActionsInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DialogHeaderActionsPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DialogHeaderActionsInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| dialog | DialogInstance | null | The dialog instance that the header actions belong to. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DialogHeaderActions component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DialogHeaderActions component. | [object Object] |


## DialogMaximizable

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DialogMaximizableInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DialogMaximizableInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DialogMaximizablePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DialogMaximizableInstance) => ReactNode) | null | The children to render. |
| iconOnly | boolean | true | Whether to show the DialogMaximizable with a borderless style. |
| severity | string & {} \\| "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" \\| "help" | 'secondary' | Severity type of the DialogMaximizable. |
| variant | "link" \\| "text" \\| "outlined" | 'text' | Variant of the DialogMaximizable. |
| rounded | boolean | true | Whether to show the DialogMaximizable with a rounded style. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DialogMaximizable component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DialogMaximizable component. | [object Object] |


## DialogClose

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DialogCloseInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DialogCloseInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DialogClosePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DialogCloseInstance) => ReactNode) | null | The children to render. |
| iconOnly | boolean | true | Whether to show the DialogClose with a borderless style. |
| severity | string & {} \\| "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" \\| "help" | 'secondary' | Severity type of the DialogClose. |
| variant | "link" \\| "text" \\| "outlined" | 'text' | Variant of the DialogClose. |
| rounded | boolean | true | Whether to show the DialogClose with a rounded style. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| dialog | DialogInstance | null | Instance of the Dialog component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DialogClose component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DialogClose component. | [object Object] |


## DialogContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DialogContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DialogContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DialogContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DialogContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| dialog | DialogInstance | null | The Dialog component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DialogContent component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DialogContent component. | [object Object] |


## DialogFooter

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DialogFooterInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DialogFooterInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DialogFooterPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DialogFooterInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| dialog | DialogInstance | null | The Dialog component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DialogFooter component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DialogFooter component. | [object Object] |


## useDialog

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| open | boolean | false | Specifies the visibility of the dialog. |
| defaultOpen | boolean | false | Specifies the default visibility of the dialog. |
| draggable | boolean | true | Enables dragging to change the position using header. |
| keepInViewport | boolean | true | Keeps dialog in the viewport. |
| minX | number | 0 | Minimum value for the left coordinate of dialog in dragging. |
| minY | number | 0 | Minimum value for the top coordinate of dialog in dragging. |
| modal | boolean | undefined | Defines if background should be blocked when dialog is displayed. |
| dismissableMask | boolean | false | Specifies if clicking the modal background should hide the dialog. |
| closeOnEscape | boolean | true | Specifies if pressing escape key should hide the dialog. |
| blockScroll | boolean | false | Whether background scroll should be blocked when dialog is visible. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| appendTo | HTMLElement \\| "body" \\| "self" | body | A valid query selector or an HTMLElement to specify where the dialog gets attached. |
| onOpenChange | (event: useDialogChangeEvent) => void | null | Callback function that is called when the trigger is clicked. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| opened | boolean | null | Whether the dialog is currently opened. |
| maximized | boolean | null | Whether the dialog is currently maximized. |
| maskVisible | boolean | null | Whether the mask is currently visible. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useDialogState | null | Current state of the dialog. |
| maskRef | RefObject<HTMLDivElement> | null | Reference to the mask element. |
| motionRef | RefObject<{ elementRef: RefObject<HTMLDivElement> }> | null | Reference to the close button element. |
| closeButtonRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the close button element. |
| maximizableButtonRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the maximizable button element. |
| onOpenStateChange | () => void | null | Method to change the open state of the dialog. |
| close | () => void | null | Method to close the dialog. |
| toggleMaximized | () => void | null | Method to toggle maximized state. |
| onMaskMouseDown | (event: MouseEvent) => void | null | Handler for mask mouse down events. |
| onMaskMouseUp | () => void | null | Handler for mask mouse up events. |
| onDragStart | (event: MouseEvent) => void | null | Handler for drag start events. |
| onMotionEnter | () => void | null | Handler for motion enter events. |
| onMotionAfterEnter | () => void | null | Handler for motion after enter events. |
| onMotionBeforeLeave | () => void | null | Handler for motion before leave events. |
| onMotionLeave | () => void | null | Handler for motion leave events. |
| onMotionAfterLeave | () => void | null | Handler for motion after leave events. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.usedialog.events.useDialogChangeEvent | useDialogChangeEvent | Event fired when the dialog's open state changes. |  | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useDialog headless. | [object Object] |



# Dialog

Dialog is a container to display content in an overlay window.


## Usage

```tsx
import { Dialog } from 'primereact/dialog';
```

```tsx
<Dialog>
    <Dialog.Trigger />
    <Dialog.Portal>
        <Dialog.Header>
            <Dialog.Title />
            <Dialog.HeaderActions>
                <Dialog.Maximizable />
                <Dialog.Close />
            </Dialog.HeaderActions>
        </Dialog.Header>
        <Dialog.Content />
        <Dialog.Footer />
    </Dialog.Portal>
</Dialog>
```

## Examples

### Basic

Dialog is defined using `Dialog`, `Dialog.Trigger`, `Dialog.Portal`, `Dialog.Header`, `Dialog.Content` and `Dialog.Footer` components.

```tsx
import { DialogContentInstance } from '@primereact/types/shared/dialog';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <Dialog modal>
                <Dialog.Trigger>Show</Dialog.Trigger>
                <Dialog.Portal style={{ width: '25rem' }}>
                    <Dialog.Header>
                        <Dialog.Title>Edit Profile</Dialog.Title>
                        <Dialog.Close />
                    </Dialog.Header>
                    <Dialog.Content>
                        {(instance: DialogContentInstance) => {
                            const { dialog } = instance;

                            return (
                                <>
                                    <span className="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
                                    <div className="flex items-center gap-4 mb-4">
                                        <Label htmlFor="username" className="font-semibold w-24">
                                            Username
                                        </Label>
                                        <InputText id="username" className="flex-auto" autoComplete="off" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <Label htmlFor="email" className="font-semibold w-24">
                                            Email
                                        </Label>
                                        <InputText id="email" className="flex-auto" autoComplete="off" />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button onClick={dialog?.close} severity="secondary">
                                            Cancel
                                        </Button>
                                        <Button onClick={dialog?.close}>Sign-In</Button>
                                    </div>
                                </>
                            );
                        }}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </div>
    );
}

```

### Position

The position of the dialog can be customized with the `position` property. The available values are `top`, `top-left`, `top-right`, `bottom`, `bottom-left`, `bottom-right`, `left`, `right`, and `center`.

```tsx
import { DialogChangeEvent, DialogContentInstance, DialogProps } from '@primereact/types/shared/dialog';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';
import * as React from 'react';

export default function PositionDemo() {
    const [open, setOpen] = React.useState<boolean>(false);
    const [position, setPosition] = React.useState<DialogProps['position']>('center');

    const openPosition = (position: DialogProps['position']) => {
        setOpen(true);
        setPosition(position);
    };

    return (
        <div className="card">
            <div className="flex flex-wrap justify-center gap-2 mb-2">
                <Button onClick={() => openPosition('left')} severity="secondary" style={{ minWidth: '10rem' }}>
                    Left
                    <i className="pi pi-arrow-right" />
                </Button>
                <Button onClick={() => openPosition('right')} severity="secondary" style={{ minWidth: '10rem' }}>
                    Right
                    <i className="pi pi-arrow-left" />
                </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-2">
                <Button onClick={() => openPosition('topleft')} severity="secondary" style={{ minWidth: '10rem' }}>
                    TopLeft
                    <i className="pi pi-arrow-down-right" />
                </Button>
                <Button onClick={() => openPosition('top')} severity="secondary" style={{ minWidth: '10rem' }}>
                    Top
                    <i className="pi pi-arrow-down" />
                </Button>
                <Button onClick={() => openPosition('topright')} severity="secondary" style={{ minWidth: '10rem' }}>
                    TopRight
                    <i className="pi pi-arrow-down-left" />
                </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                <Button onClick={() => openPosition('bottomleft')} severity="secondary" style={{ minWidth: '10rem' }}>
                    BottomLeft
                    <i className="pi pi-arrow-up-right" />
                </Button>
                <Button onClick={() => openPosition('bottom')} severity="secondary" style={{ minWidth: '10rem' }}>
                    Bottom
                    <i className="pi pi-arrow-up" />
                </Button>
                <Button onClick={() => openPosition('bottomright')} severity="secondary" style={{ minWidth: '10rem' }}>
                    BottomRight
                    <i className="pi pi-arrow-up-left" />
                </Button>
            </div>
            <Dialog open={open} onOpenChange={(e: DialogChangeEvent) => setOpen(e.value as boolean)} modal position={position} draggable={false}>
                <Dialog.Portal style={{ width: '25rem' }}>
                    <Dialog.Header>
                        <Dialog.Title>Edit Profile</Dialog.Title>
                        <Dialog.HeaderActions>
                            <Dialog.Close />
                        </Dialog.HeaderActions>
                    </Dialog.Header>
                    <Dialog.Content>
                        {(instance: DialogContentInstance) => {
                            const { dialog } = instance;

                            return (
                                <>
                                    <span className="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
                                    <div className="flex items-center gap-4 mb-4">
                                        <Label htmlFor="username" className="font-semibold w-24">
                                            Username
                                        </Label>
                                        <InputText id="username" className="flex-auto" autoComplete="off" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <Label htmlFor="email" className="font-semibold w-24">
                                            Email
                                        </Label>
                                        <InputText id="email" className="flex-auto" autoComplete="off" />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" severity="secondary" onClick={dialog?.close}>
                                            Cancel
                                        </Button>
                                        <Button type="button" onClick={dialog?.close}>
                                            Save
                                        </Button>
                                    </div>
                                </>
                            );
                        }}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </div>
    );
}

```

### Maximizable

A dialog can be maximized by clicking the _Dialog.Maximizable_ button.

```tsx
import { Dialog } from 'primereact/dialog';

export default function MaximizableDemo() {
    return (
        <div className="card flex justify-center">
            <Dialog modal>
                <Dialog.Trigger>Show</Dialog.Trigger>
                <Dialog.Portal style={{ width: '50rem' }}>
                    <Dialog.Header>
                        <Dialog.Title>Header</Dialog.Title>
                        <Dialog.HeaderActions>
                            <Dialog.Maximizable />
                            <Dialog.Close />
                        </Dialog.HeaderActions>
                    </Dialog.Header>
                    <Dialog.Content>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </div>
    );
}

```

### Without Modal

Mask layer behind the Dialog is configured with the _modal_ property. By default, no modal layer is added.

```tsx
import { DialogContentInstance } from '@primereact/types/shared/dialog';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';

export default function WithoutModalDemo() {
    return (
        <div className="card flex justify-center">
            <Dialog>
                <Dialog.Trigger>Show</Dialog.Trigger>
                <Dialog.Portal style={{ width: '25rem' }}>
                    <Dialog.Header>
                        <Dialog.Title>Edit Profile</Dialog.Title>
                        <Dialog.HeaderActions>
                            <Dialog.Close />
                        </Dialog.HeaderActions>
                    </Dialog.Header>
                    <Dialog.Content>
                        {(instance: DialogContentInstance) => {
                            const { dialog } = instance;

                            return (
                                <>
                                    <span className="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
                                    <div className="flex items-center gap-4 mb-4">
                                        <Label htmlFor="username" className="font-semibold w-24">
                                            Username
                                        </Label>
                                        <InputText id="username" className="flex-auto" autoComplete="off" />
                                    </div>
                                    <div className="flex items-center gap-4 mb-8">
                                        <Label htmlFor="email" className="font-semibold w-24">
                                            Email
                                        </Label>
                                        <InputText id="email" className="flex-auto" autoComplete="off" />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Button type="button" severity="secondary" onClick={dialog?.close}>
                                            Cancel
                                        </Button>
                                        <Button type="button" onClick={dialog?.close}>
                                            Save
                                        </Button>
                                    </div>
                                </>
                            );
                        }}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Dialog component uses `dialog` role along with `aria-labelledby` referring to the header element however any attribute is passed to the root element so you may use `aria-labelledby` to override this default behavior. In addition `aria-modal` is added since focus is kept within the popup.

Trigger element also has aria-expanded and aria-controls to be handled explicitly.

### Overlay Keyboard Support

| Key           | Function                                                                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tab`         | Moves focus to the next the focusable element within the dialog if `modal` is true. Otherwise, the focusable element in the page tab sequence.     |
| `shift + tab` | Moves focus to the previous the focusable element within the dialog if `modal` is true. Otherwise, the focusable element in the page tab sequence. |
| `escape`      | Closes the dialog if `closeOnEscape` is true.                                                                                                      |

### Close Button Keyboard Support

| Key     | Function           |
| ------- | ------------------ |
| `enter` | Closes the dialog. |
| `space` | Closes the dialog. |


# Dialog Pass Through

Pass Through documentation for Dialog component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="dialog-pt" components={['Dialog']} />

## Dialog PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| mask | DialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the mask's DOM element. |
| trigger | DialogPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the trigger's DOM element. |
| triggerIcon | DialogPassThroughType<HTMLAttributes<HTMLElement>> | Used to pass attributes to the trigger icon's DOM element. |
| portal | DialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the portal's DOM element. |
| header | DialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the header's DOM element. |
| title | DialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the title's DOM element. |
| headerActions | DialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the headerActions's DOM element. |
| maximizable | DialogPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the maximizable's DOM element. |
| maximizableIcon | DialogPassThroughType<HTMLAttributes<HTMLElement>> | Used to pass attributes to the maximizable icon's DOM element. |
| close | DialogPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the close's DOM element. |
| closeIcon | DialogPassThroughType<HTMLAttributes<HTMLElement>> | Used to pass attributes to the close icon's DOM element. |
| content | DialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the content's DOM element. |
| footer | DialogPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the footer's DOM element. |


## DialogTrigger PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DialogTriggerPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## DialogPortal PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DialogPortalPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## DialogHeader PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DialogHeaderPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## DialogTitle PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DialogTitlePassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## DialogHeaderActions PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DialogHeaderActionsPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## DialogMaximizable PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DialogMaximizablePassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## DialogClose PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DialogClosePassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## DialogContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DialogContentPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## DialogFooter PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DialogFooterPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Dialog Theming

Theming documentation for Dialog component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-dialog-mask | Class name of the mask element |
| p-dialog | Class name of the root element |
| p-dialog-trigger-button | Class name of the trigger button element |
| p-dialog-header | Class name of the header element |
| p-dialog-title | Class name of the title element |
| p-dialog-header-actions | Class name of the header actions element |
| p-dialog-maximize-button | Class name of the maximize button element |
| p-dialog-close-button | Class name of the close button element |
| p-dialog-content | Class name of the content element |
| p-dialog-footer | Class name of the footer element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| dialog.background | --p-dialog-background | Background of root |
| dialog.border.color | --p-dialog-border-color | Border color of root |
| dialog.color | --p-dialog-color | Color of root |
| dialog.border.radius | --p-dialog-border-radius | Border radius of root |
| dialog.shadow | --p-dialog-shadow | Shadow of root |
| dialog.header.padding | --p-dialog-header-padding | Padding of header |
| dialog.header.gap | --p-dialog-header-gap | Gap of header |
| dialog.title.font.size | --p-dialog-title-font-size | Font size of title |
| dialog.title.font.weight | --p-dialog-title-font-weight | Font weight of title |
| dialog.content.padding | --p-dialog-content-padding | Padding of content |
| dialog.footer.padding | --p-dialog-footer-padding | Padding of footer |
| dialog.footer.gap | --p-dialog-footer-gap | Gap of footer |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Divider API

API documentation for Divider component


## Divider

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DividerInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DividerInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DividerPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DividerInstance) => ReactNode) | null | The children to render. |
| align | "center" \\| "top" \\| "bottom" \\| "left" \\| "right" | null | Alignment of the content. |
| orientation | "horizontal" \\| "vertical" | horizontal | Specifies the orientation, valid values are 'horizontal' and 'vertical'. |
| type | "solid" \\| "dashed" \\| "dotted" | solid | Border style type. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Divider component. | [object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Divider component. | [object Object] |


## DividerContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DividerContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DividerContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DividerContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DividerContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| divider | DividerInstance | null | Instance of the Divider component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DividerContent component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DividerContent component. | [object Object] |


## useDivider

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useDivider headless. | [object Object] |



# Divider

Divider is used to separate contents.


## Usage

```tsx
import { Divider } from 'primereact/divider';
```

```tsx
<Divider />
```

## Examples

### Basic

Divider is basically placed between the items to separate.

```tsx
import { Divider } from 'primereact/divider';

export default function BasicDemo() {
    return (
        <div className="card">
            <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <Divider />

            <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>

            <Divider />

            <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>

            <Divider />

            <p className="m-0">
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
                voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Donec vel volutpat ipsum. Integer nunc magna, posuere ut tincidunt eget, egestas vitae sapien. Morbi dapibus luctus odio.
            </p>
        </div>
    );
}

```

### Type

Style of the border is configured with the `type` property that can either be `solid`, `dotted` or `dashed`.

```tsx
import { Divider } from 'primereact/divider';

export default function TypeDemo() {
    return (
        <div className="card">
            <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <Divider type="solid" />

            <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>

            <Divider type="dotted" />

            <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>

            <Divider type="dashed" />

            <p className="m-0">
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
                voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Donec vel volutpat ipsum. Integer nunc magna, posuere ut tincidunt eget, egestas vitae sapien. Morbi dapibus luctus odio.
            </p>
        </div>
    );
}

```

### Vertical

Vertical divider is enabled by setting the `orientation` property as `vertical`.

```tsx
import { Divider } from 'primereact/divider';

export default function VerticalDemo() {
    return (
        <div className="card flex">
            <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <Divider orientation="vertical" />

            <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>

            <Divider orientation="vertical" />

            <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </div>
    );
}

```

### Content

Children are rendered within the boundaries of the divider where location of the content is configured with the `align` property. In horizontal orientation, alignment options are `left`, `center` and`right` whereas vertical
mode supports `top`, `center` and `bottom`.

```tsx
import { Divider } from 'primereact/divider';

export default function ContentDemo() {
    return (
        <div className="card">
            <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <Divider align="left" type="solid">
                <Divider.Content>
                    <b>Left</b>
                </Divider.Content>
            </Divider>

            <p className="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>

            <Divider align="center" type="dotted">
                <Divider.Content>
                    <b>Center</b>
                </Divider.Content>
            </Divider>

            <p className="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>

            <Divider align="right" type="dashed">
                <Divider.Content>
                    <b>Right</b>
                </Divider.Content>
            </Divider>

            <p className="m-0">
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
                voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Donec vel volutpat ipsum. Integer nunc magna, posuere ut tincidunt eget, egestas vitae sapien. Morbi dapibus luctus odio.
            </p>
        </div>
    );
}

```

### Login

Sample implementation of a login form using a divider with content.

```tsx
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';

export default function LoginDemo() {
    return (
        <div className="card">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-5/12 flex flex-col items-center justify-center gap-3 py-5">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="username">Username</Label>
                        <InputText id="username" type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Password</Label>
                        <InputText id="password" type="password" />
                    </div>
                    <div className="flex">
                        <Button className="w-full max-w-[17.35rem] mx-auto">
                            Login
                            <i className="pi pi-user" />
                        </Button>
                    </div>
                </div>
                <div className="w-full md:w-2/12">
                    <Divider orientation="vertical" className="hidden md:flex" />
                    <Divider orientation="horizontal" className="flex md:hidden" align="center">
                        <Divider.Content>
                            <b>OR</b>
                        </Divider.Content>
                    </Divider>
                </div>
                <div className="w-full md:w-5/12 flex items-center justify-center py-5">
                    <Button severity="success" className="w-full max-w-[17.35rem] mx-auto">
                        <i className="pi pi-user-plus" />
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Divider uses a `separator` role with `aria-orientation` set to either "horizontal" or "vertical".

### Keyboard Support

Component does not include any interactive elements.


# Divider Pass Through

Pass Through documentation for Divider component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="divider-pt" components={['Divider']} />

## Divider PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DividerPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| content | DividerPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the content's DOM element. |


## DividerContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DividerContentPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |



# Divider Theming

Theming documentation for Divider component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-divider | Class name of the root element |
| p-divider-content | Class name of the content element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| divider.border.color | --p-divider-border-color | Border color of root |
| divider.content.background | --p-divider-content-background | Background of content |
| divider.content.color | --p-divider-content-color | Color of content |
| divider.horizontal.margin | --p-divider-horizontal-margin | Margin of horizontal |
| divider.horizontal.padding | --p-divider-horizontal-padding | Padding of horizontal |
| divider.horizontal.content.padding | --p-divider-horizontal-content-padding | Content padding of horizontal |
| divider.vertical.margin | --p-divider-vertical-margin | Margin of vertical |
| divider.vertical.padding | --p-divider-vertical-padding | Padding of vertical |
| divider.vertical.content.padding | --p-divider-vertical-content-padding | Content padding of vertical |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Drawer API

API documentation for Drawer component


## Drawer

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DrawerInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DrawerInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DrawerPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DrawerInstance) => ReactNode) | null | The children to render. |
| position | "top" \\| "bottom" \\| "left" \\| "right" \\| "full" | left | Position of the drawer. |
| onOpenChange | (event: DrawerChangeEvent) => void | null | Callback function that is called when the trigger is clicked. |
| open | boolean | false | Specifies the visibility of the drawer. |
| defaultOpen | boolean | false | Specifies the default visibility of the drawer. |
| modal | boolean | undefined | Defines if background should be blocked when drawer is displayed. |
| dismissable | boolean | true | Whether clicking outside closes the drawer. |
| blockScroll | boolean | false | Whether background scroll should be blocked when drawer is visible. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| opened | boolean | null | Whether the drawer is currently opened. |
| maskVisible | boolean | null | Whether the mask is currently visible. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useDrawerState | null | Current state of the drawer. |
| maskRef | RefObject<HTMLDivElement> | null | Reference to the mask element. |
| motionRef | RefObject<{ elementRef: RefObject<HTMLDivElement> }> | null | Reference to the motion element. |
| closeButtonRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the close button element. |
| onOpenStateChange | () => void | null | Method to change the open state of the drawer. |
| close | () => void | null | Method to close the drawer. |
| onMotionEnter | () => void | null | Handler for motion enter events. |
| onMotionAfterEnter | () => void | null | Handler for motion after enter events. |
| onMotionBeforeLeave | () => void | null | Handler for motion before leave events. |
| onMotionAfterLeave | () => void | null | Handler for motion after leave events. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Drawer component. | [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Drawer component. | [object Object] |


## DrawerTrigger

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DrawerTriggerInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DrawerTriggerInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DrawerTriggerPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DrawerTriggerInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| drawer | DrawerInstance | null | Instance of the Drawer component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DrawerTrigger component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DrawerTrigger component. | [object Object] |


## DrawerPortal

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DrawerPortalInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DrawerPortalInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DrawerPortalPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DrawerPortalInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| drawer | DrawerInstance | null | Instance of the Drawer component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DrawerPortal component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DrawerPortal component. | [object Object] |


## DrawerHeader

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DrawerHeaderInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DrawerHeaderInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DrawerHeaderPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DrawerHeaderInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| drawer | DrawerInstance | null | The Drawer component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DrawerHeader component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DrawerHeader component. | [object Object] |


## DrawerTitle

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DrawerTitleInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DrawerTitleInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DrawerTitlePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DrawerTitleInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| drawer | DrawerInstance | null | The Drawer component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DrawerTitle component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DrawerTitle component. | [object Object] |


## DrawerClose

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DrawerCloseInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DrawerCloseInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DrawerClosePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DrawerCloseInstance) => ReactNode) | null | The children to render. |
| iconOnly | boolean | true | Whether to show the DrawerClose with a borderless style. |
| severity | string & {} \\| "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" \\| "help" | 'secondary' | Severity type of the DrawerClose. |
| variant | "link" \\| "text" \\| "outlined" | 'text' | Variant of the DrawerClose. |
| rounded | boolean | true | Whether to show the DrawerClose with a rounded style. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| drawer | DrawerInstance | null | Instance of the Drawer component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DrawerClose component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DrawerClose component. | [object Object] |


## DrawerContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DrawerContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DrawerContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DrawerContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DrawerContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| drawer | DrawerInstance | null | The Drawer component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DrawerContent component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DrawerContent component. | [object Object] |


## DrawerFooter

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: DrawerFooterInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: DrawerFooterInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<DrawerFooterPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: DrawerFooterInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| drawer | DrawerInstance | null | The Drawer component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of DrawerFooter component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of DrawerFooter component. | [object Object] |


## useDrawer

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| open | boolean | false | Specifies the visibility of the drawer. |
| defaultOpen | boolean | false | Specifies the default visibility of the drawer. |
| modal | boolean | undefined | Defines if background should be blocked when drawer is displayed. |
| dismissable | boolean | true | Whether clicking outside closes the drawer. |
| blockScroll | boolean | false | Whether background scroll should be blocked when drawer is visible. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| onOpenChange | (event: useDrawerChangeEvent) => void | null | Callback function that is called when the trigger is clicked. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| opened | boolean | null | Whether the drawer is currently opened. |
| maskVisible | boolean | null | Whether the mask is currently visible. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useDrawerState | null | Current state of the drawer. |
| maskRef | RefObject<HTMLDivElement> | null | Reference to the mask element. |
| motionRef | RefObject<{ elementRef: RefObject<HTMLDivElement> }> | null | Reference to the motion element. |
| closeButtonRef | RefObject<{ elementRef: RefObject<HTMLButtonElement> }> | null | Reference to the close button element. |
| onOpenStateChange | () => void | null | Method to change the open state of the drawer. |
| close | () => void | null | Method to close the drawer. |
| onMotionEnter | () => void | null | Handler for motion enter events. |
| onMotionAfterEnter | () => void | null | Handler for motion after enter events. |
| onMotionBeforeLeave | () => void | null | Handler for motion before leave events. |
| onMotionAfterLeave | () => void | null | Handler for motion after leave events. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.usedrawer.events.useDrawerChangeEvent | useDrawerChangeEvent | Event fired when the drawer's open state changes. |  | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useDrawer headless. | [object Object] |



# Drawer

Drawer is a panel component displayed as an overlay at the edges of the screen.


## Usage

```tsx
import { Drawer } from 'primereact/drawer';
```

```tsx
<Drawer>
    <Drawer.Trigger />
    <Drawer.Portal>
        <Drawer.Header>
            <Drawer.Title />
            <Drawer.Close />
        </Drawer.Header>
        <Drawer.Content />
        <Drawer.Footer />
    </Drawer.Portal>
</Drawer>
```

## Examples

### Basic

Drawer is defined using `Drawer`, `Drawer.Trigger`, `Drawer.Portal`, `Drawer.Header`, `Drawer.Content`, and `Drawer.Footer` components.

```tsx
import { DrawerContentInstance } from '@primereact/types/shared/drawer';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Drawer } from 'primereact/drawer';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <Drawer>
                <Drawer.Trigger>
                    <i className="pi pi-arrow-right" />
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Content
                        pt={{
                            root: 'p-0'
                        }}
                    >
                        {(instance: DrawerContentInstance) => {
                            const { drawer } = instance;

                            return (
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between px-6 pt-4 shrink-0">
                                        <span className="inline-flex items-center gap-2">
                                            <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
                                                    fill="var(--p-primary-color)"
                                                />
                                                <path
                                                    d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
                                                    fill="var(--p-text-color)"
                                                />
                                            </svg>
                                            <span className="font-semibold text-2xl text-primary">Your Logo</span>
                                        </span>
                                        <span>
                                            <Button type="button" rounded variant="outlined" iconOnly onClick={drawer?.close}>
                                                <i className="pi pi-times"></i>
                                            </Button>
                                        </span>
                                    </div>
                                    <div className="overflow-y-auto">
                                        <ul className="list-none p-4 m-0">
                                            <li>
                                                <div className="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple">
                                                    <span className="font-medium">FAVORITES</span>
                                                </div>
                                                <ul className="list-none p-0 m-0 overflow-hidden">
                                                    <li>
                                                        <a className="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800">
                                                            <i className="pi pi-home mr-2"></i>
                                                            <span className="font-medium">Dashboard</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800">
                                                            <i className="pi pi-bookmark mr-2"></i>
                                                            <span className="font-medium">Bookmarks</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800">
                                                            <i className="pi pi-chart-line mr-2"></i>
                                                            <span className="font-medium">Reports</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800">
                                                            <i className="pi pi-users mr-2"></i>
                                                            <span className="font-medium">Team</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800">
                                                            <i className="pi pi-comments mr-2"></i>
                                                            <span className="font-medium">Messages</span>
                                                            <span className="inline-flex items-center justify-center ml-auto bg-primary text-primary-contrast rounded-full" style={{ minWidth: ' 1.5rem', height: '1.5rem' }}>
                                                                3
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800">
                                                            <i className="pi pi-calendar mr-2"></i>
                                                            <span className="font-medium">Calendar</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800">
                                                            <i className="pi pi-cog mr-2"></i>
                                                            <span className="font-medium">Settings</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <ul className="list-none p-4 m-0">
                                            <li>
                                                <div className="p-4 flex items-center justify-between text-surface-500 dark:text-surface-400 cursor-pointer p-ripple">
                                                    <span className="font-medium">APPLICATION</span>
                                                </div>
                                                <ul className="list-none p-0 m-0 overflow-hidden">
                                                    <li>
                                                        <a className="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800">
                                                            <i className="pi pi-folder mr-2"></i>
                                                            <span className="font-medium">Projects</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800">
                                                            <i className="pi pi-chart-bar mr-2"></i>
                                                            <span className="font-medium">Performance</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="flex items-center cursor-pointer p-4 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800">
                                                            <i className="pi pi-cog mr-2"></i>
                                                            <span className="font-medium">Settings</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-auto">
                                        <hr className="mb-4 mx-4 border-t border-0 border-surface-200 dark:border-surface-700" />
                                        <a className="m-4 flex items-center cursor-pointer p-4 gap-2 rounded text-surface-700 hover:bg-surface-100 dark:text-surface-0 dark:hover:bg-surface-800">
                                            <Avatar shape="circle">
                                                <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
                                                <Avatar.Fallback>A</Avatar.Fallback>
                                            </Avatar>
                                            <span className="font-bold">Amy Elsner</span>
                                        </a>
                                    </div>
                                </div>
                            );
                        }}
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer>
        </div>
    );
}

```

### Position

The position of the drawer can be customized with the `position` property. The available values are `left`, `right`, `top` and `bottom`.

```tsx
import { DrawerChangeEvent } from '@primereact/types/shared/drawer';
import { Button } from 'primereact/button';
import { Drawer } from 'primereact/drawer';
import * as React from 'react';

export default function PositionDemo() {
    const [visibleLeft, setVisibleLeft] = React.useState<boolean>(false);
    const [visibleRight, setVisibleRight] = React.useState<boolean>(false);
    const [visibleTop, setVisibleTop] = React.useState<boolean>(false);
    const [visibleBottom, setVisibleBottom] = React.useState<boolean>(false);

    return (
        <div className="card">
            <div className="flex gap-2 justify-center">
                <Button onClick={() => setVisibleLeft(true)}>
                    <i className="pi pi-arrow-right" />
                </Button>
                <Button onClick={() => setVisibleRight(true)}>
                    <i className="pi pi-arrow-left" />
                </Button>
                <Button onClick={() => setVisibleTop(true)}>
                    <i className="pi pi-arrow-down" />
                </Button>
                <Button onClick={() => setVisibleBottom(true)}>
                    <i className="pi pi-arrow-up" />
                </Button>
            </div>

            <Drawer open={visibleLeft} onOpenChange={(e: DrawerChangeEvent) => setVisibleLeft(e.value as boolean)}>
                <Drawer.Portal>
                    <Drawer.Header>
                        <Drawer.Title>Left Drawer</Drawer.Title>
                        <Drawer.Close />
                    </Drawer.Header>
                    <Drawer.Content>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </p>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer>

            <Drawer position="right" open={visibleRight} onOpenChange={(e: DrawerChangeEvent) => setVisibleRight(e.value as boolean)}>
                <Drawer.Portal>
                    <Drawer.Header>
                        <Drawer.Title>Right Drawer</Drawer.Title>
                        <Drawer.Close />
                    </Drawer.Header>
                    <Drawer.Content>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </p>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer>

            <Drawer position="top" open={visibleTop} onOpenChange={(e: DrawerChangeEvent) => setVisibleTop(e.value as boolean)} style={{ height: 'auto' }}>
                <Drawer.Portal>
                    <Drawer.Header>
                        <Drawer.Title>Top Drawer</Drawer.Title>
                        <Drawer.Close />
                    </Drawer.Header>
                    <Drawer.Content>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </p>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer>

            <Drawer position="bottom" open={visibleBottom} onOpenChange={(e: DrawerChangeEvent) => setVisibleBottom(e.value as boolean)} style={{ height: 'auto' }}>
                <Drawer.Portal>
                    <Drawer.Header>
                        <Drawer.Title>Bottom Drawer</Drawer.Title>
                        <Drawer.Close />
                    </Drawer.Header>
                    <Drawer.Content>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </p>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer>
        </div>
    );
}

```

### Full Screen

The full screen mode is enabled when position property is set as `full`.

```tsx
import { Drawer } from 'primereact/drawer';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <Drawer position="full">
                <Drawer.Trigger>
                    <i className="pi pi-window-maximize" />
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Header>
                        <Drawer.Title>Drawer</Drawer.Title>
                        <Drawer.Close />
                    </Drawer.Header>
                    <Drawer.Content>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.
                        </p>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Drawer component uses `complementary` role by default, since any attribute is passed to the root element aria role can be changed depending on your use case and additional attributes like `aria-labelledby` can be added. In addition `aria-modal` is added since focus is kept within the drawer when opened.

Trigger element also has aria-expanded and aria-controls to be handled explicitly.

### Overlay Keyboard Support

| Key           | Function                                                             |
| ------------- | -------------------------------------------------------------------- |
| `tab`         | Moves focus to the next the focusable element within the drawer.     |
| `shift + tab` | Moves focus to the previous the focusable element within the drawer. |
| `escape`      | Closes the drawer.                                                   |

### Close Button Keyboard Support

| Key     | Function           |
| ------- | ------------------ |
| `enter` | Closes the drawer. |
| `space` | Closes the drawer. |


# Drawer Pass Through

Pass Through documentation for Drawer component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="drawer-pt" components={['Drawer']} />

## Drawer PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DrawerPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| mask | DrawerPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the mask's DOM element. |
| trigger | DrawerPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the trigger's DOM element. |
| triggerIcon | DrawerPassThroughType<HTMLAttributes<HTMLElement>> | Used to pass attributes to the trigger icon's DOM element. |
| portal | DrawerPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the portal's DOM element. |
| header | DrawerPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the header's DOM element. |
| title | DrawerPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the title's DOM element. |
| close | DrawerPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the close's DOM element. |
| closeIcon | DrawerPassThroughType<HTMLAttributes<HTMLElement>> | Used to pass attributes to the close icon's DOM element. |
| content | DrawerPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the content's DOM element. |
| footer | DrawerPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the footer's DOM element. |


## DrawerTrigger PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DrawerTriggerPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## DrawerPortal PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DrawerPortalPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## DrawerHeader PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DrawerHeaderPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## DrawerTitle PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DrawerTitlePassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## DrawerClose PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DrawerClosePassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## DrawerContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DrawerContentPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## DrawerFooter PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | DrawerFooterPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Drawer Theming

Theming documentation for Drawer component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-drawer-mask | Class name of the mask element |
| p-drawer | Class name of the root element |
| p-drawer-trigger-button | Class name of the trigger button element |
| p-drawer-header | Class name of the header element |
| p-drawer-title | Class name of the title element |
| p-drawer-close-button | Class name of the close button element |
| p-drawer-content | Class name of the content element |
| p-drawer-footer | Class name of the footer element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| drawer.background | --p-drawer-background | Background of root |
| drawer.border.color | --p-drawer-border-color | Border color of root |
| drawer.color | --p-drawer-color | Color of root |
| drawer.shadow | --p-drawer-shadow | Shadow of root |
| drawer.header.padding | --p-drawer-header-padding | Padding of header |
| drawer.title.font.size | --p-drawer-title-font-size | Font size of title |
| drawer.title.font.weight | --p-drawer-title-font-weight | Font weight of title |
| drawer.content.padding | --p-drawer-content-padding | Padding of content |
| drawer.footer.padding | --p-drawer-footer-padding | Padding of footer |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Fieldset API

API documentation for Fieldset component


## Fieldset

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: FieldsetInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: FieldsetInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<FieldsetPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: FieldsetInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Fieldset component. | [object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Fieldset component. | [object Object] |


## FieldsetLegend

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: FieldsetLegendInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: FieldsetLegendInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<FieldsetLegendPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: FieldsetLegendInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| fieldset | FieldsetInstance | null | The Fieldset component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of FieldsetLegend component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of FieldsetLegend component. | [object Object] |


## FieldsetContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: FieldsetContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: FieldsetContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<FieldsetContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: FieldsetContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| fieldset | FieldsetInstance | null | The Switch component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of FieldsetContent component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of FieldsetContent component. | [object Object] |


## useFieldset

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useFieldset headless. | [object Object] |



# Fieldset

Fieldset visually integrates a label with its form element.


## Usage

```tsx
import { Fieldset } from 'primereact/fieldset';
```

```tsx
<Fieldset>
    <Fieldset.Legend />
    <Fieldset.Content />
</Fieldset>
```

## Examples

### Basic

Demonstrates a simple fieldset component with a legend and content for organizing related information in a structured manner.

```tsx
import { Fieldset } from 'primereact/fieldset';

export default function BasicDemo() {
    return (
        <div className="card">
            <Fieldset>
                <Fieldset.Legend>Legend</Fieldset.Legend>
                <Fieldset.Content>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Fieldset.Content>
            </Fieldset>
        </div>
    );
}

```

### Toggleable

Shows a fieldset with collapsible content that can be shown or hidden by clicking on the legend.

```tsx
import { Motion } from '@primereact/core/motion';
import { MinusIcon, PlusIcon } from '@primereact/icons';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';
import * as React from 'react';

export default function ToggleableDemo() {
    const [show, setShow] = React.useState(true);

    return (
        <div className="card">
            <Fieldset>
                <Fieldset.Legend>
                    <Button onClick={() => setShow((prev) => !prev)} variant="text">
                        {show ? <MinusIcon /> : <PlusIcon />}
                        Legend
                    </Button>
                </Fieldset.Legend>
                <Motion in={show} name="p-toggleable-content">
                    <Fieldset.Content>
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </Fieldset.Content>
                </Motion>
            </Fieldset>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Fieldset component uses the semantic fieldset element.

### Keyboard Support

| Key           | Function                                                                    |
| ------------- | --------------------------------------------------------------------------- |
| `tab`         | Moves focus to the next the focusable element in the page tab sequence.     |
| `shift + tab` | Moves focus to the previous the focusable element in the page tab sequence. |
| `enter`       | Toggles the visibility of the content.                                      |
| `space`       | Toggles the visibility of the content.                                      |


# Fieldset Pass Through

Pass Through documentation for Fieldset component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="fieldset-pt" components={['Fieldset']} />

## Fieldset PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | FieldsetPassThroughType<HTMLAttributes<HTMLFieldSetElement>> | Used to pass attributes to the root's DOM element. |
| legend | FieldsetPassThroughType<HTMLAttributes<HTMLLegendElement>> | Used to pass attributes to the legend's DOM element. |
| content | FieldsetPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the content's DOM element. |


## FieldsetLegend PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | FieldsetLegendPassThroughType<HTMLAttributes<HTMLLegendElement>> | Used to pass attributes to the root's DOM element. |


## FieldsetContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | FieldsetContentPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Fieldset Theming

Theming documentation for Fieldset component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-fieldset | Class name of the root element |
| p-fieldset-legend | Class name of the legend element |
| p-fieldset-content | Class name of the content element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| fieldset.background | --p-fieldset-background | Background of root |
| fieldset.border.color | --p-fieldset-border-color | Border color of root |
| fieldset.border.radius | --p-fieldset-border-radius | Border radius of root |
| fieldset.color | --p-fieldset-color | Color of root |
| fieldset.padding | --p-fieldset-padding | Padding of root |
| fieldset.transition.duration | --p-fieldset-transition-duration | Transition duration of root |
| fieldset.legend.background | --p-fieldset-legend-background | Background of legend |
| fieldset.legend.hover.background | --p-fieldset-legend-hover-background | Hover background of legend |
| fieldset.legend.color | --p-fieldset-legend-color | Color of legend |
| fieldset.legend.hover.color | --p-fieldset-legend-hover-color | Hover color of legend |
| fieldset.legend.border.radius | --p-fieldset-legend-border-radius | Border radius of legend |
| fieldset.legend.border.width | --p-fieldset-legend-border-width | Border width of legend |
| fieldset.legend.border.color | --p-fieldset-legend-border-color | Border color of legend |
| fieldset.legend.padding | --p-fieldset-legend-padding | Padding of legend |
| fieldset.legend.gap | --p-fieldset-legend-gap | Gap of legend |
| fieldset.legend.font.weight | --p-fieldset-legend-font-weight | Font weight of legend |
| fieldset.legend.focus.ring.width | --p-fieldset-legend-focus-ring-width | Focus ring width of legend |
| fieldset.legend.focus.ring.style | --p-fieldset-legend-focus-ring-style | Focus ring style of legend |
| fieldset.legend.focus.ring.color | --p-fieldset-legend-focus-ring-color | Focus ring color of legend |
| fieldset.legend.focus.ring.offset | --p-fieldset-legend-focus-ring-offset | Focus ring offset of legend |
| fieldset.legend.focus.ring.shadow | --p-fieldset-legend-focus-ring-shadow | Focus ring shadow of legend |
| fieldset.toggle.icon.color | --p-fieldset-toggle-icon-color | Color of toggle icon |
| fieldset.toggle.icon.hover.color | --p-fieldset-toggle-icon-hover-color | Hover color of toggle icon |
| fieldset.content.padding | --p-fieldset-content-padding | Padding of content |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# FloatLabel API

API documentation for FloatLabel component


## FloatLabel

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: FloatLabelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: FloatLabelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<FloatLabelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: FloatLabelInstance) => ReactNode) | null | The children to render. |
| variant | "on" \\| "in" \\| "over" | over | Defines the positioning of the label relative to the input. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of FloatLabel component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of FloatLabel component. | [object Object] |


## Label

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: LabelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: LabelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<LabelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: LabelInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Label component. | [object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Label component. | [object Object] |


## useLabel

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useLabel headless. | [object Object] |



# FloatLabel

FloatLabel visually integrates a label with its form element.


## Usage

```tsx
import { Label } from 'primereact/label';
```

```tsx
<Label.Float>
    <InputText />
    <Label></Label>
</Label.Float>
```

## Examples

### Basic

FloatLabel is used by wrapping the input and its Label.

```tsx
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';
import * as React from 'react';

export default function BasicDemo() {
    const [value, setValue] = React.useState('');

    return (
        <div className="card flex flex-wrap justify-center ">
            <Label.Float>
                <InputText value={value} onInput={(e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value)} id="username" />
                <Label htmlFor="username">InputText</Label>
            </Label.Float>
        </div>
    );
}

```

### Variants

The `variant` property defines the position of the label. Default value is `over`, whereas `in` and `on` are the alternatives.

```tsx
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';
import * as React from 'react';

export default function VariantsDemo() {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');

    return (
        <div className="card flex flex-wrap justify-center items-end gap-4">
            <Label.Float variant="in">
                <InputText id="in_label" value={value1} onInput={(e: React.FormEvent<HTMLInputElement>) => setValue1(e.currentTarget.value)} autoComplete="off" />
                <Label htmlFor="in_label">In Label</Label>
            </Label.Float>

            <Label.Float variant="on">
                <InputText id="on_label" value={value2} onInput={(e: React.FormEvent<HTMLInputElement>) => setValue2(e.currentTarget.value)} autoComplete="off" />
                <Label htmlFor="on_label">On Label</Label>
            </Label.Float>
        </div>
    );
}

```

### Invalid

When the form element is invalid, the label is also highlighted.

```tsx
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';
import * as React from 'react';

export default function InvalidDemo() {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');

    return (
        <div className="card flex flex-wrap justify-center items-end gap-4">
            <Label.Float>
                <InputText id="value1" value={value1} onInput={(e: React.FormEvent<HTMLInputElement>) => setValue1(e.currentTarget.value)} invalid={!value1} />
                <Label htmlFor="value1">Username</Label>
            </Label.Float>

            <Label.Float variant="in">
                <InputText id="value2" value={value2} onInput={(e: React.FormEvent<HTMLInputElement>) => setValue2(e.currentTarget.value)} autoComplete="off" invalid={!value2} />
                <Label htmlFor="value2">Username</Label>
            </Label.Float>

            <Label.Float variant="on">
                <InputText id="value3" value={value3} onInput={(e: React.FormEvent<HTMLInputElement>) => setValue3(e.currentTarget.value)} autoComplete="off" invalid={!value3} />
                <Label htmlFor="value3">Username</Label>
            </Label.Float>
        </div>
    );
}

```

## Accessibility

### Screen Reader

FloatLabel does not require any roles and attributes.

### Keyboard Support

Component does not include any interactive elements.


# FloatLabel Pass Through

Pass Through documentation for FloatLabel component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="floatlabel-pt" components={['FloatLabel', 'Label']} />

## FloatLabel PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | FloatLabelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## Label PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | LabelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| ifta | LabelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the ifta's DOM element. |
| float | LabelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the float's DOM element. |



# FloatLabel Theming

Theming documentation for FloatLabel component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-floatlabel | Class name of the root element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| floatlabel.color | --p-floatlabel-color | Color of root |
| floatlabel.focus.color | --p-floatlabel-focus-color | Focus color of root |
| floatlabel.active.color | --p-floatlabel-active-color | Active color of root |
| floatlabel.invalid.color | --p-floatlabel-invalid-color | Invalid color of root |
| floatlabel.transition.duration | --p-floatlabel-transition-duration | Transition duration of root |
| floatlabel.position.x | --p-floatlabel-position-x | Position x of root |
| floatlabel.position.y | --p-floatlabel-position-y | Position y of root |
| floatlabel.font.weight | --p-floatlabel-font-weight | Font weight of root |
| floatlabel.active.font.size | --p-floatlabel-active-font-size | Active font size of root |
| floatlabel.active.font.weight | --p-floatlabel-active-font-weight | Active font weight of root |
| floatlabel.over.active.top | --p-floatlabel-over-active-top | Active top of over |
| floatlabel.in.input.padding.top | --p-floatlabel-in-input-padding-top | Input padding top of in |
| floatlabel.in.input.padding.bottom | --p-floatlabel-in-input-padding-bottom | Input padding bottom of in |
| floatlabel.in.active.top | --p-floatlabel-in-active-top | Active top of in |
| floatlabel.on.border.radius | --p-floatlabel-on-border-radius | Border radius of on |
| floatlabel.on.active.background | --p-floatlabel-on-active-background | Active background of on |
| floatlabel.on.active.padding | --p-floatlabel-on-active-padding | Active padding of on |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Focus Trap

Focus Trap keeps focus within a certain DOM element while tabbing.


## Usage

```tsx
import { FocusTrap } from 'primereact/focustrap';
```

```tsx
<FocusTrap container={}>
    <div>
        <input type="text" />
    </div>
</FocusTrap>
```

## Examples

### Basic

```tsx
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { FocusTrap } from 'primereact/focustrap';
import { InputText } from 'primereact/inputtext';

export default function BasicDemo() {
    return (
        <div className="card">
            <FocusTrap className="max-w-80 mx-auto flex flex-col gap-6">
                <InputText id="input" type="text" placeholder="Name" fluid />

                <InputText id="email" type="email" placeholder="Email" fluid />

                <div className="flex items-center gap-2">
                    <Checkbox inputId="accept" name="accept" value="Accept" />
                    <label htmlFor="accept">I agree to the terms and conditions.</label>
                </div>

                <Button type="submit" className="mt-2">
                    Submit
                </Button>
            </FocusTrap>
        </div>
    );
}

```


# IftaLabel API

API documentation for IftaLabel component


## IftaLabel

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: IftaLabelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: IftaLabelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<IftaLabelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: IftaLabelInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of IftaLabel component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of IftaLabel component. | [object Object] |


## Label

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: LabelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: LabelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<LabelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: LabelInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Label component. | [object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Label component. | [object Object] |


## useLabel

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useLabel headless. | [object Object] |



# IftaLabel

IftaLabel visually integrates a label with its form element.


## Usage

```tsx
import { Label } from 'primereact/label';
```

```tsx
<Label.Ifta>
    <InputText />
    <Label></Label>
</Label.Ifta>
```

## Examples

### Basic

IftaLabel is used to create infield top aligned labels.

```tsx
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';

export default function BasicDemo() {
    return (
        <div className="card flex flex-wrap justify-center ">
            <Label.Ifta>
                <InputText id="username" />
                <Label htmlFor="username">InputText</Label>
            </Label.Ifta>
        </div>
    );
}

```

### Invalid

When the form element is invalid, the label is also highlighted.

```tsx
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';
import * as React from 'react';

export default function InvalidDemo() {
    const [value, setValue] = React.useState('');

    return (
        <div className="card flex flex-wrap justify-center ">
            <Label.Ifta>
                <InputText id="invalid" value={value} onInput={(e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value)} invalid={!value} />
                <Label htmlFor="invalid">Username</Label>
            </Label.Ifta>
        </div>
    );
}

```

## Accessibility

### Screen Reader

IftaLabel does not require any roles and attributes.

### Keyboard Support

Component does not include any interactive elements.


# IftaLabel Pass Through

Pass Through documentation for IftaLabel component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="iftalabel-pt" components={['IftaLabel', 'Label']} />

## IftaLabel PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | IftaLabelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## Label PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | LabelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| ifta | LabelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the ifta's DOM element. |
| float | LabelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the float's DOM element. |



# IftaLabel Theming

Theming documentation for IftaLabel component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-iftalabel | Class name of the root element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| iftalabel.color | --p-iftalabel-color | Color of root |
| iftalabel.focus.color | --p-iftalabel-focus-color | Focus color of root |
| iftalabel.invalid.color | --p-iftalabel-invalid-color | Invalid color of root |
| iftalabel.transition.duration | --p-iftalabel-transition-duration | Transition duration of root |
| iftalabel.position.x | --p-iftalabel-position-x | Position x of root |
| iftalabel.top | --p-iftalabel-top | Top of root |
| iftalabel.font.size | --p-iftalabel-font-size | Font size of root |
| iftalabel.font.weight | --p-iftalabel-font-weight | Font weight of root |
| iftalabel.input.padding.top | --p-iftalabel-input-padding-top | Padding top of input |
| iftalabel.input.padding.bottom | --p-iftalabel-input-padding-bottom | Padding bottom of input |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# ImageCompare

Compare two images side by side with a slider.


## Usage

```tsx
import { ImageCompare } from 'primereact/imagecompare';
```

```tsx
<ImageCompare>
    <ImageCompare.Left src="" />
    <ImageCompare.Right src="" />
    <ImageCompare.Slider />
</ImageCompare>
```

## Examples

### Basic

Images are defined using `ImageCompare.Left` and `ImageCompare.Right`. Use the `style` or `className` properties to define the size of the container.

```tsx
import { ImageCompare } from 'primereact/imagecompare';

export default function BasicDemo() {
    return (
        <div className="card">
            <ImageCompare>
                <ImageCompare.Left src="https://primefaces.org/cdn/primevue/images/compare/island1.jpg" />
                <ImageCompare.Right src="https://primefaces.org/cdn/primevue/images/compare/island2.jpg" />
                <ImageCompare.Slider />
            </ImageCompare>
        </div>
    );
}

```

### Template

```tsx
import { ImageCompare } from 'primereact/imagecompare';

export default function TemplateDemo() {
    return (
        <div className="card">
            <ImageCompare className="max-w-lg w-full h-60 mx-auto aspect-auto">
                <ImageCompare.Left as="div" className="bg-transparent absolute w-full h-full"></ImageCompare.Left>
                <ImageCompare.Right as={'div'} className="absolute w-full h-full" style={{ clipPath: `polygon(0 0,var(--p-imagecompare-scope-x,50%) 0,var(--p-imagecompare-scope-x,50%) 100%,0 100%)` }}>
                    <svg className="absolute w-full h-full" viewBox="0 0 644 189" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1381_2302)">
                            <path
                                d="M0.5 118.499C0.5 118.499 82 102.999 113.5 89.4989C145 75.9989 188.444 87.7869 235 77.4989C272.684 69.1719 293.654 62.4939 329 46.9989C409.332 11.7849 479.5 86.5 510.5 78C541.5 69.5 635.951 0.848863 644 1.49886"
                                stroke="var(--p-primary-color)"
                                strokeWidth="2"
                            />
                            <path
                                d="M113.5 89.5006C82 103.001 0.5 118.501 0.5 118.501V188.501H644V1.50065C635.951 0.850647 541.5 69.5 510.5 78C479.5 86.5 409.332 11.7866 329 47.0006C293.654 62.4956 272.684 69.1736 235 77.5006C188.444 87.7886 145 76.0006 113.5 89.5006Z"
                                fill="url(#paint0_linear_540_31)"
                            />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_540_31" x1="322.25" x2="322.25" y1="1.477" y2="188.5" gradientUnits="userSpaceOnUse">
                                <stop stopColor="var(--p-primary-color)" stopOpacity="0.4"></stop>
                                <stop offset="1" stopColor="var(--p-primary-color)" stopOpacity="0"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                </ImageCompare.Right>
                <ImageCompare.Slider className="" />
            </ImageCompare>
        </div>
    );
}

```

## Accessibility

### Screen Reader

ImageCompare component uses a native range slider internally. Value to describe the component can be defined using `aria-labelledby` and `aria-label` props.

```tsx
<span id="image_label">Compare Images</span>
<ImageCompare className="shadow-lg rounded-2xl" aria-labelledby="image-label">
    ...
</ImageCompare>

<ImageCompare className="shadow-lg rounded-2xl" aria-label="Compare Images">
    ...
</ImageCompare>
```

### Keyboard Support

| Key                        | Function                          |
| -------------------------- | --------------------------------- |
| `tab`                      | Moves focus to the component.     |
| `left arrow` `up arrow`    | Decrements the value.             |
| `right arrow` `down arrow` | Increments the value.             |
| `home`                     | Set the minimum value.            |
| `end`                      | Set the maximum value.            |
| `page up`                  | Increments the value by 10 steps. |
| `page down`                | Decrements the value by 10 steps. |


# Inplace API

API documentation for Inplace component


## Inplace

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: InplaceInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: InplaceInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<InplacePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: InplaceInstance) => ReactNode) | null | The children to render. |
| disabled | boolean | false | When present, it specifies that the element should be disabled. |
| active | boolean | false | Whether the content is displayed or not. |
| onActiveChange | (active: boolean) => void | null | Callback function that is called when the element is clicked. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| active | boolean | null | The active state of the useInplace. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useInplaceState | null | The state of the useInplace. |
| open | () => void | null | Method to open the inplace. |
| close | () => void | null | Method to close the inplace. |
| onActiveChange | () => void | null | Method to handle the active change event. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.inplace.events.InplaceChangeEvent | InplaceChangeEvent | Event fired when the Inplace's checked state changes. |  | [object Object],[object Object] |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Inplace component. | [object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Inplace component. | [object Object] |


## InplaceDisplay

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: InplaceDisplayInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: InplaceDisplayInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<InplaceDisplayPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: InplaceDisplayInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| inplace | InplaceInstance | null | The Inplace component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of InplaceDisplay component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of InplaceDisplay component. | [object Object] |


## InplaceContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: InplaceContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: InplaceContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<InplaceContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: InplaceContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| inplace | InplaceInstance | null | The Inplace component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of InplaceContent component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of InplaceContent component. | [object Object] |


## useInplace

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| active | boolean | false | Whether the content is displayed or not. |
| onActiveChange | (active: boolean) => void | null | Callback function that is called when the element is clicked. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| active | boolean | null | The active state of the useInplace. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useInplaceState | null | The state of the useInplace. |
| open | () => void | null | Method to open the inplace. |
| close | () => void | null | Method to close the inplace. |
| onActiveChange | () => void | null | Method to handle the active change event. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.useinplace.events.useInplaceChangeEvent | useInplaceChangeEvent | Event fired when the checkbox's checked state changes. |  | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useInplace headless. | [object Object] |



# Inplace

Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content.


## Usage

```tsx
import { Inplace } from 'primereact/inplace';
```

```tsx
<Inplace>
    <Inplace.Display></Inplace.Display>
    <Inplace.Content></Inplace.Content>
</Inplace>
```

## Examples

### Basic

```tsx
import { Inplace } from 'primereact/inplace';

export default function BasicDemo() {
    return (
        <div className="card">
            <Inplace>
                <Inplace.Display>View Content</Inplace.Display>
                <Inplace.Content>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Inplace.Content>
            </Inplace>
        </div>
    );
}

```

### Close

Use the `Inplace.Close` component to close the inplace content.

```tsx
import { Button } from 'primereact/button';
import { Inplace } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';

export default function InputDemo() {
    return (
        <div className="card">
            <Inplace>
                <Inplace.Display>Click to Edit</Inplace.Display>
                <Inplace.Content>
                    <span className="inline-flex items-center gap-2">
                        <InputText autoFocus />
                        <Inplace.Close as={Button} iconOnly role="button" text severity="danger">
                            <i className="pi pi-times"></i>
                        </Inplace.Close>
                    </span>
                </Inplace.Content>
            </Inplace>
        </div>
    );
}

```

### Image

Any content such as an image can be placed inside the `Inplace.Content` component.

```tsx
import { Inplace } from 'primereact/inplace';

export default function ImageDemo() {
    return (
        <div className="card">
            <Inplace>
                <Inplace.Display>
                    <span className="pi pi-image mr-2"></span>
                    <span>View Photo</span>
                </Inplace.Display>
                <Inplace.Content>
                    <img className="w-full sm:w-80 shadow-md" alt="Nature" src="https://primefaces.org/cdn/primevue/images/nature/nature8.jpg" />
                </Inplace.Content>
            </Inplace>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Inplace component defines _aria-live_ as "polite" by default, since any valid attribute is passed to the main container aria roles and attributes of the root element can be customized easily.

### Keyboard Support

| Key     | Function             |
| ------- | -------------------- |
| _enter_ | Switches to content. |


# Inplace Pass Through

Pass Through documentation for Inplace component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="inplace-pt" components={['Inplace']} />

## Inplace PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | InplacePassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| content | InplacePassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the content's DOM element. |
| display | InplacePassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the display's DOM element. |
| close | InplacePassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the close's DOM element. |


## InplaceDisplay PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | InplaceDisplayPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## InplaceContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | InplaceContentPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Inplace Theming

Theming documentation for Inplace component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-inplace | Class name of the root element |
| p-inplace-display | Class name of the display element |
| p-inplace-content | Class name of the content element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| inplace.padding | --p-inplace-padding | Padding of root |
| inplace.border.radius | --p-inplace-border-radius | Border radius of root |
| inplace.focus.ring.width | --p-inplace-focus-ring-width | Focus ring width of root |
| inplace.focus.ring.style | --p-inplace-focus-ring-style | Focus ring style of root |
| inplace.focus.ring.color | --p-inplace-focus-ring-color | Focus ring color of root |
| inplace.focus.ring.offset | --p-inplace-focus-ring-offset | Focus ring offset of root |
| inplace.focus.ring.shadow | --p-inplace-focus-ring-shadow | Focus ring shadow of root |
| inplace.transition.duration | --p-inplace-transition-duration | Transition duration of root |
| inplace.display.hover.background | --p-inplace-display-hover-background | Hover background of display |
| inplace.display.hover.color | --p-inplace-display-hover-color | Hover color of display |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# InputOtp API

API documentation for InputOtp component


## InputOtp

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: InputOtpInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: InputOtpInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<InputOtpPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: InputOtpInstance) => ReactNode) | null | The children to render. |
| size | "small" \\| "large" | null | Defines the size of the InputText. |
| variant | "outlined" \\| "filled" | null | Specifies the input variant of the component. |
| disabled | boolean | false | When present, it specifies that the element should be disabled. |
| value | string | null | Specifies whether a inputotp should be checked or not. |
| defaultValue | string | null | Specifies whether a inputotp should be checked or not. |
| integerOnly | boolean | false | When present, it specifies that only integers are allowed. |
| mask | boolean | false | Mask pattern. |
| onValueChange | (event: useInputOtpValueChangeEvent) => void | null | Callback to invoke when value changes. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | string | null | Value of the otp. |
| tokens | string[] | null | Tokens of the otp. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useInputOtpState | null | State of the input OTP. |
| registerText | () => number | null | Register a text input. |
| inputType | () => string | null | Returns the input type based on configuration. |
| inputMode | () => string | null | Returns the input mode for mobile keyboards. |
| onInput | (event: FormEvent<HTMLInputElement>, index: number) => void | null | Input event handler. |
| onClick | (event: MouseEvent<HTMLInputElement>) => void | null | Click event handler. |
| onKeyDown | (event: KeyboardEvent<HTMLInputElement>) => void | null | Key down event handler. |
| onPaste | (event: ClipboardEvent<HTMLInputElement>) => void | null | Paste event handler. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of InputOtp component. | [object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of InputOtp component. | [object Object] |


## InputOtpText

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: InputOtpTextInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: InputOtpTextInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<InputOtpTextPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: InputOtpTextInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| inputotp | InputOtpInstance | null | Instance of the InputOtp component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of InputOtpText component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of InputOtpText component. | [object Object] |


## useInputOtp

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | string | null | Specifies whether a inputotp should be checked or not. |
| defaultValue | string | null | Specifies whether a inputotp should be checked or not. |
| integerOnly | boolean | false | When present, it specifies that only integers are allowed. |
| mask | boolean | false | Mask pattern. |
| onValueChange | (event: useInputOtpValueChangeEvent) => void | null | Callback to invoke when value changes. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | string | null | Value of the otp. |
| tokens | string[] | null | Tokens of the otp. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useInputOtpState | null | State of the input OTP. |
| registerText | () => number | null | Register a text input. |
| inputType | () => string | null | Returns the input type based on configuration. |
| inputMode | () => string | null | Returns the input mode for mobile keyboards. |
| onInput | (event: FormEvent<HTMLInputElement>, index: number) => void | null | Input event handler. |
| onClick | (event: MouseEvent<HTMLInputElement>) => void | null | Click event handler. |
| onKeyDown | (event: KeyboardEvent<HTMLInputElement>) => void | null | Key down event handler. |
| onPaste | (event: ClipboardEvent<HTMLInputElement>) => void | null | Paste event handler. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.useinputotp.events.useInputOtpValueChangeEvent | useInputOtpValueChangeEvent | Custom value change event. |  | [object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useInputOtp headless. | [object Object] |



# InputOtp

InputOtp is used to enter one time passwords.


## Usage

```tsx
import { InputOtp } from 'primereact/inputotp';
```

```tsx
<InputOtp>
    <InputOtp.Text />
</InputOtp>
```

## Examples

### Basic

`InputOtp` requires a `InputOtp.Text` component to display the input fields.

```tsx
import { InputOtp } from 'primereact/inputotp';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <InputOtp defaultValue={''}>
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
            </InputOtp>
        </div>
    );
}

```

### Mask

Enable the `mask` option to hide the values in the input fields.

```tsx
import { InputOtp } from 'primereact/inputotp';

export default function MaskDemo() {
    return (
        <div className="card flex justify-center">
            <InputOtp defaultValue={''} mask>
                {Array.from({ length: 4 }, (_, index) => (
                    <InputOtp.Text key={index} />
                ))}
            </InputOtp>
        </div>
    );
}

```

### Integer Only

When `integerOnly` is present, only integers can be accepted as input.

```tsx
import { InputOtp } from 'primereact/inputotp';

export default function IntegerOnlyDemo() {
    return (
        <div className="card flex justify-center">
            <InputOtp defaultValue={''} integerOnly>
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
            </InputOtp>
        </div>
    );
}

```

### Filled

Specify the `variant` property as `filled` to display the component with a higher visual emphasis than the default `outlined` style.

```tsx
import { InputOtp } from 'primereact/inputotp';

export default function FilledDemo() {
    return (
        <div className="card flex justify-center">
            <InputOtp defaultValue={''} variant="filled">
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
            </InputOtp>
        </div>
    );
}

```

### Sizes

InputOtp provides `small` and `large` sizes as alternatives to the base.

```tsx
import { InputOtp } from 'primereact/inputotp';

export default function SizesDemo() {
    return (
        <div className="card flex flex-col items-center gap-4">
            <InputOtp defaultValue={''} size="small">
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
            </InputOtp>
            <InputOtp defaultValue={''}>
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
            </InputOtp>
            <InputOtp defaultValue={''} size="large">
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
                <InputOtp.Text />
            </InputOtp>
        </div>
    );
}

```

### Custom

Define a template with your own UI elements with bindings to the provided events and attributes to replace the default design.

```tsx
import { InputOtp } from 'primereact/inputotp';

export default function CustomDemo() {
    return (
        <div className="card flex justify-center">
            <InputOtp defaultValue={''}>
                {Array.from({ length: 4 }, (_, index) => {
                    return (
                        <InputOtp.Text
                            key={index}
                            className="w-[40px] text-4xl appearance-none text-center transition-all duration-200 bg-transparent border-0 border-b-2 border-b-[var(--p-inputtext-border-color)] rounded-none focus:outline-none focus:border-b-[var(--p-primary-color)]"
                        />
                    );
                })}
            </InputOtp>
        </div>
    );
}

```

### Sample

A sample UI implementation with templating and additional elements.

```tsx
import { MinusIcon } from '@primereact/icons';
import { Button } from 'primereact/button';
import { InputOtp } from 'primereact/inputotp';
import * as React from 'react';

export default function SampleDemo() {
    return (
        <div className="card flex justify-center">
            <div className="flex flex-col items-center">
                <div className="font-bold text-xl mb-2">Authenticate Your Account</div>
                <p className="text-surface-500 dark:text-surface-400 block mb-8">Please enter the code sent to your phone.</p>
                <InputOtp defaultValue={''} className="gap-0">
                    {Array.from({ length: 6 }, (_, index) => {
                        const inputClasses = [
                            'w-12 h-12 text-2xl appearance-none text-center transition-all duration-200',
                            'border border-[var(--p-inputtext-border-color)] rounded-none bg-transparent',
                            'outline-offset-[-2px] outline-transparent transition-[outline-color] duration-300',
                            'text-[var(--p-inputtext-color)]',
                            index === 0 || index === 3 ? 'rounded-l-xl' : '',
                            index === 2 || index === 5 ? 'rounded-r-xl' : '',
                            !(index === 2 || index === 5) ? 'border-r-0' : '',
                            'focus:outline-2 focus:outline-[var(--p-focus-ring-color)]'
                        ].join(' ');

                        return (
                            <React.Fragment key={index}>
                                <InputOtp.Text className={inputClasses} />
                                {index === 2 && (
                                    <div className="px-4">
                                        <MinusIcon />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </InputOtp>
                <div className="flex justify-between mt-8 self-stretch">
                    <Button variant="link" className="p-0">
                        Resend Code
                    </Button>
                    <Button>Submit Code</Button>
                </div>
            </div>
        </div>
    );
}

```

### Accessibility

#### Screen Reader Support

Input OTP uses a set of InputText components, refer to the InputText component for more information about the screen reader support.

#### Keyboard Support

| Key           | Function                                                         |
| ------------- | ---------------------------------------------------------------- |
| `tab`         | Moves focus to the input otp.                                    |
| `right arrow` | Moves focus to the next input element.                           |
| `left arrow`  | Moves focus to the previous input element.                       |
| `backspace`   | Deletes the input and moves focus to the previous input element. |


# InputOtp Pass Through

Pass Through documentation for InputOtp component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="inputotp-pt" components={['InputOtp']} />

## PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | InputOtpPassThroughType<InputHTMLAttributes<HTMLInputElement>> | Used to pass attributes to the root's DOM element. |
| text | InputOtpPassThroughType<InputHTMLAttributes<HTMLInputElement>> | Used to pass attributes to the input's DOM element. |



# InputOtp Theming

Theming documentation for InputOtp component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-inputotp | Class name of the root element |
| p-inputotp-input | Class name of the input element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| inputotp.gap | --p-inputotp-gap | Gap of root |
| inputotp.input.width | --p-inputotp-input-width | Width of input |
| inputotp.input.sm.width | --p-inputotp-input-sm-width | Width of input in small screens |
| inputotp.input.lg.width | --p-inputotp-input-lg-width | Width of input in large screens |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# InputText API

API documentation for InputText component


## InputText

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: InputTextInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: InputTextInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<InputTextPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: InputTextInstance) => ReactNode) | null | The children to render. |
| size | "small" \\| "large" | null | Defines the size of the InputText. |
| variant | "outlined" \\| "filled" | null | Specifies the input variant of the component. |
| fluid | boolean | null | When enabled, the component will stretch to occupy the full width of its container. |
| invalid | boolean | false | When present, it specifies that the component should have invalid state style. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of InputText component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of InputText component. | [object Object] |



# InputText

InputText is an extension to standard input element with icons and theming.


## Usage

```tsx
import { InputText } from 'primereact/inputtext';
```

```tsx
<InputText placeholder="Enter text" />
```

## Examples

### Basic

```tsx
import { InputText } from 'primereact/inputtext';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <InputText placeholder="Enter text" />
        </div>
    );
}

```

### Filled

Specify the `variant` property as `filled` to display the component with a higher visual emphasis than the default `outlined` style.

```tsx
import { InputText } from 'primereact/inputtext';

export default function FilledDemo() {
    return (
        <div className="card flex justify-center">
            <InputText placeholder="Enter text" variant="filled" />
        </div>
    );
}

```

### Sizes

InputText provides `small` and `large` sizes as alternatives to the base by setting the `size` property.

```tsx
import { InputText } from 'primereact/inputtext';

export default function SizeDemo() {
    return (
        <div className="card flex flex-col items-center gap-4">
            <InputText size="small" placeholder="Small" />
            <InputText placeholder="Normal" />
            <InputText size="large" placeholder="Large" />
        </div>
    );
}

```

### Invalid

Invalid state is displayed using the `invalid` prop to indicate a failed validation. You can use this style when integrating with form validation libraries.

```tsx
import { InputText } from 'primereact/inputtext';
import * as React from 'react';

export default function InvalidDemo() {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');

    return (
        <div className="card flex flex-wrap gap-4 items-center justify-center">
            <InputText value={value1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue1(e.target.value)} placeholder="Enter text" invalid={value1 === ''} />
            <InputText value={value2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue2(e.target.value)} placeholder="Enter text" invalid={value2 === ''} variant="filled" />
        </div>
    );
}

```

### Disabled

When `disabled` is present, the element cannot be edited and focused.

```tsx
import { InputText } from 'primereact/inputtext';

export default function DisabledDemo() {
    return (
        <div className="card flex justify-center">
            <InputText placeholder="Disabled" disabled />
        </div>
    );
}

```


# InputText Pass Through

Pass Through documentation for InputText component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="inputtext-pt" components={['InputText']} />

## InputText PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | InputTextPassThroughType<InputHTMLAttributes<HTMLInputElement>> | Used to pass attributes to the root's DOM element. |



# InputText Theming

Theming documentation for InputText component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-inputtext | Class name of the root element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| inputtext.background | --p-inputtext-background | Background of root |
| inputtext.disabled.background | --p-inputtext-disabled-background | Disabled background of root |
| inputtext.filled.background | --p-inputtext-filled-background | Filled background of root |
| inputtext.filled.hover.background | --p-inputtext-filled-hover-background | Filled hover background of root |
| inputtext.filled.focus.background | --p-inputtext-filled-focus-background | Filled focus background of root |
| inputtext.border.color | --p-inputtext-border-color | Border color of root |
| inputtext.hover.border.color | --p-inputtext-hover-border-color | Hover border color of root |
| inputtext.focus.border.color | --p-inputtext-focus-border-color | Focus border color of root |
| inputtext.invalid.border.color | --p-inputtext-invalid-border-color | Invalid border color of root |
| inputtext.color | --p-inputtext-color | Color of root |
| inputtext.disabled.color | --p-inputtext-disabled-color | Disabled color of root |
| inputtext.placeholder.color | --p-inputtext-placeholder-color | Placeholder color of root |
| inputtext.invalid.placeholder.color | --p-inputtext-invalid-placeholder-color | Invalid placeholder color of root |
| inputtext.shadow | --p-inputtext-shadow | Shadow of root |
| inputtext.padding.x | --p-inputtext-padding-x | Padding x of root |
| inputtext.padding.y | --p-inputtext-padding-y | Padding y of root |
| inputtext.border.radius | --p-inputtext-border-radius | Border radius of root |
| inputtext.focus.ring.width | --p-inputtext-focus-ring-width | Focus ring width of root |
| inputtext.focus.ring.style | --p-inputtext-focus-ring-style | Focus ring style of root |
| inputtext.focus.ring.color | --p-inputtext-focus-ring-color | Focus ring color of root |
| inputtext.focus.ring.offset | --p-inputtext-focus-ring-offset | Focus ring offset of root |
| inputtext.focus.ring.shadow | --p-inputtext-focus-ring-shadow | Focus ring shadow of root |
| inputtext.transition.duration | --p-inputtext-transition-duration | Transition duration of root |
| inputtext.sm.font.size | --p-inputtext-sm-font-size | Sm font size of root |
| inputtext.sm.padding.x | --p-inputtext-sm-padding-x | Sm padding x of root |
| inputtext.sm.padding.y | --p-inputtext-sm-padding-y | Sm padding y of root |
| inputtext.lg.font.size | --p-inputtext-lg-font-size | Lg font size of root |
| inputtext.lg.padding.x | --p-inputtext-lg-padding-x | Lg padding x of root |
| inputtext.lg.padding.y | --p-inputtext-lg-padding-y | Lg padding y of root |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Message

Message component is used to display inline messages.


## Usage

```tsx
import { Message } from 'primereact/message';
```

```tsx
<Message>
    <Message.Content>
        <Message.Text>Message</Message.Text>
    </Message.Content>
</Message>
```

## Examples

### Basic

```tsx
import { Message } from 'primereact/message';

export default function BasicDemo() {
    return (
        <div className="card">
            <Message>
                <Message.Content>
                    <Message.Text>Message Content</Message.Text>
                </Message.Content>
            </Message>
        </div>
    );
}

```

### Severity

The `severity` option specifies the type of the message.

```tsx
import { Message } from 'primereact/message';

export default function SeverityDemo() {
    return (
        <div className="card flex items-center justify-center gap-4">
            <Message severity="success">
                <Message.Content>
                    <Message.Text>Success Message</Message.Text>
                </Message.Content>
            </Message>
            <Message severity="info">
                <Message.Content>
                    <Message.Text>Info Message</Message.Text>
                </Message.Content>
            </Message>
            <Message severity="warn">
                <Message.Content>
                    <Message.Text>Warn Message</Message.Text>
                </Message.Content>
            </Message>
            <Message severity="error">
                <Message.Content>
                    <Message.Text>Error Message</Message.Text>
                </Message.Content>
            </Message>
            <Message severity="secondary">
                <Message.Content>
                    <Message.Text>Secondary Message</Message.Text>
                </Message.Content>
            </Message>
            <Message severity="contrast">
                <Message.Content>
                    <Message.Text>Contrast Message</Message.Text>
                </Message.Content>
            </Message>
        </div>
    );
}

```

### Icon

`Message.Icon` is used to display an icon.

```tsx
import { Avatar } from 'primereact/avatar';
import { Message } from 'primereact/message';

export default function IconDemo() {
    return (
        <div className="card flex justify-center gap-4">
            <Message severity="info">
                <Message.Content>
                    <Message.Icon className="pi pi-info-circle" />
                    <Message.Text>Info Message</Message.Text>
                </Message.Content>
            </Message>
            <Message severity="success">
                <Message.Content>
                    <Message.Icon asChild>
                        <Avatar shape="circle">
                            <Avatar.Image src="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" />
                        </Avatar>
                    </Message.Icon>
                    <Message.Text>How may I help you?</Message.Text>
                </Message.Content>
            </Message>
        </div>
    );
}

```

### Variant

Configure the `variant` value as `outlined` or `simple`.

```tsx
import { Message } from 'primereact/message';

export default function VariantDemo() {
    return (
        <div className="card space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Outlined</h3>
                <div className="flex items-center gap-4">
                    <Message severity="success" variant="outlined">
                        <Message.Content>
                            <Message.Text>Success Message</Message.Text>
                        </Message.Content>
                    </Message>
                    <Message severity="info" variant="outlined">
                        <Message.Content>
                            <Message.Text>Info Message</Message.Text>
                        </Message.Content>
                    </Message>
                    <Message severity="warn" variant="outlined">
                        <Message.Content>
                            <Message.Text>Warn Message</Message.Text>
                        </Message.Content>
                    </Message>
                    <Message severity="error" variant="outlined">
                        <Message.Content>
                            <Message.Text>Error Message</Message.Text>
                        </Message.Content>
                    </Message>
                    <Message severity="secondary" variant="outlined">
                        <Message.Content>
                            <Message.Text>Secondary Message</Message.Text>
                        </Message.Content>
                    </Message>
                    <Message severity="contrast" variant="outlined">
                        <Message.Content>
                            <Message.Text>Contrast Message</Message.Text>
                        </Message.Content>
                    </Message>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Simple</h3>
                <div className="flex items-center gap-4">
                    <Message severity="success" variant="simple">
                        <Message.Content>
                            <Message.Text>Success Message</Message.Text>
                        </Message.Content>
                    </Message>
                    <Message severity="info" variant="simple">
                        <Message.Content>
                            <Message.Text>Info Message</Message.Text>
                        </Message.Content>
                    </Message>
                    <Message severity="warn" variant="simple">
                        <Message.Content>
                            <Message.Text>Warn Message</Message.Text>
                        </Message.Content>
                    </Message>
                    <Message severity="error" variant="simple">
                        <Message.Content>
                            <Message.Text>Error Message</Message.Text>
                        </Message.Content>
                    </Message>
                    <Message severity="secondary" variant="simple">
                        <Message.Content>
                            <Message.Text>Secondary Message</Message.Text>
                        </Message.Content>
                    </Message>
                    <Message severity="contrast" variant="simple">
                        <Message.Content>
                            <Message.Text>Contrast Message</Message.Text>
                        </Message.Content>
                    </Message>
                </div>
            </div>
        </div>
    );
}

```

### Sizes

Message provides `small` and `large` sizes as alternatives to the base.

```tsx
import { Message } from 'primereact/message';

export default function SizesDemo() {
    return (
        <div className="card flex flex-col items-center gap-4">
            <Message size="small">
                <Message.Content>
                    <Message.Icon className="pi pi-send" />
                    <Message.Text>Small Message</Message.Text>
                </Message.Content>
            </Message>
            <Message>
                <Message.Content>
                    <Message.Icon className="pi pi-send" />
                    <Message.Text>Normal Message</Message.Text>
                </Message.Content>
            </Message>
            <Message size="large">
                <Message.Content>
                    <Message.Icon className="pi pi-send" />
                    <Message.Text>Large Message</Message.Text>
                </Message.Content>
            </Message>
        </div>
    );
}

```

### Dynamic

Multiple messages can be displayed.

```tsx
import { MessageProps } from '@primereact/types/shared/message';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import * as React from 'react';

export default function DynamicDemo() {
    const [messages, setMessages] = React.useState<MessageProps[]>([]);

    const addMessages = () => {
        setMessages([
            { severity: 'info', content: 'Dynamic Info Message' },
            { severity: 'success', content: 'Dynamic Success Message' },
            { severity: 'warn', content: 'Dynamic Warn Message' }
        ]);
    };

    const clearMessages = () => {
        setMessages([]);
    };

    return (
        <div className="card flex flex-col items-center justify-center gap-4">
            <div className="flex gap-2">
                <Button onClick={addMessages}>Add Messages</Button>
                <Button severity="secondary" onClick={clearMessages}>
                    Clear Messages
                </Button>
            </div>
            {messages.map((item, index) => (
                <Message key={index} severity={item.severity}>
                    <Message.Content>
                        <Message.Text>{item.content}</Message.Text>
                    </Message.Content>
                </Message>
            ))}
        </div>
    );
}

```

### Closable

`Message.Close` is a triggerable element used to close the message.

```tsx
import { Message } from 'primereact/message';

export default function ClosableDemo() {
    return (
        <div className="card">
            <Message>
                <Message.Content>
                    <Message.Text>This is a closable message.</Message.Text>
                    <Message.Close />
                </Message.Content>
            </Message>
        </div>
    );
}

```

### Life

Messages can disappear automatically by defined the `life` in milliseconds.

```tsx
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import * as React from 'react';

export default function LifeDemo() {
    const [visible, setVisible] = React.useState(false);

    return (
        <div className="card flex flex-col items-center justify-center gap-4">
            <Button disabled={visible} onClick={() => setVisible(true)}>
                Show Message
            </Button>
            {visible && (
                <Message life={3000} severity="success" onClose={() => setVisible(false)}>
                    <Message.Content>
                        <Message.Text>Auto Disappear Message</Message.Text>
                    </Message.Content>
                </Message>
            )}
        </div>
    );
}

```

## Accessibility

### Screen Reader

Message component uses `alert` role that implicitly defines `aria-live` as "assertive" and `aria-atomic` as "true". Since any attribute is passed to the root element, attributes like `aria-labelledby` and `aria-label` can optionally be used as well.

Close element is a `button` with an `aria-label` that refers to the `aria.close` property of the locale API by default, you may use `closeButtonProps` to customize the element and override the default `aria-label`.

### Close Button Keyboard Support

| Key     | Function            |
| ------- | ------------------- |
| `enter` | Closes the message. |
| `space` | Closes the message. |


# MeterGroup API

API documentation for MeterGroup component


## MeterGroup

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: MeterGroupInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: MeterGroupInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<MeterGroupPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: MeterGroupInstance) => ReactNode) | null | The children to render. |
| orientation | "horizontal" \\| "vertical" | horizontal | Specifies the layout of the component. |
| min | number | 0 | Minimum boundary value. |
| max | number | 100 | Maximum boundary value. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| totalPercent | number | null | The total percentage of the meter group. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| colors | Record<METERGROUP_DEFAULT_COLORS_TYPE, string> | null |  |
| getNextColorIndex | () => number | null |  |
| getNextLabelIndex | () => number | null |  |
| state | useMeterGroupState | null | The state of the useMeterGroup. |
| percent | (meterValue: number) => number | null | Converts a meter value to a percentage. |
| percentAsString | (meterValue: number) => string | null | Converts a meter value to a percentage string. |
| updateTotalPercent | (percent: number) => void | null | Updates the total percentage of the meter group. |
| resetTotalPercent | () => void | null | Resets the total percentage of the meter group to 0. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of MeterGroup component. | [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of MeterGroup component. | [object Object] |


## MeterGroupMeters

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: MeterGroupMetersInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: MeterGroupMetersInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<MeterGroupMetersPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: MeterGroupMetersInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| metergroup | MeterGroupInstance | null | The MeterGroup component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of MeterGroupMeters component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of MeterGroupMeters component. | [object Object] |


## MeterGroupMeter

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: MeterGroupMeterInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: MeterGroupMeterInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<MeterGroupMeterPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: MeterGroupMeterInstance) => ReactNode) | null | The children to render. |
| value | number | null | Defines the value of the meter. |
| color | string & {} \\| METERGROUP_DEFAULT_COLORS_TYPE | null | Defines the color of the meter. |
| index | number | null | Defines the index of the meter. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| metergroup | MeterGroupInstance | null | The MeterGroup component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of MeterGroupMeter component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of MeterGroupMeter component. | [object Object] |


## MeterGroupLabels

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: MeterGroupLabelsInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: MeterGroupLabelsInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<MeterGroupLabelsPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: MeterGroupLabelsInstance) => ReactNode) | null | The children to render. |
| orientation | "horizontal" \\| "vertical" | horizontal | Specifies the label orientation of the component. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| metergroup | MeterGroupInstance | null | The MeterGroup component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of MeterGroupLabels component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of MeterGroupLabels component. | [object Object] |


## MeterGroupLabel

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: MeterGroupLabelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: MeterGroupLabelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<MeterGroupLabelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: MeterGroupLabelInstance) => ReactNode) | null | The children to render. |
| color | string | null | Defines the color of the label. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| metergroup | MeterGroupInstance | null | The MeterGroup component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of MeterGroupLabel component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of MeterGroupLabel component. | [object Object] |


## MeterGroupIcon

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: MeterGroupIconInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: MeterGroupIconInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<MeterGroupIconPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: MeterGroupIconInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| metergroup | MeterGroupInstance | null | The MeterGroup component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of MeterGroupIcon component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of MeterGroupIcon component. | [object Object] |


## MeterGroupMarker

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: MeterGroupMarkerInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: MeterGroupMarkerInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<MeterGroupMarkerPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: MeterGroupMarkerInstance) => ReactNode) | null | The children to render. |
| color | string & {} \\| METERGROUP_DEFAULT_COLORS_TYPE | null | Defines the color of the marker. |
| index | number | null | Defines the index of the marker. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| metergroup | MeterGroupInstance | null | The MeterGroup component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of MeterGroupMarker component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of MeterGroupMarker component. | [object Object] |


## MeterGroupText

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: MeterGroupTextInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: MeterGroupTextInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<MeterGroupTextPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: MeterGroupTextInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| metergroup | MeterGroupInstance | null | The MeterGroup component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of MeterGroupText component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of MeterGroupText component. | [object Object] |


## useMeterGroup

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| min | number | 0 | Minimum boundary value. |
| max | number | 100 | Maximum boundary value. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| totalPercent | number | null | The total percentage of the meter group. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useMeterGroupState | null | The state of the useMeterGroup. |
| percent | (meterValue: number) => number | null | Converts a meter value to a percentage. |
| percentAsString | (meterValue: number) => string | null | Converts a meter value to a percentage string. |
| updateTotalPercent | (percent: number) => void | null | Updates the total percentage of the meter group. |
| resetTotalPercent | () => void | null | Resets the total percentage of the meter group to 0. |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useMeterGroup headless. | [object Object] |



# MeterGroup

MeterGroup displays scalar measurements within a known range.


## Usage

```tsx
import { MeterGroup } from 'primereact/metergroup';
```

```tsx
<MeterGroup>
    <MeterGroup.Meters>
        <MeterGroup.Meter value={value} color={color} />
    </MeterGroup.Meters>
    <MeterGroup.Labels>
        <MeterGroup.Label>
            <MeterGroup.Marker color={color} />
            <MeterGroup.Text>Value</MeterGroup.Text>
        </MeterGroup.Label>
    </MeterGroup.Labels>
</MeterGroup>
```

## Examples

### Basic

`MeterGroup` consists of `MeterGroup.Meters` and `MeterGroup.Labels` components. Data is displayed in the `MeterGroup.Meter` component using the `value` and `color` properties.

```tsx
import { MeterGroup } from 'primereact/metergroup';

export default function BasicDemo() {
    const value = { label: 'Space used', value: 15, color: 'var(--p-primary-color)' };

    return (
        <div className="card">
            <MeterGroup>
                <MeterGroup.Meters>
                    <MeterGroup.Meter value={value.value} color={value.color} />
                </MeterGroup.Meters>
                <MeterGroup.Labels>
                    <MeterGroup.Label>
                        <MeterGroup.Marker color={value.color} />
                        <MeterGroup.Text>
                            {value.label} ({value.value}%)
                        </MeterGroup.Text>
                    </MeterGroup.Label>
                </MeterGroup.Labels>
            </MeterGroup>
        </div>
    );
}

```

### Multiple

Adding more `MeterGroup.Meter` components displays the meters in a group. Pass `index` to `MeterGroup.Meter` and `MeterGroup.Marker` to identify the meter's and label's position to get the color.

```tsx
import { MeterGroup } from 'primereact/metergroup';

export default function MultipleDemo() {
    const values = [
        { label: 'Apps', value: 14 },
        { label: 'Messages', value: 12 },
        { label: 'Media', value: 8 },
        { label: 'System', value: 12 },
        { label: 'Documents', value: 6 },
        { label: 'Cache', value: 11 },
        { label: 'Other', value: 9 }
    ];

    return (
        <div className="card">
            <MeterGroup>
                <MeterGroup.Meters>
                    {values.map((item, index) => (
                        <MeterGroup.Meter key={`meter_${index}`} index={index} value={item.value} />
                    ))}
                </MeterGroup.Meters>
                <MeterGroup.Labels>
                    {values.map((item, index) => (
                        <MeterGroup.Label key={`label_${index}`}>
                            <MeterGroup.Marker index={index} />
                            <MeterGroup.Text>
                                {item.label} ({item.value}%)
                            </MeterGroup.Text>
                        </MeterGroup.Label>
                    ))}
                </MeterGroup.Labels>
            </MeterGroup>
        </div>
    );
}

```

### Color

`MeterGroup.Meter` and `MeterGroup.Marker` components supports custom color values. Use `color` property or pass color with className or style. `color` has custom color names like `blue`, `emerald`, `violet`, `amber`, etc. or hex, rgb, hsl, or hsla values.

```tsx
import { MeterGroup } from 'primereact/metergroup';

export default function ColorDemo() {
    return (
        <div className="card">
            <MeterGroup>
                <MeterGroup.Meters>
                    <MeterGroup.Meter value={12} color="violet" />
                    <MeterGroup.Meter value={14} color="#10B981" />
                    <MeterGroup.Meter value={10} color="rgb(244, 63, 94)" />
                    <MeterGroup.Meter value={8} className="bg-blue-500" />
                    <MeterGroup.Meter value={10} style={{ backgroundColor: '#EAB308' }} />
                </MeterGroup.Meters>
                <MeterGroup.Labels>
                    <MeterGroup.Label>
                        <MeterGroup.Marker color="violet" />
                        <MeterGroup.Text>Violet</MeterGroup.Text>
                    </MeterGroup.Label>
                    <MeterGroup.Label>
                        <MeterGroup.Marker color="#10B981" />
                        <MeterGroup.Text>Emerald</MeterGroup.Text>
                    </MeterGroup.Label>
                    <MeterGroup.Label>
                        <MeterGroup.Marker color="rgb(244, 63, 94)" />
                        <MeterGroup.Text>Rose</MeterGroup.Text>
                    </MeterGroup.Label>
                    <MeterGroup.Label>
                        <MeterGroup.Marker className="bg-blue-500" />
                        <MeterGroup.Text>Blue</MeterGroup.Text>
                    </MeterGroup.Label>
                    <MeterGroup.Label>
                        <MeterGroup.Marker style={{ backgroundColor: '#EAB308' }} />
                        <MeterGroup.Text>Yellow</MeterGroup.Text>
                    </MeterGroup.Label>
                </MeterGroup.Labels>
            </MeterGroup>
        </div>
    );
}

```

### Icon

Icons can be displayed next to the labels instead of the default `MeterGroup.Marker`.

```tsx
import { MeterGroup } from 'primereact/metergroup';

export default function IconDemo() {
    const values = [
        { label: 'Apps', value: 16, icon: 'pi pi-table' },
        { label: 'Messages', value: 8, icon: 'pi pi-inbox' },
        { label: 'Media', value: 24, icon: 'pi pi-image' },
        { label: 'System', value: 10, icon: 'pi pi-cog' }
    ];

    return (
        <div className="card">
            <MeterGroup>
                <MeterGroup.Meters>
                    {values.map(({ value }, index) => (
                        <MeterGroup.Meter key={`meter_${index}`} value={value} index={index} />
                    ))}
                </MeterGroup.Meters>
                <MeterGroup.Labels>
                    {values.map(({ value, label, icon }, index) => (
                        <MeterGroup.Label key={`label_${index}`}>
                            <MeterGroup.Icon className={icon} index={index} />
                            <MeterGroup.Text>
                                {label} ({value}%)
                            </MeterGroup.Text>
                        </MeterGroup.Label>
                    ))}
                </MeterGroup.Labels>
            </MeterGroup>
        </div>
    );
}

```

### Label

The default orientation of the labels is horizontal, and the vertical alternative is available through the `orientation` option.

```tsx
import { MeterGroup } from 'primereact/metergroup';

export default function LabelDemo() {
    const values = [
        { label: 'Apps', value: 16, icon: 'pi pi-table' },
        { label: 'Messages', value: 8, icon: 'pi pi-inbox' },
        { label: 'Media', value: 24, icon: 'pi pi-image' },
        { label: 'System', value: 10, icon: 'pi pi-cog' }
    ];

    return (
        <div className="card">
            <MeterGroup>
                <MeterGroup.Labels orientation="vertical">
                    {values.map((item, index) => (
                        <MeterGroup.Label key={`label_${index}`}>
                            <MeterGroup.Marker index={index} />
                            <MeterGroup.Text>
                                {item.label} ({item.value}%)
                            </MeterGroup.Text>
                        </MeterGroup.Label>
                    ))}
                </MeterGroup.Labels>
                <MeterGroup.Meters>
                    {values.map((item, index) => (
                        <MeterGroup.Meter key={`meter_${index}`} value={item.value} index={index} />
                    ))}
                </MeterGroup.Meters>
            </MeterGroup>
        </div>
    );
}

```

### Vertical

Layout of the MeterGroup is configured with the `orientation` property that accepts either `horizontal` or `vertical` as available options.

```tsx
import { MeterGroup } from 'primereact/metergroup';

export default function VerticalDemo() {
    const values = [
        { label: 'Apps', value: 24 },
        { label: 'Messages', value: 16 },
        { label: 'Media', value: 24 },
        { label: 'System', value: 12 }
    ];

    return (
        <div className="card flex justify-center" style={{ height: '360px' }}>
            <MeterGroup orientation="vertical">
                <MeterGroup.Meters>
                    {values.map((item, index) => (
                        <MeterGroup.Meter key={index} value={item.value} index={index} />
                    ))}
                </MeterGroup.Meters>
                <MeterGroup.Labels orientation="vertical">
                    {values.map((item, index) => (
                        <MeterGroup.Label key={`label_${index}`}>
                            <MeterGroup.Marker index={index} />
                            <MeterGroup.Text>
                                {item.label} ({item.value}%)
                            </MeterGroup.Text>
                        </MeterGroup.Label>
                    ))}
                </MeterGroup.Labels>
            </MeterGroup>
        </div>
    );
}

```

### Min-Max

Boundaries are configured with the `min` and `max` values whose defaults are 0 and 100 respectively.

```tsx
import { MeterGroup } from 'primereact/metergroup';

export default function MinMaxDemo() {
    const values = [
        { label: 'Apps', value: 16 },
        { label: 'Messages', value: 8 },
        { label: 'Media', value: 24 },
        { label: 'System', value: 10 }
    ];

    const percent = (meter: number) => {
        return Math.round(Math.max(0, Math.min(100, (meter / 200) * 100))) + '%';
    };

    return (
        <div className="card">
            <MeterGroup max={200}>
                <MeterGroup.Meters>
                    {values.map((item, index) => (
                        <MeterGroup.Meter key={`meter_${index}`} value={item.value} index={index} />
                    ))}
                </MeterGroup.Meters>
                <MeterGroup.Labels>
                    {values.map((item, index) => (
                        <MeterGroup.Label key={`label_${index}`}>
                            <MeterGroup.Marker index={index} />
                            <MeterGroup.Text>
                                {item.label} ({percent(item.value)})
                            </MeterGroup.Text>
                        </MeterGroup.Label>
                    ))}
                </MeterGroup.Labels>
            </MeterGroup>
        </div>
    );
}

```

### Template

MeterGroup provides templating support for labels, meter items, and content around the meters.

```tsx
import { MeterGroup } from 'primereact/metergroup';

export default function TemplateDemo() {
    const values = [
        { label: 'Apps', color1: '#34d399', color2: '#fbbf24', value: 25, icon: 'pi pi-table' },
        { label: 'Messages', color1: '#fbbf24', color2: '#60a5fa', value: 15, icon: 'pi pi-inbox' },
        { label: 'Media', color1: '#60a5fa', color2: '#c084fc', value: 20, icon: 'pi pi-image' },
        { label: 'System', color1: '#c084fc', color2: '#c084fc', value: 10, icon: 'pi pi-cog' }
    ];

    const totalPercent = values.reduce((acc, value) => acc + value.value, 0);

    const percent = (meter: number) => {
        return Math.round(Math.max(0, Math.min(100, (meter / 100) * 100))) + '%';
    };

    return (
        <div className="card">
            <MeterGroup max={200} aria-valuenow={totalPercent}>
                <MeterGroup.Labels>
                    {values.map((value, index) => (
                        <MeterGroup.Label key={`label_${index}`}>
                            {/* <Card className="flex-1 border border-surface shadow-none">
                                <div className="flex justify-between gap-8">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-surface-500 dark:text-surface-400 text-sm">{value.label}</span>
                                        <span className="font-bold text-lg">{value.value}%</span>
                                    </div>
                                    <span className="w-8 h-8 rounded-full inline-flex justify-center items-center text-center" style={{ backgroundColor: `${value.color1}`, color: '#ffffff' }}>
                                        <i className={value.icon} />
                                    </span>
                                </div>
                            </Card> */}
                        </MeterGroup.Label>
                    ))}
                </MeterGroup.Labels>
                <div className="flex justify-between mt-4 mb-2 relative">
                    <span>Storage</span>
                    <span style={{ width: totalPercent + '%' }} className="absolute text-right">
                        {totalPercent}%
                    </span>
                    <span className="font-medium">1TB</span>
                </div>

                <MeterGroup.Meters>
                    {values.map((item, index) => (
                        <MeterGroup.Meter
                            key={`meter_${index}`}
                            value={item.value}
                            style={{
                                background: `linear-gradient(to right, ${item.color1}, ${item.color2})`,
                                width: percent(item.value)
                            }}
                        ></MeterGroup.Meter>
                    ))}
                </MeterGroup.Meters>
                {/* <div className="flex justify-between mt-4">
                    <Button label="Manage Storage" outlined size="small" />
                    <Button label="Update Plan" size="small" />
                    </div> */}
            </MeterGroup>
        </div>
    );
}

```

## Accessibility

### Screen Reader

MeterGroup component uses meter role in addition to the aria-valuemin, aria-valuemax and aria-valuenow attributes. Value to describe the component can be defined using aria-labelledby prop.

### Keyboard Support

Component does not include any interactive elements.


# MeterGroup Pass Through

Pass Through documentation for MeterGroup component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="metergroup-pt" components={['MeterGroup']} />

## MeterGroup PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | MeterGroupPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| meters | MeterGroupPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the meters' DOM element. |
| meter | MeterGroupPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the meter's DOM element. |
| labels | MeterGroupPassThroughType<HTMLAttributes<HTMLOListElement>> | Used to pass attributes to the labels' DOM element. |
| label | MeterGroupPassThroughType<HTMLAttributes<HTMLLIElement>> | Used to pass attributes to the label's DOM element. |
| icon | MeterGroupPassThroughType<HTMLAttributes<HTMLElement>> | Used to pass attributes to the label icon's DOM element. |
| marker | MeterGroupPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the label marker's DOM element. |
| text | MeterGroupPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |


## MeterGroupMeters PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | MeterGroupMetersPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## MeterGroupMeter PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | MeterGroupMeterPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## MeterGroupLabels PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | MeterGroupLabelsPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## MeterGroupLabel PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | MeterGroupLabelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## MeterGroupIcon PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | MeterGroupIconPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## MeterGroupMarker PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | MeterGroupMarkerPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## MeterGroupText PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | MeterGroupTextPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# MeterGroup Theming

Theming documentation for MeterGroup component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-metergroup | Class name of the root element |
| p-metergroup-meters | Class name of the meters element |
| p-metergroup-meter | Class name of the meter element |
| p-metergroup-label-list | Class name of the label list element |
| p-metergroup-label | Class name of the label element |
| p-metergroup-label-icon | Class name of the label icon element |
| p-metergroup-label-marker | Class name of the label marker element |
| p-metergroup-label-text | Class name of the label text element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| metergroup.border.radius | --p-metergroup-border-radius | Border radius of root |
| metergroup.gap | --p-metergroup-gap | Gap of root |
| metergroup.meters.background | --p-metergroup-meters-background | Background of meters |
| metergroup.meters.size | --p-metergroup-meters-size | Size of meters |
| metergroup.label.gap | --p-metergroup-label-gap | Gap of label |
| metergroup.label.marker.size | --p-metergroup-label-marker-size | Size of label marker |
| metergroup.label.icon.size | --p-metergroup-label-icon-size | Size of label icon |
| metergroup.label.list.vertical.gap | --p-metergroup-label-list-vertical-gap | Vertical gap of label list |
| metergroup.label.list.horizontal.gap | --p-metergroup-label-list-horizontal-gap | Horizontal gap of label list |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Panel API

API documentation for Panel component


## Panel

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: PanelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: PanelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<PanelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: PanelInstance) => ReactNode) | null | The children to render. |
| toggleable | boolean | false | When enabled, the content of panel can be expanded and collapsed by clicking the header. |
| onToggle | (event: PanelToggleEvent) => void | null | Callback fired when the panel's toggle state changes. |
| collapsed | boolean | false | Whether the panel is collapsed. |
| onCollapse | (event: SyntheticEvent) => void | null | Callback triggered when the panel is collapsed. |
| onExpand | (event: SyntheticEvent) => void | null | Callback triggered when the panel is expanded. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| collapsed | boolean | null | Whether the panel is collapsed. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | usePanelState | null | The state of the usePanel. |
| contentRef | RefObject<HTMLDivElement> | null | Reference to the content element of the panel. |
| toggle | (event: SyntheticEvent) => void | null | Toggles the collapsed state of the panel. |
| expand | (event: SyntheticEvent) => void | null | Expands the panel. |
| collapse | (event: SyntheticEvent) => void | null | Collapses the panel. |
| onButtonClick | (event: SyntheticEvent) => void | null | Callback for when the toggle button is clicked. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.panel.events.PanelToggleEvent | PanelToggleEvent | Event fired when the panel's toggle state changes. |  | [object Object],[object Object] |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Panel component. | [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Panel component. | [object Object] |


## PanelHeader

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: PanelHeaderInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: PanelHeaderInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<PanelHeaderPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: PanelHeaderInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of PanelHeadercomponent. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of PanelHeadercomponent. | [object Object] |


## PanelHeaderActions

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: PanelHeaderActionsInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: PanelHeaderActionsInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<PanelHeaderActionsPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: PanelHeaderActionsInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of PanelHeaderActions component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of PanelHeaderActions component. | [object Object] |


## PanelTitle

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: PanelTitleInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: PanelTitleInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<PanelTitlePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: PanelTitleInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of PanelTitlecomponent. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of PanelTitlecomponent. | [object Object] |


## PanelCollapse

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: PanelCollapseInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: PanelCollapseInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<PanelCollapsePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: PanelCollapseInstance) => ReactNode) | null | The children to render. |
| iconOnly | boolean | true | Whether to show the PanelCollapse with a borderless style. |
| severity | string & {} \\| "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" \\| "help" | 'secondary' | Severity type of the PanelCollapse. |
| variant | "link" \\| "text" \\| "outlined" | 'text' | Variant of the PanelCollapse. |
| rounded | boolean | true | Whether to show the PanelCollapse with a rounded style. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of PanelCollapse component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of PanelCollapse component. | [object Object] |


## PanelContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: PanelContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: PanelContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<PanelContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: PanelContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of PanelContent component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of PanelContent component. | [object Object] |


## PanelFooter

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: PanelFooterInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: PanelFooterInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<PanelFooterPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: PanelFooterInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of PanelFooter component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of PanelFooter component. | [object Object] |


## usePanel

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| collapsed | boolean | false | Whether the panel is collapsed. |
| toggleable | boolean | false | Indicates if the panel can be toggled. |
| onCollapse | (event: SyntheticEvent) => void | null | Callback triggered when the panel is collapsed. |
| onExpand | (event: SyntheticEvent) => void | null | Callback triggered when the panel is expanded. |
| onToggle | (event: usePanelToggleEvent) => void | null | Callback triggered when the panel's toggle state changes. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| collapsed | boolean | null | Whether the panel is collapsed. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | usePanelState | null | The state of the usePanel. |
| contentRef | RefObject<HTMLDivElement> | null | Reference to the content element of the panel. |
| toggle | (event: SyntheticEvent) => void | null | Toggles the collapsed state of the panel. |
| expand | (event: SyntheticEvent) => void | null | Expands the panel. |
| collapse | (event: SyntheticEvent) => void | null | Collapses the panel. |
| onButtonClick | (event: SyntheticEvent) => void | null | Callback for when the toggle button is clicked. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.usepanel.events.usePanelToggleEvent | usePanelToggleEvent | Event object for the onToggle callback. |  | [object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of usePanel headless. | [object Object] |



# Panel

Panel is a grouping component providing with content toggle feature.


## Import

```tsx
import { Panel } from 'primereact/panel';
```

## Basic

Panel is a container component with a _Panel.Header_ and _Panel.Content_.

```tsx
import { Panel } from 'primereact/panel';

export default function BasicDemo() {
    return (
        <div className="card">
            <Panel>
                <Panel.Header>Header</Panel.Header>
                <Panel.Content>
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Panel.Content>
            </Panel>
        </div>
    );
}

```

## Toggleable

Panel can be made toggleable by using the _Motion_ component or an animation library to animate the visibility of the content.
The _Panel.Header_ contains a button to toggle the visibility of the content, and the _Panel.Content_ is wrapped inside the _Motion_ component to handle the animation.

```tsx
import { Motion } from '@primereact/core/motion';
import { MinusIcon, PlusIcon } from '@primereact/icons';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import * as React from 'react';

export default function ToggleableDemo() {
    const [show, setShow] = React.useState(true);

    return (
        <div className="card">
            <Panel>
                <Panel.Header>
                    <Panel.Title>Header</Panel.Title>
                    <Panel.HeaderActions>
                        <Button onClick={() => setShow((prev) => !prev)} rounded variant="text" iconOnly>
                            {show ? <MinusIcon /> : <PlusIcon />}
                        </Button>
                    </Panel.HeaderActions>
                </Panel.Header>
                <Motion in={show} name="p-toggleable-content">
                    <Panel.Content>
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </Panel.Content>

                    <Panel.Footer>
                        <p className="m-0">Footer</p>
                    </Panel.Footer>
                </Motion>
            </Panel>
        </div>
    );
}

```

## Template

Header and footer sections of the panel can be customized using _Panel.Header_ and _Panel.Footer_ components.

```tsx
import { Motion } from '@primereact/core/motion';
import { MinusIcon, PlusIcon } from '@primereact/icons';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import * as React from 'react';

export default function TemplateDemo() {
    const [show, setShow] = React.useState(true);

    return (
        <div className="card">
            <Panel toggleable>
                <Panel.Header>
                    <Panel.Title>
                        <div className="flex items-center gap-2">
                            <Avatar shape="circle">
                                <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
                                <Avatar.Fallback>A</Avatar.Fallback>
                            </Avatar>
                            <span className="font-bold">Amy Elsner</span>
                        </div>
                    </Panel.Title>
                    <Panel.HeaderActions>
                        <Button severity="secondary" rounded variant="text" iconOnly>
                            <i className="pi pi-cog" />
                        </Button>
                        <Button onClick={() => setShow((prev) => !prev)} rounded variant="text" iconOnly>
                            {show ? <MinusIcon /> : <PlusIcon />}
                        </Button>
                    </Panel.HeaderActions>
                </Panel.Header>
                <Motion in={show} name="p-toggleable-content">
                    <Panel.Content>
                        <p className="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Button iconOnly rounded variant="text">
                                    <i className="pi pi-user" />
                                </Button>
                                <Button severity="secondary" iconOnly rounded variant="text">
                                    <i className="pi pi-bookmark" />
                                </Button>
                            </div>
                            <span className="text-surface-500 dark:text-surface-400">Updated 2 hours ago</span>
                        </div>
                    </Panel.Content>
                </Motion>
            </Panel>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Toggleable panels use a content toggle button at the header that has _aria-controls_ to define the id of the content section along with _aria-expanded_ for the visibility state. The value to read the button defaults to the value can be customized by defining an _aria-label_ or _aria-labelledby_ property.

### Keyboard Support

| Key         | Function                                                                    |
| ----------- | --------------------------------------------------------------------------- |
| tab         | Moves focus to the next the focusable element in the page tab sequence.     |
| shift + tab | Moves focus to the previous the focusable element in the page tab sequence. |
| enter       | Toggles the visibility of the content.                                      |
| space       | Toggles the visibility of the content.                                      |


# Panel Pass Through

Pass Through documentation for Panel component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="panel-pt" components={['Panel']} />

## Panel PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PanelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| header | PanelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the header's DOM element. |
| headerActions | PanelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the header actions's DOM element. |
| title | PanelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the title's DOM element. |
| content | PanelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the content's DOM element. |
| collapse | PanelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the collapse's DOM element. |
| footer | PanelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the footer's DOM element. |


## PanelHeader PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PanelHeaderPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## PanelTitle PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PanelTitlePassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## PanelHeaderActions PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PanelHeaderActionsPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## PanelCollapse PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PanelCollapsePassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## PanelContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PanelContentPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## PanelFooter PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PanelFooterPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Panel Theming

Theming documentation for Panel component


## Styled

### Panel CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-panel | Class name of the root element |
| p-panel-header | Class name of the header element |
| p-panel-title | Class name of the title element |
| p-panel-header-actions | Class name of the header actions element |
| p-panel-toggle-button | Class name of the toggle button element |
| p-panel-content | Class name of the content element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| panel.background | --p-panel-background | Background of root |
| panel.border.color | --p-panel-border-color | Border color of root |
| panel.color | --p-panel-color | Color of root |
| panel.border.radius | --p-panel-border-radius | Border radius of root |
| panel.header.background | --p-panel-header-background | Background of header |
| panel.header.color | --p-panel-header-color | Color of header |
| panel.header.padding | --p-panel-header-padding | Padding of header |
| panel.header.border.color | --p-panel-header-border-color | Border color of header |
| panel.header.border.width | --p-panel-header-border-width | Border width of header |
| panel.header.border.radius | --p-panel-header-border-radius | Border radius of header |
| panel.toggleable.header.padding | --p-panel-toggleable-header-padding | Padding of toggleable header |
| panel.title.font.weight | --p-panel-title-font-weight | Font weight of title |
| panel.content.padding | --p-panel-content-padding | Padding of content |
| panel.footer.padding | --p-panel-footer-padding | Padding of footer |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Popover API

API documentation for Popover component


## Popover

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: PopoverInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: PopoverInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<PopoverPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: PopoverInstance) => ReactNode) | null | The children to render. |
| defaultOpen | boolean | undefined | Whether the popover is open by default. |
| open | boolean | undefined | Whether the popover is open. |
| onOpenChange | (event: usePopoverOpenChangeEvent) => void | undefined | Callback to invoke when the open state changes. |
| dismissable | boolean | true | Enables to hide the overlay when outside is clicked. |
| appendTo | HTMLElement \\| "body" \\| "self" | body | A valid query selector or an HTMLElement to specify where the overlay gets attached. |
| baseZIndex | number | 0 | Base zIndex value to use in layering. |
| autoZIndex | boolean | true | Whether to automatically manage layering. |
| breakpoints | PopoverBreakpoints | null | Object literal to define widths per screen size. |
| closeOnEscape | boolean | true | Specifies if pressing escape key should hide the dialog. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| visible | boolean | false | Current visible state as a boolean. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| hide | () => void | null | Hides the popover. |
| show | () => void | null | Shows the popover. |
| onContentKeydown | (event: KeyboardEvent<HTMLDivElement>) => void | null | The function to handle the content keydown event. |
| triggerRef | RefObject<{ elementRef: RefObject<HTMLElement> }> | undefined | A valid query selector or an HTMLElement to specify where the trigger gets attached. |
| containerRef | RefObject<{ elementRef: RefObject<HTMLElement> }> | undefined | A valid query selector or an HTMLElement to specify where the container gets attached. |
| onBeforeEnter | () => void | null | Callback fired before enter animation. |
| onLeave | () => void | null | Callback fired on leave. |
| onAfterLeave | () => void | null | Callback fired after leave animation. |
| onOverlayClick | () => void | null | Callback fired when the overlay is clicked. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Popover component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Popover component. | [object Object] |


## PopoverTrigger

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | (CSSProperties \\| ((instance?: ButtonInstance) => CSSProperties)) & (CSSProperties \\| ((instance?: PopoverTriggerInstance) => CSSProperties)) | null | The style to apply to the component. |
| className | (string \\| ((instance?: ButtonInstance) => string)) & (string \\| ((instance?: PopoverTriggerInstance) => string)) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | ButtonPassThrough & Record<PropertyKey, unknown> & PopoverTriggerPassThrough | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | (ReactNode \\| ((instance: ButtonInstance) => ReactNode)) & (ReactNode \\| ((instance: PopoverTriggerInstance) => ReactNode)) | null | The children to render. |
| size | "small" \\| "large" \\| "normal" | null | Size of the Button. |
| severity | string & {} \\| "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" \\| "help" | null | Severity type of the Button. |
| variant | "link" \\| "text" \\| "outlined" | null | Variant of the Button. |
| plain | boolean | null | Whether to show the Button with a plain style. |
| rounded | boolean | null | Whether to show the Button with a rounded style. |
| raised | boolean | null | Whether to show the Button with a raised style. |
| iconOnly | boolean | null | Whether to show the Button with a borderless style. |
| fluid | boolean | null | Whether to show the Button with a fluid width. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| popover | PopoverInstance | null | The Popover component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of PopoverTrigger component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of PopoverTrigger component. | [object Object] |


## PopoverPortal

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | (CSSProperties \\| ((instance?: PortalInstance) => CSSProperties)) & (CSSProperties \\| ((instance?: PopoverPortalInstance) => CSSProperties)) | null | The style to apply to the component. |
| className | (string \\| ((instance?: PortalInstance) => string)) & (string \\| ((instance?: PopoverPortalInstance) => string)) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | PortalPassThrough & Record<PropertyKey, unknown> & PopoverPortalPassThrough | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | (ReactNode \\| ((instance: PortalInstance) => ReactNode)) & (ReactNode \\| ((instance: PopoverPortalInstance) => ReactNode)) | null | The children to render. |
| element | ReactNode | null | The element to be rendered as the portal. |
| appendTo | HTMLElement \\| "body" \\| "self" | 'body' | The DOM element where the portal should be appended to. |
| visible | boolean | null | Whether the portal is visible or not. |
| onMounted | () => void | null | Callback function to invoke when the portal is mounted. |
| onUnmounted | () => void | null | Callback function to invoke when the portal is unmounted. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| popover | PopoverInstance | null | The Popover component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of PopoverPortal component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of PopoverPortal component. | [object Object] |


## PopoverContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: PopoverContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: PopoverContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<PopoverContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: PopoverContentInstance) => ReactNode) | null | The children to render. |
| autoFocus | boolean | true | Whether to focus the first focusable element when the popover is opened. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| popover | PopoverInstance | null | The Popover component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of PopoverContent component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of PopoverContent component. | [object Object] |


## PopoverClose

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | (CSSProperties \\| ((instance?: ButtonInstance) => CSSProperties)) & (CSSProperties \\| ((instance?: PopoverCloseInstance) => CSSProperties)) | null | The style to apply to the component. |
| className | (string \\| ((instance?: ButtonInstance) => string)) & (string \\| ((instance?: PopoverCloseInstance) => string)) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | ButtonPassThrough & Record<PropertyKey, unknown> & PopoverClosePassThrough | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | (ReactNode \\| ((instance: ButtonInstance) => ReactNode)) & (ReactNode \\| ((instance: PopoverCloseInstance) => ReactNode)) | null | The children to render. |
| size | "small" \\| "large" \\| "normal" | null | Size of the Button. |
| severity | string & {} \\| "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" \\| "help" | null | Severity type of the Button. |
| variant | "link" \\| "text" \\| "outlined" | null | Variant of the Button. |
| plain | boolean | null | Whether to show the Button with a plain style. |
| rounded | boolean | null | Whether to show the Button with a rounded style. |
| raised | boolean | null | Whether to show the Button with a raised style. |
| iconOnly | boolean | null | Whether to show the Button with a borderless style. |
| fluid | boolean | null | Whether to show the Button with a fluid width. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| popover | PopoverInstance | null | The Popover component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of PopoverClose component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of PopoverClose component. | [object Object] |



# Popover

Popover is a container component that can overlay other components on page.


## Import

```tsx
import { Popover } from 'primereact/popover';
```

```tsx
<Popover>
    <Popover.Trigger></Popover.Trigger>
    <Popover.Portal>
        <Popover.Content>
            <Popover.Close />
        </Popover.Content>
    </Popover.Portal>
</Popover>
```

## Basic

```tsx
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';
import { Popover } from 'primereact/popover';

export default function BasicDemo() {
    return (
        <div className="card flex items-center justify-center">
            <Popover>
                <Popover.Trigger>Show Popover</Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content>
                        <div className="flex flex-col gap-2 p-2 max-w-xs">
                            <p className="text-lg font-semibold mb-0.5">Dimensions</p>
                            <div className="grid grid-cols-2 items-center">
                                <Label htmlFor="width">Width</Label>
                                <InputText id="width" fluid />
                            </div>
                            <div className="grid grid-cols-2 items-center">
                                <Label htmlFor="maxWidth">Max. width</Label>
                                <InputText id="maxWidth" fluid />
                            </div>
                            <div className="grid grid-cols-2 items-center">
                                <Label htmlFor="height">Height</Label>
                                <InputText id="height" fluid />
                            </div>
                            <div className="grid grid-cols-2 items-center">
                                <Label htmlFor="maxHeight">Max. height</Label>
                                <InputText id="maxHeight" fluid />
                            </div>
                        </div>
                        <Popover.Close className="absolute top-4 right-4" />
                    </Popover.Content>
                </Popover.Portal>
            </Popover>
        </div>
    );
}

```

## Controlled

Use the `open` and `onOpenChange` props to control the popover state.

```tsx
import { usePopoverOpenChangeEvent } from '@primereact/types/shared/popover';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';
import { Popover } from 'primereact/popover';
import React from 'react';

function ControlledDemo() {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="card flex gap-4 justify-center items-center">
            <Button onClick={() => setOpen(!open)}>Show Popover</Button>

            <Popover open={open} onOpenChange={(e: usePopoverOpenChangeEvent) => setOpen(e.value)}>
                <Popover.Trigger>Popover Trigger</Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content>
                        <div className="flex flex-col gap-2 p-2 max-w-xs">
                            <p className="text-lg font-semibold mb-0.5">Dimensions</p>
                            <div className="grid grid-cols-2 items-center">
                                <Label htmlFor="width">Width</Label>
                                <InputText id="width" fluid />
                            </div>
                            <div className="grid grid-cols-2 items-center">
                                <Label htmlFor="maxWidth">Max. width</Label>
                                <InputText id="maxWidth" fluid />
                            </div>
                            <div className="grid grid-cols-2 items-center">
                                <Label htmlFor="height">Height</Label>
                                <InputText id="height" fluid />
                            </div>
                            <div className="grid grid-cols-2 items-center">
                                <Label htmlFor="maxHeight">Max. height</Label>
                                <InputText id="maxHeight" fluid />
                            </div>
                        </div>
                        <Popover.Close className="absolute top-4 right-4" />
                    </Popover.Content>
                </Popover.Portal>
            </Popover>
        </div>
    );
}

export default ControlledDemo;

```

## Select Data

```tsx
import { usePopoverOpenChangeEvent } from '@primereact/types/shared/popover';
import { Popover } from 'primereact/popover';
import React from 'react';

const members = [
    { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
];

function SelectDataDemo() {
    const [selectedMember, setSelectedMember] = React.useState<(typeof members)[0] | null>(members[0]);
    const [open, setOpen] = React.useState(false);

    return (
        <div className="card flex justify-center">
            <Popover open={open} onOpenChange={(e: usePopoverOpenChangeEvent) => setOpen(e.value)}>
                <Popover.Trigger className="min-w-48">{selectedMember?.name}</Popover.Trigger>
                <Popover.Portal>
                    <Popover.Content>
                        <div className="flex flex-col gap-4">
                            <div>
                                <span className="font-medium block mb-2">Team Members</span>
                                <ul className="list-none p-0 m-0 flex flex-col">
                                    {members.map((member) => (
                                        <li
                                            key={member.name}
                                            className="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border"
                                            onClick={() => {
                                                setSelectedMember(member);
                                                setOpen(false);
                                            }}
                                        >
                                            <img src={`https://primefaces.org/cdn/primevue/images/avatar/${member.image}`} style={{ width: '32px' }} />
                                            <div>
                                                <span className="font-medium">{member.name}</span>
                                                <div className="text-sm text-surface-500 dark:text-surface-400">{member.email}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Popover.Content>
                </Popover.Portal>
            </Popover>
        </div>
    );
}

export default SelectDataDemo;

```

## Accessibility

### Screen Reader

Popover component uses dialog role and since any attribute is passed to the root element you may define attributes like aria-label or aria-labelledby to describe the popup contents. In addition aria-modal is added since focus is kept within the popup.

Popover adds aria-expanded state attribute and aria-controls to the trigger so that the relation between the trigger and the popup is defined.

### Popover Keyboard Support

When the popup gets opened, the first focusable element receives the focus and this can be customized by adding autofocus to an element within the popup.

| Key           | Function                                                            |
| ------------- | ------------------------------------------------------------------- |
| `tab`         | Moves focus to the next the focusable element within the popup.     |
| `shift + tab` | Moves focus to the previous the focusable element within the popup. |
| `escape`      | Closes the popup and moves focus to the trigger.                    |


# Popover Pass Through

Pass Through documentation for Popover component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="popover-pt" components={['Popover']} />

## Popover PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PopoverPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## PopoverTrigger PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PopoverTriggerPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## PopoverPortal PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PopoverPortalPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## PopoverContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PopoverContentPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## PopoverClose PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | PopoverClosePassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |



# Popover Theming

Theming documentation for Popover component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-popover | Class name of the root element |
| p-popover-content | Class name of the content element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| popover.background | --p-popover-background | Background of root |
| popover.border.color | --p-popover-border-color | Border color of root |
| popover.color | --p-popover-color | Color of root |
| popover.border.radius | --p-popover-border-radius | Border radius of root |
| popover.shadow | --p-popover-shadow | Shadow of root |
| popover.gutter | --p-popover-gutter | Gutter of root |
| popover.arrow.offset | --p-popover-arrow-offset | Arrow offset of root |
| popover.content.padding | --p-popover-content-padding | Padding of content |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# ProgressBar API

API documentation for ProgressBar component


## ProgressBar

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ProgressBarInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ProgressBarInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ProgressBarPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ProgressBarInstance) => ReactNode) | null | The children to render. |
| mode | "indeterminate" \\| "determinate" | determinate | Defines the mode of the progress |
| value | number | null | Current value of the progress. |
| max | number | null | Defines the mode of the progress |
| min | number | null | Defines the mode of the progress |
| formatter | (value: number) => string | null | Custom formatter function to format the display value |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ProgressBar component. | [object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ProgressBar component. | [object Object] |


## ProgressBarLabel

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ProgressBarLabelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ProgressBarLabelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ProgressBarLabelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ProgressBarLabelInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| progressbar | ProgressBarInstance | null | The ProgressBar component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ProgressBarLabel component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ProgressBarLabel component. | [object Object] |


## useProgressBar

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useProgressBar headless. | [object Object] |



# ProgressBar

ProgressBar is a process status indicator.


## Usage

```tsx
import { ProgressBar } from 'primereact/progressbar';
```

```tsx
<ProgressBar value={50}>
    <ProgressBar.Track>
        <ProgressBar.Indicator>
            <ProgressBar.Label>
                <ProgressBar.Value />
            </ProgressBar.Label>
        </ProgressBar.Indicator>
    </ProgressBar.Track>
</ProgressBar>
```

## Examples

### Basic

Use the `value` property to define the progress.

```tsx
import { ProgressBar } from 'primereact/progressbar';

export default function BasicDemo() {
    const value = 50;

    return (
        <div className="card">
            <ProgressBar value={value}>
                <ProgressBar.Track>
                    <ProgressBar.Indicator>
                        <ProgressBar.Label>
                            <ProgressBar.Value />
                        </ProgressBar.Label>
                    </ProgressBar.Indicator>
                </ProgressBar.Track>
            </ProgressBar>
        </div>
    );
}

```

### Dynamic

Value is reactive so updating it dynamically changes the bar as well.

```tsx
import { ProgressBar } from 'primereact/progressbar';
import * as React from 'react';

export default function DynamicDemo() {
    const [value, setValue] = React.useState(0);
    const interval = React.useRef<NodeJS.Timeout | undefined>(undefined);

    React.useEffect(() => {
        interval.current = setInterval(() => {
            setValue((prevValue) => {
                const newValue = prevValue + Math.random() * 10 + 1;

                if (newValue >= 100) {
                    clearInterval(interval.current);

                    return 100;
                }

                return newValue;
            });
        }, 2000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = undefined;
            }
        };
    }, []);

    return (
        <div className="card">
            <ProgressBar value={value}>
                <ProgressBar.Track>
                    <ProgressBar.Indicator>
                        <ProgressBar.Label>
                            <ProgressBar.Value />
                        </ProgressBar.Label>
                    </ProgressBar.Indicator>
                </ProgressBar.Track>
            </ProgressBar>
        </div>
    );
}

```

### Formatter

Custom formatter function to format the display value.

```tsx
import { ProgressBar } from 'primereact/progressbar';

export default function FormatterDemo() {
    return (
        <div className="card">
            <ProgressBar value={50} formatter={(value: number) => `${value}/100`}>
                <ProgressBar.Track>
                    <ProgressBar.Indicator>
                        <ProgressBar.Label>
                            <ProgressBar.Value />
                        </ProgressBar.Label>
                    </ProgressBar.Indicator>
                </ProgressBar.Track>
            </ProgressBar>
        </div>
    );
}

```

### Template

Place `ProgressBar.Value` where you want the progress value to be displayed inside the `ProgressBar` and customize `formatter` prop to display in different format.

```tsx
import { ProgressBar } from 'primereact/progressbar';
import * as React from 'react';

export default function TemplateDemo() {
    const [uploadedFileSize, setUploadedFileSize] = React.useState(0);
    const maxFileSize = 5000;

    React.useEffect(() => {
        const interval = setInterval(() => {
            setUploadedFileSize((prevValue) => {
                const newValue = prevValue + Math.floor(Math.random() * 200) + 1;

                return newValue >= maxFileSize ? maxFileSize : newValue;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes.toFixed(2) + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        else return (bytes / 1048576).toFixed(2) + ' MB';
    };

    return (
        <div className="card">
            <div className="max-w-sm mx-auto space-y-8">
                {/* Basic percentage formatter */}
                <ProgressBar value={uploadedFileSize} max={maxFileSize} formatter={(value: number) => `${value.toFixed(1)}%`}>
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">Basic Percentage</span>
                        <ProgressBar.Value />
                    </div>
                    <ProgressBar.Track className="rounded-full h-1.5">
                        <ProgressBar.Indicator className="bg-blue-600 rounded-full" />
                    </ProgressBar.Track>
                </ProgressBar>

                {/* File size formatter */}
                <ProgressBar
                    value={uploadedFileSize}
                    max={maxFileSize}
                    formatter={(value: number) => {
                        const currentSize = (value / 100) * maxFileSize;

                        return `${formatFileSize(currentSize)} / ${formatFileSize(maxFileSize)}`;
                    }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">File Size Progress</span>
                        <ProgressBar.Value />
                    </div>
                    <ProgressBar.Track className="rounded-full h-1.5">
                        <ProgressBar.Indicator className="bg-emerald-600 rounded-full" />
                    </ProgressBar.Track>
                </ProgressBar>

                {/* Time remaining formatter */}
                <ProgressBar
                    value={uploadedFileSize}
                    max={maxFileSize}
                    formatter={(value: number) => {
                        const remaining = ((maxFileSize - uploadedFileSize) / 200).toFixed(0);

                        return `${value.toFixed(0)}% (${remaining}s remaining)`;
                    }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">Time Remaining</span>
                        <ProgressBar.Value />
                    </div>
                    <ProgressBar.Track className="rounded-full h-1.5">
                        <ProgressBar.Indicator className="bg-purple-600 rounded-full" />
                    </ProgressBar.Track>
                </ProgressBar>

                {/* Status Steps formatter */}
                <ProgressBar
                    value={uploadedFileSize}
                    max={maxFileSize}
                    formatter={(value: number) => {
                        if (value < 40) return 'Preparing file...';
                        else if (value < 60) return 'Uploading file...';
                        else if (value < 99) return 'Finalizing...';
                        else return 'Upload complete';
                    }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="font-medium">Upload Status Steps</span>
                        <ProgressBar.Value />
                    </div>
                    <ProgressBar.Track className="rounded-full h-1.5">
                        <ProgressBar.Indicator className="bg-orange-600 rounded-full" />
                    </ProgressBar.Track>
                </ProgressBar>
            </div>
        </div>
    );
}

```

### Indeterminate

For progresses with no value to track, set the `mode` property to `indeterminate`.

```tsx
import { ProgressBar } from 'primereact/progressbar';

export default function IndeterminateDemo() {
    return (
        <div className="card">
            <ProgressBar mode="indeterminate">
                <ProgressBar.Track className="h-1.5">
                    <ProgressBar.Indicator />
                </ProgressBar.Track>
            </ProgressBar>
        </div>
    );
}

```

### As Steps

Steps are used to display a progress with multiple steps.

```tsx
import { cn } from '@primeuix/utils';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import * as React from 'react';

const orderProgress = [
    {
        status: 'Place Order'
    },
    {
        status: 'Order Placed',
        colors: {
            track: 'bg-blue-500/20',
            indicator: 'bg-blue-600 dark:bg-blue-400'
        }
    },
    {
        status: 'Processing',
        colors: {
            track: 'bg-yellow-500/20',
            indicator: 'bg-amber-600 dark:bg-amber-400'
        }
    },
    {
        status: 'Shipped',
        colors: {
            track: 'bg-purple-500/20',
            indicator: 'bg-violet-600 dark:bg-violet-400'
        }
    },
    {
        status: 'Delivered',
        colors: {
            track: 'bg-green-500/20',
            indicator: 'bg-green-600 dark:bg-green-400'
        }
    }
];

export default function StepsDemo() {
    const [step, setStep] = React.useState(1);
    const nextStep = () => setStep(Math.min(step + 1, orderProgress.length));
    const prevStep = () => setStep(Math.max(step - 1, 0));

    return (
        <div className="card">
            <div className="max-w-sm mx-auto">
                <div className="mb-3 font-medium">{orderProgress[step].status}</div>
                <ProgressBar value={step} min={0} max={4}>
                    {() => {
                        const { colors } = orderProgress[step] ?? {};

                        return (
                            <ProgressBar.Track className={cn(colors?.track, 'transition-all duration-300 ease-linear')}>
                                <ProgressBar.Indicator className={cn(colors?.indicator, 'transition-[width,_background-color] duration-300 ease-linear')}>
                                    <ProgressBar.Label>
                                        <ProgressBar.Value />
                                    </ProgressBar.Label>
                                </ProgressBar.Indicator>
                            </ProgressBar.Track>
                        );
                    }}
                </ProgressBar>

                <div className="flex items-center justify-between mt-6">
                    <Button onClick={prevStep} disabled={step === 0} rounded variant="text" severity="contrast">
                        Previous
                    </Button>
                    <Button onClick={nextStep} disabled={step === orderProgress.length - 1} rounded variant="text" severity="contrast">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

```

## Accessibility

### Screen Reader

ProgressBar components uses progressbar role along with aria-valuemin, aria-valuemax and aria-valuenow attributes. Value to describe the component can be defined using aria-labelledby and aria-label props.

```tsx
<span id="label_status" />
<ProgressBar aria-labelledby="label_status" />

<ProgressBar aria-label="Status" />
```

### Keyboard Support

Not applicable.


# ProgressBar Pass Through

Pass Through documentation for ProgressBar component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="progressbar-pt" components={['ProgressBar']} />

## ProgressBar PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ProgressBarPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| value | ProgressBarPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the value's DOM element. |


## ProgressBarLabel PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ProgressBarLabelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# ProgressBar Theming

Theming documentation for ProgressBar component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-progressbar | Class name of the root element |
| p-progressbar-value | Class name of the value element |
| p-progressbar-label | Class name of the label element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| progressbar.background | --p-progressbar-background | Background of root |
| progressbar.border.radius | --p-progressbar-border-radius | Border radius of root |
| progressbar.height | --p-progressbar-height | Height of root |
| progressbar.value.background | --p-progressbar-value-background | Background of value |
| progressbar.label.color | --p-progressbar-label-color | Color of label |
| progressbar.label.font.size | --p-progressbar-label-font-size | Font size of label |
| progressbar.label.font.weight | --p-progressbar-label-font-weight | Font weight of label |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# ProgressSpinner API

API documentation for ProgressSpinner component


## ProgressSpinner

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ProgressSpinnerInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ProgressSpinnerInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ProgressSpinnerPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ProgressSpinnerInstance) => ReactNode) | null | The children to render. |
| strokeWidth | string \\| number | 2 | Width of the circle stroke. |
| fill | string | null | Color for the background of the circle. |
| animationDuration | string | 2s | Duration of the rotate animation. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ProgressSpinner component. | [object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ProgressSpinner component. | [object Object] |


## useProgressSpinner

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useProgressSpinner headless. | [object Object] |



# ProgressSpinner

ProgressSpinner is a process status indicator.


## Usage

```tsx
import { ProgressSpinner } from 'primereact/progressspinner';
```

```tsx
<ProgressSpinner />
```

## Examples

### Basic

An infinite spin animation is displayed by default.

```tsx
import { ProgressSpinner } from 'primereact/progressspinner';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <ProgressSpinner />
        </div>
    );
}

```

### Custom

ProgressSpinner can be customized with styling property like `style`, `strokeWidth`, `fill` and `animationDuration`.

```tsx
import { ProgressSpinner } from 'primereact/progressspinner';

export default function CustomDemo() {
    return (
        <div className="card flex justify-center">
            <ProgressSpinner strokeWidth="8" fill="transparent" animationDuration=".5s" style={{ width: '50px', height: '50px' }} aria-label="Custom ProgressSpinner" />
        </div>
    );
}

```

## Accessibility

### Screen Reader

ProgressSpinner components uses progressbar role. Value to describe the component can be defined using aria-labelledby and aria-label props.

```tsx
<ProgressSpinner aria-label="Loading" />
```

### Keyboard Support

Component does not include any interactive elements.


# ProgressSpinner Pass Through

Pass Through documentation for ProgressSpinner component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="progressspinner-pt" components={['ProgressSpinner']} />

## ProgressSpinner PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ProgressSpinnerPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| spin | ProgressSpinnerPassThroughType<HTMLAttributes<SVGElement>> | Used to pass attributes to the spin's DOM element. |
| circle | ProgressSpinnerPassThroughType<HTMLAttributes<SVGCircleElement>> | Used to pass attributes to the circle's DOM element. |



# ProgressSpinner Theming

Theming documentation for ProgressSpinner component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-progressspinner | Class name of the root element |
| p-progressspinner-spin | Class name of the spin element |
| p-progressspinner-circle | Class name of the circle element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| progressspinner.color.one | --p-progressspinner-color-one | Color one of root |
| progressspinner.color.two | --p-progressspinner-color-two | Color two of root |
| progressspinner.color.three | --p-progressspinner-color-three | Color three of root |
| progressspinner.color.four | --p-progressspinner-color-four | Color four of root |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# RadioButton API

API documentation for RadioButton component


## RadioButton

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: RadioButtonInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: RadioButtonInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<RadioButtonPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: RadioButtonInstance) => ReactNode) | null | The children to render. |
| value | unknown | null | Value of the radio button. |
| name | string | null | The name of the radio button. |
| size | "small" \\| "large" \\| "normal" | null | Defines the size of the radio button. |
| variant | "outlined" \\| "filled" | null | Specifies the input variant of the component. |
| disabled | boolean | false | When present, it specifies that the element should be disabled. |
| readOnly | boolean | false | When present, it specifies that an input field is read-only. |
| required | boolean | false | When present, it specifies that the element is required. |
| invalid | boolean | false | When present, it specifies that the component should have invalid state style. |
| inputId | string | null | Identifier of the underlying input element. |
| inputStyle | CSSProperties | null | Inline style of the input field. |
| inputClassName | string | null | Style class of the input field. |
| ariaLabel | string | null | Establishes a string value that labels the component. |
| ariaLabelledby | string | null | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| onFocus | (event: FocusEvent<HTMLInputElement>) => void | null | Callback function that is called when the checkbox is focused. |
| onBlur | (event: FocusEvent<HTMLInputElement>) => void | null | Callback function that is called when the checkbox loses focus. |
| onCheckedChange | (event: RadioButtonChangeEvent) => void | null | Callback fired when the radio button's checked state changes. |
| checked | boolean | null | When present, it specifies the input's checked state. |
| defaultChecked | boolean | null | The default value for the input when not controlled by  `checked`  and  `onCheckedChange` . |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| checked | boolean | null | The checked state of the useRadioButton. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| group | RadioButtonGroupInstance | null | The group instance of the radio button. |
| state | useRadioButtonState | null | The state of the useRadioButton. |
| onChange | (event: useRadioButtonChangeEvent) => void | null | Callback fired when the useRadioButton's checked state changes. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.radiobutton.events.RadioButtonChangeEvent | RadioButtonChangeEvent | Event fired when the radio button's checked state changes. |  | [object Object],[object Object],[object Object] |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of RadioButton component. | [object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of RadioButton component. | [object Object] |


## RadioButtonGroup

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: RadioButtonGroupInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: RadioButtonGroupInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<RadioButtonGroupPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: RadioButtonGroupInstance) => ReactNode) | null | The children to render. |
| value | unknown | null | Value of the radio button group. |
| defaultValue | unknown | null | The default value of the radio button group. |
| name | string | null | The name of the radio buttons. |
| disabled | boolean | false | When present, it specifies that the radio button group should be disabled. |
| invalid | boolean | false | When present, it specifies that the radio button group is invalid. |
| onValueChange | (event: RadioButtonGroupValueChangeEvent) => void | null | Callback function that is called when the radio button group value changes. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

<DocTable name="RadioButtonGroup" category="api" type="state" />

### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| updateChange | (event: RadioButtonGroupUpdateChangeEvent) => void | null | Updates the value of the radio button group. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.radiobuttongroup.events.RadioButtonGroupValueChangeEvent | RadioButtonGroupValueChangeEvent | Event fired when the radio button group's value changes. |  | [object Object] |
| api.radiobuttongroup.events.RadioButtonGroupUpdateChangeEvent | RadioButtonGroupUpdateChangeEvent | Used to update the radio button group value. |  | [object Object],[object Object],[object Object] |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of RadioButtonGroup component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of RadioButtonGroup component. | [object Object] |


## useRadioButton

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| checked | boolean | null | When present, it specifies the input's checked state. |
| defaultChecked | boolean | null | The default value for the input when not controlled by  `checked`  and  `onCheckedChange` . |
| onCheckedChange | (event: useRadioButtonChangeEvent) => void | null | Callback fired when the radio button's checked state changes. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| checked | boolean | null | The checked state of the useRadioButton. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useRadioButtonState | null | The state of the useRadioButton. |
| onChange | (event: useRadioButtonChangeEvent) => void | null | Callback fired when the useRadioButton's checked state changes. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.useradiobutton.events.useRadioButtonChangeEvent | useRadioButtonChangeEvent | Event fired when the radio button's checked state changes. |  | [object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useRadioButton headless. | [object Object] |



# RadioButton

RadioButton is an extension to standard radio button element with theming.


## Usage

```tsx
import { RadioButton } from 'primereact/radiobutton';
```

```tsx
<RadioButton.Group>
    <RadioButton />
</RadioButton.Group>
```

## Examples

### Group

Use the `RadioButton.Group` component with `value` and `onValueChange` props to control the selected state of radio buttons.

```tsx
'use client';
import type { RadioButtonGroupValueChangeEvent } from '@primereact/types/shared/radiobutton';
import { RadioButton } from 'primereact/radiobutton';
import * as React from 'react';

export default function GroupDemo() {
    const [ingredient, setIngredient] = React.useState<string | undefined>();

    return (
        <div className="card flex items-center justify-center">
            <RadioButton.Group className="flex flex-wrap gap-4" value={ingredient} onValueChange={(e: RadioButtonGroupValueChangeEvent) => setIngredient(e.value as string)}>
                <div className="flex items-center gap-2">
                    <RadioButton inputId="ingredient1" name="pizza" value="cheese" />
                    <label htmlFor="ingredient1">Cheese</label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioButton inputId="ingredient2" name="pizza" value="mushroom" />
                    <label htmlFor="ingredient2">Mushroom</label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioButton inputId="ingredient3" name="pizza" value="pepper" />
                    <label htmlFor="ingredient3">Pepper</label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioButton inputId="ingredient4" name="pizza" value="onion" />
                    <label htmlFor="ingredient4">Onion</label>
                </div>
            </RadioButton.Group>
        </div>
    );
}

```

### Dynamic

RadioButtons can be generated using a list of values.

```tsx
'use client';
import type { RadioButtonGroupValueChangeEvent } from '@primereact/types/shared/radiobutton';
import { RadioButton } from 'primereact/radiobutton';
import { RadioButtonGroup } from 'primereact/radiobutton/group';
import * as React from 'react';

export default function DynamicDemo() {
    const [ingredient, setIngredient] = React.useState<string | undefined>();
    const categories = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' }
    ];

    return (
        <div className="card flex items-center justify-center">
            <RadioButtonGroup className="flex flex-wrap gap-4" value={ingredient} onValueChange={(e: RadioButtonGroupValueChangeEvent) => setIngredient(e.value as string)}>
                {categories.map((item) => (
                    <div key={item.key} className="flex items-center gap-2">
                        <RadioButton inputId={item.key} name="category" value={item.key} />
                        <label htmlFor={item.key}>{item.name}</label>
                    </div>
                ))}
            </RadioButtonGroup>
        </div>
    );
}

```

### Card

RadioButtons can be displayed in a card style.

```tsx
'use client';
import type { RadioButtonGroupValueChangeEvent } from '@primereact/types/shared/radiobutton';
import { RadioButton } from 'primereact/radiobutton';
import React from 'react';

const CardDemo = () => {
    const [selectedCard, setSelectedCard] = React.useState<string | undefined>();

    const cards = [
        { id: 'card1', name: '💳 Credit Card', description: 'Pay with Visa, Mastercard, or AMEX.' },
        { id: 'card2', name: '💸 PayPal', description: 'Connect your PayPal account' },
        { id: 'card3', name: '🪙 Crypto', description: 'Pay with Bitcoin or Ethereum.' }
    ];

    return (
        <div className="card flex items-center justify-center">
            <div>
                <span className="font-semibold">Payment Method</span>
                <RadioButton.Group value={selectedCard} onValueChange={(e: RadioButtonGroupValueChangeEvent) => setSelectedCard(e.value as string)} className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {cards.map((card) => (
                        <label
                            key={card.id}
                            htmlFor={card.id}
                            className={`flex-1 flex items-start gap-2 p-4 rounded-md border border-surface-200 dark:border-surface-800 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer ${selectedCard === card.id ? '!border-primary' : ''}`}
                        >
                            <RadioButton inputId={card.id} name="card" value={card.id} />
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="text-lg font-bold leading-none">{card.name}</div>
                                <div className="text-sm text-surface-500">{card.description}</div>
                            </div>
                        </label>
                    ))}
                </RadioButton.Group>
            </div>
        </div>
    );
};

export default CardDemo;

```

### Sizes

Use the `size` property to change the size of a radio button.

```tsx
import { RadioButton } from 'primereact/radiobutton';

export default function SizesDemo() {
    return (
        <div className="card flex justify-center">
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <RadioButton inputId="size_small" name="size" size="small" />
                    <label htmlFor="size_small" className="text-sm">
                        Small
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioButton inputId="size_normal" name="size" />
                    <label htmlFor="size_normal">Normal</label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioButton inputId="size_large" name="size" size="large" />
                    <label htmlFor="size_large" className="text-lg">
                        Large
                    </label>
                </div>
            </div>
        </div>
    );
}

```

### Filled

Specify the `filled` property to display the component with a higher visual emphasis than the default outlined style.

```tsx
import { RadioButton } from 'primereact/radiobutton';

export default function FilledDemo() {
    return (
        <div className="card flex items-center justify-center">
            <RadioButton variant="filled" />
        </div>
    );
}

```

### Disabled

When the `disabled` property is present, the element cannot be edited and focused.

```tsx
import { RadioButton } from 'primereact/radiobutton';

export default function DisabledDemo() {
    return (
        <div className="card flex justify-center">
            <RadioButton.Group className="flex items-center gap-2" value="2">
                <RadioButton disabled />
                <RadioButton value="2" disabled />
            </RadioButton.Group>
        </div>
    );
}

```

### Invalid

Invalid state is displayed using the `invalid` property to indicate a failed validation. You can use this style when integrating with form validation libraries.

```tsx
import { RadioButton } from 'primereact/radiobutton';

export default function InvalidDemo() {
    return (
        <div className="card flex justify-center">
            <RadioButton invalid />
        </div>
    );
}

```

## Accessibility

### Screen Reader

RadioButton component uses a hidden native radio button element internally that is only visible to screen readers. Value to describe the component can either be provided via label tag combined with id prop or using aria-labelledby, aria-label props.

```tsx
<label for="rb1">One</label>
<RadioButton inputId="rb1" />

<span id="rb2">Two</span>
<RadioButton aria-labelledby="rb2" />

<RadioButton aria-label="Three" />
```


# RadioButton Pass Through

Pass Through documentation for RadioButton component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="radiobutton-pt" components={['RadioButton', 'RadioButtonGroup']} />

## RadioButton PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | RadioButtonPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| input | RadioButtonPassThroughType<InputHTMLAttributes<HTMLInputElement>> | Used to pass attributes to the input's DOM element. |
| box | RadioButtonPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the box's DOM element. |
| icon | RadioButtonPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the icon's DOM element. |


## RadioButtonGroup PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | RadioButtonGroupPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# RadioButton Theming

Theming documentation for RadioButton component


## Styled

### RadioButton CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-radiobutton | Class name of the root element |
| p-radiobutton-box | Class name of the box element |
| p-radiobutton-input | Class name of the input element |
| p-radiobutton-icon | Class name of the icon element |


### RadioButtonGroup CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-radiobutton-group | Class name of the root element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| radiobutton.width | --p-radiobutton-width | Width of root |
| radiobutton.height | --p-radiobutton-height | Height of root |
| radiobutton.background | --p-radiobutton-background | Background of root |
| radiobutton.checked.background | --p-radiobutton-checked-background | Checked background of root |
| radiobutton.checked.hover.background | --p-radiobutton-checked-hover-background | Checked hover background of root |
| radiobutton.disabled.background | --p-radiobutton-disabled-background | Disabled background of root |
| radiobutton.filled.background | --p-radiobutton-filled-background | Filled background of root |
| radiobutton.border.color | --p-radiobutton-border-color | Border color of root |
| radiobutton.hover.border.color | --p-radiobutton-hover-border-color | Hover border color of root |
| radiobutton.focus.border.color | --p-radiobutton-focus-border-color | Focus border color of root |
| radiobutton.checked.border.color | --p-radiobutton-checked-border-color | Checked border color of root |
| radiobutton.checked.hover.border.color | --p-radiobutton-checked-hover-border-color | Checked hover border color of root |
| radiobutton.checked.focus.border.color | --p-radiobutton-checked-focus-border-color | Checked focus border color of root |
| radiobutton.checked.disabled.border.color | --p-radiobutton-checked-disabled-border-color | Checked disabled border color of root |
| radiobutton.invalid.border.color | --p-radiobutton-invalid-border-color | Invalid border color of root |
| radiobutton.shadow | --p-radiobutton-shadow | Shadow of root |
| radiobutton.focus.ring.width | --p-radiobutton-focus-ring-width | Focus ring width of root |
| radiobutton.focus.ring.style | --p-radiobutton-focus-ring-style | Focus ring style of root |
| radiobutton.focus.ring.color | --p-radiobutton-focus-ring-color | Focus ring color of root |
| radiobutton.focus.ring.offset | --p-radiobutton-focus-ring-offset | Focus ring offset of root |
| radiobutton.focus.ring.shadow | --p-radiobutton-focus-ring-shadow | Focus ring shadow of root |
| radiobutton.transition.duration | --p-radiobutton-transition-duration | Transition duration of root |
| radiobutton.sm.width | --p-radiobutton-sm-width | Sm width of root |
| radiobutton.sm.height | --p-radiobutton-sm-height | Sm height of root |
| radiobutton.lg.width | --p-radiobutton-lg-width | Lg width of root |
| radiobutton.lg.height | --p-radiobutton-lg-height | Lg height of root |
| radiobutton.icon.size | --p-radiobutton-icon-size | Size of icon |
| radiobutton.icon.checked.color | --p-radiobutton-icon-checked-color | Checked color of icon |
| radiobutton.icon.checked.hover.color | --p-radiobutton-icon-checked-hover-color | Checked hover color of icon |
| radiobutton.icon.disabled.color | --p-radiobutton-icon-disabled-color | Disabled color of icon |
| radiobutton.icon.sm.size | --p-radiobutton-icon-sm-size | Sm size of icon |
| radiobutton.icon.lg.size | --p-radiobutton-icon-lg-size | Lg size of icon |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Rating API

API documentation for Rating component


## Rating

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: RatingInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: RatingInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<RatingPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: RatingInstance) => ReactNode) | null | The children to render. |
| name | string | null | Name of the element. |
| invalid | boolean | false | When present, it specifies that the component should have invalid state style. |
| onIcon | ReactNode | null | Icon for the on state. |
| offIcon | ReactNode | null | Icon for the off state. |
| modelValue | number | null | Value of the rating. |
| defaultValue | number | null | The default value for the input when not controlled by  `modelValue` . |
| stars | number | 5 | Number of stars. |
| disabled | boolean | false | When present, it specifies that the element should be disabled. |
| readOnly | boolean | false | When present, it specifies that component is read-only. |
| onChange | (event: useRatingChangeEvent) => void | null | Callback function that is called when the value changes. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | number | null |  |
| focusedOptionIndex | number | null |  |
| isFocusVisibleItem | boolean | null |  |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useRatingState | null | Current state of the rating. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Rating component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Toolbar component. | [object Object] |



# Rating

Rating component is a star based selection input.


## Usage

```tsx
import { Rating } from 'primereact/rating';
```

```tsx
<Rating>
    <Rating.Option value={1} />
</Rating>
```

## Examples

### Basic

Rating is used with the `value` property.

```tsx
import { Rating } from 'primereact/rating';

function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <Rating value={3.5}>
                <Rating.Option />
            </Rating>
        </div>
    );
}

export default BasicDemo;

```

### Half Stars

Use `allowHalf` property to allow half stars.

```tsx
import { Rating } from 'primereact/rating';

function AllowHalfDemo() {
    return (
        <div className="card flex justify-center">
            <Rating value={3} allowHalf={false}>
                <Rating.Option />
            </Rating>
        </div>
    );
}

export default AllowHalfDemo;

```

### Controlled

Use `onValueChange` to listen to value changes.

```tsx
import { useRatingChangeEvent } from '@primereact/types/shared/rating';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import React from 'react';

function ControlledDemo() {
    const [value, setValue] = React.useState<number | undefined>(4);

    return (
        <div className="card flex flex-col justify-center gap-4">
            <div className="flex items-center gap-2">
                <Button onClick={() => setValue(2.5)} severity="secondary" variant="outlined">
                    2.5 Star
                </Button>
                <Button onClick={() => setValue(3)} severity="secondary" variant="outlined">
                    3 Star
                </Button>
                <Button onClick={() => setValue(3.5)} severity="secondary" variant="outlined">
                    3.5 Star
                </Button>
            </div>
            <Rating value={value} onValueChange={(e: useRatingChangeEvent) => setValue(e.value)}>
                <Rating.Option />
            </Rating>
        </div>
    );
}

export default ControlledDemo;

```

### Number of Stars

Number of stars to display is defined with `stars` property.

```tsx
import { Rating } from 'primereact/rating';

function StarsDemo() {
    return (
        <div className="card flex justify-center">
            <Rating stars={10}>
                <Rating.Option />
            </Rating>
        </div>
    );
}

export default StarsDemo;

```

### Template

Custom icons are used to override the default icons with `onIcon` and `offIcon` properties.

```tsx
import { Rating } from 'primereact/rating';

function TemplateDemo() {
    return (
        <div className="card flex flex-col gap-6 justify-center">
            <Rating value={3}>
                <Rating.Option onIcon={<span className="text-surface-950 dark:text-surface-0 text-2xl select-none">A</span>} offIcon={<span className="text-surface-300 dark:text-surface-700 text-2xl select-none">A</span>} />
            </Rating>
            <Rating value={3} allowHalf={false}>
                <Rating.Option
                    onIcon={
                        <span className="w-6 h-6">
                            <img src="https://primefaces.org/cdn/primevue/images/rating/custom-onicon.png" className="w-6 h-6" />
                        </span>
                    }
                    offIcon={
                        <span className="w-6 h-6">
                            <img src="https://primefaces.org/cdn/primevue/images/rating/custom-officon.png" />
                        </span>
                    }
                />
            </Rating>
        </div>
    );
}

export default TemplateDemo;

```

### ReadOnly

When `readOnly` is present, value cannot be edited.

```tsx
import { Rating } from 'primereact/rating';

function ReadOnlyDemo() {
    return (
        <div className="card flex justify-center">
            <Rating value={3} readOnly>
                <Rating.Option />
            </Rating>
        </div>
    );
}

export default ReadOnlyDemo;

```

### Disabled

When `disabled` is present, value cannot be edited.

```tsx
import { Rating } from 'primereact/rating';

function DisabledDemo() {
    return (
        <div className="card flex justify-center">
            <Rating value={3} disabled>
                <Rating.Option />
            </Rating>
        </div>
    );
}

export default DisabledDemo;

```

## Accessibility

### Screen Reader

Rating component internally uses radio buttons that are only visible to screen readers. The value to read for item is retrieved from the [locale](/docs/configuration#locale) API via `star` and `stars` of the `aria` property.

### Keyboard Support

Keyboard interaction is derived from the native browser handling of radio buttons in a group.

| Key                        | Function                                                                                             |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `tab`                      | Moves focus to the star representing the value, if there is none then first star receives the focus. |
| `left arrow` `up arrow`    | Moves focus to the previous star, if there is none then last radio button receives the focus.        |
| `right arrow` `down arrow` | Moves focus to the next star, if there is none then first star receives the focus.                   |
| `space`                    | If the focused star does not represent the value, changes the value to the star value.               |


# Rating Pass Through

Pass Through documentation for Rating component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="rating-pt" components={['Rating']} />

## Rating PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | RatingPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Rating Theming

Theming documentation for Rating component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-rating | Class name of the root element |
| p-rating-option | Class name of the option element |
| p-rating-on-icon | Class name of the on icon element |
| p-rating-off-icon | Class name of the off icon element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| rating.gap | --p-rating-gap | Gap of root |
| rating.transition.duration | --p-rating-transition-duration | Transition duration of root |
| rating.focus.ring.width | --p-rating-focus-ring-width | Focus ring width of root |
| rating.focus.ring.style | --p-rating-focus-ring-style | Focus ring style of root |
| rating.focus.ring.color | --p-rating-focus-ring-color | Focus ring color of root |
| rating.focus.ring.offset | --p-rating-focus-ring-offset | Focus ring offset of root |
| rating.focus.ring.shadow | --p-rating-focus-ring-shadow | Focus ring shadow of root |
| rating.icon.size | --p-rating-icon-size | Size of icon |
| rating.icon.color | --p-rating-icon-color | Color of icon |
| rating.icon.hover.color | --p-rating-icon-hover-color | Hover color of icon |
| rating.icon.active.color | --p-rating-icon-active-color | Active color of icon |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# ScrollArea API

API documentation for ScrollArea component


## ScrollArea

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ScrollAreaInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ScrollAreaInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ScrollAreaPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ScrollAreaInstance) => ReactNode) | null | The children to render. |
| step | number | 5 | Step factor to scroll the content while pressing the arrow keys. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| orientationState | string | null | Current orientation of scrolling, either "vertical" or "horizontal". |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useScrollAreaState | null | The state of the useScrollArea. |
| contentRef | RefObject<HTMLDivElement> | null | Reference to the scroll content element. |
| thumbXRef | RefObject<HTMLDivElement> | null | Reference to the horizontal scrollbar thumb element. |
| thumbYRef | RefObject<HTMLDivElement> | null | Reference to the vertical scrollbar thumb element. |
| lastScrollLeft | number | null | Current horizontal scroll position. |
| lastScrollTop | number | null | Current vertical scroll position. |
| onScroll | (event: UIEvent<HTMLDivElement>) => void | null | Event handler for content scrolling to update thumb positions. |
| onXBarMouseDown | (event: MouseEvent<HTMLDivElement>) => void | null | Event handler for horizontal scrollbar thumb drag interactions. |
| onYBarMouseDown | (event: MouseEvent<HTMLDivElement>) => void | null | Event handler for vertical scrollbar thumb drag interactions. |
| onFocus | (event: FocusEvent<HTMLDivElement>) => void | null | Event handler when the scrollbar thumb receives focus. |
| onBlur | () => void | null | Event handler when the scrollbar thumb loses focus. |
| onKeyDown | (event: KeyboardEvent<HTMLDivElement>) => void | null | Event handler for keyboard navigation to scroll content. |
| onKeyUp | () => void | null | Event handler to stop continuous scrolling when key is released. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ScrollArea component. | [object Object],[object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ScrollArea component. | [object Object] |


## ScrollAreaViewport

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ScrollAreaViewportInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ScrollAreaViewportInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ScrollAreaViewportPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ScrollAreaViewportInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| scrollarea | ScrollAreaInstance | null | Instance of the ScrollArea component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ScrollAreaViewport component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ScrollAreaViewport component. | [object Object] |


## ScrollAreaContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ScrollAreaContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ScrollAreaContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ScrollAreaContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ScrollAreaContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| scrollarea | ScrollAreaInstance | null | Instance of the ScrollArea component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ScrollAreaContent component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ScrollAreaContent component. | [object Object] |


## ScrollAreaThumbY

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ScrollAreaThumbYInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ScrollAreaThumbYInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ScrollAreaThumbYPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ScrollAreaThumbYInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| scrollarea | ScrollAreaInstance | null | Instance of the ScrollArea component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ScrollAreaThumbY component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ScrollAreaThumbY component. | [object Object] |


## ScrollAreaThumbX

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ScrollAreaThumbXInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ScrollAreaThumbXInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ScrollAreaThumbXPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ScrollAreaThumbXInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| scrollarea | ScrollAreaInstance | null | Instance of the ScrollArea component. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ScrollAreaThumbX component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ScrollAreaThumbX component. | [object Object] |


## useScrollArea

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| step | number | 5 | Step factor to scroll the content while pressing the arrow keys. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| orientationState | string | null | Current orientation of scrolling, either "vertical" or "horizontal". |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useScrollAreaState | null | The state of the useScrollArea. |
| contentRef | RefObject<HTMLDivElement> | null | Reference to the scroll content element. |
| thumbXRef | RefObject<HTMLDivElement> | null | Reference to the horizontal scrollbar thumb element. |
| thumbYRef | RefObject<HTMLDivElement> | null | Reference to the vertical scrollbar thumb element. |
| lastScrollLeft | number | null | Current horizontal scroll position. |
| lastScrollTop | number | null | Current vertical scroll position. |
| onScroll | (event: UIEvent<HTMLDivElement>) => void | null | Event handler for content scrolling to update thumb positions. |
| onXBarMouseDown | (event: MouseEvent<HTMLDivElement>) => void | null | Event handler for horizontal scrollbar thumb drag interactions. |
| onYBarMouseDown | (event: MouseEvent<HTMLDivElement>) => void | null | Event handler for vertical scrollbar thumb drag interactions. |
| onFocus | (event: FocusEvent<HTMLDivElement>) => void | null | Event handler when the scrollbar thumb receives focus. |
| onBlur | () => void | null | Event handler when the scrollbar thumb loses focus. |
| onKeyDown | (event: KeyboardEvent<HTMLDivElement>) => void | null | Event handler for keyboard navigation to scroll content. |
| onKeyUp | () => void | null | Event handler to stop continuous scrolling when key is released. |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useScrollArea headless. | [object Object] |



# ScrollArea

ScrollArea is a cross browser, lightweight and themable alternative to native browser scrollbar.


## Usage

```tsx
import { ScrollArea } from 'primereact/scrollarea';
```

```tsx
<ScrollArea>
    <ScrollArea.Viewport>
        <ScrollArea.Content />
    </ScrollArea.Viewport>
    <ScrollArea.ThumbX />
    <ScrollArea.ThumbY />
</ScrollArea>
```

## Examples

### Basic

ScrollPanel is defined using dimensions for the scrollable viewport.

```tsx
import { ScrollArea } from 'primereact/scrollarea';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <ScrollArea style={{ width: '600px', height: '200px' }}>
                <ScrollArea.Viewport>
                    <ScrollArea.Content>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                        </p>
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                            culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                        </p>
                        <p className="m-0">
                            Quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et
                            molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat
                        </p>
                    </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.ThumbY />
            </ScrollArea>
        </div>
    );
}

```

### Horizontal

ScrollArea supports horizontal scrolling for content that extends beyond the horizontal viewport.

```tsx
import { PhotoService } from '@/services/photo.service';
import Image from 'next/image';
import { ScrollArea } from 'primereact/scrollarea';
import * as React from 'react';

interface ImageData {
    itemImageSrc: string;
    thumbnailImageSrc: string;
    alt: string;
    title: string;
}

export default function HorizontalDemo() {
    const [images, setImages] = React.useState<ImageData[] | null>(null);

    React.useEffect(() => {
        PhotoService.getImages().then((data) => setImages(data));
    }, []);

    return (
        <div className="card flex justify-center">
            <ScrollArea className="border border-surface-200 dark:border-surface-700 rounded-md" style={{ width: '632px', height: '200px' }}>
                <ScrollArea.Viewport className="p-4">
                    <ScrollArea.Content>
                        <div className="flex w-max gap-4" style={{ minWidth: '3000px' }}>
                            {images &&
                                images.map((image, index) => (
                                    <figure key={index} className="shrink-0">
                                        <Image width={150} height={100} src={image.itemImageSrc} alt={image.title} className="w-full object-cover rounded-md" />
                                        <figcaption className="pt-2 text-xs">
                                            Photo by <span className="font-semibold">{image.title}</span>
                                        </figcaption>
                                    </figure>
                                ))}
                        </div>
                    </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.ThumbX />
            </ScrollArea>
        </div>
    );
}

```

### Custom

Scrollbar visuals can be styled for a unified look across different platforms.

```tsx
import { ScrollArea } from 'primereact/scrollarea';

export default function CustomDemo() {
    return (
        <div className="card flex justify-center">
            <ScrollArea style={{ width: '600px', height: '200px' }}>
                <ScrollArea.Viewport>
                    <ScrollArea.Content>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                        </p>
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                            culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                        </p>
                        <p className="m-0">
                            Quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et
                            molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat
                        </p>
                    </ScrollArea.Content>
                </ScrollArea.Viewport>
                <ScrollArea.ThumbY className="bg-primary" />
            </ScrollArea>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Scrollbars of the ScrollArea has a `scrollbar` role along with the `aria-controls` attribute that refers to the `id` of the scrollable content container and the `aria-orientation` to indicate the orientation of scrolling.

### Keyboard Support

| Key          | Function                                                      |
| ------------ | ------------------------------------------------------------- |
| `tab`        | Moves focus through the bar.                                  |
| `down arrow` | Scrolls content down when vertical scrolling is available.    |
| `up arrow`   | Scrolls content up when vertical scrolling is available.      |
| `left`       | Scrolls content left when horizontal scrolling is available.  |
| `right`      | Scrolls content right when horizontal scrolling is available. |


# ScrollArea Pass Through

Pass Through documentation for ScrollArea component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="scrollarea-pt" components={['ScrollArea']} />

## ScrollArea PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ScrollAreaPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| viewport | ScrollAreaPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the viewport's DOM element. |
| content | ScrollAreaPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the content's DOM element. |
| thumbY | ScrollAreaPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the thumbY's DOM element. |
| thumbX | ScrollAreaPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the thumbX's DOM element. |


## ScrollAreaViewport PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ScrollAreaViewportPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ScrollAreaContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ScrollAreaContentPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ScrollAreaThumbY PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ScrollAreaThumbYPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |


## ScrollAreaThumbX PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ScrollAreaThumbXPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the root's DOM element. |



# ScrollArea Theming

Theming documentation for ScrollArea component


## Styled

### ScrollArea CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-scrollarea | Class name of the root element |
| p-scrollpanel-content-container | Class name of the viewport element |
| p-scrollpanel-content | Class name of the content element |
| p-scrollpanel-bar-x | Class name of the thumb x element |
| p-scrollpanel-bar-y | Class name of the thumb y element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| scrollpanel.transition.duration | --p-scrollpanel-transition-duration | Transition duration of root |
| scrollpanel.bar.size | --p-scrollpanel-bar-size | Size of bar |
| scrollpanel.bar.border.radius | --p-scrollpanel-bar-border-radius | Border radius of bar |
| scrollpanel.bar.focus.ring.width | --p-scrollpanel-bar-focus-ring-width | Focus ring width of bar |
| scrollpanel.bar.focus.ring.style | --p-scrollpanel-bar-focus-ring-style | Focus ring style of bar |
| scrollpanel.bar.focus.ring.color | --p-scrollpanel-bar-focus-ring-color | Focus ring color of bar |
| scrollpanel.bar.focus.ring.offset | --p-scrollpanel-bar-focus-ring-offset | Focus ring offset of bar |
| scrollpanel.bar.focus.ring.shadow | --p-scrollpanel-bar-focus-ring-shadow | Focus ring shadow of bar |
| scrollpanel.bar.background | --p-scrollpanel-bar-background | Background of bar |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Skeleton API

API documentation for Skeleton component


## Skeleton

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: SkeletonInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: SkeletonInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<SkeletonPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: SkeletonInstance) => ReactNode) | null | The children to render. |
| shape | "circle" \\| "rectangle" | rectangle | Shape of the element. |
| size | string | null | Size of the Circle or Square. |
| width | string | 100% | Width of the element. |
| height | string | 1rem | Height of the element. |
| borderRadius | string | null | Border radius of the element, defaults to value from theme. |
| animation | "none" \\| "wave" | wave | Type of the animation. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Skeleton component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Skeleton component. | [object Object] |


## useSkeleton

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useSkeleton headless. | [object Object] |



# Skeleton

Skeleton is a placeholder to display instead of the actual content.


## Usage

```tsx
import { Skeleton } from 'primereact/skeleton';
```

```tsx
<Skeleton width="4rem" height="2rem" />
```

## Examples

### Card

Sample Card implementation using different `Skeleton` components and Tailwind CSS utilities.

```tsx
import { Skeleton } from 'primereact/skeleton';

export default function ShapesDemo() {
    return (
        <div className="card flex items-center justify-center">
            <div className="max-w-md w-full space-y-4">
                <div className="flex items-start gap-4">
                    <Skeleton shape="circle" size="3.5rem" />
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <Skeleton width="40%" height="1.75rem" />
                        </div>
                        <div className="space-y-1.5 mt-3">
                            <Skeleton width="100%" borderRadius="4px" />
                            <Skeleton width="90%" borderRadius="4px" />
                            <Skeleton width="30%" borderRadius="4px" />
                        </div>
                        <Skeleton className="mt-4" height="16rem" />
                        <div className="flex items-center gap-4 mt-4">
                            <Skeleton width="4rem" height="1.75rem" />
                            <Skeleton width="4rem" height="1.75rem" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

```

### Shapes

Various shapes and sizes can be created using styling properties like `shape`, `width`, `height`, `size`, `borderRadius` and `className`.

```tsx
import { Skeleton } from 'primereact/skeleton';

export default function ShapesDemo() {
    return (
        <div className="card">
            <div className="flex flex-col items-start gap-8 max-w-sm">
                <div className="w-full">
                    <h5>Circle</h5>
                    <div className="flex items-end gap-4">
                        <Skeleton shape="circle" size="5rem" />
                        <Skeleton shape="circle" size="4rem" />
                        <Skeleton shape="circle" size="3rem" />
                        <Skeleton shape="circle" size="2rem" />
                    </div>
                </div>
                <div className="w-full">
                    <h5>Square</h5>
                    <div className="flex items-end gap-4">
                        <Skeleton size="5rem" />
                        <Skeleton size="4rem" />
                        <Skeleton size="3rem" />
                        <Skeleton size="2rem" />
                    </div>
                </div>
                <div className="w-full">
                    <h5>Rectangle</h5>
                    <div className="flex flex-col gap-2 w-full">
                        <Skeleton />
                        <Skeleton width="12rem" />
                        <Skeleton width="7rem" />
                        <Skeleton height="4rem" />
                        <Skeleton width="12rem" height="4rem" />
                    </div>
                </div>
                <div className="w-full">
                    <h5>Rounded</h5>
                    <div className="flex flex-col gap-2 w-full">
                        <Skeleton borderRadius="16px" />
                        <Skeleton width="12rem" borderRadius="16px" />
                        <Skeleton width="7rem" borderRadius="16px" />
                        <Skeleton height="4rem" borderRadius="16px" />
                        <Skeleton width="12rem" height="4rem" borderRadius="16px" />
                    </div>
                </div>
            </div>
        </div>
    );
}

```

### Color

Customize the background color of the skeleton.

```tsx
import { Skeleton } from 'primereact/skeleton';

export default function ColorDemo() {
    return (
        <div className="card flex items-center justify-center">
            <div className="max-w-md w-full space-y-1.5">
                <Skeleton width="100%" borderRadius="4px" className="bg-blue-500/20" />
                <Skeleton width="90%" borderRadius="4px" className="bg-red-500/20" />
                <Skeleton width="30%" borderRadius="4px" className="bg-yellow-500/20" />
            </div>
        </div>
    );
}

```

### Grid

Sample Grid implementation using different Skeleton components and Tailwind CSS utilities.

```tsx
import { Skeleton } from 'primereact/skeleton';

export default function GridDemo() {
    return (
        <div className="card grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="border rounded-md border-surface-200 dark:border-surface-700">
                    <Skeleton width="100%" height="10rem" className="rounded-t-md rounded-b-none" />
                    <div className="p-4 flex items-start gap-3">
                        <Skeleton shape="circle" size="3rem" />
                        <div className="flex-1 flex flex-col gap-2">
                            <Skeleton width="100%" borderRadius="4px" />
                            <Skeleton width="90%" borderRadius="4px" />
                            <Skeleton width="20%" borderRadius="4px" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

```

## Accessibility

### Screen Reader

Skeleton uses aria-hidden as "true" so that it gets ignored by screen readers, any valid attribute is passed to the root element so you may customize it further if required. If multiple skeletons are grouped inside a container, you may use aria-busy on the container element as well to indicate the loading process.

### Keyboard Support

Component does not include any interactive elements.


# Skeleton Pass Through

Pass Through documentation for Skeleton component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="skeleton-pt" components={['Skeleton']} />

## Skeleton PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | SkeletonPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Skeleton Theming

Theming documentation for Skeleton component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-skeleton | Class name of the root element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| skeleton.border.radius | --p-skeleton-border-radius | Border radius of root |
| skeleton.background | --p-skeleton-background | Background of root |
| skeleton.animation.background | --p-skeleton-animation-background | Animation background of root |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Slider API

API documentation for Slider component


## Slider

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: SliderInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: SliderInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<SliderPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: SliderInstance) => ReactNode) | null | The children to render. |
| disabled | boolean | false | When present, it specifies that the element should be disabled. |
| onValueChange | (event: SliderChangeEvent) => void | null | Callback fired when the ToggleButton's pressed state changes. |
| value | number \\| number[] | null | Value of the component. |
| defaultValue | number \\| number[] | null | The default value for the input when not controlled by  `value` . |
| min | number | 0 | Mininum boundary value. |
| max | number | 100 | Maximum boundary value. |
| orientation | "horizontal" \\| "vertical" | horizontal | Orientation of the slider. |
| step | number | 1 | Step factor to increment/decrement the value. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | number \\| number[] | null | Value of the component. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useSliderState | null | The state of the useSlider. |
| registerThumb | () => number | null | Registers a thumb and returns its index. |
| thumbCounter | MutableRefObject<number> | null | Counter for tracking number of thumbs. |
| range | () => boolean | null | Determines if the slider is in range mode. |
| onTouchStart | (event: TouchEvent<HTMLElement>, index: number) => void | null | Handler for touch start events. |
| onDrag | (event: MouseEvent<Element, MouseEvent> \\| TouchEvent<Element>) => void | null | Handler for drag events. |
| onDragEnd | () => void | null | Handler for drag end events. |
| onMouseDown | (event: MouseEvent<HTMLElement>, index: number) => void | null | Handler for mouse down events. |
| onKeyDown | (event: KeyboardEvent, index: number) => void | null | Handler for key down events. |
| rangeStyle | () => CSSProperties | null | Returns the style object for the range. |
| handleThumbStyle | () => CSSProperties | null | Returns the style object for the handle thumb. |
| rangeStartHandleStyle | () => CSSProperties | null | Returns the style object for the range start handle. |
| rangeEndHandleStyle | () => CSSProperties | null | Returns the style object for the range end handle. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.slider.events.SliderChangeEvent | SliderChangeEvent | Event fired when the Slider's value changes. |  | [object Object],[object Object] |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Slider component. | [object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Slider component. | [object Object] |


## SliderRange

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: SliderRangeInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: SliderRangeInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<SliderRangePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: SliderRangeInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| slider | SliderInstance | null | The Slider component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of SliderRange component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of SliderRange component. | [object Object] |


## SliderThumb

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: SliderThumbInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: SliderThumbInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<SliderThumbPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: SliderThumbInstance) => ReactNode) | null | The children to render. |
| tabIndex | number | 0 | Index of the element in tabbing order. |
| ariaLabel | string | null | Establishes a string value that labels the component. |
| ariaLabelledby | string | null | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| slider | SliderInstance | null | The Slider component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of SliderThumb component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of SliderThumb component. | [object Object] |


## useSlider

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | number \\| number[] | null | Value of the component. |
| defaultValue | number \\| number[] | null | The default value for the input when not controlled by  `value` . |
| min | number | 0 | Mininum boundary value. |
| max | number | 100 | Maximum boundary value. |
| orientation | "horizontal" \\| "vertical" | horizontal | Orientation of the slider. |
| step | number | 1 | Step factor to increment/decrement the value. |
| onValueChange | (event: useSliderChangeEvent) => void | null | Callback fired when the ToggleButton's pressed state changes. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | number \\| number[] | null | Value of the component. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useSliderState | null | The state of the useSlider. |
| registerThumb | () => number | null | Registers a thumb and returns its index. |
| thumbCounter | MutableRefObject<number> | null | Counter for tracking number of thumbs. |
| range | () => boolean | null | Determines if the slider is in range mode. |
| onTouchStart | (event: TouchEvent<HTMLElement>, index: number) => void | null | Handler for touch start events. |
| onDrag | (event: MouseEvent<Element, MouseEvent> \\| TouchEvent<Element>) => void | null | Handler for drag events. |
| onDragEnd | () => void | null | Handler for drag end events. |
| onMouseDown | (event: MouseEvent<HTMLElement>, index: number) => void | null | Handler for mouse down events. |
| onKeyDown | (event: KeyboardEvent, index: number) => void | null | Handler for key down events. |
| rangeStyle | () => CSSProperties | null | Returns the style object for the range. |
| handleThumbStyle | () => CSSProperties | null | Returns the style object for the handle thumb. |
| rangeStartHandleStyle | () => CSSProperties | null | Returns the style object for the range start handle. |
| rangeEndHandleStyle | () => CSSProperties | null | Returns the style object for the range end handle. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.useslider.events.useSliderChangeEvent | useSliderChangeEvent | Event fired when the Slider's value changes. |  | [object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useSlider headless. | [object Object] |



# Slider

Slider is a component to provide input with a drag handle.


## Usage

```tsx
import { Slider } from 'primereact/slider';
```

```tsx
<Slider>
    <Slider.Range />
    <Slider.Thumb />
</Slider>
```

## Examples

### Basic

Slider requires `Slider.Range` and `Slider.Thumb` components as children.

```tsx
import { Slider } from 'primereact/slider';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <Slider defaultValue={50} className="w-56">
                <Slider.Range />
                <Slider.Thumb />
            </Slider>
        </div>
    );
}

```

### Input

```tsx
import { SliderChangeEvent } from '@primereact/types/shared/slider';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';
import * as React from 'react';

export default function InputDemo() {
    const [value, setValue] = React.useState(50);

    return (
        <div className="card flex justify-center">
            <div className="w-56">
                <InputText value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(Number(e.target.value))} fluid className="mb-4" />
                <Slider value={value} onValueChange={(e: SliderChangeEvent) => setValue(e.value as number)} className="w-full">
                    <Slider.Range />
                    <Slider.Thumb />
                </Slider>
            </div>
        </div>
    );
}

```

### Step

Size of each movement is defined with the `step` property.

```tsx
import { Slider } from 'primereact/slider';

export default function StepDemo() {
    return (
        <div className="card flex justify-center">
            <Slider defaultValue={20} step={20} className="w-56">
                <Slider.Range />
                <Slider.Thumb />
            </Slider>
        </div>
    );
}

```

### Range

Slider provides two handles to define two values. In range mode, value should be an array instead of a single value.

```tsx
import { Slider } from 'primereact/slider';

export default function RangeDemo() {
    return (
        <div className="card flex justify-center">
            <Slider defaultValue={[20, 80]} className="w-56">
                <Slider.Range />
                <Slider.Thumb />
                <Slider.Thumb />
            </Slider>
        </div>
    );
}

```

### Filter

Image filter implementation using multiple sliders.

```tsx
import { SliderChangeEvent } from '@primereact/types/shared/slider';
import type { ToggleButtonGroupValueChangeEvent } from '@primereact/types/shared/togglebutton';
import Image from 'next/image';
import { Slider } from 'primereact/slider';
import { ToggleButton } from 'primereact/togglebutton';
import * as React from 'react';

export default function FilterDemo() {
    const [filter, setFilter] = React.useState(0);
    const [filterValues, setFilterValues] = React.useState([100, 100, 0]);

    const filterStyle = React.useMemo(() => {
        return {
            filter: `contrast(${filterValues[0]}%) brightness(${filterValues[1]}%) sepia(${filterValues[2]}%)`
        };
    }, [filterValues]);

    return (
        <div className="card flex flex-col items-center justify-center">
            <Image alt="user header" className="w-80 rounded mb-6" src="https://primefaces.org/cdn/primevue/images/card-vue.jpg" style={filterStyle} width={320} height={240} />
            <ToggleButton.Group value={filter} onValueChange={(e: ToggleButtonGroupValueChangeEvent) => setFilter(e.value as number)}>
                <ToggleButton value={0}>
                    <ToggleButton.Indicator>Contrast</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value={1}>
                    <ToggleButton.Indicator>Brightness</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value={2}>
                    <ToggleButton.Indicator>Sepia</ToggleButton.Indicator>
                </ToggleButton>
            </ToggleButton.Group>
            <Slider
                value={filterValues[filter]}
                onValueChange={(e: SliderChangeEvent) =>
                    setFilterValues((prev) => {
                        const updated = [...prev];

                        updated[filter] = e.value as number;

                        return updated;
                    })
                }
                className="w-56 mt-4"
                min={0}
                max={200}
            >
                <Slider.Range />
                <Slider.Thumb />
            </Slider>
        </div>
    );
}

```

### Vertical

Default layout of slider is `horizontal`, use `orientation` property for the alternative `vertical` mode.

```tsx
import { Slider } from 'primereact/slider';

export default function VerticalDemo() {
    return (
        <div className="card flex justify-center">
            <Slider defaultValue={50} orientation="vertical" className="h-56">
                <Slider.Range />
                <Slider.Thumb />
            </Slider>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Slider element component uses `slider` role on the handle in addition to the `aria-orientation`, `aria-valuemin`, `aria-valuemax` and `aria-valuenow` attributes. Value to describe the component can be defined using `aria-labelledby` and `aria-label` props.

### Keyboard Support

| Key                          | Function                          |
| ---------------------------- | --------------------------------- |
| `tab`                        | Moves focus to the slider.        |
| `left arrow` / `up arrow`    | Decrements the value.             |
| `right arrow` / `down arrow` | Increments the value.             |
| `home`                       | Set the minimum value.            |
| `end`                        | Set the maximum value.            |
| `page up`                    | Increments the value by 10 steps. |
| `page down`                  | Decrements the value by 10 steps. |


# Slider Pass Through

Pass Through documentation for Slider component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="slider-pt" components={['Slider']} />

## Slider PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | SliderPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| range | SliderPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the range's DOM element. |
| thumb | SliderPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the thumb's DOM element. |


## SliderRange PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | SliderRangePassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## SliderThumb PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | SliderThumbPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Slider Theming

Theming documentation for Slider component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-slider | Class name of the root element |
| p-slider-range | Class name of the range element |
| p-slider-handle | Class name of the thumb element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| slider.transition.duration | --p-slider-transition-duration | Transition duration of root |
| slider.track.background | --p-slider-track-background | Background of track |
| slider.track.border.radius | --p-slider-track-border-radius | Border radius of track |
| slider.track.size | --p-slider-track-size | Size of track |
| slider.range.background | --p-slider-range-background | Background of range |
| slider.handle.width | --p-slider-handle-width | Width of handle |
| slider.handle.height | --p-slider-handle-height | Height of handle |
| slider.handle.border.radius | --p-slider-handle-border-radius | Border radius of handle |
| slider.handle.background | --p-slider-handle-background | Background of handle |
| slider.handle.hover.background | --p-slider-handle-hover-background | Hover background of handle |
| slider.handle.content.border.radius | --p-slider-handle-content-border-radius | Content border radius of handle |
| slider.handle.content.background | --p-slider-handle-content-background | Background of handle |
| slider.handle.content.hover.background | --p-slider-handle-content-hover-background | Content hover background of handle |
| slider.handle.content.width | --p-slider-handle-content-width | Content width of handle |
| slider.handle.content.height | --p-slider-handle-content-height | Content height of handle |
| slider.handle.content.shadow | --p-slider-handle-content-shadow | Content shadow of handle |
| slider.handle.focus.ring.width | --p-slider-handle-focus-ring-width | Focus ring width of handle |
| slider.handle.focus.ring.style | --p-slider-handle-focus-ring-style | Focus ring style of handle |
| slider.handle.focus.ring.color | --p-slider-handle-focus-ring-color | Focus ring color of handle |
| slider.handle.focus.ring.offset | --p-slider-handle-focus-ring-offset | Focus ring offset of handle |
| slider.handle.focus.ring.shadow | --p-slider-handle-focus-ring-shadow | Focus ring shadow of handle |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Splitter API

API documentation for Splitter component


## Splitter

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: SplitterInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: SplitterInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<SplitterPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: SplitterInstance) => ReactNode) | null | The children to render. |
| orientation | "horizontal" \\| "vertical" | horizontal | Orientation of the panels. |
| gutterSize | number | 4 | Size of the divider in pixels. |
| stateKey | string | null | Storage identifier of a stateful Splitter. |
| stateStorage | "local" \\| "session" | session | Defines where a stateful splitter keeps its state, valid values are 'session' for sessionStorage and 'local' for localStorage. |
| step | number | 5 | Step factor to increment/decrement the size of the panels while pressing the arrow keys. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| panels | ReactNode[] | null |  |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useSplitterState | null | The state of the useSplitter. |
| registerPanel | () => number | null | Registers a new panel and returns its index. |
| registerGutter | () => number | null | Registers a new gutter and returns its index. |
| registerThumb | () => number | null | Registers a new thumb and returns its index. |
| panelCounter | RefObject<number> | null | Counter tracking the number of panels. |
| panelSizes | number[] | null | Array storing the size of each panel. |
| prevSize | number | null | Previous size of the panel during resize. |
| gutterRef | RefObject<HTMLDivElement> | null | Reference to the currently active gutter element. |
| gutterRefs | RefObject<HTMLDivElement[]> | null | References to all gutter elements. |
| onResizeStart | (event: MouseEvent<Element, MouseEvent> \\| TouchEvent<Element> \\| KeyboardEvent, index: number, isKeyDown: boolean) => void | null | Handler for resize start events. |
| onResize | (event: MouseEvent<Element, MouseEvent> \\| TouchEvent<Element> \\| KeyboardEvent, step: number, isKeyDown: boolean) => void | null | Handler for resize events. |
| onResizeEnd | () => void | null | Handler for resize end events. |
| onGutterMouseDown | (event: MouseEvent, index: number) => void | null | Handler for mouse down events on gutters. |
| onGutterTouchStart | (event: TouchEvent, index: number) => void | null | Handler for touch start events on gutters. |
| onGutterTouchMove | (event: TouchEvent) => void | null | Handler for touch move events on gutters. |
| onGutterTouchEnd | (event: TouchEvent) => void | null | Handler for touch end events on gutters. |
| onGutterKeyUp | () => void | null | Handler for key up events on gutters. |
| onGutterKeyDown | (event: KeyboardEvent, index: number) => void | null | Handler for key down events on gutters. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Splitter component. | [object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Splitter component. | [object Object] |


## SplitterPanel

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: SplitterPanelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: SplitterPanelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<SplitterPanelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: SplitterPanelInstance) => ReactNode) | null | The children to render. |
| size | number | null | Size of the element relative to 100%. |
| minSize | number | null | Minimum size of the element relative to 100%. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| splitter | SplitterInstance | null | The Splitter component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of SplitterPanel component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of SplitterPanel component. | [object Object] |


## SplitterGutter

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: SplitterGutterInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: SplitterGutterInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<SplitterGutterPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: SplitterGutterInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| splitter | SplitterInstance | null | The Splitter component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of SplitterGutter component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of SplitterGutter component. | [object Object] |


## SplitterThumb

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: SplitterThumbInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: SplitterThumbInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<SplitterThumbPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: SplitterThumbInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| splitter | SplitterInstance | null | The Splitter component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of SplitterThumb component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of SplitterThumb component. | [object Object] |


## useSplitter

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| orientation | "horizontal" \\| "vertical" | horizontal | Orientation of the panels. |
| gutterSize | number | 4 | Size of the divider in pixels. |
| stateKey | string | null | Storage identifier of a stateful Splitter. |
| stateStorage | "local" \\| "session" | session | Defines where a stateful splitter keeps its state, valid values are 'session' for sessionStorage and 'local' for localStorage. |
| step | number | 5 | Step factor to increment/decrement the size of the panels while pressing the arrow keys. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| panels | ReactNode[] | null |  |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useSplitterState | null | The state of the useSplitter. |
| registerPanel | () => number | null | Registers a new panel and returns its index. |
| registerGutter | () => number | null | Registers a new gutter and returns its index. |
| registerThumb | () => number | null | Registers a new thumb and returns its index. |
| panelCounter | RefObject<number> | null | Counter tracking the number of panels. |
| panelSizes | number[] | null | Array storing the size of each panel. |
| prevSize | number | null | Previous size of the panel during resize. |
| gutterRef | RefObject<HTMLDivElement> | null | Reference to the currently active gutter element. |
| gutterRefs | RefObject<HTMLDivElement[]> | null | References to all gutter elements. |
| onResizeStart | (event: MouseEvent<Element, MouseEvent> \\| TouchEvent<Element> \\| KeyboardEvent, index: number, isKeyDown: boolean) => void | null | Handler for resize start events. |
| onResize | (event: MouseEvent<Element, MouseEvent> \\| TouchEvent<Element> \\| KeyboardEvent, step: number, isKeyDown: boolean) => void | null | Handler for resize events. |
| onResizeEnd | () => void | null | Handler for resize end events. |
| onGutterMouseDown | (event: MouseEvent, index: number) => void | null | Handler for mouse down events on gutters. |
| onGutterTouchStart | (event: TouchEvent, index: number) => void | null | Handler for touch start events on gutters. |
| onGutterTouchMove | (event: TouchEvent) => void | null | Handler for touch move events on gutters. |
| onGutterTouchEnd | (event: TouchEvent) => void | null | Handler for touch end events on gutters. |
| onGutterKeyUp | () => void | null | Handler for key up events on gutters. |
| onGutterKeyDown | (event: KeyboardEvent, index: number) => void | null | Handler for key down events on gutters. |


### Events

<DocTable name="useSplitter" category="api" type="events" />

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useSplitter headless. | [object Object] |



# Splitter

Splitter is utilized to separate and resize panels.


## Usage

```tsx
import { Splitter } from 'primereact/splitter';
```

```tsx
<Splitter>
    <Splitter.Panel />
    <Splitter.Gutter>
        <Splitter.Thumb />
    </Splitter.Gutter>
    <Splitter.Panel />
</Splitter>
```

## Examples

### Horizontal

Splitter requires two `Splitter.Panel` components as children which are displayed horizontally by default.

```tsx
import { Splitter } from 'primereact/splitter';

export default function HorizontalDemo() {
    return (
        <div className="card ">
            <Splitter style={{ height: '300px' }}>
                <Splitter.Panel className="flex items-center justify-center"> Panel 1 </Splitter.Panel>
                <Splitter.Gutter>
                    <Splitter.Thumb />
                </Splitter.Gutter>
                <Splitter.Panel className="flex items-center justify-center"> Panel 2 </Splitter.Panel>
            </Splitter>
        </div>
    );
}

```

### Size

Initial dimension of a panel is percentage based and defined using the `size` property. In addition, `minSize` is provided to set a minimum value during a resize.

```tsx
import { Splitter } from 'primereact/splitter';

export default function SizeDemo() {
    return (
        <div className="card ">
            <Splitter style={{ height: '300px' }}>
                <Splitter.Panel className="flex items-center justify-center" size={25} minSize={10}>
                    Panel 1
                </Splitter.Panel>
                <Splitter.Gutter>
                    <Splitter.Thumb />
                </Splitter.Gutter>
                <Splitter.Panel className="flex items-center justify-center" size={75}>
                    Panel 2
                </Splitter.Panel>
            </Splitter>
        </div>
    );
}

```

## Vertical

Splitters can be combined to create advanced layouts.

```tsx
import { Splitter } from 'primereact/splitter';

export default function VerticalDemo() {
    return (
        <div className="card ">
            <Splitter orientation="vertical" style={{ height: '300px' }}>
                <Splitter.Panel className="flex items-center justify-center"> Panel 1 </Splitter.Panel>
                <Splitter.Gutter>
                    <Splitter.Thumb />
                </Splitter.Gutter>
                <Splitter.Panel className="flex items-center justify-center"> Panel 2 </Splitter.Panel>
            </Splitter>
        </div>
    );
}

```

## Nested

Splitters can be combined to create advanced layouts.

```tsx
import { Splitter } from 'primereact/splitter';

export default function NestedDemo() {
    return (
        <div className="card ">
            <Splitter style={{ height: '300px' }}>
                <Splitter.Panel className="flex items-center justify-center" size={20} minSize={10}>
                    Panel 1
                </Splitter.Panel>
                <Splitter.Gutter>
                    <Splitter.Thumb />
                </Splitter.Gutter>
                <Splitter.Panel size={80}>
                    <Splitter orientation="vertical">
                        <Splitter.Panel className="flex items-center justify-center" size={15}>
                            Panel 2
                        </Splitter.Panel>
                        <Splitter.Gutter>
                            <Splitter.Thumb />
                        </Splitter.Gutter>
                        <Splitter.Panel size={85}>
                            <Splitter>
                                <Splitter.Panel className="flex items-center justify-center" size={20}>
                                    Panel 3
                                </Splitter.Panel>
                                <Splitter.Gutter>
                                    <Splitter.Thumb />
                                </Splitter.Gutter>
                                <Splitter.Panel className="flex items-center justify-center" size={80}>
                                    Panel 4
                                </Splitter.Panel>
                            </Splitter>
                        </Splitter.Panel>
                    </Splitter>
                </Splitter.Panel>
            </Splitter>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Splitter bar defines `separator` as the role with `aria-orientation` set to either horizontal or vertical.

### Keyboard Support

| Key           | Function                                  |
| ------------- | ----------------------------------------- |
| `tab`         | Moves focus through the splitter bar.     |
| `down arrow`  | Moves a vertical splitter down.           |
| `up arrow`    | Moves a vertical splitter up.             |
| `left arrow`  | Moves a horizontal splitter to the left.  |
| `right arrow` | Moves a horizontal splitter to the right. |


# Splitter Pass Through

Pass Through documentation for Splitter component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="splitter-pt" components={['Splitter']} />

## Splitter PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | SplitterPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| panel | SplitterPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the panel's DOM element. |
| gutter | SplitterPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the gutter's DOM element. |
| thumb | SplitterPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the thumb's DOM element. |


## SplitterPanel PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | SplitterPanelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## SplitterGutter PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | SplitterGutterPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## SplitterThumb PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | SplitterThumbPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Splitter Theming

Theming documentation for Splitter component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-splitter | Class name of the root element |
| p-splitterpanel | Class name of the panel element |
| p-splitter-gutter | Class name of the gutter element |
| p-splitter-gutter-handle | Class name of the thumb element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| splitter.background | --p-splitter-background | Background of root |
| splitter.border.color | --p-splitter-border-color | Border color of root |
| splitter.color | --p-splitter-color | Color of root |
| splitter.transition.duration | --p-splitter-transition-duration | Transition duration of root |
| splitter.gutter.background | --p-splitter-gutter-background | Background of gutter |
| splitter.handle.size | --p-splitter-handle-size | Size of handle |
| splitter.handle.background | --p-splitter-handle-background | Background of handle |
| splitter.handle.border.radius | --p-splitter-handle-border-radius | Border radius of handle |
| splitter.handle.focus.ring.width | --p-splitter-handle-focus-ring-width | Focus ring width of handle |
| splitter.handle.focus.ring.style | --p-splitter-handle-focus-ring-style | Focus ring style of handle |
| splitter.handle.focus.ring.color | --p-splitter-handle-focus-ring-color | Focus ring color of handle |
| splitter.handle.focus.ring.offset | --p-splitter-handle-focus-ring-offset | Focus ring offset of handle |
| splitter.handle.focus.ring.shadow | --p-splitter-handle-focus-ring-shadow | Focus ring shadow of handle |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Stepper API

API documentation for Stepper component


## Stepper

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: StepperInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: StepperInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<StepperPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: StepperInstance) => ReactNode) | null | The children to render. |
| defaultValue | string \\| number | null | Default value of the active step. |
| value | string \\| number | null | Value of the active step. |
| linear | boolean | false | Whether the steps are clickable or not. |
| onValueChange | (event: useStepperChangeEvent) => void | null | Callback fired when the stepper's value changes. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | string \\| number | null | Value of the active step. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useStepperState | null | The state of the useStepper. |
| setActiveStep | (value: string \\| number) => void | null | The method to update the value of the active step. |
| isStepActive | (value: string \\| number) => boolean | null | The method to check if the step is active. |
| isStepDisabled | () => boolean | null | The method to check if the step is disabled. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Stepper component. | [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Stepper component. | [object Object] |


## StepperList

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: StepperListInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: StepperListInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<StepperListPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: StepperListInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| stepper | StepperInstance | null | The Stepper component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of StepperList component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of StepperList component. | [object Object] |


## StepperStep

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: StepperStepInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: StepperStepInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<StepperStepPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: StepperStepInstance) => ReactNode) | null | The children to render. |
| value | string \\| number | null | Value of the step. |
| disabled | boolean | false | Whether the step is disabled. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| stepper | StepperInstance | null | The Stepper component instance. |
| stepperitem | StepperItemInstance | null | The StepperItem component instance. |
| activeValue | string \\| number | null | Current active value of the stepper. |
| active | boolean | null | Whether the step is active or not. |
| disabled | boolean | null | Whether the step is disabled or not. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of StepperStep component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of StepperStep component. | [object Object] |


## StepperNumber

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: StepperNumberInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: StepperNumberInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<StepperNumberPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: StepperNumberInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| stepper | StepperInstance | null | The Stepper component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of StepperNumber component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of StepperNumber component. | [object Object] |


## StepperTitle

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: StepperTitleInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: StepperTitleInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<StepperTitlePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: StepperTitleInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| stepper | StepperInstance | null | The Stepper component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of StepperTitle component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of StepperTitle component. | [object Object] |


## StepperSeparator

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: StepperSeparatorInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: StepperSeparatorInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<StepperSeparatorPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: StepperSeparatorInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| stepper | StepperInstance | null | The Stepper component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of StepperSeparator component. | [object Object] |


## StepperPanels

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: StepperPanelsInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: StepperPanelsInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<StepperPanelsPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: StepperPanelsInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| stepper | StepperInstance | null | The Stepper component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of StepperPanels component. | [object Object] |


## StepperPanel

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: StepperPanelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: StepperPanelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<StepperPanelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: StepperPanelInstance) => ReactNode) | null | The children to render. |
| value | string \\| number | null | Value of the step. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| stepper | StepperInstance | null | The Stepper component instance. |
| stepperitem | StepperItemInstance | null | The StepperItem component instance. |
| activeValue | string \\| number | null | Current active value of the stepper. |
| active | boolean | null | Whether the step is active or not. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of StepperPanel component. | [object Object] |


## StepperItem

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: StepperItemInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: StepperItemInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<StepperItemPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: StepperItemInstance) => ReactNode) | null | The children to render. |
| value | string \\| number | null | Value of the step. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| stepper | StepperInstance | null | The Stepper component instance. |
| active | boolean | null | Whether the step is active or not. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of StepperItem component. | [object Object] |


## StepperContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: StepperContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: StepperContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<StepperContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: StepperContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| stepper | StepperInstance | null | The Stepper component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of StepperContent component. | [object Object] |


## useStepper

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| defaultValue | string \\| number | null | Default value of the active step. |
| value | string \\| number | null | Value of the active step. |
| linear | boolean | false | Whether the steps are clickable or not. |
| onValueChange | (event: useStepperChangeEvent) => void | null | Callback fired when the stepper's value changes. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | string \\| number | null | Value of the active step. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useStepperState | null | The state of the useStepper. |
| setActiveStep | (value: string \\| number) => void | null | The method to update the value of the active step. |
| isStepActive | (value: string \\| number) => boolean | null | The method to check if the step is active. |
| isStepDisabled | () => boolean | null | The method to check if the step is disabled. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.usestepper.events.useStepperChangeEvent | useStepperChangeEvent | Event fired when the stepper's value changes. |  | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useStepper headless. | [object Object] |



# Stepper

The Stepper component displays a wizard-like workflow by guiding users through the multi-step progression.


## Usage

```tsx
import { Stepper } from 'primereact/stepper';
```

```tsx
<Stepper>
    <Stepper.List>
        <Stepper.Step>
            <Stepper.Header />
            <Stepper.Separator />
        </Stepper.Step>
    <Stepper.Panels>
        <Stepper.Panel />
    </Stepper.Panels>
</Stepper>
```

## Examples

### Horizontal

Stepper requires two `Stepper.List`, `Stepper.Step`, `Stepper.Panels` and `Stepper.Panel` components as children which are displayed horizontally.

```tsx
import { Stepper } from 'primereact/stepper';

export default function HorizontalDemo() {
    return (
        <div className="card flex justify-center">
            <Stepper value="1" className="basis-[50rem]">
                <Stepper.List>
                    <Stepper.Step value="1">
                        <Stepper.Header>
                            <Stepper.Number>1</Stepper.Number>
                            <Stepper.Title>Header I</Stepper.Title>
                        </Stepper.Header>
                        <Stepper.Separator />
                    </Stepper.Step>
                    <Stepper.Step value="2">
                        <Stepper.Header>
                            <Stepper.Number>2</Stepper.Number>
                            <Stepper.Title>Header II</Stepper.Title>
                        </Stepper.Header>
                        <Stepper.Separator />
                    </Stepper.Step>
                    <Stepper.Step value="3">
                        <Stepper.Header>
                            <Stepper.Number>3</Stepper.Number>
                            <Stepper.Title>Header III</Stepper.Title>
                        </Stepper.Header>
                    </Stepper.Step>
                </Stepper.List>
                <Stepper.Panels>
                    <Stepper.Panel value="1">
                        <div className="flex flex-col h-48">
                            <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content I</div>
                        </div>
                    </Stepper.Panel>
                    <Stepper.Panel value="2">
                        <div className="flex flex-col h-48">
                            <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
                        </div>
                    </Stepper.Panel>
                    <Stepper.Panel value="3">
                        <div className="flex flex-col h-48">
                            <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
                        </div>
                    </Stepper.Panel>
                </Stepper.Panels>
            </Stepper>
        </div>
    );
}

```

### Vertical

Stepper requires two `Stepper.Item`, `Stepper.Step` and `Stepper.Panel` components as children which are displayed vertically.

```tsx
import { Motion } from '@primereact/core/motion';
import { StepperItemInstance } from '@primereact/types/shared/stepper';
import { Stepper } from 'primereact/stepper';

export default function VerticalDemo() {
    return (
        <div className="card ">
            <Stepper value="1">
                <Stepper.Item value="1">
                    {(instance: StepperItemInstance) => {
                        return (
                            <>
                                <Stepper.Step>
                                    <Stepper.Header>
                                        <Stepper.Number>1</Stepper.Number>
                                        <Stepper.Title>Header I</Stepper.Title>
                                    </Stepper.Header>
                                </Stepper.Step>
                                <Motion in={instance.active} name="p-toggleable-content">
                                    <Stepper.Panel>
                                        <Stepper.Separator />
                                        <Stepper.Content>
                                            <div className="flex flex-col h-48">
                                                <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content I</div>
                                            </div>
                                        </Stepper.Content>
                                    </Stepper.Panel>
                                </Motion>
                            </>
                        );
                    }}
                </Stepper.Item>
                <Stepper.Item value="2">
                    {(instance: StepperItemInstance) => {
                        return (
                            <>
                                <Stepper.Step>
                                    <Stepper.Header>
                                        <Stepper.Number>2</Stepper.Number>
                                        <Stepper.Title>Header II</Stepper.Title>
                                    </Stepper.Header>
                                </Stepper.Step>
                                <Motion in={instance.active} name="p-toggleable-content">
                                    <Stepper.Panel>
                                        <Stepper.Separator />
                                        <Stepper.Content>
                                            <div className="flex flex-col h-48">
                                                <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
                                            </div>
                                        </Stepper.Content>
                                    </Stepper.Panel>
                                </Motion>
                            </>
                        );
                    }}
                </Stepper.Item>
                <Stepper.Item value="3">
                    {(instance: StepperItemInstance) => {
                        return (
                            <>
                                <Stepper.Step>
                                    <Stepper.Header>
                                        <Stepper.Number>3</Stepper.Number>
                                        <Stepper.Title>Header III</Stepper.Title>
                                    </Stepper.Header>
                                </Stepper.Step>
                                <Motion in={instance.active} name="p-toggleable-content">
                                    <Stepper.Panel>
                                        <Stepper.Content>
                                            <div className="flex flex-col h-48">
                                                <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
                                            </div>
                                        </Stepper.Content>
                                    </Stepper.Panel>
                                </Motion>
                            </>
                        );
                    }}
                </Stepper.Item>
            </Stepper>
        </div>
    );
}

```

### Linear

Linear mode enforces step-by-step progression through the workflow, requiring users to complete the current step before proceeding to the next one. This ensures a controlled navigation flow through the process.

```tsx
import { StepperPanelInstance } from '@primereact/types/shared/stepper';
import { Button } from 'primereact/button';
import { Stepper } from 'primereact/stepper';

export default function HorizontalDemo() {
    return (
        <div className="card flex justify-center">
            <Stepper defaultValue="1" linear className="basis-[50rem]">
                <Stepper.List>
                    <Stepper.Step value="1">
                        <Stepper.Header>
                            <Stepper.Number>1</Stepper.Number>
                            <Stepper.Title>Header I</Stepper.Title>
                        </Stepper.Header>
                        <Stepper.Separator />
                    </Stepper.Step>
                    <Stepper.Step value="2">
                        <Stepper.Header>
                            <Stepper.Number>2</Stepper.Number>
                            <Stepper.Title>Header II</Stepper.Title>
                        </Stepper.Header>
                        <Stepper.Separator />
                    </Stepper.Step>
                    <Stepper.Step value="3">
                        <Stepper.Header>
                            <Stepper.Number>3</Stepper.Number>
                            <Stepper.Title>Header III</Stepper.Title>
                        </Stepper.Header>
                    </Stepper.Step>
                </Stepper.List>
                <Stepper.Panels>
                    <Stepper.Panel asChild value="1">
                        {(instance: StepperPanelInstance) => {
                            const { stepper } = instance;

                            return (
                                <>
                                    <div className="flex flex-col h-48">
                                        <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content I</div>
                                    </div>
                                    <div className="flex pt-6 justify-end">
                                        <Button onClick={() => stepper?.setActiveStep('2')}>
                                            Next
                                            <i className="pi pi-arrow-right " />
                                        </Button>
                                    </div>
                                </>
                            );
                        }}
                    </Stepper.Panel>
                    <Stepper.Panel asChild value="2">
                        {(instance: StepperPanelInstance) => {
                            const { stepper } = instance;

                            return (
                                <>
                                    <div className="flex flex-col h-48">
                                        <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content II</div>
                                    </div>
                                    <div className="flex pt-6 justify-between">
                                        <Button severity="secondary" onClick={() => stepper?.setActiveStep('1')}>
                                            <i className="pi pi-arrow-left" />
                                            Back
                                        </Button>
                                        <Button onClick={() => stepper?.setActiveStep('3')}>
                                            Next
                                            <i className="pi pi-arrow-right" />
                                        </Button>
                                    </div>
                                </>
                            );
                        }}
                    </Stepper.Panel>
                    <Stepper.Panel asChild value="3">
                        {(instance: StepperPanelInstance) => {
                            const { stepper } = instance;

                            return (
                                <>
                                    <div className="flex flex-col h-48">
                                        <div className="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
                                    </div>
                                    <div className="pt-6 ">
                                        <Button severity="secondary" onClick={() => stepper?.setActiveStep('2')}>
                                            <i className="pi pi-arrow-left " />
                                            Back
                                        </Button>
                                    </div>
                                </>
                            );
                        }}
                    </Stepper.Panel>
                </Stepper.Panels>
            </Stepper>
        </div>
    );
}

```

### Steps Only

When you need a more compact UI, the steps-only mode displays just the step indicators without content panels. This is useful for indicating progress without showing the actual step content.

```tsx
import { Stepper } from 'primereact/stepper';

export default function StepsOnlyDemo() {
    return (
        <div className="card flex justify-center">
            <Stepper value="1" className="basis-[50rem]">
                <Stepper.List>
                    <Stepper.Step value="1">
                        <Stepper.Header>
                            <Stepper.Number>1</Stepper.Number>
                            <Stepper.Title>Design</Stepper.Title>
                        </Stepper.Header>
                        <Stepper.Separator />
                    </Stepper.Step>
                    <Stepper.Step value="2">
                        <Stepper.Header>
                            <Stepper.Number>2</Stepper.Number>
                            <Stepper.Title>Development</Stepper.Title>
                        </Stepper.Header>
                        <Stepper.Separator />
                    </Stepper.Step>
                    <Stepper.Step value="3">
                        <Stepper.Header>
                            <Stepper.Number>3</Stepper.Number>
                            <Stepper.Title>QA</Stepper.Title>
                        </Stepper.Header>
                        <Stepper.Separator />
                    </Stepper.Step>
                </Stepper.List>
            </Stepper>
        </div>
    );
}

```

### Template

The optional `as` property controls the default container element of a step, for example setting it to a button renders a button for the header instead of a div. The `asChild` option enables the headless mode for further customization by passing callbacks and properties to implement your own step.

```tsx
import { StepperPanelInstance, StepperStepInstance } from '@primereact/types/shared/stepper';
import Image from 'next/image';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Stepper } from 'primereact/stepper';
import { ToggleButton } from 'primereact/togglebutton';

export default function TemplateDemo() {
    return (
        <div className="card flex justify-center">
            <Stepper value={1} className="basis-[40rem]">
                <Stepper.List>
                    <Stepper.Step asChild value={1}>
                        {(instance: StepperStepInstance) => {
                            const { stepper, props } = instance;

                            return (
                                <div className="flex flex-row flex-auto gap-2">
                                    <button className="bg-transparent border-0 inline-flex flex-col gap-2 cursor-pointer" onClick={() => stepper?.setActiveStep(props.value)}>
                                        <span
                                            className={`rounded-full border-2 w-12 h-12 inline-flex items-center justify-center ${
                                                (instance?.props?.value as number) <= (stepper?.state.value as number) ? 'bg-primary text-primary-contrast border-primary' : 'border-surface-200 dark:border-surface-700'
                                            }`}
                                        >
                                            <i className="pi pi-user" />
                                        </span>
                                    </button>
                                    <Divider />
                                </div>
                            );
                        }}
                    </Stepper.Step>
                    <Stepper.Step asChild value={2}>
                        {(instance: StepperStepInstance) => {
                            const { stepper, props } = instance;

                            return (
                                <div className="flex flex-row flex-auto gap-2">
                                    <button className="bg-transparent border-0 inline-flex flex-col gap-2 cursor-pointer" onClick={() => stepper?.setActiveStep(props.value)}>
                                        <span
                                            className={`rounded-full border-2 w-12 h-12 inline-flex items-center justify-center ${
                                                (props?.value as number) <= (stepper?.state.value as number) ? 'bg-primary text-primary-contrast border-primary' : 'border-surface-200 dark:border-surface-700'
                                            }`}
                                        >
                                            <i className="pi pi-star" />
                                        </span>
                                    </button>
                                    <Divider />
                                </div>
                            );
                        }}
                    </Stepper.Step>
                    <Stepper.Step asChild value={3}>
                        {(instance: StepperStepInstance) => {
                            const { stepper, props } = instance;

                            return (
                                <div className="flex flex-row gap-2">
                                    <button className="bg-transparent border-0 inline-flex flex-col gap-2 cursor-pointer" onClick={() => stepper?.setActiveStep(props.value)}>
                                        <span
                                            className={`rounded-full border-2 w-12 h-12 inline-flex items-center justify-center ${
                                                (props?.value as number) <= (stepper?.state.value as number) ? 'bg-primary text-primary-contrast border-primary' : 'border-surface-200 dark:border-surface-700'
                                            }`}
                                        >
                                            <i className="pi pi-id-card" />
                                        </span>
                                    </button>
                                </div>
                            );
                        }}
                    </Stepper.Step>
                </Stepper.List>
                <Stepper.Panels>
                    <Stepper.Panel asChild value={1}>
                        {(instance: StepperPanelInstance) => {
                            const { stepper } = instance;

                            return (
                                <>
                                    <div className="flex flex-col gap-2 mx-auto" style={{ minHeight: '16rem', maxWidth: '20rem' }}>
                                        <div className="text-center mt-4 mb-4 text-xl font-semibold">Create your account</div>
                                        <div className="field">
                                            <InputText id="input" type="text" placeholder="Name" fluid />
                                        </div>
                                        <div className="field">
                                            <InputText id="email" type="email" placeholder="Email" fluid />
                                        </div>
                                        <div className="field">
                                            <InputText id="password" placeholder="Password" fluid />
                                        </div>
                                    </div>
                                    <div className="flex pt-6 justify-end">
                                        <Button onClick={() => stepper?.setActiveStep(2)}>
                                            Next
                                            <i className="pi pi-arrow-right" />
                                        </Button>
                                    </div>
                                </>
                            );
                        }}
                    </Stepper.Panel>
                    <Stepper.Panel asChild value={2}>
                        {(instance: StepperPanelInstance) => {
                            const { stepper } = instance;

                            return (
                                <>
                                    <div className="flex flex-col gap-2 mx-auto" style={{ minHeight: '16rem', maxWidth: '24rem' }}>
                                        <div className="text-center mt-4 mb-4 text-xl font-semibold">Choose your interests</div>
                                        <div className="flex flex-wrap justify-center gap-4">
                                            <ToggleButton>
                                                <ToggleButton.Indicator>Nature</ToggleButton.Indicator>
                                            </ToggleButton>
                                            <ToggleButton>
                                                <ToggleButton.Indicator>Art</ToggleButton.Indicator>
                                            </ToggleButton>
                                            <ToggleButton>
                                                <ToggleButton.Indicator>Music</ToggleButton.Indicator>
                                            </ToggleButton>
                                            <ToggleButton>
                                                <ToggleButton.Indicator>Design</ToggleButton.Indicator>
                                            </ToggleButton>
                                            <ToggleButton>
                                                <ToggleButton.Indicator>Photography</ToggleButton.Indicator>
                                            </ToggleButton>
                                            <ToggleButton>
                                                <ToggleButton.Indicator>Movies</ToggleButton.Indicator>
                                            </ToggleButton>
                                            <ToggleButton>
                                                <ToggleButton.Indicator>Sports</ToggleButton.Indicator>
                                            </ToggleButton>
                                            <ToggleButton>
                                                <ToggleButton.Indicator>Gaming</ToggleButton.Indicator>
                                            </ToggleButton>
                                            <ToggleButton>
                                                <ToggleButton.Indicator>Traveling</ToggleButton.Indicator>
                                            </ToggleButton>
                                            <ToggleButton>
                                                <ToggleButton.Indicator>Dancing</ToggleButton.Indicator>
                                            </ToggleButton>
                                        </div>
                                    </div>
                                    <div className="flex pt-6 justify-between">
                                        <Button severity="secondary" onClick={() => stepper?.setActiveStep(1)}>
                                            <i className="pi pi-arrow-left" />
                                            Back
                                        </Button>
                                        <Button onClick={() => stepper?.setActiveStep(3)}>
                                            Next
                                            <i className="pi pi-arrow-right" />
                                        </Button>
                                    </div>
                                </>
                            );
                        }}
                    </Stepper.Panel>
                    <Stepper.Panel asChild value={3}>
                        {(instance: StepperPanelInstance) => {
                            const { stepper } = instance;

                            return (
                                <>
                                    <div className="flex flex-col gap-2 mx-auto" style={{ minHeight: '16rem', maxWidth: '24rem' }}>
                                        <div className="text-center mt-4 mb-4 text-xl font-semibold">Account created successfully</div>
                                        <div className="flex justify-center">
                                            <Image alt="logo" width={240} height={160} src="https://primefaces.org/cdn/primevue/images/stepper/content.svg" />
                                        </div>
                                    </div>
                                    <div className="flex pt-6 justify-start">
                                        <Button severity="secondary" onClick={() => stepper?.setActiveStep(2)}>
                                            <i className="pi pi-arrow-left" />
                                            Back
                                        </Button>
                                    </div>
                                </>
                            );
                        }}
                    </Stepper.Panel>
                </Stepper.Panels>
            </Stepper>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Stepper container is defined with the `tablist` role, as any attribute is passed to the container element `aria-labelledby` can be optionally used to specify an element to describe the Stepper. Each stepper header has a `tab` role and `aria-controls` to refer to the corresponding stepper content element. The content element of each stepper has `tabpanel` role, an id to match the `aria-controls` of the header and `aria-labelledby` reference to the header as the accessible name.

### Tab Header Keyboard Support

| Key     | Function                              |
| ------- | ------------------------------------- |
| `tab`   | Moves focus through the header.       |
| `enter` | Activates the focused stepper header. |
| `space` | Activates the focused stepper header. |


# Stepper Pass Through

Pass Through documentation for Stepper component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="stepper-pt" components={['Stepper']} />

## Stepper PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | StepperPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| list | StepperPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the list's DOM element. |
| step | StepperPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the step's DOM element. |
| header | StepperPassThroughType<HTMLAttributes<HTMLButtonElement>> | Used to pass attributes to the header's DOM element. |
| number | StepperPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the number's DOM element. |
| title | StepperPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the title's DOM element. |
| separator | StepperPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the separator's DOM element. |
| panels | StepperPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the panels's DOM element. |
| panel | StepperPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the panel's DOM element. |
| item | StepperPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the item's DOM element. |
| content | StepperPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the content's DOM element. |


## StepperList PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | StepperListPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## StepperStep PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | StepperStepPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## StepperNumber PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | StepperNumberPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |


## StepperTitle PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | StepperTitlePassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |


## StepperSeparator PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | StepperSeparatorPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |


## StepperPanels PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | StepperPanelsPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## StepperPanel PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | StepperPanelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## StepperItem PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | StepperItemPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## StepperContent PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | StepperContentPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Stepper Theming

Theming documentation for Stepper component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-stepper | Class name of the root element |
| p-stepper-separator | Class name of the separator element |
| p-steppanels | Class name of the panels element |
| p-steppanel | Class name of the panel element |
| p-steppanel-content | Class name of the content element |
| p-steplist | Class name of the list element |
| p-stepitem | Class name of the item element |
| p-step-header | Class name of the header element |
| p-step-number | Class name of the number element |
| p-step-title | Class name of the title element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| stepper.transition.duration | --p-stepper-transition-duration | Transition duration of root |
| stepper.separator.background | --p-stepper-separator-background | Background of separator |
| stepper.separator.active.background | --p-stepper-separator-active-background | Active background of separator |
| stepper.separator.margin | --p-stepper-separator-margin | Margin of separator |
| stepper.separator.size | --p-stepper-separator-size | Size of separator |
| stepper.step.padding | --p-stepper-step-padding | Padding of step |
| stepper.step.gap | --p-stepper-step-gap | Gap of step |
| stepper.step.header.padding | --p-stepper-step-header-padding | Padding of step header |
| stepper.step.header.border.radius | --p-stepper-step-header-border-radius | Border radius of step header |
| stepper.step.header.focus.ring.width | --p-stepper-step-header-focus-ring-width | Focus ring width of step header |
| stepper.step.header.focus.ring.style | --p-stepper-step-header-focus-ring-style | Focus ring style of step header |
| stepper.step.header.focus.ring.color | --p-stepper-step-header-focus-ring-color | Focus ring color of step header |
| stepper.step.header.focus.ring.offset | --p-stepper-step-header-focus-ring-offset | Focus ring offset of step header |
| stepper.step.header.focus.ring.shadow | --p-stepper-step-header-focus-ring-shadow | Focus ring shadow of step header |
| stepper.step.header.gap | --p-stepper-step-header-gap | Gap of step header |
| stepper.step.title.color | --p-stepper-step-title-color | Color of step title |
| stepper.step.title.active.color | --p-stepper-step-title-active-color | Active color of step title |
| stepper.step.title.font.weight | --p-stepper-step-title-font-weight | Font weight of step title |
| stepper.step.number.background | --p-stepper-step-number-background | Background of step number |
| stepper.step.number.active.background | --p-stepper-step-number-active-background | Active background of step number |
| stepper.step.number.border.color | --p-stepper-step-number-border-color | Border color of step number |
| stepper.step.number.active.border.color | --p-stepper-step-number-active-border-color | Active border color of step number |
| stepper.step.number.color | --p-stepper-step-number-color | Color of step number |
| stepper.step.number.active.color | --p-stepper-step-number-active-color | Active color of step number |
| stepper.step.number.size | --p-stepper-step-number-size | Size of step number |
| stepper.step.number.font.size | --p-stepper-step-number-font-size | Font size of step number |
| stepper.step.number.font.weight | --p-stepper-step-number-font-weight | Font weight of step number |
| stepper.step.number.border.radius | --p-stepper-step-number-border-radius | Border radius of step number |
| stepper.step.number.shadow | --p-stepper-step-number-shadow | Shadow of step number |
| stepper.steppanels.padding | --p-stepper-steppanels-padding | Padding of steppanels |
| stepper.steppanel.background | --p-stepper-steppanel-background | Background of steppanel |
| stepper.steppanel.color | --p-stepper-steppanel-color | Color of steppanel |
| stepper.steppanel.padding | --p-stepper-steppanel-padding | Padding of steppanel |
| stepper.steppanel.indent | --p-stepper-steppanel-indent | Indent of steppanel |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Switch API

API documentation for Switch component


## Switch

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: SwitchInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: SwitchInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<SwitchPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: SwitchInstance) => ReactNode) | null | The children to render. |
| value | unknown | null | Value of the switch. |
| disabled | boolean | false | When present, it specifies that the element should be disabled. |
| required | boolean | false | When present, it specifies that the element is required. |
| invalid | boolean | false | When present, it specifies that the component should have invalid state style. |
| inputId | string | null | Identifier of the underlying input element. |
| inputStyle | CSSProperties | null | Inline style of the input field. |
| inputClassName | string | null | Style class of the input field. |
| ariaLabel | string | null | Establishes a string value that labels the component. |
| ariaLabelledby | string | null | Establishes relationships between the component and label(s) where its value should be one or more element IDs. |
| onFocus | (event: FocusEvent<HTMLInputElement>) => void | null | Callback function that is called when the switch is focused. |
| onBlur | (event: FocusEvent<HTMLInputElement>) => void | null | Callback function that is called when the switch loses focus. |
| onCheckedChange | (event: SwitchChangeEvent) => void | null | Callback fired when the switch's checked state changes. |
| checked | boolean | null | When present, it specifies the input's checked state. |
| defaultChecked | boolean | null | The default value for the input when not controlled by  `checked`  and  `onCheckedChange` . |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| checked | boolean | null | The checked state of the useSwitch. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useSwitchState | null | The state of the useSwitch. |
| onChange | (event: useSwitchChangeEvent) => void | null | Callback fired when the useSwitch's checked state changes. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.switch.events.SwitchChangeEvent | SwitchChangeEvent | Event fired when the switch's checked state changes. |  | [object Object],[object Object],[object Object] |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Switch component. | [object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Switch component. | [object Object] |


## SwitchControl

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: SwitchControlInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: SwitchControlInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<SwitchControlPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: SwitchControlInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| switch | SwitchInstance | null | The Switch component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of SwitchControl component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of SwitchControl component. | [object Object] |


## SwitchThumb

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: SwitchThumbInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: SwitchThumbInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<SwitchThumbPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: SwitchThumbInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| switch | SwitchInstance | null | The Switch component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of SwitchThumb component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of SwitchThumb component. | [object Object] |


## useSwitch

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| checked | boolean | null | When present, it specifies the input's checked state. |
| defaultChecked | boolean | null | The default value for the input when not controlled by  `checked`  and  `onCheckedChange` . |
| onCheckedChange | (event: useSwitchChangeEvent) => void | null | Callback fired when the switch's checked state changes. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| checked | boolean | null | The checked state of the useSwitch. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useSwitchState | null | The state of the useSwitch. |
| onChange | (event: useSwitchChangeEvent) => void | null | Callback fired when the useSwitch's checked state changes. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.useswitch.events.useSwitchChangeEvent | useSwitchChangeEvent | Event fired when the switch's checked state changes. |  | [object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useSwitch headless. | [object Object] |



# Switch

Switch is used to select a boolean value.


## Usage

```tsx
import { Switch } from 'primereact/switch';
```

```tsx
<Switch>
    <Switch.Control>
        <Switch.Thumb />
    </Switch.Control>
</Switch>
```

## Examples

### Basic

Switch demonstrates the standard implementation with checkbox functionality. It provides a simple on/off toggle that responds to user interaction with animated visual feedback.

```tsx
import { Switch } from 'primereact/switch';

export default function BasicDemo() {
    return (
        <>
            <div className="card flex justify-center items-center gap-2">
                <label htmlFor="switch">Off</label>
                <Switch inputId="switch">
                    <Switch.Control>
                        <Switch.Thumb />
                    </Switch.Control>
                </Switch>
                <label htmlFor="switch">On</label>
            </div>
        </>
    );
}

```

### Controlled

A controlled Switch requires managing the checked state with a state variable and handling the change event manually. This allows for complete control over the Switch's behavior.

```tsx
import { SwitchChangeEvent } from '@primereact/types/shared/switch';
import { Switch } from 'primereact/switch';
import React from 'react';

export default function ControlledDemo() {
    const [checked, setChecked] = React.useState(true);

    return (
        <div className="card flex justify-center items-center gap-2">
            <Switch inputId="mode" checked={checked} onCheckedChange={(event: SwitchChangeEvent) => setChecked(event.checked)}>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
            </Switch>
            <label htmlFor="mode">Airplane Mode</label>
        </div>
    );
}

```

### Uncontrolled

For an uncontrolled Switch component, `defaultChecked` is used to set the initial state, and the component manages its own state internally.

```tsx
import { Switch } from 'primereact/switch';

export default function UncontrolledDemo() {
    return (
        <div className="card flex justify-center">
            <Switch defaultChecked>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
            </Switch>
        </div>
    );
}

```

### Template

`Switch.Thumb` also allows displaying custom content inside itself.

```tsx
import { CheckIcon, TimesIcon } from '@primereact/icons';
import type { SwitchThumbInstance } from '@primereact/types/shared/switch';
import { Switch } from 'primereact/switch';

export default function TemplateDemo() {
    return (
        <div className="card flex justify-center">
            <Switch>
                <Switch.Control>
                    <Switch.Thumb>
                        {(instance: SwitchThumbInstance) => {
                            const { switch: switchContext } = instance;

                            return <>{switchContext?.state.checked ? <CheckIcon /> : <TimesIcon />}</>;
                        }}
                    </Switch.Thumb>
                </Switch.Control>
            </Switch>
        </div>
    );
}

```

### Customization

`Switch` component supports customization through CSS classes. The appearance, including colors and other visual properties, can be modified by applying custom classes to the component.

```tsx
import { SwitchChangeEvent } from '@primereact/types/shared/switch';
import { Switch } from 'primereact/switch';
import * as React from 'react';

export default function CustomizationDemo() {
    const [checked, setChecked] = React.useState(true);

    return (
        <div className="card flex justify-center items-center gap-2">
            <label htmlFor="custom" className="flex items-center gap-2 bg-surface-50 hover:bg-surface-100 dark:bg-slate-700 hover:dark:bg-slate-800 p-4 rounded-md">
                <div className="flex flex-col gap-1">
                    <p className="m-0 text-medium">Try Beta Features</p>
                    <p className="m-0 text-sm text-slate-400">Experience upcoming features before they&apos;re officially released.</p>
                </div>

                <Switch inputId="custom" checked={checked} onCheckedChange={(event: SwitchChangeEvent) => setChecked(event.checked)}>
                    <Switch.Control className={`${checked ? 'bg-blue-300' : 'bg-surface-300 dark:bg-surface-500'} rounded-md`}>
                        <Switch.Thumb className="bg-blue-900" />
                    </Switch.Control>
                </Switch>
            </label>
        </div>
    );
}

```

### Invalid

Invalid state is displayed using the `invalid` prop to indicate a failed validation. You can use this style when integrating with form validation libraries.

```tsx
import { SwitchChangeEvent } from '@primereact/types/shared/switch';
import { Switch } from 'primereact/switch';
import * as React from 'react';

export default function InvalidDemo() {
    const [checked, setChecked] = React.useState(false);

    return (
        <div className="card flex justify-center ">
            <Switch checked={checked} onCheckedChange={(event: SwitchChangeEvent) => setChecked(event.checked)} invalid={!checked}>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
            </Switch>
        </div>
    );
}

```

### Disabled

When `disabled` is present, the element cannot be edited and focused.

```tsx
import { Switch } from 'primereact/switch';

export default function DisabledDemo() {
    return (
        <div className="card flex justify-center">
            <Switch disabled>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
            </Switch>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Switch component uses a hidden native checkbox element with switch role internally that is only visible to screen readers. Value to describe the component can either be provided via `label` tag combined with `id` prop or using `aria-labelledby`, `aria-label` props.

```tsx
<label htmlFor="switch1">Remember Me</label>
<Switch inputId="switch1" />

<span id="switch2">Remember Me</span>
<Switch aria-labelledby="switch2" />

<Switch aria-label="Remember Me" />
```

### Keyboard Support

| Key     | Function                   |
| ------- | -------------------------- |
| `tab`   | Moves focus to the switch. |
| `space` | Toggles the checked state. |


# Switch Pass Through

Pass Through documentation for Switch component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="switch-pt" components={['Switch']} />

## Switch PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | SwitchPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |
| input | SwitchPassThroughType<HTMLAttributes<HTMLElement>> | Used to pass attributes to the input's DOM element. |
| control | SwitchPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the control's DOM element. |
| thumb | SwitchPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the thumb's DOM element. |


## SwitchControl PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | SwitchControlPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## SwitchThumb PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | SwitchThumbPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Switch Theming

Theming documentation for Switch component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-toggleswitch | Class name of the root element |
| p-toggleswitch-input | Class name of the input element |
| p-toggleswitch-slider | Class name of the control element |
| p-toggleswitch-handle | Class name of the handle element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| toggleswitch.width | --p-toggleswitch-width | Width of root |
| toggleswitch.height | --p-toggleswitch-height | Height of root |
| toggleswitch.border.radius | --p-toggleswitch-border-radius | Border radius of root |
| toggleswitch.gap | --p-toggleswitch-gap | Gap of root |
| toggleswitch.shadow | --p-toggleswitch-shadow | Shadow of root |
| toggleswitch.focus.ring.width | --p-toggleswitch-focus-ring-width | Focus ring width of root |
| toggleswitch.focus.ring.style | --p-toggleswitch-focus-ring-style | Focus ring style of root |
| toggleswitch.focus.ring.color | --p-toggleswitch-focus-ring-color | Focus ring color of root |
| toggleswitch.focus.ring.offset | --p-toggleswitch-focus-ring-offset | Focus ring offset of root |
| toggleswitch.focus.ring.shadow | --p-toggleswitch-focus-ring-shadow | Focus ring shadow of root |
| toggleswitch.border.width | --p-toggleswitch-border-width | Border width of root |
| toggleswitch.border.color | --p-toggleswitch-border-color | Border color of root |
| toggleswitch.hover.border.color | --p-toggleswitch-hover-border-color | Hover border color of root |
| toggleswitch.checked.border.color | --p-toggleswitch-checked-border-color | Checked border color of root |
| toggleswitch.checked.hover.border.color | --p-toggleswitch-checked-hover-border-color | Checked hover border color of root |
| toggleswitch.invalid.border.color | --p-toggleswitch-invalid-border-color | Invalid border color of root |
| toggleswitch.transition.duration | --p-toggleswitch-transition-duration | Transition duration of root |
| toggleswitch.slide.duration | --p-toggleswitch-slide-duration | Slide duration of root |
| toggleswitch.background | --p-toggleswitch-background | Background of root |
| toggleswitch.disabled.background | --p-toggleswitch-disabled-background | Disabled background of root |
| toggleswitch.hover.background | --p-toggleswitch-hover-background | Hover background of root |
| toggleswitch.checked.background | --p-toggleswitch-checked-background | Checked background of root |
| toggleswitch.checked.hover.background | --p-toggleswitch-checked-hover-background | Checked hover background of root |
| toggleswitch.handle.border.radius | --p-toggleswitch-handle-border-radius | Border radius of handle |
| toggleswitch.handle.size | --p-toggleswitch-handle-size | Size of handle |
| toggleswitch.handle.background | --p-toggleswitch-handle-background | Background of handle |
| toggleswitch.handle.disabled.background | --p-toggleswitch-handle-disabled-background | Disabled background of handle |
| toggleswitch.handle.hover.background | --p-toggleswitch-handle-hover-background | Hover background of handle |
| toggleswitch.handle.checked.background | --p-toggleswitch-handle-checked-background | Checked background of handle |
| toggleswitch.handle.checked.hover.background | --p-toggleswitch-handle-checked-hover-background | Checked hover background of handle |
| toggleswitch.handle.color | --p-toggleswitch-handle-color | Color of handle |
| toggleswitch.handle.hover.color | --p-toggleswitch-handle-hover-color | Hover color of handle |
| toggleswitch.handle.checked.color | --p-toggleswitch-handle-checked-color | Checked color of handle |
| toggleswitch.handle.checked.hover.color | --p-toggleswitch-handle-checked-hover-color | Checked hover color of handle |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Tabs

Tabs is a component that displays a list of tabs and allows the user to select one.


## Usage

```tsx
import { Tabs } from 'primereact/tabs';
```

```tsx
<Tabs>
    <Tabs.List>
        <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panels>
        <Tabs.Panel value="tab1">Tab 1 Content</Tabs.Panel>
    </Tabs.Panels>
</Tabs>
```

## Examples

### Basic

```tsx
import { Tabs } from 'primereact/tabs';

export default function BasicDemo() {
    return (
        <div className="card">
            <Tabs value="tab1">
                <Tabs.List>
                    <Tabs.Tab value="tab1">Account Info</Tabs.Tab>
                    <Tabs.Tab value="tab2">Payment</Tabs.Tab>
                    <Tabs.Tab value="tab3">Preferences</Tabs.Tab>
                    <Tabs.Indicator />
                </Tabs.List>
                <Tabs.Panels>
                    <Tabs.Panel value="tab1">
                        <p>Update your personal information such as name, email address, and profile picture.</p>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <p>Manage your subscription plan, view invoices, and update your payment method.</p>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab3">
                        <p>Customize how the application looks and behaves to match your personal preferences.</p>
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </div>
    );
}

```

### Dynamic

```tsx
import { Tabs } from 'primereact/tabs';

const tabs = [
    { id: 'tab1', title: 'Account Info', content: 'Update your personal information such as name, email address, and profile picture.' },
    { id: 'tab2', title: 'Payment', content: 'Manage your subscription plan, view invoices, and update your payment method.' },
    { id: 'tab3', title: 'Preferences', content: 'Customize how the application looks and behaves to match your personal preferences.' }
];

export default function DynamicDemo() {
    return (
        <div className="card">
            <Tabs value="tab1">
                <Tabs.List>
                    {tabs.map((tab) => (
                        <Tabs.Tab key={tab.id} value={tab.id}>
                            {tab.title}
                        </Tabs.Tab>
                    ))}
                    <Tabs.Indicator />
                </Tabs.List>
                <Tabs.Panels>
                    {tabs.map((tab) => (
                        <Tabs.Panel key={tab.id} value={tab.id}>
                            <p>{tab.content}</p>
                        </Tabs.Panel>
                    ))}
                </Tabs.Panels>
            </Tabs>
        </div>
    );
}

```

### Controlled

```tsx
import { Button } from 'primereact/button';
import { Tabs } from 'primereact/tabs';
import * as React from 'react';

const tabs = [
    { id: 'tab1', title: 'Account Info', content: 'Update your personal information such as name, email address, and profile picture.' },
    { id: 'tab2', title: 'Payment', content: 'Manage your subscription plan, view invoices, and update your payment method.' },
    { id: 'tab3', title: 'Preferences', content: 'Customize how the application looks and behaves to match your personal preferences.' }
];

export default function ControlledDemo() {
    const [activeTab, setActiveTab] = React.useState('tab1');

    return (
        <div className="card space-y-4">
            <Button onClick={() => setActiveTab('tab2')}>Go to Payment</Button>
            <Tabs value={activeTab} onValueChange={(e: any) => setActiveTab(e.value)}>
                <Tabs.List>
                    {tabs.map((tab) => (
                        <Tabs.Tab key={tab.id} value={tab.id}>
                            {tab.title}
                        </Tabs.Tab>
                    ))}
                    <Tabs.Indicator />
                </Tabs.List>
                <Tabs.Panels>
                    {tabs.map((tab) => (
                        <Tabs.Panel key={tab.id} value={tab.id}>
                            <p>{tab.content}</p>
                        </Tabs.Panel>
                    ))}
                </Tabs.Panels>
            </Tabs>
        </div>
    );
}

```

### Scrollable

```tsx
import { Tabs } from 'primereact/tabs';

const scrollableTabs = Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content`, value: `${i}` }));

export default function ScrollableDemo() {
    return (
        <div className="card">
            <Tabs value="0" scrollable>
                <Tabs.List>
                    {scrollableTabs.map((tab) => (
                        <Tabs.Tab key={tab.value} value={tab.value}>
                            {tab.title}
                        </Tabs.Tab>
                    ))}
                    <Tabs.Indicator />
                </Tabs.List>
                <Tabs.Panels>
                    {scrollableTabs.map((tab) => (
                        <Tabs.Panel key={tab.value} value={tab.value}>
                            {tab.content}
                        </Tabs.Panel>
                    ))}
                </Tabs.Panels>
            </Tabs>
        </div>
    );
}

```

### Disabled

```tsx
import { Tabs } from 'primereact/tabs';

export default function DisabledDemo() {
    return (
        <div className="card">
            <Tabs value="tab1">
                <Tabs.List>
                    <Tabs.Tab value="tab1">Account Info</Tabs.Tab>
                    <Tabs.Tab value="tab2" disabled>
                        Payment
                    </Tabs.Tab>
                    <Tabs.Tab value="tab3">Preferences</Tabs.Tab>
                    <Tabs.Indicator />
                </Tabs.List>
                <Tabs.Panels>
                    <Tabs.Panel value="tab1">
                        <p>Update your personal information such as name, email address, and profile picture.</p>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <p>Manage your subscription plan, view invoices, and update your payment method.</p>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab3">
                        <p>Customize how the application looks and behaves to match your personal preferences.</p>
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </div>
    );
}

```

### Custom Indicator

```tsx
import { Tabs } from 'primereact/tabs';

const tabs = [
    { id: 'tab1', title: 'Account Info', content: 'Update your personal information such as name, email address, and profile picture.' },
    { id: 'tab2', title: 'Payment', content: 'Manage your subscription plan, view invoices, and update your payment method.' },
    { id: 'tab3', title: 'Preferences', content: 'Customize how the application looks and behaves to match your personal preferences.' }
];

export default function CustomIndicatorDemo() {
    return (
        <div className="card">
            <Tabs value="tab1">
                <Tabs.List>
                    {tabs.map((tab) => (
                        <Tabs.Tab key={tab.id} value={tab.id} className="border-none z-10">
                            {tab.title}
                        </Tabs.Tab>
                    ))}
                    <Tabs.Indicator className="w-[var(--width)] h-[calc(var(--height)-12px)] bottom-none top-1/2 -translate-y-1/2 bg-surface-100 dark:bg-surface-800 rounded-md" />
                </Tabs.List>
                <Tabs.Panels>
                    {tabs.map((tab) => (
                        <Tabs.Panel key={tab.id} value={tab.id}>
                            <p>{tab.content}</p>
                        </Tabs.Panel>
                    ))}
                </Tabs.Panels>
            </Tabs>
        </div>
    );
}

```

### Template

```tsx
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Label } from 'primereact/label';
import { Switch } from 'primereact/switch';
import { Tabs } from 'primereact/tabs';
import { useState } from 'react';

const tabs = [
    { id: 'tab1', title: 'Account Info', icon: 'pi pi-user', content: 'Update your personal information such as name, email address, and profile picture.' },
    { id: 'tab2', title: 'Payment', icon: 'pi pi-credit-card', badge: 'New', content: 'Manage your subscription plan, view invoices, and update your payment method.' },
    { id: 'tab3', title: 'Preferences', icon: 'pi pi-cog', content: 'Customize how the application looks and behaves to match your personal preferences.' }
];

export default function TemplateDemo() {
    const [preferences, setPreferences] = useState({
        darkMode: false,
        emailNotifications: false,
        desktopNotifications: false
    });

    return (
        <div className="card">
            <Tabs value="tab1" className="max-w-md mx-auto">
                <Tabs.List>
                    {tabs.map((tab) => (
                        <Tabs.Tab key={tab.id} value={tab.id} className="flex items-center gap-2">
                            <i className={tab.icon}></i>
                            {tab.title}
                            {tab.badge && <Badge size="small">{tab.badge}</Badge>}
                        </Tabs.Tab>
                    ))}
                    <Tabs.Indicator />
                </Tabs.List>
                <Tabs.Panels>
                    <Tabs.Panel value="tab1">
                        <div>
                            <p className="mt-2 mb-8 text-surface-500">Update your personal information such as name, email address, and profile picture.</p>
                            <form>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor="username">Username</Label>
                                        <InputText id="username" placeholder="john.doe" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor="email">Email</Label>
                                        <InputText id="email" placeholder="john.doe@example.com" />
                                    </div>
                                </div>
                                <Button className="mt-8 w-fit">Save Changes</Button>
                            </form>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <div>
                            <p className="mt-2 mb-8 text-surface-500">Manage your subscription plan, view invoices, and update your payment method.</p>
                            <form>
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor="cardName">Cardholder Name</Label>
                                        <InputText id="cardName" placeholder="John Doe" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor="cardNumber">Card Number</Label>
                                        <InputText id="cardNumber" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor="expiryDate">Expiry Date</Label>
                                        <InputText id="expiryDate" placeholder="MM/YY" />
                                    </div>
                                </div>
                                <Button className="mt-8 w-fit">Update Payment</Button>
                            </form>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab3">
                        <div>
                            <p className="mt-2 mb-8 text-surface-500">Customize how the application looks and behaves to match your personal preferences.</p>
                            <form>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="darkMode">Dark Mode</Label>
                                        <Switch inputId="darkMode">
                                            <Switch.Control>
                                                <Switch.Thumb />
                                            </Switch.Control>
                                        </Switch>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                                        <Switch inputId="emailNotifications" defaultChecked>
                                            <Switch.Control>
                                                <Switch.Thumb />
                                            </Switch.Control>
                                        </Switch>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="desktopNotifications">Desktop Notifications</Label>
                                        <Switch inputId="desktopNotifications">
                                            <Switch.Control>
                                                <Switch.Thumb />
                                            </Switch.Control>
                                        </Switch>
                                    </div>
                                </div>
                                <Button className="w-fit mt-8 ml-auto mr-0">Save Preferences</Button>
                            </form>
                        </div>
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        </div>
    );
}

```

## Accessibility

### Screen Reader

The tabs container in TabList is defined with the tablist role, as any attribute is passed to the container element aria-labelledby can be optionally used to specify an element to describe the Tabs. Each Tab has a tab role along with aria-selected state attribute and aria-controls to refer to the corresponding TabPanel. TabPanel has tabpanel role, an id to match the aria-controls of Tab and aria-labelledby reference to Tab as the accessible name.

### Tab Keyboard Support

| Key           | Function                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `tab`         | Moves focus through the header.                                                                      |
| `enter`       | Activates the focused tab header.                                                                    |
| `space`       | Activates the focused tab header.                                                                    |
| `right arrow` | Moves focus to the next header. If focus is on the last header, moves focus to the first header.     |
| `left arrow`  | Moves focus to the previous header. If focus is on the first header, moves focus to the last header. |
| `home`        | Moves focus to the last header.                                                                      |
| `end`         | Moves focus to the first header.                                                                     |
| `pageUp`      | Moves scroll position to first header.                                                               |
| `pageDown`    | Moves scroll position to last header.                                                                |


# Tag API

API documentation for Tag component


## Tag

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: TagInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: TagInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<TagPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: TagInstance) => ReactNode) | null | The children to render. |
| severity | "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" | null | Severity type of the tag. |
| rounded | boolean | false | Whether the corners of the tag are rounded. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Tag component. | [object Object],[object Object],[object Object] |


### Types

# | Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Tag component. | [object Object] |


### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: TagInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: TagInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<TagPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: TagInstance) => ReactNode) | null | The children to render. |
| severity | "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" | null | Severity type of the tag. |
| rounded | boolean | false | Whether the corners of the tag are rounded. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Tag component. | [object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Tag component. | [object Object] |


## TagIcon

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: TagIconInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: TagIconInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<TagIconPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: TagIconInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| tag | TagInstance | null | The Tag component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of TagIcon component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of TagIcon component. | [object Object] |


## TagLabel

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: TagLabelInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: TagLabelInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<TagLabelPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: TagLabelInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| tag | TagInstance | null | The Tag component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of TagLabel component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of TagLabel component. | [object Object] |


## useTag

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useTag headless. | [object Object] |



# Tag

Tag component is used to categorize content.


## Usage

```tsx
import { Tag } from 'primereact/tag';
```

```tsx
<Tag></Tag>
```

## Examples

### Basic

`Tag.Label` is used to define the label of the tag.

```tsx
import { Tag } from 'primereact/tag';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <Tag>
                <Tag.Label>New</Tag.Label>
            </Tag>
        </div>
    );
}

```

### Icon

Use `Tag.Icon` to display an icon next to the label. Place the icon left or right of the label.

```tsx
import { Tag } from 'primereact/tag';

export default function IconDemo() {
    return (
        <div className="card flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2">
                <Tag>
                    <Tag.Icon>
                        <i className="pi pi-user"></i>
                    </Tag.Icon>
                    <Tag.Label>Primary</Tag.Label>
                </Tag>
                <Tag severity="secondary">
                    <Tag.Icon>
                        <i className="pi pi-user" />
                    </Tag.Icon>
                    <Tag.Label>Secondary</Tag.Label>
                </Tag>
                <Tag severity="success">
                    <Tag.Icon>
                        <i className="pi pi-check" />
                    </Tag.Icon>
                    <Tag.Label>Success</Tag.Label>
                </Tag>
                <Tag severity="info">
                    <Tag.Icon>
                        <i className="pi pi-search" />
                    </Tag.Icon>
                    <Tag.Label>Info</Tag.Label>
                </Tag>
                <Tag severity="warn">
                    <Tag.Icon>
                        <i className="pi pi-exclamation-triangle" />
                    </Tag.Icon>
                    <Tag.Label>Warn</Tag.Label>
                </Tag>
                <Tag severity="danger">
                    <Tag.Icon>
                        <i className="pi pi-times" />
                    </Tag.Icon>
                    <Tag.Label>Danger</Tag.Label>
                </Tag>
                <Tag severity="contrast">
                    <Tag.Icon>
                        <i className="pi pi-cog" />
                    </Tag.Icon>
                    <Tag.Label>Contrast</Tag.Label>
                </Tag>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                <Tag>
                    <Tag.Label>Primary</Tag.Label>
                    <Tag.Icon>
                        <i className="pi pi-user"></i>
                    </Tag.Icon>
                </Tag>
                <Tag severity="secondary">
                    <Tag.Label>Secondary</Tag.Label>
                    <Tag.Icon>
                        <i className="pi pi-user" />
                    </Tag.Icon>
                </Tag>
                <Tag severity="success">
                    <Tag.Label>Success</Tag.Label>
                    <Tag.Icon>
                        <i className="pi pi-check" />
                    </Tag.Icon>
                </Tag>
                <Tag severity="info">
                    <Tag.Label>Info</Tag.Label>
                    <Tag.Icon>
                        <i className="pi pi-search" />
                    </Tag.Icon>
                </Tag>
                <Tag severity="warn">
                    <Tag.Label>Warn</Tag.Label>
                    <Tag.Icon>
                        <i className="pi pi-exclamation-triangle" />
                    </Tag.Icon>
                </Tag>
                <Tag severity="danger">
                    <Tag.Label>Danger</Tag.Label>
                    <Tag.Icon>
                        <i className="pi pi-times" />
                    </Tag.Icon>
                </Tag>
                <Tag severity="contrast">
                    <Tag.Label>Contrast</Tag.Label>
                    <Tag.Icon>
                        <i className="pi pi-cog" />
                    </Tag.Icon>
                </Tag>
            </div>
        </div>
    );
}

```

### Severity

Use `severity` property to define the severity of the tag.

```tsx
import { Tag } from 'primereact/tag';

export default function SeverityDemo() {
    return (
        <div className="card flex flex-wrap justify-center gap-2">
            <Tag>
                <Tag.Label>Primary</Tag.Label>
            </Tag>
            <Tag severity="secondary">
                <Tag.Label>Secondary</Tag.Label>
            </Tag>
            <Tag severity="success">
                <Tag.Label>Success</Tag.Label>
            </Tag>
            <Tag severity="info">
                <Tag.Label>Info</Tag.Label>
            </Tag>
            <Tag severity="warn">
                <Tag.Label>Warn</Tag.Label>
            </Tag>
            <Tag severity="danger">
                <Tag.Label>Danger</Tag.Label>
            </Tag>
            <Tag severity="contrast">
                <Tag.Label>Contrast</Tag.Label>
            </Tag>
        </div>
    );
}

```

### Pill

Use `rounded` property to display a tag as a pill.

```tsx
import { Tag } from 'primereact/tag';

export default function BasicDemo() {
    return (
        <div className="card flex flex-wrap justify-center gap-2">
            <Tag rounded>
                <Tag.Label>Primary</Tag.Label>
            </Tag>
            <Tag severity="secondary" rounded>
                <Tag.Label>Secondary</Tag.Label>
            </Tag>
            <Tag severity="success" rounded>
                <Tag.Label>Success</Tag.Label>
            </Tag>
            <Tag severity="info" rounded>
                <Tag.Label>Info</Tag.Label>
            </Tag>
            <Tag severity="warn" rounded>
                <Tag.Label>Warn</Tag.Label>
            </Tag>
            <Tag severity="danger" rounded>
                <Tag.Label>Danger</Tag.Label>
            </Tag>
            <Tag severity="contrast" rounded>
                <Tag.Label>Contrast</Tag.Label>
            </Tag>
        </div>
    );
}

```

### Template

Children of the component are passed as the content for templating.

```tsx
import { Tag } from 'primereact/tag';

export default function TemplateDemo() {
    return (
        <div className="card flex justify-center">
            <Tag className="flex items-center gap-2 px-3" style={{ border: '2px solid var(--border-color)', background: 'transparent', color: 'var(--text-color)' }}>
                <img alt="Country" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" className="flag flag-it" style={{ width: '18px' }} />
                <span className="text-base">Italy</span>
            </Tag>
        </div>
    );
}

```

### As button

Use `as="button"` to display a tag as a button.

```tsx
import { Tag } from 'primereact/tag';

export default function ButtonDemo() {
    return (
        <div className="card flex flex-col items-center gap-4">
            <Tag as="button">
                <Tag.Label>Button</Tag.Label>
            </Tag>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Tag does not include any roles and attributes by default, any attribute is passed to the root element so aria roles and attributes can be added if required. If the tags are dynamic, aria-live may be utilized as well. In case badges need to be tabbable, tabindex can be added to implement custom key handlers.

### Keyboard Support

Component does not include any interactive elements.


# Tag Pass Through

Pass Through documentation for Tag component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="tag-pt" components={['Tag']} />

## Tag PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | TagPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the root's DOM element. |
| icon | TagPassThroughType<HTMLAttributes<HTMLElement>> | Used to pass attributes to the icon's DOM element. |
| label | TagPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the label's DOM element. |


## TagLabel PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | TagLabelPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## TagIcon PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | TagIconPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Tag Theming

Theming documentation for Tag component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-tag | Class name of the root element |
| p-tag-icon | Class name of the icon element |
| p-tag-label | Class name of the label element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| tag.font.size | --p-tag-font-size | Font size of root |
| tag.font.weight | --p-tag-font-weight | Font weight of root |
| tag.padding | --p-tag-padding | Padding of root |
| tag.gap | --p-tag-gap | Gap of root |
| tag.border.radius | --p-tag-border-radius | Border radius of root |
| tag.rounded.border.radius | --p-tag-rounded-border-radius | Rounded border radius of root |
| tag.icon.size | --p-tag-icon-size | Size of icon |
| tag.primary.background | --p-tag-primary-background | Background of primary |
| tag.primary.color | --p-tag-primary-color | Color of primary |
| tag.secondary.background | --p-tag-secondary-background | Background of secondary |
| tag.secondary.color | --p-tag-secondary-color | Color of secondary |
| tag.success.background | --p-tag-success-background | Background of success |
| tag.success.color | --p-tag-success-color | Color of success |
| tag.info.background | --p-tag-info-background | Background of info |
| tag.info.color | --p-tag-info-color | Color of info |
| tag.warn.background | --p-tag-warn-background | Background of warn |
| tag.warn.color | --p-tag-warn-color | Color of warn |
| tag.danger.background | --p-tag-danger-background | Background of danger |
| tag.danger.color | --p-tag-danger-color | Color of danger |
| tag.contrast.background | --p-tag-contrast-background | Background of contrast |
| tag.contrast.color | --p-tag-contrast-color | Color of contrast |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Terminal API

API documentation for Terminal component


## Terminal

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: TerminalInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: TerminalInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<TerminalPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: TerminalInstance) => ReactNode) | null | The children to render. |
| prompt | string | null | Prompt text for each command. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| commandText | string | null | Current command text being typed. |
| commands | TerminalCommandItem[] | null | Array of commands and their responses. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useTerminalState | null | State of the terminal. |
| inputRef | RefObject<HTMLInputElement> | null | Reference to the input element. |
| onClick | () => void | null | Click handler for terminal container. |
| onKeyDown | (event: KeyboardEvent<HTMLInputElement>) => void | null | Key down handler for input element. |
| onInputChange | (event: ChangeEvent<HTMLInputElement>) => void | null | Input change handler. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Terminal component. | [object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Terminal component. | [object Object] |


## TerminalWelcome

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: TerminalWelcomeInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: TerminalWelcomeInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<TerminalWelcomePassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: TerminalWelcomeInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| terminal | TerminalInstance | null | The Terminal component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of TerminalWelcome component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of TerminalWelcome component. | [object Object] |


## TerminalCommandList

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: TerminalCommandListInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: TerminalCommandListInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<TerminalCommandListPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: TerminalCommandListInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| terminal | TerminalInstance | null | The Terminal component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of TerminalCommandList component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of TerminalCommandList component. | [object Object] |


## useTerminal

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| prompt | string | null | Prompt text for each command. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| commandText | string | null | Current command text being typed. |
| commands | TerminalCommandItem[] | null | Array of commands and their responses. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useTerminalState | null | State of the terminal. |
| inputRef | RefObject<HTMLInputElement> | null | Reference to the input element. |
| onClick | () => void | null | Click handler for terminal container. |
| onKeyDown | (event: KeyboardEvent<HTMLInputElement>) => void | null | Key down handler for input element. |
| onInputChange | (event: ChangeEvent<HTMLInputElement>) => void | null | Input change handler. |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useTerminal headless. | [object Object] |



# Terminal

Terminal is a grouping component for buttons and other content.


## Usage

```tsx
import { Terminal } from 'primereact/terminal';
```

```tsx
<Terminal>
    <Terminal.Welcome />
    <Terminal.CommandList />
</Terminal>
```

## Examples

### Basic

Terminal provides `Terminal.Welcome` and `Terminal.CommandList` components to place content at these sections.

```tsx
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import * as React from 'react';

export default function BasicDemo() {
    const commandHandler = (text: unknown): void => {
        if (typeof text !== 'string') return;

        let response: string | number | null;
        const argsIndex: number = text.indexOf(' ');
        const command: string = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;

            case 'random':
                response = Math.floor(Math.random() * 100);
                break;

            case 'clear':
                response = null;
                break;

            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if (response) {
            TerminalService.emit('response', response);
        } else {
            TerminalService.emit('clear');
        }
    };

    React.useEffect(() => {
        TerminalService.on('command', commandHandler);

        return () => {
            TerminalService.off('command', commandHandler);
        };
    }, []);

    return (
        <div className="card">
            <p className="mb-4">
                Enter &quot;<strong>date</strong>&quot; to display the current date, &quot;<strong>greet {0}</strong>&quot; for a message and &quot;<strong>random</strong>&quot; to get a random number.
            </p>
            <Terminal prompt="primereact $">
                <Terminal.Welcome>Welcome to PrimeReact</Terminal.Welcome>
                <Terminal.CommandList />
            </Terminal>
        </div>
    );
}

```

### Template

```tsx
import { TerminalCommandItem, TerminalInstance } from '@primereact/types/shared/terminal';
import { Terminal } from 'primereact/terminal';
import { TerminalService } from 'primereact/terminalservice';
import * as React from 'react';

export default function BasicDemo() {
    const commandHandler = (text: unknown): void => {
        if (typeof text !== 'string') return;

        let response: string | number | null;
        const argsIndex: number = text.indexOf(' ');
        const command: string = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1) + '!';
                break;

            case 'random':
                response = Math.floor(Math.random() * 100);
                break;

            case 'clear':
                response = null;
                break;

            default:
                response = 'Unknown command: ' + command;
                break;
        }

        if (response) {
            TerminalService.emit('response', response);
        } else {
            TerminalService.emit('clear');
        }
    };

    React.useEffect(() => {
        TerminalService.on('command', commandHandler);

        return () => {
            TerminalService.off('command', commandHandler);
        };
    }, []);

    return (
        <div className="card">
            <p className="mb-4">
                Enter &quot;<strong>date</strong>&quot; to display the current date, &quot;<strong>greet {0}</strong>&quot; for a message and &quot;<strong>random</strong>&quot; to get a random number.
            </p>
            <Terminal
                prompt="primereact $"
                pt={{
                    promptLabel: 'font-medium'
                }}
            >
                {(instance: TerminalInstance) => {
                    const { state } = instance;

                    return (
                        <>
                            <Terminal.Welcome>Welcome to PrimeReact</Terminal.Welcome>
                            {(state.commands as TerminalCommandItem[]).map((command, index) => {
                                return (
                                    <div key={index}>
                                        <span className="font-medium me-2">primereact $</span>
                                        <span>{command.text}</span>
                                        <div aria-live="polite">{command.response}</div>
                                    </div>
                                );
                            })}
                        </>
                    );
                }}
            </Terminal>
        </div>
    );
}

```

## Accessibility

### Screen Reader

The element that lists the previous commands has `aria-live` so that changes are received by the screen reader.

### Keyboard Support

| Key     | Function                                                 |
| ------- | -------------------------------------------------------- |
| `tab`   | Moves focus through the input element.                   |
| `enter` | Executes the command when focus in on the input element. |


# Terminal Pass Through

Pass Through documentation for Terminal component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="terminal-pt" components={['Terminal']} />

## Terminal PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | TerminalPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| commandList | TerminalPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the commandList's DOM element. |
| commands | TerminalPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the commands' DOM element. |
| commandValue | TerminalPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the command value's DOM element. |
| commandResponse | TerminalPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the command response's DOM element. |
| prompt | TerminalPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the prompt's DOM element. |
| promptValue | TerminalPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the prompt value's DOM element. |
| promptLabel | TerminalPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the prompt label's DOM element. |


## TerminalWelcome PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | TerminalWelcomePassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## TerminalCommandList PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | TerminalCommandListPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Terminal Theming

Theming documentation for Terminal component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-terminal | Class name of the root element |
| p-terminal-welcome-message | Class name of the welcome element |
| p-terminal-command-list | Class name of the command list element |
| p-terminal-command | Class name of the command element |
| p-terminal-command-value | Class name of the command value element |
| p-terminal-command-response | Class name of the command response element |
| p-terminal-prompt | Class name of the prompt element |
| p-terminal-prompt-label | Class name of the prompt label element |
| p-terminal-prompt-value | Class name of the prompt value element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| terminal.background | --p-terminal-background | Background of root |
| terminal.border.color | --p-terminal-border-color | Border color of root |
| terminal.color | --p-terminal-color | Color of root |
| terminal.height | --p-terminal-height | Height of root |
| terminal.padding | --p-terminal-padding | Padding of root |
| terminal.border.radius | --p-terminal-border-radius | Border radius of root |
| terminal.prompt.gap | --p-terminal-prompt-gap | Gap of prompt |
| terminal.command.response.margin | --p-terminal-command-response-margin | Margin of command response |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Textarea API

API documentation for Textarea component


## Textarea

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: TextareaInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: TextareaInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<TextareaPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: TextareaInstance) => ReactNode) | null | The children to render. |
| size | "small" \\| "large" | null | Defines the size of the Textarea. |
| variant | "outlined" \\| "filled" | null | Specifies the input variant of the component. |
| fluid | boolean | null | When enabled, the component will stretch to occupy the full width of its container. |
| invalid | boolean | false | When present, it specifies that the component should have invalid state style. |
| autoResize | boolean | false | When present, height of textarea changes as being typed. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| onInput | () => void | null | Event handler for input events on the textarea. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Textarea component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Textarea component. | [object Object] |


## useTextarea

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| autoResize | boolean | false | When present, height of textarea changes as being typed. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| onInput | () => void | null | Event handler for input events on the textarea. |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useTextarea headless. | [object Object] |



# Textarea

Textarea is a multi-line text input element.


## Usage

```tsx
import { Textarea } from 'primereact/textarea';
```

```tsx
<Textarea />
```

## Examples

### Basic

Basic usage demonstrates a simple multi-line text input field for entering longer text content.

```tsx
import { Textarea } from 'primereact/textarea';

export default function BasicDemo() {
    return (
        <div className="card flex justify-center">
            <Textarea rows={5} cols={30} />
        </div>
    );
}

```

### Auto Resize

Textarea can automatically adjust its height based on the content by setting the `autoResize` property.

```tsx
import { Textarea } from 'primereact/textarea';

export default function AutoResizeDemo() {
    return (
        <div className="card flex justify-center">
            <Textarea autoResize rows={5} cols={30} />
        </div>
    );
}

```

### Filled

Specify the `variant` property as `filled` to display the component with a higher visual emphasis than the default `outlined` style.

```tsx
import { Textarea } from 'primereact/textarea';

export default function FilledDemo() {
    return (
        <div className="card flex justify-center">
            <Textarea variant="filled" rows={5} cols={30} />
        </div>
    );
}

```

### Float Label

A floating label appears on top of the input field when focused. Visit [FloatLabel](/docs/components/floatlabel) documentation for more information.

```tsx
import { Label } from 'primereact/label';
import { Textarea } from 'primereact/textarea';
import * as React from 'react';

export default function FloatLabelDemo() {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');

    return (
        <div className="card  flex flex-wrap justify-center items-stretch gap-4">
            <Label.Float>
                <Textarea value={value1} onInput={(e: React.FormEvent<HTMLTextAreaElement>) => setValue1(e.currentTarget.value)} id="over_label" rows={5} cols={30} style={{ resize: 'none' }} className="h-full" />
                <Label htmlFor="over_label">Over Label</Label>
            </Label.Float>
            <Label.Float variant="in">
                <Textarea value={value2} onInput={(e: React.FormEvent<HTMLTextAreaElement>) => setValue2(e.currentTarget.value)} id="in_label" rows={5} cols={30} style={{ resize: 'none' }} className="h-full" />
                <Label htmlFor="in_label">In Label</Label>
            </Label.Float>
            <Label.Float variant="on">
                <Textarea value={value3} onInput={(e: React.FormEvent<HTMLTextAreaElement>) => setValue3(e.currentTarget.value)} id="on_label" rows={5} cols={30} style={{ resize: 'none' }} className="h-full" />
                <Label htmlFor="on_label">On Label</Label>
            </Label.Float>
        </div>
    );
}

```

### Ifta Label

IftaLabel is used to create infield top aligned labels. Visit [IftaLabel](/docs/components/iftalabel) documentation for more information.

```tsx
import { Label } from 'primereact/label';
import { Textarea } from 'primereact/textarea';
import * as React from 'react';

export default function IftaLabelDemo() {
    const [value, setValue] = React.useState('');

    return (
        <div className="card flex justify-center">
            <Label.Ifta>
                <Textarea id="description" value={value} onInput={(e: React.FormEvent<HTMLTextAreaElement>) => setValue(e.currentTarget.value)} rows={5} cols={30} style={{ resize: 'none' }} />
                <Label htmlFor="description">Description</Label>
            </Label.Ifta>
        </div>
    );
}

```

### Sizes

Textarea provides `small` and `large` sizes as alternatives to the base by setting the `size` property.

```tsx
import { Textarea } from 'primereact/textarea';

export default function BasicDemo() {
    return (
        <div className="card flex flex-col items-center gap-4">
            <Textarea size="small" placeholder="Small" rows={3} />
            <Textarea placeholder="Normal" rows={3} />
            <Textarea size="large" placeholder="Large" rows={3} />
        </div>
    );
}

```

### Invalid

Invalid state is displayed using the `invalid` prop to indicate a failed validation. You can use this style when integrating with form validation libraries.

```tsx
import { Textarea } from 'primereact/textarea';
import * as React from 'react';

export default function InvalidDemo() {
    const [value, setValue] = React.useState('');

    return (
        <div className="card flex justify-center">
            <Textarea value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} invalid={value === ''} rows={5} cols={30} />
        </div>
    );
}

```

### Disabled

When `disabled` is present, the element cannot be edited and focused.

```tsx
import { Textarea } from 'primereact/textarea';

export default function DisabledDemo() {
    return (
        <div className="card flex justify-center">
            <Textarea rows={5} cols={30} disabled />
        </div>
    );
}

```


# Textarea Pass Through

Pass Through documentation for Textarea component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="textarea-pt" components={['Textarea']} />

## Textarea PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | TextareaPassThroughType<InputHTMLAttributes<HTMLInputElement>> | Used to pass attributes to the root's DOM element. |



# Textarea Theming

Theming documentation for Textarea component


## Styled

### Textarea CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-textarea | Class name of the root element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| textarea.background | --p-textarea-background | Background of root |
| textarea.disabled.background | --p-textarea-disabled-background | Disabled background of root |
| textarea.filled.background | --p-textarea-filled-background | Filled background of root |
| textarea.filled.hover.background | --p-textarea-filled-hover-background | Filled hover background of root |
| textarea.filled.focus.background | --p-textarea-filled-focus-background | Filled focus background of root |
| textarea.border.color | --p-textarea-border-color | Border color of root |
| textarea.hover.border.color | --p-textarea-hover-border-color | Hover border color of root |
| textarea.focus.border.color | --p-textarea-focus-border-color | Focus border color of root |
| textarea.invalid.border.color | --p-textarea-invalid-border-color | Invalid border color of root |
| textarea.color | --p-textarea-color | Color of root |
| textarea.disabled.color | --p-textarea-disabled-color | Disabled color of root |
| textarea.placeholder.color | --p-textarea-placeholder-color | Placeholder color of root |
| textarea.invalid.placeholder.color | --p-textarea-invalid-placeholder-color | Invalid placeholder color of root |
| textarea.shadow | --p-textarea-shadow | Shadow of root |
| textarea.padding.x | --p-textarea-padding-x | Padding x of root |
| textarea.padding.y | --p-textarea-padding-y | Padding y of root |
| textarea.border.radius | --p-textarea-border-radius | Border radius of root |
| textarea.focus.ring.width | --p-textarea-focus-ring-width | Focus ring width of root |
| textarea.focus.ring.style | --p-textarea-focus-ring-style | Focus ring style of root |
| textarea.focus.ring.color | --p-textarea-focus-ring-color | Focus ring color of root |
| textarea.focus.ring.offset | --p-textarea-focus-ring-offset | Focus ring offset of root |
| textarea.focus.ring.shadow | --p-textarea-focus-ring-shadow | Focus ring shadow of root |
| textarea.transition.duration | --p-textarea-transition-duration | Transition duration of root |
| textarea.sm.font.size | --p-textarea-sm-font-size | Sm font size of root |
| textarea.sm.padding.x | --p-textarea-sm-padding-x | Sm padding x of root |
| textarea.sm.padding.y | --p-textarea-sm-padding-y | Sm padding y of root |
| textarea.lg.font.size | --p-textarea-lg-font-size | Lg font size of root |
| textarea.lg.padding.x | --p-textarea-lg-padding-x | Lg padding x of root |
| textarea.lg.padding.y | --p-textarea-lg-padding-y | Lg padding y of root |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# ToggleButton API

API documentation for ToggleButton component


## ToggleButton

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ToggleButtonInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ToggleButtonInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ToggleButtonPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ToggleButtonInstance) => ReactNode) | null | The children to render. |
| value | unknown | null | Value of the ToggleButton. |
| size | "small" \\| "large" \\| "normal" | null | Defines the size of the ToggleButton. |
| disabled | boolean | false | When present, it specifies that the element should be disabled. |
| invalid | boolean | false | When present, it specifies that the component should have invalid state style. |
| onPressedChange | (event: ToggleButtonChangeEvent) => void | null | Callback fired when the ToggleButton's pressed state changes. |
| pressed | boolean | null | When present, it specifies that the ToggleButton should be pressed. |
| defaultPressed | boolean | null | The default pressed value when not controlled by  `pressed`  and  `onPressedChange` . |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| pressed | boolean | null | The pressed state of the useToggleButton. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| group | ToggleButtonGroupInstance | null | The group instance of the ToggleButton. |
| state | useToggleButtonState | null | The state of the useToggleButton. |
| onChange | (event: useToggleButtonChangeEvent) => void | null | Callback fired when the useToggleButton's pressed state changes. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.togglebutton.events.ToggleButtonChangeEvent | ToggleButtonChangeEvent | Event fired when the ToggleButton's checked state changes. |  | [object Object],[object Object],[object Object] |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ToggleButton component. | [object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ToggleButton component. | [object Object] |


## ToggleButtonIndicator

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ToggleButtonIndicatorInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ToggleButtonIndicatorInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ToggleButtonIndicatorPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ToggleButtonIndicatorInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| togglebutton | ToggleButtonInstance | null | The ToggleButton component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ToggleButtonIndicator component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ToggleButtonIndicator component. | [object Object] |


## ToggleButtonGroup

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ToggleButtonGroupInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ToggleButtonGroupInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ToggleButtonGroupPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ToggleButtonGroupInstance) => ReactNode) | null | The children to render. |
| value | unknown | null | Value of the ToggleButton group. |
| defaultValue | unknown | null | The default value of the ToggleButton group. |
| size | "small" \\| "large" \\| "normal" | null | Defines the size of the ToggleButton components. |
| multiple | boolean | false | When present, it specifies that the ToggleButton group allows multiple selections. |
| allowEmpty | boolean | true | When present, it specifies that the ToggleButton group allows empty selection. |
| disabled | boolean | false | When present, it specifies that the ToggleButton group should be disabled. |
| invalid | boolean | false | When present, it specifies that the ToggleButton group is invalid. |
| onValueChange | (event: ToggleButtonGroupValueChangeEvent) => void | null | Callback function that is called when the ToggleButton group value changes. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| value | unknown | null | Value of the ToggleButton group. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | ToggleButtonGroupState | null | The state of the ToggleButton group. |
| updateChange | (event: ToggleButtonGroupUpdateChangeEvent) => void | null | Updates the value of the ToggleButton group. |
| isPressed | (value: unknown, toggleButtonValue: unknown) => boolean | null | Checks if a toggle button is pressed.
Returns true if the toggle button is pressed, false if not pressed, or undefined if the value is undefined. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.togglebuttongroup.events.ToggleButtonGroupValueChangeEvent | ToggleButtonGroupValueChangeEvent | Event fired when the ToggleButton group's value changes. |  | [object Object] |
| api.togglebuttongroup.events.ToggleButtonGroupUpdateChangeEvent | ToggleButtonGroupUpdateChangeEvent | Used to update the ToggleButton group value. |  | [object Object],[object Object],[object Object] |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ToggleButton component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ToggleButtonGroup component. | [object Object] |


## useToggleButton

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| pressed | boolean | null | When present, it specifies that the ToggleButton should be pressed. |
| defaultPressed | boolean | null | The default pressed value when not controlled by  `pressed`  and  `onPressedChange` . |
| onPressedChange | (event: useToggleButtonChangeEvent) => void | null | Callback fired when the ToggleButton's pressed state changes. |


### State

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| pressed | boolean | null | The pressed state of the useToggleButton. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| state | useToggleButtonState | null | The state of the useToggleButton. |
| onChange | (event: useToggleButtonChangeEvent) => void | null | Callback fired when the useToggleButton's pressed state changes. |


### Events

| Id | Label | Description | RelatedProp | Data |
|:------|:------|:------|:------|:------|
| api.usetogglebutton.events.useToggleButtonChangeEvent | useToggleButtonChangeEvent | Event fired when the ToggleButton's checked state changes. |  | [object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useToggleButton headless. | [object Object] |



# ToggleButton

ToggleButton component is used to create a button that can be toggled on or off.


## Usage

```tsx
import { ToggleButton } from 'primereact/togglebutton';
```

```tsx
<ToggleButton>
    <ToggleButton.Indicator>Toggle</ToggleButton.Indicator>
</ToggleButton>
```

## Examples

### Basic

```tsx
import { ToggleButton } from 'primereact/togglebutton';

export default function BasicDemo() {
    return (
        <div className="card flex items-center justify-center">
            <ToggleButton>
                <ToggleButton.Indicator>Bold</ToggleButton.Indicator>
            </ToggleButton>
        </div>
    );
}

```

### Render Props

This is called the render prop pattern. It lets you use a function to customize what the component displays based on its internal state.

```tsx
import { ToggleButtonIndicatorInstance } from '@primereact/types/shared/togglebutton';
import { ToggleButton } from 'primereact/togglebutton';

export default function StateDemo() {
    return (
        <div className="card flex flex-wrap items-center justify-center gap-4">
            <ToggleButton>
                <ToggleButton.Indicator>{({ togglebutton }: ToggleButtonIndicatorInstance) => (togglebutton?.state.pressed ? 'On' : 'Off')}</ToggleButton.Indicator>
            </ToggleButton>
            <ToggleButton>
                <ToggleButton.Indicator>
                    {({ togglebutton }: ToggleButtonIndicatorInstance) =>
                        togglebutton?.state.pressed ? (
                            <>
                                <i className="pi pi-lock"></i>Locked
                            </>
                        ) : (
                            <>
                                <i className="pi pi-lock-open"></i>Unlocked
                            </>
                        )
                    }
                </ToggleButton.Indicator>
            </ToggleButton>
            <ToggleButton>
                <ToggleButton.Indicator>
                    {({ togglebutton }: ToggleButtonIndicatorInstance) =>
                        togglebutton?.state.pressed ? (
                            <>
                                <i className="pi pi-volume-up"></i>Mute
                            </>
                        ) : (
                            <>
                                <i className="pi pi-volume-off"></i>Unmute
                            </>
                        )
                    }
                </ToggleButton.Indicator>
            </ToggleButton>
            <ToggleButton>
                <ToggleButton.Indicator className="w-8 h-8">{({ togglebutton }: ToggleButtonIndicatorInstance) => (togglebutton?.state.pressed ? <i className="pi pi-heart-fill"></i> : <i className="pi pi-heart"></i>)}</ToggleButton.Indicator>
            </ToggleButton>
        </div>
    );
}

```

### Controlled

Use `pressed` and `onPressedChange` properties to control the state of the ToggleButton.

```tsx
import type { ToggleButtonChangeEvent } from '@primereact/types/shared/togglebutton';
import { ToggleButton } from 'primereact/togglebutton';
import * as React from 'react';

export default function ControlledDemo() {
    const [pressedState, setPressedState] = React.useState(false);

    return (
        <div className="card flex items-center justify-center">
            <ToggleButton pressed={pressedState} onPressedChange={(e: ToggleButtonChangeEvent) => setPressedState(e.pressed)}>
                <ToggleButton.Indicator>{pressedState ? 'Pressed' : 'Not Pressed'}</ToggleButton.Indicator>
            </ToggleButton>
        </div>
    );
}

```

### Size

`ToggleButton` provides small and large sizes as alternatives to the base by using the `size` property.

```tsx
import { ToggleButton } from 'primereact/togglebutton';

export default function SizesDemo() {
    return (
        <div className="card flex flex-col gap-2 items-center justify-center">
            <ToggleButton size="small" className="min-w-16">
                <ToggleButton.Indicator>Small</ToggleButton.Indicator>
            </ToggleButton>
            <ToggleButton size="normal" className="min-w-20">
                <ToggleButton.Indicator>Normal</ToggleButton.Indicator>
            </ToggleButton>
            <ToggleButton size="large" className="min-w-28">
                <ToggleButton.Indicator>Large</ToggleButton.Indicator>
            </ToggleButton>
        </div>
    );
}

```

### Invalid

Invalid state is displayed using the `invalid` prop to indicate a failed validation. You can use this style when integrating with form validation libraries.

```tsx
import type { ToggleButtonChangeEvent } from '@primereact/types/shared/togglebutton';
import { ToggleButton } from 'primereact/togglebutton';
import * as React from 'react';

export default function InvalidDemo() {
    const [pressedState, setPressedState] = React.useState(false);

    return (
        <div className="card flex items-center justify-center">
            <ToggleButton pressed={pressedState} onPressedChange={(e: ToggleButtonChangeEvent) => setPressedState(e.pressed)} invalid={!pressedState}>
                <ToggleButton.Indicator>Invalid</ToggleButton.Indicator>
            </ToggleButton>
        </div>
    );
}

```

### Disabled

When `disabled` is present, the element cannot be edited and focused.

```tsx
import { ToggleButton } from 'primereact/togglebutton';

export default function DisabledDemo() {
    return (
        <div className="card flex items-center justify-center">
            <ToggleButton disabled>
                <ToggleButton.Indicator>Disabled</ToggleButton.Indicator>
            </ToggleButton>
        </div>
    );
}

```

### Group

The `allowEmpty` property is true by default. If set to false, the component ensures that at least one item remains selected at all times.

```tsx
import { ToggleButton } from 'primereact/togglebutton';

export default function GroupDemo() {
    return (
        <div className="card flex items-center justify-center">
            <ToggleButton.Group allowEmpty={false}>
                <ToggleButton value="left">
                    <ToggleButton.Indicator>
                        <i className="pi pi-align-left"></i>
                    </ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="center">
                    <ToggleButton.Indicator>
                        <i className="pi pi-align-center"></i>
                    </ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="right">
                    <ToggleButton.Indicator>
                        <i className="pi pi-align-right"></i>
                    </ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="justify">
                    <ToggleButton.Indicator>
                        <i className="pi pi-align-justify"></i>
                    </ToggleButton.Indicator>
                </ToggleButton>
            </ToggleButton.Group>
        </div>
    );
}

```

### Controlled Group

Use `value` and `onValueChange` properties to control the state of the `ToggleButton.Group`.

```tsx
import type { ToggleButtonGroupValueChangeEvent } from '@primereact/types/shared/togglebutton';
import { ToggleButton } from 'primereact/togglebutton';
import * as React from 'react';

export default function ControlledGroupDemo() {
    const [value, setValue] = React.useState<string[]>([]);

    return (
        <div className="card flex items-center justify-center">
            <ToggleButton.Group allowEmpty={false} value={value} onValueChange={(e: ToggleButtonGroupValueChangeEvent) => setValue(e.value as string[])}>
                <ToggleButton value="left">
                    <ToggleButton.Indicator>
                        <i className="pi pi-align-left"></i>
                    </ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="center">
                    <ToggleButton.Indicator>
                        <i className="pi pi-align-center"></i>
                    </ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="right">
                    <ToggleButton.Indicator>
                        <i className="pi pi-align-right"></i>
                    </ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="justify">
                    <ToggleButton.Indicator>
                        <i className="pi pi-align-justify"></i>
                    </ToggleButton.Indicator>
                </ToggleButton>
            </ToggleButton.Group>
        </div>
    );
}

```

### Multiple

`ToggleButton.Group` allows selecting only one item by default and setting `multiple` option enables choosing more than one item. In multiple case, model property should be an array.

```tsx
import { ToggleButton } from 'primereact/togglebutton';

export default function MultipleDemo() {
    return (
        <div className="card flex items-center justify-center">
            <ToggleButton.Group multiple>
                <ToggleButton value="bold">
                    <ToggleButton.Indicator>Bold</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="italic">
                    <ToggleButton.Indicator>Italic</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="underline">
                    <ToggleButton.Indicator>Underline</ToggleButton.Indicator>
                </ToggleButton>
            </ToggleButton.Group>
        </div>
    );
}

```

### Sizes of Group

`ToggleButton.Group` provides small and large sizes as alternatives to the base by using the `size` property.

```tsx
import { ToggleButton } from 'primereact/togglebutton';

export default function SizesGroupDemo() {
    return (
        <div className="card flex flex-col gap-4 items-center justify-center">
            <ToggleButton.Group size="small" multiple>
                <ToggleButton value="bold">
                    <ToggleButton.Indicator>Bold</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="italic">
                    <ToggleButton.Indicator>Italic</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="underline">
                    <ToggleButton.Indicator>Underline</ToggleButton.Indicator>
                </ToggleButton>
            </ToggleButton.Group>
            <ToggleButton.Group size="normal" multiple>
                <ToggleButton value="bold">
                    <ToggleButton.Indicator>Bold</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="italic">
                    <ToggleButton.Indicator>Italic</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="underline">
                    <ToggleButton.Indicator>Underline</ToggleButton.Indicator>
                </ToggleButton>
            </ToggleButton.Group>
            <ToggleButton.Group size="large" multiple>
                <ToggleButton value="bold">
                    <ToggleButton.Indicator>Bold</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="italic">
                    <ToggleButton.Indicator>Italic</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="underline">
                    <ToggleButton.Indicator>Underline</ToggleButton.Indicator>
                </ToggleButton>
            </ToggleButton.Group>
        </div>
    );
}

```

### Invalid Group

Invalid state is displayed using the `invalid` prop to indicate a failed validation. You can use this style when integrating with form validation libraries.

```tsx
import type { ToggleButtonGroupValueChangeEvent } from '@primereact/types/shared/togglebutton';
import { ToggleButton } from 'primereact/togglebutton';
import * as React from 'react';

export default function InvalidGroupDemo() {
    const [value, setValue] = React.useState<string[] | null>(null);

    return (
        <div className="card flex items-center justify-center">
            <ToggleButton.Group value={value} onValueChange={(e: ToggleButtonGroupValueChangeEvent) => setValue(e.value as string[])} invalid={value === null}>
                <ToggleButton value="monthly">
                    <ToggleButton.Indicator>Monthly</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="yearly">
                    <ToggleButton.Indicator>Yearly</ToggleButton.Indicator>
                </ToggleButton>
            </ToggleButton.Group>
        </div>
    );
}

```

### Disabled Group

When `disabled` is present, the element cannot be edited and focused entirely. Certain options can also be disabled using their `disabled` properties.

```tsx
import { ToggleButton } from 'primereact/togglebutton';

export default function DisabledGroupDemo() {
    return (
        <div className="card flex items-center gap-4 justify-center">
            <ToggleButton.Group disabled>
                <ToggleButton value="off">
                    <ToggleButton.Indicator>Off</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="on">
                    <ToggleButton.Indicator>On</ToggleButton.Indicator>
                </ToggleButton>
            </ToggleButton.Group>
            <ToggleButton.Group>
                <ToggleButton value="option1">
                    <ToggleButton.Indicator>Option 1</ToggleButton.Indicator>
                </ToggleButton>
                <ToggleButton value="option2" disabled>
                    <ToggleButton.Indicator>Option 2</ToggleButton.Indicator>
                </ToggleButton>
            </ToggleButton.Group>
        </div>
    );
}

```


# ToggleButton Pass Through

Pass Through documentation for ToggleButton component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="togglebutton-pt" components={['ToggleButton']} />

## ToggleButton PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ToggleButtonPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| indicator | ToggleButtonPassThroughType<HTMLAttributes<HTMLSpanElement>> | Used to pass attributes to the indicator's DOM element. |


## ToggleButtonIndicator PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ToggleButtonIndicatorPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# ToggleButton Theming

Theming documentation for ToggleButton component


## Styled

### ToggleButton CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-togglebutton | Class name of the root element |
| p-togglebutton-content | Class name of the content element |


### ToggleButtonGroup CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-togglebutton-group | Class name of the root element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| togglebutton.padding | --p-togglebutton-padding | Padding of root |
| togglebutton.border.radius | --p-togglebutton-border-radius | Border radius of root |
| togglebutton.gap | --p-togglebutton-gap | Gap of root |
| togglebutton.font.weight | --p-togglebutton-font-weight | Font weight of root |
| togglebutton.disabled.background | --p-togglebutton-disabled-background | Disabled background of root |
| togglebutton.disabled.border.color | --p-togglebutton-disabled-border-color | Disabled border color of root |
| togglebutton.disabled.color | --p-togglebutton-disabled-color | Disabled color of root |
| togglebutton.invalid.border.color | --p-togglebutton-invalid-border-color | Invalid border color of root |
| togglebutton.focus.ring.width | --p-togglebutton-focus-ring-width | Focus ring width of root |
| togglebutton.focus.ring.style | --p-togglebutton-focus-ring-style | Focus ring style of root |
| togglebutton.focus.ring.color | --p-togglebutton-focus-ring-color | Focus ring color of root |
| togglebutton.focus.ring.offset | --p-togglebutton-focus-ring-offset | Focus ring offset of root |
| togglebutton.focus.ring.shadow | --p-togglebutton-focus-ring-shadow | Focus ring shadow of root |
| togglebutton.transition.duration | --p-togglebutton-transition-duration | Transition duration of root |
| togglebutton.sm.font.size | --p-togglebutton-sm-font-size | Sm font size of root |
| togglebutton.sm.padding | --p-togglebutton-sm-padding | Sm padding of root |
| togglebutton.lg.font.size | --p-togglebutton-lg-font-size | Lg font size of root |
| togglebutton.lg.padding | --p-togglebutton-lg-padding | Lg padding of root |
| togglebutton.background | --p-togglebutton-background | Background of root |
| togglebutton.checked.background | --p-togglebutton-checked-background | Checked background of root |
| togglebutton.hover.background | --p-togglebutton-hover-background | Hover background of root |
| togglebutton.border.color | --p-togglebutton-border-color | Border color of root |
| togglebutton.color | --p-togglebutton-color | Color of root |
| togglebutton.hover.color | --p-togglebutton-hover-color | Hover color of root |
| togglebutton.checked.color | --p-togglebutton-checked-color | Checked color of root |
| togglebutton.checked.border.color | --p-togglebutton-checked-border-color | Checked border color of root |
| togglebutton.icon.disabled.color | --p-togglebutton-icon-disabled-color | Disabled color of icon |
| togglebutton.icon.color | --p-togglebutton-icon-color | Color of icon |
| togglebutton.icon.hover.color | --p-togglebutton-icon-hover-color | Hover color of icon |
| togglebutton.icon.checked.color | --p-togglebutton-icon-checked-color | Checked color of icon |
| togglebutton.content.padding | --p-togglebutton-content-padding | Padding of content |
| togglebutton.content.border.radius | --p-togglebutton-content-border-radius | Border radius of content |
| togglebutton.content.checked.shadow | --p-togglebutton-content-checked-shadow | Checked shadow of content |
| togglebutton.content.sm.padding | --p-togglebutton-content-sm-padding | Sm padding of content |
| togglebutton.content.lg.padding | --p-togglebutton-content-lg-padding | Lg padding of content |
| togglebutton.content.checked.background | --p-togglebutton-content-checked-background | Checked background of content |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Toolbar API

API documentation for Toolbar component


## Toolbar

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ToolbarInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ToolbarInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ToolbarPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ToolbarInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of Toolbar component. | [object Object],[object Object],[object Object],[object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of Toolbar component. | [object Object] |


## ToolbarStart

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ToolbarStartInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ToolbarStartInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ToolbarStartPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ToolbarStartInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| toolbar | ToolbarInstance | null | The Toolbar component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ToolbarStart component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ToolbarStart component. | [object Object] |


## ToolbarCenter

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ToolbarCenterInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ToolbarCenterInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ToolbarCenterPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ToolbarCenterInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| toolbar | ToolbarInstance | null | The Toolbar component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ToolbarCenter component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ToolbarCenter component. | [object Object] |


## ToolbarEnd

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: ToolbarEndInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: ToolbarEndInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<ToolbarEndPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: ToolbarEndInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| toolbar | ToolbarInstance | null | The Toolbar component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of ToolbarEnd component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of ToolbarEnd component. | [object Object] |


## useToolbar

### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of useToolbar headless. | [object Object] |



# Toolbar

Toolbar is a grouping component for buttons and other content.


## Usage

```tsx
import { Toolbar } from 'primereact/toolbar';
```

```tsx
<Toolbar></Toolbar>
```

## Examples

### Basic

Toolbar provides `Toolbar.Start`, `Toolbar.Center` and `Toolbar.End` components to place content at these sections.

```tsx
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';

export default function BasicDemo() {
    return (
        <div className="card">
            <Toolbar>
                <Toolbar.Start>
                    <Button className="mr-2" severity="secondary" variant="text">
                        <i className="pi pi-plus"></i>
                    </Button>
                    <Button className="mr-2" severity="secondary" variant="text">
                        <i className="pi pi-print"></i>
                    </Button>
                    <Button severity="secondary" variant="text">
                        <i className="pi pi-upload"></i>
                    </Button>
                </Toolbar.Start>
                <Toolbar.Center>
                    <InputText placeholder="Search" />
                </Toolbar.Center>
                <Toolbar.End>
                    <Button>Save</Button>
                </Toolbar.End>
            </Toolbar>
        </div>
    );
}

```

### Custom

A customized toolbar with navigation bar functionality.

```tsx
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

export default function CustomDemo() {
    return (
        <div className="card">
            <Toolbar style={{ borderRadius: '3rem', padding: '1rem 1rem 1rem 1.5rem' }}>
                <Toolbar.Start>
                    <Button variant="text" plain>
                        Files
                    </Button>
                    <Button variant="text" plain>
                        Edit
                    </Button>
                    <Button variant="text" plain>
                        View
                    </Button>
                </Toolbar.Start>
                <Toolbar.End>
                    <div className="flex items-center gap-2">
                        <Button severity="contrast" size="small">
                            Share
                        </Button>
                        <Avatar shape="circle">
                            <Avatar.Image src="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" />
                            <Avatar.Fallback>A</Avatar.Fallback>
                        </Avatar>
                    </div>
                </Toolbar.End>
            </Toolbar>
        </div>
    );
}

```

## Accessibility

### Screen Reader

Toolbar uses `toolbar` role to the root element, `aria-orientation` is not included as it defaults to "horizontal". Any valid attribute is passed to the root element so you may add additional properties like `aria-labelledby` to define the element if required.`

### Keyboard Support

Component does not include any interactive elements. Arbitrary content can be placed with templating and elements like buttons inside should follow the page tab sequence.


# Toolbar Pass Through

Pass Through documentation for Toolbar component


## Viewer

Some sections may not be visible due to the availability of the particular feature.

<DocPTViewer name="toolbar-pt" components={['Toolbar']} />

## Toolbar PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ToolbarPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |
| start | ToolbarPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the start's DOM element. |
| center | ToolbarPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the center's DOM element. |
| end | ToolbarPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the end's DOM element. |


## ToolbarStart PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ToolbarStartPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## ToolbarCenter PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ToolbarCenterPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |


## ToolbarEnd PT Options

| Label | Type | Description |
|:------|:------|:------|
| root | ToolbarEndPassThroughType<HTMLAttributes<HTMLDivElement>> | Used to pass attributes to the root's DOM element. |



# Toolbar Theming

Theming documentation for Toolbar component


## Styled

### CSS Classes

List of class names used in the styled mode.

| ClassName | Description |
|:------|:------|
| p-toolbar | Class name of the root element |
| p-toolbar-start | Class name of the start element |
| p-toolbar-center | Class name of the center element |
| p-toolbar-end | Class name of the end element |


### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| toolbar.background | --p-toolbar-background | Background of root |
| toolbar.border.color | --p-toolbar-border-color | Border color of root |
| toolbar.border.radius | --p-toolbar-border-radius | Border radius of root |
| toolbar.color | --p-toolbar-color | Color of root |
| toolbar.gap | --p-toolbar-gap | Gap of root |
| toolbar.padding | --p-toolbar-padding | Padding of root |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.


# Tooltip API

API documentation for Tooltip component


## TooltipTrigger

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | (CSSProperties \\| ((instance?: ButtonInstance) => CSSProperties)) & (CSSProperties \\| ((instance?: TooltipTriggerInstance) => CSSProperties)) | null | The style to apply to the component. |
| className | (string \\| ((instance?: ButtonInstance) => string)) & (string \\| ((instance?: TooltipTriggerInstance) => string)) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | ButtonPassThrough & Record<PropertyKey, unknown> & TooltipTriggerPassThrough | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | (ReactNode \\| ((instance: ButtonInstance) => ReactNode)) & (ReactNode \\| ((instance: TooltipTriggerInstance) => ReactNode)) | null | The children to render. |
| size | "small" \\| "large" \\| "normal" | null | Size of the Button. |
| severity | string & {} \\| "secondary" \\| "info" \\| "success" \\| "warn" \\| "danger" \\| "contrast" \\| "help" | null | Severity type of the Button. |
| variant | "link" \\| "text" \\| "outlined" | null | Variant of the Button. |
| plain | boolean | null | Whether to show the Button with a plain style. |
| rounded | boolean | null | Whether to show the Button with a rounded style. |
| raised | boolean | null | Whether to show the Button with a raised style. |
| iconOnly | boolean | null | Whether to show the Button with a borderless style. |
| fluid | boolean | null | Whether to show the Button with a fluid width. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| tooltip | TooltipInstance | null | The Tooltip component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of TooltipTrigger component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of TooltipTrigger component. | [object Object] |


## TooltipPortal

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | (CSSProperties \\| ((instance?: PortalInstance) => CSSProperties)) & (CSSProperties \\| ((instance?: TooltipPortalInstance) => CSSProperties)) | null | The style to apply to the component. |
| className | (string \\| ((instance?: PortalInstance) => string)) & (string \\| ((instance?: TooltipPortalInstance) => string)) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | PortalPassThrough & Record<PropertyKey, unknown> & TooltipPortalPassThrough | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | (ReactNode \\| ((instance: PortalInstance) => ReactNode)) & (ReactNode \\| ((instance: TooltipPortalInstance) => ReactNode)) | null | The children to render. |
| element | ReactNode | null | The element to be rendered as the portal. |
| appendTo | HTMLElement \\| "body" \\| "self" | 'body' | The DOM element where the portal should be appended to. |
| visible | boolean | null | Whether the portal is visible or not. |
| onMounted | () => void | null | Callback function to invoke when the portal is mounted. |
| onUnmounted | () => void | null | Callback function to invoke when the portal is unmounted. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| tooltip | TooltipInstance | null | The Tooltip component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of TooltipPortal component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of TooltipPortal component. | [object Object] |


## TooltipContent

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: TooltipContentInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: TooltipContentInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<TooltipContentPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: TooltipContentInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| tooltip | TooltipInstance | null | The Tooltip component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of TooltipContent component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of TooltipContent component. | [object Object] |


## TooltipArrow

### Props

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| ref | Ref<unknown> | null | The reference to the component instance. |
| pIf | boolean | true | Whether the component should be rendered. |
| style | CSSProperties \\| ((instance?: TooltipArrowInstance) => CSSProperties) | null | The style to apply to the component. |
| className | string \\| ((instance?: TooltipArrowInstance) => string) | null | The class name to apply to the component. |
| as | string \\| number \\| bigint \\| boolean \\| ComponentClass<any, any> \\| FunctionComponent<any> \\| ReactElement<unknown, string \\| JSXElementConstructor<any>> \\| Iterable<ReactNode, any, any> \\| ReactPortal \\| Promise<AwaitedReactNode> | null | The component type to render. |
| asChild | boolean | false | Whether the component should be rendered as a child component. |
| pt | SafeRecord<TooltipArrowPassThrough> | null | The pass-through props to pass to the component |
| ptOptions | PassThroughOptions | null | The pass-through options to pass to the component |
| unstyled | boolean | null | Whether the component should be rendered without classes. |
| dt | unknown | null | The design token to use for the component. |
| styles | StylesOptions<ComponentInstance> | null | The styles to use for the component. |
| children | ReactNode \\| ((instance: TooltipArrowInstance) => ReactNode) | null | The children to render. |
| [key: string] | any | null |  |
| pt-{optionName}-* | - | null | Pass through attributes for customizing component. For more info, see Pass Through tab. |


### Exposes

| Name | Type | Default | Description |
|:------|:------|:------|:------|
| tooltip | TooltipInstance | null | The Tooltip component instance. |


### Interfaces

| Label | Description | Data |
|:------|:------|:------|
| PassThroughOptions | Defines passthrough(pt) options of TooltipArrow component. | [object Object] |


### Types

| Label | Description | Data |
|:------|:------|:------|
| Instance | Instance of TooltipArrow component. | [object Object] |



# Tooltip

Tooltip is a component that displays a tooltip when the user hovers over an element.


## Usage

```tsx
import { Tooltip } from 'primereact/tooltip';
```

```tsx
<Tooltip.Group>
    <Tooltip>
        <Tooltip.Trigger></Tooltip.Trigger>
        <Tooltip.Portal>
            <Tooltip.Content>
                <Tooltip.Arrow />
            </Tooltip.Content>
        </Tooltip.Portal>
    </Tooltip>
</Tooltip.Group>
```

## Examples

### Arrow

```tsx
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

export default function ArrowDemo() {
    return (
        <div className="card flex items-center justify-center gap-6">
            <Tooltip>
                <Tooltip.Trigger as={Button} severity="secondary" variant="outlined">
                    Show Tooltip
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content>
                        <p>Tooltip with arrow</p>
                        <Tooltip.Arrow />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip>
            <Tooltip>
                <Tooltip.Trigger as={Button} severity="secondary" variant="outlined">
                    Show Tooltip
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content>
                        <p>Tooltip without arrow</p>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip>
        </div>
    );
}

```

### Placement

Use `side` and `align` to control the placement of the tooltip.

```tsx
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

export default function PlacementDemo() {
    return (
        <div className="card flex flex-col items-center justify-center gap-12">
            <div className="flex items-center justify-center gap-6">
                <Tooltip side="top">
                    <Tooltip.Trigger as={Button} severity="secondary" variant="outlined">
                        Top
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content>
                            <p>Tooltip placed to the top</p>
                            <Tooltip.Arrow />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip>
                <Tooltip side="bottom">
                    <Tooltip.Trigger as={Button} severity="secondary" variant="outlined">
                        Bottom
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content>
                            <p>Tooltip placed to the bottom</p>
                            <Tooltip.Arrow />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip>
                <Tooltip side="right">
                    <Tooltip.Trigger as={Button} severity="secondary" variant="outlined">
                        Right
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content>
                            <p>Tooltip placed to the right</p>
                            <Tooltip.Arrow />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip>
                <Tooltip side="left">
                    <Tooltip.Trigger as={Button} severity="secondary" variant="outlined">
                        Left
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content>
                            <p>Tooltip placed to the left</p>
                            <Tooltip.Arrow />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip>
            </div>
            <div className="flex items-center justify-center gap-6">
                <Tooltip align="start">
                    <Tooltip.Trigger as={Button} severity="secondary" variant="outlined">
                        Start
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content>
                            <p>Tooltip aligned to the start</p>
                            <Tooltip.Arrow />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip>
                <Tooltip align="center">
                    <Tooltip.Trigger as={Button} severity="secondary" variant="outlined">
                        Center
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content>
                            <p>Tooltip aligned to the center</p>
                            <Tooltip.Arrow />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip>
                <Tooltip align="end">
                    <Tooltip.Trigger as={Button} severity="secondary" variant="outlined">
                        End
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content>
                            <p>Tooltip aligned to the end</p>
                            <Tooltip.Arrow />
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip>
            </div>
        </div>
    );
}

```

### Offset

Use `sideOffset` and `alignOffset` to control the offset of the tooltip.

```tsx
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

function OffsetDemo() {
    return (
        <div className="card flex items-center justify-center gap-4">
            <Tooltip sideOffset={24}>
                <Tooltip.Trigger as={Button} variant="outlined" severity="secondary">
                    Show Tooltip
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content>
                        <p>Tooltip with 24px side offset</p>
                        <Tooltip.Arrow />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip>
            <Tooltip alignOffset={24} align="end" side="bottom">
                <Tooltip.Trigger as={Button} variant="outlined" severity="secondary">
                    Show Tooltip
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content>
                        <p>Tooltip with 24px align offset</p>
                        <Tooltip.Arrow />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip>
        </div>
    );
}

export default OffsetDemo;

```

### Delay

Use `showDelayDuration` and `hideDelayDuration` to control the delay of the tooltip. For `Tooltip.Group`, use `timeout` and `skipTimeout` instead.

```tsx
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';

export default function DelayDemo() {
    return (
        <div className="card flex flex-col items-center justify-center gap-8">
            <Tooltip showDelayDuration={1000} hideDelayDuration={1000}>
                <Tooltip.Trigger as={Button} severity="secondary">
                    Show Tooltip
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content>
                        <p>This is a tooltip</p>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip>
            <Tooltip.Group as="div" className="flex items-center gap-2" timeout={1000} skipTimeout={300}>
                <Tooltip>
                    <Tooltip.Trigger as={Button} severity="secondary">
                        Item 1
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content>
                            <p>This is a tooltip</p>
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger as={Button} severity="secondary">
                        Item 2
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                        <Tooltip.Content>
                            <p>This is a tooltip</p>
                        </Tooltip.Content>
                    </Tooltip.Portal>
                </Tooltip>
            </Tooltip.Group>
        </div>
    );
}

```

### With ToggleButton

```tsx
import { ToggleButton } from 'primereact/togglebutton';
import { Tooltip } from 'primereact/tooltip';

const content = [
    {
        icon: 'pi pi-align-left',
        label: 'Align left',
        value: 'left'
    },
    {
        icon: 'pi pi-align-center',
        label: 'Align center',
        value: 'center'
    },
    {
        icon: 'pi pi-align-right',
        label: 'Align right',
        value: 'right'
    },
    {
        icon: 'pi pi-align-justify',
        label: 'Align justify',
        value: 'justify'
    }
];

export default function WithToggleButtonDemo() {
    return (
        <div className="card flex items-center justify-center">
            <Tooltip.Group>
                <ToggleButton.Group allowEmpty={false}>
                    {content.map((item) => (
                        <Tooltip key={item.value}>
                            <Tooltip.Trigger as={ToggleButton} value={item.value}>
                                <ToggleButton.Indicator>
                                    <i className={item.icon}></i>
                                </ToggleButton.Indicator>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                                <Tooltip.Content>
                                    <p>{item.label}</p>
                                    <Tooltip.Arrow />
                                </Tooltip.Content>
                            </Tooltip.Portal>
                        </Tooltip>
                    ))}
                </ToggleButton.Group>
            </Tooltip.Group>
        </div>
    );
}

```


# Tooltip Theming

Theming documentation for Tooltip component


## Styled

### CSS Classes

List of class names used in the styled mode.

<DocTable name="Tooltip" category="style" />

### Design Tokens

List of design tokens.

| Token | CSS Variable | Description |
|:------|:------|:------|
| tooltip.max.width | --p-tooltip-max-width | Max width of root |
| tooltip.gutter | --p-tooltip-gutter | Gutter of root |
| tooltip.shadow | --p-tooltip-shadow | Shadow of root |
| tooltip.padding | --p-tooltip-padding | Padding of root |
| tooltip.border.radius | --p-tooltip-border-radius | Border radius of root |
| tooltip.background | --p-tooltip-background | Background of root |
| tooltip.color | --p-tooltip-color | Color of root |


## Unstyled

Theming is implemented with the pass through properties in unstyled mode.

                                             