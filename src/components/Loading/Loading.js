import React, {useState } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";


const Loading = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000");
  return (
    <div className="sweet-loading">

<ScaleLoader
        color={color}
        loading={loading}
        style={{display:'flex', justifyContent:'center'}}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
   
    </div>
  )
}

export default Loading