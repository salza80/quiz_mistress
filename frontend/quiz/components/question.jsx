const React = require('react');



var Question = React.createClass({
  getInitialState: function() {
    return {
           
          };
  },

  conponentWillMount: function(){
    
  },
  componentDidMount: function() {
    console.log("here")
    console.log(this.props)
   
    },
  componentWillUnmount: function() {

  },
  render: function() {
    return (
      <div className="QuestionContainer">
        <div className="row">
          <div className="col-md-12">
            here
           
          </div>
          <div>hello</div>
        </div>
      </div>
    );
  }
});

module.exports = React.createFactory(Question);
