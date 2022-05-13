module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            height: {
                "header": 'theme(height.8)',
                "footer": 'theme(height.8)'
            },
            margin: {
                "header": 'theme(height.8)',
                "footer": 'theme(height.8)',
            }
        },
    },
    plugins: [],
};
