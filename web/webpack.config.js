const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.REACT_APP_SERVER_HOST': JSON.stringify(process.env.REACT_APP_SERVER_HOST),
            'process.env.REACT_APP_SERVER_PORT': JSON.stringify(process.env.REACT_APP_SERVER_PORT),
        }),
    ],
};
