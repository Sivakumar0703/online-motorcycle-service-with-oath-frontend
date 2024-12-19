import React from 'react';
import { useEffect, useState } from "react";
import "../Booking/Booking.css";

import { TextField } from '@mui/material';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as yup from 'yup'; // for form validation schema
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify'
import { BikeState } from '../../context/Context';
//import InfoIcon from '@mui/icons-material/Info';
//import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';

import MenuItem from '@mui/material/MenuItem';
// mui - datepicker
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// Service at home
var HomeServiceRegisterSchemaValidation = yup.object({
    name: yup.string().min(3, 'name should have minimum 3 character').required("Enter Your Name"),
    address1: yup.string().required("Enter address1"),
    mobile: yup.string().matches(/^[0-9]{10}/, "Enter valid mobile number").required("Enter Mobile Number"),
    email: yup.string().email().required("Enter Email"),
    address2: yup.string().required('please enter your city/village'),
    pincode: yup.string().matches(/^[0-9]{6}/, "Please use numbers alone").required('Please enter 6 digit pincode'),
    bike: yup.string().required('Select brand'),
    model: yup.string().required('Select bike model'),
    time: yup.string().required('Select time slot'),
})

// Service at garage
var registerSchemaValidation = yup.object({
    name: yup.string().min(3, 'name should have minimum 3 character').required("Enter Your Name"),
    mobile: yup.string().matches(/^[0-9]{10}/, "Enter valid mobile number").required("Enter Mobile Number"),
    email: yup.string().email().required("Enter Email"),
    bike: yup.string().required('Select brand'),
    model: yup.string().required('Select bike model'),
    time: yup.string().required('Select time slot'),
})

