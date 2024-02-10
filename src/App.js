//import logo from './logo.svg';
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
import bills from './assets/images/bills.jpg'
import data from './assets/images/data.jpg'
import vtu from "./assets/images/vtu.jpg"
import multichoice from './assets/images/multichoice_logo.png'

import Footer from './components/footer/Footer';
import Slideshow from './components/slideshow/Slideshow'
// import Slider from 'react-slick'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import './App.css';
import './components/header/Header.css'
import Header from './components/header/Header';
import React from 'react';

function App() {
  const logos = [
    mtn_logo,
    glo_logo,
    aitel_logo,
    etisalat_logo,
    waec_logo,
    neco_logo,
    startime_logo,
    spectranet_logo,
    multichoice,
    neco_logo,
  ];


  return (
    <div className="App ">
    <Header/>
    <section className="overflow-x-hidden bg-brand-light">
        <br/>
        <br/>
        <br/>
       

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-20 md:pt-24">
            
            <div className="md:container mt-4 md:mt-0">

                <div className="flex flex-row space-x-5 absolute">
                    <span className="flex h-1 w-1 md:h-3 md:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1 w-1 md:h-3 md:w-3 bg-brand-yellow"></span>
                    </span>
                    <div style={{'top': '25vh', 'left': '10vw', 'filter': 'blur(20px)'}} className="absolute bg-blue-900 rounded-full w-10 h-10 bg-opacity-50 animate-bounce"></div>
                    <div  style={{'top': '5vh', 'left': '25vw', 'filter': 'blur(20px)'}} className="absolute bg-red-900 rounded-full w-10 h-10 bg-opacity-50 animate-bounce"></div>
                    <div  style={{'top': '15vh', 'left': '50vw', 'filter': 'blur(9px)'}} className="absolute bg-green-900 rounded-full w-10 h-10 bg-opacity-50"></div>
                </div>

              <div className="flex flex-col text-base lg:text-6xl">
                <span className="text-brand-paysit font-black">Be connected!</span>
                <span className="mt-3 text-xl lg:text-3xl text-black font-medium">Join the Premier Automated Platform for Data/Subscription Services</span>
              </div>
  
              <div className="mt-4 lg:mt-10">
                <a href="register" className="text-lg text-white py-2 px-5 rounded-md bg-brand-blue shadow">
                    Join Now
                </a>
              </div>

          
        
            </div>

  <div className="container font-weight-bold">
    <section className="customer  mt-4 mb-4">
        <div className="container"> <Slideshow images={logos} /></div>
    </section>
    <img src={paysit} className="z-30 object-contain img-fluid" alt="logo"/>

 </div>
            
            <div className="hidden md:block absolute top-[30vh] left-[100vh] h-[36rem] w-[36rem] animate-spin-slower overflow-x-hidden">
              
                <a href="index.html">
                    <div className="absolute bottom-0 left-0 overflow-hidden">
                        <img alt="Image placeholder" src={waec_logo} 
                        className="animate-spin-slower max-w-[2rem] rounded-full"/>
                    </div>
                </a>
            </div>
            <div className="hidden md:block absolute top-[30vh] left-[100vh] h-[36rem] w-[36rem] animate-spin-r overflow-x-hidden">
                <a href="index.html">
                    <div className="absolute top-0 left-0 overflow-hidden">
                        <img alt="Image placeholder" src={startime_logo} 
                        className="animate-spin-slower max-w-[2rem] rounded-full"/>
                    </div>
                </a>
                <a href="index.html">
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <img alt="Image placeholder" src={glo_logo}
                        className="animate-spin-slower max-w-[2rem] rounded-full"/>
                    </div>
                </a>
            </div>
            <div className="hidden md:block absolute top-[40vh] left-[110vh] h-[28rem] w-[28rem] animate-spin-slow overflow-x-hidden">
                <a href="index.html">
                    <div className="absolute bottom-0 right-0 overflow-hidden">
                        <img alt="Image placeholder" src={neco_logo}
                         className="animate-spin-slower max-w-[2rem] rounded-full"/>
                    </div>
                </a>
                <a href="index.html">
                    <div className="absolute inset-x-0 right-0 overflow-hidden">
                        <img alt="Image placeholder" src={etisalat_logo}
                        className="animate-spin-slower max-w-[2rem] rounded-full"/>
                    </div>
                </a>
            </div>
            <div className="hidden md:block absolute top-[40vh] left-[110vh] h-[28rem] w-[28rem] animate-spin-r-fast overflow-x-hidden">
                <a href="index.html">
                    <div className="absolute top-0 right-0 overflow-hidden">
                        <img alt="Image placeholder" src={aitel_logo}
                        className="animate-spin-slower max-w-[2rem] rounded-full"/>
                    </div>
                </a>
            </div>


          </div> 
        </div> 
      </section>


    <section className="md:mx-20 mt-24 md:mt-32">

        <div className="flex justify-center text-gray-800 text-xl md:text-3xl font-black">
            What You Can Do!
        </div>

        <br />
        <div className="z-50 lg:container mt-10 px-4 py-2 bg-white bg-opacity-25 backdrop-filter backdrop-blur-3xl shadow rounded-lg curl">

            <div className="row">
                
            <div className="col-12 col-md-4 flex flex-col items-center">

                <div className="icon text-primary mb-3">
                <img src={bills} className="max-w-[5rem]" alt=""/>
                </div>

                <p className="text-center text-black mb-6 mb-md-0">
                    Enjoy boundless savings from discount to all your subscription services with us.
                </p>

            </div>
            
            <div className="col-12 col-md-4 flex flex-col items-center border-r border-l border-brand-yellow border-opacity-25">

                <div className="icon text-primary mb-3">
                    <img src={vtu} className="max-w-[5rem]" alt=""/>
                </div>
                  <p className="text-center text-black mb-6 mb-md-0">
                    Join us, engage in an unbeatable buying and selling of data subscriptions at unbeatable prices
                </p>

            </div>
           

            <div className="col-12 col-md-4 flex flex-col items-center">

                <div className="icon text-primary mb-3">
                    <img src={data} className="max-w-[5rem]" alt=""/>
                </div>

                <p className="text-center text-black mb-0">
                    Aquire Data from us via our USSD channels, very easy and Fast
                </p>

            </div>

            <div className="col-12 col-md-4 flex flex-col items-center">

                <div className="icon text-primary mb-3">
                <img src={neco_card} className="max-w-[5rem]" alt=""/>
                </div>

                <p className="text-center text-black mb-6 mb-md-0">
                    Enjoy  seamless access to hassle-free JAMB registration pins and WAEC/NECO scratch cards.                </p>

            </div>
            </div> 
        </div>
        
        <br />
        
     
        
    </section>

    <section className="w3l-features py-5" >
        <div className="container py-lg-5 py-md-4 py-2" >
            <div className="row main-cont-wthree-2 align-items-center">
                <div className="col-lg-6 feature-grid-left pr-lg-5">
                    <h5 className="title-small">Our Hooks</h5>
                    <h3 className="title-big mb-4">Connect with us through several hooks</h3>
                    <p className="text-para">We have several channels you can choose to connect and make transactions on our platform, from our Website to Mobile App, API, USSD, SMS and our Powerful Whatsapp Bot.</p>
                
                </div>
      
           
            
                <div className="col-lg-6 feature-grid-right mt-lg-0 mt-md-5 mt-4">
                    <div className="call-grids-w3 d-grid">
                        <div className="grids-1 box-wrap">
                            <div className="icon">
                                <i className="fa fa-globe" style={{'fontSize': '35px', 'color':'#0ba254'}}></i>
                            </div>
                            <h4><a href="index.html#" className="title-head">Website</a></h4>
                        </div>
                        <div className="grids-1 box-wrap">
                            <div className="icon">
                                <i className="fa fa-mobile" style={{'fontSize': '35px', 'color':'#0ba254'}}></i>
                            </div>
                            <h4><a href="index.html#" className="title-head">Mobile App</a></h4>
                        </div>
                        
                        <div className="grids-1 box-wrap">
                            <div className="icon">
                                <i className="fa fa-envelope-o" style={{'fontSize': '35px', 'color':'#0ba254'}}></i>
                            </div>
                            <h4><a href="index.html#" className="title-head">USSD</a></h4>
                        </div>  
                        
                        <div className="grids-1 box-wrap">
                            <div className="icon">
                                <i className="fa fa-whatsapp" style={{'fontSize': '35px', 'color':'#0ba254'}}></i>
                            </div>
                            <h4><a href="index.html#" className="title-head">Whatsapp</a></h4>
                        </div>                      
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    
    <section className="mt-3 md:mt-20 mx-3 md:mx-24">
        <h1 className="mb-3 md:mb-10 text-base md:text-xl text-brand font-bold">
            How It Works
        </h1>

        <div className="row gap-5">
            <div className="col px-10 bg-brand-light">
                <div className="mb-2 mt-4">
                    <div className="relative w-16 h-16 bg-white border-[1px] border-brand rounded-full flex justify-center items-center text-center text-4xl text-brand-yellow p-4">
                        1
                    </div>
                </div>
                <h3 className="text-base font-bold text-brand mb-2">
                    Create an Account
                </h3>
                <p className="text-black mb-6 md:mb-4">
                Create an Account to get started. this can be completed within seconds(No Long form to fill).
                </p>
            </div>

            <div className="col px-10 bg-brand-light">
                <div className="mb-2 mt-4">
                    <div className="relative w-16 h-16 bg-white border-[1px] border-brand rounded-full flex justify-center items-center text-center text-4xl text-brand-yellow p-4">
                        2
                    </div>
                </div>
                <h3 className="text-base font-bold text-brand mb-2">
                    Fund your wallet
                </h3>
                <p className="text-black mb-6 md:mb-4">
                    Fund your wallet using any of our automated means of payment.
                </p>
            </div>

            <div className="col px-10 bg-brand-light">
                <div className="mb-2 mt-4">
                    <div className="relative w-16 h-16 bg-white border-[1px] border-brand rounded-full flex justify-center items-center text-center text-4xl text-brand-yellow p-4">
                        3
                    </div>
                </div>
                <h3 className="text-base font-bold text-brand mb-2">
                    Place an order 
                </h3>
                <p className="text-black mb-6 md:mb-4">
                    Order for any of our services you want. All are highly affordable and delivery is automated and instant.
                </p>
            </div>

        </div>

        <div className="flex justify-center items-center text-center text-md-start mt-10">
            <a href="/" className="btn text-brand px-5 border-[1.2px] border-brand lift me-1">
                Get Started
            </a>
        </div>
    </section>
    
           
 <Footer/>
   
    </div>
  );
}

export default App;
