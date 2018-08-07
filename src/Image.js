import React from 'react';

import html2canvas from 'html2canvas';

class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagevalue:'',
      imagePreviewUrl: '',
      image:'https://i.imgur.com/wAlFbE8.png',
      imageStore: 
      [   {    
        image: this.props.image,
     

      }  
    ],
    };
  
    this.style = {
      width: "280px",
      height: "300px"      
   };
 
    }
  
    handleSubmit(e) {
      
      e.preventDefault();
      // TODO: do something with -> this.state.file
      html2canvas(document.querySelector("#capture")).then(canvas => {
        document.body.appendChild(canvas)
    });
      console.log('handle uploading-', this.state.file);
    }
    
  
    handleImageChange(e) {

      let reader = new FileReader();
      let file = e.target.files[0];
      var obj = {
       file : file,
       image : this
      };
      let store = this.state.imageStore;
      console.log('this image store has passed', store);
      store.push(obj , file);
     reader.onloadend = (e) => {
        this.setState({
          imageStore:  store,
          imagePreviewUrl: reader.result
        });
        

      }
      console.log('this images reader store has passed', store, this);
      reader.readAsDataURL(file)

    // 
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (
        <div className="previewText"> 
        <div className="b" style={this.style} >  
        <img  className="a" src={imagePreviewUrl} /></div>
     </div>);
      } else {
        $imagePreview = (<div className="previewText"> </div>);
      }
    
  
      return (
        <div className="previewComponent">
       
          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this.handleImageChange(e)}  ref={ref=> this.fileInput = ref}/>
            <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this.handleSubmit(e)}>Submit</button>
          </form>
          <body id="capture">
          <div className="imgPreview" >
           {$imagePreview}
          
          </div>
      
          </body>
          

        </div>
        
      )
    }
  }
    
export default ImageUpload;
