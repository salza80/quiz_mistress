const React = require('react');


var Score = React.createClass({
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
    var blockcolour = "#D3D0D0"
    // if (this.props.colour.complete ==false){
    //   blockcolour=this.props.colour.hex
    // }
    return {
      backgroundColor:blockcolour,
    }
  },
  render: function() {

   
    return (
      <div className="row score" style={this.blockStyle()}>
        <div className="col-2">
          {this.props.result.levelNo}
        </div>
         <div className="col-2">
         {this.props.result.reactionTime}
        </div>
        <div className="col-2">
         {this.props.result.points}
        </div>
      </div>
    );
  }
});

module.exports = React.createFactory(Score);
