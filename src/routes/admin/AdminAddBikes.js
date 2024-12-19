import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TextField } from '@mui/material'
import '../admin/Admin.css'
import { toast } from 'react-toastify'
import Adminnav from './Adminnav'
import { useNavigate } from 'react-router-dom'
import { BikeState } from '../../context/Context'

const AdminAddBikes = () => {

    // adding new bike
    const [bikeCompany, setBikeCompany] = useState('');
    const [model, setModel] = useState('');
    const [cc, setCc] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();
    const {url} = BikeState();


    async function savedata() {
        
        const newBike = {
            bikeCompany,
            model,
            cc,
            image
        }

        try {
            await axios.post(`${url}/bikes/addbike`, newBike)
            .then(res => res.data.message === 'bike added successfully' ? toast.success('Bike added successfully') : toast.error('Adding New Bike Failed'))

            // reset input fields
            setBikeCompany('');
            setModel('');
            setCc('');
            setImage('');
        } catch (error) {
            console.log('error in adding new bike', error);
        }
    }

    // Prevent other users to enter into this url
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user')).role !== 'admin') {
            navigate('/')
        }
    }, [])


    return (
        <div>
            <Adminnav />

            <div className='add-new-bike'>
                <p className='add-bike-heading'> ADD NEW BIKE HERE</p>
                <TextField className="mb-3 mt-3" label="Bike Company" variant="outlined" color="secondary" value={bikeCompany} onChange={(e) => setBikeCompany(e.target.value)} style={{ width: "300px" }} />
                <TextField className="mb-3" label="Model" variant="outlined" color="secondary" value={model} onChange={(e) => setModel(e.target.value)} style={{ width: "300px" }} />
                <TextField className="mb-3" label="Bike CC" variant="outlined" color="secondary" value={cc} onChange={(e) => setCc(e.target.value)} style={{ width: "300px" }} />
                <TextField className="mb-3" label="Image Link" variant="outlined" color="secondary" value={image} onChange={(e) => setImage(e.target.value)} style={{ width: "300px" }} />
                <button className="mb-5 btn btn-primary" color="secondary" onClick={() => savedata()}> SAVE </button>
            </div>
        </div>
    )
}

export default AdminAddBikes