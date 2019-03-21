const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, './'),
    devtool: "source-map",

    entry: {
        app: path.resolve(__dirname, "modules/index.js"),
    },

    output: {
        path: path.resolve(__dirname, "build"),
        filename: `bundle-[chunkHash].js`,
        chunkFilename: `[name]-[chunkHash].js`,
        publicPath: "/"
    },

    plugins: [
        new webpack.ProvidePlugin({
            Promise: ['es6-promise', 'Promise']
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(
                process.env.NODE_ENV || "development"
            )
        }),
        new HTMLWebpackPlugin({
            template: "index.html.ejs"
        }),
        new CopyWebpackPlugin([{ from: path.resolve(__dirname, "static") }])
    ].concat(
        process.env.NODE_ENV === "production"
            ? [
                new SWPrecacheWebpackPlugin({
                    cacheId: "hbgj-components-website",
                    staticFileGlobsIgnorePatterns: [/\.map$/]
                })
            ]
            : []
    ),

    optimization: {
        splitChunks: {
            name: "vendor"
        }
    },

    resolve: {
        alias: {
            // "QuickApi": path.resolve(__dirname, "../packages/quickapi")
        }
    },

    resolveLoader: {
        modules: [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, "webpack")
        ]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules|examples/,
                loader: "babel-loader"
            },
            {
                test: /\.js$/,
                include: /examples/,
                resourceQuery: /bundle/,
                use: [
                    {
                        loader: "bundle-loader",
                        options: {
                            lazy: true
                        }
                    },
                    { loader: "babel-loader" }
                ]
            },
            {
                test: /\.js$/,
                include: /examples/,
                resourceQuery: /prismjs/,
                use: [
                    {
                        loader: "bundle-loader",
                        options: {
                            lazy: true
                        }
                    },
                    {
                        loader: "prismjs-loader",
                        options: {
                            lang: "jsx"
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /prismjs/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }]
            },
            {
                test: /\.css$/,
                include: /prismjs/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }]
            },
            {
                test: /\.md(\?(.+))?$/,
                loader: "markdown-loader"
            },
            {
                test: /\.(gif|jpe?g|png|ico)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },

    devServer: {
        historyApiFallback: true,
        quiet: false,
        noInfo: false,
        stats: {
            assets: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: true
        }
    }
};
