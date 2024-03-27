
import React,{useContext, useEffect, useState} from "react"
import styles from '../Navbars.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTv ,
	faArrowsSpin,faMobileScreenButton,faBars,faPowerOff,faUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { userProfileContext } from "../../../../components/userprofilecontext/UserContext";
import CoverPreloader from "../../../../components/preloader/Coverpreloader";
import { useNavigate } from "react-router-dom";
// [faRightFromBracket,faArrowTurnDown,faPlugCirclePlus,faBarcode,faHamburger
// ]
export default function Aside({isToggled}){
	// const[loading,setLoading] = useState(false)
	let [username,setUsername] =useState('')
	const{user,loading,setLoading} = useContext(userProfileContext)
	const navigateto = useNavigate()
	const balance = user.wallet_balance
	const bonus = user.wallet_bonus
		// Format the amount as Nigerian Naira
		const walletBalance = new Intl.NumberFormat('en-NG', {style: 'currency',currency: 'NGN',}).format(balance);
		const walletBonus = new Intl.NumberFormat('en-NG', {style: 'currency',currency: 'NGN',}).format(bonus);
	useEffect(()=>{
		setUsername(user.username)
	})
	function handleLogout(){
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		setLoading(true)
		setTimeout(()=>{
			setLoading(false)
			navigateto('/login')
		},1500)
		



	}
	function openBills(e) {
		
		const billsDropdown = document.getElementById('bills');
		if(billsDropdown.classList.contains('collapse')){
			billsDropdown.classList.remove('collapse');
		}else{
			billsDropdown.classList.add('collapse');

		}
	}
	  
    return(
        <nav id="sidebar" className={`${styles['sidebar']} ${styles['toggled']} ${isToggled? '':styles['collapse']}`}>
	
			<div className={styles['sidebar-ontent']}>
				<div className={styles['sidebar-user']}>
				<Link to="/dashboard/user-deposit"><button className={styles['topup']}>::</button></Link>
                <div  className={styles['font-weight-bold']} style={{'color':'brown', 'fontSize':'16px'}}>
				 
				{username}</div>
                    <div className={styles['row']}>
                    <div className={styles['col']}>
                    <div  className={styles['font-weight-bold']}>Main Balance</div>
					<small  style={{fontSize:'24px'}}>{walletBalance}</small>
					<small>
					<small>
						<Link to ='/dashboard/user/account/'><button className={`border-block ${styles['convertbtn']}`}>Deposit</button>
						</Link>
						</small>
                    </small>
                    </div>
                    <div className={styles['col']}>
                    <div  className={styles['font-weight-bold']}>Commissions</div>
					<small >{walletBonus}</small>
					<small>
					<small>
						<Link to ='/dashboard/user/account/'><button className={`border-block ${styles['convertbtn']}`}>Checkout</button>
						</Link>
						</small>
                    </small></div>

                    </div>
					
				</div>
					{loading && <CoverPreloader loading={true}/>}
				<ul className={styles['sidebar-nav']}>
					<li className={styles['sidebar-header']}>
						Main &nbsp; &nbsp; &nbsp; &nbsp; 
						<FontAwesomeIcon icon={faPowerOff} style={{'color':'brown', fontSize:'18px', marginLeft:'120px'}} onClick={handleLogout}/>
					</li>
					<li className={`${styles['sidebar-item']} ${styles['active']}`}>
						<Link to="/dashboard" className={styles["sidebar-link"]}>
						<FontAwesomeIcon icon={faBars} className= {`${styles['align-middle']} ${styles['mr-2']} ${styles['fa']} ${styles['fa-wifi']}`}/><span className={styles["align-middle"]}>Dashboard</span>
						</Link>
					</li>
					
					
					<li className={styles['sidebar-item']}>
						Our Services
					</li>
					<li className={styles['sidebar-item']}>
					<Link to ="/dashboard/data/data?service=data" className= {styles['sidebar-link']}>
						<FontAwesomeIcon icon={faArrowsSpin} className= {`${styles['align-middle']} ${styles['mr-2']} ${styles['fa']} ${styles['fa-wifi']}`}/> <span className={styles["align-middle"]}>Buy Data</span>
						</Link>
					</li>
					
					<li className={styles['sidebar-item']}>
						<a data-toggle="collapse" className={`${styles['sidebar-link']} ${styles['collapsed']} open`} onClick={openBills}>
						<FontAwesomeIcon icon={faTv} className= {`${styles['align-middle']} ${styles['mr-2']} ${styles['fa']} ${styles['fa-wifi']}`}/>  <span className={styles["align-middle"]}>Bills</span>
						</a>
						<ul id="bills" className="sidebar-dropdown list-unstyled collapse" >
						<Link to='/dashboard/tv/service' className={styles['sidebar-link']}>	<li className={styles['sidebar-item']}><i ></i>Tv Subscription</li> </Link>
						<Link to='/dashboard/electricity/bills' className={styles['sidebar-link']}>	<li className={styles['sidebar-item']}>  <i className="align-middle mr-2 fa fa-history"></i>Electricity Bills</li></Link>
						</ul>
					</li>
					
					<li className={styles['sidebar-item']}>
					<Link to ="/dashboard/data/data?service=airtime"className={styles['sidebar-link']}>
						<FontAwesomeIcon icon={faMobileScreenButton} className= {`${styles['align-middle']} ${styles['mr-2']} ${styles['fa']} ${styles['fa-wifi']}`}/>  <span className={styles["align-middle"]}>Airtime VTU</span>
						</Link>
					</li>
					
						
					<li className={styles['sidebar-item']}>
                        <Link to="/dashboard/user-deposit" className={styles['sidebar-link']}>
							<i className="align-middle mr-2 fa fa-id-card"></i> 
						<span className={styles["align-middle"]}>Fund Wallet</span></Link>
					</li>
					<li className={styles['sidebar-item']}>
						
					</li>
					
					<li className={styles['sidebar-item']}>
					<Link to ='/dashboard/user/account/'className={styles['sidebar-link']} >
					<FontAwesomeIcon icon={faUser} className= {`${styles['align-middle']} ${styles['mr-2']} ${styles['fa']} ${styles['fa-wifi']}`}/> 
					<span className={styles["align-middle"]}>Refer & Earn</span>
						</Link>
					</li>
					<li className={styles['sidebar-item']}>
                        						<a href="/"className={styles['sidebar-link']}>
							<i className="align-middle mr-2 fa fa-exchange"></i> <span className={styles["align-middle"]}>Airtime To Cash</span>
						</a>
					</li>
					<li className={styles['sidebar-item']}>
						<div href="/" className={styles['sidebar-link']} onClick={handleLogout}>
							<i className="align-middle mr-2 fas fa-sign-out-alt"></i> <span className={styles["align-middle"]}>LogOut</span>
						</div>
					</li>
					
				</ul>
			</div>
		</nav>
    )
}