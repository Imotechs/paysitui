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
import gotv from './assets/images/gotv.png'
import startimes from './assets/images/startime_logo.png'
import dstv from './assets/images/dstv.png'

// import bills from './assets/images/bills.jpg'
// import data from './assets/images/data.jpg'
// import vtu from "./assets/images/vtu.jpg"

export const main_url = 'https://api.paysit.net/api' //'http://localhost:8000/api'
export const frontEndUrl = 'https://paysit.net'
export default function nameToLogo(name) {
  name = name.toLowerCase();
  const logos = {
      mtn: mtn_logo,
      glo: glo_logo,
      airtel: aitel_logo,
      '9mobile': etisalat_logo,
      waec: waec_logo,
      neco: neco_logo,
      starttime: startime_logo,
      spectranet: spectranet_logo,
      paysit: logo,
      gotv:gotv,
      dstv:dstv,
      startimes:startimes
  }
  
  const logoArray = Object.keys(logos);
  let logo_img = 'paysit'; // Default logo if not found
  
  for (let i = 0; i < logoArray.length; i++) {
      if (name.includes(logoArray[i])) {
          logo_img = logoArray[i];
          break; // Exit loop once logo is found
      }
  }
  
  return logos[logo_img];
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
export const parseJwt = (token) => {
  //console.log('toooooken::',token)
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`).join(''));
  return JSON.parse(jsonPayload);
};

export async function getAccessToken({ navigateto=null }={}) {
  let accessToken =  localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  if (accessToken !== undefined && accessToken !== null) {
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
          //console.log(newAccessToken)
          localStorage.setItem('access_token', newAccessToken.access);
          accessToken = newAccessToken.access;
        } else {
          // Refresh failed, redirect to login
          if (navigateto !== null){
            navigateto('/login');
            return
          }
        }
      } catch (error) {
        console.error('Error during token refresh:', error);
        // Handle refresh error, redirect to login
        //window.location.href ='/login'
      }
    }

    return accessToken;
  } else {
    // No access token found, redirect to login
    if (navigateto !== null){
      navigateto('/login');
      return
    } 
   }
}
 
const useToken =  await getAccessToken()

export async function registerUser({user}) {
  try {
    const response = await fetch(`${main_url}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({data:user}),
    });
    
  return   response
  } 
  catch (error) {
    console.error('Error during login:', error);
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
    console.error('Error during login:', error);
  }
}


export async function PasswordChangeRequest({userEmail}) {
  try {
    const response = await fetch(`${main_url}/password/request/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email:userEmail}),
    });
    
  return response
  } 
  catch (error) {
    console.error('Error during login:', error);
  }
}


export async function PasswordSetRequest({password2,uid,confirmation_token}) {
  try {
    const response = await fetch(`${main_url}/password/change/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({password:password2,uidb64:uid,token:confirmation_token}),
    });
    
  return response
  } 
  catch (error) {
    console.error('Error during login:', error);
  }
}
//verifyAccountByEmailLink
export async function verifyAccountByEmailLink({uid,confirmation_token}) {
  try {
    const response = await fetch(`${main_url}/verify-email/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({uidb64:uid,token:confirmation_token}),
    });
    
  return response
  } 
  catch (error) {
    console.error('Error during login:', error);
  }
}

export const fetchUserProfile = async ({navigateto}) => {
  const accessToken = await getAccessToken({ navigateto });

    try {
       const response = await fetch(`${main_url}/user-profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, }
      });
      //const userData = await response.json();
      if(response.ok){
        return response
      }else{
        navigateto('/login')
      }    
    } catch (error) {
      //console.error('Error during  the fetchUserProfile:', error);
      navigateto('/')

    } finally {
      //setLoading(false);

      //return response
  }
}


  //fetchUserProfile()

export const fetchData =async(navigateto)=>{
  const accessToken = await getAccessToken({ navigateto });
  try {
       const response = await fetch(`${main_url}/available-data/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
      });

    return response

  } catch (error) {
    console.error('Error during fetchUserProfile:', error);
    //navigateto('/')

  } 

}



export const buyData =async({navigateto,selectedPlan,amount,phoneNumber,optionSelected})=>{
  const accessToken = await getAccessToken({ navigateto });
  try {
       const response = await fetch(`${main_url}/available-data/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
        body: JSON.stringify({plan:selectedPlan,amount:amount,phone:phoneNumber,choice:optionSelected}),

      });

    return response
  } catch (error) {
    console.error('Error during fetchUserProfile:', error);
  } finally {
    //setLoading(false);

    //return response
}

}


