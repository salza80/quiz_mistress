const React = require('react');




var ImageReference = React.createClass({
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
  shouldRender: function(){
    if(this.props.image === undefined){return false}
    if(this.props.image.ref_url === undefined || this.props.image.ref_url == ''){return false}
    return true;
  },
  render: function() {
    var ref;
    if(this.shouldRender()){
      ref = (
          <span className="img-ref">
            Image Source:
            <a target="_blank" rel="nofollow" href={this.props.image.ref_url}>{this.props.image.ref_title}</a>
          </span>
        )
    }
    return (
      <div>
        {ref}  
      </div> 
    );
  }
});
  
module.exports = React.createFactory(ImageReference);
