import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,

} from 'chart.js';
import { BikeState } from '../../context/Context';
import Loading from '../Loading/Loading';



ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);


const DoughnutChart = () => {

    const [datas, setDatas] = useState();
    const {url} = BikeState();
    const totalServiceCount = datas && datas.length;

    useEffect(() => {

        axios.get(`${url}/bookings`).then(res => setDatas(res.data.bookings))

    }, [])


    // general service count
    function generalCount() {
        let count = 0;
        datas && datas.map(i => i.serviceType === 'regular service' ? count++ : '')
        return count;
    }

    // repair service count
    function repairCount() {
        let count = 0;
        datas && datas.map(i => i.serviceType === 'Repair Service' ? count++ : '')
        return count;
    }

    // water wash service count
    function waterWashCount() {
        let count = 0;
        datas && datas.map(i => i.serviceType === 'Water Wash' ? count++ : '')
        return count;
    }

    // percentage of each service
    const general_percentage = ((generalCount() / totalServiceCount) * 100).toFixed(2);
    const repair_percentage = ((repairCount() / totalServiceCount) * 100).toFixed(2);
    const water_percentage = ((waterWashCount() / totalServiceCount) * 100).toFixed(2);
    

    const chartData = {
        labels: ["GENERAL", "REPAIR", "WATER WASH"],
        data: [general_percentage, repair_percentage, water_percentage]
    };


    const data = {
        labels: chartData.labels,
        datasets: [{
            label: 'percentage(%)',
            data: chartData.data,
            backgroundColor: ['green', 'red', 'blue'],
            borderColor: ['black', 'black', 'black']
        }]
    }

    const options = {

        hoverBorderWidth: 5,
        plugins: {
            legend: {
                display: true
            }
        }

    }


    return (
        datas ? (
        <div>
                    <div >
                        <h2 className='m-2'>OVERALL SERVICE DETAIL</h2>

                        <div className='chart-container m-2 d-flex' style={{flexWrap:'wrap'}}>

                          <div>  <Doughnut data={data} options={options} > </Doughnut> </div>

                            <div className='chart-detail m-2' >
                                <h4>GENERAL :  <span style={{ color: "green" }} > {generalCount()} </span> </h4>
                                <h4>REPAIR : <span style={{ color: "red" }} > {repairCount()} </span> </h4>
                                <h4>WASTER WASH : <span style={{ color: "blue" }} > {waterWashCount()} </span> </h4>
                            </div>
                        </div>
                    </div> 
        </div> ) : <Loading/>
    )
}

export default DoughnutChart