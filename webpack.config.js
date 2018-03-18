const path = require('path');

// set to 'poll' for polling instead of inotify/fsevents
const {WEBPACK_WATCH_METHOD} = process.env;

const babelLoader = {
  loader: `babel-loader`,
  options: {
    presets: [`env`],
  },
};

const webpackConfig = {
  mode: process.env.NODE_ENV || `development`,

  entry: './js/app.js',
  output: {
    filename: 'build.js',
    path: path.join(__dirname, 'js'),
    publicPath: 'js',
  },
  module: {
    rules: [
      {
        test: /\.jade$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
          {
            loader: `virtual-jade-loader`,
            options: {
              vdom: `snabbdom`,
              runtime: `const h = require("panel").h;`,
            }
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
        ],
      },
    ],
  },
};

if (WEBPACK_WATCH_METHOD === `poll`) {
  webpackConfig.watchOptions = {
    aggregateTimeout: 1000,
    poll: 3000,
  };
}

module.exports = webpackConfig;
