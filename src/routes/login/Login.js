import { TextField } from '@mui/material'
import React, { useState , useEffect } from 'react'
import '../login/Login.css'

import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Box from '@mui/material/Box';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { BikeState } from '../../context/Context';
import google from "../../assets/google-signin.png"



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [triggerLogin , setTriggerLogin] = useState(false);
    const navigate = useNavigate();
    const {url} = BikeState();

    async function login() {

        const user = {
            email,
            password,
        }
        

        try {
           const result = await axios.post(`${url}/users/login`, user)
            .then(res => { 
                localStorage.setItem('user',JSON.stringify(res.data.userdata));  
            })
            .catch(error => toast.error(error.response.data.message))

            if(JSON.parse(localStorage.getItem('user'))){
                navigate('/')
            }
        } catch (error) {
             toast.error(error.response.data.message)
        }

      
    }

    function demoLogin(guestEmail){
        setEmail(guestEmail);
        setPassword('sivakumar');
        setTriggerLogin(true);
    }

    useEffect(()=>{
        if(triggerLogin){
            login();
            setTriggerLogin(false);
        }

    },[triggerLogin])

    // aviod user entering into login page after login
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/');
            toast.warning('Please Logout for returing Login page')
        }
 },[])

 

   // const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    return (
        <div className='row login-page col-12'>



            <div className='form col-md-6 bs mt-3' style={{borderRadius:"5px"}} >

                <h1 style={{ textAlign: "center" }}>LOGIN HERE</h1>


                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <TextField
                        id="input-with-icon-textfield"
                        label="EMAIL"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard" fullWidth
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />   <br />




                    <FormControl sx={{ m: 1 }} variant="standard" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} >
                        <InputLabel htmlFor="standard-adornment-password" >Password</InputLabel>
                        <Input

                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}

                            startAdornment={
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            }

                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                </Box>

                <a className='forgotPassword' href='/forgot_password'> Forgot Password?  </a> <br/>
                
                <a className='no-account ml-2' href='/signup'> Don't have an account? click here </a> <br /> 

                <div>
                <a href='http://localhost:8000/users/auth/google'>
                    <img className='oauth' src={google} alt='google' />  {/* onClick={loginWithGoogle} */}
                </a>
                </div>

                <div className='btn-group'>
                <button className='btn btn-primary mb-3 mt-3' onClick={login} >LOGIN</button>
                <button className='btn btn-danger mb-3 mt-3' onClick={() => demoLogin('admin@moto.com')} >ADMIN</button>
                <button className='btn btn-success mb-3 mt-3' onClick={() => demoLogin('guest@moto.com')} >GUEST</button>
                </div>

            </div>




        </div>
    )
}

export default Login