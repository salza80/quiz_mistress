
var path = require('path');
var webpack = require('webpack');
var config = module.exports = {
    // the base path which will be used to resolve entry points
    context: __dirname,
    // the main entry point for our application's frontend JS
    entry: {
      quiz: ['whatwg-fetch', './frontend/quiz/index.js'],
      gameColourWords: ['whatwg-fetch', './frontend/gameColourWords/index.js']
    },
};

config.output = {
    // this is our app/assets/javascripts directory, which is part of the Sprockets pipeline
    path: path.join(__dirname, 'app', 'assets', 'javascripts','webpack'),
    // the filename of the compiled bundle, e.g. app/assets/javascripts/bundle.js
    filename: "[name]-bundle.js",
    // if the webpack code-splitting feature is enabled, this is the path it'll use to download bundles
    publicPath: '/assets',
};
config.resolve = {
    // tell webpack which extensions to auto search when it resolves modules. With this,
    // you'll be able to do `require('./utils')` snstead of `require('./utils.js')`
    extensions: ['', '.js', '.coffee', '.jsx', '.wav'],
    // by default, webpack will search in `web_modules` and `node_modules`. Because we're using
    // Bower, we want it to look in there too
    //modulesDirectories: [ 'node_modules', 'bower_components' ],
};
/*
config.plugins = [
    // we need this plugin to teach webpack how to find module entry points for bower files,
    // as these may not have a package.json file
    new webpack.ResolverPlugin([
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
    ])
];
*/
config.module = {
    loaders: [
      {
        test : /\.jsx$/,
        loader : 'babel',
        exclude : /node_modules/,
        query : {
          presets : ['es2015', 'react'],
        }
      },
      { test: /\.coffee$/, loader: 'coffee-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { 
        test: /\.wav$/,  
        loader: 'file-loader', 
        query: {
              name: '[name][md5:hash].[ext]', // Name of bundled asset
              outputPath: '../../../../public/assets/webpack/webpack-assets/',  // Output location for assets. Final: `app/assets/webpack/webpack-assets/`
              publicPath: '/assets/webpack/webpack-assets/' // Endpoint asset can be found at on Rails server
            }
        }
    ]
};


