import React, { useState } from "react"
import Header from "../../components/header/Header"
import Preloader from "../../components/preloader/Preloader"
import { PasswordSetRequest } from "../../vitals"
import { useLocation } from 'react-router-dom';

export default function PasswordReset (){
        const [responseMessage,setResponseMessage] = useState('')
        const [loading,setLoading] = useState(false)
        const[password1,setPassword1] = useState('')
        const[password2,setPassword2] = useState('')
        const[error,setError] = useState('')

        
        const location = useLocation();
        const searchParams = new URLSearchParams(location.search);
      
        // Retrieve query parameters
        const uid = searchParams.get('uid');
        const confirmation_token = searchParams.get('confirmation_token');
      
      
    async function submitPassForm(e){
		e.preventDefault()
        if(password1 ===password2){

            setLoading(true)
            try{
                const response = await PasswordSetRequest({password2,uid,confirmation_token})
                    const data = await response.json()
                    setResponseMessage(data['message'])
            }catch(e){
                console.log(e)
            } finally{
                setLoading(false)
            }
          

        }else{
            setError('check your inputs')
            return;
        }

	}
    function password1Change(e){
        setPassword1(e.target.value)

    }
    function password2Change(e){
        const pass2 = e.target.value
        setError('')
        setPassword2(pass2)
        if (pass2.length >=password1.length){
            if(pass2 != password1){
                if ('vibrate' in navigator) {
                    navigator.vibrate([200, 100, 200]);
                  }
                setPassword2('')
                setError('Password do not match!')
            }
        }

    }
    return(
        <div className="login">
      <Header/>
<div className="verify">
    <div className="verification-container">
    <h2>New Password Form </h2>
	<form onSubmit={submitPassForm}>
    
	<Preloader loading={loading} isok={false}/><b className="support">{responseMessage}</b>
		    <div className="form-input">
		    <span className="fa fa-user" aria-hidden="true"></span> 
              <input type="password" name="password1"
				placeholder="Password"  value={password1} required onChange={password1Change} />
			</div>
            <p>{error&& <b className="error">{error}</b>}</p>
            <div className="form-input">
		    <span className="fa fa-user" aria-hidden="true"></span> 
              <input type="password" name="password2"
				placeholder="Confirm Password"  value={password2} required onChange={password2Change} />
			</div>
         <button className="verifybtn btn text-brand px-5 border-[1.2px] border-block lift me-1" type='submit'>Save Changes</button>
		</form>
    <p className="support-text">Need help? <b className="support">Contact Customer Support </b> @<a mailto ='paysit.info@gmail.com' className="txt-email">paysit.info@gmail.com</a></p>
</div> 
                </div>
    
    </div>
    )
}