 import React, { useState } from 'react'
 import abuja from '../../assets/images/abujaeee.jpg'
 import jos from '../../assets/images/joseee.jpg'
 import aba from '../../assets/images/abaeee.png'
 import kaduna from '../../assets/images/kadunaeee.jpg'
 import enugu from '../../assets/images/enugueee.png'
 import yola from '../../assets/images/yolaeee.jpg'
 import ikeja from '../../assets/images/ikejaeee.jpg'
 import ubills from '../../assets/images/ubills.png'
 import Header from '../../pages/dashboard/navbar/header/Header'
import Footer from '../../pages/dashboard/footer/Footer'
import './Electricity.css'
import Account from '../account/account'
import { verifyMeterNo,payElectricBill } from '../../vitals'
import { useNavigate } from 'react-router-dom'
import Message from '../message/Message'
import CoverPreloader from '../preloader/Coverpreloader'
export default function Electricity(){
    const [supplier,setSupplier] = useState('')
    const [plan,setPlan] = useState('')
    const[amount,setAmount] = useState('')
    const[meterNo,setMeterNo] = useState('')
    const[loading,setLoading] = useState(false)
    const[verifying,setVerifying] = useState(false)
    const[status,setStatus] = useState('')
    const[customer,setCustomer] = useState('')
    const[purchase,setPurchase] = useState('')
    const[message,setMessage] = useState('')
    const[messageOpen,setmessageOpen] = useState(false)
    const navigateto = useNavigate()
    const suppliers ={
        ikeja:'ikeja-electric',
        eko:'eko-electric', 
        port:'portharcourt-electric', 
        jos:'jos-electric', 
        kano:'kano-electric', 
        ibadan:'ibadan-electric',
        benin:'benin-electric',
        abuja:'abuja-electric',
        enugu:'enugu-electric',
        yola:'yola-Electric',
        kaduna:'kaduna-electric',
        aba:'aba-electric',

    }
    function changeSupplier(e){
        const selectOption = e.target.options[e.target.selectedIndex];
        setSupplier(suppliers[selectOption.getAttribute('value')])
    }  
    
    function changePlan(e){
        const selectedPlan = e.target.options[e.target.selectedIndex];
        setPlan(selectedPlan.getAttribute('value'))
    }
    //function chargeAmount((amount)=>amount+amount*0.04,'')
    function changeAmount(e){
        setAmount(e.target.value)
    }
    async function changeMeter(e){
        setMeterNo(e.target.value)
        if(e.target.value.length>=9){
            setVerifying(true)
            try{
                const response = await verifyMeterNo({navigateto,supplier,meterNo,plan})
                const data = await response.json()
                if(data['Customer']){
                setCustomer({name:data['Customer'],address:data['Address']})
                setStatus('Unable to verify Meter Number')
            }else{
                setStatus('Unable to verify Meter Number')

            }
            }catch(e){
    
            }finally{
                setVerifying(false)
                // setCustomer({name:'Adzembeh Joshua',address:'Tula Wange,Kaltungo LGA'})

            }
        }
    }
    
    async function submitForm(e){
        e.preventDefault()
        setLoading(true)
        try{
            const response = await payElectricBill({navigateto,supplier,plan,meterNo,amount,})
            const data = await response.json()
            if(data['Token']){
                setPurchase(data)
            }else if(data['message']){
                setMessage(data['message'])
                setmessageOpen(true)
            }

        }catch(e){

        }finally{
            setLoading(false)
        }
    }

    function closeMessage(){
        setmessageOpen(false)
    }
    return (
        <>
<Header/>
<div className ="ecard-body" data-select2-id="select2-data-7-j3jj">
<label  className ="col-form-label suport">Electricity Bills Payment</label><br/>
<div className ='electricity-icons'>


<div className ='row'>
    <div className ='col'>
        <label className ="custom-control 
        custom-control-inline">
            <img src={abuja} width="35" height="30" className ="rounded-corners" alt='logo'/>
        </label>
    </div>
    <div className ='col'>
        <label className ="custom-control 
        custom-control-inline">
            <img src={jos} width="35" height="30" className ="rounded-corners" alt='logo'/>
        </label>
    </div>
    <div className ='col'>
        <label className ="custom-control 
        custom-control-inline">
            <img src={kaduna} width="35" height="30" className ="rounded-corners" alt='logo'/>
        </label>
    </div>
    <div className ='col'>
        <label className ="custom-control 
        custom-control-inline">
            <img src={yola} width="35" height="30" className ="rounded-corners" alt='logo'/>
        </label>
    </div>
    <div className ='col'>
        <label className ="custom-control 
        custom-control-inline">
            <img src={ikeja} width="35" height="30" className ="rounded-corners" alt='logo'/>
        </label>
    </div>
    <div className ='col'>
        <label className ="custom-control 
        custom-control-inline">
            <img src={enugu} width="35" height="30" className ="rounded-corners" alt='logo'/>
        </label>
    </div>
    <div className ='col'>
        <label className ="custom-control 
        custom-control-inline">
            <img src={aba} width="35" height="30" className ="rounded-corners" alt='logo'/>
        </label>
    </div>
   
 
</div>
</div>
<div className ='row'>
    
{!purchase ?
<div className ='col content tvform'>
<form  id="frmbuyElectric" method="post" className =" tv-form" onSubmit={submitForm} >
<input type="hidden" className ="form-control networclassNameId" id="discoId" />
<div className ="form-group" id="disco" data-select2-id="select2-data-disco">
<label  className ="col-form-label">Select a DISCO</label>
<select className ="form-control rounded-right js-example-responsive" onChange={changeSupplier} required data-select2-id="select2-data-1-nfar"  >
<option value=" " > Select a DISCO </option>
<option value="aba" data-logo="aba-electric-epins.png" data-select2-id="select2-data-9-7nfv"> ABA Electricity (ABEDC) </option>
<option value="abuja" data-logo="Abuja-Electric.jpg" data-select2-id="select2-data-10-jr4o"> ABUJA Electricity (AEDC) </option>
<option value="benin" logo={aba} data-select2-id="select2-data-11-j0m0"> BENIN Electricity (BEDC) </option>
<option value="enugu" data-logo="EEDC-Enugu-electricity-payment.jpg" data-select2-id="select2-data-12-xi3e"> ENUGU Electricity (EEDC) </option>
<option value="eko" data-logo="EclassNameo-Electric-Payment-PHCN.jpg" data-select2-id="select2-data-13-tt99"> EkO Electricity (EkEDC) </option>
<option value="ibadan" data-logo="IBEDC-Ibadan-Electricity-Distribution-Company.jpg" data-select2-id="select2-data-14-3nfn"> IBADAN Electricity (IBEDC) </option>
<option value="ikeja" data-logo="IclassNameeja-Electric-Payment-PHCN.jpg" data-select2-id="select2-data-15-jclassNameql"> IkEJA Electricity (IkEDC) </option>
<option value="jos" data-logo="Jos-Electric-JED.jpg" data-select2-id="select2-data-16-pyo7"> JOS Electricity (JED) </option>
<option value="kaduna" data-logo="classNameaduna-Electric-classNameAEDCO.jpg" data-select2-id="select2-data-17-nyclassName0"> kADUNA Electricity (KAEDCO) </option>
<option value="kano" data-logo="classNameano-Electric.jpg" data-select2-id="select2-data-18-w4r4"> KANO Electricity (KEDCO) </option>
<option value="port" data-logo="phc.png" data-select2-id="select2-data-19-vv4g"> PORTHARCOURT Electricity (PHED) </option>
<option value="yola" data-logo="Yola-Electric-Payment-IclassNameEDC.jpg" data-select2-id="select2-data-20-zmv9"> YOLA Electricity (YEDC) </option>
</select>

</div>
{loading&&<CoverPreloader loading={loading} isok ={false}></CoverPreloader>}
<div className ="form-group" id="dataplans" data-select2-id="select2-data-dataplans">
<label  className ="col-form-label text-blacclassName text-darclassName">Meter Type </label>

<select className ="form-control rounded-right metertype select2-hidden-accessible" name ="plan" id="plan" onChange={changePlan} required>
<option data-select2-id="select2-data-5-q3qa">Select Meter Type</option> 
<option value="prepaid" data-select2-id="select2-data-23-ysnc"> Prepaid</option>
<option value="postpaid" data-select2-id="select2-data-24-fcui"> Postpaid</option>
</select>

<input type="hidden" className ="form-control meter-selected" value="postpaid"/>
</div>
<div className ="form-group">
<label  className ="col-form-label text-blacclassName text-darclassName">Enter Amount <small style={{color:'black'}}>(4% flat charges)</small></label>
<input id="amount" type="number" placeholder ='Amount to Pay'step="0.01" required className ="form-control rounded-right" name="amount"  value={amount} onChange={changeAmount}/>
</div>
<div className ="form-group">
<label  className ="col-form-label">Enter Meter Number</label>
<input id="meterno" type="number" placeholder='Meter Number' required className ="form-control rounded-right" name="meterno" value={meterNo} onChange={changeMeter} />
</div>
<span id="amountpay" style={{color:'brown',marginLeft:'40px',letterSpacing:'0.2rem'}}>
    {verifying &&<i class="fa fa-spinner spinner"></i>}
    <span id="dstv_stats">
        {!verifying && customer? (<> <font color="green"> <i class="fa fa-check-circle"></i><font color="green">Success  </font>  
        </font> <b>Customer Name </b> {customer.name} | Address <b> {customer.address}</b></>) :(  <> <b>{status} </b></>
)}
            
            
</span></span>
<div className ="col-sm-6 pl-0 text-center">
<label  className ="col-form-label"></label>
{!customer ? (
    <button disabled id="btnelectric" className ="btn btn-rounded btn-primary" ><i className ="fa fa-arrow-right"></i> Proceed </button>
):(
    <button type="submit" id="btnelectric" className ="btn btn-rounded btn-primary" ><i className ="fa fa-arrow-right"></i> Proceed </button>
)}
</div>
</form>
</div>
:
<div className ='col content tvform'>
    <h3 className='text-center bg-success'>{purchase['message']}</h3>
      <div className=' alert alert-info'>
      Token  <b>{purchase['Token']}</b> <br/>
      Units  <b>{purchase['Units']}</b> <br/>
      Meter Number  <b>{purchase['meter_number']}</b><br/>
      From  <b>{purchase['service']}</b> <br/>
      {purchase['completed']?<>
      <i class="fa fa-check-circle"></i><small className='suport' style={{fontSize:'7px',color:'green'}}>This message is in your Email.</small>
      </>
       :<>
       
       </> }
      </div>  
</div>
}
<div className ='col electacc'>
    <Account></Account>
    <div className='ubills'>
        <img src={ubills} alt='bill image'/>
    </div>
</div>
</div>
</div>
<Message
    isOpen={messageOpen}
    message={message}
    onClose={closeMessage}/>
<Footer/>
        </>
    )
}