const createVariants = require('parallel-webpack').createVariants;
const {createConfig} = require('./webpack.common');
const {mode} = require('./package.json');

/// umd is compatible with websites
let umdConfig = createConfig({ libraryTarget: 'umd' });
if (mode === 'development') {
   module.exports = umdConfig; /// parallel-webpack creates options for you
} else {
   let variants = {
      libraryTarget: ['commonjs2', 'amd']
   };
   let variantsConfig = createVariants(variants, createConfig);
   module.exports = [...variantsConfig, umdConfig]; /// parallel-webpack creates options for you
}
