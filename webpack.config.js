var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var entryPath = path.join(__dirname, 'app');        //path to input dir
var assetsPath = path.join(__dirname, 'assets');    //path to output dir

var config = {
    context: entryPath,
    entry: {
      styles: './styles.js' 
    },
    output: {
      path: assetsPath,
      filename: "[name].js",
      sourceMapFilename: "[file].map",
      chunkFilename: "[name].[id].js",
      publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: 'css-loader'
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [autoprefixer('last 3 version', 'ie >= 10')]
                                }
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                paths: [
                                    path.resolve(entryPath)
                                ],
                                plugins: [
                                    require('less-plugin-glob')
                                ]
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
    ],
    watch: false
};

module.exports = config;