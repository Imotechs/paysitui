
import './Preloader.css'
import icheck from '../../assets/images/icheck.gif'

export default function PassPreloader({loading,isok}){
    return(
        <>
              {loading && <div className="passpreloader"></div>} 
                {!loading && isok && <div className='isok'><img src={icheck} alt='svg'/></div>} 
               
        </>

    )
}