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
                { from: 'node_modules/katex/dist/katex.min.css', to: '../static/css/' },
                { from: 'node_modules/vega/build/vega.min.js', to: '../static/js/' },
                { from: 'node_modules/vega/build/vega-schema.json', to: '../static/schema/' },
                { from: 'node_modules/vega-lite/build/vega-lite.min.js', to: '../static/js/' },
                { from: 'node_modules/vega-lite/build/vega-lite-schema.json', to: '../static/schema/' },
                { from: 'node_modules/vega-embed/build/vega-embed.min.js', to: '../static/js/' },
                { from: 'node_modules/vega-themes/build/vega-themes.min.js', to: '../static/js/' },
            ]
        })
    ],
};
