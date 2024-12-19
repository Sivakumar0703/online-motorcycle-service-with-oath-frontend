import React, { useEffect } from 'react'
import "../wash/Washing.css"
import Booking from '../../components/Booking/Booking'
import Mininav from '../../components/Navigation/Mininav';
import { BikeState } from '../../context/Context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Washing = () => {

  const navigate = useNavigate();
  const { price, url } = BikeState();
  const amount = price && price.washServicePrice;
  const serviceType = "Water Wash";
  const url_address = `${url}/bookings/water/wash/service/addbooking`;
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      navigate('/');
      toast.warning('Please Login')
    }
  }, [])


  return (
    <div className='washing-page'>

      <Mininav />

      <div className='img-info'>

        <div className='bike-wash-img  m-2'>
          <img src={require("../wash/Bike-Wash.jpg")} alt="bike-wash" />
        </div>


        <div className='info-container'>

          <div className='info-1'>
            <p className='question'> Why it is required?</p>
            <p> This service is recommended to maintain the basic hygiene of the Bike.  </p>
          </div>

          <div className='info-2'>
            <p className='question'> How we do it? </p>
            <p> This service includes Foam Wash of Bike's Body paint together with the polishing of Tyre/ Plastic/ Vinyl components of the bike.
              This comprehensive service helps to keep Bike clean, tidy and shiny  </p>
          </div>

        </div>

      </div>

      <div> <Booking amount={amount} url_address={url_address} serviceType={serviceType} className='mt-3' /> </div>

    </div>
  )
}

export default Washing