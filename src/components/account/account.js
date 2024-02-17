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
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setLoading(false)
          console.log(data)

        } else {
          console.error('Failed to fetch user profile:', response.status);
          setLoading(false)
        }
        
      }catch(e){
        console.error(e)
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
                        <p className="bal"> <b>{walletBalance}</b></p>
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
                <Link to ='/dashboard'><FontAwesomeIcon icon={faEthernet}/>
                <p>DashBoard</p></Link>
                </div>
                <div className='col dashbord'>
                <FontAwesomeIcon icon={faMessage}/>
                <p>Support</p>
                </div>
            </div>
            {loading &&<CoverPreloader loading={loading} isok={false}/>}

        </div>
    )
}

export default Account