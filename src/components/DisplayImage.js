import React, { Component } from "react";

class DisplayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
      
    }
  };


  onImageSend = event => {
    event.preventDefault();
    console.log("dffdf" +this.state.image)
    }
  



  render() {
    return (
      <div>
        <div>
          <div>
            <img src={this.state.image} />
            <h1>Select Image</h1>
            <form action="" onSubmit={this.onImageSend}>
            <input type="file" name="myImage" onChange={this.onImageChange} />
            <input type="submit" name="myButton"  />
            </form>
          </div>
          <h1>********************</h1>
          <div>
          <img src={this.state.image} />
          </div>
        </div>
      </div>
    );
  }
}
export default DisplayImage;