const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const common = require('./webpack.common.js');
const fs = require('fs');

console.log("process.env.REACT_CONTAINER_PORT");
console.log(process.env.REACT_CONTAINER_PORT);
const computer_ip = "172.31.255.8"
const ws_policy = `ws://localhost:1883/ ws://localhost:15675/ ws://${computer_ip}:15675/ ws://${computer_ip}:32000/ wss://${computer_ip}:15673/`


module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, "public"),
        port: process.env.REACT_CONTAINER_PORT,
        host: '0.0.0.0',
        disableHostCheck: true, 
        historyApiFallback: true,
        headers: {
            'Content-Security-Policy': `default-src data: 'self' https://fonts.gstatic.com/ https://gg.requestcatcher.com/test https://kit-free.fontawesome.com/ https://www.youtube.com/ ${ws_policy}; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://kit.fontawesome.com/; img-src 'self' data:; media-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/ https://kit-free.fontawesome.com/; connect-src ${ws_policy}`
        },
        // https: true,
        inline: true,
        hot: true
        // liveReload: true
    },
    // Watch required for vagrant filesystem over network
    watch: true,
    watchOptions: {
        poll: true
    },
    plugins: [
        new Dotenv({
          path: '.env',
          safe: '.env.example',
          systemvars: true,
          silent: false,
          defaults: false
        })
    ]
});
