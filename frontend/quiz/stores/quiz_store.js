const Reflux = require('reflux');
const QuizActions = require('../actions/quiz_actions.js');
const backend = require('../../modules/backend.js');

var QuizStore = Reflux.createStore({
// this will set up listeners to all publishers in SearchActiions, using onKeyname (or keyname) as callbacks
  listenables: [QuizActions],
  questions: [],
  current_question: 0,
  init: function(){
    this.data = this.getInitialState();
  },
  getInitialState: function() {
    return {
      title: "test",
      question: {}
    }
    
  },
  onLoad: function(url_name){
   backend.fetch('quizzes/' + url_name + '.json?')
    .then(this.onLoadCompleted)
    .catch( this.onLoadFailed );
  },
  onLoadCompleted: function(data){
        this.data.title=data.title;
        this.questions = data.questions;
        this.current_question=0;
        this.data.question = this.questions[this.current_question]
        this.trigger(this.data);
  },
  onAnswered: function(answer){
    backend.postJSON('quizzes/answered.json?', 
    {
      quiz_params: {
        url_name: 1
      }
    }).then(this.onAnsweredCompleted)
    .catch( this.onAnsweredFailed );
  },
  onAnsweredCompleted: function(data) {
    this.data.projects = data.projects;
    this.trigger(this.data);
  },
  onAnsweredFailed: function(data){
  }
});
module.exports = QuizStore;
