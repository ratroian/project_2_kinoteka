const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './scripts/app.js'],
        movies: ['./scripts/movies/movies.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    devServer: {
        port: 4200,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './index.html',
            favicon: "./images/favicons/favicon.png",
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: "signup.html",
            template: './signup.html',
            favicon: "./images/favicons/favicon.png",
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            filename: "movies.html",
            template: './movies.html',
            favicon: "./images/favicons/favicon.png",
            chunks: ['main', 'movies']
        }),
        new CleanWebpackPlugin(),
        new ESLintPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
};