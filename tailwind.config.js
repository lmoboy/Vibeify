import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: '#00ff00',
                    dark: '#00cc00',
                    light: '#33ff33',
                },
                dark: {
                    DEFAULT: '#121212',
                    lighter: '#1a1a1a',
                    darker: '#0a0a0a',
                },
            },
        },
    },

    plugins: [forms],
};
