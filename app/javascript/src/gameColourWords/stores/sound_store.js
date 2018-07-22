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
      whichSound: "",
    }    
  },     
  onSoundFinished: function(){
    this.data.whichSound=""
    this.trigger(this.data)
  }, 
  onCorrectAnswer: function(){
    this.data.whichSound="correct"
    this.trigger(this.data)
  },
  onWrongAnswer: function(){
    console.log('WRONG')
    this.data.whichSound="wrong"
    this.trigger(this.data)
  }
})

export default SoundStore
