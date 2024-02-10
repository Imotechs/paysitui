import logo from '../../../assets/images/paysit_logo.png'
import Styles from './Footer.module.css'

export default function Footer(){
    return(
        <div className={Styles['footer']}>
        <hr className="line"/>
        <footer className={Styles['row']}>
            <div className={`${Styles['col']} ${Styles['left']}`}>
                <img src ={logo} alt ='logo'/>
                <p>PaysIt © 2021. </p>
            </div>
            <div className={`${Styles['col']} ${Styles['right']}`}>

                <i className="fa fa-phone"></i> <i className="fa fa-whatsapp mx-1"></i> 
                <a href="https://api.whatsapp.com/send?phone=2349016608852" className="btn-link"></a>
            </div>
        </footer>	
       </div>
    )
}