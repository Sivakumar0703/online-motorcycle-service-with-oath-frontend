import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Errorpage = () => {

    const navigate = useNavigate()

    function gotoHome(){
        navigate('/')
    }

  return (
    <div className='container'>

        <div className='frown-image' style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , marginTop:'50px'}}>
            <FontAwesomeIcon 
            icon={faFrown}
            style={{fontSize:'150px' , color:'gray'}}
            />

            <p style={{fontSize:'100px' , color:'gray' , display:'flex' , justifyContent:'center' }}>404</p>

            <p style={{fontSize:'50px' , color:'gray' , display:'flex' , justifyContent:'center' }}>PAGE NOT FOUND</p>

            <p>The page you are looking for doesn't exist. Click the button below to go back.</p>
            <button onClick={gotoHome} className='btn btn-primary'>Go Back</button>
           

            

        </div>
        
    </div>
  )
}

export default Errorpage