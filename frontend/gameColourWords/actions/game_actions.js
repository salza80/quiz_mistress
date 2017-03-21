const Reflux = require('reflux');


var GameActions = Reflux.createActions([
  "startLevel",
  "colourClick",
  "levelOver",
  "gameOver",
  "Load"
]);


module.exports = GameActions;
