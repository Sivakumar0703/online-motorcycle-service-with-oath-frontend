import React from 'react'
import '../Footer/Footer.css'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

const navigate = useNavigate();

function gotoContact(){
    navigate('/contact')
}

    return (











        <div className='footer'>

            <div className='address '>
                <h3>LOCATION</h3>

                <span className='address'>No 13 8th Cross Street</span>
                <span className='address'> Vadamadurai 641017</span>
                <span className='address'>Dindigul District</span>
                <span className='address'>Tamil Nadu</span>
            </div>


            <div className='social '>
                <div className='footer-content'>
                    <h3>SOCIAL</h3>

                    <a className="anchor" href='#'>Blog</a>
                    <a className="anchor" href='#'>Facebook</a>
                    <a className="anchor" href='#'>Instagram</a>
                    <a className="anchor" href='#'>Linkedin</a>
                    <a className="anchor" href='#'>Twitter</a>
                </div>
            </div>


            <div className='company'>
                <div className='footer-content'>
                    <h3>COMPANY</h3>

                    <a className="anchor" href='#'>About Us</a>
                    <a className="anchor" href='#'>Career</a>
                    <a className="anchor" href='#'>Terms And Condition</a>
                    <a className="anchor" href='#'>Private Policy</a>
                </div>
            </div>


            <div className='contact'>
                <h3>CONTACT</h3>
                <button className='btn btn-success' onClick={gotoContact}>CLICK HERE</button>
            </div>





        </div>


























    )
}

export default Footer