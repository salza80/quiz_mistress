const Reflux = require('reflux');
const QuizActions = require('../actions/quiz_actions.js');
const backend = require('../../modules/backend.js');
const Preload =require('image-preloader-promise').default

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
  onLoad: function(url_name, preview){
    this.preview = preview
    backend.fetch('quizzes/' + url_name + '.json?')
      .then(this.onLoadCompleted)
      .catch( this.onLoadFailed );
  },
  onLoadCompleted: function(data){
    images = this.getImages(data)
    this.answers = [];
    this.data.title=data.title;
    this.data.url_name = data.url_name;
    this.questions = data.questions;
    this.current_question=0;
    this.data.question = this.getQuestion();
    this.trigger(this.data);
    Preload.preloadImages(images)
    .then(function(data){
       // console.log('imagesloaded')
    })
    .catch(function(){console.log("error")})
  },
  getPreviewParam: function(){
    if(this.preview){
      return 'preview=true'
    }
    return ''
  },
  getImages: function(data){
    var images = [];
    for( var i=0; i<data.questions.length; i++){
      try{
        images.push(data.questions[i].image.image_file.url)
      }catch(e){}
    } 
    return images;
  },
  finishQuiz: function(){
    
    backend.updateJSON('quizzes/' + this.data.url_name + '.json?' + this.getPreviewParam(), 
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
