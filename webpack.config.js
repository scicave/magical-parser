
var babelOptions = {
   presets: ['@babel/preset-env'],
};

module.exports = {
   mode: 'production',
   watch: true,
   
   entry: './src/Parser.js',
   output: './lib/parser.bundle.js',
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
               loader: 'babel-loader',
               options: babelOptions
            }
         }
      ]
   }

}
