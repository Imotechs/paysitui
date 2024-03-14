import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login/Login';
import Deposit from './pages/dashboard/deposit/Deposit';
import DashBoard from './pages/dashboard/Dashboard';
import Register from './pages/register/Register';
import About from './pages/about/About';
import Data from './components/data/Data';
import PrivateRoute from './components/Privaterout';
import PasswordReset from './pages/login/PasswordReset';
import VerifyEmail from './pages/login/VerifyEmail';

import TransferToWallet from './components/account/TransferToWallet';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "sign-up",
    element: <Register/>,
  },
  {
    path: "login",
    element: <Login/>,
  },{
    path: 'password-reset/',
    element:<PasswordReset/>
  },

  ,{
    path: 'verify-email/',
    element:<VerifyEmail/>
  },

  {
    path: "about-us",
    element: <About/>,
  },
  {
    path: "dashboard",
    element: <PrivateRoute component={DashBoard}  />,
  },
  {
    path: "dashboard/user-deposit",
    element: <PrivateRoute component={Deposit} />,
  },{
  path: "dashboard/user/account/",
  element: <PrivateRoute component={TransferToWallet} />,
},
  {
    path: "dashboard/data/:service",
    element: <PrivateRoute component={Data}/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// Replace '#root' with the ID of your root element
