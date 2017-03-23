const React = require('react');
const _ = require('underscore')
// const Progress = require('react-progressbar');
import Progress from 'react-progressbar';

var GameTimer = React.createClass({
  increment: 500,
  msRemaining:600000,
  msTotal:600000,
  getInitialState: function() {
    return {
              percent: 0,
              seconds:0
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
  unmountTimer(){
    if(this.timeout){
      clearTimeout(this.timeout)
    }
  },
  incrementTimer(){
    this.msRemaining = this.msRemaining - this.increment
    if(this.msRemaining <=0){
      this.setState({percent:100})
      this.unmountTimer()
      if(_.isFunction(this.props.onTimeout)){
        this.props.onTimeout();
      }
    }else{
      var seconds = Math.ceil(this.msRemaining/1000)
      var percent = 100-((this.msRemaining/this.msTotal)*100)
      this.setState({percent: percent, seconds: seconds})
    }
  },
  render: function() {

    
    return (
      <div className="timer">
         Seconds Remaining: <span> {this.state.seconds}</span>
         <Progress completed={this.state.percent}></Progress>

      </div>
    );
  }
});

module.exports = React.createFactory(GameTimer);
