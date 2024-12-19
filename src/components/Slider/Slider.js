import React from 'react'
import img1 from './SlideImage/Air-Filter-Clean.png'

const Slider = () => {
  return (
    <div> hello slider

    <div className='slider'>

     <div className='track'>


     <div>
        <img src={require('./SlideImage/Air-Filter-Clean.png')} alt='air-Filter' style={{height:'150px' , width:'150px'}} /> 
     </div>

     <div>
        <img src={require('../Slider/SlideImage/Brake-Cleaning.png')} alt='brake-cleaning' />
     </div>

     <div>
        <img src={require('../Slider/SlideImage/Carburettor-Cleaning.png')} alt='carburettor' />
     </div>

     <div>
        <img src={require('../Slider/SlideImage/Chain-Sprocket-Tightening-and-checking.png')} alt='chain-sprocket' />
     </div>

     <div>
        <img src={require('../Slider/SlideImage/Clutch-Adjustment.png')} alt='clutch' />
     </div>

     <div>
        <img src={require('../Slider/SlideImage/Engine-oil-Change.png')} alt='engine-oil' />
     </div>

     <div>
        <img src={require('../Slider/SlideImage/bike-wash.png')} alt='bike-wash' />
     </div>

     <div>
        <img src={require('../Slider/SlideImage/oil-Filter-Change.png')} alt='oil-Filter' />
     </div>

     <div>
        <img src={require('../Slider/SlideImage/spark-plug.png')} alt='spark-plug' />
     </div>


















     </div>





















    </div>

























    </div>
  )
}

export default Slider