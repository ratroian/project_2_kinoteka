const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['./scripts/app.ts'],
        authorization: ['./scripts/authorization/authorization.ts'],
        movies: ['./scripts/movies/movies.ts'],
        movie: ['./scripts/movie/movie.ts'],
        filters: ['./scripts/movies/filters/filters-handler.ts'],
    },
    resolve: {
        extensions: ['.ts', '.js'],
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
            chunks: ['main', 'movies', 'filters'],
        }),
        new HtmlWebpackPlugin({
            filename: 'movie.html',
            template: './movie.html',
            favicon: './images/favicons/favicon.png',
            chunks: ['main', 'movie'],
        }),
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            extensions: ['ts, js'],
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(__dirname, './tsconfig.json'),
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
};
