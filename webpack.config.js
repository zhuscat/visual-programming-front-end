var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
    devtool: 'eval-source-map',
    // 默认寻找文件夹下面的index.js文件
    entry: {
        app: path.resolve(APP_PATH, 'index.jsx'),
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js'
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'Visualize'
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true,
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: APP_PATH,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /(\.scss|\.css)$/,
                loaders: ["style", "css", "sass"],
                include: [
                  APP_PATH,
                  path.resolve(ROOT_PATH, 'styles'),
                  path.resolve(ROOT_PATH, 'node_modules/font-awesome')
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
        ]
    }
};
