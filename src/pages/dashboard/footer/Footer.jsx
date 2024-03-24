import logo from '../../../assets/images/paysit_logo.png'
import Styles from './Footer.module.css'
import { Link } from 'react-router-dom'
export default function Footer(){
    return(
        <div className={Styles['footer']}>
        <hr className="line"/>
        <footer className={Styles['row']}>
            <div className={`${Styles['col']} ${Styles['left']}`}>
            <Link to ="/about-us"> <img src ={logo} alt ='logo'/></Link>
                <p style={{color:'white'}}>PaysIt © 2021 </p>
                <small>
                    For your Virtual Top Ups.
                </small>
            </div>
            <div className={`${Styles['col']} ${Styles['right']}`} style={{fontSize:'18px', color:'white'}}>

                <i className="fa fa-phone"></i> &nbsp; <i className="fa fa-whatsapp mx-1"></i> 
                <a href="https://wa.me/message/DHCVWD7K25CWB1" className="btn-link"></a>
            </div>
        </footer>	
       </div>
    )
}