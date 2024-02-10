import React,{useState,useEffect} from "react";
import { validatePhoneNumber } from "../../vitals";
import Account from "../account/account";
import Header from '../../pages/dashboard/navbar/header/Header'
import Footer from "../../pages/dashboard/footer/Footer";
import './ValidateNumber.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function ValidationForm(props){
    const [phoneNumber, setPhoneNumber] = useState('')
    const [amount, setAmount] = useState('')
    const[network,setNetwork] = useState('')
    const [numberIsValid,setNumberIsValid] = useState(false)
    const[availableData,setAvailableData] = useState([])
    const[selectedData,setSelectedData] = useState([])
    const [selectedPlan, setSelectedPlan] = useState("0"); // Default to "Select Plan"

    function handleChange(e){
        setPhoneNumber(e.target.value)
        if(phoneNumber.length <=7){
            setSelectedData([])
            setNetwork('Unknown')
            setNumberIsValid(false)
        }
        if (phoneNumber.length >=8){
           let {isValid,network}= validatePhoneNumber(phoneNumber)
           setNetwork(network)
           setNumberIsValid(isValid)

           const filteredData = availableData.find(item => item.network.toLowerCase() ===network.toLowerCase());
           if(filteredData){
            setSelectedData(filteredData.data);
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
    useEffect(()=>{
        let data = [
              {
                "network": "MTN",
                "data": [
                  {"id": 1, "name": "1GB - 1 Day", "duration": "1 day", "amount": 200},
                  {"id": 2, "name": "2GB - 7 Days", "duration": "7 days", "amount": 500},
                  {"id": 3, "name": "5GB - 30 Days", "duration": "30 days", "amount": 1000}
                ]
              },
              {
                "network": "Airtel",
                "data": [
                  {"id": 4, "name": "500MB - 1 Day", "duration": "1 day", "amount": 150},
                  {"id": 5, "name": "1GB - 7 Days", "duration": "7 days", "amount": 400},
                  {"id": 6, "name": "3GB - 30 Days", "duration": "30 days", "amount": 800}
                ]
              },
              {
                "network": "Glo",
                "data": [
                  {"id": 7, "name": "750MB - 1 Day", "duration": "1 day", "amount": 180},
                  {"id": 8, "name": "2GB - 7 Days", "duration": "7 days", "amount": 450},
                  {"id": 9, "name": "6GB - 30 Days", "duration": "30 days", "amount": 900}
                ]
              },
              {
                "network": "9mobile",
                "data": [
                  {"id": 10, "name": "1GB - 1 Day", "duration": "1 day", "amount": 200},
                  {"id": 11, "name": "3GB - 7 Days", "duration": "7 days", "amount": 550},
                  {"id": 12, "name": "10GB - 30 Days", "duration": "30 days", "amount": 1200}
                ]
              }
            ]
          
          
        setAvailableData(data)
                    
    },[])

    return (
        <>
        <Header></Header>
        <Account/>
        <div className="contents valid-form">
            <p className="desc">Experience seamless data purchase with our lightning-fast service! At the click of a button, 
                you can swiftly acquire the data you need without any delays</p>
            <form method="post" className="input-group">
            
                <div className="phone-number">
                {/* <label>Phone Number</label><br/> */}

                    <input type="text" name="phoneNumber"  className="input-group"
                    placeholder="Phone Number" value={phoneNumber} onChange={handleChange}/>
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
                    <option key={plan.id} value={plan.id} amount={plan.amount}>
                        {`${plan.name}`}
                    </option>
                    ))}
                </select>


            <label>Amount</label>
            <input type="text"  className="input-group"
                placeholder="Amount" value={`₦${amount}`} onChange={handleAmountChange} disabled/>

                        {numberIsValid?(
                                        <button type="submit" className='btn-primary databtn' >Proceed</button>

                        ):(
                                        <button type="submit" className='btn-primary databtn disabled' >Proceed</button>

                        )}
               
            </form>
        </div>

        <Footer/>
        </>
    )
}