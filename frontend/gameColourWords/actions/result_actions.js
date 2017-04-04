const Reflux = require('reflux');


var ResultActions = Reflux.createActions([
  "AddResult",
  "CorrectAnswer",
  "WrongAnswer"
]);



module.exports = ResultActions;
