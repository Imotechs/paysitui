
import './Preloader.css'
import icheck from '../../assets/images/icheck.gif'

export default function Preloader({loading,isok}){
    return(
        <>
              {loading && <div className="keypreloader"></div>} 
                {!loading && isok && <div className='isok'><img src={icheck} alt='svg'/></div>} 
               
        </>

    )
}