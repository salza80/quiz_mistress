import React from 'react'
import Score from './score.jsx'
import ResultStore from '../stores/result_store'

export default class ScoreList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
            results: [],
            totalScore:0
            }
  }

 onStoreChange = (data) => {
    this.setState({
      results: data.results,
      totalScore: data.totalScore
    })
  }
  componentDidMount() {
      this.unsubscribe = ResultStore.listen(this.onStoreChange);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { results , totalScore } = this.state
    var aList = results.map(function(result,i) {
      return (
        <Score index={i} result={result} key={i}> </Score>
      );
     });
    return (
    <div className="card-block score-list">
       {aList}
        <div>Total Score: {totalScore}</div>
    </div>
    )
  }
}

