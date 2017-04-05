const React = require('react');
const _ = require('underscore')
// const Progress = require('react-progressbar');
import Progress from 'react-progressbar';

var GameTimer = React.createClass({
  increment: 50,
  msRemaining:600000,
  msTotal:600000,
  colour1: [0,180,0],
  colour2: [255,0,0],
  getInitialState: function() {
    return {
              percent: 0,
              seconds:0,
              colour: "RGB(255,0,0)"
            }
  },
  
  onStateUpdated: function(){
   
  },
  conponentWillMount: function(){

    
  },
  componentDidMount: function() {
    this.resetTimer(this.props.seconds)
    this.timeout = setInterval(this.incrementTimer, this.increment)
      
  },
  componentWillUnmount: function() {
    this.unmountTimer()
  },
  resetTimer: function(seconds){
    this.msRemaining=seconds * 1000
    this.onTimerChange(0)
    this.msTotal=seconds * 1000
  },
  fadeToColour: function(ratio) {
    var  difference,
        newColour = [];

    for (var i = 0; i < this.colour1.length; i++) {
        difference = this.colour2[i] - this.colour1[i];
        newColour.push(Math.floor(parseInt(this.colour1[i], 10) + difference * ratio));
    }

    return 'rgb(' + newColour + ')';
  },
  unmountTimer(){
    if(this.timeout){
      clearTimeout(this.timeout)
    }
  },
  incrementTimer(){
    this.msRemaining = this.msRemaining - this.increment
    var seconds, percent, colour

    if(this.msRemaining <=0){
      this.unmountTimer()
      percent = 100
      colour = this.fadeToColour(100/100)
      seconds = 0
      this.setState({percent: percent, seconds: seconds, colour:colour})
      this.onTimeout();
    }else{
      seconds = Math.ceil(this.msRemaining/1000)
      percent = 100-((this.msRemaining/this.msTotal)*100)
      colour = this.fadeToColour(percent/100)
      this.onTimerChange(this.msTotal - this.msRemaining)
      this.setState({percent: percent, seconds: seconds, colour:colour})
    }
  },
  onTimeout: function(){
    if(_.isFunction(this.props.onTimeout)){
        this.props.onTimeout();
      }
  },
  onTimerChange: function(durationMS){
    if(_.isFunction(this.props.onTimerChange)){
        this.props.onTimerChange(durationMS);
      }
  },
  render: function() {

    
    return (
      <div className="timer">
         Seconds Remaining: <span> {this.state.seconds}</span>
         <Progress color={this.state.colour} completed={this.state.percent}></Progress>

      </div>
    );
  }
});

module.exports = React.createFactory(GameTimer);
