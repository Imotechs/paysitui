import React,{useState,useEffect,useContext} from "react";
import { validatePhoneNumber,fetchData } from "../../vitals";
import Account from "../account/account";
import Header from '../../pages/dashboard/navbar/header/Header'
import Footer from "../../pages/dashboard/footer/Footer";
import './Data.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PassCode from "../passcode/Passcode";
import {SetPassCode} from "../passcode/Passcode";
import Modal from 'react-modal';
import { userProfileContext,UserProfileProvider } from "../userprofilecontext/UserContext";
import { fetchUserProfile } from "../../vitals";
import { useNavigate } from "react-router-dom";
import CoverPreloader from "../preloader/Coverpreloader";

export default function Data(props){
    const [phoneNumber, setPhoneNumber] = useState('')
    const [amount, setAmount] = useState('')
    const[network,setNetwork] = useState('')
    const [numberIsValid,setNumberIsValid] = useState(false)
    const[availableData,setAvailableData] = useState([])
    const[selectedData,setSelectedData] = useState([])
    const [selectedPlan, setSelectedPlan] = useState("0"); // Default to "Select Plan"
    const [isPasCodeOpen, setPassCodeOpen] = useState(false);
    const [isTxnPinOpen,setIsTxnPinOpen] = useState(false)
    const[loading,setLoading] = useState(false)
    const[user,setUser] =useState({})
    const navigateto = useNavigate()

    function handleChange(e){
        setPhoneNumber(e.target.value)
        const phoneNo = e.target.value
        if(phoneNo.length <=7){
            setSelectedData([])
            setNetwork('Unknown')
            setNumberIsValid(false)
        }
        if (phoneNo.length >=8){
           let {isValid,network}= validatePhoneNumber(phoneNo)
           setNetwork(network)
           setNumberIsValid(isValid)

           const filteredData = availableData.filter(item => item.network.toLowerCase() ===network.toLowerCase());
           console.log(filteredData)
           if(filteredData){
            setSelectedData(filteredData);
           }       
           if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200]);
          }     
         }

    }
    function handleAmountChange(e){
        const selectedOption = e.target.options[e.target.selectedIndex];
        setAmount(selectedOption.getAttribute("amount"));
        setSelectedPlan(e.target.value)
        
    }
    useEffect(() => {
      const fetchDataAndUserProfile = async () => {
        try {
          setLoading(true);
    
          const [response, resp] = await Promise.all([
            fetchData(navigateto),
            fetchUserProfile(navigateto),
          ]);
    
          if (resp.ok) {
            const userData = await resp.json();
            setUser(userData);
          }
    
          if (response.ok) {
            const networkData = await response.json();
            setAvailableData(networkData);
          }
    
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
    
      fetchDataAndUserProfile();
    }, []);
    

    function submitForm(e){
      e.preventDefault()
      console.log(user.txn_pin)
      if (!user.txn_pin){
        setIsTxnPinOpen(true)

      }else{
        setPassCodeOpen(true)

      }

    }

    function closeTxnPin(){
      setIsTxnPinOpen(false)
    }
    // function openPassCode(e){
    //   setPassCodeOpen(true)
    //   e.preventDefault()

    // }
   function closePassCode(){
    setPassCodeOpen(false)
   };
   //user to set pin

  //  function userSetPassCode(){
  //  };

    const handleContinue = () => {
      console.log(user.txn_pin)
      // Add logic for handling the PIN and continuing the transaction
      // For example, you might want to validate the PIN and proceed with the transaction.
      console.log('Continue with transaction logic');
  
      // Close the modal after handling the PIN

      closePassCode();
      //check if account balance is okay
      //run the data purchase
    };

    Modal.setAppElement('#root'); 
    return (
        <>
        <UserProfileProvider>

        <Header></Header>
        <Account/>
        {loading && <CoverPreloader loading={loading}isok ={false}/>}
        <div className="contents valid-form">
            <p className="desc">Experience seamless data purchase with our lightning-fast service! At the click of a button, 
                you can swiftly acquire the data you need without any delays</p>
            <form method="post" className="input-group" onSubmit={submitForm}>
            
                <div className="phone-number">
                    <input type="text" name="phoneNumber"  className="input-group" autoComplete="off"
                    placeholder="Phone Number" value={phoneNumber} onChange={handleChange} onPaste={handleChange}/>
                    <div className="check">
                    {numberIsValid ? (
                                            <span><FontAwesomeIcon icon={faCheck}/>{network}</span>

                    ):(<b className="notvalid">x {network}</b>)}
                    </div>
                    
                </div>

            <label>Select Plan</label>
            <select name="data" className="input-group" onChange={handleAmountChange} value={selectedPlan}>
                    <option value="0" amount="0">Select Plan</option>
                    {selectedData.map((plan) => (
                    <option key={plan.slug} value={plan.name} amount={plan.cost}>
                        {`${plan.name} ${plan.duration}`}
                    </option>
                    ))}
                </select>


            <label>Amount</label>
            <input type="text"  className="input-group"
                placeholder="Amount" value={`₦${amount}`} onChange={handleAmountChange} disabled/>

                        {numberIsValid?(
                                        <button  className='btn-primary databtn'  type="submit">Proceed</button>

                        ):(
                                        <button type="submit" className='btn-primary databtn disabled' >Proceed</button>

                        )}
               
            </form>
        </div>
        <SetPassCode
        isOpen={isTxnPinOpen}
        onClose={closeTxnPin}
        />
        <PassCode
        isOpen={isPasCodeOpen}
        onClose={closePassCode}
        onContinue={handleContinue}
        user ={user}
          />
    </UserProfileProvider>

        <Footer/>
        </>
    )
}