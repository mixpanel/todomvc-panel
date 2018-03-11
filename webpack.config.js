const path = require('path');

const babelLoader = {
  loader: `babel-loader`,
  options: {
    presets: [`env`],
  },
};

const webpackConfig = {
  entry: './js/app.js',
  output: {
    filename: 'build.js',
    path: path.join(__dirname, 'js')
  },
  module: {
    rules: [
      {
        test: /\.jade$/,
        exclude: /node_modules/,
        use: [
          babelLoader,
          `virtual-jade-loader?vdom=snabbdom&runtime=var h = require("panel").h;`,
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

module.exports = webpackConfig;
