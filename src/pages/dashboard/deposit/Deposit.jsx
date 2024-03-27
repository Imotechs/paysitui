import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faBank } from '@fortawesome/free-solid-svg-icons';
import Header from '../navbar/header/Header';
import './Deposit.css';
import Footer from '../footer/Footer';
import Account from '../../../components/account/account';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../../vitals';
import Payment from '../../../components/payment/Payment';
import CoverPreloader from '../../../components/preloader/Coverpreloader';
import { initiatePayment } from '../../../vitals';
import Preloader from '../../../components/preloader/Preloader';
// Importing handleCopyClick is not necessary since the function is defined locally
// Remove the import statement for handleCopyClick

export default function Deposit(props) {
  const [isCopied, setIsCopied] = useState(false);
  const [amount,setAmount] = useState('')
  const [amountIsValid,setAmountIsValid] = useState(false)
  const [showCards, setShowCards] = useState(false);
  const [showPaymentInput, setShowPaymentInput] = useState(true);
  const [loading,setLoading] = useState(false)
 const[user,setUser] = useState({})
 const navigateto = useNavigate()
 const [textToCopy, setTextToCopy] = useState(''); // Initialize with default value
  const [payment,setPayment] = useState(false)
  const [transaction,setTransaction] = useState('')

  //console.log(user.account_number)

  const handleVBAButtonClick = () => {
    setShowCards(true);
    setShowPaymentInput(false);
    setTextToCopy(user.account_number); // Set the text for copying when VBA is selected
  };

  const handleATMButtonClick = () => {
    setShowCards(false);
    setShowPaymentInput(true);
    setTextToCopy(''); // Clear the text for copying when ATM is selected
  };

  const copyThisText = () => {
    try {
      navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
    } catch (err) {
      console.error('Unable to copy text', err);
    } finally {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  };

  function handleChange(e){
    setAmount(e.target.value) 
    if (+e.target.value >=100){
        setAmountIsValid(true)
    }
    else{
        setAmountIsValid(false)
    }

  }
  
  useEffect(()=>{
    const fetchProfile = async () => {
      try {
        setLoading(true);
  
        const response= await fetchUserProfile({navigateto})
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setTextToCopy(userData.account_number); 
        }
  
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
  
    fetchProfile();
   

  },[] )

   function callPayment(){
    setLoading(true)
    async function placePayment(){

      try{
        const response = await initiatePayment({navigateto,amount})
        const data = await response.json()
        if (response.ok){
          setLoading(false)
          setTransaction(data)
          setPayment(true)
          console.log(data)

        }else{
          setLoading(false)
        }
      }catch(e){
  
      }
    }
    placePayment()

  }
 

  return (
    <div className='deposit'>
      <Header />
      <div className="container">
        <div className="desc">
          <p>PaysIt wallet can be used to pay for all the services on PaysIt. Funding the wallet is as well easy. Fund your PaysIt wallet via </p>
          <div className="row options">
            <div className='col'>
              <button className={`btn btn-primary ${showCards ? 'active' : ''}`} onClick={handleVBAButtonClick}>
                VBA <small>(Virtual Bank Account)</small>
              </button>
            </div>
            <div className='col'>
              <button className={`btn btn-warning ${showPaymentInput ? 'active' : ''}`} onClick={handleATMButtonClick}>
                Online <small>(Card/other Options)</small>
              </button>
            </div>
          </div>
        </div>

        {showCards && (
        <div>
          <div className="vba">
            <div className="depositcard" onClick={copyThisText}>
              <div className='banksvg'>
                <FontAwesomeIcon icon={faBank} />
              </div>
              <p className='bank-name'>Bank Name</p>
              <p className='bank'>{user.bank_name}</p>
              <div className='card-foot'>
                <p>Account Number</p>
                <p className='account-no' style={{color:'brown'}}>Comming Up!... <Preloader loading={true}isok={false} style={{color:'brown'}}></Preloader></p>
                <div>
                  {isCopied ? (
                    <>
                      <FontAwesomeIcon icon={faCopy} />Copied!
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCopy} onClick={copyThisText} />Copy
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
          {loading? <CoverPreloader loading={loading} ></CoverPreloader>:''}

          <div className='desc'>
                        <ol>
                            <li> Copy your personalized account Number Above if its Available</li>
                            <li>Use any Bank of your choice and transfer the Amount you want to fund your wallet
                                (this can be any Bank including Mobile Banking App and USSD).
                            </li>

                            <li>Your PaysIt wallet will be funded Once the payment is completed by your Bank</li>
                           <i> <p>Your profile may be in review before you are assigned a personalized Account number for offline transactions;</p>
                            <p>Go ahead and use the Online Option, every process is automated and quick so you dont have to Worry.</p>
                            </i>
                            </ol>
            </div>
        </div>
        )}
{payment? (<Payment amount={amount} transaction = {transaction}/>):(<>
  {showPaymentInput && (
    <div style={{'marginTop':'110px'}}>
    <div className='desc'>
      <b>With a lot of options including a PaysIt temporally account for your one time transaction</b>
      
        <p> Also By using your ATM-card; MasterCard, VisaCard and Verve card are acceptable. 
            Your wallet will be automatically credited as soon as the process is completed</p>
            Always consider clicking the <b>Change payent method</b> for more options
  <div className="payment-input" style={{'height':'30vh'}}>
    <div className="input-group">
        <input type="number" name="amount" 
        placeholder="₦" value={amount} onChange={handleChange}
       
        >
        
        </input> <br/>
        {amountIsValid && (
            <button type="submit" className='btn-primary'  onClick={callPayment}>Add Funds</button>
        )}
         {!amountIsValid && (
            <button type="submit" className='btn-primary disabled' >Enter Amount</button>
        )}
        
            
        </div>
  </div>
  </div>
  </div>
)}
</>)}
        
      </div>
      <Footer />
    </div>
  );
}
