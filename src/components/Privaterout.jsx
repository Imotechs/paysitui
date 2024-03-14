import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { main_url } from '../vitals';
import parseJwt from '../vitals'

async function getToken() {
  let accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  if (accessToken) {
    const decodedToken = parseJwt(accessToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      try {
        const refreshResponse = await fetch(`${main_url}/token/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshResponse.ok) {
          const newAccessToken = await refreshResponse.json();
          localStorage.setItem('access_token', newAccessToken.access_token);
          accessToken = newAccessToken.access_token;
        } else {
          // Refresh failed, redirect to login
          //navigateto('/login');
        }
      } catch (error) {
        // Handle refresh error, redirect to login
        //navigateto('/login');
      }
    }

    return accessToken;
  } else {
    // No access token found, redirect to login
    //navigateto('/login');
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = ()=>{
        const access_token = getToken()
       
        return !!access_token
      }
      
      const istAuth = isAuthenticated()
  return (
    istAuth ? (
        <Component />
      ) : (
        <Navigate to="/login" replace />
      )
  )
};

export default PrivateRoute;
