const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './scripts/app.js'],
        authorization: ['./scripts/authorization/authorization.js'],
        movies: ['./scripts/movies/movies.js'],
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
            filename: 'index.html',
            template: './index.html',
            favicon: './images/favicons/favicon.png',
            chunks: ['main', 'authorization'],
        }),
        new HtmlWebpackPlugin({
            filename: 'signup.html',
            template: './signup.html',
            favicon: './images/favicons/favicon.png',
            chunks: ['main', 'authorization'],
        }),
        new HtmlWebpackPlugin({
            filename: 'movies.html',
            template: './movies.html',
            favicon: './images/favicons/favicon.png',
            chunks: ['main', 'movies'],
        }),
        new HtmlWebpackPlugin({
            filename: 'movie.html',
            template: './movie.html',
            favicon: './images/favicons/favicon.png',
            chunks: ['main', 'movie'],
        }),
        new CleanWebpackPlugin(),
        new ESLintPlugin(),
    ],
};
