const { environment } = require('@rails/webpacker')

environment.loaders.append('fileloader', {
  test: /\.(jpg|mp3|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
  use: 'file-loader'
})
module.exports = environment
