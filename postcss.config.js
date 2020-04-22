const fs = require('fs');
const path = require('path');

// Replace %{any}/ to ''
const normAsset = asset => asset.replace(/^(%([A-Za-z0-9_-]+)\/)/g, '');
const isPNG = asset => /(\.png)$/.test(asset);
const isJPG = asset => /(\.jpg)$/.test(asset);

// Get the path of local assets using the format %images
const localAsset = (asset, { hash }) => {
    const original = normAsset(asset.url);
    const urlpath = `/images/${hash}/${original}`;
    const src_path = path.join(__dirname, 'src', 'images', original);
        
    // Return a value, if not, postcss-url does not work
    if(!fs.existsSync(src_path)) return "''";
    const stats = fs.statSync(src_path);
    const size = stats.size / 1024;

    // TODO sync size[8] with build procedure
    if(size > 8) return urlpath;

    // Conver file to base64
    const base64 = fs.readFileSync(src_path, 'base64');
    if(isPNG(original)) return `data:image/png;base64,${base64}`
    if(isJPG(original)) return `data:image/jpeg;base64,${base64}`
    return base64;
}

module.exports = ({ options: opts }) => ({
    plugins: [
        require('postcss-easy-import')({
            extensions: [".css", ".pcss"],
            path: "src"
        }),
        require('precss'),
        require('autoprefixer'),
        
        // The filter option is referenced to absolutePath
        // It is the path where the "pcss file" is located
        require('postcss-url')([
            { filter: "**/%images/**/*.+(jpg|png)", url: a => localAsset(a, opts) }
        ]),

        require('cssnano')            
    ]
});
