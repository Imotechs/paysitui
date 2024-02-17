import logo from './assets/images/paysit_logo.png'  
import paysit from './assets/images/pays.gif'  
import etisalat_logo from './assets/images/9mobile_logo.png'  
import mtn_logo from './assets/images/mtn_logo.png'
import aitel_logo from './assets/images/airtel_logo.png'
import neco_card from './assets/images/neco_card.jpg'
import neco_logo from './assets/images/neco_logo.png'
import glo_logo from './assets/images/glo_logo.png'
import waec_logo from './assets/images/waec_logo.png'
import startime_logo from './assets/images/startime_logo.png'
import spectranet_logo from './assets/images/spectranet_logo.png'
// import bills from './assets/images/bills.jpg'
// import data from './assets/images/data.jpg'
// import vtu from "./assets/images/vtu.jpg"

export const main_url ='http://localhost:8000'


export default function nameToLogo(name){
    name = name.toLowerCase()
    const logos = {
        mtn:mtn_logo,
        glo:glo_logo,
        airtel:aitel_logo,
        '9mobile':etisalat_logo,
        waec:waec_logo,
        neco:neco_logo,
        starttime:startime_logo,
        spectranet:spectranet_logo,
        paysit:logo,
    }

      return logos[name]|| logos['paysit'];
    

}


//phone number validation
const mtnNumbers =['0803', '0806', '0813', '0810', '0816', '0814', '0903', '0906', '0703', '0704', '0706', '07025', '07026']
const gloNumbers =['0805', '0807', '0811', '0815', '0705', '0905']
const airtleNumbers = ['0802', '0808', '0812', '0708', '0701', '0902', '0901', '0907']
const _9mobilNumbers = ['0809', '0817', '0818', '0908', '0909']


export function validatePhoneNumber(phoneNumber){
    const numericPhoneNumber = phoneNumber.replace(/\D/g, '');//Remove any non-numeric characters from the phone number
    const regex = /^234\d{10}$/;// Check if the number starts with '234' and is followed by 10 digits

    if(regex.test(numericPhoneNumber)){
        return { isValid: false, network: "Unknown" };
    }
  
    // Extract the first 4 digits of the numeric phone number
    let prefix = numericPhoneNumber.substring(0, 4);
    let start = numericPhoneNumber.substring(0, 3);
    if (start === '234') {
    prefix = '0' + numericPhoneNumber.substring(3, 6);
    }
//   '0916','0913','0915','0912','0819'

    // Define network prefixes
    const mtnNumbers =['0916','0913','0803', '0806', '0813', '0810', '0816', '0814', '0903', '0906', '0703', '0704', '0706', '07025', '07026']
    const gloNumbers =['0915','0805', '0807', '0811', '0815', '0705', '0905']
    const airtelNumbers = ['0912','0802', '0808', '0812', '0708', '0701', '0902','0904', '0901', '0907','0911']
    const _9mobileNumbers = ['0809', '0817', '0818', '0908', '0909']
    // Check which network the number belongs to
    if (mtnNumbers.includes(prefix)) {
      return { isValid: true, network: 'MTN' };
    } else if (gloNumbers.includes(prefix)) {
      return { isValid: true, network: 'Glo' };
    } else if (airtelNumbers.includes(prefix)) {
      return { isValid: true, network: 'Airtel' };
    } else if (_9mobileNumbers.includes(prefix)) {
      return { isValid: true, network: '9mobile' };
    } else {
      // Number does not match any known network
      return { isValid: false, network: 'Unknown' };
    }


}
// Helper function to decode JWT tokens
const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`).join(''));
  return JSON.parse(jsonPayload);
};

export async function getAccessToken({ navigateto }) {
  let accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  if (accessToken) {
    const decodedToken = parseJwt(accessToken);

    if (decodedToken.exp * 1000 < Date.now()) {
      // Token has expired, try to refresh
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
          navigateto('/login');
        }
      } catch (error) {
        console.error('Error during token refresh:', error);
        // Handle refresh error, redirect to login
        navigateto('/login');
      }
    }

    return accessToken;
  } else {
    // No access token found, redirect to login
    navigateto('/login');
  }
}
 

export async function handleLogin({userName,password}) {
  try {
    const response = await fetch(`${main_url}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email:userName, password:password }),
    });
    
  return response
  } 
  catch (error) {
    //console.error('Error during login:', error);
  }
}






export const fetchUserProfile = async ({navigateto}) => {
    try {
       const response = await fetch(`${main_url}/user-profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken({navigateto})}`,         },
      });

    return response
    } catch (error) {
      console.error('Error during  the fetchUserProfile:', error);
    } finally {
      //setLoading(false);

      //return response
  }
}


  //fetchUserProfile()

export const fetchData =async(navigateto)=>{
  try {
       const response = await fetch(`${main_url}/available-data/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken({navigateto})}`, // Include the access token in the Authorization header
        },
      });

    return response
  } catch (error) {
    console.error('Error during fetchUserProfile:', error);
  } finally {
    //setLoading(false);

    //return response
}

}




export const setTransactionPin = async ({navigateto,accountPassword,pin2})=>{
  //console.log('this fetch calll executeed')
   try {
    const response = await fetch(`${main_url}/set-transaction-pin/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${getAccessToken({navigateto})}`, // Include the access token in the Authorization header
     },
     body: JSON.stringify({newpin:pin2, password:accountPassword }),

   });

 return response
} catch (error) {
 console.error('Error during fetchUserProfile:', error);
} 
}