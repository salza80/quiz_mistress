const Reflux = require('reflux');
const QuizActions = require('../actions/quiz_actions.js');
const backend = require('../../modules/backend.js');

var QuizStore = Reflux.createStore({
// this will set up listeners to all publishers in SearchActiions, using onKeyname (or keyname) as callbacks
  listenables: [QuizActions],
  questions: [],
  answers:[],
  current_question: 0,
  init: function(){
    this.data = this.getInitialState();
  },
  getInitialState: function() {
    return {
      title: "",
      url_name: "",
      question: {}
    }
    
  },
  getQuestion: function(){
    return this.questions[this.current_question];
  },
  getNextQuestion: function(){
    if(this.current_question < this.questions.length - 1){
      this.current_question +=1;
      return this.getQuestion();
    }else {return undefined;}
  },
  onLoad: function(url_name){
   backend.fetch('quizzes/' + url_name + '.json?')
    .then(this.onLoadCompleted)
    .catch( this.onLoadFailed );
  },
   onLoadCompleted: function(data){
      this.answers = [];
      this.data.title=data.title;
      this.data.url_name = data.url_name;
      this.questions = data.questions;
      this.current_question=0;
      this.data.question = this.getQuestion();
      this.trigger(this.data);
  },
  finishQuiz: function(){
    console.log(this.answers)
    backend.updateJSON('quizzes/' + this.data.url_name + '.json?', 
    {
      result: {
        answers: this.answers
      }
    }).then(this.onFinishQuizCompleted)
    .catch( this.onFinishQuizFailed );
  },
  onFinishQuizFailed: function(){},
  onFinishQuizCompleted: function(data) {
    window.location = data.redirect_to
  },
  onAnswerQuestion: function(answer){
    this.answers.push({question_id: this.data.question.id, answer_id: answer.id});
    this.data.question = this.getNextQuestion();
    if (this.data.question === undefined){
      this.finishQuiz();
    } else{
      this.trigger(this.data)
    }
  },
  onAnswerQuestionCompleted: function(data) {
    this.data.projects = data.projects;
    this.trigger(this.data);
  },
  onAnsweredFailed: function(data){
  }
});
module.exports = QuizStore;
