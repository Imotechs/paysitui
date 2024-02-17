import Header from "../../components/header/Header"
import logo from '../../assets/images/paysit_logo.png'
import Footer from "../dashboard/footer/Footer"
import { Link } from "react-router-dom"
export default function About(){
    return(
        <>
        <Header></Header>
    <section className="w3l-aboutblock1" id="about">
    <div className="midd-w3 py-5">
        <div className="container py-lg-5 py-md-4 py-2">
            <div className="row">
                <div className="col-lg-6 left-wthree-img">
                    <div className="position-relative">
                        <img src={logo} alt="" className="img-fluid radius-image-full"/>
                  
                    </div>
                </div>
                <div className="col-lg-6 mt-lg-0 mt-5 about-right-faq align-self">
                    <h5 className="title-big">About Us</h5>
                    <p> PaysIt, a dependable and budget-friendly platform, facilitates the purchase of affordable data bundles 
                        and airtime top-ups for any Nigerian network. <br/>We provide the most competitive rates for Airtel, MTN, 
                        9mobile, and Glo Airtimes and data plans.</p>
                   
                       <p>Whether you're a data reseller or an individual looking for personal use, 
                        PaysIt is your ultimate source for instant data delivery.</p>
                   
                        <p>Enjoy  seamless access to hassle-free educational registrations, <br/>including obtaining JAMB registration pins and WAEC/NECO scratch cards.                </p>
                   
                        <p>Additionally, take advantage of cost savings by renewing your DSTV, GOTV, and Startimes subscriptions
                        at discounted rates. No need to visit PHCN offices for electricity bill payments;
                        pay conveniently online through PaysIt from the comfort of your home.</p>
                        <Link to="/sign-up" className="site-btn mt-3">Join Today!</Link>               
                        
                 </div>
               </div>
            </div>
        </div>
</section>
<Footer></Footer>
</>
    )
}