const Reflux = require('reflux');
const GameActions = require('../actions/game_actions.js');
//const backend = require('../../modules/backend.js');

var GameStore = Reflux.createStore({
// this will set up listeners to all publishers in SearchActiions, using onKeyname (or keyname) as callbacks
  listenables: [GameActions],
  level: {},
  all_colours: [],
  question: {},
  init: function(){
    this.data = this.getInitialState();
  },
  getInitialState: function() {
    
    return {
      level: {
              no:0,
              running: false,
              title:"Level 1",
              question: {},
              colours: []
            }
          }    
  },
  initGameData: function(){
    this.all_colours.push({ hex: "#FF0000", title:"Red"})
    this.all_colours.push({ hex: "#FFFF00", title:"Yellow"})
    this.all_colours.push({ hex: "#00FF00", title:"Green"})
    this.all_colours.push({ hex: "#00FFFF", title:"Light blue"})
    this.all_colours.push({ hex: "#0000FF", title:"Dark blue"})
  },
  setNextLevel: function(){
    //add one if empty
    if(this.data.level.colours.length==0){
      this.data.level.colours.push(this.all_colours.pop()) 
    }
    this.data.level.no +=1
    this.data.level.running=false
    this.data.level.title = "Level " + String(this.data.level.no)
    this.data.level.colours.push(this.all_colours.pop()) 
    for( var i=0; i<this.data.level.colours.length; i++){
      try{
        this.data.level.colours[i]["complete"] = false;
      }catch(e){}
    }
    this.data.level.colours = this.shuffleArray(this.data.level.colours)
    this.data.level.question=this.getNextQuestion()
  },
  getNextQuestion: function(){
    var coloursCopy = this.getRemainigColours();
    if (coloursCopy.length ==0){
      this.setNextLevel()
      return this.getNextQuestion()
    }else{
      colorsCopy = this.shuffleArray(coloursCopy);
      var c1 = coloursCopy[0]
      var c2
      if (coloursCopy.length<=1){
        c2 = this.data.level.colours[0]
      }
      else {c2 = coloursCopy[1]}
      var question = {}
      question["match"] = this.getRandomMatchOn();

      if(question["match"]=="Word"){
        question["title"] = c1.title
        question["answer"] =  c1.title
        question["hex"] = c2.hex
      }else{
        question["hex"] = c1.hex
        question["answer"] =  c1.hex
        question["title"] = c2.title
      }     
    }

    return question

  },
                   
  onLoad: function(){
    this.initGameData()
    this.setNextLevel()
    this.trigger(this.data);
    
  },
  onLoadCompleted: function(){
    
  },
  onStartLevel: function(){
    this.data.level.running=true;
    this.trigger(this.data);  
  },
  onColourClick: function(i){
    var c = this.data.level.colours[i]
    if (c.hex == this.data.level.question.answer || c.title == this.data.level.question.answer ){
      c.complete = true;
      
    }
    this.data.level.question=this.getNextQuestion();
    this.trigger(this.data)
    
  },
  getRemainigColours: function(){
    return this.data.level.colours.filter(function(colour){
      return colour.complete == false
    })
  },
  getRandomMatchOn: function(){
    if(Math.random() >.5){
      return "Word"
    } else {return "Colour"}
  },
  shuffleArray:function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

      return array;
  }
});
module.exports = GameStore;
