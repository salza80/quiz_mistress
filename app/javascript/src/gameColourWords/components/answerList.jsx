import React from 'react'
import AnswerBlock from './answerBlock.jsx'

export default class AnswerList extends React.Component {
  render() {
    const { colours } = this.props
    var aList = colours.map(function(colour,i) {
      return (
        <AnswerBlock index={i} colour={colour} key={i}> </AnswerBlock>
      )
     })
    return (
     <div className="answers-list well"> 
       {aList}
    </div>
    )
  }
}
