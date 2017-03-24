const Reflux = require('reflux');
const ResultActions = require('../actions/result_actions.js');
//const backend = require('../../modules/backend.js');

var ResultStore = Reflux.createStore({
// this will set up listeners to all publishers in ResultActions
  listenables: [ResultActions],
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
    
  },
  onAddResult(levelNo,ms){
    var score ={};
    score["levelNo"] = levelNo
    score["reactionTime"] = ms
    score["points"] = levelNo * ms
    this.data.results.push(score)
    this.trigger(this.data)
  }
});
module.exports = ResultStore;
