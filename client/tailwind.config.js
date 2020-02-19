module.exports = {
    theme: {
        alphaColors: ['gray.100'],
        extend: {},
        filter: {
            'grayscale': 'grayscale(1)',
        },
        inset: {
            '1/2': '50%',
        },
    },
    variants: {
        'visibility': ['hover', 'group-hover'],
    },
    plugins: [
        require('tailwindcss-bg-alpha')(),
        require('tailwindcss-filters'),
    ],
};
