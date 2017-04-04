const Reflux = require('reflux');


var GameActions = Reflux.createActions([
  "StartLevel",
  "ColourClick",
  "TimedOut",
  "TimeUpdated",
  "Load",
]);


module.exports = GameActions;
