import React, { useEffect, useState } from "react"
import Header from "../../components/header/Header"
import Preloader from "../../components/preloader/Preloader"
import CoverPreloader from "../../components/preloader/Coverpreloader"
import { verifyAccountByEmailLink } from "../../vitals"
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
export default function VerifyEmail (){
        const [responseMessage,setResponseMessage] = useState('')
        const [loading,setLoading] = useState(false)
        const[success,setSuccess] = useState(false)

        
        const location = useLocation();
        const searchParams = new URLSearchParams(location.search);
      
        // Retrieve query parameters
        const uid = searchParams.get('uid');
        const confirmation_token = searchParams.get('confirmation_token');
      
      useEffect(()=>{

            setLoading(true)
            async function verify(){
                let data;
                try{
                    const response = await verifyAccountByEmailLink({uid,confirmation_token})
                        data = await response.json()
                        if(response.status ==200){
                            setSuccess(true)
                        }
                }catch(e){
                    //console.log(e)
                    setResponseMessage(e.message)

                } finally{
                    setLoading(false)
                    setResponseMessage(data['message'])

                }
            }
          
            verify();
      },[])
		
    return(
        <div className="login">
      <Header/>
    <div className="verify">
    <div className="verification-container">
        
	<CoverPreloader loading={loading} isok={false}/> 
    
    <h2 className="emailsuccess">
    <b className="support">{responseMessage}</b></h2>
		  {success && <Link to ='/login'><button className="verifybtn btn text-brand px-5 border-[1.2px] border-block lift me-1" type='submit'>Proceed to Login </button> </Link>}
              
        
    <p className="support-text">Need help? <b className="support">Contact Customer Support </b> @<a mailto ='paysit.info@gmail.com' className="txt-email">paysit.info@gmail.com</a></p>
</div> 
                </div>
    
    </div>
    )
}