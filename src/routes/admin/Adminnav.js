import React from 'react'


const Adminnav = () => {
    return (

        <div>

            <nav className='navbar navbar-expand-lg navbar-dark bg-info '>

                <div className='container'>

                    <a href='#' className='navbar-brand'> ADMIN  </a>

                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navv'> <span className='navbar-toggler-icon'></span> </button>

                    <div className='collapse navbar-collapse' id='navv'>
                        <ul className='navbar-nav'>

                            <li className='nav-item '>
                                <a href="/admin/add/bikes" className='nav-link '> Add Bike </a>
                            </li>

                            <li className='nav-item '>
                                <a href="/admin/bookings" className='nav-link'> Bookings </a>
                            </li>

                            <li className='nav-item '>
                                <a href="/admin/dashboard" className='nav-link'> Dashboard </a>
                            </li>

                            <li className='nav-item '>
                                <a href="/" className='nav-link '> Home </a>
                            </li>

                            <li className='nav-item '>
                                <a href="/admin/price" className='nav-link'> Set Price </a>
                            </li>

                        </ul>
                    </div>
                </div>

            </nav>
        </div>
    )
}

export default Adminnav