import React from 'react'
import axios from 'axios';
import * as yup from 'yup'; // for form validation schema
import { useFormik } from 'formik';
import { TextField } from '@mui/material'
import { toast } from 'react-toastify';
import SendIcon from '@mui/icons-material/Send';
import '../Contact/contact.css'
import Mininav from '../../components/Navigation/Mininav';


const contactFormSchemaValidation = yup.object({
    userName: yup.string().min(3, 'name should have minimum 3 character').required("Enter Your Name"),
    email: yup.string().email().required("Enter Email"),
    mobile: yup.string().matches(/^[0-9]{10}/, "Enter valid mobile number").required("Enter Mobile Number"),
    message: yup.string().required('Type your message'),

})

const Contact = () => {


    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            userName: "",
            email: "",
            mobile: "",
            message: ""

        },

        validationSchema: contactFormSchemaValidation,
        onSubmit: (user_msg) => contact_form(user_msg)

    })


    async function contact_form(user_msg) {

        try {
            await axios.post('http://localhost:8080/users/send_mail', user_msg).data
            toast.success('From Submitted Successfully');
            values.userName = '';
            values.email = '';
            values.mobile = '';
            values.message = '';
            

        } catch (error) {
            console.log(error)
            toast.error('Form Submission Failed')
        }
    }




    return (

        <div>
            <Mininav />

           <div className='contactbox-1'>
            <h1>Who are WE?</h1>
                 <p>
                 We're GarageWorks, a doorstep service provider for two wheelers - Convenient, Transparent, and Cost Effective
                 </p>
           </div>

            <div className='contactbox-2'>
            <h1 style={{textAlign:'right'}}>Our Motto</h1>
              <p style={{textAlign:'right'}}>
              GarageWorks was launched with a single objective -  to make two-wheeler management simple, effective & stress-free
              </p>
            </div>

            <div className='row d-flex' style={{ justifyContent: "center" , flexDirection:"column", alignItems:"center" }}>

                <h1 style={{textAlign:'center', marginTop:'50px'}}> Contact Us </h1>

                <div style={{textAlign:'center'}}>
                  <p>  Got a question? We'd love to hear from you.Send us a meesage and we'll response as soon as possible. </p>
                </div>

                <div className='contact_form col-md-4 ' >

                    <form onSubmit={handleSubmit}>

                        <TextField id="outlined-basic1" required label="USER NAME" onBlur={handleBlur} variant="outlined" fullWidth margin="normal" name="userName" value={values.userName} onChange={handleChange} /> <br />
                        {touched.userName && errors.userName ? <p style={{ color: "red" }}>{errors.userName}</p> : ""}

                        <TextField id="outlined-basic2" required label="EMAIL" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="email" value={values.email} onChange={handleChange} /> <br />
                        {touched.email && errors.email ? <p style={{ color: "red" }}>{errors.email}</p> : ""}

                        <TextField id="outlined-basic3" required label="MOBILE NUMBER" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="mobile" value={values.mobile} onChange={handleChange} /> <br />
                        {touched.mobile && errors.mobile ? <p style={{ color: "red" }}>{errors.mobile}</p> : ""}


                        <TextField id="standard-multiline-static" required label="Message" variant="outlined" multiline rows={4} onBlur={handleBlur} fullWidth margin="normal" name="message" value={values.message} onChange={handleChange} />
                        {touched.message && errors.message ? <p style={{ color: "red" }}>{errors.message}</p> : ""}

                        <div className='d-flex' style={{ justifyContent: "center", alignItems: "center" }}> <button className='btn btn-primary mb-3 register-btn' type='submit'> SEND <span> <SendIcon /> </span> </button> </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Contact