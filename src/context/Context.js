import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'


export const BikeContext = createContext();

const MyContext = ({ children }) => {


  const [bikes, setBikes] = useState();
  const [price, setPrice] = useState();
  const [bookings, setBookings] = useState();
  const [users, setUsers] = useState();

  const url = 'https://moto-health-care.onrender.com';
  // const url = 'http://localhost:8000';
 


  useEffect(() => {


    async function getBike() {

      try {
        await axios.get(`${url}/bikes`).then((res) => setBikes(res.data.bikes))
        await axios.get(`${url}/service/price`).then(res => setPrice(res.data.price[0]))
        await axios.get(`${url}/bookings`).then(res => setBookings(res.data.bookings))
        await axios.get(`${url}/users`).then(res => setUsers(res.data.user))
      } catch (error) {
        console.log(error, 'context error')
      }

    }
    getBike();


  }, [])


  return (

    <BikeContext.Provider value={{ bikes, price, setPrice, bookings, users , url}} >

      {children}


    </BikeContext.Provider>

  )
}

export default MyContext

export const BikeState = () => {
  return useContext(BikeContext);
}