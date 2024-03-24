import React,{useState,useEffect,useContext} from "react";
import { validatePhoneNumber,fetchData, buyData } from "../../vitals";
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
import { fetchUserProfile,} from "../../vitals";
import { useNavigate } from "react-router-dom";
import CoverPreloader from "../preloader/Coverpreloader";
import Message from "../message/Message";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { buyAirtime } from "../../vitals";
  
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
    const [message, setMessage] = useState('')
    const [messageIsOpen,setMessageIsOpen] = useState(false)
    const [optionSelected, setOptionSelected] = useState('')
    const [airtimeOptions, setAirtimeOptions] = useState('')
    const [transaction,setTransaction] = useState('')
    const navigateto = useNavigate()

  const location = useLocation();
  const service = new URLSearchParams(location.search).get("service",'');
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
            if(isValid && service ==='data'){
              const filteredData = availableData.filter(item => item.name.toLowerCase().includes(network.toLowerCase()));
              if (filteredData.length > 0) {
                const sortedData = filteredData.sort((a, b) => {
                    // Extract numerical values and units from displayName
                    const [valueA, unitA] = a.displayName.match(/\d+|\D+/g);
                    const [valueB, unitB] = b.displayName.match(/\d+|\D+/g);
            
                // Convert MB to a larger unit for consistent sorting
                const unitToNumber = unit => (unit.toLowerCase() === 'mb' ? 1 : 0);
        
                // Compare values and units in ascending order
                    return (
                        parseFloat(valueA) - parseFloat(valueB) ||
                        unitToNumber(unitA) - unitToNumber(unitB)
                        );
              });
        
                setSelectedData(sortedData);
              }
              else{
                    setSelectedData([]);
                  }

            }else if(isValid&&service==='airtime'){
              const listAmount = [100,200,300,400,500,1000]
              const amountOptions = listAmount.map((item)=>(
              <option key ={item} network={network} value = {item} amount={item} >{item}</option>
              ))
            setAirtimeOptions(amountOptions)
            }else{
                  if ('vibrate' in navigator) {
                    navigator.vibrate([200, 100, 200]);
                  }  

        }
  
             
      }  

    }

  function applyDiscount(amount){
    return +amount-+amount*0.01
  }

  function handleAmountChange(e){
        if (service ==='data'){
          const selectedOption = e.target.options[e.target.selectedIndex];
          setAmount(selectedOption.getAttribute("amount"));
          setSelectedPlan(e.target.value)
          let data = {
            amount:selectedOption.getAttribute("amount"),
            value:selectedOption.getAttribute("value"),
            name:selectedOption.getAttribute("name"),
            displayName:selectedOption.getAttribute("dname"),
            service:selectedOption.getAttribute("service"),
          }
          setOptionSelected(data)
       
        }
        else if(service =='airtime'){
          const AmountOption = e.target.options[e.target.selectedIndex];
          setAmount(applyDiscount(AmountOption.getAttribute("amount")));
          setSelectedPlan(e.target.value)
          let amountdata = {
            key:AmountOption.getAttribute("key"),
            amount:AmountOption.getAttribute("amount"),
            value:AmountOption.getAttribute("value"),
            network:AmountOption.getAttribute("network"),
          }
          setOptionSelected(amountdata)
          //console.log(amountOptions)
        }
       
        
    }
    useEffect(() => {
      const fetchDataAndUserProfile = async () => {
        try {
          setLoading(true);
          let endppoints = [fetchData(navigateto),
            fetchUserProfile(navigateto)]
          if(service=='airtime'){const response = await fetchUserProfile(navigateto)
            const userData = await response.json();
            setUser(userData);
          }else{ 
            const[dataResp,userResp] = await Promise.all(endppoints);
            const userProfile = await userResp.json();
            const Data = await dataResp.json();
            setUser(userProfile);
            setAvailableData(Data);
          }
        

        } catch (error) {
          console.error(error);
        }finally{
          setLoading(false);
        }
      };
    
      fetchDataAndUserProfile();
    }, [isTxnPinOpen]);
    

    async function submitForm(e){
      e.preventDefault()
      //console.log(user.txn_pin)
      // if (!user.txn_pin){
      //   setIsTxnPinOpen(true)

      // }else{
      //   setPassCodeOpen(true)

      // }
      setLoading(true)
      if(service ==='data'){

        try{
          const buyResp =  await buyData({navigateto,selectedPlan,amount,phoneNumber,optionSelected})
          //console.log(selectedPlan)
          const data = await buyResp.json()
          if(data['message']){
            setMessage(data['message'])
            setMessageIsOpen(true)
            setTransaction(data)
          }else{
            setMessage('An Error Occur!!')
            setMessageIsOpen(true)
          }
          
        }catch(e){
          setMessage('An Error Occur!!')
          setMessageIsOpen(true)
        }finally{
          setLoading(false)

        }
      }

      else if(service ==='airtime'){

        try{
          const buyResp =  await buyAirtime({navigateto,amount,phoneNumber,network})
          //console.log(selectedPlan)
          const data = await buyResp.json()
          
            if(data['message']){
              setMessage(data['message'])
              setMessageIsOpen(true)
              setTransaction(data)
              console.log(data)
            }else{
              setMessage('An Error Occur')
              setMessageIsOpen(true) 
            }
        
          
        }catch(e){
          //setMessage('An Error Occur!!')
        }finally{
          setLoading(false)

        }
      }

    }

    function closeTxnPin(){
      setIsTxnPinOpen(false)
    }
    
   function closePassCode(){
    setPassCodeOpen(false)
   };
   //user to set pin

  //  function userSetPassCode(){
  //  };
