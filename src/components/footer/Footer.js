
import React from "react";
import logo from '../../assets/images/paysit.png'  
import { Link } from "react-router-dom";

function Footer (){

    return (
        <footer className="bg-brand-bg mt-5 pt-1 pb-2">
        <div className="mx-3 row md:mx-24 grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="flex flex-col col space-y-2">
            <Link to="/about-us" className=''><span className=" text-sm  text-white sr-only">PaysIt</span>
                    <img  style ={{'width':60,'height':70}}src={logo} alt="logo"/></Link>
                <span className="text-sm  text-white">Address: Makurdi, Benue state,Nigeria.</span>
                <span className="text-sm  text-white">paysit.info@gmail.com</span>
                <span className="text-sm  text-white"><Link to="/about-us" className="  social-icon" >About Us</Link></span>


            </div>
            <div className="col text-center" >
                    <p className="text-sm  bg-warning">Services</p>
                    <p className="text-sm   text-white">Data & Airtime</p>
                    <p className="text-sm   text-white">Electricity Bills</p>
                    <p className="text-sm   text-white">WAEC/NECO &JAMB E-Pins</p>
                    <p className="text-sm  text-white">Cable Subscription</p>
            	</div>
            	<div className="col text-center  "  >
                    <p className="text-sm bg-warning">Others</p>
                    <p className="text-sm  text-white">Partner with Us</p>
                    <p className="text-sm  text-white">FAQs</p>
                    <p className="text-sm  text-white">Developer APIs</p>
                    <p className="text-sm  text-white">Testimonials</p>
                </div>
            
                <div className="flex items-center col space-x-8">

                	<Link to="https://facebook.com/profile.php?id=61557658864380" className="social-icon" >
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                            <path d="M36 2H4a2 2 0 0 0-1 2v32a2 2 0 0 0 1 1h16V24h-4v-5h4v-4c0-5 3-7 7-7h5v5h-4c-2 0-2 1-2 2v4h5l-1 5h-4v13h10a2 2 0 0 0 2-1V4a2 2 0 0 0-2-2Z" fill="#fff"/>
                        </svg>                      
                	</Link>
                
                	<Link to="https://x.com/PaysitNG?t=PVTwzySBa6r-U1B89JwidA&s=09" className="social-icon" >
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                            <path d="m39 9-5 1 4-4-5 1a8 8 0 0 0-13 6v1A22 22 0 0 1 4 6a7 7 0 0 0 2 10H3c0 3 2 6 6 7a8 8 0 0 1-4 0c1 3 4 5 8 5a16 16 0 0 1-12 4l12 3a22 22 0 0 0 22-23l4-3Z" fill="#fff"/>
                        </svg>
                    </Link>
                	<Link to="https://wa.me/message/DHCVWD7K25CWB1"  className="social-icon" >
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M32 8a17 17 0 0 0-12-6A17 17 0 0 0 5 29l-2 8 9-2 8 2A17 17 0 0 0 32 8ZM20 34c-3 0-5 0-7-2h-1l-5 1 1-5c-2-3-2-5-2-8a14 14 0 0 1 29 0c0 8-7 14-15 14Zm8-11-3-1h-1l-1 2h-1l-4-2-2-3v-1l1-1v-1l-1-3-1-1h-1a2 2 0 0 0-1 0l-2 4 2 4c0 1 3 5 7 7l3 1h3l3-2v-2l-1-1Z" fill="#fff"/>
                        </svg>
                    </Link>                     
            </div>
        </div>
        
        <div className="flex justify-center text-center items-center text-white mt-3 mb-1">
            PaysIt © 2020. ALL RIGHTS RESERVED.
        </div>
    </footer>
    )
}

export default Footer