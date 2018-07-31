import React from 'react'
import Sound from 'react-sound'
import CorrectSound from "../sounds/correct.mp3"
import WrongSound from "../sounds/wrong.mp3"
import { soundFinished } from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    whichSound: state.whichSound
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSoundFinished: () => {
      dispatch(soundFinished())
    }
  }
}

class PlaySound extends React.Component {
  render() {
    const { whichSound, onSoundFinished } = this.props

    let correct = <Sound url={CorrectSound} onFinishedPlaying={onSoundFinished} playStatus={whichSound === "correct" ? Sound.status.PLAYING : Sound.status.STOPPED} loop={false}/>
    let wrong = <Sound url={WrongSound} onFinishedPlaying={onSoundFinished} playStatus={whichSound === "wrong" ? Sound.status.PLAYING : Sound.status.STOPPED} loop={false} />
 
    return (
      <div>
       {correct} {wrong}
      </div>
    )
  }
}

const PlaySoundContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaySound)

export default PlaySoundContainer
