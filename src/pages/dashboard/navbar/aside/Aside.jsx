
import React from "react"
import styles from '../Navbars.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTv ,
	faArrowsSpin,faMobileScreenButton,faBars} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
// [faRightFromBracket,faArrowTurnDown,faPlugCirclePlus,faBarcode,faHamburger
// ]
export default function Aside({isToggled}){
    return(
        <nav id="sidebar" className={`${styles['sidebar']} bg-primary ${styles['toggled']} ${isToggled? '':styles['collapse']}`}>
	
			<div className={styles['sidebar-ontent']}>
				<div className={styles['sidebar-user']}>
				<Link to="/dashboard/user-deposit"><button className={styles['topup']}>::</button></Link>
                <div  className={styles['font-weight-bold']} style={{'color':'brown', 'fontSize':'16px'}}>ImoTechs</div>

                    <div className={styles['row']}>
                    <div className={styles['col']}>
                    <div  className={styles['font-weight-bold']}>Main Balance</div>
					<small >₦15,300</small>
                    </div>
                    <div className={styles['col']}>
                    <div  className={styles['font-weight-bold']}>Commissions</div>
					<small >₦12,300</small>
                    </div>

                    </div>
					
				</div>

				<ul className={styles['sidebar-nav']}>
					<li className={styles['sidebar-header']}>
						Main
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
						<Link to="/dashboard/data" className= {styles['sidebar-link']}>
						<FontAwesomeIcon icon={faArrowsSpin} className= {`${styles['align-middle']} ${styles['mr-2']} ${styles['fa']} ${styles['fa-wifi']}`}/> <span className={styles["align-middle"]}>Buy Data</span>
						</Link>
					</li>
					
					<li className={styles['sidebar-item']}>
						<a  data-toggle="collapse" className={`${styles['sidebar-link']} ${styles['collapsed']}`}>
						<FontAwesomeIcon icon={faTv} className= {`${styles['align-middle']} ${styles['mr-2']} ${styles['fa']} ${styles['fa-wifi']}`}/>  <span className={styles["align-middle"]}>Bills</span>
						</a>
						<ul id="bills" className="sidebar-dropdown list-unstyled collapse " >
							<li className={styles['sidebar-item']}><a  className={styles['sidebar-link']} href="/"><i ></i>Pay Bills</a></li>
							<li className={styles['sidebar-item']}><a  className={styles['sidebar-link']} href="/"><i className="align-middle mr-2 fa fa-history"></i>Bills History</a></li>
						</ul>
					</li>
					
					<li className={styles['sidebar-item']}>
						<a href="/" className={styles['sidebar-link']}>
						<FontAwesomeIcon icon={faMobileScreenButton} className= {`${styles['align-middle']} ${styles['mr-2']} ${styles['fa']} ${styles['fa-wifi']}`}/>  <span className={styles["align-middle"]}>Airtime VTU</span>
						</a>
					</li>
					
					<li className={styles['sidebar-item']}>
                        						<a href="/"className={styles['sidebar-link']}>
							<i className="align-middle mr-2 fa fa-exchange"></i> <span className={styles["align-middle"]}>Airtime To Cash</span>
						</a>
					</li>	
					<li className={styles['sidebar-item']}>
                        <Link to="/dashboard/user-deposit" className={styles['sidebar-link']}>
							<i className="align-middle mr-2 fa fa-id-card"></i> 
						<span className={styles["align-middle"]}>Fund Wallet</span></Link>
					</li>
					<li className={styles['sidebar-item']}>
						
					</li>
					
					<li className={styles['sidebar-item']}>
						<a href="#/" className={styles['sidebar-link']} >
							<i className="align-middle mr-2 fas fa-fw fa-user"></i> <span className={styles["align-middle"]}>Refer & Earn</span>
						</a>
					</li>
					
					<li className={styles['sidebar-item']}>
						<a href="/" className={styles['sidebar-link']}>
							<i className="align-middle mr-2 fas fa-sign-out-alt"></i> <span className={styles["align-middle"]}>LogOut</span>
						</a>
					</li>
					
				</ul>
			</div>
		</nav>
    )
}