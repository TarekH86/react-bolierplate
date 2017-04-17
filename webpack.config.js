const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "./app/styles/app.css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
    entry: [
        'jquery/dist/jquery.min.js',
        'foundation-sites/dist/js/foundation.min.js',
        './app/app.jsx',
    ],
    externals: {
        foundation: 'Foundation'
    },
    plugins: [
        extractSass,
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
    options: {
        context: '/', 
        sassLoader: {
            includePaths: [
                path.resolve(__dirname, './node_modules/foundation-sites/scss'),
            ]
        }
    }
})
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js',
    },
    resolve: {
        alias: { // to import without using directories:
            Main: path.resolve(__dirname, 'app/components/main.jsx'),
            apllicationStyle: path.resolve(__dirname, 'app/styles/app.scss'),
            CSS: path.resolve(__dirname, 'app/styles/app.css'),
        },
        extensions: [".js", ".jsx"] // to enables users to leave off the extension when importing
    },
    module: {

        rules: [
            {
                test: /\.(jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'

            },
              {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
         
        ]
    },
    devtool: 'cheap-module-eval-source-map',
}