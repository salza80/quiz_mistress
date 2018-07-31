import React from 'react'
import rc from 'rc-progress'
const Progress = rc.Line
import { wrongAnswer } from '../actions'
import { connect } from 'react-redux'
import { isFunction } from 'underscore'

export default class GameTimer extends React.Component {
  constructor(props) {
    super(props)
    this.increment = props.increment || 50
    this.msRemaining = props.seconds * 1000
    this.msTotal = props.seconds * 1000
    this.colour1 = [0,180,0]
    this.colour2 = [255,0,0]
    this.state = {
      percent: 0,
      seconds:0,
      colour: "RGB(255,0,0)"
    }
  }

  componentDidMount() {
    this.timeout = setInterval(this.incrementTimer, this.increment)
  }

  componentWillUnmount() {
    this.unmountTimer()
  }

  resetTimer = () => {
    const { seconds } = this.props
    this.msRemaining = seconds * 1000
    this.msTotal = seconds * 1000
    this.onTimerChange()
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
      percent = 100
      colour = this.fadeToColour(100/100)
      seconds = 0
      this.setState({percent: percent, seconds: seconds, colour:colour})
      this.onTimeout()
    }else {
      seconds = Math.ceil(this.msRemaining/1000)
      percent = 100-((this.msRemaining/this.msTotal)*100)
      colour = this.fadeToColour(percent/100)
      this.onTimerChange()
      this.setState({percent: percent, seconds: seconds, colour:colour})
    }
  }
  onTimeout = () => {
    if(isFunction(this.props.onTimeout)) {
      this.props.onTimeout()
    }
    this.resetTimer()
  }
  onTimerChange = () => {
    if(isFunction(this.props.onTimerChange)){
        this.props.onTimerChange(this.msTotal - this.msRemaining)
      }
  }
  render() {
    const { seconds, percent, colour } = this.state
    return (
      <div className="timer">
         Seconds Remaining: <span> {seconds}</span>
        <Progress percent={percent} strokeColor={colour}></Progress>

      </div>
    )
  }
}

