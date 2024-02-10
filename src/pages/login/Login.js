import './Login.css';
import Header from '../../components/header/Header';
// import paysit from '../../assets/images/paysit.png'
import logo from '../../assets/images/paysit_logo.png'
function Login() {
  return (
    <div classNameName="login">
      <Header/>
  <section className="w3l-form-36">
		<div className="form-36-mian section-gap">
			<div className="wrapper">
				<div className="form-inner-cont">
				<img src={logo} alt="Logo"/>
				<h3>Login</h3>
					<form method="POST" autocomplete="off" className="signin-form" onsubmit="myButton.disabled = true; return true;">
											<div className="form-input">
							<span className="fa fa-user" aria-hidden="true"></span> 
              <input type="text" name="user"
								placeholder="Email/PhoneNumber/Username" required />
						</div>
						<div className="form-input">
							<span className="fa fa-lock" aria-hidden="true"></span> 
                <input type="password" name="password" minlength = "6" maxlength = "30" placeholder="Password"
								required />
						</div>
						<div className="login-remember d-grid">
							<label className="check-remaind">
								<input type="checkbox" name="remember" />
								<span className="checkmark"></span>
								<p className="remember">Remember me</p>
							</label>
						
        					    <input type="hidden" name="redirect" value="" required />
        								
        						<input type="hidden" name="token" value=""/>
        
                      <button name="myButton" className="btn theme-button" >Sign in</button>
        						
						</div>
						<div className="new-signup">
							<a href="portal/forgot_password" className="signuplink" >Forgot password?</a>
						</div>
					</form>

					<div className="social-icons">
					</div>

					<div className="new-signup text-center"><span  style={{"color": '#010020'}}>Don't have an account?</span>
          <a href="portal/register" className="signuplink" > 
          <button className="btn theme-btn" > Sign up</button></a></div>
				</div>

				<div className="copy-right" style={{"marginLeft": "25px"}}>
					<p>Express VTU Services | PaysIt</p>
				</div>
			</div>
		</div>
	</section>    </div>
  );
}

export default Login;
