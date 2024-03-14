import React, { useEffect,useState } from 'react';
import './Payment.css';
/* global FlutterwaveCheckout */
import image_logo from '../../assets/images/paysit.png'
import { verifyPayment } from '../../vitals';
import Message from '../message/Message';
import { useNavigate } from 'react-router-dom';

export default function Payment({amount,transaction}) {
    const [loading,setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [messageIsOpen,setMessageIsOpen] = useState(false)
    const navigateto = useNavigate()

    const amountEnter = new Intl.NumberFormat('en-NG', {style: 'currency',currency: 'NGN',}).format(amount);
        // Calculate 1.4% of the amount
        const fee = (amount * 1.4) / 100;
      
        // Calculate the total amount including the fee
        const total = +amount + fee;
    const amountToPay = new Intl.NumberFormat('en-NG', {style: 'currency',currency: 'NGN',}).format(total);
    const dateObject = new Date(transaction.date_added);

    // Format the date using toLocaleString or other formatting options
    const formattedDate = dateObject.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
  useEffect(() => {

    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    document.head.appendChild(script);

    // Cleanup the script tag after component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function makePayment() {
    FlutterwaveCheckout({
      public_key: transaction['Pk'],
      tx_ref: transaction.payment_id,
      amount: transaction.amount,
      currency: "NGN",
      payment_options: "card, banktransfer, ussd",
      meta: {
        source: "docs-inline-test",
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: transaction['user'].email,
        phone_number: transaction['user'].phone_number,
        name: `${transaction['user'].first_name} ${transaction['user'].last_name}`,
      },
      customizations: {
        title: "PaysIt",
        description: "Wallet Funding",
        logo:image_logo,
      },
      callback: async function (data){
        //console.log('call back here poooooo',data)
        data['payment_id'] =data['tx_ref']
        const response = await verifyPayment({navigateto,data})
         const resData = await response.json()
         console.log(resData)
         console.log(data)
         console.log(transaction)
         //setMessage(resData['message'])
         //setMessageIsOpen(true)
             },
      onclose: async function () {
       
        let data = transaction
            data['status'] = 'canceled'
         const response = await verifyPayment({navigateto,data})
         const resData = await response.json()
        setMessage(resData['message'])
         setMessageIsOpen(true)
         

      }
    });
  }
  //console.log(transaction)
function closeMessage(){
setMessageIsOpen(false)
setTimeout(()=>{
    navigateto('/dashboard')
 },100)   
}
  return (
    <>
      <form className='paymentform cont'>
      
            <div className="card  "> 
                            <div className="col s12 center-align"> 
                                <h6> PLEASE CONFIRM TRANSACTION DETAILS BELOW </h6>
                            </div>
                            
                                <div className='row'>
                                <div className="col s4 ">
                                    <p >
                                        <span className="light-blue-text">User</span><br/>
                                        <b className='txt1'>{transaction['user'].first_name} {transaction['user'].last_name}</b><br/>
                                        <b>{transaction['user'].email}</b><br/> 
                                    </p>
                                    </div> 
                                    <div className="col s4">
                                        <p>
                                            <span className="light-blue-text">Date</span><br/>
                                            <b>{formattedDate}</b><br/>
                                        </p>
                                    </div> 
                                    <div className="col s4">
                                        <p>
                                           <span className="light-blue-text">Status</span><br/>
                                            <b>Pending</b><br/>
                                            

                                        </p>
                                    </div>
                                    </div>
                               
                                <div className="row container">
                                    <div className="col s12">
                                        <table className="responsive-table ">
                                            <thead>
                                                <tr>
                                                    <th className="left-on-sm-only right-align">id</th>
                                                    <th className="left-on-sm-only right-align">Services</th>
                                                    <th className="left-on-sm-only right-align">Amount</th>
                                                    <th className="left-on-sm-only center-align">Fee</th>
                                                    <th className=" text-success light-blue-text">Total
</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className=""> {transaction.payment_id}</td>
                                                    <td className="left-on-sm-only right-align">Wallet Funding</td>
                                                    <td className="left-on-sm-only right-align">{amountEnter}</td>
                                                     <td className="left-on-sm-only right-align">₦1.4% </td>    
                                                     <td className="text-success">{amountToPay}</td>                   
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                                        
                                                                                    
                                                                             
                                    

                  
                 </div>
                  
                  
                  
                  
        {/* <div>Your order is ₦2,500</div> */}
        <button type="button" id="start-payment-button" onClick={makePayment}>
          Pay Now
        </button>
      </form>
      <Message
message = {message}
onClose = {closeMessage}
isOpen = {messageIsOpen}
/>
    </>
    
  )

}
