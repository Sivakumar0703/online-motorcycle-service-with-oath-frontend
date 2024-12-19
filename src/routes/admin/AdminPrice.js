import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BikeState } from '../../context/Context';
import '../admin/Admin.css';
import Adminnav from './Adminnav';
import { useNavigate } from 'react-router-dom';

const AdminPrice = () => {

  const {price , url} = BikeState();
  const navigate = useNavigate();
  

const[general1 , setGeneral1] = useState(price && price.generalServicePrice?.general1); // < 125 cc
const[general2 , setGeneral2] = useState(price && price.generalServicePrice?.general2); // >125 cc & <200 cc
const[general3 , setGeneral3] = useState(price && price.generalServicePrice?.general3); // >200 cc
const[repair , setRepair] = useState(price && price.repairServicePrice);
const[wash , setWash] = useState(price && price.washServicePrice);

// update price 
function updateChange(){
    const priceList = {
        generalServicePrice : {general1 , general2 , general3} ,
        repairServicePrice : repair ,
        washServicePrice : wash
    }

    axios.put(`${url}/service/price/update/${price._id}` , priceList)
}

useEffect(()=>{
  if(JSON.parse(localStorage.getItem('user')).role !== 'admin'){
    navigate('/')
  }

},[])



  return (

<div className='price-page'>
  <Adminnav />
<p>CHANGE SERVICE PRICE ACCORDING TO THE MARKET PRICE</p>
<p>PLEASE ENTER THE NEWLY FIXED PRICE IN THE RESPECTIVE INPUT BOX AND SAVE CHANGES TO ALTER THE SERVICE COST.</p>


    <div className='price-list '> 
        <label className='price-label' >General Service less than 125 cc </label>  <br/>
        <input  value={general1} placeholder={price && price.generalServicePrice?.general1 } onChange={e => setGeneral1(e.target.value)} /> <br/> 

        <label className='price-label' >General Service greater than 125 cc and less than 200cc</label> <br/>
        <input  value={general2} placeholder={price && price.generalServicePrice?.general2} onChange={e => setGeneral2(e.target.value)} /> <br/>

        <label className='price-label' >General Service for bikes having greater than 200cc</label> <br/>
        <input pvalue={general3} placeholder={price && price.generalServicePrice?.general3} onChange={e => setGeneral3(e.target.value)} /> <br/>

        <label className='price-label' >Repair Service  </label> <br/>
        <input  value={repair} placeholder={price && price.repairServicePrice} onChange={e => setRepair(e.target.value)} /> <br/>

        <label className='price-label' >Water Wash Service</label> <br/>
        <input  value={wash} placeholder={price && price.washServicePrice} onChange={e => setWash(e.target.value)} /> <br/> <br/>

        <button className='btn btn-primary mb-3' onClick={updateChange}> Save Changes  </button>

    </div>
    </div>
  )
}

export default AdminPrice