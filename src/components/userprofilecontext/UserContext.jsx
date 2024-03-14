import React, { createContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../vitals';

const userProfileContext = createContext();
const UserProfileProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
	const navigateto = useNavigate()

  useEffect(() => {
    setLoading(true)
    const getData =async()=>{
      try{
        const response = await fetchUserProfile({navigateto})
        if (response.ok) {
          const data = await response.json();
          setUser(data);

        } 
        
      }catch(e){
        console.error(e)

      }finally{
        setLoading(false)

      }

    }
    getData()

  }, []); // Run the effect only once on mount
 
    
  return <userProfileContext.Provider value={{ user: user || {}, loading:loading,setLoading}}>{children}</userProfileContext.Provider>;
};

export { userProfileContext, UserProfileProvider };
