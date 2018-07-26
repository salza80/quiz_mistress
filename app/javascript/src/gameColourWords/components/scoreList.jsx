import React from 'react'
import Score from './score.jsx'

export default class ScoreList extends React.Component {

  render() {
    const { results } = this.props
    let totalScore = 0
    var aList = results.map(function(result, i) {
      totalScore += result
      return (
        <Score index={i} result={result} key={i}> </Score>
      )
     })
    return (
    <div className="card-block score-list">
       {aList}
        <div>Total Score: {totalScore}</div>
    </div>
    )
  }
}