function closeMessage(){
setMessageIsOpen(false)  

setTimeout(()=>{
setPhoneNumber('')

},1000)
}
const handleContinue = async() => {     
      //console.log('Continue with transaction logic');
  
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
       {!transaction? <div className="contents valid-form">
            <p className="desc">Experience seamless <b>{service}</b> purchase with our lightning-fast service! At the click of a button, 
                you can swiftly acquire the <b>{service}</b>  you need without any delays</p>
            <form method="post" className="input-group" onSubmit={submitForm}>
            
                <div className="phone-number">
                    <input type="text" name="phoneNumber"  className="input-group" autoComplete="off"
                    placeholder="Phone Number" required value={phoneNumber} onChange={handleChange} onPaste={handleChange}/>
                    <div className="check">
                    {numberIsValid ? (
                                            <span><FontAwesomeIcon icon={faCheck}/>{network}</span>

                    ):(<b className="notvalid">x{network}</b>)}
                    </div>
                    
                </div>

            <label>Select Plan</label>
            <select name="data" className="input-group" onChange={handleAmountChange} value={selectedPlan} required>
                    <option value="0" amount="0">Select Plan</option>
                    {service ==='data'?(selectedData && selectedData.length > 0 ? (
                      //console.log(selectedData);
                      selectedData.map((plan) => (
                        <option key={plan.value} value={plan.value} amount={plan.price} service ={plan.service} name ={plan.name} dname ={plan.displayName}>
                            {`${plan.displayName} ${plan.name}`}
                        </option>
                        ))
                    ):(
                       !numberIsValid ? (<option>Enter a valid Phone number</option>):
                        (<option>0 Data plans Available for selected Network(Pls wait as we work on it)</option>)
                      
                    )):(<>
                      {airtimeOptions}
                      </>
                      )}
                </select>


            <label>Amount</label>
            {loading && <CoverPreloader loading={loading} isok={false}/>}
            <input type="text"  className="input-group"
                placeholder="Amount" value={`₦${amount}`} onChange={handleAmountChange} disabled/>

                        {numberIsValid?(
                                        <button  className='btn-primary databtn'  type="submit">Proceed</button>

                        ):(
                                        <button type="submit" className='btn-primary databtn disabled' >Proceed</button>

                        )}
               
            </form>
        </div>:<>
        
        
<div className ='col content tvform'>
    <h3 className="text-center bg-success rounded-btn">{transaction['message']}</h3>
      <div className='text-center alert alert-info'>
      <b>{transaction.qty}</b>  of {service} successfully gifted
      to  <b>{transaction.number}</b> <br/>
      {transaction['completed']?<>
      <i class="fa fa-check-circle"></i><small className='suport' style={{fontSize:'14px',color:'green'}}>Completed</small>

      </>:<>
      <small className='suport' style={{fontSize:'14px',color:'brown'}}>processing..</small>
      </>}
        </div>  
</div>
        </>}
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
        onContinue={handleContinue}
        user ={user}
          />
    </UserProfileProvider>
<div className="ft">
<Footer/>

</div>
        </>
    )
}