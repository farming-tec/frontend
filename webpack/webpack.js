const crypto = require('crypto');
const hash = crypto.randomBytes(12).toString('hex');

module.exports = {
    babel: require('./babel'),
    hotLoader: require('./hotLoader'),
    imgLoader: require('./imgLoader')(hash),
    postCSS: require('./postCSS')(hash)
}
