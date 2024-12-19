import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../Register/Register.css'

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'; // for form validation schema
import { useFormik } from 'formik';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { BikeState } from '../../context/Context';
import google from "../../assets/google-signin.png"



const registerSchemaValidation = yup.object({
  userName: yup.string().min(3 , 'name should have minimum 3 character').required("Enter Your Name"),
  email: yup.string().email().required("Enter Email"),
  mobile: yup.string().matches(/^[0-9]{10}/ , "Enter valid mobile number").required("Enter Mobile Number"),
  password: yup.string().min(8, 'enter minimum 8 character').required('not valid'),
  confirmpassword: yup.string().min(8, 'enter minimum 8 character').oneOf([yup.ref('password')] , "Password Not Matched").required('Enter Password to Confirm')

})









const Register = () => {


  const navigate = useNavigate();
  const {url} = BikeState();
  const [image , setImage] = useState();
  const [disable , setDisable] = useState(true);



  // formik function

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      mobile: "",
      password: "",
      confirmpassword: ""
    },

    validationSchema: registerSchemaValidation,
     onSubmit : (newuser) => {
      updatePic(newuser.email);
      signup(newuser)
    }
  

  })

  // upload pic
  async function updatePic(mail) {

    const formData = new FormData()


    formData.append('image', image)
    formData.append('email', mail)


    await axios.post(`${url}/image/upload/image`, formData)
  }

  function handleChanges(e) {
    setImage(e.target.files[0]);
    //console.log('image', e.target.files[0])
    setDisable(false)
  }



  async function signup(newuser) {
      try {

        if ((values.userName && values.email && values.mobile && values.password && values.confirmpassword) !== '') {
           await axios.post(`${url}/users/signup`, newuser).then((res) =>{ 
            toast.success(res.data.message) ; 
            navigate('/login')
          })
           
           .catch(error => toast.error(error.response.data.message))
          
         // toast.success('Registration successful');
         // navigate('/login')
        } else {
          toast.error('please fill all the fields in the form');
        }

      } catch (error) {
        toast.error('try again later')
      }

  }

  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/');
      toast.warning('Logout and try again')
    }
  })


  return (

    <div className='signup-registration row col-12' > 



      <div className='form col-md-6 bs' style={{ borderRadius: "5px" }} >

        <h1 style={{ textAlign: "center" }}>REGISTER HERE</h1>

       

        <form onSubmit={handleSubmit}> 

           <TextField id="outlined-basic1" required label="USER NAME" onBlur={handleBlur} variant="outlined" fullWidth margin="normal" name="userName" value={values.userName} onChange={handleChange} /> <br />
           {touched.userName && errors.userName ? <p style={{color:"red"}}>{errors.userName}</p> : "" }

          <TextField id="outlined-basic2" required label="EMAIL" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="email" value={values.email} onChange={handleChange} /> <br />
          {touched.email && errors.email ? <p style={{color:"red"}}>{errors.email}</p> : "" }

          <TextField id="outlined-basic3" required label="MOBILE NUMBER" variant="outlined"  onBlur={handleBlur} fullWidth margin="normal" name="mobile" value={values.mobile} onChange={handleChange} /> <br />
          {touched.mobile && errors.mobile ? <p style={{color:"red"}}>{errors.mobile}</p> : "" }

          <TextField id="outlined-basic4" type='password' required label="PASSWORD" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="password" value={values.password} onChange={handleChange} /> <br />
          {touched.password && errors.password ? <p style={{color:"red"}}>{errors.password}</p> : "" }

          <TextField id="outlined-basic5" type='password' required label="CONFIRM PASSWORD" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="confirmpassword" value={values.confirmpassword} onChange={handleChange} />
          {touched.confirmpassword && errors.confirmpassword ? <p style={{color:"red"}}>{errors.confirmpassword}</p> : "" } <br/>

          <div>
            <p style={{fontWeight:'bold' , display:'inline-block'}}>SELECT PROFILE PICTURE</p> &nbsp; &nbsp; 
            <input type='file' onChange={handleChanges} required /> <br />
          </div>

          <button className='btn btn-primary mb-3 register-btn' type='submit'>REGISTER</button> 

          <div>
            <a href={`${url}/users/auth/google`}>
              <img className='oauth' src={google} alt='google' /> 
            </a> 
          </div>

        </form>

      </div>

    


    </div>



  )
}

export default Register