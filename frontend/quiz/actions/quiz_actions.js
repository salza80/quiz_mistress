const Reflux = require('reflux');


var QuizActions = Reflux.createActions([
  "answerQuestion",
  "prevQuestion",
  "Load"
]);


module.exports = QuizActions;
