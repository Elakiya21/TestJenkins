const autoprefixer = require("autoprefixer")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const InterpolateHtmlPlugin = require("interpolate-html-plugin")
const getClientEnvironment = require("./env")
const paths = require("./paths")
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const nodeExternals = require("webpack-node-externals")
const WorkboxPlugin = require("workbox-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = "/"
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = ""
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl)
const webengageCode = env["process.env"].REACT_APP_WEBENGAGE_ID
const cssHelper = require("../src/Common/Server/components/serverCssBuilder")

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
const browserConfig = {
  // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  mode: "development",
  devtool: "cheap-module-source-map",
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  optimization: {
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  entry: {
    bundle: [
      // Include an alternative client for WebpackDevServer. A client's job is to
      // connect to WebpackDevServer by a socket and get notified about changes.
      // When you save a file, the client will either apply hot updates (in case
      // of CSS changes), or refresh the page (in case of JS changes). When you
      // make a syntax error, this client will display a syntax error overlay.
      // Note: instead of the default WebpackDevServer client, we use a custom one
      // to bring better experience for Create React App users. You can replace
      // the line below with these two lines if you prefer the stock client:
      //`${require.resolve("webpack-dev-server/client")}?/`,
      //require.resolve("webpack/hot/dev-server"),
      // require.resolve("react-dev-utils/webpackHotDevClient"),
      // We ship a few polyfills by default:
      require.resolve("./polyfills"),
      // Finally, this is your app's code:
      paths.appIndexJs,
      // We include the app code last so that if there is a runtime error during
      // initialization, it doesn't blow up the WebpackDevServer client, and
      // changing JS code would still trigger a refresh.
    ],
    vendor: [
      "react",
      "react-mdl",
      "react-router-dom",
      "react-redux",
      "redux-form",
      "redux-saga",
      "lodash",
      "moment",
    ],
  },
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: "static/js/[name].js",
    // This is the URL that app is served from. We use "/" in development.
    publicPath,
    // This is for chunking the files based on routing
    chunkFilename: "static/js/[name].[chunkhash:8].chunk.js",
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We read `NODE_PATH` environment variable in `paths.js` and pass paths here.
    // We use `fallback` instead of `root` because we want `node_modules` to "win"
    // if there any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    // fallback: paths.nodePaths,
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    extensions: [".js", ".json", ".jsx", "*"],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      "react-native": "react-native-web",
    },
    // modulesDirectories: ["src", "node_modules"],
    modules: ["src", "node_modules"],
  },

  module: {
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loader: "eslint-loader",
      //   include: paths.appSrc,
      //   enforce: "pre",
      // },
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
      // Process JS with Babel.
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: "babel-loader?cacheDirectory=true",
      },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              minimize: true,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },
      // JSON is not enabled by default in Webpack but both Node and Browserify
      // allow it implicitly so we also enable it.
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      // "file" loader for svg
      {
        test: /\.svg$/,
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    ],
  },
  plugins: [
    //eslint-disable-next-line
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      webengageCode,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    //new webpack.optimize.CommonsChunkPlugin("vendor"),
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
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl,
    }),
    // Generates an `index.html` file with the <script> injected.
    // The bundle.js file is added in the head tag as apart of GDA-9737,
    // by modifying the inject property.
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    //new WatchMissingNodeModulesPlugin(paths.appNodeModules),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
}

const serverConfig = {
  mode: "development",
  entry: {
    server: path.resolve(__dirname, "../script/server_script.js"),
    // flightsDesktop: cssHelper.getFlightsDesktopHomeCss(__dirname),
    // hotelsDesktop: cssHelper.getHotelsDesktopHomeCss(__dirname),
    // homestaysDesktop: cssHelper.getHomestayDesktopHomeCss(__dirname),
    // holidaysDesktop: cssHelper.getHolidayDesktopHomeCss(__dirname),
    // flightsAdaptive: cssHelper.getFlightsAdaptiveHomeCss(__dirname),
    // hotelsAdaptive: cssHelper.getHotelsAdaptiveHomeCss(__dirname),
    // homestaysAdaptive: cssHelper.getHomestayAdaptiveHomeCss(__dirname),
    // holidaysAdaptive: cssHelper.getHolidayAdaptiveHomeCss(__dirname),
    // experiencesDesktop: cssHelper.getExperiencesDesktopHomeCss(__dirname),
    // experiencesAdaptive: cssHelper.getExperiencesAdaptiveHomeCss(__dirname),
    // hotelsSEODesktop: cssHelper.getHotelsSEODesktopCss(__dirname),
    // hotelsSEOAdaptive: cssHelper.getHotelsSEOAdaptiveCss(__dirname),
    // trainsDesktop: cssHelper.getTrainsDesktopHomeCss(__dirname),
    // trainsAdaptive: cssHelper.getTrainsAdaptiveHomeCss(__dirname),
  },
  target: "node",
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
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
          name: "/static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.svg$/,
        loader: "file-loader",
        options: {
          name: "/static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react", "es2016", "es2015"], plugins: ["transform-class-properties"] },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(env),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[hash:8].css",
    }),
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
    new WorkboxPlugin.InjectManifest({
      swSrc: "./public/service-worker.js",
      swDest: "service-worker.js",
    }),
    new ManifestPlugin({
      fileName: "asset-manifest-server.json",
    }),
  ],
  resolve: {
    modules: ["src", "node_modules"],
  },
  externals: [nodeExternals()],
}

module.exports = [browserConfig, serverConfig]
