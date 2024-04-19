// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";
const sassPath = path.resolve(process.cwd(), "src/assets/sass");

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/bundle.[contenthash].js",
  },
  devServer: {
    open: true,
    host: "localhost",
    historyApiFallback: true,
    proxy: [
      {
        context: ["/tasks"],
        target: "http://localhost:5000",
        secure: false,
        changeOrigin: true,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [require("tailwindcss"), require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: '@import "globals";',
              sassOptions: {
                includePaths: [sassPath],
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          partialDirs: [path.join(__dirname, "src", "templates", "partials")],
          helperDirs: [path.join(__dirname, "src", "templates", "helpers")],
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  cache: true,
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "assets/bundle.[contenthash].css",
      })
    );
  } else {
    config.mode = "development";
  }
  return config;
};
