import axios from "axios";
import {useState , createContext, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({children}){
     const [user, setUser] = useState(null);
     const [ready, setReady] = useState(false);
      
  useEffect(()=>{

    if(!user){
      //const token = user.token;
      axios.get('/user/profile').then(({data})=>{
          
        setUser(data);
        setReady(true);
      }); 
  
    }
   }, []);

    return (
        <UserContext.Provider value={{user, setUser, ready, setReady}}>
          {children}
        </UserContext.Provider>
        
    )
}