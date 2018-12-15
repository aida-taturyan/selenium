var path = require("path");
var webpack = require("webpack");
module.exports = {
    entry: "./Row_Tests/ROW_signup.js",
    output: {
        path: path.resolve(__dirname, "Result"),
        filename: "signup.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                query: {
                    presets: ["@babel/preset-env", "@babel/preset-flow"]
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: "source-map",
    mode: 'development'
};