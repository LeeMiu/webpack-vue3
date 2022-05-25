const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'production'
const prodPlugins = []

if (isProd) {
    prodPlugins.push(new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
    }))
}

// 获取所有的module目录下的文件

// const files = require.context('@/module/', false, /\.vue$/)
// console.log('require>>>>>>>>>>>>>>>>>', require.context)

// console.log('files', files);
// let paths = files.keys();
// console.log('paths', paths);


module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        clean: isProd,
        filename: '[name].[contenthash].js'
    },
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                secure: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                type: 'asset'
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset/resource'
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        exclude: [
                            /node_modules[\\\/]core-js/,
                            /node_modules[\\\/]webpack[\\\/]buildin/,
                        ],
                        presets: [['@babel/preset-env', {
                            useBuiltIns: 'usage',
                            corejs: 3
                        }]]
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env'
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-vue3',
            template: './public/index.html'
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'public'),
                to: path.resolve(__dirname, 'dist'),
                toType: 'dir',
                filter: resourcePath => {
                    return !/\.html$/.test(resourcePath)
                }
            }]
        }),
        ...prodPlugins
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    }
}