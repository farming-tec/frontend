const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const common = require('./webpack.common.js');
const fs = require('fs');

// Start: Handle Dev Server Policies
const nwp = v => v;
const awp = v => [v];
const fallbackHelper = (v, fallback, wp = nwp) => typeof(v) === 'undefined' ? fallback : wp(v);
const fallbackHostArray = (domain) => fallbackHelper(domain, [], awp);

const inithosts = ["localhost"];
const mqttname = fallbackHostArray(process.env.REACT_MQTT_FQDN);

const hosts = [...inithosts, ...mqttname];
const ports = ["15675", "15673", "32000", "1024"];

const ws_policy = hosts.reduce((policy, host) => {
    return policy + ports.reduce((host_policy, port) => host_policy + 
                `ws://${host}:${port}/ http://${host}:${port}/ https://${host}:${port}/ `
            , "");
}, "");
// End: Handle Dev Server Policies


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
