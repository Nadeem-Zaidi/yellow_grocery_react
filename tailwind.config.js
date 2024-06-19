// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     screens: {
//       sm: '480px',
//       md: '768px',
//       lg: '976px',
//       xl: '1440px',
//     },
//     colors: {
//       primary: {
//         DEFAULT: '#6d28d9', // Primary color
//         dark: '#5b21b6',    // Darker shade of primary color
//         light: '#8b5cf6',
//         light_50: '#ede9fe',  // Lighter shade of primary color
//       },
//       secondary: {
//         DEFAULT: '#7e5bef', // Secondary color
//         dark: '#5b21b6',    // Darker shade of secondary color
//         light: '#ddd6fe',   // Lighter shade of secondary color
//       },
//       accent: {
//         DEFAULT: '#fbbf24', // Accent color
//         dark: '#f59e0b',    // Darker shade of accent color
//         light: '#fde68a',   // Lighter shade of accent color
//       },
//       // Other colors
//       gray: {
//         dark: '#273444',
//         DEFAULT: '#8492a6',
//         light: '#d3dce6',
//       },
//       white: '#ffffff',

//       green: '#13ce66',
//       yellow: '#ffc82c',
//       pink: '#ff49db',
//       orange: '#ff7849',
//       blue: '#1fb6ff',
//       purple: '#7e5bef',
//     },
//     fontFamily: {
//       sans: ['Graphik', 'sans-serif'],
//       serif: ['Merriweather', 'serif'],
//     },
//     extend: {
//       spacing: {
//         '128': '32rem',
//         '144': '36rem',
//       },
//       borderRadius: {
//         '4xl': '2rem',
//       }
//     },
//     extend: {
//       textColor: {
//         'on-primary': {
//           DEFAULT: 'white', // Default text color when background is primary
//           dark: 'black',   // Text color for dark variant of primary background
//           // Add additional variants if needed
//         },
//       },
//     },
//   },

//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary: {
        DEFAULT: '#4f46e5', // Primary color
        dark: '#4338ca',    // Darker shade of primary color
        light: '#6366f1',
        light_50: '#ede9fe',
        light_200: '#c7d2fe',
        light_300: '#a5b4fc',
      },
      secondary: {
        DEFAULT: '#7e5bef', // Secondary color
        dark: '#5b21b6',    // Darker shade of secondary color
        light: '#ddd6fe',   // Lighter shade of secondary color
      },
      accent: {
        DEFAULT: '#fbbf24', // Accent color
        dark: '#f59e0b',    // Darker shade of accent color
        light: '#fde68a',   // Lighter shade of accent color
      },
      // Other colors
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        dark: '#273444',
        DEFAULT: '#8492a6',
        light: '#d3dce6',
      },
      white: '#ffffff',
      green: '#13ce66',
      yellow: '#ffc82c',
      pink: '#ff49db',
      orange: '#ff7849',
      blue: '#1fb6ff',
      purple: '#7e5bef',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      textColor: {
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        'on-primary': {
          DEFAULT: 'white', // Default text color when background is primary
          dark: 'black',   // Text color for dark variant of primary background
        },
      },
      // Custom table styles
      table: {
        primary: {
          borderColor: '#6d28d9',
          headerBgColor: '#8b5cf6',
          headerTextColor: '#ffffff',
          rowBgColor: '#ede9fe',
          rowTextColor: '#273444',
          hoverBgColor: '#d3dce6',
        },
      },
      borderColor: {
        'focus-blue': '#6d28d9',
      },
      outline: {
        'none': 'none',
      },
      fill: {
        'blue-600': '#2563eb', // Custom fill color
      },
    },
  },
  plugins: [],
};
