import React from 'react'
import rc from 'rc-progress'
const Progress = rc.Line

import { isFunction } from 'underscore'

export default class GameTimer extends React.Component {
  constructor(props) {
    super(props)
    this.increment = 50
    this.msRemaining = 600000
    this.msTotal = 600000
    this.colour1 = [0,180,0]
    this.colour2 = [255,0,0]
    this.state = {
              percent: 0,
              seconds:0,
              colour: "RGB(255,0,0)"
            }
  }

  componentDidMount() {
    this.resetTimer(this.props.seconds)
    this.timeout = setInterval(this.incrementTimer, this.increment)
      
  }
  componentWillUnmount() {
    this.unmountTimer()
  }
  resetTimer = (seconds) => {
    this.msRemaining=seconds * 1000
    this.onTimerChange(0)
    this.msTotal=seconds * 1000
  }
  fadeToColour = (ratio) => {
    let  difference, newColour = [];

    for (let i = 0; i < this.colour1.length; i++) {
        difference = this.colour2[i] - this.colour1[i];
        newColour.push(Math.floor(parseInt(this.colour1[i], 10) + difference * ratio));
    }

    return 'rgb(' + newColour + ')';
  }
  unmountTimer = () => {
    if(this.timeout){
      clearTimeout(this.timeout)
    }
  }
  incrementTimer = () => {
    this.msRemaining = this.msRemaining - this.increment
    let seconds, percent, colour

    if(this.msRemaining <=0) {
      this.unmountTimer();
      percent = 100
      colour = this.fadeToColour(100/100)
      seconds = 0
      this.setState({percent: percent, seconds: seconds, colour:colour})
      this.onTimeout();
    }else {
      seconds = Math.ceil(this.msRemaining/1000)
      percent = 100-((this.msRemaining/this.msTotal)*100)
      colour = this.fadeToColour(percent/100)
      this.onTimerChange(this.msTotal - this.msRemaining)
      this.setState({percent: percent, seconds: seconds, colour:colour})
    }
  }
  onTimeout = () => {
    if(isFunction(this.props.onTimeout)) {
        this.props.onTimeout();
      }
  }
  onTimerChange = (durationMS) => {
    if(isFunction(this.props.onTimerChange)){
        this.props.onTimerChange(durationMS)
      }
  }
  render() {
    return (
      <div className="timer">
         Seconds Remaining: <span> {this.state.seconds}</span>
        <Progress percent={this.state.percent} strokeColor={this.state.colour}></Progress>

      </div>
    )
  }
}

