import React, { useEffect, useState } from 'react'
import service_data from './service_data'; // static data (general service list)
import './Service.css'
import { BikeState } from '../../context/Context';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify'
import Mininav from '../../components/Navigation/Mininav';
import dayjs from 'dayjs';
import Loading from '../../components/Loading/Loading';
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom';

const Services = () => {

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [register, setRegister] = useState('');
    const [bike, setBike] = useState('');
    const [model, setModel] = useState('');
    const [pricee, setPricee] = useState('');
    const [orderId, setOrderId] = useState(); // order id
    const [show, setShow] = useState(false); // for modal
    const handleClose = () => setShow(false); // for modal
    const handleShow = () => setShow(true); // for modal
    const navigate = useNavigate();
    const { bikes, price, url } = BikeState();
    const email = JSON.parse(localStorage.getItem('user'))?.email;
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    const user = localStorage.getItem('user');
    const bikeAry = [];
    let brand = [];


    // disable past date from calendar
    let current_date = new Date();
    let current_time = new Date().toISOString()
    let datee = current_date.getDate(); // 2,5,10,15...
    let month = current_date.getMonth() + 1; // 6,7,10,12
    let year = current_date.getUTCFullYear(); // 2023

    if (month < 10) {
        month = "0" + month; // 03,04,05...
    }
    if (datee < 10) {
        datee = "0" + datee; // 02,03,07
    }


    let minDate = `${year}-${month}-${datee}`; // yyyy-mm-dd
    const [date, setDate] = useState(minDate); // yyyy-mm-dd
    const [detail, setDetail] = useState(); // get a selected bike's data for displaying the image


    // get all brands without duplicates
    bikes && bikes.map((i) => bikeAry.push(i.bikeCompany))
    brand = unique(bikeAry)


    function booknow(e) {
        e.preventDefault();
        customerData();
    }

    async function customerData() {
        const customer = {
            name,
            mobile,
            register,
            bike,
            model,
        }
        if (customer.name === '' || customer.mobile === '' || customer.register === '' || customer.bike === '' || customer.model === '') {
            alert('please submit a valid form')
        } else {
            handleShow(customer);
        }
    }

    async function bookings() {
        const bookingData = {
            name,
            mobile,
            date,
            register,
            bike,
            model,
            serviceDate: dayjs(date).format('YYYY-MM-DD'),
            orderId,
            price: pricee,
            email,
            serviceType: 'regular service',
            userId: userId
        }
        await axios.post(`${url}/bookings/general/service/addbooking`, bookingData)
        setName('');
        setMobile('');
        setRegister('');
        setDate('');
        setModel('');
        setBike('');
    }


    useEffect(() => {

        if (!user) {
            navigate('/');
            toast.warning('Please Login')
        }

        // setting price based on bike's cc
        // bikes && bikes.map((i) => {
        //     console.log('bike',i)
        //     if (i.model === model) {
        //         if (i.cc >= 100 && i.cc < 125) {
        //             setPricee(price && price.generalServicePrice.general1)
        //         } else if (i.cc >= 125 && i.cc < 200) {
        //             setPricee(price && price.generalServicePrice.general2)
        //         } else {
        //             setPricee(price && price.generalServicePrice.general3)
        //         }
        //         setDetail(i)
        //     }
        // })

        if(bikes){
            const getBike = bikes && bikes.filter(i => i.model === model)[0];
        console.log('getBike',getBike)
        if(getBike){
            if (getBike.cc >= 100 && getBike.cc < 125) {
                console.log('set price' , price)
                setPricee(price && price.generalServicePrice.general1)
            } else if (getBike.cc >= 125 && getBike.cc < 200) {
                console.log('> 200 set price' , price)
                setPricee(price && price.generalServicePrice.general2)
            } else {
                console.log('set price else' , price)
                setPricee(price && price.generalServicePrice.general3)
            }
            console.log('details')
            getBike && setDetail(getBike)
        }     
        }

        
    }, [model])

    // to remove duplicates in array
    function unique(array) {
        return array.filter((item, index) => array.indexOf(item) === index)
    }



    useEffect(() => {
        async function getData() {

            try {
                // razor - to get order id        
                price && await axios.post(`${url}/razorpay/order`, { amount: pricee }).then((res) => {
                setOrderId(res.data.orderId)  
                })
            } catch (error) {
                toast.error('Cannot get order id')
            }
        }
        getData();
    }, [pricee])

    // for payment verification
    function verify(payment, order, signature) {
        try {
            axios.post(`${url}/razorpay/api/payment/verify`, { paymentId: payment, orderId: order, signature: signature });
            handleClose();
        } catch (error) {
            console.log('error in sending payment verification data cart.js', error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var options = {
            key: "rzp_test_f3Zt6s7fSoiZSu",
            secret: "ObqLEeSpRqphtxBZI88ju0E7",
            amount: pricee * 100,
            currency: "INR",
            name: "Online Motocycle Service Booking",
            description: [bike, model],
            order_id: orderId,
            handler: function (response) {

               // console.log("Payment_ID : ", response.razorpay_payment_id, '|', 'order_id : ', response.razorpay_order_id, '|', 'signature : ', response.razorpay_signature)
                // payment verification
                if (response.razorpay_payment_id) {
                    verify(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature)
                    bookings();
                    toast.success("Payment Successful");
                    toast.success("Booking successful");
                }
                // verfication ends
            },
            prefill: {
                name: JSON.parse(localStorage.getItem('user')).userName, //your customer's name
                email: JSON.parse(localStorage.getItem('user')).email,
                contact: JSON.parse(localStorage.getItem('user')).mobile
            },
            notes: {
                address: "N0 13 18-cross street;Vadamathurai;641017" // company address
            },
            theme: {
                color: "#3399cc"
            }
        };
        var pay = new window.Razorpay(options);
        pay.open()
    }






    return (
        <div  >
            <Mininav />

            <div className='booking-form  '>
                <div className='bike-details ' > <form onSubmit={booknow}>
                    <h2> Bike Details </h2>
                    <div className='bike-detail-feilds mb-2'> <input className='input' type='text' pattern='[A-Za-z]{1,15}' title="Name must have atleast 3 characters(only alphabets)" placeholder='Name' value={name}  onChange={e => setName(e.target.value)} required /> </div>
                    <div className='bike-detail-feilds mb-2'> <input type="number" name="mobile" pattern="[0-9]{10}" title='please enter 10 digit mobile number' className='input' placeholder='mobile' value={mobile} onChange={e => setMobile(e.target.value)} required /> </div>
                    <div className='bike-detail-feilds mb-2'> <input className='input' placeholder='Bike Registration Number'  value={register} onChange={e => setRegister(e.target.value)} required /> </div>
                    <div className='bike-detail-feilds mb-2'> <select placeholder='Select Bike Company' onChange={e => setBike(e.target.value)} required>
                        <option value=''> Select Bike  </option>
                        {brand.map((i) => <option value={i} key={i._id} > {i} </option>)}
                    </select> </div>
                    <div className='bike-detail-feilds mb-2'> <select placeholder='Select Model' onChange={e => setModel(e.target.value)} required>
                        <option value=''> Select Model  </option>
                        {bikes && bikes.map((i) => bike && bike == i.bikeCompany ? <option value={i.model} key={i._id}> {i.model} </option> : '')}
                    </select> </div>
                    <div>  <input className='input mb-2' id="calendar" type="date" value={date} min={minDate} onChange={e => setDate(e.target.value)} required /> </div>

                    <div>  <button className='btn btn-success' type="submit"> BOOK NOW</button> </div>
                </form>
                </div>


                {/* modal */}
                {detail &&
                    <div>
                        <Modal show={show} onHide={handleClose} >
                            <Modal.Header >
                                <Modal.Title style={{ textAlign: "center" }}> General Bike Service </Modal.Title>
                            </Modal.Header>
                            <Modal.Body ><b><p>Brand : </p></b> <span>{detail.bikeCompany}</span> </Modal.Body>
                            <Modal.Body ><b><p>Model : </p></b> <span>{detail.model}</span> </Modal.Body>
                            <Modal.Body><b><p>PRICE : </p></b><span>₹{pricee}</span></Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={handleSubmit}>
                                    Confirm Payment
                                </Button>
                                <Button variant="danger" onClick={handleClose}>
                                    Close
                                </Button>

                            </Modal.Footer>
                        </Modal>

                    </div>
                }

                <div className='booking-form-img'>
                    <img className='book' src={require('./images/book_now.png')} alt='book now' />
                </div>
            </div>

            {/* bike image div */}
            <div className='bike-img'>
                {detail && detail.model === model ? <img src={detail.image} alt='bike' /> : <Loading />}
            </div>

            {/* service detail list */}
            <div className='general_service'>

                <div className='service-list'>
                    <p> What are the things get covered in regular service ?  </p>
                    <ul>
                        {service_data.map((i) => <li key={i.id}> {i.value}  </li>)}
                    </ul>
                </div>

                <div className='service-img mb-5'>
                    <img src={require('./images/mechanic.png')} alt="cartoon" />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Services