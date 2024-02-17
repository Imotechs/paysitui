import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faBank } from '@fortawesome/free-solid-svg-icons';
import Header from '../navbar/header/Header';
import './Deposit.css';
import Footer from '../footer/Footer';
import Account from '../../../components/account/account';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../../vitals';

// Importing handleCopyClick is not necessary since the function is defined locally
// Remove the import statement for handleCopyClick

export default function Deposit(props) {
  const [isCopied, setIsCopied] = useState(false);
  const [amount,setAmount] = useState('')
  const [amountIsValid,setAmountIsValid] = useState(false)
  const [showCards, setShowCards] = useState(true);
  const [showPaymentInput, setShowPaymentInput] = useState(false);
  const [loading,setLoading] = useState(false)
 const[user,setUser] = useState({})
 const navigateto = useNavigate()
 const [textToCopy, setTextToCopy] = useState(''); // Initialize with default value

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
    if (+e.target.value >=200){
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
  
        const response= await fetchUserProfile(navigateto)
  
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
                ATM-Card <small>(Online Funding)</small>
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
                <p className='account-no'>{user.account_number}</p>
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
          <div className='desc'>
                        <ol>
                            <li> Coppy your account Number Above</li>
                            <li>Use any Bank of your choice and transfer the Amount you want to fund your wallet
                                (this can be any Bank including Mobile Banking App and USSD).
                            </li>

                            <li>Your PaysIt wallet will be funded Once the payment is completed by your Bank</li>
                            <p>This process is Automatic and takes just a Minute</p>
                        </ol>
            </div>
        </div>
        )}

        {showPaymentInput && (
            <div style={{'marginTop':'110px'}}>
            <div className='desc'>
                <p> By using your ATM card to fund your wallet. MasterCard, VisaCard and Verve card are acceptable. 
                    Your wallet will be automatically credited as soon as the payment is successful</p>
           
          <div className="payment-input" style={{'height':'30vh'}}>
            <div className="input-group">
                <input type="number" name="amount" 
                placeholder="₦" value={amount} onChange={handleChange}
               
                >
                
                </input> <br/>
                {amountIsValid && (
                    <button type="submit" className='btn-primary' >Add Funds</button>
                )}
                 {!amountIsValid && (
                    <button type="submit" className='btn-primary disabled' >Enter Amount</button>
                )}
                
                    
                </div>
          </div>
          </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
