import React from "react";
import './Dashboard.css'
import Servicecard from './servicecard/Servicecard'
import Transactions from "./transactions/Transactions";
import News from "./news/News";
import Header from "./navbar/header/Header";
import Footer from "./footer/Footer";
import nameToLogo from "../../vitals";
function DashBoard(){
	const body ='If you suspect that the development server is a quick way to clear any internal caches. If you are using Create React App, you can stop the server by pressing '


    return(
    <div className="app">
		<Header/>
		<Servicecard />
		<div className="update">
		<News news ={{title:'Reduced prices when you buy Data Pins in numbers',body:body}}/>
		</div>
		<div className="transactions">
			<Transactions logo ={nameToLogo('9mobile')}/>
		</div>

		<Footer/>
	</div>
    );
}

export default DashBoard