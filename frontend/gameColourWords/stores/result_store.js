const Reflux = require('reflux');
const GameActions = require('../actions/game_actions.js');
const backend = require('../../modules/backend.js');


var ResultStore = Reflux.createStore({
// this will set up listeners to all publishers in GameActions
  listenables: [GameActions],
  init: function(){
    this.data = this.getInitialState();
  },
  getInitialState: function() {
    
    return {
      results: [],
      totalScore:0
    }    
  },
  
            
  onLoad: function(){
   
    
  },

  onLoadCompleted: function(){
    
  },
  onAddResult: function(levelNo,ms){
    var score ={};
    score["levelNo"] = levelNo
    score["reactionTime"] = ms/1000
    score["points"] = Math.round((5/(ms/1000)) *10,2)
    this.data.totalScore +=score["points"]
    this.data.results.push(score)
    this.trigger(this.data)
  },
  onGameOver: function(){
    backend.updateJSON('games/word_colour_game.json', 
    {
      result: {
        totalScore: this.data.totalScore
      }
    }).then(this.onResultEncodeCompleted)
    .catch( this.onFinishQuizFailed );
  },
  onResultEncodeCompleted: function(data){
    window.location = data.redirect_to

  },
  onResultEncodeFailed: function(){

  }
});
module.exports = ResultStore;
