import React,{useEffect,useContext, useState} from "react";
import './Dashboard.css'
import Servicecard from './servicecard/Servicecard'
import Transactions from "./transactions/Transactions";
import News from "./news/News";
import Header from "./navbar/header/Header";
import Footer from "./footer/Footer";
import nameToLogo from "../../vitals";
import { UserProfileProvider } from "../../components/userprofilecontext/UserContext";
import { useNavigate } from 'react-router-dom';

function DashBoard(){
	const navigateto = useNavigate()
	useEffect(()=>{
		const access_token = localStorage.getItem('access_token')
		if(!access_token){
			navigateto('/login')
		}

	},[])

    return(
    <div className="app" >
		<UserProfileProvider>
		<Header/>
		<Servicecard />
		<div className="update">
		<News />
		</div>
		<div className="transactions">
			<Transactions />
		</div>
		</UserProfileProvider>
		<Footer/>
	</div>
    );
}

export default DashBoard


