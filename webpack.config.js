const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './index.js',
    mode: 'production',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'node_modules/katex/dist/fonts', to: '../static/css/fonts/' },
                { from: 'node_modules/katex/dist/katex.min.css', to: '../static/css/' },
                { from: 'node_modules/katex/dist/katex.min.js', to: '../static/js/' },
                { from: 'node_modules/katex/dist/contrib/auto-render.min.js', to: '../static/js/' },
            ]
        })
    ],
};
