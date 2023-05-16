import axios from "axios";
import { Link, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import {FaTelegramPlane, FaRenren, FaHouseUser, FaHospitalSymbol, FaHospitalUser} from "react-icons/fa";
import { UserContext } from "../UserContext";
import AccountnavPage from "./AccountnavPage";

const OrgmainPage = () => {
    const {id} = useParams();
    const {ready, user, setUser} = useContext(UserContext); 
    const [org, setOrg] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);
    const {refreshToken} = user;
    
    const getmain = ()=>{

      setLoading(true);
      axios.get('/org/getorg/'+id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}` 
        }
      }).then(({data})=>{
        setLoading(false);
        setOrg(data);
      }).catch(err=>{
        setLoading(false);
        setError(err.message);
       
       });

    }
    
    useEffect(()=>{
      if(!id){
        return;
      }
     getmain();
      
    },[id]);
  
   
  return (
    <div>
      <AccountnavPage />
      
      {error && (
        <div className="mt-8 justify-center  text-center">
          <div className="rounded-full border-green-500">
            <h1 className="text-xl">
              {error}
            </h1>
          </div>
        </div>
      )}
      {
      loading ?
      <div className="mt-8 justify-center  text-center">
      <GridLoader color={'#7ED321'} loading={loading} size={10} />
      </div>
      :
     <div className=" flex overflow-hidden mb-4 border gap-2 border-green-300 shadow shadow-green-200 rounded-2xl mt-32 m-8">
     
      <div className="w-32 h-32 grow  py-2 px-4">
        <h1 className="text-xl flex items-center justify-center text-center"><FaHospitalSymbol color="green" />{org.org_name}</h1><br>
        </br>
        <p className="text-center text-small">{org.org_description}</p>
        <Link to={'/account/org/editorg/'+org._id}
         className="text-center rounded-full hover:bg-green-500 bg-green-300  py-2 px-4 text-white cursor-pointer ">Edit</Link>
      </div>
      <div className="border-left border-green-300 bg-green-300">.</div>
      <div className="w-32 h-64 grow  py-1 px-1">
        <h1 className="flex justify-center items-center text-xl px-4 py-2"><FaHospitalUser color="green"/>Users</h1>
        <Link to={'/account/org/adduser/'+org._id} className="rounded-full bg-green-300 hover:bg-green-500 py-1 px-2 text-white cursor-pointer">Add User</Link>
        {org.org_users && org.org_users.length > 0 && org.org_users.map(xman=>(
        <div key={xman._id}  className="hover:bg-green-200 flex gap-2 mt-3 text-center">
          <p className="uppercase" >{xman.firstname} {xman.lastname}</p>
          <div className="py-1 px-1 border-l border-green-500"></div>
          <p>{xman.occupation}</p>
        </div> 
        
        ))}
         {!org.org_users && (
          <div>
         <p className="font-bold text-center">No User, add new user</p> 
         
         </div>
        )} 
      </div>
     </div>
     }
    </div>
  )
}

export default OrgmainPage
