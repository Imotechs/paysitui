import React ,{useContext} from "react"
import './Servicecard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv,faArrowsSpin,faBarcode,faPlugCirclePlus,faMobileScreenButton, faUser} from '@fortawesome/free-solid-svg-icons';
import dataplug from '../../../assets/images/dataplug.png'
import {userProfileContext } from "../../../components/userprofilecontext/UserContext";
import CoverPreloader from "../../../components/preloader/Coverpreloader";
import { Link } from "react-router-dom";
function Servicecard({account}){
    const {loading} = useContext(userProfileContext)

    return(
        <div className=" row serviceblock">
            <div className="col">
            <div className="card">
                <div className="contents">

                <div className="top-label">Quick Services</div>
            
                <div className="row main-ft">
                <Link to ="/dashboard/data/data?service=data" className="custom-link"><div className="service">
                    <span className="service-icon"><FontAwesomeIcon icon={faArrowsSpin} />
                    <br/><i className="service-name">Data</i></span>
                    </div></Link>
                    
                    <Link to='/dashboard/tv/service' className="custom-link"><div className="service">
                   <span className="service-icon"><FontAwesomeIcon icon={faTv} />
                    <br/><i className="service-name">TV SUBs</i></span>
                    </div></Link>

                    <Link to ="/dashboard/epins/" className="custom-link "> 
                    <div className="service">
                    <span className="service-icon"><FontAwesomeIcon icon={faBarcode} />
                    <br/><i className="service-name">E-Pins/Cards</i></span>
                    </div></Link>
                    
                    <Link to ="/dashboard/electricity/bills/" className="custom-link "> 
                    <div className="service">
                    <span className="service-icon"><FontAwesomeIcon icon={faPlugCirclePlus} />
                    <br/><i className="service-name">Electricity</i></span>
                    </div></Link>
                    <Link to ="/dashboard/data/data?service=airtime" className="custom-link "> 
                    <div className="service">
                    <span className="service-icon"><FontAwesomeIcon icon={faMobileScreenButton} />
                    <br/><i className="service-name">Airtime</i></span>
                    </div></Link>
                    <Link to ="/dashboard/user/account/" className="custom-link "> 
                    <div className="service">
                    <span className="service-icon"><FontAwesomeIcon icon={faUser} />
                    <br/><i className="service-name">Ref.& Earn</i></span>
                    </div></Link>
                
                </div>
                </div>
            </div>
            </div>
            <div className="col">
                <div className="card2contents">
            <div className="card2 " >
                    
                <img src={dataplug} alt="dataphoto"/>


                </div>
            </div>
            </div>
    
    {loading &&<CoverPreloader loading={loading} isok={false}/>}

    </div>
    )
}

export default Servicecard