import React from 'react'


export default class ImageReference extends React.Component {
  shouldRenderRef(){
    if(this.props.image === undefined){return false}
    if(this.props.image.ref_url === undefined || this.props.image.ref_url == ''){return false}
    return true;
  }

  shouldRenderImg(){
    if(this.props.image === undefined){return false}
    if(this.props.image.image_file === undefined ){return false}
    return true;
  }

  render() {
    var ref, img;
    if(this.shouldRenderRef()){
      ref = (
          <div className="img-ref">
            Image Source:
            <a target="_blank" rel="nofollow" href={this.props.image.ref_url}>{this.props.image.ref_title}</a>
          </div>
        )
    }
    if(this.shouldRenderImg()){
      img = (
        <img className="card-img-top img-fluid" src={this.props.image.image_file.url} />
      )
    }
    return (
      <div>
        {img} 
        {ref}
      </div> 
    )
  }
}
