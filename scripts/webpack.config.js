// #TODO minimize javascript in production mode.

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const util = require("./util");
const rel = util.rel;

const inDevMode = (process.env.NODE_ENV !== "production");
const inProdMode = !inDevMode;

const extractCSS = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: inDevMode
});

const defs = {
    current: {},

    common: {
    },

    dev: {
        // "process.env.API_ORIGIN": JSON.stringify("http://localhost:8080/v1/"),
        "process.env.API_ORIGIN": `window.location.origin + '/v1'`,
        "process.env.NODE_ENV": JSON.stringify("development")
    },

    prod: {
        "process.env.API_ORIGIN": `window.location.origin + '/v1'`,
        "process.env.NODE_ENV": JSON.stringify("production")
    }
};
defs.current = Object.assign(defs.current, defs.common, inDevMode ? defs.dev : defs.prod);

const emotionPlugin = inDevMode ?
    (["emotion", { "sourceMap": true, "autoLabel": true }]) :
    (["emotion", { "hoist": true }]);
const babelOptions = {
    presets: [
        "@babel/preset-react",
        [
            "@babel/preset-env", {
                "targets": {
                    "browsers": "last 2 versions"
                },
                "exclude": ["transform-regenerator"]
            }
        ]
    ],
    // #FIXME this causes a lot of errors on build, not sure why.
    // usually I need this thing but now it's suddenly a problem.
    // plugins: ["@babel/plugin-transform-runtime"],
    plugins: [
        "transform-decorators-legacy",
        "react-hot-loader/babel",
        emotionPlugin
    ]
};

// if (inProdMode) {
//     // #NOTE { removeUndefined: true } is there to fix this weird error: https://github.com/babel/minify/issues/790
//     babelOptions.presets.push(["minify", { removeUndefined: false }]);
// }

module.exports = {
    entry: rel.src("index.tsx"),
    output: {
        path: rel.build("."),
        filename: "[name].bundle.js",
        publicPath: "/play/",
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    { loader: "babel-loader", options: babelOptions },
                    { loader: "awesome-typescript-loader" }
                ]
            },

            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: { loader: "babel-loader", options: babelOptions }
            },
            
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: inDevMode,
                                minimize: inProdMode,
                                modules: true,
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            }
                        }
                    ]
                })
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: inDevMode,
                                minimize: inProdMode,
                                modules: true,
                                camelCase: true,
                                importLoaders: 1,
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: inDevMode
                            }
                        }
                    ]
                })
            },

            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: (file) => (inDevMode ? "[path][name].[ext]" : "[path][hash].[ext]"),
                        context: rel.src("static"),
                        publicPath: "/play/static/",
                        outputPath: "static/",
                    }
                }]
            }
        ]
    },

    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Authorization",
        },
        publicPath: "/play/",
        // contentBase: rel.build("."),
        compress: true,
        port: 9000,
        historyApiFallback: {
            // logger: console.log.bind(console),
            rewrites: [
                { from: /\/play\/?$/, to: "/play/index.html" },
                { from: /\/play\/\w+\/?$/, to: "/play/index.html" },
                { from: /\/play\/game\/[^\/]+\/?$/, to: "/play/index.html" },
            ]
        },
        hot: true,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: rel.build("index.html"),
            hash: inProdMode,
            minify: false,
            extra: {
                reactURL: inDevMode ? "https://unpkg.com/react@16/umd/react.development.js" : "https://unpkg.com/react@16/umd/react.production.min.js",
                reactDOMUrl: inDevMode ? "https://unpkg.com/react-dom@16/umd/react-dom.development.js" : "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
            }
        }),
        new webpack.DefinePlugin(defs.current),
        extractCSS
    ],

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
            // global sass
            "gsass": rel.src("sass")
        }
    },

    // #TODO this works fine for development builds (see: index.html), but I need something else for production.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    devtool: inDevMode ? 'source-map' : ""
};

if (inProdMode) {
    // #NOTE { removeUndefined: true } is there to fix this weird error: https://github.com/babel/minify/issues/790
    module.exports.plugins.push(new MinifyPlugin({ removeUndefined: false }, {}))

    module.exports.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: function(module) {
            // ignore CSS files
            if(module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
                return false;
            }
            return module.context && module.context.includes("node_modules");
        }
    }));
}
