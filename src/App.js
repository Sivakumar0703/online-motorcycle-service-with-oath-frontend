import {BrowserRouter , Route , Routes} from 'react-router-dom' ;
import Homepage from './routes/homepage/Homepage';
import Register from './routes/Register/Register';
import Login from './routes/login/Login';
import Repair from './routes/repair/Repair';
import Washing from './routes/wash/Washing';
import Admin from './routes/admin/Admin';
import AdminPrice from './routes/admin/AdminPrice';
import Services from './routes/Service/Services';
import AdminAddBikes from './routes/admin/AdminAddBikes';
import Dashboard from './routes/admin/Dashboard';
import Contact from './routes/Contact/Contact';
import Profile from './routes/profile/Profile';
import Errorpage from './routes/errorPage/Errorpage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ResetPassword from './routes/forgotPassword/ResetPassword';
import PasswordRequest from './routes/forgotPassword/PasswordRequest';

function App() {
  return (
    <div className="App">

      <BrowserRouter> <Routes>
      
      
      <Route path='/' element={< Homepage />} />
      <Route path='/service' element={<Services />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/repair' element={<Repair />} />
      <Route path='/washing' element={<Washing />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/admin/bookings' element={<Admin />} />
      <Route path='/admin/price' element={<AdminPrice />} />
      <Route path='/admin/add/bikes' element={<AdminAddBikes />} />
      <Route path='/admin/dashboard' element={<Dashboard />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/reset_password' element={<ResetPassword />} />
      <Route path='/forgot_password' element={<PasswordRequest />} />
      <Route path='*' element={<Errorpage />} />
 
      </Routes> </BrowserRouter>
 
    </div>
  );
}

export default App;
