const webpack = require('webpack');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const ENV = process.env.NODE_ENV;
const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: ENV === "development"
});

module.exports = {
    entry: {
        app: './src/app.ts',
        vendor: [
            'react',
            'lodash',
            'moment',
            'react-dom'
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    plugins: [
        extractLess,
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: ['app', 'vendor']
        // }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(ENV)
            }
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CheckerPlugin(),

    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: ['node_modules'],
                loader: 'ts-loader'
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['preset-env', 'react']
                }
            },
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 8998
    }
}