import React,{useState,useEffect} from "react";
import Header from "../../components/header/Header";
import logo from '../../assets/images/paysit_logo.png'
import '../login/Login.css'
import { Link } from "react-router-dom";
import { registerUser } from "../../vitals";
import Preloader from "../../components/preloader/Preloader";
import CoverPreloader from "../../components/preloader/Coverpreloader";
import Footer from "../dashboard/footer/Footer";
import { validatePhoneNumber } from "../../vitals";
import { useLocation } from "react-router-dom";

export default function Register(){
    const[email,setEmail] =useState('')
    const[userName,setUserName] =useState('')
    const[firstName,setFirstName] =useState('')
    const[lastName,setLastName] =useState('')
    const[phoneNumber,setPhoneNumber] =useState('')
    const[password,setPassword] =useState('')
    const[ref,setRef] =useState('')
    const[error,setError] = useState(null)
    const[success,setSuccess] = useState(null)
    const [loading,setLoading] = useState(false)
    const [isregistered,setIsregistered] = useState(false)
    const [userEmail,setuserEmail] = useState('')
    const [phoneError,setPhoneError] =useState('')
    let custusers = ['admin@gmail.com','paysit.info@gmail.com','paysit@gmail.com','test@gmail.com']
   
    const location = useLocation();
  const refcode = new URLSearchParams(location.search).get("ref",'');
useEffect(()=>{
    if(refcode !=''){
        setRef(refcode)
    }
},[])
function handleEmailChange(e) {
    setEmail(e.target.value);
    //console.log(e.target.value);
  
    if (e.target.value.endsWith('com')) {
      // Make a database check for email
      if (custusers.includes(e.target.value)) {
        //console.log('User exists');
        if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
        }
        setEmail('');
      }
    }
  }
    function handleUserNameChange(e){
        setUserName(e.target.value)
    }
    function handleFirstnameChange(e){
        setFirstName(e.target.value)
    }
    function handleLastNameChange(e){
        setLastName(e.target.value)
    }
    function handlePasswordChange(e){
        setPassword(e.target.value)
    }
    function handlePhoneNumberChange(e){
        const phone = e.target.value
        setPhoneNumber(phone)
        //setPhoneError('')

        if(phone.length>=8){
            let{isValid,network} = validatePhoneNumber(phone)
            //console.log(isValid,network)
            if(isValid){
                
            }else{
                if ('vibrate' in navigator) {
                  navigator.vibrate([200, 100, 200]);
                }
                //setPhoneNumber('')
                setPhoneError('Invalid Phone number')
            }
        }
        else if(phone.length ===11 && phone.length >=13){
            let{isValid,network} = validatePhoneNumber(phone)
            //console.log(isValid,network)
            if(isValid){
                
            }else{
                if ('vibrate' in navigator) {
                  navigator.vibrate([200, 100, 200]);
                }
                setPhoneNumber('')
                setPhoneError('Invalid Phone number')
            }
        }
    }
    function handleRefChange(e){
        setRef(e.target.value)
    }

    async function  submitForm(e){
        setError(null)
        setSuccess(null)
        setLoading(true)
        let user ={
            username:userName,
            password:password,
            email:email,
            phone_number:phoneNumber,
            first_name:firstName,
            last_name:lastName,
            ref:ref,
        }
		e.preventDefault()
        try{
            const response =  await registerUser({user})
            const data = await response.json()
            //console.log(response)
            if(response.ok){
                console.log(data)
                setSuccess(data['message'])
                setuserEmail(data['email'])
                setuserEmail(data['email'])
               // console.log(data['email'])
                setTimeout(()=>{
                    setIsregistered(true)
                },3000)
            }

            else if (response.status ===400){
                
                if (data.non_field_errors && data.non_field_errors.length > 0) {
                    setError(data.non_field_errors.map(error => error));
                } else {
                    throw new Error("Unknown error");
                  }

            }
            else{
                setError(data.message)
            }
        }catch(error){
            //setError(error)
           // console.log(error)

        }finally{
            setLoading(false)
        }
        
	}
    console.log(error)

    return (
        <div className="register">
            <Header/>
            {isregistered ? (
                <div className="verify">
                   <div className="verification-container">
    <h2>Verify Your Email Address</h2>
    <p className="desc-txt">To start using PaysIt, confirm your Email address with the email we sent to:
        <br/><b className="support">{userEmail}</b></p>
         
         <Link to ='/login'><button className="verifybtn btn text-brand px-5 border-[1.2px] border-block lift me-1"> Proceed to Login</button>
         </Link>
    <p className="support-text">Need help? <b className="support">Contact Customer Support </b> @<a mailto ='paysit.info@gmail.com' className="txt-email">paysit.info@gmail.com</a></p>
</div> 
                </div>
            ):(
                <section className="w3l-form-36">
                <div className="form-36-mian section-gap">
                    
                    <div className="wrapper">
                        <div className="form-inner-cont">
                        <img src={logo} alt="Logo"/>
                        <h3>Sign Up</h3>
                        <CoverPreloader loading={loading} isok={false}/>
                        {!loading && error && <p style={{marginLeft:'70px',color:'brown',}}>{error}</p>}
                        {!loading && success && <p style={{marginLeft:'70px',color:'green',}}>{success}</p>}
        <form method="POST" autoComplete="off" className="signin-form"  onSubmit={submitForm}>
                        <div className="form-input">
                                <span className="fa fa-user" aria-hidden="true"></span> 
                                <input type="text" value ={email} name="email" placeholder="Email" required onChange={handleEmailChange}/>
                        </div>
                        <div className="form-input">
                                <span className="fa fa-user" aria-hidden="true"></span> 
                                <input type="text" value={firstName} name="firstname" placeholder="First Name" required onChange={handleFirstnameChange} />
                        </div>
                        <div className="form-input">
                                <span className="fa fa-user" aria-hidden="true"></span> 
                                <input type="text" name="lastname" value={lastName} placeholder="Last Name" required onChange={handleLastNameChange} />
                        </div>
                        {phoneError && <p className="phoneerror">{phoneError}</p>}
                        <div className="form-input">
                                <span className="fa fa-user" aria-hidden="true"></span> 
                                <input type="text" name="phonenumber" value={phoneNumber} placeholder="Phone Number" required onChange={handlePhoneNumberChange} onPaste={handlePhoneNumberChange}/>
                        </div>
        
                        <div className="form-input">
                                <span className="fa fa-user" aria-hidden="true"></span> 
                                <input type="text" name="username" value={userName} placeholder="Choose a Username" required onChange={handleUserNameChange} />
                        </div>
                        <div className="form-input">
                                <span className="fa fa-user" aria-hidden="true"></span> 
                                <input type="text" name="ref" placeholder="referal(optional)" value={ref} onChange={handleRefChange} />
                        </div>
                        <div className="form-input">
                        <span className="fa fa-lock" aria-hidden="true"></span> 
                            <input type="password" value={password} name="password" minLength = "6" maxLength = "30" placeholder="Password"
                                        required  onChange={handlePasswordChange}/>
                                </div>
                                <div className="login-remember d-grid">
                                    <label className="check-remaind">
                                        <input type="checkbox" name="remember" />
                                        <span className="checkmark"></span>
                                        <p className="remember">Remember me</p>
                                    </label>
                                
                                        {/* <input type="hidden" name="redirect" value="" required />
                                                
                                        <input type="hidden" name="token" value=""/> */}
                
                              <button name="myButton" className="btn theme-button border-block" type="submit" >Sign Up</button>
                                        
                                </div>
                                <div className="new-signup">
                                    <a href="/" className="signuplink" >Need help?</a>
                                </div>
                            </form>
        
                            <div className="social-icons">
                            </div>
        
                            <div className="new-signup text-center"><span  style={{"color": '#010020'}}>Already a User?</span>
                  <Link to="/login" className="signuplink" > 
                  <button className="btn theme-btn border-block" > Sign in</button></Link></div>
                        </div>
        
                        <div className="copy-right" style={{"marginLeft": "25px"}}>
                            <p>Express VTU Services | PaysIt</p>
                        </div>
                    </div>
                </div>
            </section> 
            )}
        <Footer></Footer>
        </div>

    )

}