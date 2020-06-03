const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV = 'PRODUCTION' ? 'production' : 'development';

const webpack = {
    mode: 'development',
    entry: {
        app: './src/app/index.tsx'
    },
    output: {
        libraryTarget: 'umd',
        globalObject: 'this',
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: "tsconfig.client.json"
                        }
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin()],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};

module.exports = [webpack];
