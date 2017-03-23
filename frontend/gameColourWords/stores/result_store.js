const Reflux = require('reflux');
const GameActions = require('../actions/game_actions.js');
const _ = require('underscore')
//const backend = require('../../modules/backend.js');

var ResultStore = Reflux.createStore({
// this will set up listeners to all publishers in SearchActiions, using onKeyname (or keyname) as callbacks
  listenables: [GameActions],
  init: function(){
    this.data = this.getInitialState();
  },
  getInitialState: function() {
    
    return {
      results: []
    }    
  },
  
            
  onLoad: function(){
   
    
  },
  onLoadCompleted: function(){
    
  }
});
module.exports = ResultStore;
