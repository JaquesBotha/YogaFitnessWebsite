const path = require('path');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const config = {
        mode: isProduction ? 'production' : 'development',
        entry: './src/js/main.js',
        output: 
        {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist/js'),
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                      'style-loader', // 3. Inject styles into DOM
                      'css-loader',   // 2. Turn css into commonjs
                      'sass-loader'   // 1. Turn scss into css
                    ],
                },
            ],
        },
    };
    return config;
};
