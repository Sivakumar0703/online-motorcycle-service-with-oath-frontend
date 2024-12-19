import React, { useState } from 'react';
import { TextField } from '@mui/material'
import axios from 'axios';
import { BikeState } from '../../context/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PasswordRequest = () => {

  const { url } = BikeState();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  function sendRequest(e) {
    e.preventDefault()

    axios.post(`${url}/users/forgot_password`, { email })
      .then(res => {
        toast.success((res.data.message).toUpperCase())
        navigate('/reset_password');
      }) 
      .catch(err => toast.error((err.response.data.message).toUpperCase()))
  }





  return (
    <div className='col-12' style={{ backgroundColor: 'aliceblue', height: '100vh' }}>

      <div className='header' style={{height:'5vh' , backgroundColor:'gray'}}>
        <p style={{textAlign:'center',fontWeight:'bold' , color:'white' , padding:'5px'}}>MOTO HEALTH CARE</p>
        </div>

      <h3 style={{ padding: '15px' }}>PLEASE ENTER YOUR EMAIL TO RECEIVE THE OTP VIA EMAIL</h3>

      <div className='col-12' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={sendRequest} className='col-10 col-md-5'>
          <TextField id="outlined-basic"
            type='email'
            label="Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
             />

          <button className='btn btn-success m-3' type='submit' style={{ width: '120px' }} >SEND LINK</button>
        </form>
      </div>








    </div>
  )
}

export default PasswordRequest