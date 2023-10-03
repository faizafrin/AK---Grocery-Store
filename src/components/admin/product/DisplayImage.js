import React from "react";

function DisplayImage({ image }) {


  // <img src = {'data:image/jpeg;base64,${this.state.responseData}'} />

  // src={`data:${image.mimetype};base64,${image.data}`}

  return (
    <img
      src={image}
      style={{
        width: "10rem",
      }}
    />
  );
}

export default DisplayImage;
