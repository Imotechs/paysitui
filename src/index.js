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
    path: "dashboard/data/",
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
