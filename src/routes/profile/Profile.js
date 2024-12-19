import React, { useEffect, useState } from 'react'
import Mininav from '../../components/Navigation/Mininav'
import axios from 'axios'
import '../profile/Profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table'
import { BikeState } from '../../context/Context';
import Footer from '../../components/Footer/Footer';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';

const Profilepic = () => {

  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState('');
  const [disable, setDisable] = useState(true);
  const { users, bookings, url } = BikeState();
  const [userData, setUserData] = useState();
  const [booking, setBooking] = useState([]);
  const [isGoogleProfileImage , setIsGoogleProfileImage] = useState(null);

  const email = JSON.parse(localStorage.getItem('user')).email;

  function handleChange(e) {
    setImage(e.target.files[0]);
    console.log('image', e.target.files[0])
    setDisable(false)
  }

  async function updatePic() {

    const formData = new FormData()


    formData.append('image', image)
    formData.append('email', email)
    formData.append('previousImage', showImage)


    await axios.put(`${url}/image/update/profile/picture`, formData)
    window.location.reload();
  }

  useEffect(() => {

    async function getdata() {

     await axios.get(`${url}/image`)
        .then(res => {
          res.data.result && res.data.result.map((i) => {
            if(i.email === email){
              setShowImage(i.image);
              setIsGoogleProfileImage(i.isGoogleImage)
            }
          })
        })
    }
    getdata();

    users && users.map((item) => {
      if (item.email === email) {
        return setUserData(item)
      }
    })

    bookings && bookings.map((i) => {
      if (i.email === email) {
        setBooking((previousData) => [...previousData, i])
      }
    })
  }, [])


  return (

    <div>

      <Mininav />


      <div className='user-detail'>

        {/* profile picture */}
        <div className='profile-picture-container col-12'>
          <div className='picture col-11 col-md-4'>
            {console.log('img',showImage , typeof showImage)}
            <img src={ isGoogleProfileImage ? showImage :`${url}/images/${showImage}`} alt="profile"  />
          </div>
        </div>



        <div className='user-detail m-3'>
          <div><p style={{ fontSize: '30px' , fontWeight:'bold' }}>USER DETAIL</p> </div>

          {/* user detail  */}
          {users ? (
            <Table striped  className='mb-3 mt-3 '>
            <tbody> 
              {users && users.map((item) => {
                if (item.email === email) {
                  return (
                    // <div className='user-container row' key={item._id}> {/* </div> */}
                      <tr className='user-container row' key={item._id}>
                        <td colSpan="">
                      

                      <div className='user-detail-row col-12 col-md-6'>
                        <div className='label col-6'><p>USER</p></div>
                        <div className='label-right col-6'><p>{item.userName.toUpperCase()}</p></div>
                      </div>
                    
                    

                      <div className='user-detail-row col-12 col-md-6'>
                        <div className='label col-6'><p>EMAIL</p></div>
                        <div className='label-right col-6'><p>{item.email}</p></div>
                      </div>

                      <div className='user-detail-row col-12 col-md-6'>
                        <div className='label col-6'><p>MOBILE</p></div>
                        <div className='label-right col-6'>{item.mobile ? <p> {item.mobile}</p> : <p> N/A </p> } </div>
                      </div>

                      </td>
                      </tr>
                    
                  )
                }
              })}
              
            </tbody>
          </Table>
          ) : <Loading/>}
          
        </div>

        {/* upload profile picture */}
        <div className='upload-button m-3'>
          <div>
            <p style={{ fontSize: 'larger', fontWeight: 'bold' }}>CHANGE PROFILE PICTURE </p>
          </div> 

          <div>
            <input type='file' onChange={handleChange} /> <br />
            <button onClick={updatePic} className='btn btn-success m-2' disabled={disable}> UPLOAD <span>
              <FontAwesomeIcon icon={faUpload} />
            </span>
            </button>
          </div>

        </div>

        <p style={{ fontSize: '30px' }} className='m-3'>Your Bookings</p>



        {/* Previous bookings list */}
        <div className='m-3'>
          {
            bookings ? (
              bookings.sort(function (a, b) {
                if (a.serviceDate < b.serviceDate) return -1;

                if (a.serviceDate > b.serviceDate) return 1;

                return 0;
              })
                .map((i) => {
                  if (i.email === email) {
                    return (
                      <div className='show-booking' key={i._id}> 

                        <table key={i._id} >
                          <tbody>
                            <tr>
                              <td>SERVICE</td>
                              <td>: {i.serviceType.toUpperCase()}</td>
                            </tr>

                            <tr>
                              <td>BIKE</td>
                              <td>: {i.bike}</td>
                            </tr>

                            <tr>
                              <td>MODEL</td>
                              <td>: {i.model}</td>
                            </tr>

                            <tr>
                              <td>DATE</td>
                              <td>: {i.serviceDate}</td>
                            </tr>


                          </tbody>
                        </table>
                      </div>
                    )
                  } 
                })
            )  : <Loading/>
          }
        </div>

      </div >
      <Footer />

    </div>
  )
}

export default Profilepic