const Booking = ({ amount, url_address, serviceType }) => {

    const { bikes } = BikeState([]);
    const [orderId, setOrderId] = useState();
    const [disable, setDisable] = useState(false);
    const [checked, setChecked] = useState(true); //checkbox
    const today = dayjs();
    const [date, setDate] = useState(today);
    const { url } = BikeState();

    const price = amount;
    const bikeAry = [];
    let brand = [];
    const timeslot = ["09:00", "11:00", "14:00", "16:00"];
    const today_format = dayjs(date).format('YYYY-MM-DD'); // service date
    const user = JSON.parse(localStorage.getItem('user'));


    // formik function
    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: {
            name: "",
            address1: "",
            mobile: "",
            email: "",
            address2: "",
            pincode: "",
            serviceType: serviceType,
            bike: '',
            model: '',
            time: '',
        },

        validationSchema: checked ? HomeServiceRegisterSchemaValidation : registerSchemaValidation,
        onSubmit: (bookingData, onSubmitProps) => {
            getData(bookingData)
            onSubmitProps.resetForm() // reset input feilds
            setDisable(false)
        }

    })

    // to remove duplicates in brand array
    function unique(array) {
        return array.filter((item, index) => array.indexOf(item) === index)
    }

    // check box for home service
    function checkbox(val) {
        setChecked(val)
    }


    // get all brands with duplicates
    bikes && bikes.map((i) => bikeAry.push(i.bikeCompany))
    brand = unique(bikeAry)



    // fetching order id from backend
    async function getData(bookingData) {
        try {
            await axios.post(`${url}/razorpay/order`, { amount: price && price }).then((res) => {
                setOrderId(res.data.orderId)
                handleSubmitt(res.data.orderId, bookingData)
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (values.bike.length > 2) {
            setDisable(true)
        }
    }, [values.model])

    // for payment verification
    async function verify(payment, order, signature, bookingData) {

        await axios.post(`${url}/razorpay/api/payment/verify`, { paymentId: payment, orderId: order, signature: signature }).then(res => {

            if (res.data.signatureIsValid === "true") {
                //  user booking detail to backend for storing in db
                axios.post(url_address, { ...bookingData, homeService: checked, userId: user.id, paid: price, orderId: order, serviceDate: today_format })
                toast.success("Payment Successful");
                toast.success("Booking successful");
            } else {
                toast.error("Payment Failed")
            }

        })

    }

    // razorpay payment integration
    const handleSubmitt = async (id, bookingData) => {

        var options = {
            key: "rzp_test_f3Zt6s7fSoiZSu",
            secret: "ObqLEeSpRqphtxBZI88ju0E7",
            amount: price * 100,
            currency: "INR",
            name: "Online Motocycle Service Booking",
            description: 'service',
            order_id: id,
            handler: function (response) {
                // payment verification
                if (response.razorpay_payment_id) {
                    verify(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature, bookingData)
                } else {
                    toast.error("Booking failed");
                }
                // verfication ends
            },
            prefill: {
                name: JSON.parse(localStorage.getItem('user')).userName, //your customer's name
                email: JSON.parse(localStorage.getItem('user')).email,
                contact: JSON.parse(localStorage.getItem('user')).mobile
            },
            theme: {
                color: "#3399cc"
            }
        };
        var pay = new window.Razorpay(options); // if payment is successful
        pay.open()

    }



    return (
        <div className='bookings-form'>

            <form onSubmit={handleSubmit} style={{ backgroundColor: 'transparent' }}>
                <div className='form-filling row col-12'>
                    <div className='left col-12 col-md-4' style={{padding:'10px'}}>

                        <TextField id="outlined-basic1" required label="USER NAME" onBlur={handleBlur} variant="outlined" fullWidth margin="normal" name="name" value={values.name} onChange={handleChange} />
                        {touched.name && errors.name ? <p className="error-msg" style={{ color: "red" }}>{errors.name}</p> : ""}

                        <TextField id="outlined-basic3" required label="MOBILE NUMBER" variant="outlined" onBlur={handleBlur} inputProps={{maxLength:'10'}} fullWidth margin="normal" name="mobile" value={values.mobile} onChange={handleChange} />
                        {touched.mobile && errors.mobile ? <p className="error-msg" style={{ color: "red" }}>{errors.mobile}</p> : ""}

                        <TextField id="outlined-basic2" required label="EMAIL" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="email" value={values.email} onChange={handleChange} />
                        {touched.email && errors.email ? <p className="error-msg" style={{ color: "red" }}>{errors.email}</p> : ""}

                        <TextField id="outlined-basic2" required label="House No & Street Name" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="address1" value={values.address1} onChange={handleChange} disabled={!checked} />
                        {touched.address1 && errors.address1 ? <p className="error-msg" style={{ color: "red" }}>{errors.address1}</p> : ""}

                        <TextField id="outlined-basic4" required label="City/Village" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="address2" value={values.address2} onChange={handleChange} disabled={!checked} />
                        {touched.address2 && errors.address2 ? <p className="error-msg" style={{ color: "red" }}>{errors.address2}</p> : ""}
                    </div>

                    <div className='right col-12 col-md-4' style={{margin:'0' , padding:'10px'}}>

                        <TextField id="outlined-basic5" required label="Pincode" variant="outlined" inputProps={{maxLength:'6'}} fullWidth margin="normal" name="pincode" value={values.pincode} onChange={handleChange} disabled={!checked} />
                        {touched.pincode && errors.pincode ? <p className="error-msg" style={{ color: "red" }}>{errors.pincode}</p> : ""}



                        <TextField select id="Brand" label="Brand" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="bike" value={values.bike} onChange={handleChange}
                            error={touched.bike && Boolean(errors.bike)} helperText={touched.bike && errors.bike} disabled={disable}  >

                            <MenuItem key={""} value={""} disabled> --select brand--  </MenuItem>

                            {brand.map((i) => <MenuItem value={i} key={i._id} > {i} </MenuItem>)}
                        </TextField>

                        <TextField select id="Model" label="Model" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="model" value={values.model} onChange={handleChange}
                            error={touched.model && Boolean(errors.model)} helperText={touched.model && errors.model} >
                            <MenuItem key={""} value={""} disabled> --select brand--  </MenuItem>
                            {bikes && bikes.map((i) => values.bike && values.bike == i.bikeCompany ? <MenuItem value={i.model} key={i._id}> {i.model} </MenuItem> : '')}

                        </TextField>


                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker
                                label='Select Date'
                                format="DD/MM/YYYY"
                                value={date}
                                onChange={(e) => setDate(e)}
                                disablePast
                                className='mt-3 mb-2'
                                fullWidth

                            />
                        </LocalizationProvider>



                        <TextField select id="timeslot" label="Time-Slot" variant="outlined" onBlur={handleBlur} fullWidth margin="normal" name="time" value={values.time} onChange={handleChange}
                            error={touched.time && Boolean(errors.time)} helperText={touched.time && errors.time} >
                            <MenuItem key={""} value={""}> --select time slot--  </MenuItem>
                            {timeslot.map((i) => <MenuItem value={i} key={i}> {i} </MenuItem>)}
                        </TextField>
                    </div>
                </div>


                <FormControlLabel control={<Checkbox onChange={(e) => checkbox(e.target.checked)} checked={checked} />} label="Home Service" />

                <div className='form-btn'>
                    <button className='btn btn-primary mb-3 register-btn' type='submit' onClick={handleSubmit} >BOOK NOW</button>   {/* <Tooltip title="hello" placement="right" arrow > <InfoIcon />  </Tooltip>    */}
                </div>

            </form>

        </div>
    )
}

export default Booking