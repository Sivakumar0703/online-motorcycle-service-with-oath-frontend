import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Linechart from '../../components/Chart/Linechart'
import DoughnutChart from '../../components/Chart/Doughnut'
import Table from 'react-bootstrap/Table';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BikeState } from '../../context/Context';
import '../admin/Admin.css'
import Adminnav from './Adminnav';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';

const Dashboard = () => {

    const [search, setSearch] = useState('');

    const { bikes , url } = BikeState();
    const navigate = useNavigate();


    // deleting bike data
    function deleteData(data) {
        const id_number = data._id;
        try {
            axios.delete(`${url}/bikes/delete/${id_number}`)
            window.location.reload(true)

        } catch (error) {
            toast.error('Deletion Failed')
        }
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user')).role !== 'admin'){
            navigate('/')
    }
    },[])


    return (
        <>
            <Adminnav />
            <div className='container'>

            {/* line chart */}
            <div className='linechart'>
                <p>MONTH-WISE SERVICE BOOKING RECORD (* all the services are taken into account) </p>
                <Linechart />
            </div>

            {/* Bikes model list that are avilable for serivce */}
            <div className='bike-table'>
                <p>BIKES AND MODELS THAT ARE AVAILABLE FOR SERVICE/REPAIR IN OUR GARAGE</p>
                <div className='search-bar'>
                    <input type='search' placeholder='Search here...' value={search} onChange={e => setSearch(e.target.value)} />
                </div>

               { bikes ? (
                <Table striped responsive className='mb-3 mt-3 '>
                    <thead>
                        <tr>
                            <th>SI.NO</th>
                            <th>Bike Company</th>
                            <th>Model</th>
                            <th>CC</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>{bikes && bikes.filter(item => {
                        if (search === '') {
                            return item
                        } else if (item.bikeCompany.toLowerCase().includes(search.toLowerCase())) {
                            return item
                        } else if (item.model.toLowerCase().includes(search.toLowerCase())) {
                            return item
                        } else if (item.cc.toLowerCase().includes(search.toLowerCase())) {
                            return item
                        }
                    })

                        .map((item, index) => {
                            return (
                                <tr key={item._id}>
                                    <td> {index + 1}</td>
                                    <td>{item.bikeCompany}</td>
                                    <td>{item.model}</td>
                                    <td>{item.cc}</td>
                                    <td> <button className='btn btn-danger' onClick={() => deleteData(item)}> <DeleteForeverIcon /> </button>  </td>
                                </tr>
                            )
                        })}


                    </tbody>
                </Table> ) : <Loading/> }
            </div>
                <br/>
                <br/>

             {/* Doughnut chart - shows overall service data */}
            <div className='doughnutchart'>
                <p>FIND MORE ABOUT OUR SERVICE HERE</p>
                <p>TAKE A LOOK ABOUT OUR SERVICES.EASY TO NOTICE WHICH SERVICE IS NEEDED THE MOST </p>
                <DoughnutChart />
            </div>

        </div >
        </>
     
    )
}

export default Dashboard