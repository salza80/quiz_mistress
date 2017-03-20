const React = require('react');
const AnswerList= require('./answerList.jsx')
const ImageReference= require('../../shared/components/imageReference.jsx')


var Question = React.createClass({
  getInitialState: function() {
    return {
           
          };
  },

  conponentWillMount: function(){
    
  },
  componentDidMount: function() {
  
   
    },
  componentWillUnmount: function() {

  },
  render: function() {
   
    return (
      <div className="question card text-center">
        <div className="card-header">
          <div className="question-title">
            <div className="row">
              <div className="col-md-10 col-xs-12">
                <h4 className="card-title">  Q. {this.props.question.title}</h4>
              </div>
            </div>
          </div>
        </div>
        <ImageReference image={this.props.question.image} ></ImageReference>
        <div className="card-block">
          <div className="question-description">
            <p className="card-text">{this.props.question.description}</p>
          </div>
           <AnswerList answers={this.props.question.answers}></AnswerList>
        </div>
      </div>
    );
  }
});

module.exports = React.createFactory(Question);
