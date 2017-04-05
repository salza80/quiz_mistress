const Reflux = require('reflux');


var GameActions = Reflux.createActions([
  "StartLevel",
  "ColourClick",
  "TimedOut",
  "TimeUpdated",
  "Load",
  "AddResult",
  "CorrectAnswer",
  "WrongAnswer"
]);


module.exports = GameActions;
