const CorrectSound = require("../sounds/correct.mp3");
const WrongSound = require("../sounds/wrong.mp3");
const GameOver = require("../sounds/gameover.mp3");


const Reflux = require('reflux');
const GameActions = require('../actions/game_actions.js');
//const backend = require('../../modules/backend.js');

var SoundStore = Reflux.createStore({
// this will set up listeners to all publishers in ResultActions
  listenables: [GameActions],
  init: function(){
    this.data = this.getInitialState();
  },
  getInitialState: function() {
    
    return {
      soundFile:"",
      playing:true
    }    
  },
  
            
  onSoundFinished: function(){
    this.data.playing=false;
    this.trigger(this.data)
  }, 
  onCorrectAnswer: function(){
    this.data.soundFile =  CorrectSound;
    this.data.playing=true;
    this.trigger(this.data)
  },
  onWrongAnswer: function(){
    this.data.soundFile= WrongSound;
    this.data.playing=true;
    this.trigger(this.data)
  },
  onGameOver: function(){
    this.data.soundFile =  GameOver;
    this.data.playing=true;
    this.trigger(this.data)
  },
});
module.exports = SoundStore;
