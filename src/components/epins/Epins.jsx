import React from 'react'
import './Epins.css'
import neco from '../../assets/images/neco_logo.png'
import waec from '../../assets/images/waec_logo.png'
import nabteb from '../../assets/images/nabteb.png'
import Header from '../../pages/dashboard/navbar/header/Header'
import Footer from '../../pages/dashboard/footer/Footer'
import Account from '../account/account'
export default function Epins(){
    return(
        <div className='epins'>
        <Header/>
    	 <Account/>
        
             
      <div className="col contents" >
        <div className="card-panel hoverable" >  
    
        <div className="row" > 

    

                                    

            <div   className="col  s12 m3 l2 tooltipped" data-position="bottom" data-tooltip="NABTEB-Result-Pin " data-tooltip-id="023d8a21-2f00-0ee6-32eb-8fa66bedb553">
                    <div className="card py-sm-5  hoverable">
                                
                     <div className="col s3 m12 left-align">
                         <img src={nabteb}alt ='logo'/>		  
	              </div>
                      <div className="col s7 m12 center-align left-on-sm-only ">
                          <h6 className='text-center text-sm'>NABTEB-Pins</h6>
                      </div>
                      
                
                 </div>
                </div>

                                    

            <div   className="col  s12 m3 l2 tooltipped" data-position="bottom" data-tooltip="NECO-Result-Pin " data-tooltip-id="a2a51f5d-039e-0777-e3fc-9717ec9bd915">
                    <div className="card py-sm-5  hoverable">
                                
                     <div className="col s3 m12 left-align">
                         <img src={neco} alt="logo"/>		  
	              </div>
                      <div className="col s7 m12 center-align left-on-sm-only ">
                          <h6 className='text-center'>NECO-Pins</h6>
                      </div>
                      
                     
                 </div>
                </div>

                                    

            <div  className="col  s12 m3 l2 tooltipped" data-position="bottom" data-tooltip="WAEC-Result-Pin " data-tooltip-id="e008183f-e53f-dcd0-400e-3647bcfde272">
                    <div className="card py-sm-5  hoverable">
                                
                     <div className="col s3 m12 left-align">
                         <img src={waec} alt="logo"/>		  
	              </div>
                      <div className="col s7 m12 center-align left-on-sm-only ">
                          <h6 className='text-center'>WAEC-Pins</h6>
                      </div>
                     
                 </div>
                </div>

                                    
  
</div>
</div>
</div>
         <div className='contents' style={{marginBottom:'60px'}}></div>         
 <div className='ft'>
    <Footer/>
 </div>
</div>
    )
}