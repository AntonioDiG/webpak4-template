const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const ConfHelper = require('./helpers.config.js');

module.exports = (env, options) => {
    console.log(`This is the Webpack 4 'mode': ${options.mode}`);
    return {
        module: {
            rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.hbs/,
                loader: "handlebars-template-loader"
            },
            {
                test:/\.(s*)css$/,
                use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: ['./src/style/_vars.scss']
                    },
                }]
                /* use: ExtractTextPlugin.extract({ 
                    fallback:'style-loader',
                    use:['css-loader','sass-loader', {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: ['./src/style/_vars.scss']
                        },
                    },],
                }) */
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]',
                        exclude: './src/imgs/'
                    } 
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: { minimize: true }
                }]
            }
            ]
        },
        plugins: [
            new CleanWebpackPlugin('dist', {} ),
            new MiniCssExtractPlugin({
                filename: 'style.[contenthash].css',
            }),
            new HtmlWebPackPlugin(ConfHelper.htmlPluginMinified(options, 'index', 'hbs')),
            new HtmlWebPackPlugin(ConfHelper.htmlPluginMinified(options, 'otherHtmlFile', 'html')),
            new HtmlWebpackInlineSourcePlugin(),
            new HtmlWebpackExcludeAssetsPlugin()
        ]
    };
}
