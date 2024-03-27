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

                <i className="fa fa-phone"></i> &nbsp; <i className="fa fa-whatsapp mx-1">
                <a href="https://wa.me/message/DHCVWD7K25CWB1" className="btn-link"></a></i> 

                <i className="fa fa-twitter mx-1">
                <a href="https://x.com/PaysitNG?t=PVTwzySBa6r-U1B89JwidA&s=09" className="btn-link"></a></i> 
            </div>
        </footer>	
       </div>
    )
}