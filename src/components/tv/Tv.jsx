import React,{useState} from "react";
import startimes from '../../assets/images/startime_logo.png'
import gotv from '../../assets/images/gotv.png'
import dstv from '../../assets/images/dstv.png'
import Header from '../../pages/dashboard/navbar/header/Header'
import './Tv.css'
import Footer from "../../pages/dashboard/footer/Footer";
import tv from '../../assets/images/tv.png'
import { fetchTvPlans,verifyIUC,buyTvPlan } from "../../vitals";
import CoverPreloader from "../preloader/Coverpreloader";
import Preloader from "../preloader/Preloader";
import { useNavigate } from "react-router-dom";
import Message from '../message/Message'
export default function Tv(){
    const [amount,setAmount] = useState('')
    const [IUCNumber,setIUCNumber] = useState('')
    const [plan,setPlan] = useState('')
    const [tvData,setTvData] = useState([])
    const [phoneNumber,setPhoneNumber] = useState('')
    const[loading,setLoading] = useState(false)
    const [logoName,setLogo] = useState('')
    const[tvIsSelected,setTvIsSelected] = useState(true)
    const[verifying,setVerifying] = useState(false)
    const[name ,setName] = useState('')
    const[message,setMessage] = useState('')
    const[messageOpen,setMessageOpen] = useState(false)
    const [verified,setVerified] = useState(false)

    const navigateto = useNavigate()
    const tvSets = {
        dstv:dstv,
        startimes:startimes,
        gotv:gotv
    }
    function monitize(val){
        return 	new Intl.NumberFormat('en-NG', {style: 'currency',currency: 'NGN',}).format(val);

    }

    async function changeIUCNumber(e){
        let IUC = e.target.value
        setIUCNumber(IUC)
        if(IUC.length===10){

       
        setVerifying(true)
        try{
            const response = await verifyIUC({navigateto,logoName,IUC,})
            let data = await response.json()
            //console.log(data)
            if(data['customer']){
                setName(data['customer'])
                setVerified(true)
            }else{
                setMessage('Invalid IUC Number')
            }

        }catch(e){

        }finally{
            setVerifying(false)
        }
    }
    }
    function changePhoneNumber(e){
        setPhoneNumber(e.target.value)

    }
    function changeSelectedPlan(e){
        //console.log(e.target.amount)
        setPlan(e.target.value)
        const AmountOption = e.target.options[e.target.selectedIndex];
        setAmount(AmountOption.getAttribute("amount"));

    }
    
    async function handleTvSelection(tv){
        setLoading(true)
       try{
       const response = await fetchTvPlans({navigateto,tv})
       const data = await response.json()
       //console.log(data)
       setTvData(data)
       if(data.length>0){
        setLogo(tv)
       }
       } catch(e){

       }finally{
        setLoading(false)
       }

    }

    async function submitForm(e){
        e.preventDefault()
        setLoading(true)
        try{
            const response = await buyTvPlan({navigateto,logoName,IUCNumber,phoneNumber,amount})
            let data = await response.json()
            //console.log(data)
            if(data['message']){
                setMessage(data['message'])
                setMessageOpen(true)
            }else{
                setMessage('Error!!')
                setMessageOpen(true)
            }
        }catch(e){

        }finally{
            setLoading(false)
        }

    }

    function closeMessage(){
        setMessageOpen(false)
        navigateto('/dashboard')

    }

    const options =  tvData.map((plan) => (
        <option key={plan.key} value={plan.amount} amount={plan.amount} service ={plan.network} name ={plan.plancode} dname ={plan.plan}>
            {`${plan.plan} ${monitize(plan.amount)}`}
        </option>
        ))

    return (
        <>
            <Header/><div className="wrapper">
        <aside id="left-sidebar-nav">
          
        </aside>
<section className="container">
  <p className="support">TV Subscriptions</p>
              <div className="divider"></div>
     <div id="content">
	    <ul className="collapsible custom-nav" data-collapsible="accordion">
        {!tvData.length>0 && 
             
      <div className="col s12" >
        <div className="card-panel hoverable" >  
       
        <div className="row tvsets" > 

        
            
        <div className="col s12 m3 l2 tooltipped tvitem" onClick={() => handleTvSelection("dstv")}>
                    <div className="card py-sm-5  hoverable">
                                
                     <div className="col s3 m12 left-align">
                     <img className="h-sm-30" style={{'width':'52px'}} src={dstv}/>		  
	              </div>
                      <div className="col s7 m12 center-align left-on-sm-only ">
                          <h6>DSTV</h6>
                      </div>
                      
                  
                 </div>
                </div>

                                    
                <div className="col s12 m3 l2 tooltipped tvitem" onClick={() => handleTvSelection("gotv")}>
                    <div className="card py-sm-5  hoverable">
                                
                     <div className="col s3 m12 left-align">
                         <img className="h-sm-30" style={{'width':'52px'}} src={gotv}/>		  
	              </div>
                      <div className="col s7 m12 center-align left-on-sm-only ">
                          <h6>GOTV</h6>
                      </div>
                      
                 </div>
                </div>



                <div className="col s12 m3 l2 tooltipped tvitem" onClick={() => handleTvSelection("startimes")}>
                    <div className="card py-sm-5  hoverable">
                                
                     <div className="col s3 m12 left-align">
                         <img className="h-sm-30" style={{'width':'52px'}} src={startimes}/>		     
                         

	              </div>
                      <div className="col s7 m12 center-align left-on-sm-only ">
                          <h6>Startimes</h6>
                      </div>
                      
                     
                 </div>
                </div>

                                    
  
</div>
</div>
</div>}
    <div className="add">
        
        <img src={tv}  alt="tv_screen" />
        </div>   
        {loading &&<CoverPreloader loading={loading} isok = {false}/>}
           
 {tvData.length>0 && 
 <div className="tvform" style={{minHeight:'250px'}}>
    <div className="tv-logo"><img src={tvSets[logoName]} alt="logo"/></div>
 <form onSubmit={submitForm}>

    <select onChange={changeSelectedPlan} value={plan} required>
        <option value='0'>Select Plan</option>
    {options}
    </select>
    <input type="number" placeholder="Phone Number" name='phonNumber'value ={phoneNumber} onChange={changePhoneNumber} required/>
    <input type="text"  placeholder= {monitize(amount)} name='amount' readOnly/>
    <input type="text"  placeholder= {monitize(amount)} name='amount'value ={amount} hidden readOnly/>
    <input type="number" placeholder="Decoder/IUC Number" name='iucNumber'value ={IUCNumber} required onChange={changeIUCNumber} onPaste={changeIUCNumber}/>
    <span id="amountpay" style={{color:'brown',marginLeft:'40px',letterSpacing:'0.2rem'}}>
    {verifying &&<i class="fa fa-spinner spinner"></i>}
    <span id="dstv_stats">
        {!verifying && verified && name? (<> <font color="green"> <i class="fa fa-check-circle"></i><font color="green">Success  </font>  
        </font> <b>Customer Name</b> `: {name} `</>) :(  <>{!verified && !verifying && IUCNumber.length>=8&&<b> Unable to verify Meter Number </b>}</>
)}
            
    
</span></span>
        {/* <b>{name}{verifying&&<Preloader loading={verifying}></Preloader>} <small style={{color:'brown',fontWeight:'500',marginBottom:'5px'}}> {message}</small></b> */}

    {verifying && !verified? <button  disabled className="tv-submit-btn">Submit</button>:<button type="submit" className="tv-submit-btn">Submit</button>}
 </form>

 </div>
 }
</ul></div></section>
</div>
            <Message
          isOpen={messageOpen}
          message={message}
          onClose={closeMessage}
          />
</>  

    )
}