const path = require("path")
const autoprefixer = require("autoprefixer")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")
const InterpolateHtmlPlugin = require("interpolate-html-plugin")
const url = require("url")
const paths = require("./paths")
const getClientEnvironment = require("./env")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const homepagePath = require(paths.appPackageJson).homepage
const homepagePathname = homepagePath ? url.parse(homepagePath).pathname : "/"
const publicUrl = ensureSlash(homepagePathname, false)
const publicPath = ensureSlash(homepagePathname, true)
const env = getClientEnvironment(publicUrl)
const cssNano = require("cssnano")
//const CompressionPlugin = require("compression-webpack-plugin")
//Use above pluging to locally serve gzipped bundle in local environment, when creating production build
const webengageCode = env["process.env"].REACT_APP_WEBENGAGE_ID
const WorkboxPlugin = require("workbox-webpack-plugin")

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith("/")
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1)
  } else if (!hasSlash && needsSlash) {
    return `${path}/`
  }
  return path
}

const cssHelper = require("../src/Common/Server/components/serverCssBuilder")

const browserConfig = {
  mode: "production",
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: "vendor",
          name: "vendor",
          chunks: "all",
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          ecma: 6,
          output: {
            comments: false,
          },
          compress: {
            dead_code: true,
            drop_console: true,
          },
        },
        sourceMap: false,
      }),
    ],
  },
  entry: {
    bundle: [
      require.resolve("./polyfills"),
      paths.appIndexJs,
    ],
    vendor: [
      "react",
      "react-mdl",
      "react-router",
      "react-router-dom",
      "react-redux",
      "redux-form",
      "redux-saga",
      "lodash",
      "moment",
    ],
  },
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "static/js/[name].[hash:8].js",
    chunkFilename: "static/js/[name].[hash:8].chunk.js",
    publicPath,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash:8].css",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      webengageCode,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: [
              ">1%",
              "last 4 versions",
              "Firefox ESR",
              "not ie < 9", // React doesn't support IE8 anyway
            ],
          }),
        ],
      },
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl,
    }),
    new webpack.DefinePlugin(env),
    new OptimizeCSSAssetsPlugin(
      {
        cssProcessor: cssNano,
        cssProcessorOptions: {
          assetNameRegExp: /\.css$/,
          discardComments: { removeAll: true },
          reduceIdents: false,
        },
      }
    ),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
    }),
    // new CompressionPlugin({
    //   test: /\.js/,
    //   algorithm: "gzip",
    // }),
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx", "*"],
    alias: {
      "react-native": "react-native-web",
    },
    modules: ["src", "node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          //"postcss-loader",
          {
            loader: "postcss-loader",
            options: {
              config: {
                ctx: {
                  cssnano: {
                    reduceIdents: false,
                  },
                },
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/,
        ],
        // loader, query and exclude
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: "babel-loader?cacheDirectory=true",
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.svg$/,
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    ],
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
}

// const serverConfig = {
//   mode: "production",
//   optimization: {
//     occurrenceOrder: true,
//     splitChunks: {
//       cacheGroups: {
//         default: false,
//         commons: {
//           test: "vendor",
//           name: "vendor",
//           chunks: "all",
//         },
//       },
//     },
//     minimizer: [
//       new UglifyJsPlugin({
//         parallel: true,
//         uglifyOptions: {
//           ecma: 6,
//           output: {
//             comments: false,
//           },
//           compress: {
//             dead_code: true,
//             drop_console: true,
//           },
//         },
//         sourceMap: false,
//       }),
//     ],
//   },
//   output: {
//     path: path.resolve(__dirname, "../build"),
//     filename: "[name].js",
//   },
//   entry: {
//     server: path.resolve(__dirname, "../script/server_script.js"),
//     flightsDesktop: cssHelper.getFlightsDesktopHomeCss(__dirname),
//     hotelsDesktop: cssHelper.getHotelsDesktopHomeCss(__dirname),
//     homestaysDesktop: cssHelper.getHomestayDesktopHomeCss(__dirname),
//     holidaysDesktop: cssHelper.getHolidayDesktopHomeCss(__dirname),
//     flightsAdaptive: cssHelper.getFlightsAdaptiveHomeCss(__dirname),
//     hotelsAdaptive: cssHelper.getHotelsAdaptiveHomeCss(__dirname),
//     homestaysAdaptive: cssHelper.getHomestayAdaptiveHomeCss(__dirname),
//     holidaysAdaptive: cssHelper.getHolidayAdaptiveHomeCss(__dirname),
//     experiencesDesktop: cssHelper.getExperiencesDesktopHomeCss(__dirname),
//     experiencesAdaptive: cssHelper.getExperiencesAdaptiveHomeCss(__dirname),
//     hotelsSEODesktop: cssHelper.getHotelsSEODesktopCss(__dirname),
//     hotelsSEOAdaptive: cssHelper.getHotelsSEOAdaptiveCss(__dirname),
//     trainsDesktop: cssHelper.getTrainsDesktopHomeCss(__dirname),
//     trainsAdaptive: cssHelper.getTrainsAdaptiveHomeCss(__dirname),
//   },
//   target: "node",
//   module: {
//     rules: [
//       {
//         exclude: [
//           /\.html$/,
//           /\.(js|jsx)$/,
//           /\.css$/,
//           /\.json$/,
//           /\.svg$/,
//         ],
//         // loader, query and exclude
//         loader: "url-loader",
//         options: {
//           limit: 10000,
//           name: "/static/media/[name].[hash:8].[ext]",
//         },
//       },
//       {
//         test: /\.svg$/,
//         loader: "file-loader",
//         options: {
//           name: "/static/media/[name].[hash:8].[ext]",
//         },
//       },
//       {
//         test: /\.css$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           "css-loader",
//           "postcss-loader",
//           "sass-loader",
//         ],
//       },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /(node_modules)/,
//         loader: "babel-loader",
//         query: { presets: ["react", "es2016", "es2015"], plugins: ["transform-class-properties"] },
//       },
//     ],
//   },
//   plugins: [
//     new webpack.DefinePlugin(env),
//     new MiniCssExtractPlugin({
//       filename: "static/css/[name].[hash:8].css",
//     }),
//     new webpack.LoaderOptionsPlugin({
//       options: {
//         postcss: [
//           autoprefixer({
//             browsers: [
//               ">1%",
//               "last 4 versions",
//               "Firefox ESR",
//               "not ie < 9", // React doesn't support IE8 anyway
//             ],
//           }),
//         ],
//       },
//     }),
//     // new CompressionPlugin({
//     //   test: /\.js/,
//     //   algorithm: "gzip",
//     // }),
//     new OptimizeCSSAssetsPlugin(),
//     new WorkboxPlugin.InjectManifest({
//       swSrc: "./public/service-worker.js",
//       swDest: "service-worker.js",
//     }),
//     new ManifestPlugin({
//       fileName: "asset-manifest-server.json",
//     }),
//   ],
//   resolve: {
//     modules: ["src", "node_modules"],
//   },
//   externals: [nodeExternals()],
// }
module.exports = [browserConfig]
