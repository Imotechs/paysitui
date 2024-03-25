import React,{useEffect, useState,useContext} from "react"
import Header from '../../pages/dashboard/navbar/header/Header'
import Footer from "../../pages/dashboard/footer/Footer"
import Account from "./account"
import CoverPreloader from "../preloader/Coverpreloader"
import { fetchUserProfile ,convertCommision} from "../../vitals"
import { useNavigate } from "react-router-dom"
import { frontEndUrl } from "../../vitals"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faBank } from '@fortawesome/free-solid-svg-icons';
export default function TransferToWallet(){
    const [loading,setLoading] = useState(false)
    const[amount,setAmount] = useState('')
    const [user,setUser] = useState([])
    const [isCopied,setIsCopied] = useState(false)
    const[message,setMessage] = useState('')
    const navigateto = useNavigate()
    const balance = user.wallet_balance
	const bonus = user.wallet_bonus
    const refLink = `${frontEndUrl}/sign-up/?ref=${user.referral_code}`
    //const refs =Array.isArray(user.referees)
    //const referees = refs.map((ref)=><b>{ref.username}  {ref.email}</b>)
    useEffect(()=>{
        setLoading(true)
        const getData =async()=>{
          try{
            const response = await fetchUserProfile({navigateto})
            if (response.ok) {
              const data = await response.json();
              setUser(data);
    
            } 
          }catch(e){
          }finally{
            setLoading(false)
          }
    
        }
        getData()
    
        },[message])

    function submitForm(e){
    
        e.preventDefault()
        setLoading(true)
        async function convert(){
        try{
          const response = await convertCommision({navigateto,amount})
          const data =  await response.json()
          setMessage(data['message'])
        }catch(e){

        }finally{
          setLoading(false)
        }
      }
      if(amount<500){
        setMessage('Minimun of N500 is allowed')
        if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
        } 
        setAmount(0)
      }else{
        convert()
      }
      

    }
    function changeAmount(e){
        let enteredAmount = e.target.value
        setAmount(enteredAmount)
        if(enteredAmount>bonus){
            if ('vibrate' in navigator) {
                navigator.vibrate([200, 100, 200]);
              } 
              setAmount(0)
        }

    }
 
    const copyThisText = () => {
        try {
          navigator.clipboard.writeText(refLink);
          setIsCopied(true);
        } catch (err) {
          console.error('Unable to copy text', err);
        } finally {
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        }
      };

    
    return (
        <>
        <Header/>
        <Account/>
        <div className="login">

      <div className="login">
    <div className='desc container'>
    <b className="support text-center" style={{marginLeft:'80px',fontSize:'20px'}}>HOW IT WORKS</b>
                    <p>Commissions you earn from your friends can be transfered into your main wallet,
                        and you can use it to pay for any of our services on <b>PaysIt</b>
                    </p>
                    <b className="support" style={{marginLeft:'0px',fontSize:'20px'}}>How to Earn Commissions</b>
                        <ol>
                            <li> Copy your invite Link or code</li>
                            <li>Send it to your friends to sign up and enjoy our services just as we hope you are doing.
                                (Give them the link or the 5Digits Code).
                            </li>
                            <li>First, your wallet will earn a commission of <b>N100</b> from every invite</li>
                            <li>Your PaysIt wallet will keep accummulating Commissions as they pay for services</li>
                            <p>You can transfer your commisions to your wallet and spend them just like your deposited funds</p>
                        </ol>

                        <b className="support" style={{marginLeft:'90px',fontSize:'20px'}}>My Invite Link & Code</b>
                        <div className="row">
                            <div className="col">
                            <input  className='refcode' placeholder={refLink} name="refcode" value={refLink} readOnly onClick={copyThisText}></input>

                            </div>
                            <div className="col" >
                            <button style={{display:'inline',color:'white'}} onClick={copyThisText}>
                  {isCopied ? (
                    <>
                      <FontAwesomeIcon icon={faCopy} />Copied!
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCopy} onClick={copyThisText} />Copy
                    </>
                  )}
                </button>
                            </div>
                        </div>

                
            </div>
    </div>
    <div className="convert">
    <div className="verification-container">
        
	<CoverPreloader loading={loading} isok={false}/> 
    <form onSubmit={submitForm} className="convertform text-center">
    <h2 className="emailsuccess">
      <h5 className="text-center">Convert Commissions</h5>
        </h2>
        {!message && <input type="number" placeholder="Amount" name="amount" value={amount} onChange={changeAmount}></input>}
        <h2 style={{marginLeft:'50px'}}>{message}</h2>
        <br/>
		<button className=" btn text-brand px-5 border-[1.2px] border-block lift me-1" type='submit'>Proceed</button>
              
        </form>
    <p className="support-text">Need help? <b className="support">Contact Customer Support </b> @<a mailto ='paysit.info@gmail.com' className="txt-email">paysit.info@gmail.com</a></p>
</div> 
                
                
                </div>
    </div>
    
    
        <Footer/>
        
        </>
    )
}