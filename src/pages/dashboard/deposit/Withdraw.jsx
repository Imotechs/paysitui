import React,{useState,useEffect,useContext} from "react";
import Account from "../../../components/account/account";
import Header from '../navbar/header/Header'
import Footer from "../footer/Footer";
import '../../../components/data/Data.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PassCode from "../../../components/passcode/Passcode";
import { SetPassCode } from "../../../components/passcode/Passcode";
import Modal from 'react-modal';
import { fetchUserProfile, setTransactionPin } from "../../../vitals";
import { useNavigate } from "react-router-dom";
import CoverPreloader from "../../../components/preloader/Coverpreloader";
import Message from "../../../components/message/Message";
import './Deposit.css'
import { withDrawFunds } from "../../../vitals";
export default function Withdraw(){
    const [loading,setLoading] = useState(false)
    const [isPasCodeOpen, setPassCodeOpen] = useState(false);
    const [isTxnPinOpen,setIsTxnPinOpen] = useState(false)
    const[accounNumber,setAccountNumber] = useState('')
    const [bankName,setBankName] = useState('')
    const[amount,setAmount]=useState('')
    const [messageIsOpen,setMessageIsOpen] = useState(false)
    const[message,setMessage] = useState('')
    const [IsValid,setIsValid] = useState(false)
    const [user,setUser] = useState([])
const navigateto = useNavigate()
    
  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response= await fetchUserProfile({navigateto})
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
  
      } catch (error) {
      } finally{
        setLoading(false);
      }
    };
  
    fetchProfile();
   

  },[] )

    function handleAmountChange(e){
        setAmount(e.target.value)

    }
    function handleAccountChange(e){
        setAccountNumber(e.target.value)

    }
    function handleBankChange(e){
        setBankName(e.target.value)

    }

    function submitForm(e){
        e.preventDefault()
        //console.log(user.txn_pin)
        if (!user.txn_pin){
          setIsTxnPinOpen(true)
  
        }else{
          setPassCodeOpen(true)
  
        }
  
      }
  
      function closeTxnPin(){
        setIsTxnPinOpen(false)
      }
      
     function closePassCode(){
      setPassCodeOpen(false)
     };
     function closeMessage(){
        setMessageIsOpen(false)  
        
        setTimeout(()=>{
        //window.location.reload()
        },1000)
        }

    function continueToWithdraw(){
        setPassCodeOpen(false)
        setLoading(true)
        async function withdraw(){
            let data;
            try{
                const response = await withDrawFunds({navigateto,amount,accounNumber,bankName})
                 data = await response.json()
                
            }catch(e){
    
            }finally{
                setLoading(false)
              
            }
            setMessage(data['message'])
            setTimeout(()=>{
                setMessage('')
            },2000)
    
        }
    withdraw()
    }
        Modal.setAppElement('#root'); 
    return (
        <>
        <Header></Header>
        <Account/>
        {loading && <CoverPreloader loading={loading}isok ={false}/>}
        <div className="contents valid-form">
        <form method="post" className="input-group" onSubmit={submitForm}>
            <h1>Withdraw Funds</h1>
            {message? <h1 style={{color:'gold', marginTop:'30px'}}>{message}</h1>:<>
            <input type="text" name="accountNumber"   autoComplete="off" className="spa" required
                    placeholder="Account Number" value={accounNumber} onChange={handleAccountChange} onPaste={handleAccountChange}/>
            <input type="text" name="bankName"   autoComplete="off" className="spa" required
                    placeholder="Bank Name" value={bankName} onChange={handleBankChange} onPaste={handleBankChange}/>
            <input type="number"  className="spa" required
                placeholder="Amount" value={amount} onChange={handleAmountChange} />
</>}
                     
<button  className='btn-primary databtn'  type="submit">Proceed</button>


               
            </form>
            
            
        </div>
        <Message
          isOpen={messageIsOpen}
          message={message}
          onClose={closeMessage}
          />
        
        <SetPassCode
        isOpen={isTxnPinOpen}
        onClose={closeTxnPin}
        />
        <PassCode
        isOpen={isPasCodeOpen}
        onClose={closePassCode}
        onContinue={continueToWithdraw}
        user ={user}
          />

        <Footer/>
        </>
    )
}