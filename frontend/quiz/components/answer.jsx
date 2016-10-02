const React = require('react');



var Answer = React.createClass({
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
        <li className="list-group-item">
          <span className='fa' aria-hidden="true"></span>
          <span>{this.props.answer.title}</span>
        </li>
    );
  }
});

module.exports = React.createFactory(Answer);
