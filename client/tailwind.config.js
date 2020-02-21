module.exports = {
    theme: {
        alphaColors: ['gray.100'],
        extend: {},
        filter: {
            'grayscale': 'grayscale(1)',
        },
        inset: {
            '1/2': '50%',
            'full': '100%',
        },
        opacity: {
            '0': '0',
            '25': '.25',
            '50': '.5',
            '75': '.75',
            '90': '.9',
            '100': '1',
        }
    },
    variants: {
        'visibility': ['hover', 'group-hover'],
    },
    plugins: [
        require('tailwindcss-bg-alpha')(),
        require('tailwindcss-filters'),
    ],
};
