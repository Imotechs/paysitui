import './Login.css';
import Header from '../../components/header/Header';
import React,{useState} from 'react';
// import paysit from '../../assets/images/paysit.png'
import logo from '../../assets/images/paysit_logo.png'
import { Link } from 'react-router-dom';
import { handleLogin } from '../../vitals';

import Preloader from '../../components/preloader/Preloader';
import CoverPreloader from '../../components/preloader/Coverpreloader';
import { useNavigate } from 'react-router-dom';
import { PasswordChangeRequest } from '../../vitals';
import Footer from '../dashboard/footer/Footer';
function Login() {
	const [userName, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const[loading,setLoading] = useState(false)
	const[isok,setIsOk] = useState(false)
	const [error,setError] = useState('')
	const [passwordChange,setPasswordChange] =useState(false)
	const [userEmail,setUserEmail] = useState('')
	const [responseMessage,setResponseMessage] = useState('')
	const navigateto = useNavigate()

	function handleUsernameChange(e){
		setUsername(e.target.value)
	}
	function handlePasswordChange(e){
		setPassword(e.target.value)
	}

	async function submitForm(e) {
		setLoading(true)
		e.preventDefault();
	  
		try {
		 const response = await handleLogin({userName,password});
		 const data = await response.json()
		 if (response.ok && data.access != undefined) {
			localStorage.setItem('access_token', data.access);
			localStorage.setItem('refresh_token', data.refresh);
		   setLoading(false)
		   setIsOk(true)
		   navigateto('/dashboard')
		   } 
		   
		   else {
		   setLoading(false)
		   setIsOk(false)
		   setError(data.error)
		   setPassword('')
		   }
		} catch(error){
			setLoading(false)
			console.log(error)
			setIsOk(false)
			setError('Error Occur')
			setPassword('')


		}
	  }
	  
	  
	function setPasswordDiv(){
		setLoading(true)
		setTimeout(()=>{
			setPasswordChange(true)
			setLoading(false)
		},1500)
	}
	  
	function handleUserEmailChange(e){
		setUserEmail(e.target.value);

	}
	async function submitPassForm(e){
		e.preventDefault()
		setLoading(true)
		try{
			const response = await PasswordChangeRequest({userEmail})
				const data = await response.json()
				setResponseMessage(data['message'])
		}catch(e){
			console.log(e)
		} finally{
			setLoading(false)
		}
		

	}
  return (
    <div className="login">
      <Header/>
	  {passwordChange ? (
                <div className="verify">
                   <div className="verification-container">
    <h2>Request New Password </h2>
	<form onSubmit={submitPassForm}>
    <p className="desc-txt">To get new login password, <b>PaysIt</b> will send you a reset link via the Email you will provide below:
	<br/><b className="support">{userEmail}</b></p>
	<Preloader loading={loading} isok={isok}/><b className="support">{responseMessage}</b>
		<div className="form-input">
		<span className="fa fa-user" aria-hidden="true"></span> 
              <input type="text" name="email"
								placeholder="Email"  value={userEmail} required onChange={handleUserEmailChange} />
						</div>
         <button className="verifybtn btn text-brand px-5 border-[1.2px] border-block lift me-1" type='submit'>RequestChange</button>
		</form>
    <p className="support-text">Need help? <b className="support">Contact Customer Support </b> @<a mailto ='paysit.info@gmail.com' className="txt-email">paysit.info@gmail.com</a></p>
</div> 
               </div>
            ):(

  <section className="w3l-form-36">
		<div className="form-36-mian section-gap">
			<div className="wrapper">
				<hr/>
				<div className="form-inner-cont">
				{/* <img src={logo} alt="Logo" style={{width:'50px', height:'50px'}}/> */}
				<h3>Login</h3>
	<CoverPreloader loading={loading} isok={isok}/>
	{!loading && error && <p style={{marginLeft:'70px',color:'brown',}}>{error}</p>}
	<form method="POST" autoComplete="off" className="signin-form" onSubmit={submitForm}>
											<div className="form-input">
							<span className="fa fa-user" aria-hidden="true"></span> 
              <input type="text" name="email"
								placeholder="Email/Phone/Usern."  value={userName}required onChange={handleUsernameChange} />
						</div>
						<div className="form-input">
							<span className="fa fa-lock" aria-hidden="true"></span> 
                <input type="password" name="password" minLength = "6" maxLength = "30" placeholder="Password"
								required value={password} onChange={handlePasswordChange} />
						</div>
						<div className="login-remember d-grid">
							<label className="check-remaind">
								<input type="checkbox" name="remember" />
								<span className="checkmark"></span>
								<p className="remember">Remember me</p>
							</label>
						
        
                      <button type='submit' name="myButton" className="btn theme-button border-block" >Sign in</button>
        						
						</div>
						<div className="new-signup">
							<b  className="signuplink border-block pd-btn" onClick={setPasswordDiv}>Forgot password?</b>
						</div>
					</form>

					<div className="social-icons">
					</div>

					<div className="new-signup text-center"><span  style={{"color": '#010020'}}>Don't have an account?</span>
          <Link to="/sign-up" className="signuplink" > 
          <button className="btn theme-btn border-block" > Sign up</button></Link></div>
				</div>

				<div className="copy-right" style={{"marginLeft": "25px"}}>
					<p>Express VTU Services | PaysIt</p>
				</div>
			</div>
		</div>
	</section> 
	)}
	
	</div>
  );
}

export default Login;
