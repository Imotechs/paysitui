import React from "react"
import './Servicecard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv,faArrowsSpin,faBarcode,faPlugCirclePlus,faMobileScreenButton} from '@fortawesome/free-solid-svg-icons';
import dataplug from '../../../assets/images/dataplug.png'

function Servicecard({account}){
    return(
        <div className=" row serviceblock">
            <div className="col">
            <div className="card">
                <div className="contents">

                <div className="top-label">Quick Services</div>
            
                <div className="row main-ft">
                    <div className="service">
                    <span className="service-icon"><FontAwesomeIcon icon={faArrowsSpin} />
                    <br/><i className="service-name">Data</i></span>
                    </div>

                    <div className="service">
                    <span className="service-icon"><FontAwesomeIcon icon={faTv} />
                    <br/><i className="service-name">VTU SUBs</i></span>
                    </div>

                    <div className="service">
                    <span className="service-icon"><FontAwesomeIcon icon={faBarcode} />
                    <br/><i className="service-name">E-Pins/Cards</i></span>
                    </div>

                    <div className="service">
                    <span className="service-icon"><FontAwesomeIcon icon={faPlugCirclePlus} />
                    <br/><i className="service-name">Electricity</i></span>
                    </div>
                    <div className="service">
                    <span className="service-icon"><FontAwesomeIcon icon={faMobileScreenButton} />
                    <br/><i className="service-name">Airtime</i></span>
                    </div>
                    <div className="service">
                    <span className="service-icon"><FontAwesomeIcon icon={faMobileScreenButton} />
                    <br/><i className="service-name">Ref.& Earn</i></span>
                    </div>
                
                </div>
                </div>
            </div>
            </div>
            <div className="col">
            <div className="card2 " >

              <img src={dataplug} alt="dataphoto"/>
              

    </div>
    </div>
    

    </div>
    )
}

export default Servicecard