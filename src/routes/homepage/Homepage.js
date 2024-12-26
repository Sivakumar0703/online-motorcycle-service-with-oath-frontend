import React from 'react'
import '../homepage/Homepage.css'
import Carousell from '../../components/Carousel/Carousel'
import Nav from "../../components/Navbar/Nav"
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'


// importing images
import WashImage from './images/wash.jpg';
import GeneralImage from './images/general.jpg';
import RepairImage from './images/repair.jpeg'
import { useEffect } from 'react'
import axios from 'axios'
import { BikeState } from '../../context/Context'
import { toast } from 'react-toastify'


const Homepage = () => {

  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const {url} = BikeState();


  function gotoWash() {
    user ? navigate('/washing') : alert('Please Login')
  }

  function gotoGeneral() {
   user ? navigate('/service') : alert('Please Login')
  }

  function gotoRepair() {
   user ? navigate('/repair') : alert('Please Login')
  }

  /*
  {
    {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    }
}
}
  */

  async function getUserDataFromGoogle(){
    try {

      /*
      const dataFromCookie = await axios.get(`${url}/users/access_user_data` , {   
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        // withCredentials:true
    });
    */
      const dataFromCookie = await fetch(`${url}/users/access_user_data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensures cookies are sent with the request
      });




      const isUserDataAvailableInLocal = localStorage.getItem('user')
      if(dataFromCookie.data.success && !isUserDataAvailableInLocal){
        localStorage.setItem('user',JSON.stringify(dataFromCookie.data.user)); 
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  useEffect(() => {
    getUserDataFromGoogle()
  },[])
  

  return (
    <div className='homepage'>

      <Nav />
      <div>  <Carousell />   </div>

      <div className='options row'>
        
        {/* wash service */}
        <div className='first-service col-11 col-md-4'>
          <div>
            <p className='service-name'>WASH</p>
          </div>
          <div className='service-picture col-10'>
            <img src={WashImage} alt='first' />
          </div>
          <div>
            <button className='btn btn-warning service-btn' onClick={gotoWash}> CLICK </button>
          </div>
        </div>

        {/* general service */}
        <div className='second-service col-11 col-md-4'>
          <div>
            <p className='service-name'>GENERAL</p>
          </div>
          <div className='service-picture col-10'>
            <img src={GeneralImage} alt='first' />
          </div>
          <div>
            <button className='btn btn-warning service-btn' onClick={gotoGeneral}> CLICK </button>
          </div>
        </div>

        {/* repair */}
        <div className='third-service col-11 col-md-4'>
          <div>
            <p className='service-name'>REPAIR</p>
          </div>
          <div className='service-picture col-10'>
            <img src={RepairImage} alt='first' />
          </div>
          <div>
            <button className='btn btn-warning service-btn' onClick={gotoRepair}> CLICK </button>
          </div>
        </div>


      </div>


      

      {/* card */}
      <div className='about-servcie'>
        <div className='about-card'>
          <p className='about-title'>  QUALITY ASSURED </p>
          <p className='about-text'>  The best two wheeler services delivered in your parking with assured quality. </p>
          <ul>
            <li> Contactless Service </li>
            <li> Genuine Spares </li>
            <li> Skilled Mechanics </li>
            <li> 7 day service warranty </li>
          </ul>
        </div>
      </div>


      <div className='about-service-image col-12 col-md-6'>
        <img src={require("./mechanics.webp")} alt="mechanics" />
      </div>



      <Footer />
    </div>

  )
}

export default Homepage