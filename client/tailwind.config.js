module.exports = {
    corePlugins: {
        cursor: false,
    },
    theme: {
        alphaColors: ['gray.100', 'gray.500', 'red.500', 'green.500'],
        extend: {
            gridRow: {
                'span-11': 'span 11 / span 11',
            },
            gridTemplateRows: {
                '12': 'repeat(12, minmax(0, 1fr))',
            },
        },
        filter: {
            grayscale: 'grayscale(1)',
        },
        fontFamily: {
            gothic: ['NanumGothicCoding'],
        },
        inset: {
            '1/2': '50%',
            full: '100%',
        },
        opacity: {
            '0': '0',
            '25': '.25',
            '50': '.5',
            '75': '.75',
            '90': '.9',
            '100': '1',
        },
    },
    variants: {
        visibility: ['hover', 'group-hover'],
    },
    plugins: [
        require('tailwindcss-bg-alpha')(),
        require('tailwindcss-filters'),
    ],
};
