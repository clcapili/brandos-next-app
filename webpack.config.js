const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');;

dotenv.config();

module.exports = {
        // the output bundle won't be optimized for production but suitable for development
        mode: 'development',
        // the app entry point is /src/index.js
        entry: path.resolve(__dirname, 'src', 'index.js'),
        devtool: false,
        output: {
            // the output of the webpack build will be in /dist directory
            path: path.resolve(__dirname, 'public/js'),
            // the filename of the JS bundle will be bundle.js
            filename: '[name].bundle.js',
            chunkFilename: '[name].chunk.bundle.js',
        },
        plugins: [
            // new BundleAnalyzerPlugin(),
            new HtmlWebpackPlugin({
                inject: 'body',
                template: './src/index.html',
                filename: path.resolve(__dirname, 'public', 'index.html'),
                publicPath: '/js',
            })
        ],
        module: {
            rules: [
                {
                    // for any file with a suffix of js or jsx
                    test: /\.js|\.jsx$/,
                    // ignore transpiling JavaScript from node_modules as it should be that state
                    exclude: /node_modules/,
                    // use the babel-loader for transpiling JavaScript to a suitable format
                    loader: 'babel-loader',
                    options: {
                        // attach the presets to the loader (most projects use .babelrc file instead)
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                }
            ]
        },
        externals: {
            // global app config object
            config: JSON.stringify({
                apiDomain: process.env.DOMAIN_API,
                appDomain: process.env.DOMAIN_APP,
                storageDomain: process.env.DOMAIN_STORAGE,
                domainCName: process.env.DOMAIN_CNAME
            })
        }
};