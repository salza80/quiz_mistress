const Reflux = require('reflux');


var GameActions = Reflux.createActions([
  "startLevel",
  "colourClick",
  "TimedOut",
  "gameOver",
  "Load"
]);


module.exports = GameActions;
