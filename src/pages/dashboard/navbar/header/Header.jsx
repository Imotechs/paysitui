import React, {useState}from 'react'
import styles from '../Navbars.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars} from '@fortawesome/free-solid-svg-icons';
import Aside from '../aside/Aside';
import { UserProfileProvider } from '../../../../components/userprofilecontext/UserContext';
export default function Navbar(props){
    const[isToggled,setIsToggled] = useState(false)

    function toggleNavBar(){
        setIsToggled(!isToggled)
    }
    return(
        <UserProfileProvider>
        <header>
            
        

	<div className={`${styles['wrapper']} `}>
		<Aside isToggled={isToggled} user = {props.user}/>
        {/* <button className= {`${styles['sidebar-toggle']} ${styles['d-flex']} ${styles['mr-2']}`} > */}
        {/* <FontAwesomeIcon icon={faBell} className=  {`${styles['topright']} ${styles['align-self-center']}`} >
             </FontAwesomeIcon>
             <i className={styles['topright']} style={{'color':'red','fontWeight':'bold', 'fontSize':'10px', 'marginLeft':'10px','marginTop':'7px'}}>20</i>*/}
        <div className={`${styles['col']} ${styles['topright']}`}> 
		<FontAwesomeIcon icon={faBars} className=  {`${styles['hamburger']} ${styles['align-self-center']}`} onClick={toggleNavBar}/>
        </div>
		{/* </button> */}
      
</div>
</header>
</UserProfileProvider>


    )
}