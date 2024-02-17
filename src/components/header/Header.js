import React,{useState} from 'react'
import { Link } from "react-router-dom";
import './Header.css'
import logo from '../../assets/images/logo.png'  
// import $ from 'jquery';

function Header(props){
  const [navbar,setNavBar] = useState(0)
 function openNaveBar(){
  setNavBar(!navbar)

 }
 
return (
       
<header id="site-header" className="fixed-top nav-fixed" style={{"backgroundColor": '#f1fef4'}} >
  {/* style="background-color:#f1fef4;" */}
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark stroke" onClick={openNaveBar}>
        <h1>
          <Link className="navbar-brand" to='/' >
          <img src={logo} alt="Logo" title="paysIt" width="120%" /></Link>
        </h1>
        <button className="navbar-toggler  collapsed bg-gradient" type="button" data-toggle="collapse"
          data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
          aria-label="Toggle navigation" onClick={openNaveBar}>
          <span className="navbar-toggler-icon fa icon-expand fa-bars"></span>
          <span className="navbar-toggler-icon fa icon-close fa-times"></span>
        </button>
                        
                  {/* <Link to={user.id}>{user.name}</Link> */}
                  
                        {/* <Link to='/login'>Login</Link> */}

        <div className={`${navbar ? '' : 'collapse'} navbar-collapse`} id="navbarTogglerDemo02" >

          <ul className="navbar-nav mx-lg-auto" >
            <li className="nav-item active">
              <Link to='/' className="nav-link" >Home</Link> 
            </li>
            
            <li className="nav-item @@services__active">
              <Link to ='/dashboard' style={{"color": 'black'}} className="nav-link">BuyData</Link>
            </li>
            <li className="nav-item active">
               <Link to='/login'  style={{"color": 'black'}} className="nav-link">Login</Link>
            </li>                        
          </ul>

          </div>
          <div className="mobile-position" >
            <nav className="navigation">
              <div className="theme-switch-wrapper" style={{"color": 'black'}}>
                <label className="theme-switch" htmlFor="checkbox" style={{"color": 'black'}}>
                  <input type="checkbox" id="checkbox" style={{"color": 'black'}}/>
                  <div className="mode-container py-1" style={{"color": 'black'}}>
                    {/* <i className="gg-sun"></i>
                    <i className="gg-moon"></i> */}
                  </div>
                </label>
              </div>
            </nav>
          </div>
      </nav>
    </div>
  </header>

      );
    }
    
    export default Header;

