const CorrectSound = require("../sounds/correct");
const WrongSound = require("../sounds/correct");


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
      soundFile:"STOPPED",
      playStatus:true
    }    
  },
  
            

  onCorrectAnswer(){
    this.data.soundFile =  CorrectSound;
    this.data.playStatus="PLAYING";
    this.trigger(this.data)
  },
  onWrongAnswer(){
    this.data.soundFile= WrongSound;
    this.data.playStatus="PLAYING";
    this.trigger(this.data)
  },
  onTimedOut(){
    this.data.soundFile =  CorrectSound;
    this.data.playStatus="PLAYING";
    this.trigger(this.data)
  },
});
module.exports = SoundStore;
