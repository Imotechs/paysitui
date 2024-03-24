import React,{useEffect,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthernet, faBank,faMessage } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { fetchUserProfile } from '../../vitals';
import './Account.css'
import CoverPreloader from '../preloader/Coverpreloader';
import { useNavigate } from 'react-router-dom';
//import {userProfileContext, UserProfileProvider } from "../userprofilecontext/UserContext";

const Account =()=>{
    const[user,setUser] = useState([])
    const[loading,setLoading]=useState(false)
	const balance = user.wallet_balance
	const bonus = user.wallet_bonus
    const navigateto = useNavigate()

		// Format the amount as Nigerian Naira
		const walletBalance = new Intl.NumberFormat('en-NG', {style: 'currency',currency: 'NGN',}).format(balance);
		const walletBonus = new Intl.NumberFormat('en-NG', {style: 'currency',currency: 'NGN',}).format(bonus);
	useEffect(()=>{
    setLoading(true)
    const getData =async()=>{
      try{
        const response = await fetchUserProfile({navigateto})
        //console.log(response)
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setLoading(false)
          //console.log(data)

        } else {
          //console.error('Failed to fetch user profile:', response.status);
          setLoading(false)
        }
        
      }catch(e){
        //console.error(e)
        setLoading(false)
      }

    }
    getData()

    },[])
    return (
        <div className="container account card">
            <div className="row">
                <div className="col">
                    <div className="head">
                        <p>Balance</p>
                        <p className="bal"> <b style={{paddingBottom:'0px'}}>{walletBalance}</b> 
                        <p/><small className='bonus'>
                          +{walletBonus} <small>Commission</small>
                          </small></p>
                    </div>
                </div>
                <div className="col">
                    <Link to='/dashboard/user-deposit'><button>+Deposit</button></Link>
                    <small>
					<small>
						<Link to ='/dashboard/user/account/'><button className='border-block convertbtn'>Checkout</button>
						</Link>
						</small>
                    </small>
                </div>
            </div>
        <hr/>
        <div className=" row items">
                <Link to='/dashboard/user-withdraw/' className='custom-link '><div className="col withdrow">
                <FontAwesomeIcon icon={faBank}/>
                <p>Withdraw</p>
                </div></Link>
                <div className='col dashbord'>
                <Link to ='/dashboard/user-deposit/' className='custom-link '>
                <i className="align-middle mr-2 fa fa-id-card"></i> 
                <p>Deposit</p></Link>
                </div>
                <div className='col dashbord'>
                <Link to ='/dashboard' className='custom-link '><FontAwesomeIcon icon={faEthernet}/>
                <p>DashBoard</p></Link>
                </div>
                <Link to="https://wa.me/message/DHCVWD7K25CWB1" className='custom-link '><div className='col dashbord'>
                <FontAwesomeIcon icon={faMessage}/>
                <p>Support</p>
                </div></Link>
            </div>
            {loading &&<CoverPreloader loading={loading} isok={false}/>}

        </div>
    )
}

export default Account