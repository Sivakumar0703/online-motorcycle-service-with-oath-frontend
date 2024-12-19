import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import { BikeState } from '../../context/Context';
import Loading from '../Loading/Loading';

import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,

    Filler

} from 'chart.js';



ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,

    Filler
)



const Linechart = () => {

    const [info, setInfo] = useState();
    const [bookings, setBookings] = useState([]);
    const {url} = BikeState();


    useEffect(() => {
        async function getData() {
            await axios.get(`${url}/bookings`).then(res => {

                countMonth(res.data.bookings);
                setInfo(res.data.bookings)
            })
        }
        getData()
    }, [])

    //const months = [];
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const booking_data = [];


    function countMonth(data) {

        for (let i = 0; i < 12; i++) {

            let count = 0;
            const length = data.length;

            for (let j = 0; j < length; j++) {
                if (data[j].serviceDate?.split('-')[1] === months[i]) {
                    count++;
                }
            }
            setBookings((old) => [...old, count])
        }
        return 0;

    }


    // chart
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: 'Number of Bookings',
            data: bookings,
            pointBorderColor: 'red',
            backgroundColor: '#9BD0F5',
            borderColor: 'violet',
            fill: true,
            tension: 0.4
        }]
    }

    const options = {
        plugins: {
            legend: true,
        },
        colors: {
            enabled: true,
            forceOverride: true
        },
        scales: {}
    }


    return (
        info ? (
            <div style={{ width: '800px', height: '500px' }}>

                <Line
                    data={data}
                    options={options}
                >

                </Line>

            </div>) : <Loading/>
    )
}

export default Linechart