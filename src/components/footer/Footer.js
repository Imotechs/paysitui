
import React from "react";
import logo from '../../assets/images/paysit.png'  
import { Link } from "react-router-dom";

function Footer (){

    return (
        <footer className="bg-brand-bg mt-5 pt-1 pb-2">
        <div className="mx-3 row md:mx-24 grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="flex flex-col space-y-2">
                <a href="index.html#">
                    <span className="sr-only">PaysIt</span>
                    <img className="h-8 w-auto img-fluid sm:h-10" style ={{'width':100,'height':100}}src={logo} alt="logo"/>
                </a>
                <span className="text-sm font-medium text-white">Address:Makurdi, Benue state,Nigeria.</span>
                <span className="text-sm font-medium text-white">support@paysit.com</span>
            </div>
            <div className="flex flex-col space-y-2">
            	<div className="col">
                    <span className="text-sm col font-medium text-white">Services</span>
                    <span className="text-sm col font-medium text-white">Data & Airtime</span>
                    <span className="text-sm col font-medium text-white">Electricity Bills</span>
                    <span className="text-sm col font-medium text-white">WAEC/NECO &JAMB E-Pins</span>
                    <span className="text-sm col font-medium text-white">Cable Subscription</span>
            	</div>
            </div>
            <div className="  space-y-2">
            	<div className="col">
                    <span className="text-sm font-medium text-white">Others</span>
                    <span className="text-sm font-medium text-white">Partner with Us</span>
                    <span className="text-sm font-medium text-white">FAQs</span>
                    <span className="text-sm font-medium text-white">Testimonials</span>
                </div>
            </div>
            
            <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-white">Follow Us</span>
                <div className="flex items-center space-x-8">
                	<a href="https://facebook.com/paysit" className="social-icon" >
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                            <path d="M36 2H4a2 2 0 0 0-1 2v32a2 2 0 0 0 1 1h16V24h-4v-5h4v-4c0-5 3-7 7-7h5v5h-4c-2 0-2 1-2 2v4h5l-1 5h-4v13h10a2 2 0 0 0 2-1V4a2 2 0 0 0-2-2Z" fill="#fff"/>
                        </svg>                      
                	</a>
                	<a href="https://www.instagram.com/paysit/" className="social-icon" >
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                            <path d="M27 5a7 7 0 0 1 8 8v14a7 7 0 0 1-8 8H13a7 7 0 0 1-8-8V13a7 7 0 0 1 8-8h14Zm0-3H13C7 2 3 7 3 13v14c0 6 4 10 10 10h14c6 0 11-4 11-10V13c0-6-5-11-11-11Z" fill="#fff"/>
                            <path d="M29 13a2 2 0 1 1 0-5 2 2 0 0 1 0 5ZM20 14a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0-3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" fill="#fff"/>
                        </svg>
                    </a>
                	<a href="https://twitter.com/paysit" className="social-icon" >
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                            <path d="m39 9-5 1 4-4-5 1a8 8 0 0 0-13 6v1A22 22 0 0 1 4 6a7 7 0 0 0 2 10H3c0 3 2 6 6 7a8 8 0 0 1-4 0c1 3 4 5 8 5a16 16 0 0 1-12 4l12 3a22 22 0 0 0 22-23l4-3Z" fill="#fff"/>
                        </svg>
                    </a>
                	<a href="https://api.whatsapp.com/send?phone=2349016608852" className="social-icon" >
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M32 8a17 17 0 0 0-12-6A17 17 0 0 0 5 29l-2 8 9-2 8 2A17 17 0 0 0 32 8ZM20 34c-3 0-5 0-7-2h-1l-5 1 1-5c-2-3-2-5-2-8a14 14 0 0 1 29 0c0 8-7 14-15 14Zm8-11-3-1h-1l-1 2h-1l-4-2-2-3v-1l1-1v-1l-1-3-1-1h-1a2 2 0 0 0-1 0l-2 4 2 4c0 1 3 5 7 7l3 1h3l3-2v-2l-1-1Z" fill="#fff"/>
                        </svg>
                    </a>                     
                </div>
            </div>
        </div>
        <div className="flex justify-center text-center items-center text-white mt-3 mb-1">
            PaysIt © 2020. ALL RIGHTS RESERVED.
        </div>
    </footer>
    )
}

export default Footer