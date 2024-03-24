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
import Withdraw from './pages/dashboard/deposit/Withdraw';
import Tv from './components/tv/Tv';
import TransferToWallet from './components/account/TransferToWallet';
import Error404 from './components/404/404';
import ErrorBoundary from './components/404/ErrorCatcher';
import Electricity from './components/electricity/Electricity';
import Epins from './components/epins/Epins';
const router = createBrowserRouter([
  {path: "/",element: <App />,},
  { path: '*', element: <Error404 />, }, 
  {
    path: "sign-up",
    element: <Register/>,
  },
  {
    path: "login",
    element: <Login/>,
  },{
    path: 'password-reset/',
    element:<PasswordReset/>,
  },

  {
    path: 'verify-email/',
    element:<VerifyEmail/>,
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
  },  
  {
    path: "dashboard/tv/service/",
    element: <PrivateRoute component={Tv} />,
  },    
  {
    path: "dashboard/electricity/bills/",
    element: <PrivateRoute component={Electricity} />,
  }, 
  {
    path: "dashboard/epins/",
    element: <PrivateRoute component={Epins} />,
  },
  {
    path: "dashboard/user-withdraw",
    element: <PrivateRoute component={Withdraw} />,
  },
  {
  path: "dashboard/user/account/",
  element: <PrivateRoute component={TransferToWallet}/>,
},
  {
    path: "dashboard/data/:service",
    element: <PrivateRoute component={Data}/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
