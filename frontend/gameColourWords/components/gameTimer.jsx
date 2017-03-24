const React = require('react');
const _ = require('underscore')
// const Progress = require('react-progressbar');
import Progress from 'react-progressbar';

var GameTimer = React.createClass({
  increment: 200,
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
    this.msRemaining=this.props.seconds * 1000
    this.msTotal=this.props.seconds * 1000
    this.timeout = setInterval(this.incrementTimer, this.increment)
      
  },
  componentWillUnmount: function() {
    this.unmountTimer()
  },
  fadeToColor: function(ratio) {
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
    if(this.msRemaining <=0){
      this.setState({percent:100, color:this.color2})
      this.unmountTimer()
      if(_.isFunction(this.props.onTimeout)){
        this.props.onTimeout();
      }
    }else{
      var seconds = Math.ceil(this.msRemaining/1000)
      var percent = 100-((this.msRemaining/this.msTotal)*100)
      var colour = this.fadeToColor(percent/100)
      this.setState({percent: percent, seconds: seconds, colour:colour})
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
