const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new Dotenv({
          path: './.env',
          safe: './.env.example',
          systemvars: true,
          silent: false,
          defaults: false
        }),  
    ]    
});