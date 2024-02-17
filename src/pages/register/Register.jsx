import React,{useState} from "react";
import Header from "../../components/header/Header";
import logo from '../../assets/images/paysit_logo.png'
import '../login/Login.css'
import { Link } from "react-router-dom";
export default function Register(){
    const[email,setEmail] =useState('')
    const[userName,setUserName] =useState('')
    const[firstName,setFirstName] =useState('')
    const[lastName,setLastName] =useState('')
    const[phoneNumber,setPhoneNumber] =useState('')
    const[password,setPassword] =useState('')
    const[ref,setRef] =useState('')

    let custusers = ['adze@gmail.com','joe@hotmail.com']
   
function handleEmailChange(e) {
    setEmail(e.target.value);
    console.log(e.target.value);
  
    if (e.target.value.endsWith('com')) {
      // Make a database check for email
      if (custusers.includes(e.target.value)) {
        console.log('User exists');
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
        setPhoneNumber(e.target.value)
    }
    function handleRefChange(e){
        setRef(e.target.value)
    }

    function submitForm(e){
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
        console.log(user)
	}

    return (
        <div className="register">
            <Header/>
  <section className="w3l-form-36">
		<div className="form-36-mian section-gap">
			<div className="wrapper">
				<div className="form-inner-cont">
				<img src={logo} alt="Logo"/>
				<h3>Sign Up</h3>
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
                <div className="form-input">
                        <span className="fa fa-user" aria-hidden="true"></span> 
                        <input type="text" name="phonenumber" value={phoneNumber} placeholder="Phone Number" required onChange={handlePhoneNumberChange}/>
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
							<a href="portal/forgot_password" className="signuplink" >Forgot password?</a>
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
        </div>

    )

}