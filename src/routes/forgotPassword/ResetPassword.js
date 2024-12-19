import React, { useState } from 'react';
import { TextField } from '@mui/material'
import axios from 'axios';
import { BikeState } from '../../context/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {

const[code , setCode] = useState('');
const[password , setPassword] = useState('');
const {url} = BikeState();
const navigate = useNavigate();


function newPassword(){
    axios.post(`${url}/users/reset_password/${code}` , {password})
    .then(res => toast.success((res.data.message).toUpperCase()))
    .catch(err => toast.error(err.response.data.message))

    setCode('')
    setPassword('')
    navigate('/login')
}


  return (
    <div style={{backgroundColor:'aliceblue' , height:'100vh'}}>

      <div className='header' style={{height:'5vh' , backgroundColor:'gray'}}>
        <p style={{textAlign:'center',fontWeight:'bold' , color:'white' , padding:'5px'}}>MOTO HEALTH CARE</p>
        </div>

        <p style={{margin:'15px'}}>Please enter your OTP received through email to reset password</p>

      <div className='col-5' style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center'}}>
      <TextField id="outlined-basic" label="OTP" variant="outlined" value={code} onChange={ e => setCode(e.target.value)} margin='normal' /> 
      <TextField id="outlined-basic" label="New Password" variant="outlined" value={password} onChange={ e => setPassword(e.target.value)} margin='normal' /> <br/>
      <button className='btn btn-primary' onClick={newPassword}>SET PASSWORD</button>
      </div>





    </div>
  )
}

export default ResetPassword