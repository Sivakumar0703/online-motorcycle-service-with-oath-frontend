// bookings list

import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import axios from 'axios'
import '../admin/Admin.css'
import Table from 'react-bootstrap/Table';
import dayjs from 'dayjs'
import moment from 'moment/moment'
import Adminnav from './Adminnav'
import { useNavigate } from 'react-router-dom'
import { BikeState } from '../../context/Context';
import Loading from '../../components/Loading/Loading';

const Admin = () => {

  
    const navigate = useNavigate()
    const{url} = BikeState();
    const today = new Date
    const current_date = dayjs(today).format('YYYY-MM-DD');
    var serial_number = 0; // serial number to the table
    const [psearch, setPsearch] = useState(''); // search
    const [paymentData, setPaymentData] = useState(); //payment

    // get bookings data
    async function getbookings() {
        await axios.get(`${url}/bookings`).then((res) => {
            setPaymentData(res.data.bookings)
        })
    }

    useEffect(() => {

        getbookings();

         // avoid other users to enter into the admin url
        if(JSON.parse(localStorage.getItem('user')).role !== 'admin'){
              navigate('/')
        }

    }, [])


    return (

        <div >

            <Adminnav />

            <div>
                <h3 style={{margin:'10px'}}>UPCOMING SERVICE LIST</h3>
            </div>

{/* search field */}
            <div className='upcoming-services container'>
                <div className='search-bar m-3'>
                    <input type='search' placeholder='Search here...' value={psearch} onChange={e => setPsearch(e.target.value)} />
                </div> 

                {/* bookings list */}
               { paymentData ? (
                <Table striped className='mb-3 mt-3' variant='info' hover responsive>

                    <thead >
                        <tr>
                            <th>SI.NO</th>
                            <th>Customer Name</th>
                            <th>Contact</th>
                            <th>Bike Company</th>
                            <th>Model</th>
                            <th>Service Type</th>
                            <th>Home Service</th>
                            <th>Service Date</th>
                            <th>Time Slot</th>
                            <th>Amount Paid</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {/* sort date in ascending order */}
                        {paymentData && paymentData.sort(function (a, b) {

                        if (a.serviceDate < b.serviceDate) return -1;

                        if (a.serviceDate > b.serviceDate) return 1;

                        return 0;
                    })
                        .filter(item => {
                            if (psearch === '') {
                                return item
                            } else if (item.bike.toLowerCase().includes(psearch.toLowerCase())) {
                                return item
                            } else if (item.model.toLowerCase().includes(psearch.toLowerCase())) {
                                return item
                            } else if (item.name.toLowerCase().includes(psearch.toLowerCase())) {
                                return item
                            } else if (item.mobile?.includes(psearch)) {
                                return item
                            } else if (item.serviceType.toLowerCase().includes(psearch.toLowerCase())) {
                                return item
                            } else if (item.paid?.includes(psearch)) {
                                return item
                            } else if (item.serviceDate?.includes(psearch)) {
                                return item
                            }
                        })
                        .map((item, index) => {

                            if (moment(current_date).isSameOrBefore(item.serviceDate)) {
                               // thisDay.push(item)
                                

                                return (

                                    <tr key={item._id}>
                                        <td> {serial_number = serial_number + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.mobile}</td>
                                        <td>{item.bike}</td>
                                        <td>{item.model}</td>
                                        <td>{item.serviceType}</td>
                                        <td>{item.homeService ? 'YES' : 'NO'}</td>
                                        <td>{item.serviceDate}</td>
                                        <td>{item.time ? item.time : 'NULL'}</td>
                                        <td>{item.paid ? item.paid : 'N/A'}</td>
                                    </tr>
                                )

                            }
                        })}
                    </tbody>
                </Table> ) : <Loading/> }
            </div>

            <Footer />
        </div>

    )
}

export default Admin