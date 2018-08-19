import React from 'react'

export default class Finished extends React.Component {
  
  render() {
    const {onFinishedClick} = this.props
    return (
      <div className="question card text-center">
        <div className="card-header">
          <div className="question-title">
            <div className="row">
              <div className="col-md-10 col-xs-12">
                <h4 className="card-title"> You have finished the Quiz!</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="card-block">
          <div className="question-description">
            <p className="card-text">Get your results</p>
          </div>
          <li onClick={this.onFinishedClick} className="list-group-item">
          <span className='fa' aria-hidden="true"></span>
          <span>Finish</span>
        </li>
        </div>
      </div>
    )
  }
}

