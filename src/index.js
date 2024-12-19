import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MyContext from './context/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyContext>
    <App />
    </MyContext>
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
pauseOnFocusLoss
closeOnClick
rtl={false}
theme="colored"
/> 
  </React.StrictMode>
);


