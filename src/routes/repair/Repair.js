import React, { useState, useEffect } from 'react'
import '../repair/Repair.css'
import { toast } from 'react-toastify'
import { BikeState } from '../../context/Context';
//import InfoIcon from '@mui/icons-material/Info';
//import Tooltip from '@mui/material/Tooltip';
import Mininav from '../../components/Navigation/Mininav';
import Booking from '../../components/Booking/Booking';
import { useNavigate } from 'react-router-dom';



const Repair = () => {

    
    const {url} = BikeState();
    const url_address = `${url}/bookings/repair/service/addbooking`;
    const { bikes, price } = BikeState();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {

        if (!user) {
            navigate('/')
            toast.warning('Please Login')
        }
    }, [])



    return (
        <div className='repair-service-page'>
            <Mininav />

            <div className='header'>
                <img src={require('./images/pulse.gif')} alt="pulse" />
            </div>

            <h1> Is your bike in bad condition? No worries we are here to help you <span> 🧑‍🔧  </span> </h1>



            <div className='details_and_instructions row '>
                <div className='instructions col-10 col-md-5'>
                    <h3 className='instructions-text' style={{textAlign:'center'}}> Running Repairs </h3>
                    <p className='instructions-text'> We offers the convenience of availing all kinds of repairs at the doorstep </p>
                    <p className='instructions-text'>  A lot of times you face nagging issues and you don't really know what's gone wrong or
                        need a quick spare fix or replacement. In 90% of the cases, you wouldn't know what part
                        or repair is required to fix your problem. We have built the technology
                        and expertise to help you identify the problem and also a probable solution. Our mechanics
                        in 90% cases, resolve the issues in the first visit itself.</p>

                    <p className='instructions-text'>
                        You can also request for a specific part replacement or specific repair to be performed.
                    </p>

                    <h4 className='instructions-text'>Exceptions:</h4>

                    <p className='instructions-text'>
                        Any problems relating to your engine or transmission may be required to be inspected at our hub.
                        Worry not! We do pick and drop services at nominal cost.
                    </p>
                </div>


                <div className='repair-img col-10 col-md-5'>
                    <img src={require('./images/repair.webp')} alt="repair image" />
                </div>
            </div>

            <Booking url_address={url_address} amount={price?.repairServicePrice} serviceType={"Repair Service"}  />

            <div className='pickup-img mt-3 ml-2 row'>
                <img src={require("./images/pickup.png")} />
            </div>

        </div>
    )
}

export default Repair