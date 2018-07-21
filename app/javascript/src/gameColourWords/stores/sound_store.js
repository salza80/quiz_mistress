import CorrectSound from "../sounds/correct.mp3"
import WrongSound from "../sounds/wrong.mp3"
import GameOver from "../sounds/gameover.mp3"


import Reflux from 'reflux'
import GameActions from '../actions/game_actions.js'

const SoundStore = Reflux.createStore({
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
})

export default SoundStore
