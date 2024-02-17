import './Preloader.css'
import Preloader from './Preloader'
export default function CoverPreloader({loading}){
    return(
        <>
        {loading &&(<div className="cover-preloader">
		<Preloader loading={loading} isok={false}/>
		</div>)}
        </>
    )
}