const React = require('react');

var Strike = React.createClass({
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
  
  blockStyle: function(){
    var blockcolour = "#f2f2f2"
    console.log(this.props.striked)
    if (this.props.striked ==true){
      blockcolour= "#ff0000"
    }
    return {
      color:blockcolour,
      minWidth: "10px",
      minHeight: "10px"
    }
  },
  render: function() {

   
    return (
      <div className="fa fa-times" style={this.blockStyle()} ></div>
    );
  }
});

module.exports = React.createFactory(Strike);
