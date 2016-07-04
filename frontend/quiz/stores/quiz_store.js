const Reflux = require('reflux');
const QuizActions = require('../actions/quiz_actions.js');
const backend = require('../../modules/backend.js');

var QuizStore = Reflux.createStore({
// this will set up listeners to all publishers in SearchActiions, using onKeyname (or keyname) as callbacks
  listenables: [QuizActions],
  init: function(){
    this.data = this.getInitialState();
    this.trigger(this.data)
  },
  getInitialState: function() {
    return  {
      quiz: {
        title: "Test"
      }
    };
  },
  onAnswered: function(answer){
    backend.postJSON('quizzes/answered.json?', 
    {
      quiz_params: {
        quiestion_id: 1
      }
    }).then(this.onAnsweredCompleted)
    .catch( this.onAnsweredFailed );
  },
  onAnsweredCompleted: function(data) {
    this.data.last_executed = "simple";
    this.data.projects = data.projects;
    this.data.aggs = data.aggs;
    this.data.searchInfo = data.result;
    this.trigger(this.data);
  },
  onAnsweredFailed: function(data){
  }
});
module.exports = QuizStore;
