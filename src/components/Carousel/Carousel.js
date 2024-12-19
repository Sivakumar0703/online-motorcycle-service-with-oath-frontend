import React from 'react'
import { Carousel } from 'react-bootstrap';
import '../Carousel/Carousel.css' ;

const Carousell = () => {
  return (
    <div className="carousel-container">
          
          <Carousel  className='carousel'>

      <Carousel.Item>
       <div className='sliding-img'>
       <img
          className="d-block w-100 "
          src={require('./images/car-1.jpg')}
          alt="First slide"
        />
       </div>
        <Carousel.Caption>
          <h1 className='caption'>Skilled Mechanics</h1>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <div className='sliding-img'>
        <img
          className="d-block w-100 sliding-img"
          src={require('./images/car-2.jpg')}
          alt="Second slide"
        />
</div>
        <Carousel.Caption>
          <h1 className='caption'>Genuine Spares</h1>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <div className='sliding-img' >
        <img
          className="d-block w-100 sliding-img"
          src={require('./images/car-3.jpeg')}
          alt="Third slide"
        />
</div>
        <Carousel.Caption>
          <h1 className='caption'>On Time Delivery</h1>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>



    </div>
  )
}

export default Carousell