import React,{useSate} from "react";
import './404.css'
export default function Error404(){
    function handleGoBack(){
        window.location.href ='/'
    }
    return(
        <div className="error404">
            <h1 className="header404">404 <small style={{fontSize:'12px'}}>Not found</small></h1>
            <button className="err404btn"onClick={handleGoBack}>Go Back</button>
        </div>
    )
}