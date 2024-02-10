import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthernet, faBank,faMessage } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Account.css'
const Account =()=>{
    return (
        <div className="container account card">
            <div className="row">
                <div className="col">
                    <div className="head">
                        <p>Balance</p>
                        <p className="bal">₦ <b>25,000</b></p>
                    </div>
                </div>
                <div className="col">
                    <Link to='/dashboard/user-deposit'><button>+Deposit</button></Link>
                </div>

            </div>
        <hr/>
        <div className=" row items">
                <div className="col withdrow">
                <FontAwesomeIcon icon={faBank}/>
                <p>Withdraw</p>
                </div>
                <div className='col dashbord'>
                <FontAwesomeIcon icon={faEthernet}/>
                <p>DashBoard</p>
                </div>
                <div className='col dashbord'>
                <FontAwesomeIcon icon={faMessage}/>
                <p>Support</p>
                </div>
            </div>
        </div>
    )
}

export default Account