// nav bar to toggle between services

import React from 'react'

const Mininav = () => {
  return (
    <div>

    <nav className='navbar navbar-expand-lg navbar-dark bg-dark '>

        <div className='container'>

            <a href='#' className='navbar-brand'> MOTO Health Care  </a>

     <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navv'> <span className='navbar-toggler-icon'></span> </button>

        <div className='collapse navbar-collapse' id='navv'>
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item '>
                    <a href="/" className='nav-link'> Home </a>
                </li>

                <li className='nav-item '>
                    <a href="/contact" className='nav-link'> Contact </a>
                </li>

                <li className='nav-item '>
                    <a href="/service" className='nav-link'> Service </a>
                </li>

                <li className='nav-item '>
                    <a href="/washing" className='nav-link '> Water Wash </a>
                </li>

                <li className='nav-item '>
                    <a href="/repair" className='nav-link'> Repair </a>
                </li>

            </ul>
        </div>
        </div>

    </nav>
    
    </div>
  )
}

export default Mininav