export const buyAirtime =async({navigateto,network,amount,phoneNumber})=>{
  const accessToken = await getAccessToken({ navigateto });
  try {
       const response = await fetch(`${main_url}/buy/airtime/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        },
        body: JSON.stringify({network:network,amount:amount,phone:phoneNumber}),

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
  const AccesToken = await getAccessToken({navigateto})
   try {
    const response = await fetch(`${main_url}/set-transaction-pin/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${AccesToken}`, // Include the access token in the Authorization header
     },
     body: JSON.stringify({newpin:pin2, password:accountPassword }),

   });

 return response
} catch (error) {
 console.error('Error during fetchUserProfile:', error);
} 
}

//

export const initiatePayment = async ({navigateto,amount})=>{
  //console.log('this fetch calll executeed')
  const accessToken = await getAccessToken({navigateto})
   try {
    const response = await fetch(`${main_url}/payment/init/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
     },
     body: JSON.stringify({amount:amount}),

   });

 return response
} catch (error) {
 //console.error('Error during fetchUserProfile:', error);
} 
}


export const withDrawFunds = async ({navigateto,amount,accounNumber,bankName})=>{
  //console.log('this fetch calll executeed')
  const accessToken = await getAccessToken({navigateto})
   try {
    const response = await fetch(`${main_url}/withdraw/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
     },
     body: JSON.stringify({amount:amount,account:accounNumber,bank_name:bankName}),

   });

 return response
} catch (error) {
 //console.error('Error during fetchUserProfile:', error);
} 
}

export const verifyPayment =  async({navigateto,data})=>{
  //console.log('this fetch calll executeed')
 const  accessToken = getAccessToken({navigateto})
   try {
    const response =  fetch(`${main_url}/payment/verify/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${useToken}`, // Include the access token in the Authorization header
     },
     body: JSON.stringify(data),

   });

 return  await response

} catch (error) {
 //console.error('Error during fetchUserProfile:', error);
} 
}

//convert/commission/



export const convertCommision =  async({navigateto,amount})=>{
  //console.log('this fetch calll executeed')
 const  accessToken = getAccessToken({navigateto})
   try {
    const response =  fetch(`${main_url}/convert/commission/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${useToken}`, // Include the access token in the Authorization header
     },
     body: JSON.stringify({amount:amount}),

   });

 return  await response

} catch (error) {
 //console.error('Error during fetchUserProfile:', error);
} 
}



export const fetchTvPlans = async ({ navigateto, tv }) => {
  const accessToken = await getAccessToken({ navigateto });

  try {
    
    const response = await fetch(`${main_url}/tv/service/?tv=${tv}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
    });

    return response;
  } catch (error) {
    console.error('Error during fetchTvPlans:', error);
    //navigateto('/')
  }
}


export const verifyIUC =  async({navigateto,logoName,IUC})=>{
  //console.log('this fetch calll executeed')
 const  accessToken = getAccessToken({navigateto})
   try {
    const response =  fetch(`${main_url}/tv/service/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${useToken}`, // Include the access token in the Authorization header
     },
     body: JSON.stringify({iuc_number:IUC,service:logoName,action:'verify'}),

   });

 return  await response

} catch (error) {
 //console.error('Error during fetchUserProfile:', error);
} 
}



export const buyTvPlan =  async({navigateto,logoName,IUCNumber,phoneNumber,amount})=>{
  //console.log('this fetch calll executeed')
 const  accessToken = getAccessToken({navigateto})
   try {
    const response =  fetch(`${main_url}/tv/service/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${useToken}`, // Include the access token in the Authorization header
     },
     body: JSON.stringify({iuc_number:IUCNumber,service:logoName,action:'buy',phone:phoneNumber,amount:amount}),

   });

 return  await response

} catch (error) {
} 
}



export const verifyMeterNo =  async({navigateto,supplier,meterNo,plan})=>{
  //console.log('this fetch calll executeed')
 const  accessToken = getAccessToken({navigateto})
   try {
    const response =  fetch(`${main_url}/electricity/bills/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${useToken}`,
     },
     body: JSON.stringify({service:supplier,meter_number:meterNo,action:'verify',plan:plan}),

   });

 return  await response

} catch (error) {
} 
}


export const payElectricBill =  async({navigateto,supplier,plan,meterNo,amount,})=>{
  //console.log('this fetch calll executeed')
 const  accessToken = getAccessToken({navigateto})
   try {
    const response =  fetch(`${main_url}/electricity/bills/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${useToken}`,
     },
     body: JSON.stringify({service:supplier,meter_number:meterNo,action:'buy',plan:plan,amount:amount}),

   });

 return  await response

} catch (error) {
} 
}