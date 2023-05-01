import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import OrgsPage from "./OrgsPage";
import AccountnavPage from "./AccountnavPage";
import UsernavPage from "./UsernavPage";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const {ready, user, setUser} = useContext(UserContext);
  
  let {subpage} = useParams();
  if(subpage === undefined){
    subpage = 'profile';
}
 
  
    async function Logout(){
       const {refreshToken} = user;
        await axios.get('/user/logout', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}` 
            }
          });
          localStorage.removeItem('token');
        
        setRedirect('/');
        setUser(null);
    }
    if(!ready){

        return 'Loading...';

    }
    if(ready && !user && !redirect){
        return <Navigate to={'/login'} />
    }
    
    if(redirect){
        return <Navigate to={redirect} />
    }
   
  return (
    <div>
     { user.role==="admin"&& (<div>

      <AccountnavPage />
  
        {subpage === 'profile'&&(
            <div className="text-center mt-4">
                Logged in as: {user.lastname} <br />
                <button onClick={Logout} className="rounded-full py-1 px-4 mt-2 bg-green-300">Logout</button>
            </div>
        )}
        {subpage === 'org' && (
         <OrgsPage />
        )}
     </div>)}
     {user.role==="user"&& (<div>
       <UsernavPage />
        {subpage === 'profile'&&(
            <div className="text-center mt-4">
                Logged in as: {user.lastname} <br />
                <button onClick={Logout} className="rounded-full py-1 px-4 mt-2 bg-green-300">Logout</button>
            </div>
        )} 
         
     </div>)}
    </div>
  )
}

export default AccountPage
