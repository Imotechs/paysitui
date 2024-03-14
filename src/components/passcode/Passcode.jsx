import React, { useState } from 'react';
import Modal from 'react-modal';
import './Passcode.css'; // Import your custom styles
import CoverPreloader from '../preloader/Coverpreloader';
import PassPreloader from '../preloader/PassPreloader';
import { setTransactionPin } from '../../vitals';
import { useNavigate } from 'react-router-dom';

const flashModal = ()=>{
  const flashModal = document.getElementById('flasher'); 
        if (flashModal) {
          flashModal.classList.add('shake');

          setTimeout(() => {
            flashModal.classList.remove('shake');
          }, 500);
        }
}

const PassCode = ({ isOpen, onClose, onContinue,user }) => {
  const [pin, setPin] = useState('');
  const [error,setError] = useState('')
  const[isValid,setIsValid] = useState(false)

  const handlePinChange = (e) => {
    const newPin =e.target.value
    const userPin =user.txn_pin
    setPin(newPin);
    if (newPin.length === userPin.length) {
      if (newPin !== userPin) {
        if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
          flashModal()
        }
        setPin('');
        setError('Incorect Pin')
      } 
      else {
        setIsValid(true)
        console.log('PINs match:', newPin, userPin);
        setError('')
        //onClose()
        //setIsValid(true);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Transaction Modal"
      className="transaction-modal"
      overlayClassName="transaction-overlay"
    >

      <div className="modal-content" id='flasher'>
      <span onClick={onClose} className='closex'>x</span>

        {error? (
          <b className='txn-top'>{error}</b>
        ):(
          <h2>Enter PIN  </h2>
        )}
        <input
          type="password"
          placeholder="Enter your PIN"
          value={pin}
          onChange={handlePinChange} required
          maxLength="5"
          minLength="4"
        />
       {isValid? (
         <button onClick={onContinue}>Continue</button>
       ):(
         <button className='disabled'>Continue</button>
       )}
      </div>
    </Modal>
  );
};

export default PassCode;



export const SetPassCode = ({ isOpen, onClose }) => {
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [isValid,setIsValid] = useState(false)
  const [accountPassword,setAccountPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const navigateto = useNavigate()

  const handlePin1Change = (e) => {
    setPin1(e.target.value);
  };

function handlePin2Change(e) {
    const newPin2 = e.target.value;
    setPin2(newPin2);
  
    if (newPin2.length === pin1.length) {
      if (pin1 !== newPin2) {
          if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200]);
          setError('Pin not Same')
          flashModal()
          setPin2('');
          setIsValid(false);
        } 
    }else {setIsValid(true) ;setError('')
  } 
  }
}
  
function handlePassChange(e){
    setAccountPassword(e.target.value)


    
  }

  function handleContinue(e){
    e.preventDefault()
    setLoading(true)
    const setPin =async()=>{
      try{
        const response = await setTransactionPin({navigateto,accountPassword,pin2})
        if (response.ok) {
          const data = await response.json();
          setLoading(false)
          setError('OK')
          onClose()
          //window.location.reload()
        } 
        else if(response.status ===400){
          setError('Password not correct')
          setLoading(false)
        }
        else {
          console.error('Failed to fetch user profile:', response.status);
          setLoading(false)
          setError('Something went wrong')
        }
      }catch(e){setError(e); }

    }
    setPin()



  }
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Transaction Modal"
      className="transaction-modal"
      overlayClassName="transaction-overlay"
    >
      <form method='post' onSubmit={handleContinue}>

      <div className="modal-content" id='flasher'>
      <span onClick={onClose} className='closex'>x</span>

        {error? (
          <b className='txn-top'>{error}</b>
        ):(
          <b className='txn-top'>Set Transaction PIN </b>
        )}
        <input
          type="password"
          placeholder="Enter your PIN eg. 1234 "
          value={pin1}
          pattern="[0-9]*" 
          inputMode="numeric"
          maxLength="5"
          minLength="4"
          onChange={handlePin1Change} required
        />
        <p></p>
        <input
          type="password"
          placeholder="Confirm Pin"
          value={pin2}
          pattern="[0-9]*" 
          inputMode="numeric"
          minLength="4"
          maxLength="5"
          onChange={handlePin2Change} required
          
        />
        {isValid? (
          <>
          <input
          type="password"
          placeholder="Account Password"
          value={accountPassword}
         
          onChange={handlePassChange} required
          
        />
                  {loading && <PassPreloader loading={loading} isok={false}/>}

        <button type='submit'>Save</button>
          </>
        ):(
          <button className='disabled'>Continue</button>
        )}
      </div>
      </form>

    </Modal>
  );
};

